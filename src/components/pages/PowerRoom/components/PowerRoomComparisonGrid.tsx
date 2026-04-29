import React from "react";
import { CharacterSearchResult } from "../../../../types";
import { CharacterSelector } from "./CharacterSelector";

interface PowerRoomComparisonGridProps {
  leftCharacter: CharacterSearchResult | null;
  rightCharacter: CharacterSearchResult | null;
  onLeftCharacterSelect: (character: CharacterSearchResult) => void;
  onRightCharacterSelect: (character: CharacterSearchResult) => void;
}

export const PowerRoomComparisonGrid: React.FC<
  PowerRoomComparisonGridProps
> = ({
  leftCharacter,
  rightCharacter,
  onLeftCharacterSelect,
  onRightCharacterSelect,
}) => {
  return (
    <section
      className="power-comparison-grid"
      role="region"
      aria-label="Character comparison"
    >
      <CharacterSelector
        side="left"
        selectedCharacter={leftCharacter}
        onCharacterSelect={onLeftCharacterSelect}
      />

      <div className="grid-divider" aria-hidden="true">
        VS
      </div>

      <CharacterSelector
        side="right"
        selectedCharacter={rightCharacter}
        onCharacterSelect={onRightCharacterSelect}
      />
    </section>
  );
};
