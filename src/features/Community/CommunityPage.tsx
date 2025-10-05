import React, { useState } from "react";
import { PostType, SortOption, usePosts } from "./hooks/usePosts";
import "../../ui/LoadingStates.css";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";

const CommunityPage: React.FC = () => {
  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(
    null
  );
  const [selectedSort, setSelectedSort] = useState<SortOption>("latest");

  const { posts, loading, error, toggleLike } = usePosts({
    postType: selectedPostType || undefined,
    sort: selectedSort,
  });

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
    if (!target.closest(".filter-group")) {
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
                  className={`filter-btn ${
                    activeDropdown === "post-type" ? "active" : ""
                  }`}
                  onClick={() => toggleDropdown("post-type")}
                >
                  Post type
                </button>
                <div
                  className={`filter-dropdown ${
                    activeDropdown === "post-type" ? "active" : ""
                  }`}
                >
                  <ul>
                    {(["discussion", "feedback", "misc"] as PostType[]).map(
                      (type) => (
                        <li key={type}>
                          <label className="checkbox-wrapper">
                            <input
                              type="radio"
                              name="post-type"
                              value={type}
                              checked={selectedPostType === type}
                              onChange={() => setSelectedPostType(type)}
                            />
                            <span className="custom-checkbox"></span>
                            <button onClick={() => setSelectedPostType(type)}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                          </label>
                        </li>
                      )
                    )}
                    {selectedPostType && (
                      <li>
                        <button
                          className="clear-filter"
                          onClick={() => setSelectedPostType(null)}
                        >
                          Show All
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Genre Filter */}
              <div className="filter-group">
                <button
                  className={`filter-btn ${
                    activeDropdown === "genre" ? "active" : ""
                  }`}
                  onClick={() => toggleDropdown("genre")}
                >
                  Filter genre
                </button>
                <div
                  className={`filter-dropdown ${
                    activeDropdown === "genre" ? "active" : ""
                  }`}
                >
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
                  className={`filter-btn ${
                    activeDropdown === "sort-by" ? "active" : ""
                  }`}
                  onClick={() => toggleDropdown("sort-by")}
                >
                  Sort By:{" "}
                  {selectedSort.charAt(0).toUpperCase() + selectedSort.slice(1)}
                </button>
                <div
                  className={`filter-dropdown ${
                    activeDropdown === "sort-by" ? "active" : ""
                  }`}
                >
                  <ul>
                    {(
                      [
                        "latest",
                        "trending",
                        "top",
                        "most_commented",
                        "most_liked",
                      ] as SortOption[]
                    ).map((sort) => (
                      <li key={sort}>
                        <label className="checkbox-wrapper">
                          <input
                            type="radio"
                            name="sort"
                            value={sort}
                            checked={selectedSort === sort}
                            onChange={() => setSelectedSort(sort)}
                          />
                          <span className="custom-checkbox"></span>
                          <button onClick={() => setSelectedSort(sort)}>
                            {sort
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </button>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="community-feed">
          <div className="posts-container">
            {loading ? (
              <div className="loading-state">Loading posts...</div>
            ) : error ? (
              <div className="error-state">Error: {error}</div>
            ) : posts.length === 0 ? (
              <div className="empty-state">No posts found</div>
            ) : (
              posts.map((post) => (
                <article key={post.id} className="post-card">
                  <div className="post-card-header">
                    <div className="post-author-mini">
                      <img
                        src={
                          post.author?.avatar_url || "/placeholder-avatar.jpg"
                        }
                        alt={`${post.author?.display_name}'s Profile`}
                      />
                      <div className="author-info">
                        <span className="author-name">
                          {post.author?.display_name || "Anonymous"}
                        </span>
                        <span className="post-timestamp">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="post-content">
                    <h2 className="post-title">{post.title}</h2>
                    {post.media_ids?.[0] && (
                      <div className="post-media">
                        <img
                          src={post.media_ids[0]}
                          alt={`Media for ${post.title}`}
                        />
                      </div>
                    )}
                    <p className="post-description">{post.content}</p>
                  </div>

                  <div className="post-interactions">
                    <div className="interaction-group">
                      <button
                        className={`action-btn ${
                          post.isLikedByUser ? "liked" : ""
                        }`}
                        onClick={() => toggleLike(post.id)}
                      >
                        {post.isLikedByUser ? (
                          <AiFillHeart className="action-icon" />
                        ) : (
                          <AiOutlineHeart className="action-icon" />
                        )}{" "}
                        {post.likes_count || 0}
                      </button>
                      <button className="action-btn">
                        <AiOutlineComment className="action-icon" />{" "}
                        {post.comments_count || 0}
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;
