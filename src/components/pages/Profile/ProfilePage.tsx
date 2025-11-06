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
import { PostCard } from "../../../shared/Components/PostCard";
import { profileService } from "./services";

function ProfileContent() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const {
    refreshProfileData,
    userPosts,
    loadingStates,
    totalUserPosts,
    fetchProfilePosts,
  } = useProfileContext();

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

  // Effect to handle auth state and load initial data
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/login");
      } else {
        refreshProfileData();
        fetchProfilePosts(currentPage, postsPerPage);
      }
    }
  }, [
    authLoading,
    user,
    navigate,
    refreshProfileData,
    fetchProfilePosts,
    currentPage,
    postsPerPage,
  ]);

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

        
          {/* Posts Section */}
          {activeSection === "posts" && (
            <div className="active">
              <div className="post-feed">
                <div className="post-feed-header">
                  <h2 className="post-feed-title">Your Posts</h2>
                  <button className="btn btn-primary" onClick={openModal}>
                    Create New Post
                  </button>
                </div>
                <div className="post-feed-grid">
                  {loadingStates.userPostsLoading ? (
                    <div className="post-feed-loading">Loading posts...</div>
                  ) : !userPosts || userPosts.length === 0 ? (
                    <div className="post-feed-empty">
                      No posts yet. Create your first post!
                    </div>
                  ) : (
                    <>
                      {userPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </>
                  )}
                </div>
                <PostList
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalUserPosts / postsPerPage)}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          )}

          {/* Comments Section */}
          {activeSection === "comments" && (
            <div className="active">
              <h2>Recent Comments</h2>
              <div className="empty-state">No comments yet.</div>
            </div>
          )}

          {/* Work Requests Section */}
          {activeSection === "work-requests" && (
            <div className="active">
              <h2>Work Requests</h2>
              <div className="empty-state">No work requests.</div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="active">
              <h2>Account Settings</h2>
              <ProfileSettings />
            </div>
          )}

          {/* Drafts Section */}
          {activeSection === "drafts" && (
            <div className="active">
              <h2>Drafts</h2>
              <div className="empty-state">No drafts yet.</div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="active">
              <h2>Notifications</h2>
              <div className="empty-state">No notifications.</div>
            </div>
          )}
      </main>

      {/* Create Post Modal */}
      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

// Export the component wrapped in its providers
export default function ProfilePage() {
  return (
    <ErrorBoundary>
      <ProfileProvider>
        <ProfileContent />
      </ProfileProvider>
    </ErrorBoundary>
  );
}
