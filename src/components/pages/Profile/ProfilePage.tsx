import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useProfileContext } from "./ProfileContext";
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
    isOwnProfile,
    profileData,
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
          isOwnProfile={isOwnProfile}
        />

        {/* Posts Section */}
        {activeSection === "posts" && (
          <div className="active">
            <div className="post-feed">
              <div className="post-feed-header">
                <h2 className="post-feed-title">
                  {isOwnProfile
                    ? "Your Posts"
                    : `${profileData?.display_name}'s Posts`}
                </h2>
                {/* Only show Create Post button for own profile */}
                {isOwnProfile && (
                  <button className="btn btn-primary" onClick={openModal}>
                    Create New Post
                  </button>
                )}
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
                      <PostCard
                        key={post.id}
                        post={post}
                        onReport={() => {}} // No-op for user's own posts
                      />
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

        {/* Settings Section - Only show for your own profile */}
        {activeSection === "settings" && isOwnProfile && (
          <div className="active">
            <h2>Account Settings</h2>
            <ProfileSettings />
          </div>
        )}

        {/* Show message if trying to view other user's settings */}
        {activeSection === "settings" && !isOwnProfile && (
          <div className="active">
            <div className="empty-state">
              <h2>Settings</h2>
              <p>You cannot view another user's settings.</p>
            </div>
          </div>
        )}

        {/* Notifications Section - Only for own profile */}
        {activeSection === "notifications" && isOwnProfile && (
          <div className="active">
            <h2>Notifications</h2>
            <div className="empty-state">No notifications.</div>
          </div>
        )}
      </main>

      {/* Create Post Modal - Only for own profile */}
      {isOwnProfile && (
        <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
}

// Export the component without ProfileProvider - let parent provide it
export default function ProfilePage() {
  return (
    <ErrorBoundary>
      <ProfileContent />
    </ErrorBoundary>
  );
}
