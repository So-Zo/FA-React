import { useState } from "react";
import { PowerRoomCharacter, CharacterComparison } from "../../../../types";

export const useCharacterComparison = () => {
  const [comparison, setComparison] = useState<CharacterComparison>({
    leftCharacter: null,
    rightCharacter: null,
    activeTab: "abilities",
  });

  const setLeftCharacter = (character: PowerRoomCharacter | null) => {
    setComparison((prev: CharacterComparison) => ({
      ...prev,
      leftCharacter: character,
    }));
  };

  const setRightCharacter = (character: PowerRoomCharacter | null) => {
    setComparison((prev: CharacterComparison) => ({
      ...prev,
      rightCharacter: character,
    }));
  };

  const setActiveTab = (tab: CharacterComparison["activeTab"]) => {
    setComparison((prev) => ({
      ...prev,
      activeTab: tab,
    }));
  };

  const clearComparison = () => {
    setComparison({
      leftCharacter: null,
      rightCharacter: null,
      activeTab: "abilities",
    });
  };

  const swapCharacters = () => {
    setComparison((prev) => ({
      ...prev,
      leftCharacter: prev.rightCharacter,
      rightCharacter: prev.leftCharacter,
    }));
  };

  return {
    comparison,
    setLeftCharacter,
    setRightCharacter,
    setActiveTab,
    clearComparison,
    swapCharacters,
  };
};
