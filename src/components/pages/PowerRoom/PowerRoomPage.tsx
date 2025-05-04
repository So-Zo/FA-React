import React, { useState } from 'react';
import '../../../components/ui/PowerRoomPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';

const PowerRoomPage: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('stats');

  // Handle tab click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="power-room-page">
      <div className="image-header">
        <img src="/logo-image.jpg" alt="Power Room - Character Comparison" />
      </div>

      <section className="power-room-intro">
        <h1>The Power Room</h1>
        <p>
          Compare the powers and abilities of your favorite characters from across different universes.
          Select characters using the controls and see how they match up!
        </p>
      </section>

      {/* Wiki Edit Controls */}
      <div className="wiki-controls-container">
        <button className="wiki-edit-button">Edit Page</button>
      </div>

      <section className="power-comparison-container" role="region" aria-label="Character comparison">
        {/* Character Selection Area */}
        <div className="character-selection-area">
          {/* Left Character Selection Panel */}
          <div className="character-selection-panel left-panel">
            <div className="character-image">
              <img src="/placeholder-avatar.jpg" alt="Character 1" id="left-character-img" />
            </div>
            <h2 id="left-character-name" className="character-name">Character Name</h2>

            <div className="character-search">
              <input
                type="search"
                id="left-character-search"
                className="character-search-input"
                aria-label="Search for left character"
                placeholder="Search for characters..."
              />
              <button className="search-button" id="left-search-button" aria-label="Search">🔍</button>
            </div>

            <div className="character-filter">
              <select id="left-universe-filter" className="universe-filter" aria-label="Filter by universe for left character">
                <option value="all">All Universes</option>
                <option value="anime">Anime</option>
                <option value="comics">Comics</option>
                <option value="manga">Manga</option>
                <option value="tv">Television</option>
                <option value="games">Games</option>
              </select>
            </div>

            <div className="character-list-container">
              <ul id="left-character-list" className="character-list" role="listbox" aria-label="Left character selection">
                {/* Character items will be populated here by JavaScript */}
                {/* Each item will have an alternate version toggle button */}
              </ul>
            </div>

            <div className="character-controls">
              <button className="prev-character" id="left-prev" aria-label="Previous character (left side)">◀</button>
              <button className="next-character" id="left-next" aria-label="Next character (left side)">▶</button>
            </div>
          </div>

          {/* VS Divider */}
          <div className="vs-divider" aria-hidden="true">
            <span>VS</span>
          </div>

          {/* Right Character Selection Panel */}
          <div className="character-selection-panel right-panel">
            <div className="character-image">
              <img src="/placeholder-avatar.jpg" alt="Character 2" id="right-character-img" />
            </div>
            <h2 id="right-character-name" className="character-name">Character Name</h2>

            <div className="character-search">
              <input
                type="search"
                id="right-character-search"
                className="character-search-input"
                aria-label="Search for right character"
                placeholder="Search for characters..."
              />
              <button className="search-button" id="right-search-button" aria-label="Search">🔍</button>
            </div>

            <div className="character-filter">
              <select id="right-universe-filter" className="universe-filter" aria-label="Filter by universe for right character">
                <option value="all">All Universes</option>
                <option value="anime">Anime</option>
                <option value="comics">Comics</option>
                <option value="manga">Manga</option>
                <option value="tv">Television</option>
                <option value="games">Games</option>
              </select>
            </div>

            <div className="character-list-container">
              <ul id="right-character-list" className="character-list" role="listbox" aria-label="Right character selection">
                {/* Character items will be populated here by JavaScript */}
                {/* Each item will have an alternate version toggle button */}
              </ul>
            </div>

            <div className="character-controls">
              <button className="prev-character" id="right-prev" aria-label="Previous character (right side)">◀</button>
              <button className="next-character" id="right-next" aria-label="Next character (right side)">▶</button>
            </div>
          </div>
        </div>

        {/* Comparison Content Area */}
        <div className="comparison-content-area">
          {/* Comparison Navigation Tabs */}
          <div className="comparison-tabs">
            <button
              className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => handleTabClick('stats')}
            >
              Stats & Abilities
            </button>
            <button
              className={`tab-button ${activeTab === 'timelines' ? 'active' : ''}`}
              onClick={() => handleTabClick('timelines')}
            >
              Timelines
            </button>
            <button
              className={`tab-button ${activeTab === 'worlds' ? 'active' : ''}`}
              onClick={() => handleTabClick('worlds')}
            >
              Worlds & Universes
            </button>
            <button
              className={`tab-button ${activeTab === 'feats' ? 'active' : ''}`}
              onClick={() => handleTabClick('feats')}
            >
              Notable Feats
            </button>
          </div>

          {/* Comparison Content Panels */}
          <div className="comparison-panels">
            {/* Stats & Abilities Panel */}
            <div className={`comparison-panel ${activeTab === 'stats' ? 'active' : ''}`} id="stats-panel">
              <div className="comparison-panel-header">
                <h3>Stats & Abilities<a href="#edit-stats" className="section-edit-control" data-section="stats">Edit</a></h3>
              </div>
              <div className="comparison-panel-content editable-content" id="stats-content">
                <div className="left-content">
                  <h3>Stats & Abilities</h3>
                  <div className="character-stats">
                    <div className="stat-item">
                      <span className="stat-label">Strength:</span>
                      <div className="stat-bar">
                        <div className="stat-fill left-stat" style={{ width: '75%' }}></div>
                      </div>
                      <span className="stat-value">75</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Speed:</span>
                      <div className="stat-bar">
                        <div className="stat-fill left-stat" style={{ width: '85%' }}></div>
                      </div>
                      <span className="stat-value">85</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Intelligence:</span>
                      <div className="stat-bar">
                        <div className="stat-fill left-stat" style={{ width: '60%' }}></div>
                      </div>
                      <span className="stat-value">60</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Durability:</span>
                      <div className="stat-bar">
                        <div className="stat-fill left-stat" style={{ width: '70%' }}></div>
                      </div>
                      <span className="stat-value">70</span>
                    </div>
                  </div>

                  <div className="character-abilities">
                    <h4>Special Abilities</h4>
                    <ul className="abilities-list" id="left-abilities-list">
                      <li>Super Strength</li>
                      <li>Flight</li>
                      <li>Energy Projection</li>
                    </ul>
                  </div>
                </div>

                <div className="right-content">
                  <h3>Stats & Abilities</h3>
                  <div className="character-stats">
                    <div className="stat-item">
                      <span className="stat-label">Strength:</span>
                      <div className="stat-bar">
                        <div className="stat-fill right-stat" style={{ width: '90%' }}></div>
                      </div>
                      <span className="stat-value">90</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Speed:</span>
                      <div className="stat-bar">
                        <div className="stat-fill right-stat" style={{ width: '65%' }}></div>
                      </div>
                      <span className="stat-value">65</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Intelligence:</span>
                      <div className="stat-bar">
                        <div className="stat-fill right-stat" style={{ width: '50%' }}></div>
                      </div>
                      <span className="stat-value">50</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Durability:</span>
                      <div className="stat-bar">
                        <div className="stat-fill right-stat" style={{ width: '95%' }}></div>
                      </div>
                      <span className="stat-value">95</span>
                    </div>
                  </div>

                  <div className="character-abilities">
                    <h4>Special Abilities</h4>
                    <ul className="abilities-list" id="right-abilities-list">
                      <li>Invulnerability</li>
                      <li>Heat Vision</li>
                      <li>Super Speed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Timelines Panel */}
            <div className={`comparison-panel ${activeTab === 'timelines' ? 'active' : ''}`} id="timelines-panel">
              <div className="comparison-panel-header">
                <h3>Character Timelines<a href="#edit-timelines" className="section-edit-control" data-section="timelines">Edit</a></h3>
              </div>
              <div className="comparison-panel-content editable-content" id="timelines-content">
                <div className="left-content">
                  <h3>Character Timeline</h3>
                  <div className="timeline-container" id="left-timeline">
                    <div className="timeline-event">
                      <div className="timeline-date">Origin</div>
                      <div className="timeline-description">Character origin story and initial power level</div>
                    </div>
                    <div className="timeline-event">
                      <div className="timeline-date">Major Event 1</div>
                      <div className="timeline-description">Description of power evolution</div>
                    </div>
                    <div className="timeline-event">
                      <div className="timeline-date">Major Event 2</div>
                      <div className="timeline-description">Further character development</div>
                    </div>
                  </div>
                </div>

                <div className="right-content">
                  <h3>Character Timeline</h3>
                  <div className="timeline-container" id="right-timeline">
                    <div className="timeline-event">
                      <div className="timeline-date">Origin</div>
                      <div className="timeline-description">Character origin story and initial power level</div>
                    </div>
                    <div className="timeline-event">
                      <div className="timeline-date">Major Event 1</div>
                      <div className="timeline-description">Description of power evolution</div>
                    </div>
                    <div className="timeline-event">
                      <div className="timeline-date">Major Event 2</div>
                      <div className="timeline-description">Further character development</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Worlds & Universes Panel */}
            <div className={`comparison-panel ${activeTab === 'worlds' ? 'active' : ''}`} id="worlds-panel">
              <div className="comparison-panel-header">
                <h3>Worlds & Universes<a href="#edit-worlds" className="section-edit-control" data-section="worlds">Edit</a></h3>
              </div>
              <div className="comparison-panel-content editable-content" id="worlds-content">
                <div className="left-content">
                  <h3>World & Universe</h3>
                  <div className="world-info" id="left-world-info">
                    <h4>Universe Name</h4>
                    <p>Description of the character's universe, its rules, and power scaling.</p>
                    <h4>Notable Locations</h4>
                    <ul>
                      <li>Location 1</li>
                      <li>Location 2</li>
                    </ul>
                    <h4>Power System</h4>
                    <p>Description of how powers work in this universe</p>
                  </div>
                </div>

                <div className="right-content">
                  <h3>World & Universe</h3>
                  <div className="world-info" id="right-world-info">
                    <h4>Universe Name</h4>
                    <p>Description of the character's universe, its rules, and power scaling.</p>
                    <h4>Notable Locations</h4>
                    <ul>
                      <li>Location 1</li>
                      <li>Location 2</li>
                    </ul>
                    <h4>Power System</h4>
                    <p>Description of how powers work in this universe</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notable Feats Panel */}
            <div className={`comparison-panel ${activeTab === 'feats' ? 'active' : ''}`} id="feats-panel">
              <div className="comparison-panel-header">
                <h3>Notable Feats<a href="#edit-feats" className="section-edit-control" data-section="feats">Edit</a></h3>
              </div>
              <div className="comparison-panel-content editable-content" id="feats-content">
                <div className="left-content">
                  <h3>Notable Feats</h3>
                  <div className="feats-container" id="left-feats">
                    <div className="feat-item">
                      <h4>Feat Title</h4>
                      <p>Description of impressive achievement or display of power</p>
                      <div className="feat-metrics">
                        <span className="feat-metric">Power Level: <strong>High</strong></span>
                        <span className="feat-metric">Difficulty: <strong>Extreme</strong></span>
                      </div>
                    </div>
                    <div className="feat-item">
                      <h4>Feat Title</h4>
                      <p>Description of impressive achievement or display of power</p>
                      <div className="feat-metrics">
                        <span className="feat-metric">Power Level: <strong>Medium</strong></span>
                        <span className="feat-metric">Difficulty: <strong>High</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="right-content">
                  <h3>Notable Feats</h3>
                  <div className="feats-container" id="right-feats">
                    <div className="feat-item">
                      <h4>Feat Title</h4>
                      <p>Description of impressive achievement or display of power</p>
                      <div className="feat-metrics">
                        <span className="feat-metric">Power Level: <strong>Extreme</strong></span>
                        <span className="feat-metric">Difficulty: <strong>Medium</strong></span>
                      </div>
                    </div>
                    <div className="feat-item">
                      <h4>Feat Title</h4>
                      <p>Description of impressive achievement or display of power</p>
                      <div className="feat-metrics">
                        <span className="feat-metric">Power Level: <strong>High</strong></span>
                        <span className="feat-metric">Difficulty: <strong>High</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contributor Information Footer */}
      <div className="contributor-footer">
        <div className="contributor-info">
          <img src="/placeholder-avatar.jpg" alt="Last Editor" className="contributor-avatar" />
          <span>Last edited by <a href="#">Editor Name</a> on Date</span>
        </div>
        <a href="#page-history" className="page-history-link">View Page History</a>
      </div>
    </div>
  );
};

export default PowerRoomPage;
