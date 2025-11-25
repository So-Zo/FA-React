import React, { useState, useCallback } from "react";
import { EditModeContext } from "./editMode";

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggle = useCallback(() => setIsEditing((v) => !v), []);

  // Simple saveAll that just logs for now - TipTap will handle actual saving
  const saveAll = useCallback(async () => {
    // Individual WikiEditor components will handle their own saving
  }, []);

  return (
    <EditModeContext.Provider value={{ isEditing, toggle, saveAll }}>
      {children}
    </EditModeContext.Provider>
  );
};
