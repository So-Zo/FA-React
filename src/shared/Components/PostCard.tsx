import React from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../../components/pages/Community/hooks/usePosts";
import { UserPost } from "../../components/pages/Profile/types";

// We can accept either a Community Post or Profile UserPost
type PostCardProps = {
  post: Post | UserPost;
  onToggleLike?: (postId: string) => void;
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
  isPreview = true,
}) => {
  const navigate = useNavigate();

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
              className="user-avatar"
            />
            <div>
              <h3>{post.author?.display_name}</h3>
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
