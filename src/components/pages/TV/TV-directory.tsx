import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';
import '../../../components/ui/MediaPages.css';
import '../../../components/ui/TVPage.css';
import '../../../components/ui/DirectoryPages.css';

const TVDirectory: React.FC = () => {
  return (
    <div className="tv-page tv-directory-page">
      <header role="banner">
        <div className="header-image">
          <img src="/images/tv/TVHeader.jpg" alt="Television Directory" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search TV Shows"
          placeholder="Search for shows, characters, etc."
          data-search-type="tv"
        />
      </header>

      <div className="accessibility-container">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <button className="keyboard-shortcuts-link" onClick={() => console.log('Show keyboard shortcuts')}>
          <span>⌨️</span> Keyboard shortcuts
        </button>
      </div>

      <main id="main-content" role="main">
        <section className="directory-intro">
          <h1>Television Directory</h1>
          <p>Browse our collection of TV shows organized by genre, popularity, and release era. Each page contains official information, character listings, and links to related community content.</p>

          <div className="directory-navigation">
            <a href="#popular-series" className="default-links" data-page-type="anchor" data-page-title="Popular Shows" data-related-to="TV">Popular Shows</a>
            <a href="#genres" className="default-links" data-page-type="anchor" data-page-title="Browse by Genre" data-related-to="TV">Browse by Genre</a>
            <a href="#eras" className="default-links" data-page-type="anchor" data-page-title="Browse by Era" data-related-to="TV">Browse by Era</a>
            <a href="#studios" className="default-links" data-page-type="anchor" data-page-title="Browse by Network" data-related-to="TV">Browse by Network</a>
            <a href="#alphabetical" className="default-links" data-page-type="anchor" data-page-title="Alphabetical List" data-related-to="TV">Alphabetical List</a>
          </div>
        </section>

        {/* Popular Series Section */}
        <section id="popular-series" className="directory-section" data-section-type="popular">
          <h2>Popular TV Shows</h2>
          <p>These widely acclaimed television series are excellent starting points for exploring the medium.</p>

          {/* Show Grid - Will be populated by backend data */}
          <div className="show-grid" data-content="popular-tv">
            {/* Template content converted to regular JSX */}
            <div className="show-card fallback-content">
              <div className="show-image">
                <img src="/images/tv/shows/stranger-things.jpg" alt="Stranger Things" />
              </div>
              <div className="show-info">
                <h3>Stranger Things</h3>
                <p className="show-genres">Science Fiction, Horror, Drama</p>
                <p className="show-description">When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.</p>
                <div className="show-links">
                  <Link to="#" className="default-links">Official Page →</Link>
                  <Link to="/community#stranger-things" className="default-links">Community Content →</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="view-more-container">
            <Link to="#" className="default-links">View All Popular Shows</Link>
          </div>
        </section>

        {/* Genres Section */}
        <section id="genres" className="directory-section" data-section-type="genres">
          <h2>Browse by Genre</h2>
          <p>Find TV shows based on your preferred storytelling styles and themes.</p>

          {/* Genre Directory - Will be populated by backend data */}
          <div className="genre-directory" data-content="tv-genres">
            {/* Fallback content if no JavaScript or data */}
            <div className="genre-category fallback-content">
              <h3>Science Fiction</h3>
              <ul className="show-list">
                <li><Link to="#" className="default-links">Stranger Things</Link></li>
                <li><Link to="#" className="default-links">The Expanse</Link></li>
                <li><Link to="#" className="default-links">Doctor Who</Link></li>
                <li><Link to="#" className="default-links">View All Sci-Fi Shows</Link></li>
              </ul>
            </div>
          </div>

          <div className="view-more-container">
            <Link to="#" className="default-links">View All Genres</Link>
          </div>
        </section>

        {/* Eras Section */}
        <section id="eras" className="directory-section" data-section-type="eras">
          <h2>Browse by Era</h2>
          <p>Explore TV shows from different time periods, from classics to the latest releases.</p>

          {/* Era Directory - Will be populated by backend data */}
          <div className="era-directory" data-content="tv-eras">
            {/* Fallback content if no JavaScript or data */}
            <div className="era-category fallback-content">
              <h3>2010s</h3>
              <ul className="show-list">
                <li><Link to="#" className="default-links">Game of Thrones (2011-2019)</Link></li>
                <li><Link to="#" className="default-links">Breaking Bad (2008-2013)</Link></li>
                <li><Link to="#" className="default-links">Stranger Things (2016-Present)</Link></li>
                <li><Link to="#" className="default-links">View All 2010s Shows</Link></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Networks Section */}
        <section id="studios" className="directory-section" data-section-type="studios">
          <h2>Browse by Network</h2>
          <p>Discover TV shows produced by renowned networks and streaming platforms known for their distinctive styles and quality.</p>

          {/* Studio Directory - Will be populated by backend data */}
          <div className="studio-directory" data-content="tv-studios">
            {/* Fallback content if no JavaScript or data */}
            <div className="studio-category fallback-content">
              <h3>Netflix</h3>
              <ul className="show-list">
                <li><Link to="#" className="default-links">Stranger Things</Link></li>
                <li><Link to="#" className="default-links">The Witcher</Link></li>
                <li><Link to="#" className="default-links">The Crown</Link></li>
                <li><Link to="#" className="default-links">View All Netflix Shows</Link></li>
              </ul>
            </div>
          </div>

          <div className="view-more-container">
            <Link to="#" className="default-links">View All Networks</Link>
          </div>
        </section>

        {/* Alphabetical Section */}
        <section id="alphabetical" className="directory-section" data-section-type="alphabetical">
          <h2>Alphabetical List</h2>
          <p>Browse all TV shows in our database alphabetically.</p>

          <div className="alphabet-navigation" data-content="alphabet-nav">
            {/* Fallback content */}
            <Link to="#a" className="default-links">A</Link>
            <Link to="#b" className="default-links">B</Link>
            <Link to="#c" className="default-links">C</Link>
            {/* More letters would be here */}
          </div>

          <div className="alphabetical-listing" data-content="alphabetical-listing">
            {/* Fallback content if no JavaScript or data */}
            <div id="a" className="letter-section fallback-content">
              <h3>A</h3>
              <ul className="show-list-alpha">
                <li><Link to="#" className="default-links">Arrow</Link></li>
                <li><Link to="#" className="default-links">American Horror Story</Link></li>
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
              <p>Try searching for specific TV shows or characters using the search bar at the top of the page.</p>
            </div>

            <div className="help-option">
              <h3>Request Content</h3>
              <p>Don't see a TV show that should be included? Let us know and we'll add it to our database.</p>
              <Link to="#" className="default-links">Request Addition</Link>
            </div>

            <div className="help-option">
              <h3>Create Content</h3>
              <p>Contribute to FanArcs by creating a page for your favorite TV show.</p>
              <Link to="#" className="default-links">Learn How to Contribute</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TVDirectory;
