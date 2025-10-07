import React, { useState } from "react";
import { PostType, SortOption, usePosts } from "./hooks/usePosts";
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
    if (!target.closest(".filter-dropdown")) {
      setActiveDropdown(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="community-container" onClick={handleClickOutside}>
      <h1>Community</h1>

      <div className="filters-container">
        {/* Post Type Filter */}
        <div className="filter-dropdown">
          <button
            onClick={() => toggleDropdown("postType")}
            className={`filter-button ${
              activeDropdown === "postType" ? "active" : ""
            }`}
          >
            {selectedPostType || "All Types"}
          </button>
          {activeDropdown === "postType" && (
            <div className="dropdown-content">
              <div onClick={() => setSelectedPostType(null)}>All Types</div>
              <div onClick={() => setSelectedPostType("discussion")}>
                Discussion
              </div>
              <div onClick={() => setSelectedPostType("question")}>
                Question
              </div>
              <div onClick={() => setSelectedPostType("fan-art")}>Fan Art</div>
              <div onClick={() => setSelectedPostType("fan-fiction")}>
                Fan Fiction
              </div>
              <div onClick={() => setSelectedPostType("world-building")}>
                World Building
              </div>
              <div onClick={() => setSelectedPostType("feedback")}>
                Feedback
              </div>
              <div onClick={() => setSelectedPostType("review")}>Review</div>
              <div onClick={() => setSelectedPostType("theory")}>Theory</div>
              <div onClick={() => setSelectedPostType("news")}>News</div>
              <div onClick={() => setSelectedPostType("meme")}>Meme</div>
              <div onClick={() => setSelectedPostType("cosplay")}>Cosplay</div>
            </div>
          )}
        </div>

        {/* Sort Filter */}
        <div className="filter-dropdown">
          <button
            onClick={() => toggleDropdown("sort")}
            className={`filter-button ${
              activeDropdown === "sort" ? "active" : ""
            }`}
          >
            {selectedSort}
          </button>
          {activeDropdown === "sort" && (
            <div className="dropdown-content">
              <div onClick={() => setSelectedSort("latest")}>Latest</div>
              <div onClick={() => setSelectedSort("trending")}>Trending</div>
              <div onClick={() => setSelectedSort("top")}>Top</div>
              <div onClick={() => setSelectedSort("most_commented")}>
                Most Commented
              </div>
              <div onClick={() => setSelectedSort("most_liked")}>
                Most Liked
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {/* Author info */}
            <div className="post-header">
              <div className="author-info">
                <img
                  src={post.author?.avatar_url || "/default-avatar.png"}
                  alt={post.author?.display_name || "User"}
                  className="author-avatar"
                />
                <div className="author-details">
                  <span className="author-name">
                    {post.author?.display_name || "Anonymous"}
                  </span>
                  <span className="author-username">
                    @{post.author?.username || "anonymous"}
                  </span>
                </div>
              </div>
              <div className="post-meta">
                <span className="post-type">{post.post_type}</span>
                <span className="post-date">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Post content */}
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-text">{post.content}</p>
            </div>

            {/* Media grid */}
            {post.media && post.media.length > 0 && (
              <div
                className={`media-grid media-grid-${Math.min(
                  post.media.length,
                  4
                )}`}
              >
                {post.media.map((media) => (
                  <div key={media.id} className="media-item">
                    <img
                      src={`/storage/${media.storage_path}`}
                      alt={media.alt_text || "Post media"}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Post footer with engagement metrics */}
            <div className="post-footer">
              <button
                className="engagement-button"
                onClick={() => toggleLike(post.id)}
              >
                {post.isLikedByUser ? (
                  <AiFillHeart className="icon liked" />
                ) : (
                  <AiOutlineHeart className="icon" />
                )}
                <span>{post.likes_count}</span>
              </button>

              <button className="engagement-button">
                <AiOutlineComment className="icon" />
                <span>{post.comments_count}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
