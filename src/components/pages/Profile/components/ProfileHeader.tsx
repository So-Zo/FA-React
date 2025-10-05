import React from "react";
import { useProfileContext } from "../ProfileContext";
import { useFileUpload } from "../hooks";

interface ProfileHeaderProps {
  onProfileImageChange: (file: File) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onProfileImageChange,
}) => {
  const { data: profileData, stats } = useProfileContext();
  const { mediaPreview: profileImage, handleFileChange } = useFileUpload({
    onUpload: onProfileImageChange,
  });

  return (
    <header className="profile-header">
      <div className="profile-header-row">
        <div className="profile-avatar-block">
          <img
            id="user-profile-image"
            alt="User Profile Picture"
            src={
              profileImage ||
              profileData?.avatar_url ||
              "/placeholder-avatar.jpg"
            }
            className="profile-avatar"
          />
          <input
            type="file"
            id="profile-image-upload"
            accept="image/*"
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
              <span className="stat-number">{stats.posts}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="profile-stat">
              <span className="stat-number">{stats.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="profile-stat">
              <span className="stat-number">{stats.following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
