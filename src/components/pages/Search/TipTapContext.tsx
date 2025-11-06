import React, { createContext, useContext, ReactNode } from "react";
import { Editor } from "@tiptap/react";

interface TipTapContextType {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

const TipTapContext = createContext<TipTapContextType | undefined>(undefined);

export const TipTapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [editor, setEditor] = React.useState<Editor | null>(null);

  return (
    <TipTapContext.Provider value={{ editor, setEditor }}>
      {children}
    </TipTapContext.Provider>
  );
};

export const useTipTapEditor = () => {
  const context = useContext(TipTapContext);
  if (context === undefined) {
    throw new Error("useTipTapEditor must be used within a TipTapProvider");
  }
  return context;
};
