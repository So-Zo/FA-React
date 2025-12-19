import React, { useState } from "react";
import { CharacterSearchResult } from "../../../types";
import {
  CharacterSelector,
  AbilitiesTab,
  TimelineTab,
  WorldsTab,
  FeatsTab,
} from "./components";
import { useCharacterDetails } from "./hooks";

const PowerRoomPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("abilities");
  const [leftCharacter, setLeftCharacter] =
    useState<CharacterSearchResult | null>(null);
  const [rightCharacter, setRightCharacter] =
    useState<CharacterSearchResult | null>(null);

  // Get full character details for comparison
  const { character: leftCharacterDetails } = useCharacterDetails(
    leftCharacter?.id || null
  );
  const { character: rightCharacterDetails } = useCharacterDetails(
    rightCharacter?.id || null
  );

  // Handles tab switching
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="power-room-page">
      <header className="power-room-intro">
        <h1>The Power Room</h1>
        <p>
          Compare the powers and abilities of your favorite characters from
          across different universes. Select characters using the controls and
          see how they match up!
        </p>
      </header>

      {/* Modern split grid layout */}
      <section
        className="power-comparison-grid"
        role="region"
        aria-label="Character comparison"
      >
        {/* Left Side - Character Selection & Info */}
        <CharacterSelector
          side="left"
          selectedCharacter={leftCharacter}
          onCharacterSelect={setLeftCharacter}
        />

        {/* Center Divider */}
        <div className="grid-divider" aria-hidden="true">
          VS
        </div>

        {/* Right Side - Character Selection & Info */}
        <CharacterSelector
          side="right"
          selectedCharacter={rightCharacter}
          onCharacterSelect={setRightCharacter}
        />
      </section>

      <section className="comparison-content-section">
        <div className="comparison-tabs">
          <button
            className={`tab-button${
              activeTab === "abilities" ? " active" : ""
            }`}
            onClick={() => handleTabClick("abilities")}
            data-tab="abilities"
          >
            Abilities & Powers
          </button>
          <button
            className={`tab-button${
              activeTab === "timelines" ? " active" : ""
            }`}
            onClick={() => handleTabClick("timelines")}
            data-tab="timelines"
          >
            Timelines
          </button>
          <button
            className={`tab-button${activeTab === "worlds" ? " active" : ""}`}
            onClick={() => handleTabClick("worlds")}
            data-tab="worlds"
          >
            Worlds & Universes
          </button>
          <button
            className={`tab-button${activeTab === "feats" ? " active" : ""}`}
            onClick={() => handleTabClick("feats")}
            data-tab="feats"
          >
            Notable Feats
          </button>
        </div>
        <div className="comparison-panels">
          {activeTab === "abilities" && (
            <AbilitiesTab
              leftCharacter={leftCharacterDetails}
              rightCharacter={rightCharacterDetails}
            />
          )}
          {activeTab === "timelines" && (
            <TimelineTab
              leftCharacter={leftCharacterDetails}
              rightCharacter={rightCharacterDetails}
            />
          )}
          {activeTab === "worlds" && (
            <WorldsTab
              leftCharacter={leftCharacterDetails}
              rightCharacter={rightCharacterDetails}
            />
          )}
          {activeTab === "feats" && (
            <FeatsTab
              leftCharacter={leftCharacterDetails}
              rightCharacter={rightCharacterDetails}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default PowerRoomPage;
