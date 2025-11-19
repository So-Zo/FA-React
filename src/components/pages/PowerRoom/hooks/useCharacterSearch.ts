import { useState, useEffect } from "react";
import { CharacterSearchResult, UniverseType } from "../../../../types";
import { dataService } from "../../../../services/dataService";
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
      if (!searchQuery.trim() && selectedUniverse === "all") {
        setResults([]);
        return;
      }

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
              dataService.searchCharacters(
                searchQuery.trim(),
                selectedUniverse !== "all" ? selectedUniverse : undefined
              ),
            2 * 60 * 1000 // 2 minute cache for searches
          );
        } else {
          // Get all characters for selected universe
          const cacheKey = `characters-by-universe-${selectedUniverse}`;
          data = await withCache(
            cacheKey,
            () =>
              dataService.getCharactersByUniverse(
                selectedUniverse as UniverseType
              ),
            10 * 60 * 1000 // 10 minute cache for universe listings
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
