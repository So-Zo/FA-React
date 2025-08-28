import React from "react";
import { Link } from "react-router-dom";
import TableOfContents, {
  TocSectionProps,
} from "../../../components/ui/TableOfContents";

const WorldsUniversesDirectory: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Basics", anchor: "#popular-worlds" },
        { label: "History", anchor: "#world-types" },
        { label: "Terms", anchor: "#terminology" },
      ],
      deepLinks: [
        {
          label: "World's Directory",
          path: "/worlds-universes/directory",
          exists: true,
        },
      ],
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Genre", anchor: "#world-types" },
        { label: "Style", anchor: "#media-source" },
      ],
      deepLinks: [],
    },
    {
      title: "BEHIND THE SCENES",
      quickLinks: [
        { label: "How", anchor: "#creators" },
        { label: "Audience", anchor: "#alphabetical" },
      ],
      deepLinks: [],
    },
  ];

  return (
    <div className="worlds-universes-page worlds-universes-directory-page">
      <header>
        <div className="image-header">
          <img
            src="/images/worlds/WorldsUniversesHeader.jpg"
            alt="Worlds & Universes Overview"
          />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search Worlds & Universes"
          placeholder="Search for Worlds, Universes, Characters, etc."
        />

        <button className="wiki-edit-button" id="page-edit-button">
          Edit Page
        </button>
      </header>

      <hr />

      <main id="main-content" role="main">
        {/* New Table of Contents */}
        <TableOfContents
          sections={tocSections}
          title="Worlds & Universes Directory"
          description="Use this table of contents to navigate through the worlds and universes directory."
        />

        <section
          id="popular-worlds"
          className="section-content"
          data-section-type="popular"
        >
          <h2>Popular Fictional Worlds</h2>
          <p>
            These widely acclaimed fictional worlds are excellent starting
            points for exploring worldbuilding.
          </p>

          <div className="profile-card-grid" data-content="popular-worlds">
            <div className="profile-card">
              <div className="profile-card-image">
                <img src="/images/worlds/middle-earth.jpg" alt="Middle-earth" />
              </div>
              <div className="profile-card-content">
                <h3>Middle-earth</h3>
                <p className="card-subtext">High Fantasy, Epic</p>
                <p>
                  J.R.R. Tolkien's meticulously crafted fantasy realm from The
                  Lord of the Rings and related works, featuring multiple races,
                  languages, and thousands of years of history.
                </p>
                <div className="show-links">
                  <Link to="/community#middle-earth" className="default-links">
                    Community Content →
                  </Link>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-card-image">
                <img
                  src="/images/worlds/star-wars-galaxy.jpg"
                  alt="Star Wars Galaxy"
                />
              </div>
              <div className="profile-card-content">
                <h3 className="profile-card-title">Star Wars Galaxy</h3>
                <p className="profile-card-subtitle">
                  Space Opera, Science Fantasy
                </p>
                <p className="profile-card-text">
                  George Lucas's space fantasy setting that combines science
                  fiction with mythic storytelling, spanning multiple planets,
                  species, and eras.
                </p>
                <div className="show-links">
                  <Link
                    to="/community#star-wars-galaxy"
                    className="default-links"
                  >
                    Community Content →
                  </Link>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-card-image">
                <img
                  src="/images/worlds/wizarding-world.jpg"
                  alt="Wizarding World"
                />
              </div>
              <div className="profile-card-content">
                <h3 className="profile-card-title">Wizarding World</h3>
                <p className="profile-card-subtitle">Low Fantasy, Magical</p>
                <p className="profile-card-text">
                  J.K. Rowling's magical world existing alongside our own
                  reality in the Harry Potter series, featuring magical
                  institutions, creatures, and societies.
                </p>
                <div className="show-links">
                  <Link
                    to="/community#wizarding-world"
                    className="default-links"
                  >
                    Community Content →
                  </Link>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-card-image">
                <img src="/images/worlds/westeros.jpg" alt="Westeros" />
              </div>
              <div className="profile-card-content">
                <h3 className="profile-card-title">Westeros & Essos</h3>
                <p className="profile-card-subtitle">Dark Fantasy, Political</p>
                <p className="profile-card-text">
                  George R.R. Martin's gritty, politically complex fantasy world
                  from A Song of Ice and Fire/Game of Thrones, known for its
                  moral ambiguity and realistic consequences.
                </p>
                <div className="show-links">
                  <Link to="/community#westeros" className="default-links">
                    Community Content →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="world-types"
          className="section-content"
          data-section-type="types"
        >
          <h2>Browse by World Type</h2>
          <p>Find fictional worlds based on their genre and characteristics.</p>

        
              <h3>Fantasy Worlds</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Middle-earth"
                    data-related-to="Worlds"
                  >
                    Middle-earth (Lord of the Rings)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Narnia"
                    data-related-to="Worlds"
                  >
                    Narnia
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Westeros"
                    data-related-to="Worlds"
                  >
                    Westeros (Game of Thrones)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Discworld"
                    data-related-to="Worlds"
                  >
                    Discworld
                  </a>
                </li>
              </ul>
      

            
              <h3>Science Fiction Worlds</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Star Wars Galaxy"
                    data-related-to="Worlds"
                  >
                    Star Wars Galaxy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Star Trek Universe"
                    data-related-to="Worlds"
                  >
                    Star Trek Universe
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Dune Universe"
                    data-related-to="Worlds"
                  >
                    Dune Universe
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Foundation Universe"
                    data-related-to="Worlds"
                  >
                    Foundation Universe
                  </a>
                </li>
              </ul>
            

          
              <h3>Superhero Universes</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Marvel Universe"
                    data-related-to="Worlds"
                  >
                    Marvel Universe
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="DC Universe"
                    data-related-to="Worlds"
                  >
                    DC Universe
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Watchmen World"
                    data-related-to="Worlds"
                  >
                    Watchmen World
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Invincible Universe"
                    data-related-to="Worlds"
                  >
                    Invincible Universe
                  </a>
                </li>
              </ul>
          

        
              <h3>Post-Apocalyptic Worlds</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Fallout World"
                    data-related-to="Worlds"
                  >
                    Fallout World
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="The Walking Dead World"
                    data-related-to="Worlds"
                  >
                    The Walking Dead World
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Mad Max Wasteland"
                    data-related-to="Worlds"
                  >
                    Mad Max Wasteland
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Metro Universe"
                    data-related-to="Worlds"
                  >
                    Metro Universe
                  </a>
                </li>
              </ul>
        </section>

        <section
          id="media-source"
          className="section-content"
          data-section-type="media"
        >
          <h2>Browse by Media Source</h2>
          <p>Explore fictional worlds based on their original medium.</p>

         
              <h3>Literature</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Middle-earth"
                    data-related-to="Worlds"
                  >
                    Middle-earth (Tolkien)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Westeros"
                    data-related-to="Worlds"
                  >
                    Westeros (Martin)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Discworld"
                    data-related-to="Worlds"
                  >
                    Discworld (Pratchett)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Dune Universe"
                    data-related-to="Worlds"
                  >
                    Dune Universe (Herbert)
                  </a>
                </li>
              </ul>
            

            
              <h3>Film & Television</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Star Wars Galaxy"
                    data-related-to="Worlds"
                  >
                    Star Wars Galaxy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Star Trek Universe"
                    data-related-to="Worlds"
                  >
                    Star Trek Universe
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Marvel Cinematic Universe"
                    data-related-to="Worlds"
                  >
                    Marvel Cinematic Universe
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Jurassic Park World"
                    data-related-to="Worlds"
                  >
                    Jurassic Park World
                  </a>
                </li>
              </ul>
    

      
              <h3>Comics & Graphic Novels</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Marvel Comics Universe"
                    data-related-to="Worlds"
                  >
                    Marvel Comics Universe
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="DC Comics Universe"
                    data-related-to="Worlds"
                  >
                    DC Comics Universe
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="The Walking Dead World"
                    data-related-to="Worlds"
                  >
                    The Walking Dead World
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="The Sandman Universe"
                    data-related-to="Worlds"
                  >
                    The Sandman Universe
                  </a>
                </li>
              </ul>
          

          
              <h3>Video Games</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="The Elder Scrolls World"
                    data-related-to="Worlds"
                  >
                    The Elder Scrolls World
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Fallout World"
                    data-related-to="Worlds"
                  >
                    Fallout World
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Mass Effect Galaxy"
                    data-related-to="Worlds"
                  >
                    Mass Effect Galaxy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Hyrule"
                    data-related-to="Worlds"
                  >
                    Hyrule (Legend of Zelda)
                  </a>
                </li>
              </ul>
        </section>

        <section
          id="creators"
          className="section-content"
          data-section-type="creators"
        >
          <h2>Browse by Creator</h2>
          <p>
            Explore fictional worlds based on their creators and worldbuilders.
          </p>

          
              <h3>J.R.R. Tolkien</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Middle-earth"
                    data-related-to="Worlds"
                  >
                    Middle-earth
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Arda"
                    data-related-to="Worlds"
                  >
                    Arda (The Complete World)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Númenor"
                    data-related-to="Worlds"
                  >
                    Númenor
                  </a>
                </li>
              </ul>
            

            
              <h3>George R.R. Martin</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Westeros & Essos"
                    data-related-to="Worlds"
                  >
                    Westeros & Essos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="The Thousand Worlds"
                    data-related-to="Worlds"
                  >
                    The Thousand Worlds
                  </a>
                </li>
              </ul>
            

      
              <h3>Brandon Sanderson</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="The Cosmere"
                    data-related-to="Worlds"
                  >
                    The Cosmere
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Roshar"
                    data-related-to="Worlds"
                  >
                    Roshar
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Scadrial"
                    data-related-to="Worlds"
                  >
                    Scadrial
                  </a>
                </li>
              </ul>
          

            
              <h3>Ursula K. Le Guin</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Earthsea"
                    data-related-to="Worlds"
                  >
                    Earthsea
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Hainish Cycle"
                    data-related-to="Worlds"
                  >
                    Hainish Cycle
                  </a>
                </li>
              </ul>
        </section>

        <section
          id="alphabetical"
          className="section-content"
          data-section-type="alphabetical"
        >
          <h2>Alphabetical List</h2>
          <p>
            Browse all fictional worlds and universes in our database
            alphabetically.
          </p>

          <div className="alphabet-navigation" data-content="alphabet-nav">
            <a
              href="#a"
              className="non-existent-link"
              data-page-type="anchor"
              data-page-title="A"
              data-related-to="Worlds"
            >
              A
            </a>
            <a
              href="#b"
              className="non-existent-link"
              data-page-type="anchor"
              data-page-title="B"
              data-related-to="Worlds"
            >
              B
            </a>
            <a
              href="#c"
              className="non-existent-link"
              data-page-type="anchor"
              data-page-title="C"
              data-related-to="Worlds"
            >
              C
            </a>
            <a
              href="#d"
              className="non-existent-link"
              data-page-type="anchor"
              data-page-title="D"
              data-related-to="Worlds"
            >
              D
            </a>
            {/* Continue with all letters */}
            <a
              href="#z"
              className="non-existent-link"
              data-page-type="anchor"
              data-page-title="Z"
              data-related-to="Worlds"
            >
              Z
            </a>
          </div>

          
              <h3>A</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Arrakis"
                    data-related-to="Worlds"
                  >
                    Arrakis (Dune)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Azeroth"
                    data-related-to="Worlds"
                  >
                    Azeroth (Warcraft)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Arda"
                    data-related-to="Worlds"
                  >
                    Arda (Tolkien's Complete World)
                  </a>
                </li>
                {/* More worlds starting with A */}
              </ul>
            

              <h3>B</h3>
              <ul className="show-list">
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Barsoom"
                    data-related-to="Worlds"
                  >
                    Barsoom (John Carter)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Blade Runner World"
                    data-related-to="Worlds"
                  >
                    Blade Runner World
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="non-existent-link"
                    data-page-type="world"
                    data-page-title="Black Panther's Wakanda"
                    data-related-to="Worlds"
                  >
                    Black Panther's Wakanda
                  </a>
                </li>
                {/* More worlds starting with B */}
              </ul>
      

            {/* Continue with all letters */}
        </section>

        <section className="section-content">
          <h2>Can't Find What You're Looking For?</h2>
              <h3>Use Search</h3>
              <p>
                Try searching for specific worlds or universes using the search
                bar at the top of the page.
              </p>
        </section>
      </main>
    </div>
  );
};

export default WorldsUniversesDirectory;
