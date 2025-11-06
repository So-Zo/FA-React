import { useState, useEffect } from "react";
import { useSearch } from "../../../shared/hooks/useSearch";

// Wiki search types - we'll expand these as we build tables
export interface WikiSearchResult {
  id: string;
  name: string;
  type: "character" | "world" | "series";
  description?: string;
  tags?: string[];
  created_at: string;
}

export interface WikiSearchOptions {
  type?: "character" | "world" | "series" | "all";
  tags?: string[];
  limit?: number;
}

/**
 * Hook for searching wiki content (characters, worlds, series, etc.)
 * Uses the same debounced search pattern as social search
 */
export function useWikiSearch(options: WikiSearchOptions = {}) {
  const [results, setResults] = useState<WikiSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { searchQuery, debouncedSearchQuery, setSearchQuery, isTyping } =
    useSearch();

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      searchWiki(debouncedSearchQuery, options);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [debouncedSearchQuery, options.type, options.tags]);

  const searchWiki = async (
    query: string,
    searchOptions: WikiSearchOptions
  ) => {
    try {
      setLoading(true);
      setError(null);

      // For now, return empty results since we don't have wiki tables yet
      // TODO: Implement actual wiki search when tables are created
      console.log(
        `🔍 Wiki search for: "${query}" with options:`,
        searchOptions
      );

      // Placeholder - will be replaced with real Supabase queries
      setResults([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search wiki");
    } finally {
      setLoading(false);
    }
  };

  return {
    searchQuery,
    debouncedSearchQuery,
    setSearchQuery,
    isTyping,
    results,
    loading,
    error,
  };
}
