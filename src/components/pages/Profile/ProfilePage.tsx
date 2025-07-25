import React, { useState, useRef, ChangeEvent } from "react";

const ProfilePage: React.FC = () => {
  // State for active content section
  const [activeSection, setActiveSection] = useState("comments");

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for profile image
  const [profileImage, setProfileImage] = useState("/placeholder-avatar.jpg");

  // State for media preview in post creation
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const postMediaInputRef = useRef<HTMLInputElement>(null);

  // Handle profile option click
  const handleOptionClick = (section: string) => {
    setActiveSection(section);
  };

  // Handle profile image change
  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle post media change
  const handlePostMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setMediaPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = ""; // Restore scrolling
    setMediaPreview(null); // Clear media preview

    // Reset form (would use a form ref in a real implementation)
    const form = document.getElementById(
      "post-creation-form"
    ) as HTMLFormElement;
    if (form) form.reset();
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Post creation functionality will be implemented with backend integration."
    );
    closeModal();
  };

  // Handle clicking on profile image
  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="profile-page">
      {/* Post Creation Modal */}
      <div
        className={`modal ${isModalOpen ? "active" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create New Post</h2>
            <button
              className="modal-close"
              aria-label="Close modal"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form
              id="post-creation-form"
              className="form-container"
              onSubmit={handleFormSubmit}
            >
              <div className="form-group">
                <label htmlFor="post-title" className="form-label">
                  Post Title
                </label>
                <input
                  type="text"
                  id="post-title"
                  className="form-input"
                  placeholder="Give your post a title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="post-category" className="form-label">
                  Category
                </label>
                <select id="post-category" className="form-select" required>
                  <option value="" disabled selected>
                    Select a category
                  </option>
                  <option value="anime">Anime</option>
                  <option value="manga">Manga</option>
                  <option value="comics">Comics</option>
                  <option value="metaverse">Metaverse</option>
                  <option value="worlds">Worlds & Universes</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="post-content" className="form-label">
                  Post Content
                </label>
                <textarea
                  id="post-content"
                  className="form-textarea"
                  rows={5}
                  placeholder="Share your thoughts, theories, or creations..."
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="post-media" className="form-label">
                  Add Media (Optional)
                </label>
                <div className="media-upload-container">
                  <input
                    type="file"
                    id="post-media"
                    className="media-upload-input"
                    accept="image/*"
                    ref={postMediaInputRef}
                    onChange={handlePostMediaChange}
                  />
                  <label htmlFor="post-media" className="media-upload-label">
                    <span className="media-upload-icon">📷</span>
                    <span className="media-upload-text">
                      Click to upload image
                    </span>
                  </label>
                  <div
                    className={`media-preview ${
                      mediaPreview ? "has-image" : ""
                    }`}
                  >
                    {mediaPreview && (
                      <img src={mediaPreview} alt="Post media preview" />
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Post Visibility</label>
                <div className="form-radio">
                  <input
                    type="radio"
                    id="visibility-public"
                    name="post-visibility"
                    value="public"
                    defaultChecked
                  />
                  <label htmlFor="visibility-public">
                    Public - Anyone can see this post
                  </label>
                </div>
                <div className="form-radio">
                  <input
                    type="radio"
                    id="visibility-followers"
                    name="post-visibility"
                    value="followers"
                  />
                  <label htmlFor="visibility-followers">
                    Followers Only - Only your followers can see this post
                  </label>
                </div>
                <div className="form-radio">
                  <input
                    type="radio"
                    id="visibility-private"
                    name="post-visibility"
                    value="private"
                  />
                  <label htmlFor="visibility-private">
                    Private - Only you can see this post
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline cancel-post-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <header className="profile-header">
        <div className="profile-header-content">
          <div className="profile-image-section">
            <div className="profile-image-container">
              <div className="profile-image-wrapper">
                <img
                  id="user-profile-image"
                  alt="User Profile Picture"
                  src={profileImage}
                  onClick={handleProfileImageClick}
                />
                <label
                  htmlFor="profile-image-upload"
                  className="profile-image-label"
                >
                  Change Profile Picture
                </label>
                <input
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  aria-label="Upload profile picture"
                  ref={fileInputRef}
                  onChange={handleProfileImageChange}
                />
              </div>
            </div>
            <div className="user-name-display">
              <h1>Hello, User</h1>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">42</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">256</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">128</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>
      </header>

      <main className="profile-main">
        <nav className="profile-options-bar">
          <button
            className={`profile-option-item ${
              activeSection === "comments" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("comments")}
          >
            Comments
          </button>
          <button
            className={`profile-option-item ${
              activeSection === "posts" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("posts")}
          >
            Posts
          </button>
          <button
            className={`profile-option-item ${
              activeSection === "work-requests" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("work-requests")}
          >
            Work Requests
          </button>
          <button
            className={`profile-option-item ${
              activeSection === "settings" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("settings")}
          >
            Settings
          </button>
          <button
            className={`profile-option-item ${
              activeSection === "drafts" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("drafts")}
          >
            Drafts
          </button>
        </nav>

        <div className="profile-content-container">
          <div
            id="comments"
            className={`profile-content-section ${
              activeSection === "comments" ? "active" : ""
            }`}
          >
            <h2>Recent Comments</h2>
            {/* Dynamic comments content */}
            <div className="comment-placeholder">No comments yet.</div>
          </div>

          <div
            id="posts"
            className={`profile-content-section ${
              activeSection === "posts" ? "active" : ""
            }`}
          >
            <h2>Your Posts</h2>
            {/* Dynamic posts content */}
            <div className="posts-placeholder">No posts yet.</div>
          </div>

          <div
            id="work-requests"
            className={`profile-content-section ${
              activeSection === "work-requests" ? "active" : ""
            }`}
          >
            <h2>Work Requests</h2>
            {/* Dynamic work requests content */}
            <div className="work-requests-placeholder">No work requests.</div>
          </div>

          <div
            id="settings"
            className={`profile-content-section ${
              activeSection === "settings" ? "active" : ""
            }`}
          >
            <h2>Account Settings</h2>

            {/* Account Information */}
            <div className="settings-group">
              <h3>Account Information</h3>
              <div className="form-group">
                <label htmlFor="display-name">Display Name</label>
                <input
                  type="text"
                  id="display-name"
                  name="display-name"
                  defaultValue="User"
                />
              </div>
              <div className="form-group">
                <label htmlFor="user-email">Email Address</label>
                <input
                  type="email"
                  id="user-email"
                  name="user-email"
                  defaultValue="user@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="user-bio">Bio</label>
                <textarea
                  id="user-bio"
                  name="user-bio"
                  rows={3}
                  className="settings-textarea"
                  placeholder="Tell us about yourself..."
                ></textarea>
                <p className="setting-description">
                  Your bio appears on your public profile.
                </p>
              </div>
              <div className="form-group">
                <button type="button" className="secondary-btn">
                  Change Password
                </button>
              </div>
            </div>

            {/* Display Preferences */}
            <div className="settings-group">
              <h3>Display Preferences</h3>
              <div className="settings-subgroup">
                <h4>Site Theme</h4>
                <ul className="theme-options-list">
                  <li>
                    <label htmlFor="light-theme">Light Theme</label>
                    <input
                      type="radio"
                      id="light-theme"
                      name="theme"
                      value="light"
                    />
                  </li>
                  <li>
                    <label htmlFor="dark-theme">Dark Theme</label>
                    <input
                      type="radio"
                      id="dark-theme"
                      name="theme"
                      value="dark"
                    />
                  </li>
                  <li>
                    <label htmlFor="system-theme">Use System Preference</label>
                    <input
                      type="radio"
                      id="system-theme"
                      name="theme"
                      value="system"
                    />
                  </li>
                </ul>
              </div>

              <div className="settings-subgroup">
                <h4>Section Content Theme</h4>
                <div className="dropdown-container">
                  <label htmlFor="section-content-theme">
                    Choose how section content appears:
                  </label>
                  <select
                    id="section-content-theme"
                    name="section-content-theme"
                    className="settings-dropdown"
                  >
                    <option value="light">Light Background</option>
                    <option value="dark">Dark Background</option>
                    <option value="auto">Match Site Theme</option>
                  </select>
                </div>
                <p className="setting-description">
                  This affects the background color of content sections across
                  the site.
                </p>
              </div>

              <div className="settings-subgroup">
                <h4>Content Layout</h4>
                <div className="dropdown-container">
                  <label htmlFor="content-layout">Default content view:</label>
                  <select
                    id="content-layout"
                    name="content-layout"
                    className="settings-dropdown"
                  >
                    <option value="grid">Grid View</option>
                    <option value="list">List View</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="settings-group">
              <h3>Privacy Settings</h3>
              <ul className="settings-toggle-list">
                <li>
                  <span className="setting-label">
                    Show my profile to everyone
                  </span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="public-profile"
                      name="public-profile"
                      defaultChecked
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </li>
                <li>
                  <span className="setting-label">Show my online status</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="show-online-status"
                      name="show-online-status"
                      defaultChecked
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </li>
                <li>
                  <span className="setting-label">
                    Allow others to tag me in posts
                  </span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="allow-tagging"
                      name="allow-tagging"
                      defaultChecked
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </li>
              </ul>
            </div>

            {/* Notification Preferences */}
            <div className="settings-group">
              <h3>Notification Preferences</h3>
              <ul className="settings-toggle-list">
                <li>
                  <span className="setting-label">Email notifications</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      name="email-notifications"
                      defaultChecked
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </li>
                <li>
                  <span className="setting-label">Comment replies</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="comment-notifications"
                      name="comment-notifications"
                      defaultChecked
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </li>
                <li>
                  <span className="setting-label">New followers</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="follower-notifications"
                      name="follower-notifications"
                      defaultChecked
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </li>
                <li>
                  <span className="setting-label">Content updates</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="content-notifications"
                      name="content-notifications"
                      defaultChecked
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </li>
              </ul>
            </div>

            {/* Connected Accounts */}
            <div className="settings-group">
              <h3>Connected Accounts</h3>
              <div className="connected-account">
                <div className="connected-account-info">
                  <span className="connected-account-icon">🔗</span>
                  <span className="connected-account-name">Google</span>
                  <span className="connected-account-status">
                    Not Connected
                  </span>
                </div>
                <button type="button" className="connect-btn">
                  Connect
                </button>
              </div>
              <div className="connected-account">
                <div className="connected-account-info">
                  <span className="connected-account-icon">🔗</span>
                  <span className="connected-account-name">Discord</span>
                  <span className="connected-account-status">
                    Not Connected
                  </span>
                </div>
                <button type="button" className="connect-btn">
                  Connect
                </button>
              </div>
              <div className="connected-account">
                <div className="connected-account-info">
                  <span className="connected-account-icon">🔗</span>
                  <span className="connected-account-name">Twitter</span>
                  <span className="connected-account-status">
                    Not Connected
                  </span>
                </div>
                <button type="button" className="connect-btn">
                  Connect
                </button>
              </div>
            </div>

            <button type="submit" className="save-settings-btn">
              Save Changes
            </button>
          </div>

          <div
            id="drafts"
            className={`profile-content-section ${
              activeSection === "drafts" ? "active" : ""
            }`}
          >
            <h2>Your Drafts</h2>
            {/* Dynamic drafts content */}
            <div className="drafts-placeholder">No drafts yet.</div>
          </div>
        </div>
      </main>

      <button
        className="create-post-button"
        aria-label="Create New Post"
        onClick={openModal}
      >
        +
      </button>
    </div>
  );
};

export default ProfilePage;
