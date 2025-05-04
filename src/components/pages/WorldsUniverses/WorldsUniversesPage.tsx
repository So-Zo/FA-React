import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/WorldsUniversesPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';

const WorldsUniversesPage: React.FC = () => {
  return (
    <div className="worlds-universes-page">
      {/* Introduction Section */}
      <section className="section-content">
        <div className="container">
          <h2>Journey Through Fictional Realms</h2>
          <p>
            Explore interconnected worlds, crossover potential, and the most popular characters across different media franchises.
            Discover how creators build consistent worlds and how these universes evolve across different storytelling mediums.
          </p>

          <div className="quick-links">
            <Link to="/worlds-universes/directory" className="quick-link">
              <span className="icon">🌌</span>
              <span className="text">Universes Directory</span>
            </Link>
            <Link to="/worlds-universes/crossovers" className="quick-link">
              <span className="icon">🔄</span>
              <span className="text">Crossover Events</span>
            </Link>
            <Link to="/community#worlds-section" className="quick-link">
              <span className="icon">👥</span>
              <span className="text">Fan Theories</span>
            </Link>
          </div>
        </div>
      </section>

      {/* World-Building Section */}
      <section className="section-content">
        <div className="container">
          <h2>The Art of World-Building</h2>
          <p>
            World-building is the process of constructing an imaginary world with coherent qualities such as geography,
            history, culture, and ecology. The most compelling fictional universes feel alive and authentic, with
            internal logic and consistency that allows audiences to immerse themselves fully.
          </p>

          <div className="worldbuilding-elements">
            <div className="element-card">
              <h3>Geography & Environment</h3>
              <p>
                The physical spaces where stories unfold, including landscapes, cities, planets, and dimensions.
                Well-crafted environments reflect their inhabitants and histories, shaping the stories that can be told.
              </p>
              <div className="examples">
                <h4>Notable Examples:</h4>
                <ul>
                  <li>Middle-earth's diverse regions in Lord of the Rings</li>
                  <li>The detailed school grounds of Hogwarts in Harry Potter</li>
                  <li>The distinctive planets of Star Wars</li>
                </ul>
              </div>
            </div>

            <div className="element-card">
              <h3>History & Lore</h3>
              <p>
                The backstory and mythology that gives depth to a fictional world. Rich histories create context
                for current events and provide opportunities for prequels, spinoffs, and expanded storytelling.
              </p>
              <div className="examples">
                <h4>Notable Examples:</h4>
                <ul>
                  <li>The extensive timeline of Middle-earth spanning thousands of years</li>
                  <li>Marvel's evolving continuity across decades of comics</li>
                  <li>The ancient histories and myths in Game of Thrones</li>
                </ul>
              </div>
            </div>

            <div className="element-card">
              <h3>Social Structures & Culture</h3>
              <p>
                The societies, governments, religions, and cultural practices that shape how characters interact.
                These elements add authenticity and create natural sources of conflict and drama.
              </p>
              <div className="examples">
                <h4>Notable Examples:</h4>
                <ul>
                  <li>The Houses and political systems of Dune</li>
                  <li>The distinct cultures of different nations in Avatar: The Last Airbender</li>
                  <li>The complex social hierarchy in Bridgerton</li>
                </ul>
              </div>
            </div>

            <div className="element-card">
              <h3>Rules & Systems</h3>
              <p>
                The consistent laws that govern how the world works, particularly regarding magic, technology,
                or supernatural elements. Well-defined systems create boundaries that make stories more compelling.
              </p>
              <div className="examples">
                <h4>Notable Examples:</h4>
                <ul>
                  <li>The detailed magic system in Brandon Sanderson's Cosmere</li>
                  <li>The rules of bending in Avatar: The Last Airbender</li>
                  <li>The consistent technology in Star Trek</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Iconic Universes Section */}
      <section className="universes-section">
        <div className="container">
          <h2>Iconic Fictional Universes</h2>
          <p>
            Some fictional universes have transcended their original medium to become cultural touchstones,
            expanding across books, films, television, games, and more. These expansive worlds continue to
            grow and evolve, captivating new generations of fans.
          </p>

          <div className="universes-showcase">
            <div className="universe-card">
              <div className="universe-image placeholder">
                <span>Marvel Cinematic Universe</span>
              </div>
              <div className="universe-content">
                <h3>Marvel Cinematic Universe</h3>
                <p>
                  A shared universe centered on superhero films and TV series based on Marvel Comics characters.
                  The MCU has revolutionized franchise storytelling with its interconnected narratives across
                  multiple films and series.
                </p>
                <div className="universe-stats">
                  <div className="stat">
                    <span className="stat-label">Origin:</span>
                    <span className="stat-value">Comics (1939), MCU (2008)</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Media:</span>
                    <span className="stat-value">Films, TV, Comics, Games</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Key Locations:</span>
                    <span className="stat-value">Earth-616, Asgard, Wakanda</span>
                  </div>
                </div>
                <Link to="/worlds-universes/marvel" className="universe-link">Explore Marvel Universe →</Link>
              </div>
            </div>

            <div className="universe-card">
              <div className="universe-image placeholder">
                <span>Star Wars Universe</span>
              </div>
              <div className="universe-content">
                <h3>Star Wars Universe</h3>
                <p>
                  A space opera epic set "a long time ago in a galaxy far, far away," featuring the struggle
                  between the light and dark sides of the Force. The Star Wars universe spans millennia of
                  galactic history across multiple eras.
                </p>
                <div className="universe-stats">
                  <div className="stat">
                    <span className="stat-label">Origin:</span>
                    <span className="stat-value">Film (1977)</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Media:</span>
                    <span className="stat-value">Films, TV, Books, Comics, Games</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Key Locations:</span>
                    <span className="stat-value">Tatooine, Coruscant, Death Star</span>
                  </div>
                </div>
                <Link to="/worlds-universes/star-wars" className="universe-link">Explore Star Wars Universe →</Link>
              </div>
            </div>

            <div className="universe-card">
              <div className="universe-image placeholder">
                <span>Middle-earth</span>
              </div>
              <div className="universe-content">
                <h3>Middle-earth</h3>
                <p>
                  J.R.R. Tolkien's meticulously crafted fantasy world, home to hobbits, elves, dwarves, and men.
                  Middle-earth features a comprehensive mythology, multiple languages, and thousands of years of history.
                </p>
                <div className="universe-stats">
                  <div className="stat">
                    <span className="stat-label">Origin:</span>
                    <span className="stat-value">Books (1937)</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Media:</span>
                    <span className="stat-value">Books, Films, TV, Games</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Key Locations:</span>
                    <span className="stat-value">The Shire, Mordor, Gondor</span>
                  </div>
                </div>
                <Link to="/worlds-universes/middle-earth" className="universe-link">Explore Middle-earth →</Link>
              </div>
            </div>
          </div>

          <div className="cta-link">
            <Link to="/worlds-universes/directory">Explore All Fictional Universes →</Link>
          </div>
        </div>
      </section>

      {/* Crossovers Section */}
      <section className="crossovers-section">
        <div className="container">
          <h2>Crossovers & Shared Universes</h2>
          <p>
            When fictional worlds collide, exciting storytelling possibilities emerge. Crossovers and shared
            universes allow characters from different properties to interact, creating unique narrative opportunities
            and expanding the scope of established worlds.
          </p>

          <div className="crossover-types">
            <div className="crossover-type">
              <h3>Planned Shared Universes</h3>
              <p>
                Fictional worlds designed from the beginning to encompass multiple series or properties,
                with coordinated storytelling across different media or titles.
              </p>
              <div className="crossover-examples">
                <div className="crossover-example">
                  <h4>Marvel Cinematic Universe</h4>
                  <p>
                    A carefully planned cinematic universe where individual hero films build toward team-up events
                    like The Avengers, with consistent continuity across dozens of films and TV series.
                  </p>
                </div>
                <div className="crossover-example">
                  <h4>The CW's Arrowverse</h4>
                  <p>
                    A television shared universe spanning multiple DC Comics-based shows including Arrow,
                    The Flash, and Supergirl, featuring regular crossover events.
                  </p>
                </div>
              </div>
            </div>

            <div className="crossover-type">
              <h3>Retroactive Connections</h3>
              <p>
                Previously separate works that are later connected through crossovers, retcons, or expanded universe content.
              </p>
              <div className="crossover-examples">
                <div className="crossover-example">
                  <h4>Universal Monsters</h4>
                  <p>
                    Classic monster films featuring Dracula, Frankenstein's Monster, and the Wolf Man that
                    were initially separate but later crossed over in films like "House of Frankenstein."
                  </p>
                </div>
                <div className="crossover-example">
                  <h4>Pixar Theory</h4>
                  <p>
                    A fan theory (with some official support) suggesting all Pixar films exist in a shared
                    universe with subtle connections and Easter eggs linking them together.
                  </p>
                </div>
              </div>
            </div>

            <div className="crossover-type">
              <h3>Multiverse Approaches</h3>
              <p>
                Frameworks that allow different versions or iterations of universes to coexist and occasionally interact.
              </p>
              <div className="crossover-examples">
                <div className="crossover-example">
                  <h4>DC Comics Multiverse</h4>
                  <p>
                    A system of parallel universes that allows different versions of characters to coexist,
                    with events like "Crisis on Infinite Earths" bringing them together.
                  </p>
                </div>
                <div className="crossover-example">
                  <h4>Spider-Man: Into the Spider-Verse</h4>
                  <p>
                    An animated film that brings together Spider-People from different dimensions,
                    celebrating different iterations of the character across media.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More sections would be added here */}
      <section className="content-section">
        <div className="container">
          <div className="section-divider">
            <span>More sections coming soon...</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorldsUniversesPage;
