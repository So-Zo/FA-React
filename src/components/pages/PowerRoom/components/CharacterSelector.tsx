import React from "react";
import { CharacterSearchResult, UniverseType } from "../../../../types";
import { useCharacterSearch } from "../hooks";

interface CharacterSelectorProps {
  side: "left" | "right";
  selectedCharacter: CharacterSearchResult | null;
  onCharacterSelect: (character: CharacterSearchResult) => void;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  side,
  selectedCharacter,
  onCharacterSelect,
}) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedUniverse,
    setSelectedUniverse,
    results,
    loading,
    error,
  } = useCharacterSearch();

  const handleCharacterClick = (character: CharacterSearchResult) => {
    onCharacterSelect(character);
    setSearchQuery(""); // Clear search after selection
  };

  return (
    <div className={`character-side ${side}`}>
      <div className="character-selection">
        <img
          src={
            selectedCharacter?.image_url ||
            "../images/character-placeholder.jpg"
          }
          alt={
            selectedCharacter?.name ||
            `Character ${side === "left" ? "1" : "2"}`
          }
          className="character-image"
        />
        <h2 className="character-name">
          {selectedCharacter?.name || "Select Character"}
        </h2>
        {selectedCharacter && (
          <p className="character-universe">
            {selectedCharacter.universe} ({selectedCharacter.universe_type})
          </p>
        )}

        <div className="character-search-row">
          <input
            type="search"
            className="character-search-input"
            placeholder="Search for characters..."
            aria-label={`Search for ${side} character`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" aria-label="Search">
            🔍
          </button>
        </div>

        <select
          className="universe-filter"
          aria-label={`Filter by universe for ${side} character`}
          value={selectedUniverse}
          onChange={(e) =>
            setSelectedUniverse(e.target.value as UniverseType | "all")
          }
        >
          <option value="all">All Universes</option>
          <option value="anime">Anime</option>
          <option value="comics">Comics</option>
          <option value="manga">Manga</option>
          <option value="tv">Television</option>
          <option value="games">Games</option>
        </select>

        <ul
          className="character-list"
          role="listbox"
          aria-label={`${side} character selection`}
        >
          {loading && (
            <li className="character-list-item loading">Searching...</li>
          )}

          {error && (
            <li className="character-list-item error">Error: {error}</li>
          )}

          {!loading && !error && results.length === 0 && searchQuery && (
            <li className="character-list-item empty">No characters found</li>
          )}

          {!loading &&
            results.map((character) => (
              <li
                key={character.id}
                className={`character-list-item ${
                  selectedCharacter?.id === character.id ? "selected" : ""
                }`}
                onClick={() => handleCharacterClick(character)}
                role="option"
                aria-selected={selectedCharacter?.id === character.id}
              >
                <img
                  src={
                    character.image_url || "/images/character-placeholder.jpg"
                  }
                  alt={character.name}
                  className="character-list-image"
                />
                <div className="character-list-info">
                  <span className="character-list-name">{character.name}</span>
                  <span className="character-list-universe">
                    {character.universe}
                  </span>
                </div>
              </li>
            ))}
        </ul>

        <div className="character-nav-controls">
          <button className="nav-arrow" aria-label="Previous character">
            ◀
          </button>
          <button className="nav-arrow" aria-label="Next character">
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};
