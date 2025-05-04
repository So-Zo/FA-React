import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/TVPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';

const TVPage: React.FC = () => {
  return (
    <div className="tv-page">
      {/* Introduction Section */}
      <section className="intro-section">
        <div className="container">
          <h2>Binge-Worthy Series & Cult Classics</h2>
          <p className="intro-text">
            Explore character development, plot analysis, and behind-the-scenes insights from your favorite TV productions.
            From sci-fi epics to gripping dramas, discover what makes these stories resonate with audiences worldwide.
          </p>

          <div className="quick-links">
            <Link to="/tv/directory" className="quick-link">
              <span className="icon">📺</span>
              <span className="text">TV Shows Directory</span>
            </Link>
            <Link to="/tv/history" className="quick-link">
              <span className="icon">🕰️</span>
              <span className="text">History of Television</span>
            </Link>
            <Link to="/community#tv-section" className="quick-link">
              <span className="icon">👥</span>
              <span className="text">Fan Discussions</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Golden Age Section */}
      <section className="golden-age-section">
        <div className="container">
          <h2>The Golden Age of Television</h2>
          <p>
            We're living in what many critics call the "Golden Age of Television," a period marked by unprecedented
            quality, diversity, and creative freedom in TV storytelling. This era has transformed television from a
            secondary medium to a premier form of artistic expression.
          </p>

          <div className="era-features">
            <div className="era-feature">
              <h3>Complex Storytelling</h3>
              <p>
                Modern TV embraces intricate, long-form narratives that unfold over multiple seasons,
                allowing for deeper character development and more nuanced themes than ever before.
              </p>
            </div>

            <div className="era-feature">
              <h3>Cinematic Production</h3>
              <p>
                The line between film and television has blurred, with TV productions now featuring
                film-quality cinematography, visual effects, and production design.
              </p>
            </div>

            <div className="era-feature">
              <h3>Creative Freedom</h3>
              <p>
                The rise of streaming platforms and premium cable has created space for bold, experimental
                storytelling less constrained by traditional network limitations.
              </p>
            </div>

            <div className="era-feature">
              <h3>Global Reach</h3>
              <p>
                International shows now regularly find worldwide audiences, creating a truly global television
                landscape that celebrates diverse perspectives and storytelling traditions.
              </p>
            </div>
          </div>

          <div className="landmark-shows">
            <h3>Landmark Shows That Defined the Era</h3>
            <div className="shows-grid">
              <div className="show-card">
                <div className="show-image placeholder">
                  <span>The Sopranos</span>
                </div>
                <div className="show-info">
                  <h4>The Sopranos (1999-2007)</h4>
                  <p>
                    Often credited with launching the Golden Age, this HBO drama about a mob boss in therapy
                    revolutionized television with its complex characters and cinematic style.
                  </p>
                </div>
              </div>

              <div className="show-card">
                <div className="show-image placeholder">
                  <span>Breaking Bad</span>
                </div>
                <div className="show-info">
                  <h4>Breaking Bad (2008-2013)</h4>
                  <p>
                    This critically acclaimed series about a chemistry teacher turned drug kingpin showcased
                    television's potential for transformative character arcs and visual storytelling.
                  </p>
                </div>
              </div>

              <div className="show-card">
                <div className="show-image placeholder">
                  <span>Game of Thrones</span>
                </div>
                <div className="show-info">
                  <h4>Game of Thrones (2011-2019)</h4>
                  <p>
                    This fantasy epic demonstrated television's ability to create immersive worlds on an
                    unprecedented scale, becoming a global cultural phenomenon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genres Section */}
      <section className="genres-section">
        <div className="container">
          <h2>Exploring TV Genres</h2>
          <p>
            Television encompasses a vast array of genres, each with its own conventions, iconic shows, and evolution
            over time. Explore the distinctive characteristics and landmark series across different TV genres:
          </p>

          <div className="genres-tabs">
            <div className="genre-tab active">
              <h3>Drama</h3>
              <div className="genre-content">
                <p>
                  Drama series focus on character development, emotional depth, and complex narratives.
                  From medical dramas to legal thrillers, this genre explores the human condition through
                  compelling storytelling and powerful performances.
                </p>
                <h4>Notable Examples:</h4>
                <ul className="examples-list">
                  <li>Mad Men</li>
                  <li>The Wire</li>
                  <li>This Is Us</li>
                  <li>The Crown</li>
                </ul>
                <Link to="/tv/genres/drama" className="genre-link">Explore Drama Series →</Link>
              </div>
            </div>

            <div className="genre-tab">
              <h3>Science Fiction</h3>
              <div className="genre-content">
                <p>
                  Science fiction TV explores speculative concepts, technological advancements, and alternate
                  realities. From space exploration to dystopian futures, sci-fi series examine humanity's
                  relationship with science, technology, and the unknown.
                </p>
                <h4>Notable Examples:</h4>
                <ul className="examples-list">
                  <li>Star Trek</li>
                  <li>The X-Files</li>
                  <li>Black Mirror</li>
                  <li>The Expanse</li>
                </ul>
                <Link to="/tv/genres/sci-fi" className="genre-link">Explore Sci-Fi Series →</Link>
              </div>
            </div>

            <div className="genre-tab">
              <h3>Comedy</h3>
              <div className="genre-content">
                <p>
                  Comedy series aim to entertain through humor, wit, and comedic situations. From sitcoms to
                  sketch shows, this genre has evolved from simple laugh-track formats to sophisticated
                  comedic storytelling that often tackles social issues.
                </p>
                <h4>Notable Examples:</h4>
                <ul className="examples-list">
                  <li>Friends</li>
                  <li>The Office</li>
                  <li>Atlanta</li>
                  <li>Schitt's Creek</li>
                </ul>
                <Link to="/tv/genres/comedy" className="genre-link">Explore Comedy Series →</Link>
              </div>
            </div>

            <div className="genre-tab">
              <h3>Fantasy</h3>
              <div className="genre-content">
                <p>
                  Fantasy TV transports viewers to magical worlds with supernatural elements, mythical creatures,
                  and extraordinary powers. These series often explore timeless themes through the lens of
                  fantastical storytelling.
                </p>
                <h4>Notable Examples:</h4>
                <ul className="examples-list">
                  <li>Game of Thrones</li>
                  <li>The Witcher</li>
                  <li>Supernatural</li>
                  <li>Shadow and Bone</li>
                </ul>
                <Link to="/tv/genres/fantasy" className="genre-link">Explore Fantasy Series →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Streaming Revolution Section */}
      <section className="streaming-section">
        <div className="container">
          <h2>The Streaming Revolution</h2>
          <p>
            The rise of streaming platforms has fundamentally transformed how television is produced, distributed,
            and consumed. This shift represents one of the most significant changes in the medium's history.
          </p>

          <div className="streaming-impact">
            <div className="impact-item">
              <h3>Binge-Watching Culture</h3>
              <p>
                The release of entire seasons at once has created a new viewing behavior, allowing audiences
                to consume stories at their own pace and changing how narratives are structured.
              </p>
            </div>

            <div className="impact-item">
              <h3>Content Explosion</h3>
              <p>
                Streaming platforms have dramatically increased the volume of original programming, creating
                more opportunities for diverse voices and niche content that might not find a home on traditional networks.
              </p>
            </div>

            <div className="impact-item">
              <h3>Global Accessibility</h3>
              <p>
                International shows now reach global audiences more easily, breaking down geographical barriers
                and introducing viewers to diverse storytelling traditions from around the world.
              </p>
            </div>

            <div className="impact-item">
              <h3>Algorithmic Curation</h3>
              <p>
                Recommendation algorithms have changed how viewers discover content, creating both opportunities
                for unexpected hits and challenges for shows that don't fit easily into established categories.
              </p>
            </div>
          </div>

          <div className="platform-comparison">
            <h3>Major Streaming Platforms</h3>
            <div className="platforms-grid">
              <div className="platform-card">
                <h4>Netflix</h4>
                <p>
                  The pioneer of streaming that transformed from a DVD rental service to a global content producer
                  with a vast library of original series across all genres.
                </p>
                <p><strong>Signature Shows:</strong> Stranger Things, The Crown, Bridgerton</p>
              </div>

              <div className="platform-card">
                <h4>HBO Max</h4>
                <p>
                  Building on HBO's legacy of premium content, this platform combines prestige television with
                  a broader range of entertainment options.
                </p>
                <p><strong>Signature Shows:</strong> Succession, Euphoria, The White Lotus</p>
              </div>

              <div className="platform-card">
                <h4>Disney+</h4>
                <p>
                  Leveraging iconic franchises like Marvel and Star Wars, Disney+ has quickly established itself
                  as a major player in the streaming landscape.
                </p>
                <p><strong>Signature Shows:</strong> The Mandalorian, WandaVision, Loki</p>
              </div>

              <div className="platform-card">
                <h4>Amazon Prime Video</h4>
                <p>
                  With substantial resources and global reach, Amazon has invested in high-profile adaptations
                  and original content across multiple genres.
                </p>
                <p><strong>Signature Shows:</strong> The Boys, The Marvelous Mrs. Maisel, The Lord of the Rings: The Rings of Power</p>
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

export default TVPage;
