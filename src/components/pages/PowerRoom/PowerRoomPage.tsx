import React, { useState } from "react";

const PowerRoomPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("stats");

  // Handles tab switching
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="power-room-page">
      <header className="power-room-intro">
        <h1>The Power Room</h1>
        <p>
          Compare the powers and abilities of your favorite characters from across different universes. Select characters using the controls and see how they match up!
        </p>
      </header>

      <div className="wiki-controls-container">
        <button className="wiki-edit-button" id="page-edit-button">Edit Page</button>
      </div>

      {/* Modern split grid layout */}
      <section className="power-comparison-grid" role="region" aria-label="Character comparison">
        {/* Left Side - Character Selection & Info */}
        <div className="character-side left">
          <div className="character-selection">
            <img src="../images/character-placeholder.jpg" alt="Character 1" className="character-image" />
            <h2 className="character-name">Character Name</h2>

            <div className="character-search-row">
              <input type="search" className="character-search-input" placeholder="Search for characters..." aria-label="Search for left character" />
              <button className="search-button" aria-label="Search">🔍</button>
            </div>

            <select className="universe-filter" aria-label="Filter by universe for left character">
              <option value="all">All Universes</option>
              <option value="anime">Anime</option>
              <option value="comics">Comics</option>
              <option value="manga">Manga</option>
              <option value="tv">Television</option>
              <option value="games">Games</option>
            </select>

            <ul className="character-list" role="listbox" aria-label="Left character selection">
              {/* Character items will be populated here */}
            </ul>

            <div className="character-nav-controls">
              <button className="nav-arrow" aria-label="Previous character">◀</button>
              <button className="nav-arrow" aria-label="Next character">▶</button>
            </div>
          </div>
        </div>

        {/* Center Divider */}
        <div className="grid-divider" aria-hidden="true">VS</div>

        {/* Right Side - Character Selection & Info */}
        <div className="character-side right">
          <div className="character-selection">
            <img src="../images/character-placeholder.jpg" alt="Character 2" className="character-image" />
            <h2 className="character-name">Character Name</h2>

            <div className="character-search-row">
              <input type="search" className="character-search-input" placeholder="Search for characters..." aria-label="Search for right character" />
              <button className="search-button" aria-label="Search">🔍</button>
            </div>

            <select className="universe-filter" aria-label="Filter by universe for right character">
              <option value="all">All Universes</option>
              <option value="anime">Anime</option>
              <option value="comics">Comics</option>
              <option value="manga">Manga</option>
              <option value="tv">Television</option>
              <option value="games">Games</option>
            </select>

            <ul className="character-list" role="listbox" aria-label="Right character selection">
              {/* Character items will be populated here */}
            </ul>

            <div className="character-nav-controls">
              <button className="nav-arrow" aria-label="Previous character">◀</button>
              <button className="nav-arrow" aria-label="Next character">▶</button>
            </div>
          </div>
        </div>
      </section>

      <section className="comparison-content-section">
        <div className="comparison-tabs">
          <button
            className={`tab-button${activeTab === "stats" ? " active" : ""}`}
            onClick={() => handleTabClick("stats")}
            data-tab="stats"
          >
            Stats & Abilities
          </button>
          <button
            className={`tab-button${activeTab === "timelines" ? " active" : ""}`}
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
          {activeTab === "stats" && (
            <div className="comparison-panel active" id="stats-panel">
              <div className="comparison-panel-header">
                <h3>Stats & Abilities <a href="#edit-stats" className="section-edit-control" data-section="stats">Edit</a></h3>
              </div>
              <div className="comparison-panel-content editable-content" id="stats-content">
                <div className="comparison-split">
                  <div className="left-content">
                    <h4>Stats</h4>
                    {/* Example stats section, customize as needed */}
                    <div className="character-stats">
                      <div className="stat-item"><span className="stat-label">Strength:</span><div className="stat-bar"><div className="stat-fill left-stat" style={{ width: "75%" }}></div></div><span className="stat-value">75</span></div>
                      <div className="stat-item"><span className="stat-label">Speed:</span><div className="stat-bar"><div className="stat-fill left-stat" style={{ width: "85%" }}></div></div><span className="stat-value">85</span></div>
                      <div className="stat-item"><span className="stat-label">Intelligence:</span><div className="stat-bar"><div className="stat-fill left-stat" style={{ width: "60%" }}></div></div><span className="stat-value">60</span></div>
                      <div className="stat-item"><span className="stat-label">Durability:</span><div className="stat-bar"><div className="stat-fill left-stat" style={{ width: "70%" }}></div></div><span className="stat-value">70</span></div>
                    </div>
                    <div className="character-abilities">
                      <h5>Special Abilities</h5>
                      <ul className="abilities-list"><li>Super Strength</li><li>Flight</li><li>Energy Projection</li></ul>
                    </div>
                  </div>
                  <div className="right-content">
                    <h4>Stats</h4>
                    <div className="character-stats">
                      <div className="stat-item"><span className="stat-label">Strength:</span><div className="stat-bar"><div className="stat-fill right-stat" style={{ width: "90%" }}></div></div><span className="stat-value">90</span></div>
                      <div className="stat-item"><span className="stat-label">Speed:</span><div className="stat-bar"><div className="stat-fill right-stat" style={{ width: "65%" }}></div></div><span className="stat-value">65</span></div>
                      <div className="stat-item"><span className="stat-label">Intelligence:</span><div className="stat-bar"><div className="stat-fill right-stat" style={{ width: "50%" }}></div></div><span className="stat-value">50</span></div>
                      <div className="stat-item"><span className="stat-label">Durability:</span><div className="stat-bar"><div className="stat-fill right-stat" style={{ width: "95%" }}></div></div><span className="stat-value">95</span></div>
                    </div>
                    <div className="character-abilities">
                      <h5>Special Abilities</h5>
                      <ul className="abilities-list"><li>Invulnerability</li><li>Heat Vision</li><li>Super Speed</li></ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "timelines" && (
            <div className="comparison-panel active" id="timelines-panel">
              <div className="comparison-panel-header">
                <h3>Character Timelines <a href="#edit-timelines" className="section-edit-control" data-section="timelines">Edit</a></h3>
              </div>
              <div className="comparison-panel-content editable-content" id="timelines-content">
                <div className="comparison-split">
                  <div className="left-content">
                    <h4>Character Timeline</h4>
                    <div className="timeline-container" id="left-timeline">
                      <div className="timeline-event"><div className="timeline-date">Origin</div><div className="timeline-description">Character origin story and initial power level</div></div>
                      <div className="timeline-event"><div className="timeline-date">Major Event 1</div><div className="timeline-description">Description of power evolution</div></div>
                      <div className="timeline-event"><div className="timeline-date">Major Event 2</div><div className="timeline-description">Further character development</div></div>
                    </div>
                  </div>
                  <div className="right-content">
                    <h4>Character Timeline</h4>
                    <div className="timeline-container" id="right-timeline">
                      <div className="timeline-event"><div className="timeline-date">Origin</div><div className="timeline-description">Character origin story and initial power level</div></div>
                      <div className="timeline-event"><div className="timeline-date">Major Event 1</div><div className="timeline-description">Description of power evolution</div></div>
                      <div className="timeline-event"><div className="timeline-date">Major Event 2</div><div className="timeline-description">Further character development</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "worlds" && (
            <div className="comparison-panel active" id="worlds-panel">
              <div className="comparison-panel-header">
                <h3>Worlds & Universes <a href="#edit-worlds" className="section-edit-control" data-section="worlds">Edit</a></h3>
              </div>
              <div className="comparison-panel-content editable-content" id="worlds-content">
                <div className="comparison-split">
                  <div className="left-content">
                    <h4>World & Universe</h4>
                    <div className="world-info" id="left-world-info">
                      <h5>Universe Name</h5>
                      <p>Description of the character's universe, its rules, and power scaling.</p>
                      <h5>Notable Locations</h5>
                      <ul><li>Location 1</li><li>Location 2</li></ul>
                      <h5>Power System</h5>
                      <p>Description of how powers work in this universe</p>
                    </div>
                  </div>
                  <div className="right-content">
                    <h4>World & Universe</h4>
                    <div className="world-info" id="right-world-info">
                      <h5>Universe Name</h5>
                      <p>Description of the character's universe, its rules, and power scaling.</p>
                      <h5>Notable Locations</h5>
                      <ul><li>Location 1</li><li>Location 2</li></ul>
                      <h5>Power System</h5>
                      <p>Description of how powers work in this universe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "feats" && (
            <div className="comparison-panel active" id="feats-panel">
              <div className="comparison-panel-header">
                <h3>Notable Feats <a href="#edit-feats" className="section-edit-control" data-section="feats">Edit</a></h3>
              </div>
              <div className="comparison-panel-content editable-content" id="feats-content">
                <div className="comparison-split">
                  <div className="left-content">
                    <h4>Notable Feats</h4>
                    <div className="feats-container" id="left-feats">
                      <div className="feat-item"><h5>Feat Title</h5><p>Description of impressive achievement or display of power</p><div className="feat-metrics"><span className="feat-metric">Power Level: <strong>High</strong></span><span className="feat-metric">Difficulty: <strong>Extreme</strong></span></div></div>
                      <div className="feat-item"><h5>Feat Title</h5><p>Description of impressive achievement or display of power</p><div className="feat-metrics"><span className="feat-metric">Power Level: <strong>Medium</strong></span><span className="feat-metric">Difficulty: <strong>High</strong></span></div></div>
                    </div>
                  </div>
                  <div className="right-content">
                    <h4>Notable Feats</h4>
                    <div className="feats-container" id="right-feats">
                      <div className="feat-item"><h5>Feat Title</h5><p>Description of impressive achievement or display of power</p><div className="feat-metrics"><span className="feat-metric">Power Level: <strong>Extreme</strong></span><span className="feat-metric">Difficulty: <strong>Medium</strong></span></div></div>
                      <div className="feat-item"><h5>Feat Title</h5><p>Description of impressive achievement or display of power</p><div className="feat-metrics"><span className="feat-metric">Power Level: <strong>High</strong></span><span className="feat-metric">Difficulty: <strong>High</strong></span></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="contributor-footer">
        <div className="contributor-info">
          <img src="/placeholder-avatar.jpg" alt="Last Editor" className="contributor-avatar" />
          <span>
            Last edited by <a href="#">Editor Name</a> on Date
          </span>
        </div>
        <a href="#page-history" className="page-history-link">View Page History</a>
      </footer>
    </div>
  );
};

export default PowerRoomPage;
