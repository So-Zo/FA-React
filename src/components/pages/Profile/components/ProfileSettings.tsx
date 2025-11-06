import React from "react";
import { useProfileContext } from "../ProfileContext";
import { useProfileForms } from "../hooks";
import { useTheme } from "../../../../shared/hooks/ThemeContext";

export const ProfileSettings: React.FC = () => {
  const { profileData, updateProfileData } = useProfileContext();
  const { currentTheme, setTheme } = useTheme();
  const { formState, updateSettingsForm } = useProfileForms({
    settingsForm: {
      userDisplayName: profileData?.display_name || "",
      userBio: profileData?.bio || "",
    },
  });

  const handleSaveSettings = async () => {
    const { userDisplayName, userBio } = formState.settingsForm;
    await updateProfileData({
      display_name: userDisplayName,
      bio: userBio,
    });
  };

  const handleThemeChange = (
    newTheme: "default" | "light" | "dark" | "system"
  ) => {
    setTheme(newTheme);
  };

  return (
    <div>
      {/* Account Information */}
      <div className="settings-group">
        <h3>Account Information</h3>

        <div className="form-group">
          <label htmlFor="display-name">Display Name</label>
          <input
            type="text"
            id="display-name"
            name="display-name"
            value={formState.settingsForm.userDisplayName}
            onChange={(e) =>
              updateSettingsForm({ userDisplayName: e.target.value })
            }
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
            value={formState.settingsForm.userBio}
            onChange={(e) => updateSettingsForm({ userBio: e.target.value })}
          />
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
              <label htmlFor="default-theme">FanArcs Default</label>
              <input
                type="radio"
                id="default-theme"
                name="theme"
                value="default"
                checked={currentTheme === "default"}
                onChange={() => handleThemeChange("default")}
              />
            </li>
            <li>
              <label htmlFor="light-theme">Light Theme</label>
              <input
                type="radio"
                id="light-theme"
                name="theme"
                value="light"
                checked={currentTheme === "light"}
                onChange={() => handleThemeChange("light")}
              />
            </li>
            <li>
              <label htmlFor="dark-theme">Dark Theme</label>
              <input
                type="radio"
                id="dark-theme"
                name="theme"
                value="dark"
                checked={currentTheme === "dark"}
                onChange={() => handleThemeChange("dark")}
              />
            </li>
            <li>
              <label htmlFor="system-theme">Use System Preference</label>
              <input
                type="radio"
                id="system-theme"
                name="theme"
                value="system"
                checked={currentTheme === "system"}
                onChange={() => handleThemeChange("system")}
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
            This affects the background color of content sections across the
            site.
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
            <span className="setting-label">Show my profile to everyone</span>
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

      <div className="form-group">
        <button onClick={handleSaveSettings} className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};
