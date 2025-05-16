import React from 'react';
import { Link } from 'react-router-dom';
import TableOfContents, { TocSectionProps } from '../../ui/TableOfContents';
import '../../../components/ui/AnimePage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';
import '../../../components/ui/MediaPages.css';
import '../../../components/ui/DirectoryPages.css';

const AnimeDirectory: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Popular Series", anchor: "#popular-series" },
        { label: "Genres", anchor: "#genres" },
        { label: "Eras", anchor: "#eras" }
      ],
      deepLinks: [
        { label: "Anime Encyclopedia", path: "/anime", exists: true },
        { label: "Anime History", path: "/anime/history", exists: true }
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
    <div className="anime-page anime-directory-page">
      <header>
        <div className="image-header">
          <img src="/images/anime/AnimeHeader.jpg" alt="Anime Overview" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search From Anime Page"
          placeholder="Search for Characters, Universes, etc."
        />

        <button className="wiki-edit-button" id="page-edit-button">Edit Page</button>
      </header>

      {/* Table of Contents */}
      <TableOfContents
        sections={tocSections}
        title="Anime Directory"
        description="Use this table of contents to navigate to different sections of the Anime Directory."
      />

      <main id="main-content" role="main">
        {/* Directory Intro Section */}
        <section className="directory-intro">
          <h1>Anime Shows Directory</h1>
          <p>Browse our collection of anime series organized by genre, popularity, and release era. Each show page contains official information, character listings, and links to related community content.</p>

          <div className="directory-navigation">
            <a href="#popular-series" className="non-existent-link" data-page-type="anchor" data-page-title="Popular Series" data-related-to="Anime">Popular Series</a>
            <a href="#genres" className="non-existent-link" data-page-type="anchor" data-page-title="Browse by Genre" data-related-to="Anime">Browse by Genre</a>
            <a href="#eras" className="non-existent-link" data-page-type="anchor" data-page-title="Browse by Era" data-related-to="Anime">Browse by Era</a>
            <a href="#studios" className="non-existent-link" data-page-type="anchor" data-page-title="Browse by Studio" data-related-to="Anime">Browse by Studio</a>
            <a href="#alphabetical" className="non-existent-link" data-page-type="anchor" data-page-title="Alphabetical List" data-related-to="Anime">Alphabetical List</a>
            <Link to="/anime/history" className="default-links">History of Anime</Link>
          </div>
        </section>

    {/* Popular Series Section */}
    <section id="popular-series" className="directory-section">
      <h2>Popular Anime Series</h2>
      <p>These widely acclaimed series are excellent starting points for exploring anime.</p>

      <div className="show-grid">
        <div className="show-card">
          <div className="show-image">
            <img src="/images/anime/shows/naruto.jpg" alt="Naruto" />
          </div>
          <div className="show-info">
            <h3>Naruto</h3>
            <p className="show-genres">Action, Adventure, Fantasy</p>
            <p className="show-description">Follow Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.</p>
            <div className="show-links">
              <a href="#" className="non-existent-link" data-page-type="show" data-page-title="Naruto" data-related-to="Anime">Official Page</a>
              <Link to="/community#naruto" className="default-links">Community Content</Link>
              <a href="#" className="non-existent-link" data-page-type="character" data-page-title="Naruto Uzumaki" data-related-to="Naruto">Character: Naruto Uzumaki</a>
            </div>
          </div>
        </div>

        <div className="show-card">
          <div className="show-image">
            <img src="/images/anime/shows/attack-on-titan.jpg" alt="Attack on Titan" />
          </div>
          <div className="show-info">
            <h3>Attack on Titan</h3>
            <p className="show-genres">Action, Drama, Fantasy</p>
            <p className="show-description">In a world where humanity lives within cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.</p>
            <div className="show-links">
              <a href="#" className="non-existent-link" data-page-type="show" data-page-title="Attack on Titan" data-related-to="Anime">Official Page</a>
              <Link to="/community#attack-on-titan" className="default-links">Community Content</Link>
              <a href="#" className="non-existent-link" data-page-type="character" data-page-title="Eren Yeager" data-related-to="Attack on Titan">Character: Eren Yeager</a>
            </div>
          </div>
        </div>

        <div className="show-card">
          <div className="show-image">
            <img src="/images/anime/shows/my-hero-academia.jpg" alt="My Hero Academia" />
          </div>
          <div className="show-info">
            <h3>My Hero Academia</h3>
            <p className="show-genres">Action, Superhero, School</p>
            <p className="show-description">In a world where people with superpowers known as "Quirks" are the norm, Izuku Midoriya has dreams of becoming a hero despite being born without abilities.</p>
            <div className="show-links">
              <a href="#" className="non-existent-link" data-page-type="show" data-page-title="My Hero Academia" data-related-to="Anime">Official Page</a>
              <Link to="/community#my-hero-academia" className="default-links">Community Content</Link>
              <a href="#" className="non-existent-link" data-page-type="character" data-page-title="Izuku Midoriya" data-related-to="My Hero Academia">Character: Izuku Midoriya</a>
            </div>
          </div>
        </div>

        <div className="show-card">
          <div className="show-image">
            <img src="/images/anime/shows/demon-slayer.jpg" alt="Demon Slayer" />
          </div>
          <div className="show-info">
            <h3>Demon Slayer</h3>
            <p className="show-genres">Action, Historical, Supernatural</p>
            <p className="show-description">Tanjiro Kamado's peaceful life is shattered after his family is slaughtered by a demon. Now, he fights demons while searching for a cure for his sister, who has been turned into a demon.</p>
            <div className="show-links">
              <a href="#" className="non-existent-link" data-page-type="show" data-page-title="Demon Slayer" data-related-to="Anime">Official Page</a>
              <Link to="/community#demon-slayer" className="default-links">Community Content</Link>
              <a href="#" className="non-existent-link" data-page-type="character" data-page-title="Tanjiro Kamado" data-related-to="Demon Slayer">Character: Tanjiro Kamado</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Genres Section */}
    <section id="genres" className="directory-section">
      <h2>Browse by Genre</h2>
      <p>Find anime series based on your preferred storytelling styles and themes.</p>

      <div className="genre-directory">
        <div className="genre-category">
          <h3>Action & Adventure</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Naruto" data-related-to="Anime">Naruto</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="One Piece" data-related-to="Anime">One Piece</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Fullmetal Alchemist: Brotherhood" data-related-to="Anime">Fullmetal Alchemist: Brotherhood</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Hunter x Hunter" data-related-to="Anime">Hunter x Hunter</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Dragon Ball Super" data-related-to="Dragon Ball">Dragon Ball Super</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Action Anime" data-related-to="Anime">View All Action Anime</a></li>
          </ul>
        </div>

        <div className="genre-category">
          <h3>Fantasy & Supernatural</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Demon Slayer" data-related-to="Anime">Demon Slayer</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Jujutsu Kaisen" data-related-to="Anime">Jujutsu Kaisen</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Made in Abyss" data-related-to="Anime">Made in Abyss</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Mushoku Tensei" data-related-to="Anime">Mushoku Tensei</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Fantasy Anime" data-related-to="Anime">View All Fantasy Anime</a></li>
          </ul>
        </div>

        <div className="genre-category">
          <h3>Slice of Life & Comedy</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="K-On!" data-related-to="Anime">K-On!</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Spy x Family" data-related-to="Anime">Spy x Family</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Kaguya-sama: Love is War" data-related-to="Anime">Kaguya-sama: Love is War</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Nichijou" data-related-to="Anime">Nichijou</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Slice of Life Anime" data-related-to="Anime">View All Slice of Life Anime</a></li>
          </ul>
        </div>

        <div className="genre-category">
          <h3>Drama & Romance</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Your Lie in April" data-related-to="Anime">Your Lie in April</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Violet Evergarden" data-related-to="Anime">Violet Evergarden</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Fruits Basket" data-related-to="Anime">Fruits Basket</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Clannad" data-related-to="Anime">Clannad</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Drama Anime" data-related-to="Anime">View All Drama Anime</a></li>
          </ul>
        </div>
      </div>
    </section>

    {/* Eras Section */}
    <section id="eras" className="directory-section">
      <h2>Browse by Era</h2>
      <p>Explore anime from different time periods, from classics to the latest releases. For a comprehensive overview of how anime has evolved over time, check out our <Link to="/anime/history" className="default-links">History of Anime</Link> page.</p>

      <div className="era-directory">
        <div className="era-category">
          <h3>Classic (Pre-2000)</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Cowboy Bebop" data-related-to="Anime">Cowboy Bebop (1998)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Neon Genesis Evangelion" data-related-to="Anime">Neon Genesis Evangelion (1995)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Dragon Ball" data-related-to="Anime">Dragon Ball (1986)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Classic Anime" data-related-to="Anime">View All Classic Anime</a></li>
          </ul>
        </div>

        <div className="era-category">
          <h3>2000s</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Fullmetal Alchemist: Brotherhood" data-related-to="Anime">Fullmetal Alchemist: Brotherhood (2009)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Death Note" data-related-to="Anime">Death Note (2006)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Code Geass" data-related-to="Anime">Code Geass (2006)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="2000s Anime" data-related-to="Anime">View All 2000s Anime</a></li>
          </ul>
        </div>

        <div className="era-category">
          <h3>2010s</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Attack on Titan" data-related-to="Anime">Attack on Titan (2013)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="My Hero Academia" data-related-to="Anime">My Hero Academia (2016)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Demon Slayer" data-related-to="Anime">Demon Slayer (2019)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="2010s Anime" data-related-to="Anime">View All 2010s Anime</a></li>
          </ul>
        </div>

        <div className="era-category">
          <h3>Current (2020s)</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Jujutsu Kaisen" data-related-to="Anime">Jujutsu Kaisen (2020)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Spy x Family" data-related-to="Anime">Spy x Family (2022)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Chainsaw Man" data-related-to="Anime">Chainsaw Man (2022)</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Current Anime" data-related-to="Anime">View All Current Anime</a></li>
          </ul>
        </div>
      </div>
    </section>

    {/* Studios Section */}
    <section id="studios" className="directory-section">
      <h2>Browse by Studio</h2>
      <p>Discover anime produced by renowned animation studios known for their distinctive styles and quality.</p>

      <div className="studio-directory">
        <div className="studio-category">
          <h3>Studio Ghibli</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Spirited Away" data-related-to="Studio Ghibli">Spirited Away</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="My Neighbor Totoro" data-related-to="Studio Ghibli">My Neighbor Totoro</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Princess Mononoke" data-related-to="Studio Ghibli">Princess Mononoke</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Studio Ghibli Works" data-related-to="Anime">View All Studio Ghibli Works</a></li>
          </ul>
        </div>

        <div className="studio-category">
          <h3>Kyoto Animation</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Violet Evergarden" data-related-to="Kyoto Animation">Violet Evergarden</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="K-On!" data-related-to="Kyoto Animation">K-On!</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="A Silent Voice" data-related-to="Kyoto Animation">A Silent Voice</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Kyoto Animation Works" data-related-to="Anime">View All Kyoto Animation Works</a></li>
          </ul>
        </div>

        <div className="studio-category">
          <h3>MAPPA</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Jujutsu Kaisen" data-related-to="MAPPA">Jujutsu Kaisen</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Attack on Titan: Final Season" data-related-to="MAPPA">Attack on Titan: Final Season</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Chainsaw Man" data-related-to="MAPPA">Chainsaw Man</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="MAPPA Works" data-related-to="Anime">View All MAPPA Works</a></li>
          </ul>
        </div>

        <div className="studio-category">
          <h3>Ufotable</h3>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Demon Slayer" data-related-to="Ufotable">Demon Slayer</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Fate/Stay Night: Unlimited Blade Works" data-related-to="Ufotable">Fate/Stay Night: Unlimited Blade Works</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Fate/Zero" data-related-to="Ufotable">Fate/Zero</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Ufotable Works" data-related-to="Anime">View All Ufotable Works</a></li>
          </ul>
        </div>
      </div>
    </section>

    {/* Alphabetical Section */}
    <section id="alphabetical" className="directory-section">
      <h2>Alphabetical List</h2>
      <p>Browse all anime series in our database alphabetically.</p>

      <div className="alphabet-navigation">
        <a href="#a" className="non-existent-link" data-page-type="anchor" data-page-title="A" data-related-to="Anime">A</a>
        <a href="#b" className="non-existent-link" data-page-type="anchor" data-page-title="B" data-related-to="Anime">B</a>
        <a href="#c" className="non-existent-link" data-page-type="anchor" data-page-title="C" data-related-to="Anime">C</a>
        <a href="#d" className="non-existent-link" data-page-type="anchor" data-page-title="D" data-related-to="Anime">D</a>
        {/* Continue with all letters */}
        <a href="#z" className="non-existent-link" data-page-type="anchor" data-page-title="Z" data-related-to="Anime">Z</a>
      </div>

      <div className="alphabetical-listing">
        <div id="a" className="letter-section">
          <h3>A</h3>
          <ul className="show-list-alpha">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Attack on Titan" data-related-to="Anime">Attack on Titan</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Assassination Classroom" data-related-to="Anime">Assassination Classroom</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="A Silent Voice" data-related-to="Anime">A Silent Voice</a></li>
            {/* More shows starting with A */}
          </ul>
        </div>

        <div id="b" className="letter-section">
          <h3>B</h3>
          <ul className="show-list-alpha">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Berserk" data-related-to="Anime">Berserk</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Black Clover" data-related-to="Anime">Black Clover</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Bleach" data-related-to="Anime">Bleach</a></li>
            {/* More shows starting with B */}
          </ul>
        </div>

        {/* Continue with all letters */}
      </div>
    </section>

    {/* Help Section */}
    <section className="directory-help">
      <h2>Can't Find What You're Looking For?</h2>
      <div className="help-options">
        <div className="help-option">
          <h3>Use Search</h3>
          <p>Try searching for specific shows or characters using the search bar at the top of the page.</p>
        </div>

        <div className="help-option">
          <h3>Request a Show</h3>
          <p>Don't see a show that should be included? Let us know and we'll add it to our database.</p>
          <a href="#" className="non-existent-link" data-page-type="action" data-page-title="Request Show Addition" data-related-to="Anime">Request Show Addition</a>
        </div>

        <div className="help-option">
          <h3>Create a Show Page</h3>
          <p>Contribute to FanArcs by creating a page for your favorite anime series.</p>
          <a href="#" className="non-existent-link" data-page-type="action" data-page-title="Learn How to Contribute" data-related-to="Anime">Learn How to Contribute</a>
          <p>Try creating one of these popular shows:</p>
          <ul className="show-list">
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Jojo's Bizarre Adventure" data-related-to="Anime">Jojo's Bizarre Adventure</a></li>
            <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Mob Psycho 100" data-related-to="Anime">Mob Psycho 100</a></li>
          </ul>
        </div>
      </div>
    </section>
  </main>
  </div>
  );
};

export default AnimeDirectory;
console.log("💥 Directory page loaded");



