import { useState } from "react";
import { useDebounce } from "./useDebounce";

/**
 * Generic search hook that provides debounced search functionality
 * Can be used for both social (posts) and wiki search
 *
 * @param delay - Debounce delay in milliseconds (default: 300ms)
 * @returns Object with search query, debounced query, and setter function
 */
export function useSearch(delay: number = 300) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, delay);

  return {
    searchQuery,
    debouncedSearchQuery,
    setSearchQuery,
    isTyping: searchQuery !== debouncedSearchQuery,
  };
}
