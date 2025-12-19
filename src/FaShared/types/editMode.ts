import { createContext, useContext } from "react";

export type EditModeContextType = {
  isEditing: boolean;
  toggle: () => void;
  saveAll: () => Promise<void>;
};

export const EditModeContext = createContext<EditModeContextType | null>(null);

export const useEditMode = () => {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used within EditModeProvider");
  return ctx;
};
