import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/ComicsPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';

const ComicsPage: React.FC = () => {
  return (
    <div className="comics-page">
      {/* Introduction Section */}
      <section className="section-content">
        <div className="container">
          <h2>Explore the World of Comics</h2>
          <p>
            Comics are a vibrant medium that combines visual art and storytelling to create immersive narratives.
            From superhero epics to indie masterpieces, comics have evolved into a sophisticated art form with
            global influence on culture, film, television, and literature.
          </p>

          <div className="quick-links">
            <Link to="/comics/directory" className="quick-link">
              <span className="icon">📚</span>
              <span className="text">Comics Directory</span>
            </Link>
            <Link to="/comics/history" className="quick-link">
              <span className="icon">🕰️</span>
              <span className="text">History of Comics</span>
            </Link>
            <Link to="/community#comics-section" className="quick-link">
              <span className="icon">👥</span>
              <span className="text">Fan Discussions</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Publishers Section */}
      <section className="section-content">
        <div className="container">
          <h2>Major Publishers</h2>
          <p>
            The comics industry is dominated by several major publishers, each with their own distinctive
            universes, characters, and storytelling approaches. Here's an overview of the most influential
            publishers in the industry:
          </p>

          <div className="publishers-grid">
            <div className="publisher-card">
              <h3>Marvel Comics</h3>
              <p>
                Home to iconic characters like Spider-Man, Iron Man, and the X-Men, Marvel has created an
                interconnected universe spanning thousands of comics and dozens of film adaptations.
              </p>
              <div className="publisher-highlights">
                <h4>Notable Series:</h4>
                <ul>
                  <li>The Avengers</li>
                  <li>X-Men</li>
                  <li>Spider-Man</li>
                </ul>
              </div>
              <Link to="/comics/publishers/marvel" className="publisher-link">Explore Marvel Universe →</Link>
            </div>

            <div className="publisher-card">
              <h3>DC Comics</h3>
              <p>
                Creator of Superman, Batman, and Wonder Woman, DC Comics has built a legacy of legendary
                characters and groundbreaking storytelling since the 1930s.
              </p>
              <div className="publisher-highlights">
                <h4>Notable Series:</h4>
                <ul>
                  <li>Justice League</li>
                  <li>Batman</li>
                  <li>Superman</li>
                </ul>
              </div>
              <Link to="/comics/publishers/dc" className="publisher-link">Explore DC Universe →</Link>
            </div>

            <div className="publisher-card">
              <h3>Image Comics</h3>
              <p>
                Founded by artists who left Marvel to create creator-owned works, Image has become a
                powerhouse for innovative, independent comics.
              </p>
              <div className="publisher-highlights">
                <h4>Notable Series:</h4>
                <ul>
                  <li>The Walking Dead</li>
                  <li>Saga</li>
                  <li>Invincible</li>
                </ul>
              </div>
              <Link to="/comics/publishers/image" className="publisher-link">Explore Image Comics →</Link>
            </div>

            <div className="publisher-card">
              <h3>Independent Publishers</h3>
              <p>
                Beyond the major publishers, a vibrant ecosystem of independent and small press publishers
                creates diverse, boundary-pushing comics.
              </p>
              <div className="publisher-highlights">
                <h4>Notable Publishers:</h4>
                <ul>
                  <li>Dark Horse Comics</li>
                  <li>IDW Publishing</li>
                  <li>BOOM! Studios</li>
                </ul>
              </div>
              <Link to="/comics/publishers/independent" className="publisher-link">Explore Indie Comics →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Iconic Characters Section */}
      <section className="section-content">
        <div className="container">
          <h2>Iconic Characters</h2>
          <p>
            Comics have created some of the most recognizable and enduring characters in popular culture.
            These heroes, villains, and supporting characters have transcended their comic book origins to
            become cultural icons.
          </p>

          <div className="characters-showcase">
            <div className="character-category">
              <h3>Superheroes</h3>
              <div className="character-list">
                <div className="character-item">
                  <div className="character-image placeholder">
                    <span>Batman</span>
                  </div>
                  <h4>Batman</h4>
                  <p>The Dark Knight of Gotham City</p>
                </div>

                <div className="character-item">
                  <div className="character-image placeholder">
                    <span>Spider-Man</span>
                  </div>
                  <h4>Spider-Man</h4>
                  <p>Your friendly neighborhood hero</p>
                </div>

                <div className="character-item">
                  <div className="character-image placeholder">
                    <span>Wonder Woman</span>
                  </div>
                  <h4>Wonder Woman</h4>
                  <p>Amazon warrior princess</p>
                </div>
              </div>
            </div>

            <div className="character-category">
              <h3>Villains</h3>
              <div className="character-list">
                <div className="character-item">
                  <div className="character-image placeholder">
                    <span>Joker</span>
                  </div>
                  <h4>The Joker</h4>
                  <p>Batman's chaotic nemesis</p>
                </div>

                <div className="character-item">
                  <div className="character-image placeholder">
                    <span>Thanos</span>
                  </div>
                  <h4>Thanos</h4>
                  <p>The Mad Titan</p>
                </div>

                <div className="character-item">
                  <div className="character-image placeholder">
                    <span>Magneto</span>
                  </div>
                  <h4>Magneto</h4>
                  <p>Master of magnetism</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cta-link">
            <Link to="/comics/characters">Explore All Comic Characters →</Link>
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

export default ComicsPage;
