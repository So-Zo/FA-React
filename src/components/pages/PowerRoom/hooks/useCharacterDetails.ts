import { useState, useEffect } from "react";
import { PowerRoomCharacter } from "../../../../types";
import { dataService } from "../../../../services/dataService";
import { withCache } from "../../../../utils/cache";

export const useCharacterDetails = (characterId: string | null) => {
  const [character, setCharacter] = useState<PowerRoomCharacter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      if (!characterId) {
        setCharacter(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Single optimized query with caching
        const data = await withCache(
          `character-complete-${characterId}`,
          () => dataService.getCharacterComplete(characterId),
          5 * 60 * 1000 // 5 minute cache
        );

        // Transform data to match our PowerRoomCharacter interface
        const transformedCharacter: PowerRoomCharacter = {
          ...data,
          created_by: data.created_by || "",
          abilities: data.character_abilities?.[0] || {
            id: "",
            character_id: characterId,
            primary_powers: [],
            special_techniques: [],
            weaknesses: [],
            power_description: "",
            updated_at: new Date().toISOString(),
          },
          timeline: data.character_events || [],
          world_info: data.character_world_info?.[0] || {
            id: "",
            character_id: characterId,
            universe_name: data.universe,
            universe_description: "",
            notable_locations: [],
            power_system_description: "",
            scaling_context: "",
            updated_at: new Date().toISOString(),
          },
          notable_feats: data.character_feats || [],
        };

        console.log("🔍 Character data from DB:", data);
        console.log("🔄 Transformed character:", transformedCharacter);
        console.log("📋 Timeline data (raw):", data.character_events);
        console.log(
          "📋 Timeline data (transformed):",
          transformedCharacter.timeline
        );
        console.log(
          "📋 Timeline count:",
          transformedCharacter.timeline?.length || 0
        );
        console.log("🏆 Feats data:", data.character_feats);
        console.log("🌍 World info data:", data.character_world_info);

        // Debug: Check if timeline transformation is working
        if (data.character_events && data.character_events.length > 0) {
          console.log("✅ Timeline events found in DB data");
          console.log("🔍 First event structure:", data.character_events[0]);
        } else {
          console.log("❌ No timeline events found in DB data");
        }

        setCharacter(transformedCharacter);
      } catch (err) {
        console.error("Failed to fetch character details:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load character"
        );
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [characterId]);

  return { character, loading, error };
};
