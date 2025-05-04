import React, { useState } from 'react';
import '../../../components/ui/CommunityPage.css';

const CommunityPage: React.FC = () => {
  // State for active filter dropdowns
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Toggle dropdown visibility
  const toggleDropdown = (dropdownId: string) => {
    if (activeDropdown === dropdownId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownId);
    }
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.filter-group')) {
      setActiveDropdown(null);
    }
  };

  return (
    <div className="community-page" onClick={handleClickOutside}>
      <div id="app-container">
        <header className="main-header">
          <div className="search-group">
            <input
              type="search"
              id="site-search-bar"
              aria-label="Search Site Wide"
              placeholder="Search for Characters, Universes, etc."
            />
            <div className="filter-buttons">
              {/* Post Type Filter */}
              <div className="filter-group">
                <button 
                  className={`filter-btn ${activeDropdown === 'post-type' ? 'active' : ''}`}
                  onClick={() => toggleDropdown('post-type')}
                >
                  Post type
                </button>
                <div className={`filter-dropdown ${activeDropdown === 'post-type' ? 'active' : ''}`}>
                  <ul>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="category" value="creators" />
                        <span className="custom-checkbox"></span>
                        <button>Creators</button>
                      </label>
                      <span className="category-count">245</span>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="category" value="fan-art" />
                        <span className="custom-checkbox"></span>
                        <button>Fan Art</button>
                      </label>
                      <span className="category-count">189</span>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="category" value="fan-fiction" />
                        <span className="custom-checkbox"></span>
                        <button>Fan Fiction</button>
                      </label>
                      <span className="category-count">76</span>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="category" value="world-building" />
                        <span className="custom-checkbox"></span>
                        <button>World Building</button>
                      </label>
                      <span className="category-count">112</span>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="category" value="character-spinoffs" />
                        <span className="custom-checkbox"></span>
                        <button>Character Spin-offs</button>
                      </label>
                      <span className="category-count">93</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Genre Filter */}
              <div className="filter-group">
                <button 
                  className={`filter-btn ${activeDropdown === 'genre' ? 'active' : ''}`}
                  onClick={() => toggleDropdown('genre')}
                >
                  Filter genre
                </button>
                <div className={`filter-dropdown ${activeDropdown === 'genre' ? 'active' : ''}`}>
                  <ul>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="genre" value="comedy" />
                        <span className="custom-checkbox"></span>
                        <button>Comedy</button>
                      </label>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="genre" value="horror" />
                        <span className="custom-checkbox"></span>
                        <button>Horror</button>
                      </label>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="genre" value="drama" />
                        <span className="custom-checkbox"></span>
                        <button>Drama</button>
                      </label>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="genre" value="romance" />
                        <span className="custom-checkbox"></span>
                        <button>Romance</button>
                      </label>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="genre" value="action" />
                        <span className="custom-checkbox"></span>
                        <button>Action</button>
                      </label>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="genre" value="adventure" />
                        <span className="custom-checkbox"></span>
                        <button>Adventure</button>
                      </label>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="genre" value="fantasy" />
                        <span className="custom-checkbox"></span>
                        <button>Fantasy</button>
                      </label>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="genre" value="sci-fi" />
                        <span className="custom-checkbox"></span>
                        <button>Science Fiction</button>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sort By Filter */}
              <div className="filter-group">
                <button 
                  className={`filter-btn ${activeDropdown === 'sort-by' ? 'active' : ''}`}
                  onClick={() => toggleDropdown('sort-by')}
                >
                  Sort By
                </button>
                <div className={`filter-dropdown ${activeDropdown === 'sort-by' ? 'active' : ''}`}>
                  <ul>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="sort" value="new-to-old" />
                        <span className="custom-checkbox"></span>
                        <button>New to Old</button>
                      </label>
                      <span className="category-count">245</span>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="sort" value="old-to-new" />
                        <span className="custom-checkbox"></span>
                        <button>Old to New</button>
                      </label>
                      <span className="category-count">189</span>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="sort" value="most-liked" />
                        <span className="custom-checkbox"></span>
                        <button>Most Liked</button>
                      </label>
                      <span className="category-count">76</span>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="sort" value="shortest-to-longest" />
                        <span className="custom-checkbox"></span>
                        <button>Shortest to Longest</button>
                      </label>
                      <span className="category-count">112</span>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="sort" value="longest-to-shortest" />
                        <span className="custom-checkbox"></span>
                        <button>Longest to Shortest</button>
                      </label>
                      <span className="category-count">93</span>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="sort" value="completed-works" />
                        <span className="custom-checkbox"></span>
                        <button>Completed Works</button>
                      </label>
                      <span className="category-count">93</span>
                    </li>
                    <li>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" name="sort" value="unfinished-work" />
                        <span className="custom-checkbox"></span>
                        <button>Unfinished Work</button>
                      </label>
                      <span className="category-count">93</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="community-feed">
          <div className="posts-container">
            {/* Post Card 1 */}
            <article className="post-card">
              <div className="post-card-header">
                <div className="post-author-mini">
                  <img src="/placeholder-avatar.jpg" alt="Author Profile" />
                  <div className="author-info">
                    <span className="author-name">CreativeUsername</span>
                    <span className="post-timestamp">2h ago</span>
                  </div>
                </div>
                <div className="post-category-tag">
                  Anime
                </div>
              </div>
              <div className="post-content">
                <h2 className="post-title">Incredible Character Design Concept</h2>
                <div className="post-media">
                  <img src="/Post-test.jpg" alt="Character Design" />
                </div>
                <p className="post-description">
                  Just finished this character design for my upcoming manga
                  project. Inspired by classic 90s anime aesthetics with a
                  modern twist!
                </p>
              </div>

              <div className="post-interactions">
                <div className="interaction-group">
                  <button className="like-btn">👍 256</button>
                  <button className="comment-btn">💬 42</button>
                  <button className="share-btn">🔗 Share</button>
                </div>
                <div className="save-btn">
                  <button>💾 Save</button>
                </div>
              </div>
            </article>

            {/* Post Card 2 */}
            <article className="post-card">
              <div className="post-card-header">
                <div className="post-author-mini">
                  <img src="/placeholder-avatar.jpg" alt="Author Profile" />
                  <div className="author-info">
                    <span className="author-name">MangaEnthusiast</span>
                    <span className="post-timestamp">5h ago</span>
                  </div>
                </div>
                <div className="post-category-tag">
                  Manga
                </div>
              </div>
              <div className="post-content">
                <h2 className="post-title">My Fan Theory About the Latest Chapter</h2>
                <p className="post-description">
                  After reading the latest chapter of One Piece, I have a theory about what might happen next.
                  I think Luffy's new power-up is actually connected to an ancient prophecy that was hinted at
                  in chapter 287. Here's why...
                </p>
              </div>

              <div className="post-interactions">
                <div className="interaction-group">
                  <button className="like-btn">👍 128</button>
                  <button className="comment-btn">💬 37</button>
                  <button className="share-btn">🔗 Share</button>
                </div>
                <div className="save-btn">
                  <button>💾 Save</button>
                </div>
              </div>
            </article>

            {/* Post Card 3 */}
            <article className="post-card">
              <div className="post-card-header">
                <div className="post-author-mini">
                  <img src="/placeholder-avatar.jpg" alt="Author Profile" />
                  <div className="author-info">
                    <span className="author-name">ComicBookFan</span>
                    <span className="post-timestamp">1d ago</span>
                  </div>
                </div>
                <div className="post-category-tag">
                  Comics
                </div>
              </div>
              <div className="post-content">
                <h2 className="post-title">Fan Art: Spider-Man in My Style</h2>
                <div className="post-media">
                  <img src="/placeholder-avatar.jpg" alt="Spider-Man Fan Art" />
                </div>
                <p className="post-description">
                  I've been working on developing my own art style, and decided to draw
                  Spider-Man as practice. Let me know what you think!
                </p>
              </div>

              <div className="post-interactions">
                <div className="interaction-group">
                  <button className="like-btn">👍 342</button>
                  <button className="comment-btn">💬 58</button>
                  <button className="share-btn">🔗 Share</button>
                </div>
                <div className="save-btn">
                  <button>💾 Save</button>
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;
