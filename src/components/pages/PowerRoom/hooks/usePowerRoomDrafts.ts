import { useCallback, useMemo, useState } from "react";
import { PageEditTarget } from "../../../../FaShared/types/pageEdit";
import { CharacterService } from "../../../../services/CharacterService";
import { TipTapContent } from "../../../../types";
import {
  DraftChange,
  PowerRoomTabId,
  TAB_CATEGORY_MAP,
  isPowerRoomTabId,
  parseTargetId,
} from "../powerRoomEditing";

interface UsePowerRoomDraftsOptions {
  activeTab: PowerRoomTabId;
  leftCharacterId: string | null;
  rightCharacterId: string | null;
  refreshLeftCharacter: () => Promise<void>;
  refreshRightCharacter: () => Promise<void>;
}

export const usePowerRoomDrafts = ({
  activeTab,
  leftCharacterId,
  rightCharacterId,
  refreshLeftCharacter,
  refreshRightCharacter,
}: UsePowerRoomDraftsOptions) => {
  const [draftChanges, setDraftChanges] = useState<Record<string, DraftChange>>(
    {},
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [refreshNotice, setRefreshNotice] = useState<string | null>(null);

  const hasPendingChanges = useMemo(
    () => Object.keys(draftChanges).length > 0,
    [draftChanges],
  );

  const clearStatusMessages = useCallback(() => {
    setSaveError(null);
    setRefreshNotice(null);
  }, []);

  const resolveDefaultTarget = useCallback(() => {
    if (leftCharacterId || rightCharacterId) {
      return {
        kind: "section" as const,
        sectionId: activeTab,
      };
    }

    return null;
  }, [activeTab, leftCharacterId, rightCharacterId]);

  const getTargetId = useCallback(
    (characterId: string | undefined) => {
      if (!characterId) {
        return null;
      }

      return `${activeTab}:${characterId}`;
    },
    [activeTab],
  );

  const getDraftCountForCharacter = useCallback(
    (characterId: string | null) => {
      if (!characterId) {
        return 0;
      }

      return Object.keys(draftChanges).reduce((count, targetId) => {
        return parseTargetId(targetId)?.characterId === characterId
          ? count + 1
          : count;
      }, 0);
    },
    [draftChanges],
  );

  const clearDraftsForCharacter = useCallback((characterId: string) => {
    setDraftChanges((current) => {
      const updated = { ...current };

      for (const targetId of Object.keys(updated)) {
        if (parseTargetId(targetId)?.characterId === characterId) {
          delete updated[targetId];
        }
      }

      return updated;
    });
  }, []);

  const updateDraft = useCallback(
    (targetId: string, content: TipTapContent, html: string) => {
      setSaveError(null);
      setRefreshNotice(null);

      setDraftChanges((current) => ({
        ...current,
        [targetId]: {
          content,
          html,
        },
      }));
    },
    [],
  );

  const getDraftContent = useCallback(
    (characterId: string | undefined, fallbackContent: TipTapContent) => {
      const targetId = getTargetId(characterId);
      return targetId
        ? (draftChanges[targetId]?.content ?? fallbackContent)
        : fallbackContent;
    },
    [draftChanges, getTargetId],
  );

  const saveCurrentDraft = useCallback(
    async (target: PageEditTarget | null) => {
      const tabId = target?.kind === "section" ? target.sectionId : null;

      if (!isPowerRoomTabId(tabId) || isSaving) {
        return;
      }

      const pendingDraftEntries = Object.entries(draftChanges).filter(
        ([targetId]) => parseTargetId(targetId)?.tabId === tabId,
      );

      if (pendingDraftEntries.length === 0) {
        setSaveError(null);
        return;
      }

      setIsSaving(true);
      setSaveError(null);
      setRefreshNotice(null);

      try {
        for (const [targetId, draft] of pendingDraftEntries) {
          const parsedTarget = parseTargetId(targetId);

          if (!parsedTarget) {
            continue;
          }

          await CharacterService.saveCharacterCategoryContent(
            parsedTarget.characterId,
            TAB_CATEGORY_MAP[parsedTarget.tabId],
            draft.content,
            draft.html,
          );
        }
      } catch (error) {
        console.error("Failed to save Power Room drafts:", error);
        setSaveError("Save failed. Your changes are still in the editor.");
        setIsSaving(false);
        throw error;
      }

      setDraftChanges((current) => {
        const updated = { ...current };

        for (const [targetId] of pendingDraftEntries) {
          delete updated[targetId];
        }

        return updated;
      });

      const changedCharacterIds = new Set(
        pendingDraftEntries
          .map(([targetId]) => parseTargetId(targetId)?.characterId ?? null)
          .filter((characterId): characterId is string => Boolean(characterId)),
      );

      const refreshTasks: Promise<void>[] = [];

      if (leftCharacterId && changedCharacterIds.has(leftCharacterId)) {
        refreshTasks.push(refreshLeftCharacter());
      }

      if (rightCharacterId && changedCharacterIds.has(rightCharacterId)) {
        refreshTasks.push(refreshRightCharacter());
      }

      try {
        await Promise.all(refreshTasks);
      } catch (error) {
        console.error("Failed to refresh Power Room after save:", error);
        setRefreshNotice(
          "Changes saved, but the comparison view could not be refreshed automatically.",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [
      draftChanges,
      isSaving,
      leftCharacterId,
      refreshLeftCharacter,
      refreshRightCharacter,
      rightCharacterId,
    ],
  );

  const discardCurrentDraft = useCallback((target: PageEditTarget | null) => {
    const tabId = target?.kind === "section" ? target.sectionId : null;

    if (!isPowerRoomTabId(tabId)) {
      return;
    }

    setSaveError(null);
    setRefreshNotice(null);

    setDraftChanges((current) => {
      const updated = { ...current };

      for (const targetId of Object.keys(updated)) {
        if (parseTargetId(targetId)?.tabId === tabId) {
          delete updated[targetId];
        }
      }

      return updated;
    });
  }, []);

  return {
    draftChanges,
    hasPendingChanges,
    isSaving,
    saveError,
    refreshNotice,
    clearStatusMessages,
    resolveDefaultTarget,
    saveCurrentDraft,
    discardCurrentDraft,
    updateDraft,
    getTargetId,
    getDraftContent,
    getDraftCountForCharacter,
    clearDraftsForCharacter,
  };
};
