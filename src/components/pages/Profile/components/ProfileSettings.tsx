import React from "react";
import { useProfileContext } from "../ProfileContext";
import { useProfileForms } from "../hooks";

export const ProfileSettings: React.FC = () => {
  const { data: profileData, updateProfileData } = useProfileContext();
  const { formState, updateSettingsForm } = useProfileForms({
    settings: {
      displayName: profileData?.display_name || "",
      bio: profileData?.bio || "",
    },
  });

  const handleSaveSettings = async () => {
    const { displayName, bio } = formState.settings;
    await updateProfileData({
      display_name: displayName,
      bio,
    });
  };

  return (
    <div className="settings-group">
      <h3>Account Information</h3>

      <div className="form-group">
        <label htmlFor="display-name">Display Name</label>
        <input
          type="text"
          id="display-name"
          name="display-name"
          value={formState.settings.displayName}
          onChange={(e) => updateSettingsForm({ displayName: e.target.value })}
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
          value={formState.settings.bio}
          onChange={(e) => updateSettingsForm({ bio: e.target.value })}
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

      <div className="form-group">
        <button onClick={handleSaveSettings} className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};
