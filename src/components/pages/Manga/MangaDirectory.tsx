import React from "react";
import { Link } from "react-router-dom";
import TableOfContents, {
  TocSectionProps,
} from "../../../components/ui/TableOfContents";

const MangaDirectory: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Popular Manga", anchor: "#popular-series" },
        { label: "Genres", anchor: "#genres" },
        { label: "Publishers", anchor: "#publishers" },
      ],
      deepLinks: [
        { label: "Manga Encyclopedia", path: "/manga", exists: true },
        { label: "Manga History", path: "/manga/history", exists: true },
      ],
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Demographics", anchor: "#demographics" },
        { label: "Alphabetical", anchor: "#alphabetical" },
      ],
      deepLinks: [],
    },
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

        <button className="wiki-edit-button" id="page-edit-button">
          Edit Page
        </button>
      </header>

      <hr />

      {/* Table of Contents */}
      <TableOfContents
        sections={tocSections}
        title="Manga Directory"
        description="Use this table of contents to navigate to different sections of the Manga Directory."
      />

      <main id="main-content" role="main">
        {/* Popular Series Section */}
        <section
          id="popular-series"
          className="section-content"
          data-section-type="popular"
        >
          <h2>Popular Manga Series</h2>
          <p>
            These widely acclaimed manga series are excellent starting points
            for exploring the medium.
          </p>

          <div className="profile-card-grid">
            <div className="profile-card">
              <div className="profile-card-image">
                <img src="/images/manga/shows/one-piece.jpg" alt="One Piece" />
              </div>
              <div className="profile-card-content">
                <h3>One Piece</h3>
                <p className="card-subtext">Adventure, Fantasy, Shōnen</p>
                <p>
                  Follow Monkey D. Luffy and his pirate crew as they search for
                  the world's ultimate treasure known as the "One Piece".
                </p>
                <div className="show-links">
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="show"
                    data-page-title="One Piece"
                    data-related-to="Manga"
                  >
                    Official Page
                  </a>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-card-image">
                <img
                  src="/images/manga/shows/attack-on-titan.jpg"
                  alt="Attack on Titan"
                />
              </div>
              <div className="profile-card-content">
                <h3>Attack on Titan</h3>
                <p className="card-subtext">
                  Action, Dark Fantasy, Post-Apocalyptic
                </p>
                <p>
                  In a world where humanity lives within cities surrounded by
                  enormous walls due to the Titans, gigantic humanoid creatures
                  who devour humans seemingly without reason.
                </p>
                <div className="show-links">
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="show"
                    data-page-title="Attack on Titan"
                    data-related-to="Manga"
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
            Find manga based on your preferred storytelling styles and themes.
          </p>

          {/* Removed genre-directory and genre-category wrappers */}
          <h3>Action/Adventure</h3>
          <ul className="show-list">
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="One Piece"
                data-related-to="Manga"
              >
                One Piece
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Naruto"
                data-related-to="Manga"
              >
                Naruto
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="My Hero Academia"
                data-related-to="Manga"
              >
                My Hero Academia
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="directory"
                data-page-title="Action Manga"
                data-related-to="Manga"
              >
                View All Action Manga
              </a>
            </li>
          </ul>

          <h3>Fantasy</h3>
          <ul className="show-list">
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Berserk"
                data-related-to="Manga"
              >
                Berserk
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Fairy Tail"
                data-related-to="Manga"
              >
                Fairy Tail
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Made in Abyss"
                data-related-to="Manga"
              >
                Made in Abyss
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="directory"
                data-page-title="Fantasy Manga"
                data-related-to="Manga"
              >
                View All Fantasy Manga
              </a>
            </li>
          </ul>
        </section>

        {/* Demographics Section */}
        <section
          id="demographics"
          className="section-content"
          data-section-type="demographics"
        >
          <h2>Browse by Demographics</h2>
          <p>
            Manga is often categorized by its target audience in Japan, though
            fans of all types enjoy them worldwide.
          </p>

          {/* Removed demographic-directory and demographic-category wrappers */}
          <h3>Shōnen (Young Men)</h3>
          <ul className="show-list">
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Dragon Ball"
                data-related-to="Manga"
              >
                Dragon Ball
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Naruto"
                data-related-to="Manga"
              >
                Naruto
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Demon Slayer"
                data-related-to="Manga"
              >
                Demon Slayer
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="directory"
                data-page-title="Shonen Manga"
                data-related-to="Manga"
              >
                View All Shōnen Manga
              </a>
            </li>
          </ul>

          <h3>Shōjo (Young Women)</h3>
          <ul className="show-list">
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Fruits Basket"
                data-related-to="Manga"
              >
                Fruits Basket
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Ouran High School Host Club"
                data-related-to="Manga"
              >
                Ouran High School Host Club
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Sailor Moon"
                data-related-to="Manga"
              >
                Sailor Moon
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="directory"
                data-page-title="Shojo Manga"
                data-related-to="Manga"
              >
                View All Shōjo Manga
              </a>
            </li>
          </ul>
        </section>

        {/* Publishers Section */}
        <section
          id="publishers"
          className="section-content"
          data-section-type="publishers"
        >
          <h2>Browse by Publisher</h2>
          <p>
            Discover manga produced by renowned publishers known for their
            distinctive styles and quality.
          </p>

          {/* Removed publisher-directory and publisher-category wrappers */}
          <h3>Shueisha</h3>
          <ul className="show-list">
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="One Piece"
                data-related-to="Manga"
              >
                One Piece
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Demon Slayer"
                data-related-to="Manga"
              >
                Demon Slayer
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Jujutsu Kaisen"
                data-related-to="Manga"
              >
                Jujutsu Kaisen
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="directory"
                data-page-title="Shueisha Manga"
                data-related-to="Manga"
              >
                View All Shueisha Manga
              </a>
            </li>
          </ul>

          <h3>Kodansha</h3>
          <ul className="show-list">
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Attack on Titan"
                data-related-to="Manga"
              >
                Attack on Titan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="Fairy Tail"
                data-related-to="Manga"
              >
                Fairy Tail
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="show"
                data-page-title="The Seven Deadly Sins"
                data-related-to="Manga"
              >
                The Seven Deadly Sins
              </a>
            </li>
            <li>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="directory"
                data-page-title="Kodansha Manga"
                data-related-to="Manga"
              >
                View All Kodansha Manga
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
                Try searching for specific manga or characters using the search
                bar at the top of the page.
              </p>
            </div>

            <div className="help-option">
              <h3>Request a Manga</h3>
              <p>
                Don't see a manga that should be included? Let us know and we'll
                add it to our database.
              </p>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="action"
                data-page-title="Request Manga Addition"
                data-related-to="Manga"
              >
                Request Manga Addition
              </a>
            </div>

            <div className="help-option">
              <h3>Create a Manga Page</h3>
              <p>
                Contribute to FanArcs by creating a page for your favorite
                manga.
              </p>
              <a
                href="#"
                className="non-existent-link"
                data-page-type="action"
                data-page-title="Learn How to Contribute"
                data-related-to="Manga"
              >
                Learn How to Contribute
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MangaDirectory;
