import React from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../../types";
import { UserPost } from "../../components/pages/Profile/types";
import { useAuth } from "../hooks/useAuth";

// We can accept either a Community Post or Profile UserPost
type PostCardProps = {
  post: Post | UserPost;
  onToggleLike?: (postId: string) => void;
  onReport?: (postId: string, postAuthor: string) => void;
  isPreview?: boolean; // New prop to control preview mode
};

// Utility function to truncate content
const truncateContent = (content: string, maxLength: number = 150): string => {
  if (content.length <= maxLength) return content;

  // Find the last space before the max length to avoid cutting words
  const truncated = content.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + "...";
  }

  return truncated + "...";
};

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onToggleLike,
  onReport,
  isPreview = true,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest(".action-btn") || target.closest("button")) {
      return;
    }

    // Navigate to post detail page
    navigate(`/post/${post.id}`);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (onToggleLike) {
      onToggleLike(post.id);
    }
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    // Navigate to post detail page with auto-scroll to comments
    navigate(`/post/${post.id}`, {
      state: { scrollToComments: true },
    });
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click

    // Don't navigate to your own profile
    if (user && post.author?.id === user.id) {
      return;
    }

    // Navigate to user's profile page
    if (post.author?.id) {
      navigate(`/user/${post.author.id}`);
    }
  };

  const handleReportClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onReport?.(post.id, post.author?.display_name || "Unknown User");
  };
  return (
    <div
      className={`grid-card ${isPreview ? "clickable-card" : ""}`}
      onClick={isPreview ? handleCardClick : undefined}
      style={{ cursor: isPreview ? "pointer" : "default" }}
    >
      <div className="grid-block">
        <div className="card-header">
          <div className="user-info">
            <img
              src={post.author?.avatar_url || "/placeholder-avatar.jpg"}
              alt={`${post.author?.display_name}'s avatar`}
              className={`user-avatar ${
                user && post.author?.id !== user.id ? "clickable-avatar" : ""
              }`}
              onClick={handleUserClick}
              style={{
                cursor:
                  user && post.author?.id !== user.id ? "pointer" : "default",
              }}
            />
            <div>
              <h3
                className={`${
                  user && post.author?.id !== user.id
                    ? "clickable-username"
                    : ""
                }`}
                onClick={handleUserClick}
                style={{
                  cursor:
                    user && post.author?.id !== user.id ? "pointer" : "default",
                }}
              >
                {post.author?.display_name}
              </h3>
              <span className="timestamp">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <span className="category-tag">{post.medium}</span>
        </div>
        <div className="content">
          <h4>{post.title}</h4>
          <p>{isPreview ? truncateContent(post.content) : post.content}</p>
          {"media" in post && post.media && post.media.length > 0 && (
            <div className="media-container">
              <img
                src={`/storage/${post.media[0].storage_path}`}
                alt={post.media[0].alt_text || `Media for ${post.title}`}
                className="post-image"
              />
            </div>
          )}
          <div className="post-interactions">
            <div className="interaction-group">
              {onToggleLike ? (
                <button
                  className={`action-btn ${
                    "isLikedByUser" in post && post.isLikedByUser ? "liked" : ""
                  }`}
                  onClick={handleLikeClick}
                >
                  {"isLikedByUser" in post && post.isLikedByUser ? "❤️" : "🤍"}{" "}
                  {post.likes_count || 0}
                </button>
              ) : (
                <span className="action-btn">❤️ {post.likes_count || 0}</span>
              )}
              <button
                className="action-btn comment-btn"
                onClick={handleCommentClick}
                title="View comments"
              >
                💬 {post.comments_count || 0}
              </button>
              {/* Report button - only show for other users' posts */}
              {user && user.id !== post.author?.id && (
                <button
                  className="action-btn report-btn"
                  onClick={handleReportClick}
                  title="Report this post"
                >
                  🚩
                </button>
              )}
              {isPreview && (
                <span className="read-more-hint">Click to read more →</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
