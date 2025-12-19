import React from "react";
import { useProfileContext } from "../ProfileContext";
import { useProfileForms } from "../hooks";
import { useTheme } from "../../../../FaShared/hooks/ThemeContext";
import { supabase } from "../../../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export const ProfileSettings: React.FC = () => {
  const { profileData, updateProfileData } = useProfileContext();
  const { currentTheme, setTheme } = useTheme();
  const navigate = useNavigate();

  const { formState, updateSettingsForm } = useProfileForms({
    settingsForm: {
      userDisplayName: profileData?.display_name || "",
      userBio: profileData?.bio || "",
      // Privacy Settings
      isPrivateProfile: profileData?.is_private ?? false, // Default to public (false) when undefined
      showOnlineStatus: profileData?.show_online_status ?? true, // Default to visible (true) when undefined
      allowTagging: true, // This might need to be added to ProfileData later
      // Notification Settings
      emailNotifications: profileData?.email_notifications ?? true,
      commentNotifications: profileData?.comment_notifications ?? true,
      followerNotifications: profileData?.follower_notifications ?? true,
      contentNotifications: profileData?.content_notifications ?? true,
    },
  });

  const handleSaveSettings = async () => {
    const {
      userDisplayName,
      userBio,
      isPrivateProfile,
      showOnlineStatus,
      emailNotifications,
      commentNotifications,
      followerNotifications,
      contentNotifications,
    } = formState.settingsForm;

    const updateData = {
      display_name: userDisplayName,
      bio: userBio,
      is_private: isPrivateProfile,
      show_online_status: showOnlineStatus,
      email_notifications: emailNotifications,
      comment_notifications: commentNotifications,
      follower_notifications: followerNotifications,
      content_notifications: contentNotifications,
    };

    try {
      await updateProfileData(updateData);
    } catch (error) {
      console.error("ProfileSettings - updateProfileData failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
                  checked={!formState.settingsForm.isPrivateProfile}
                  onChange={(e) => {
                    updateSettingsForm({ isPrivateProfile: !e.target.checked });
                  }}
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
                  checked={formState.settingsForm.showOnlineStatus}
                  onChange={(e) => {
                    updateSettingsForm({ showOnlineStatus: e.target.checked });
                  }}
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
                  checked={formState.settingsForm.emailNotifications}
                  onChange={(e) =>
                    updateSettingsForm({ emailNotifications: e.target.checked })
                  }
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
                  checked={formState.settingsForm.commentNotifications}
                  onChange={(e) =>
                    updateSettingsForm({
                      commentNotifications: e.target.checked,
                    })
                  }
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
                  checked={formState.settingsForm.followerNotifications}
                  onChange={(e) =>
                    updateSettingsForm({
                      followerNotifications: e.target.checked,
                    })
                  }
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
                  checked={formState.settingsForm.contentNotifications}
                  onChange={(e) =>
                    updateSettingsForm({
                      contentNotifications: e.target.checked,
                    })
                  }
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

        {/* Account Actions */}
        <div className="settings-group">
          <h3>Account Actions</h3>
          <div className="form-group">
            <button
              onClick={handleLogout}
              className="btn btn-secondary logout-btn"
            >
              Log Out
            </button>
            <p className="setting-description">
              You'll be signed out of your account and redirected to the home
              page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
