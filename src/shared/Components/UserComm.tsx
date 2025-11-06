import React from "react";
import { Comment } from "../hooks/useComments";
import { useAuth } from "../hooks/useAuth";
import { useProfileId } from "../utils/userUtils";

interface UserCommProps {
  comment: Comment;
  onDelete?: (commentId: string) => void;
}

export const UserComm: React.FC<UserCommProps> = ({ comment, onDelete }) => {
  const { user } = useAuth();
  const profileId = useProfileId(user);
  const canDelete = profileId && profileId === comment.user_profile_id;

  const handleDelete = () => {
    if (onDelete && canDelete) {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        onDelete(comment.id);
      }
    }
  };

  return (
    <div className="user-comm">
      <div className="user-comm-header">
        <div className="user-comm-author">
          <img
            src={comment.author.avatar_url || "/placeholder-avatar.jpg"}
            alt={`${comment.author.display_name}'s avatar`}
            className="user-comm-avatar"
          />
          <div className="user-comm-author-info">
            <h4 className="user-comm-author-name">
              {comment.author.display_name}
              {comment.author.is_verified && (
                <span className="verified-badge">✓</span>
              )}
            </h4>
            <span className="user-comm-timestamp">
              {new Date(comment.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        {canDelete && (
          <button
            className="user-comm-delete-btn"
            onClick={handleDelete}
            title="Delete comment"
          >
            ×
          </button>
        )}
      </div>
      <div className="user-comm-content">
        {comment.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default UserComm;
