import React from "react";
import { useProfileContext } from "../ProfileContext";
import { useAuth } from "../../../../shared/hooks/useAuth";

interface ProfileHeaderProps {
  onProfileImageChange: (file: File) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onProfileImageChange,
}) => {
  const { profileData, activityMetrics } = useProfileContext();
  const { user, session } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onProfileImageChange(file);
    }
  };

  // Determine if user is online based on active session (much better than database last_seen!)
  const isUserOnline = () => {
    // If viewing your own profile and you have a session, you're obviously online
    if (session && user && profileData && user.id === profileData.id) {
      return true;
    }
    // For other users' profiles, we'd need different logic
    // For now, assume they're offline unless we implement real-time presence
    return false;
  };

  // Only show online status indicator if profile is public (not private)
  const shouldShowDot = profileData?.is_private !== true;

  // Determine dot color: green if online AND user allows status to show, otherwise grey
  const showGreenDot =
    isUserOnline() && profileData?.show_online_status === true;

  // Helper function for tooltip text
  const getStatusTooltip = () => {
    if (profileData?.show_online_status !== true) return "Status hidden";
    return isUserOnline() ? "Online" : "Offline";
  };

  return (
    <header className="profile-header">
      <div className="profile-header-row">
        <div className="profile-avatar-block">
          <img
            id="user-profile-image"
            alt="User Profile Picture"
            src={profileData?.avatar_url || "/placeholder-avatar.jpg"}
            className="profile-avatar"
          />

          {/* Online status indicator - only show if profile is public */}
          {shouldShowDot && (
            <div
              className={`online-status-dot ${
                showGreenDot ? "online" : "offline"
              }`}
              title={getStatusTooltip()}
            />
          )}

          <input
            type="file"
            id="profile-image-upload"
            accept=".jpg,.jpeg,.png,.webp"
            aria-label="Upload profile picture"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            className="profile-image-label"
            type="button"
            onClick={() =>
              document.getElementById("profile-image-upload")?.click()
            }
          >
            Change Profile Picture
          </button>
        </div>
        <div className="user-overview-block">
          <h1 className="profile-user-name">
            {profileData?.display_name || "user"}
          </h1>
          <div className="profile-stats-row">
            <div className="profile-stat">
              <span className="stat-number">{activityMetrics.totalPosts}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="profile-stat">
              <span className="stat-number">
                {activityMetrics.totalFollowers}
              </span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="profile-stat">
              <span className="stat-number">
                {activityMetrics.totalFollowing}
              </span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
