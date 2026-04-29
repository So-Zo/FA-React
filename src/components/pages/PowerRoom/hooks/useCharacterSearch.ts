import { useState, useEffect } from "react";
import { CharacterSearchResult, UniverseType } from "../../../../types";
import { CharacterService } from "../../../../services/CharacterService";
import { withCache } from "../../../../utils/cache";

export const useCharacterSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniverse, setSelectedUniverse] = useState<
    UniverseType | "all"
  >("all");
  const [results, setResults] = useState<CharacterSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        let data: CharacterSearchResult[];

        if (searchQuery.trim()) {
          // Use search with caching
          const cacheKey = `character-search-${searchQuery.trim()}-${selectedUniverse}`;
          data = await withCache(
            cacheKey,
            () =>
              CharacterService.searchCharacters(
                searchQuery.trim(),
                selectedUniverse !== "all" ? selectedUniverse : undefined,
              ),
            2 * 60 * 1000,
          );
        } else {
          // Get default preview characters (2-3 alphabetically)
          const cacheKey =
            selectedUniverse === "all"
              ? `characters-preview-all`
              : `characters-preview-${selectedUniverse}`;

          data = await withCache(
            cacheKey,
            async () => {
              if (selectedUniverse === "all") {
                const allCharacters = await CharacterService.searchCharacters(
                  "",
                  undefined,
                );
                return allCharacters
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .slice(0, 3);
              } else {
                const universeCharacters =
                  await CharacterService.getCharactersByUniverse(
                    selectedUniverse as UniverseType,
                  );
                return universeCharacters
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .slice(0, 3);
              }
            },
            10 * 60 * 1000,
          );
        }

        setResults(data || []);
      } catch (err) {
        console.error("Character search error:", err);
        setError(err instanceof Error ? err.message : "Search failed");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const debounceTimer = setTimeout(searchCharacters, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedUniverse]);

  return {
    searchQuery,
    setSearchQuery,
    selectedUniverse,
    setSelectedUniverse,
    results,
    loading,
    error,
  };
};
