import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/MangaPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';

const MangaPage: React.FC = () => {
  return (
    <div className="manga-page">
      {/* Introduction Section */}
      <section className="section-content">
        <div className="container">
          <h2>Discover the World of Manga</h2>
          <p>
            Manga are Japanese comics or graphic novels with a distinctive art style, typically published in black and white.
            With a rich history dating back to the 19th century, manga has evolved into a global phenomenon that influences
            art, storytelling, and popular culture worldwide.
          </p>

          <div className="quick-links">
            <Link to="/manga/directory" className="quick-link">
              <span className="icon">📚</span>
              <span className="text">Manga Directory</span>
            </Link>
            <Link to="/manga/history" className="quick-link">
              <span className="icon">🕰️</span>
              <span className="text">History of Manga</span>
            </Link>
            <Link to="/community#manga-section" className="quick-link">
              <span className="icon">👥</span>
              <span className="text">Fan Discussions</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="content-section">
        <div className="container">
          <h2>What Makes Manga Unique</h2>
          <div className="content-grid">
            <div className="content-text">
              <p>
                Manga differs from Western comics in several key ways, from its right-to-left reading format to its
                distinctive art style and storytelling techniques. Understanding these unique characteristics helps
                appreciate the art form's cultural significance and global appeal.
              </p>
              <h3>Key Features of Manga</h3>
              <ul className="feature-list">
                <li>
                  <strong>Reading Direction:</strong> Read right-to-left, following the traditional Japanese reading pattern
                </li>
                <li>
                  <strong>Art Style:</strong> Distinctive visual language with expressive eyes, simplified facial features, and dynamic action lines
                </li>
                <li>
                  <strong>Storytelling Pace:</strong> Often slower-paced than Western comics, with more panels dedicated to atmosphere and character moments
                </li>
                <li>
                  <strong>Publication Format:</strong> Typically serialized in thick anthology magazines before being collected into volumes
                </li>
                <li>
                  <strong>Genre Diversity:</strong> Encompasses virtually every genre imaginable, from action and romance to horror and slice-of-life
                </li>
              </ul>
            </div>
            <div className="content-image">
              {/* Placeholder for an image */}
              <div className="image-placeholder">
                <span>Manga Art Style Example</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Genres Section */}
      <section className="section-content">
        <div className="container">
          <h2>Popular Manga Genres</h2>
          <p>
            Manga encompasses a vast array of genres, each with its own conventions, themes, and target audiences.
            Here are some of the most popular manga genres that have captivated readers worldwide:
          </p>

          <div className="genres-grid">
            <div className="genre-card">
              <h3>Shonen</h3>
              <p>
                Targeted primarily at teenage boys, featuring action, adventure, and coming-of-age themes.
                Often includes tournaments, training arcs, and friendship themes.
              </p>
              <p><strong>Examples:</strong> One Piece, Naruto, My Hero Academia</p>
            </div>

            <div className="genre-card">
              <h3>Shojo</h3>
              <p>
                Aimed at teenage girls, often focusing on romance, relationships, and emotional growth.
                Features distinctive art styles with an emphasis on beauty and emotion.
              </p>
              <p><strong>Examples:</strong> Fruits Basket, Sailor Moon, Nana</p>
            </div>

            <div className="genre-card">
              <h3>Seinen</h3>
              <p>
                Created for adult men, featuring more complex themes, mature content, and realistic or
                philosophical storytelling. Often more experimental in art and narrative.
              </p>
              <p><strong>Examples:</strong> Berserk, Vagabond, Vinland Saga</p>
            </div>

            <div className="genre-card">
              <h3>Josei</h3>
              <p>
                Targeted at adult women, exploring mature relationships, career challenges, and adult life.
                More realistic than shojo, with nuanced character development.
              </p>
              <p><strong>Examples:</strong> Chihayafuru, Honey and Clover, Paradise Kiss</p>
            </div>
          </div>

          <div className="cta-link">
            <Link to="/manga/genres">Explore All Manga Genres →</Link>
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

export default MangaPage;
