import { useState, useEffect, useCallback } from "react";
import { PowerRoomCharacter } from "../../../../types";
import { CharacterService } from "../../../../services/CharacterService";
import { withCache } from "../../../../utils/cache";

export const useCharacterDetails = (characterId: string | null) => {
  const [character, setCharacter] = useState<PowerRoomCharacter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacterDetails = useCallback(async () => {
    if (!characterId) {
      setCharacter(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await withCache(
        `character-complete-${characterId}`,
        () => CharacterService.getCharacterComplete(characterId),
        5 * 60 * 1000,
      );

      setCharacter(data as PowerRoomCharacter);
    } catch (err) {
      console.error("Failed to fetch character details:", err);
      setError(err instanceof Error ? err.message : "Failed to load character");
      setCharacter(null);
    } finally {
      setLoading(false);
    }
  }, [characterId]);

  useEffect(() => {
    void fetchCharacterDetails();
  }, [fetchCharacterDetails]);

  return { character, loading, error, refreshCharacter: fetchCharacterDetails };
};
