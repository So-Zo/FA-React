import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useEditMode } from "../types/editMode";
import { PageEditContextType, PageEditTarget } from "../types/pageEdit";

interface UsePageEditControllerOptions {
  canEdit: boolean;
  onSave: (target: PageEditTarget | null) => Promise<void>;
  onDiscard?: (target: PageEditTarget | null) => void;
  getDefaultTarget?: () => PageEditTarget | null;
}

const DEFAULT_PAGE_TARGET: PageEditTarget = { kind: "page" };

export const usePageEditController = ({
  canEdit,
  onSave,
  onDiscard,
  getDefaultTarget,
}: UsePageEditControllerOptions): PageEditContextType => {
  const { setActiveController } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTarget, setActiveTarget] = useState<PageEditTarget | null>(null);
  const canEditRef = useRef(canEdit);
  const activeTargetRef = useRef<PageEditTarget | null>(activeTarget);
  const onSaveRef = useRef(onSave);
  const onDiscardRef = useRef(onDiscard);
  const getDefaultTargetRef = useRef(getDefaultTarget);

  useEffect(() => {
    canEditRef.current = canEdit;
    activeTargetRef.current = activeTarget;
    onSaveRef.current = onSave;
    onDiscardRef.current = onDiscard;
    getDefaultTargetRef.current = getDefaultTarget;
  }, [activeTarget, canEdit, getDefaultTarget, onDiscard, onSave]);

  const enterEditMode = useCallback(
    (target?: PageEditTarget) => {
      if (!canEdit) {
        return;
      }

      const resolvedTarget =
        target ?? getDefaultTarget?.() ?? DEFAULT_PAGE_TARGET;

      setIsEditing(true);
      setActiveTarget(resolvedTarget);
    },
    [canEdit, getDefaultTarget],
  );

  const exitEditMode = useCallback(() => {
    setIsEditing(false);
    setActiveTarget(null);
  }, []);

  const toggleEditMode = useCallback(() => {
    if (!canEditRef.current) {
      return;
    }

    setIsEditing((current) => {
      if (current) {
        setActiveTarget(null);
        return false;
      }

      setActiveTarget(
        (currentTarget) =>
          currentTarget ??
          getDefaultTargetRef.current?.() ??
          DEFAULT_PAGE_TARGET,
      );
      return true;
    });
  }, []);

  const selectTarget = useCallback((target: PageEditTarget) => {
    if (!canEditRef.current) {
      return;
    }

    setActiveTarget(target);
    setIsEditing(true);
  }, []);

  const save = useCallback(async () => {
    if (!canEditRef.current) {
      return;
    }

    await onSaveRef.current(
      activeTargetRef.current ?? getDefaultTargetRef.current?.() ?? null,
    );
  }, []);

  const discard = useCallback(() => {
    onDiscardRef.current?.(activeTargetRef.current);
    setActiveTarget(null);
    setIsEditing(false);
  }, []);

  const controller = useMemo(
    () => ({
      canEdit,
      isEditing,
      activeTarget,
      enterEditMode,
      exitEditMode,
      toggleEditMode,
      selectTarget,
      save,
      discard,
    }),
    [
      activeTarget,
      canEdit,
      discard,
      enterEditMode,
      exitEditMode,
      isEditing,
      save,
      selectTarget,
      toggleEditMode,
    ],
  );

  useEffect(() => {
    setActiveController({
      canEdit,
      isEditing,
      toggle: toggleEditMode,
      save,
    });

    return () => {
      setActiveController(null);
    };
  }, [canEdit, isEditing, save, toggleEditMode, setActiveController]);

  return controller;
};

export default usePageEditController;
