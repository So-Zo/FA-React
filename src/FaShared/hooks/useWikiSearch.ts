import { useState, useEffect } from "react";
import { useSearch } from "./useSearch";
import { supabase } from "../../lib/supabaseClient";

// Wiki search types - we'll expand these as we build tables
export interface WikiSearchResult {
  id: string;
  name: string;
  type: "character" | "world" | "series";
  description?: string;
  tags?: string[];
  created_at: string;
  full_path: string; // Added for routing
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

      // Build Supabase query
      let supabaseQuery = supabase
        .from("wiki_pages")
        .select("id, title, full_path, page_type, genre, created_at")
        .textSearch("search_vector", query);

      // Apply filters if provided
      if (searchOptions.type) {
        supabaseQuery = supabaseQuery.eq("page_type", searchOptions.type);
      }

      // Execute query
      const { data, error } = await supabaseQuery.limit(
        searchOptions.limit || 10
      );

      if (error) {
        throw error;
      }

      // Transform to WikiSearchResult format
      const searchResults: WikiSearchResult[] = (data || []).map((page) => ({
        id: page.id,
        name: page.title,
        type: page.page_type as "character" | "world" | "series",
        description: `${page.page_type} in ${page.genre || "general"}`,
        tags: [], // We don't have tags in our simplified schema
        created_at: page.created_at,
        full_path: page.full_path,
      }));

      setResults(searchResults);
    } catch (err) {
      console.error("Wiki search failed:", err);
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
