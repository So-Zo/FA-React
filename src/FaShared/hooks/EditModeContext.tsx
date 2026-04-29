import React, { useState, useCallback } from "react";
import { ActiveEditController, EditModeContext } from "../types/editMode";

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeController, setActiveController] =
    useState<ActiveEditController | null>(null);

  const toggle = useCallback(() => {
    activeController?.toggle();
  }, [activeController]);

  const save = useCallback(async () => {
    await activeController?.save();
  }, [activeController]);

  const canEdit = activeController?.canEdit ?? false;
  const isEditing = activeController?.isEditing ?? false;

  return (
    <EditModeContext.Provider
      value={{
        canEdit,
        isEditing,
        toggle,
        save,
        setActiveController,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};
