import { createContext, useContext } from "react";

export type ActiveEditController = {
  canEdit: boolean;
  isEditing: boolean;
  toggle: () => void;
  save: () => Promise<void>;
};

export type EditModeContextType = {
  canEdit: boolean;
  isEditing: boolean;
  toggle: () => void;
  save: () => Promise<void>;
  setActiveController: (controller: ActiveEditController | null) => void;
};

export const EditModeContext = createContext<EditModeContextType | null>(null);

export const useEditMode = () => {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used within EditModeProvider");
  return ctx;
};
