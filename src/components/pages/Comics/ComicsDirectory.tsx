import React from 'react';
import { Link } from 'react-router-dom';
import TableOfContents, { TocSectionProps } from '../../ui/TableOfContents';
import '../../../components/ui/ComicsPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';
import '../../../components/ui/MediaPages.css';
import '../../../components/ui/DirectoryPages.css';

const ComicsDirectory: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Popular Comics", anchor: "#popular-series" },
        { label: "Genres", anchor: "#genres" },
        { label: "Eras", anchor: "#eras" }
      ],
      deepLinks: [
        { label: "Comics Encyclopedia", path: "/comics", exists: true },
        { label: "Comics History", path: "/comics/history", exists: true }
      ]
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Publishers", anchor: "#studios" },
        { label: "Alphabetical", anchor: "#alphabetical" }
      ],
      deepLinks: []
    }
  ];

  return (
    <div className="comics-page comics-directory-page">
      <header>
        <div className="image-header">
          <img src="/images/comics/ComicsHeader.jpg" alt="Comics Overview" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search From Comics Page"
          placeholder="Search for Characters, Universes, etc."
        />

        <button className="wiki-edit-button" id="page-edit-button">Edit Page</button>
      </header>

      {/* Table of Contents */}
      <TableOfContents
        sections={tocSections}
        title="Comics Directory"
        description="Use this table of contents to navigate to different sections of the Comics Directory."
      />

      <main id="main-content" role="main">
    <section className="directory-intro">
      <h1>Comics Directory</h1>
      <p>Browse our collection of comics organized by genre, popularity, and release era. Each page contains official information, character listings, and links to related community content.</p>

      <div className="directory-navigation">
        <a href="#popular-series" className="non-existent-link" data-page-type="anchor" data-page-title="Popular Comics" data-related-to="Comics">Popular Comics</a>
        <a href="#genres" className="non-existent-link" data-page-type="anchor" data-page-title="Browse by Genre" data-related-to="Comics">Browse by Genre</a>
        <a href="#eras" className="non-existent-link" data-page-type="anchor" data-page-title="Browse by Era" data-related-to="Comics">Browse by Era</a>
        <a href="#studios" className="non-existent-link" data-page-type="anchor" data-page-title="Browse by Publisher" data-related-to="Comics">Browse by Publisher</a>
        <a href="#alphabetical" className="non-existent-link" data-page-type="anchor" data-page-title="Alphabetical List" data-related-to="Comics">Alphabetical List</a>
        <Link to="/comics/history" className="default-links">History of Comics</Link>
      </div>
    </section>

    {/* Popular Series Section */}
    <section id="popular-series" className="directory-section" data-section-type="popular">
      <h2>Popular Comics</h2>
      <p>These widely acclaimed comics are excellent starting points for exploring the medium.</p>

      {/* Show Grid - Will be populated by backend data */}
      <div className="show-grid" data-content="popular-comics">
        {/* Template for show card - will be cloned by JavaScript */}
        <template id="show-card-template">
          <div className="show-card" data-show-id="">
            <div className="show-image">
              <img src="" alt="" />
            </div>
            <div className="show-info">
              <h3></h3>
              <p className="show-genres"></p>
              <p className="show-description"></p>
              <div className="show-links">
                <a href="" className="default-links">Official Page →</a>
                <a href="" className="default-links">Community Content →</a>
              </div>
            </div>
          </div>
        </template>

        {/* Fallback content if no JavaScript or data */}
        <div className="show-card fallback-content">
          <div className="show-image">
            <img src="/images/comics/shows/batman.jpg" alt="Batman" />
          </div>
          <div className="show-info">
            <h3>Batman</h3>
            <p className="show-genres">Superhero, Action, Crime, Drama</p>
            <p className="show-description">Follow the adventures of Bruce Wayne, a billionaire who fights crime in Gotham City as the masked vigilante Batman.</p>
            <div className="show-links">
              <a href="#" className="non-existent-link" data-page-type="show" data-page-title="Batman" data-related-to="Comics">Official Page</a>
              <Link to="/community#batman" className="default-links">Community Content →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Genres Section */}
    <section id="genres" className="directory-section" data-section-type="genres">
      <h2>Browse by Genre</h2>
      <p>Find comics based on your preferred storytelling styles and themes.</p>

      {/* Genre Directory - Will be populated by backend data */}
      <div className="genre-directory" data-content="comics-genres">
        {/* Template for genre category - will be cloned by JavaScript */}
        <template id="genre-category-template">
          <div className="genre-category" data-genre-id="">
            <h3></h3>
            <ul className="show-list">
              {/* Will be populated dynamically */}
            </ul>
          </div>
        </template>

        {/* Fallback content if no JavaScript or data */}
        <div className="genre-category fallback-content">
          <h3>Superhero</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Batman" data-related-to="Comics">Batman</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Spider-Man" data-related-to="Comics">Spider-Man</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="X-Men" data-related-to="Comics">X-Men</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Superhero Comics" data-related-to="Comics">View All Superhero Comics</a></li>
          </ul>
        </div>
      </div>
    </section>

    {/* Eras Section */}
    <section id="eras" className="directory-section" data-section-type="eras">
      <h2>Browse by Era</h2>
      <p>Explore comics from different time periods, from classics to the latest releases. For a comprehensive overview of how comics have evolved over time, check out our <Link to="/comics/history" className="default-links">History of Comics</Link> page.</p>

      {/* Era Directory - Will be populated by backend data */}
      <div className="era-directory" data-content="comics-eras">
        {/* Template for era category - will be cloned by JavaScript */}
        <template id="era-category-template">
          <div className="era-category" data-era-id="">
            <h3></h3>
            <ul className="show-list">
              {/* Will be populated dynamically */}
            </ul>
          </div>
        </template>

        {/* Fallback content if no JavaScript or data */}
        <div className="era-category fallback-content">
          <h3>Golden Age (1938-1956)</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Action Comics #1" data-related-to="Comics">Action Comics #1 (1938)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Detective Comics #27" data-related-to="Comics">Detective Comics #27 (1939)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Captain America Comics #1" data-related-to="Comics">Captain America Comics #1 (1941)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Golden Age Comics" data-related-to="Comics">View All Golden Age Comics</a></li>
          </ul>
        </div>
      </div>
    </section>

    {/* Publishers Section */}
    <section id="studios" className="directory-section" data-section-type="studios">
      <h2>Browse by Publisher</h2>
      <p>Discover comics produced by renowned publishers known for their distinctive styles and quality.</p>

      {/* Studio Directory - Will be populated by backend data */}
      <div className="studio-directory" data-content="comics-studios">
        {/* Template for studio category - will be cloned by JavaScript */}
        <template id="studio-category-template">
          <div className="studio-category" data-studio-id="">
            <h3></h3>
            <ul className="show-list">
              {/* Will be populated dynamically */}
            </ul>
          </div>
        </template>

        {/* Fallback content if no JavaScript or data */}
        <div className="studio-category fallback-content">
          <h3>DC Comics</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Batman" data-related-to="Comics">Batman</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Superman" data-related-to="Comics">Superman</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Wonder Woman" data-related-to="Comics">Wonder Woman</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="DC Comics" data-related-to="Comics">View All DC Comics</a></li>
          </ul>
        </div>
      </div>
    </section>

    {/* Alphabetical Section */}
    <section id="alphabetical" className="directory-section" data-section-type="alphabetical">
      <h2>Alphabetical List</h2>
      <p>Browse all comics in our database alphabetically.</p>

      <div className="alphabet-navigation" data-content="alphabet-nav">
        {/* Will be populated dynamically */}
        <template id="alphabet-link-template">
          <a href="#" className="non-existent-link" data-page-type="anchor" data-letter="" data-related-to="Comics"></a>
        </template>

        {/* Fallback content */}
        <a href="#a" className="non-existent-link" data-page-type="anchor" data-page-title="A" data-related-to="Comics">A</a>
        <a href="#b" className="non-existent-link" data-page-type="anchor" data-page-title="B" data-related-to="Comics">B</a>
        <a href="#c" className="non-existent-link" data-page-type="anchor" data-page-title="C" data-related-to="Comics">C</a>
        {/* More letters would be here */}
      </div>

      <div className="alphabetical-listing" data-content="alphabetical-listing">
        {/* Template for letter section - will be cloned by JavaScript */}
        <template id="letter-section-template">
          <div className="letter-section" data-letter="">
            <h3></h3>
            <ul className="show-list-alpha">
              {/* Will be populated dynamically */}
            </ul>
          </div>
        </template>

        {/* Fallback content if no JavaScript or data */}
        <div id="a" className="letter-section fallback-content">
          <h3>A</h3>
          <ul className="show-list-alpha">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Avengers" data-related-to="Comics">Avengers</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Aquaman" data-related-to="Comics">Aquaman</a></li>
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
          <p>Try searching for specific comics or characters using the search bar at the top of the page.</p>
        </div>

        <div className="help-option">
          <h3>Request Content</h3>
          <p>Don't see a comic that should be included? Let us know and we'll add it to our database.</p>
          <a href="#" className="non-existent-link" data-page-type="action" data-page-title="Request Comic Addition" data-related-to="Comics">Request Addition</a>
        </div>

        <div className="help-option">
          <h3>Create Content</h3>
          <p>Contribute to FanArcs by creating a page for your favorite comic.</p>
          <a href="#" className="non-existent-link" data-page-type="action" data-page-title="Learn How to Contribute" data-related-to="Comics">Learn How to Contribute</a>
        </div>
      </div>
    </section>
  </main>
  </div>
  );
};

export default ComicsDirectory;


