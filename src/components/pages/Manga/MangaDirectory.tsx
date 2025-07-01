import React from 'react';
import { Link } from 'react-router-dom';
import TableOfContents, { TocSectionProps } from '../../../components/ui/TableOfContents';
import '../../../components/ui/MangaPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';
import '../../../components/ui/DirectoryPages.css';

const MangaDirectory: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Popular Manga", anchor: "#popular-series" },
        { label: "Genres", anchor: "#genres" },
        { label: "Publishers", anchor: "#publishers" }
      ],
      deepLinks: [
        { label: "Manga Encyclopedia", path: "/manga", exists: true },
        { label: "Manga History", path: "/manga/history", exists: true }
      ]
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Demographics", anchor: "#demographics" },
        { label: "Alphabetical", anchor: "#alphabetical" }
      ],
      deepLinks: []
    }
  ];

  return (
    <div className="manga-page manga-directory-page">
      <header>
        <div className="image-header">
          <img src="/images/Manga/MangaHeader.jpg" alt="Manga Overview" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search From Manga Page"
          placeholder="Search for Characters, Series, etc."
        />

        <button className="wiki-edit-button" id="page-edit-button">Edit Page</button>
      </header>

      {/* Table of Contents */}
      <TableOfContents
        sections={tocSections}
        title="Manga Directory"
        description="Use this table of contents to navigate to different sections of the Manga Directory."
      />

      <main id="main-content" role="main">
        <section className="directory-intro">
          <h1>Manga Directory</h1>
          <p>Browse our collection of manga series organized by genre, popularity, and publisher. Each page contains official information, character listings, and links to related community content.</p>

          <div className="directory-navigation">
            <a href="#popular-series" className="non-existent-link" data-page-type="anchor" data-page-title="Popular Manga" data-related-to="Manga">Popular Manga</a>
            <a href="#genres" className="non-existent-link" data-page-type="anchor" data-page-title="Browse by Genre" data-related-to="Manga">Browse by Genre</a>
            <a href="#demographics" className="non-existent-link" data-page-type="anchor" data-page-title="Browse by Demographics" data-related-to="Manga">Browse by Demographics</a>
            <a href="#publishers" className="non-existent-link" data-page-type="anchor" data-page-title="Browse by Publisher" data-related-to="Manga">Browse by Publisher</a>
            <a href="#alphabetical" className="non-existent-link" data-page-type="anchor" data-page-title="Alphabetical List" data-related-to="Manga">Alphabetical List</a>
            <Link to="/manga/history" className="default-links">History of Manga</Link>
          </div>
        </section>

        {/* Popular Series Section */}
        <section id="popular-series" className="directory-section" data-section-type="popular">
          <h2>Popular Manga Series</h2>
          <p>These widely acclaimed manga series are excellent starting points for exploring the medium.</p>

          <div className="show-grid" data-content="popular-manga">
            <div className="show-card">
              <div className="show-image">
                <img src="/images/manga/shows/one-piece.jpg" alt="One Piece" />
              </div>
              <div className="show-info">
                <h3>One Piece</h3>
                <p className="show-genres">Adventure, Fantasy, Shōnen</p>
                <p className="show-description">Follow Monkey D. Luffy and his pirate crew as they search for the world's ultimate treasure known as the "One Piece".</p>
                <div className="show-links">
                  <a href="#" className="non-existent-link" data-page-type="show" data-page-title="One Piece" data-related-to="Manga">Official Page</a>
                  <Link to="/community#one-piece" className="default-links">Community Content →</Link>
                </div>
              </div>
            </div>

            <div className="show-card">
              <div className="show-image">
                <img src="/images/manga/shows/attack-on-titan.jpg" alt="Attack on Titan" />
              </div>
              <div className="show-info">
                <h3>Attack on Titan</h3>
                <p className="show-genres">Action, Dark Fantasy, Post-Apocalyptic</p>
                <p className="show-description">In a world where humanity lives within cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.</p>
                <div className="show-links">
                  <a href="#" className="non-existent-link" data-page-type="show" data-page-title="Attack on Titan" data-related-to="Manga">Official Page</a>
                  <Link to="/community#attack-on-titan" className="default-links">Community Content →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Genres Section */}
        <section id="genres" className="directory-section" data-section-type="genres">
          <h2>Browse by Genre</h2>
          <p>Find manga based on your preferred storytelling styles and themes.</p>

          <div className="genre-directory" data-content="manga-genres">
            <div className="genre-category">
              <h3>Action/Adventure</h3>
              <ul className="show-list">
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="One Piece" data-related-to="Manga">One Piece</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Naruto" data-related-to="Manga">Naruto</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="My Hero Academia" data-related-to="Manga">My Hero Academia</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Action Manga" data-related-to="Manga">View All Action Manga</a></li>
              </ul>
            </div>

            <div className="genre-category">
              <h3>Fantasy</h3>
              <ul className="show-list">
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Berserk" data-related-to="Manga">Berserk</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Fairy Tail" data-related-to="Manga">Fairy Tail</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Made in Abyss" data-related-to="Manga">Made in Abyss</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Fantasy Manga" data-related-to="Manga">View All Fantasy Manga</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Demographics Section */}
        <section id="demographics" className="directory-section" data-section-type="demographics">
          <h2>Browse by Demographics</h2>
          <p>Manga is often categorized by its target audience in Japan, though fans of all types enjoy them worldwide.</p>

          <div className="demographic-directory" data-content="manga-demographics">
            <div className="demographic-category">
              <h3>Shōnen (Young Men)</h3>
              <ul className="show-list">
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Dragon Ball" data-related-to="Manga">Dragon Ball</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Naruto" data-related-to="Manga">Naruto</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Demon Slayer" data-related-to="Manga">Demon Slayer</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Shonen Manga" data-related-to="Manga">View All Shōnen Manga</a></li>
              </ul>
            </div>

            <div className="demographic-category">
              <h3>Shōjo (Young Women)</h3>
              <ul className="show-list">
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Fruits Basket" data-related-to="Manga">Fruits Basket</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Ouran High School Host Club" data-related-to="Manga">Ouran High School Host Club</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Sailor Moon" data-related-to="Manga">Sailor Moon</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Shojo Manga" data-related-to="Manga">View All Shōjo Manga</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Publishers Section */}
        <section id="publishers" className="directory-section" data-section-type="publishers">
          <h2>Browse by Publisher</h2>
          <p>Discover manga produced by renowned publishers known for their distinctive styles and quality.</p>

          <div className="publisher-directory" data-content="manga-publishers">
            <div className="publisher-category">
              <h3>Shueisha</h3>
              <ul className="show-list">
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="One Piece" data-related-to="Manga">One Piece</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Demon Slayer" data-related-to="Manga">Demon Slayer</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Jujutsu Kaisen" data-related-to="Manga">Jujutsu Kaisen</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Shueisha Manga" data-related-to="Manga">View All Shueisha Manga</a></li>
              </ul>
            </div>

            <div className="publisher-category">
              <h3>Kodansha</h3>
              <ul className="show-list">
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Attack on Titan" data-related-to="Manga">Attack on Titan</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Fairy Tail" data-related-to="Manga">Fairy Tail</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Seven Deadly Sins" data-related-to="Manga">The Seven Deadly Sins</a></li>
                <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Kodansha Manga" data-related-to="Manga">View All Kodansha Manga</a></li>
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
              <p>Try searching for specific manga or characters using the search bar at the top of the page.</p>
            </div>

            <div className="help-option">
              <h3>Request Content</h3>
              <p>Don't see a manga that should be included? Let us know and we'll add it to our database.</p>
              <a href="#" className="non-existent-link" data-page-type="action" data-page-title="Request Manga Addition" data-related-to="Manga">Request Addition</a>
            </div>

            <div className="help-option">
              <h3>Create Content</h3>
              <p>Contribute to FanArcs by creating a page for your favorite manga.</p>
              <a href="#" className="non-existent-link" data-page-type="action" data-page-title="Learn How to Contribute" data-related-to="Manga">Learn How to Contribute</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MangaDirectory;
