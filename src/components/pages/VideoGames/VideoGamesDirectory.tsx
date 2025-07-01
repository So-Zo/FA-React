import React from 'react';
import { Link } from 'react-router-dom';
import TableOfContents, { TocSectionProps } from '../../../components/ui/TableOfContents';
import '../../../components/ui/VideoGamesPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';
import '../../../components/ui/DirectoryPages.css';

const VideoGamesDirectory: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Popular Games", anchor: "#popular-games" },
        { label: "Genres", anchor: "#genres" },
        { label: "Platforms", anchor: "#platforms" }
      ],
      deepLinks: [
        { label: "Video Games Encyclopedia", path: "/video-games", exists: true },
        { label: "Video Games History", path: "/video-games/history", exists: true }
      ]
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Studios", anchor: "#studios" },
        { label: "Alphabetical", anchor: "#alphabetical" }
      ],
      deepLinks: []
    }
  ];

  return (
    <div className="video-games-page video-games-directory-page">
      <header>
        <div className="image-header">
          <img src="/images/video-games/VideoGamesHeader.jpg" alt="Video Games Overview" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search From Video Games Page"
          placeholder="Search for Games, Characters, etc."
        />

        <button className="wiki-edit-button" id="page-edit-button">Edit Page</button>
      </header>
      
      {/* Table of Contents */}
      <TableOfContents
        sections={tocSections}
        title="Video Games Directory"
        description="Use this table of contents to navigate to different sections of the Video Games Directory."
      />

      <main id="main-content" role="main">
        <section className="directory-intro">
          <h1>Video Games Directory</h1>
          <p>Browse our collection of video games organized by genre, platform, and developer. Each page contains official information, character listings, and links to related community content.</p>

          <div className="directory-navigation">
            <a href="#popular-games" className="non-existent-link" data-page-type="anchor" data-page-title="Popular Games" data-related-to="Video Games">Popular Games</a>
            <a href="#genres" className="non-existent-link" data-page-type="anchor" data-page-title="Browse by Genre" data-related-to="Video Games">Browse by Genre</a>
            <a href="#platforms" className="non-existent-link" data-page-type="anchor" data-page-title="Browse by Platform" data-related-to="Video Games">Browse by Platform</a>
            <a href="#studios" className="non-existent-link" data-page-type="anchor" data-page-title="Browse by Developer" data-related-to="Video Games">Browse by Developer</a>
            <a href="#alphabetical" className="non-existent-link" data-page-type="anchor" data-page-title="Alphabetical List" data-related-to="Video Games">Alphabetical List</a>
            <Link to="/video-games/history" className="default-links">History of Video Games</Link>
          </div>
        </section>

        {/* Popular Games Section */}
        <section id="popular-games" className="directory-section" data-section-type="popular">
          <h2>Popular Video Games</h2>
          <p>These widely acclaimed games are excellent starting points for exploring the medium.</p>

          <div className="show-grid" data-content="popular-games">
            <div className="show-card">
              <div className="show-image">
                <img src="/images/video-games/shows/the-legend-of-zelda.jpg" alt="The Legend of Zelda: Breath of the Wild" />
              </div>
              <div className="show-info">
                <h3>The Legend of Zelda: Breath of the Wild</h3>
                <p className="show-genres">Action-Adventure, Open World</p>
                <p className="show-description">Explore the vast kingdom of Hyrule in this critically acclaimed open-world adventure game.</p>
                <div className="show-links">
                  <a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Legend of Zelda: Breath of the Wild" data-related-to="Video Games">Official Page</a>
                  <Link to="/community#zelda-botw" className="default-links">Community Content →</Link>
                </div>
              </div>
            </div>

            <div className="show-card">
              <div className="show-image">
                <img src="/images/video-games/shows/minecraft.jpg" alt="Minecraft" />
              </div>
              <div className="show-info">
                <h3>Minecraft</h3>
                <p className="show-genres">Sandbox, Survival</p>
                <p className="show-description">Build, explore, and survive in a blocky, procedurally-generated 3D world.</p>
                <div className="show-links">
                  <a href="#" className="non-existent-link" data-page-type="show" data-page-title="Minecraft" data-related-to="Video Games">Official Page</a>
                  <Link to="/community#minecraft" className="default-links">Community Content →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Genres Section */}
        <section id="genres" className="directory-section" data-section-type="genres">
          <h2>Browse by Genre</h2>
          <p>Find games based on your preferred gameplay styles and themes.</p>

          <div className="genre-directory" data-content="video-games-genres">
            <div className="genre-category">
              <h3>Action & Adventure</h3>
              <ul className="show-list">
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Legend of Zelda: Breath of the Wild" data-related-to="Video Games">The Legend of Zelda: Breath of the Wild</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="God of War" data-related-to="Video Games">God of War</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Uncharted 4" data-related-to="Video Games">Uncharted 4</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Action Adventure Games" data-related-to="Video Games">View All Action & Adventure Games</a></li>
              </ul>
            </div>

            <div className="genre-category">
              <h3>Role-Playing Games</h3>
              <ul className="show-list">
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Witcher 3" data-related-to="Video Games">The Witcher 3</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Final Fantasy VII Remake" data-related-to="Video Games">Final Fantasy VII Remake</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Skyrim" data-related-to="Video Games">The Elder Scrolls V: Skyrim</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="RPG Games" data-related-to="Video Games">View All RPG Games</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section id="platforms" className="directory-section" data-section-type="platforms">
          <h2>Browse by Platform</h2>
          <p>Discover games available on your preferred gaming platforms.</p>

          <div className="platform-directory" data-content="video-games-platforms">
            <div className="platform-category">
              <h3>PlayStation</h3>
              <ul className="show-list">
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="God of War" data-related-to="Video Games">God of War</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Last of Us" data-related-to="Video Games">The Last of Us</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Ghost of Tsushima" data-related-to="Video Games">Ghost of Tsushima</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="PlayStation Games" data-related-to="Video Games">View All PlayStation Games</a></li>
              </ul>
            </div>

            <div className="platform-category">
              <h3>Xbox</h3>
              <ul className="show-list">
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Halo Infinite" data-related-to="Video Games">Halo Infinite</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Forza Horizon 5" data-related-to="Video Games">Forza Horizon 5</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Gears 5" data-related-to="Video Games">Gears 5</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Xbox Games" data-related-to="Video Games">View All Xbox Games</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Studios Section */}
        <section id="studios" className="directory-section" data-section-type="studios">
          <h2>Browse by Developer</h2>
          <p>Explore games from renowned development studios known for their distinctive styles and quality.</p>

          <div className="studio-directory" data-content="video-games-studios">
            <div className="studio-category">
              <h3>Nintendo</h3>
              <ul className="show-list">
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Legend of Zelda: Breath of the Wild" data-related-to="Video Games">The Legend of Zelda: Breath of the Wild</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Super Mario Odyssey" data-related-to="Video Games">Super Mario Odyssey</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Animal Crossing: New Horizons" data-related-to="Video Games">Animal Crossing: New Horizons</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Nintendo Games" data-related-to="Video Games">View All Nintendo Games</a></li>
              </ul>
            </div>

            <div className="studio-category">
              <h3>Rockstar Games</h3>
              <ul className="show-list">
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Red Dead Redemption 2" data-related-to="Video Games">Red Dead Redemption 2</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Grand Theft Auto V" data-related-to="Video Games">Grand Theft Auto V</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="L.A. Noire" data-related-to="Video Games">L.A. Noire</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Rockstar Games" data-related-to="Video Games">View All Rockstar Games</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="directory-help">
          <h2>Can't Find What You're Looking For?</h2>
          <div className="help-options">
            <div className="help-option">
              <h3>Use Search</h3>
              <p>Try searching for specific games or characters using the search bar at the top of the page.</p>
            </div>

            <div className="help-option">
              <h3>Request Content</h3>
              <p>Don't see a game that should be included? Let us know and we'll add it to our database.</p>
              <a href="#" className="non-existent-link" data-page-type="action" data-page-title="Request Game Addition" data-related-to="Video Games">Request Addition</a>
            </div>

            <div className="help-option">
              <h3>Create Content</h3>
              <p>Contribute to FanArcs by creating a page for your favorite video game.</p>
              <a href="#" className="non-existent-link" data-page-type="action" data-page-title="Learn How to Contribute" data-related-to="Video Games">Learn How to Contribute</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VideoGamesDirectory;
