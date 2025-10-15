import React from "react";
import { Post } from "../../components/pages/Community/hooks/usePosts";
import { UserPost } from "../../components/pages/Profile/types";

// We can accept either a Community Post or Profile UserPost
type PostCardProps = {
  post: Post | UserPost;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="grid-card">
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
          <p>{post.content}</p>
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
              <span className="action-btn">❤️ {post.likes_count || 0}</span>
              <span className="action-btn">💬 {post.comments_count || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
