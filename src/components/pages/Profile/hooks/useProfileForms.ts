import { useState } from "react";
import {
  ProfileFormsState,
  ProfileSettingsInputs,
  NewPostInputs,
} from "../../../../types";

// Initial form state
const initialFormState: ProfileFormsState = {
  settingsForm: {
    userDisplayName: "",
    userBio: "",
    isPrivateProfile: false,
    showOnlineStatus: true,
    allowTagging: true,
    emailNotifications: true,
    commentNotifications: false,
    followerNotifications: false,
    contentNotifications: false,
  },
  newPostForm: {
    postTitle: "",
    postContent: "",
    postType: "discussion",
    postMedium: "other",
    postGenre: "other",
    postTags: [],
    postVisibility: "private",
  },
};

export function useProfileForms(initialData?: Partial<ProfileFormsState>) {
  const [formState, setFormState] = useState<ProfileFormsState>({
    ...initialFormState,
    ...initialData,
  });

  // Update settings form
  const updateSettingsForm = (updates: Partial<ProfileSettingsInputs>) => {
    console.log("=== FORM HOOK DEBUG ===");
    console.log("useProfileForms - updateSettingsForm called with:", updates);
    console.log(
      "useProfileForms - current formState before update:",
      formState.settingsForm
    );

    setFormState((prev) => {
      const newState = {
        ...prev,
        settingsForm: {
          ...prev.settingsForm,
          ...updates,
        },
      };
      console.log(
        "useProfileForms - new formState after update:",
        newState.settingsForm
      );
      return newState;
    });
  };

  // Update post form
  const updatePostForm = (updates: Partial<NewPostInputs>) => {
    setFormState((prev) => ({
      ...prev,
      newPostForm: {
        ...prev.newPostForm,
        ...updates,
      },
    }));
  };

  // Reset forms
  const resetForms = () => {
    setFormState(initialFormState);
  };

  // Reset specific form
  const resetSettingsForm = () => {
    setFormState((prev) => ({
      ...prev,
      settingsForm: initialFormState.settingsForm,
    }));
  };

  const resetPostForm = () => {
    setFormState((prev) => ({
      ...prev,
      newPostForm: initialFormState.newPostForm,
    }));
  };

  return {
    formState,
    updateSettingsForm,
    updatePostForm,
    resetForms,
    resetSettingsForm,
    resetPostForm,
  };
}
