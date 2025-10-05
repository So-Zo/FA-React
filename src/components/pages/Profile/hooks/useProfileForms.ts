import { useState } from "react";
import {
  ProfileFormsState,
  ProfileSettingsInputs,
  NewPostInputs,
} from "../types";

// Initial form state
const initialFormState: ProfileFormsState = {
  settingsForm: {
    userDisplayName: "",
    userBio: "",
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
    setFormState((prev) => ({
      ...prev,
      settingsForm: {
        ...prev.settingsForm,
        ...updates,
      },
    }));
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
