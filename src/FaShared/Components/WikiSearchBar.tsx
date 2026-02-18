import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWikiSearch } from "../hooks/useWikiSearch";

interface WikiSearchBarProps {
  placeholder?: string;
  className?: string;
}

const WikiSearchBar: React.FC<WikiSearchBarProps> = ({
  placeholder = "Search for media, characters, universes, etc.",
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const {
    searchQuery,
    setSearchQuery,
    results,
    loading,
    debouncedSearchQuery,
  } = useWikiSearch();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showResults = isFocused && debouncedSearchQuery.length > 0;

  const getTypeTag = (pageType: string, genre?: string) => {
    // Format the type tag like "Series/Anime" or "Character"
    if (genre) {
      return `${pageType.charAt(0).toUpperCase() + pageType.slice(1)}/${
        genre.charAt(0).toUpperCase() + genre.slice(1)
      }`;
    }
    return pageType.charAt(0).toUpperCase() + pageType.slice(1);
  };

  const getTypeColor = (pageType: string) => {
    const colors = {
      series: "#3b82f6", // blue
      character: "#10b981", // green
      overview: "#8b5cf6", // purple
      history: "#f59e0b", // amber
      directory: "#6b7280", // gray
      creator: "#ef4444", // red
      studio: "#ec4899", // pink
    };
    return colors[pageType as keyof typeof colors] || "#6b7280";
  };

  return (
    <div className={`wiki-search-container ${className}`} ref={searchRef}>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        className="wiki-search-input"
        aria-label="Search wiki"
      />

      {showResults && (
        <div className="wiki-search-dropdown">
          {loading ? (
            <div className="wiki-search-loading">Searching...</div>
          ) : results.length > 0 ? (
            <div className="wiki-search-results">
              {results.map((result) => (
                <Link
                  key={result.id}
                  to={result.full_path}
                  className="wiki-search-result-item"
                  onClick={() => {
                    setIsFocused(false);
                    setSearchQuery("");
                  }}
                >
                  <div className="wiki-search-result-content">
                    <span className="wiki-search-result-title">
                      {result.name}
                    </span>
                    <span
                      className="wiki-search-result-type-tag"
                      style={{ backgroundColor: getTypeColor(result.type) }}
                    >
                      {getTypeTag(
                        result.type,
                        result.description?.split(" in ")[1]
                      )}
                    </span>
                  </div>
                  {result.description && (
                    <div className="wiki-search-result-description">
                      {result.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="wiki-search-no-results">
              No results found for "{debouncedSearchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WikiSearchBar;
