import React from "react";
import { Link } from "react-router-dom";
import TableOfContents, { TocSectionProps } from "../../ui/TableOfContents";

const ComicsDirectory: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Popular Comics", anchor: "#popular-series" },
        { label: "Genres", anchor: "#genres" },
        { label: "Eras", anchor: "#eras" },
      ],
      deepLinks: [
        { label: "Comics Encyclopedia", path: "/comics", exists: true },
        { label: "Comics History", path: "/comics/history", exists: true },
      ],
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Publishers", anchor: "#studios" },
        { label: "Alphabetical", anchor: "#alphabetical" },
      ],
      deepLinks: [],
    },
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

        <button className="wiki-edit-button" id="page-edit-button">
          Edit Page
        </button>
      </header>

      <hr />

      {/* Table of Contents */}
      <TableOfContents
        sections={tocSections}
        title="Comics Directory"
        description="Use this table of contents to navigate to different sections of the Comics Directory."
      />

      <main id="main-content" role="main">
        {/* Popular Series Section */}
        <section
          id="popular-series"
          className="section-content"
          data-section-type="popular"
        >
          <h2>Popular Comic Series</h2>
          <p>
            These widely acclaimed series are excellent introductions to comics
            and have many places to start.
          </p>
          <div className="profile-card-grid">
            <div className="profile-card">
              <div className="show-image">
                <img src="/images/comics/shows/batman.jpg" alt="Batman" />
              </div>
              <div className="profile-card-content">
                <h3>Batman</h3>
                <p className="card-subtext">Superhero, Action, Crime, Drama</p>
                <p>
                  Follow the adventures of Bruce Wayne, a billionaire who fights
                  crime in Gotham City as the masked vigilante Batman.
                </p>
                <div className="show-links">
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="show"
                    data-page-title="Batman"
                    data-related-to="Comics"
                  >
                    Official Page
                  </a>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <div className="show-image">
                <img src="/images/comics/shows/superman.jpg" alt="superman" />
              </div>
              <div className="profile-card-content">
                <h3>Superman</h3>
                <p className="card-subtext">Superhero, Action, Crime, Drama</p>
                <p>
                  Follow the adventures of Clark Kent, a journalist from the
                  planet Krypton who uses his extraordinary powers to protect
                  Metropolis as the heroic vigilante Superman.
                </p>
                <div className="show-links">
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="show"
                    data-page-title="superman"
                    data-related-to="Comics"
                  >
                    Official Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Genres Section */}
        <section
          id="genres"
          className="section-content"
          data-section-type="genres"
        >
          <h2>Browse by Genre</h2>
          <p>
            Find comics based on your preferred storytelling styles and themes.
          </p>

          {/* Genre Directory fallback content flattened, no extra wrappers */}
          <h3>Superhero</h3>
          <ul className="show-list">
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Batman"
                data-related-to="Comics"
              >
                Batman
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Spider-Man"
                data-related-to="Comics"
              >
                Spider-Man
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="X-Men"
                data-related-to="Comics"
              >
                X-Men
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="directory"
                data-page-title="Superhero Comics"
                data-related-to="Comics"
              >
                View All Superhero Comics
              </a>
            </li>
          </ul>
        </section>

        {/* Eras Section */}
        <section id="eras" className="section-content" data-section-type="eras">
          <h2>Browse by Era</h2>
          <p>
            Explore comics from different time periods, from classics to the
            latest releases. For a comprehensive overview of how comics have
            evolved over time, check out our{" "}
            <Link to="/comics/history" className="default-links">
              History of Comics
            </Link>{" "}
            page.
          </p>

          {/* Fallback content if no JavaScript or data */}
          <h3>Golden Age (1938-1956)</h3>
          <ul className="show-list">
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Action Comics #1"
                data-related-to="Comics"
              >
                Action Comics #1 (1938)
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Detective Comics #27"
                data-related-to="Comics"
              >
                Detective Comics #27 (1939)
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Captain America Comics #1"
                data-related-to="Comics"
              >
                Captain America Comics #1 (1941)
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="directory"
                data-page-title="Golden Age Comics"
                data-related-to="Comics"
              >
                View All Golden Age Comics
              </a>
            </li>
          </ul>
        </section>

        {/* Publishers Section */}
        <section
          id="studios"
          className="section-content"
          data-section-type="studios"
        >
          <h2>Browse by Publisher</h2>
          <p>
            Discover comics produced by renowned publishers known for their
            distinctive styles and quality.
          </p>

          {/* Fallback content if no JavaScript or data */}
          <h3>DC Comics</h3>
          <ul className="show-list">
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Batman"
                data-related-to="Comics"
              >
                Batman
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Superman"
                data-related-to="Comics"
              >
                Superman
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Wonder Woman"
                data-related-to="Comics"
              >
                Wonder Woman
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="directory"
                data-page-title="DC Comics"
                data-related-to="Comics"
              >
                View All DC Comics
              </a>
            </li>
          </ul>
        </section>

        {/* Alphabetical Section */}
        <section
          id="alphabetical"
          className="section-content"
          data-section-type="alphabetical"
        >
          <h2>Alphabetical List</h2>
          <p>Browse all comics in our database alphabetically.</p>

          {/* Fallback content */}
          <a
            href="#a"
            className="non-existent-link"
            data-page-type="anchor"
            data-page-title="A"
            data-related-to="Comics"
          >
            A
          </a>
          <a
            href="#b"
            className="non-existent-link"
            data-page-type="anchor"
            data-page-title="B"
            data-related-to="Comics"
          >
            B
          </a>
          <a
            href="#c"
            className="non-existent-link"
            data-page-type="anchor"
            data-page-title="C"
            data-related-to="Comics"
          >
            C
          </a>
          {/* More letters would be here */}

          {/* Fallback content if no JavaScript or data */}
          <h3>A</h3>
          <ul className="show-list-alpha">
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Avengers"
                data-related-to="Comics"
              >
                Avengers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Aquaman"
                data-related-to="Comics"
              >
                Aquaman
              </a>
            </li>
          </ul>
        </section>

        {/* Help Section */}
        <section className="section-content">
          <h2>Can't Find What You're Looking For?</h2>
          <div className="help-options">
            <div className="help-option">
              <h3>Use Search</h3>
              <p>
                Try searching for specific comics or characters using the search
                bar at the top of the page.
              </p>
            </div>

            <div className="help-option">
              <h3>Request a Comic</h3>
              <p>
                Don't see a comic that should be included? Let us know and we'll
                add it to our database.
              </p>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="action"
                data-page-title="Request Comic Addition"
                data-related-to="Comics"
              >
                Request Comic Addition
              </a>
            </div>

            <div className="help-option">
              <h3>Create a Comic Page</h3>
              <p>
                Contribute to FanArcs by creating a page for your favorite
                comic.
              </p>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="action"
                data-page-title="Learn How to Contribute"
                data-related-to="Comics"
              >
                Learn How to Contribute
              </a>
              <p>Try creating one of these popular comics:</p>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="show"
                    data-page-title="Watchmen"
                    data-related-to="Comics"
                  >
                    Watchmen
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="show"
                    data-page-title="Saga"
                    data-related-to="Comics"
                  >
                    Saga
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ComicsDirectory;
