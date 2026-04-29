import { useCallback, useState } from "react";
import { CharacterSearchResult } from "../../../../types";
import { PendingCharacterSwap } from "../powerRoomEditing";

interface UsePowerRoomSwapGuardOptions {
  leftCharacter: CharacterSearchResult | null;
  rightCharacter: CharacterSearchResult | null;
  applyCharacterSelection: (
    side: "left" | "right",
    character: CharacterSearchResult,
  ) => void;
  getDraftCountForCharacter: (characterId: string | null) => number;
  clearDraftsForCharacter: (characterId: string) => void;
  onSelectionChange?: () => void;
}

export const usePowerRoomSwapGuard = ({
  leftCharacter,
  rightCharacter,
  applyCharacterSelection,
  getDraftCountForCharacter,
  clearDraftsForCharacter,
  onSelectionChange,
}: UsePowerRoomSwapGuardOptions) => {
  const [pendingSwap, setPendingSwap] = useState<PendingCharacterSwap | null>(
    null,
  );

  const requestCharacterSelection = useCallback(
    (side: "left" | "right", character: CharacterSearchResult) => {
      const currentCharacter = side === "left" ? leftCharacter : rightCharacter;

      if (currentCharacter?.id === character.id) {
        return;
      }

      const draftCount = getDraftCountForCharacter(
        currentCharacter?.id ?? null,
      );

      if (currentCharacter?.id && draftCount > 0) {
        setPendingSwap({
          side,
          nextCharacter: character,
          currentCharacterId: currentCharacter.id,
          currentCharacterName: currentCharacter.name,
          draftCount,
        });
        return;
      }

      onSelectionChange?.();
      applyCharacterSelection(side, character);
    },
    [
      applyCharacterSelection,
      getDraftCountForCharacter,
      leftCharacter,
      onSelectionChange,
      rightCharacter,
    ],
  );

  const confirmPendingSwap = useCallback(() => {
    if (!pendingSwap) {
      return;
    }

    clearDraftsForCharacter(pendingSwap.currentCharacterId);
    onSelectionChange?.();
    applyCharacterSelection(pendingSwap.side, pendingSwap.nextCharacter);
    setPendingSwap(null);
  }, [
    applyCharacterSelection,
    clearDraftsForCharacter,
    onSelectionChange,
    pendingSwap,
  ]);

  const cancelPendingSwap = useCallback(() => {
    setPendingSwap(null);
  }, []);

  return {
    pendingSwap,
    requestCharacterSelection,
    confirmPendingSwap,
    cancelPendingSwap,
  };
};
