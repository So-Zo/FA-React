import React, { useState } from "react";
import { PostType, SortOption } from "../../../types";
import { usePosts } from "./hooks/usePosts";
import { PostCard } from "../../../shared/Components/PostCard";
import { ReportModal } from "../../../shared/Components/ReportModal";
import { useSearch } from "../../../shared/hooks/useSearch";
import { useReporting } from "../../../shared/hooks/useReporting";

const CommunityPage: React.FC = () => {
  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(
    null
  );
  const [selectedSort, setSelectedSort] = useState<SortOption>("latest");

  // Use the shared search hook
  const { searchQuery, debouncedSearchQuery, setSearchQuery, isTyping } =
    useSearch();

  // Use the reporting hook
  const { submitReport } = useReporting();

  const { posts, loading, error, toggleLike } = usePosts({
    postType: selectedPostType || undefined,
    sort: selectedSort,
    searchQuery: debouncedSearchQuery || undefined, // Use debounced version!
  });

  // State for active filter dropdowns
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Report Modal State
  const [reportModal, setReportModal] = useState<{
    isOpen: boolean;
    postId: string;
    postAuthor: string;
  }>({
    isOpen: false,
    postId: "",
    postAuthor: "",
  });

  // Handle opening report modal for specific post
  const handleOpenReport = (postId: string, postAuthor: string) => {
    setReportModal({
      isOpen: true,
      postId,
      postAuthor,
    });
  };

  // Handle closing report modal
  const handleCloseReport = () => {
    setReportModal({
      isOpen: false,
      postId: "",
      postAuthor: "",
    });
  };

  // Handle report submission
  const handleReportSubmit = async (reason: string, description?: string) => {
    try {
      const result = await submitReport({
        reported_user_id:
          posts.find((p) => p.id === reportModal.postId)?.author?.id || "",
        post_id: reportModal.postId,
        reason,
        description,
      });

      return {
        success: true,
        isDuplicate: false,
        data: result.data,
      };
    } catch (error) {
      // Handle duplicate reports and other errors
      if (error instanceof Error) {
        if (error.message.includes("already reported")) {
          return {
            success: false,
            isDuplicate: true,
            error: error.message,
          };
        } else {
          return {
            success: false,
            isDuplicate: false,
            error: error.message,
          };
        }
      }

      return {
        success: false,
        isDuplicate: false,
        error: "Failed to submit report. Please try again.",
      };
    }
  };

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

  const renderContent = () => {
    return (
      <div className="post-feed">
        <div className="post-feed-grid">
          {loading ? (
            <div className="post-feed-loading">Loading posts...</div>
          ) : error ? (
            <div className="post-feed-error">Error: {error}</div>
          ) : posts.length === 0 ? (
            <div className="post-feed-empty">No posts found</div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onToggleLike={toggleLike}
                onReport={handleOpenReport}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="community-page" onClick={handleClickOutside}>
      <section className="community-page-content">
        <header className="main-header">
          <h1>Community</h1>
          <div className="search-group">
            <input
              type="text"
              placeholder={`Search posts...${isTyping ? " (typing...)" : ""}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
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
                    {(
                      [
                        "discussion",
                        "fan-art",
                        "theory",
                        "fan-fiction",
                        "world-building",
                        "feedback",
                        "review",
                        "news",
                        "meme",
                        "cosplay",
                      ] as PostType[]
                    ).map((type) => (
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
                            {type
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </button>
                        </label>
                      </li>
                    ))}
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

              {/* Sort By Filter */}
              <div className="filter-group">
                <button
                  className={`filter-btn ${
                    activeDropdown === "sort-by" ? "active" : ""
                  }`}
                  onClick={() => toggleDropdown("sort-by")}
                >
                  Sort By:{" "}
                  {selectedSort
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
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

        <main className="community-feed">{renderContent()}</main>
      </section>

      {/* Report Modal - Single instance for entire page */}
      <ReportModal
        isOpen={reportModal.isOpen}
        onClose={handleCloseReport}
        postId={reportModal.postId}
        postAuthor={reportModal.postAuthor}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
};

export default CommunityPage;
