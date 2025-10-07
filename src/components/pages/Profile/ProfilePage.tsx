import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import { ProfileProvider, useProfileContext } from "./ProfileContext";
import { useProfileNavigation, useModal } from "./hooks";
import {
  ProfileHeader,
  ProfileNavigation,
  PostList,
  ProfileSettings,
  CreatePostModal,
  ErrorBoundary,
  LoadingSpinner,
} from "./components";
import { profileService } from "./services";

const ProfileContent: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { refreshProfileData } = useProfileContext();

  // Custom hooks
  const { activeSection, navigateToSection } = useProfileNavigation();
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Handle profile image update
  const handleProfileImageChange = async (file: File) => {
    if (!user) return;
    try {
      await profileService.updateProfileImage(user.id, file);
      await refreshProfileData();
    } catch (error) {
      console.error("Error updating profile image:", error);
      alert("Failed to update profile image.");
    }
  };

  // Effect to handle auth state
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/login");
      } else {
        refreshProfileData();
      }
    }
  }, [authLoading, user, navigate, refreshProfileData]);

  if (authLoading) {
    return <LoadingSpinner message="Loading your profile..." />;
  }

  return (
    <div className="profile-page">
      <ProfileHeader onProfileImageChange={handleProfileImageChange} />

      <main className="profile-main">
        <ProfileNavigation
          activeSection={activeSection}
          onSectionChange={navigateToSection}
        />

        <section className="profile-content-container">
          {/* Posts Section */}
          {activeSection === "posts" && (
            <div className="profile-content-section active">
              <div className="section-header">
                <h2>Your Posts</h2>
                <button className="btn btn-primary" onClick={openModal}>
                  Create New Post
                </button>
              </div>
              <PostList
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                postsPerPage={postsPerPage}
              />
            </div>
          )}

          {/* Comments Section */}
          {activeSection === "comments" && (
            <div className="profile-content-section active">
              <h2>Recent Comments</h2>
              <div className="comment-placeholder">No comments yet.</div>
            </div>
          )}

          {/* Work Requests Section */}
          {activeSection === "work-requests" && (
            <div className="profile-content-section active">
              <h2>Work Requests</h2>
              <div className="work-requests-placeholder">No work requests.</div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="profile-content-section active">
              <h2>Account Settings</h2>
              <ProfileSettings />
            </div>
          )}

          {/* Drafts Section */}
          {activeSection === "drafts" && (
            <div className="profile-content-section active">
              <h2>Drafts</h2>
              <div className="drafts-placeholder">No drafts yet.</div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="profile-content-section active">
              <h2>Notifications</h2>
              <div className="notifications-placeholder">No notifications.</div>
            </div>
          )}
        </section>
      </main>

      {/* Create Post Modal */}
      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

// Wrap the main component with the ProfileProvider
const ProfilePage: React.FC = () => (
  <ErrorBoundary>
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  </ErrorBoundary>
);

export default ProfilePage;
