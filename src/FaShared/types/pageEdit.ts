import { createContext, useContext } from "react";

export type PageEditTarget =
  | { kind: "page" }
  | { kind: "section"; sectionId: string };

export type PageEditContextType = {
  canEdit: boolean;
  isEditing: boolean;
  activeTarget: PageEditTarget | null;
  enterEditMode: (target?: PageEditTarget) => void;
  exitEditMode: () => void;
  toggleEditMode: () => void;
  selectTarget: (target: PageEditTarget) => void;
  save: () => Promise<void>;
  discard: () => void;
};

export const PageEditContext = createContext<PageEditContextType | null>(null);

export const usePageEdit = () => {
  const ctx = useContext(PageEditContext);
  if (!ctx) {
    throw new Error("usePageEdit must be used within a PageEditContext");
  }
  return ctx;
};
