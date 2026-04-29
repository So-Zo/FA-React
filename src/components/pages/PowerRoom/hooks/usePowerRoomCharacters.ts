import { useMemo, useState } from "react";
import { CharacterSearchResult } from "../../../../types";
import { useCharacterDetails } from "./useCharacterDetails";

export const usePowerRoomCharacters = () => {
  const [leftCharacter, setLeftCharacter] =
    useState<CharacterSearchResult | null>(null);
  const [rightCharacter, setRightCharacter] =
    useState<CharacterSearchResult | null>(null);

  const {
    character: leftCharacterDetails,
    error: leftCharacterError,
    refreshCharacter: refreshLeftCharacter,
  } = useCharacterDetails(leftCharacter?.id || null);
  const {
    character: rightCharacterDetails,
    error: rightCharacterError,
    refreshCharacter: refreshRightCharacter,
  } = useCharacterDetails(rightCharacter?.id || null);

  const leftCharacterId = leftCharacterDetails?.id ?? null;
  const rightCharacterId = rightCharacterDetails?.id ?? null;

  const pageLoadError = useMemo(() => {
    const errors = [leftCharacterError, rightCharacterError].filter(
      (message): message is string => Boolean(message),
    );

    if (errors.length === 0) {
      return null;
    }

    return errors.join(" ");
  }, [leftCharacterError, rightCharacterError]);

  return {
    leftCharacter,
    rightCharacter,
    setLeftCharacter,
    setRightCharacter,
    leftCharacterDetails,
    rightCharacterDetails,
    leftCharacterId,
    rightCharacterId,
    leftCharacterError,
    rightCharacterError,
    pageLoadError,
    refreshLeftCharacter,
    refreshRightCharacter,
  };
};
