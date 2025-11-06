import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

interface CommentInputProps {
  onSubmit: (content: string) => Promise<void>;
  submitting?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  submitting = false,
  autoFocus = false,
  placeholder = "Write a comment...",
}) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();

  // Auto-focus and auto-resize textarea
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to comment");
      return;
    }

    if (!content.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      setError(null);
      await onSubmit(content.trim());
      setContent(""); // Clear the form on success
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post comment");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Ctrl+Enter (PC) or Cmd+Enter (Mac)
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!user) {
    return (
      <div className="comment-input-wrapper">
        <div className="comment-login-prompt">
          <p>Please log in to join the conversation.</p>
          <a href="/login" className="btn btn-primary">
            Log In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="comment-input-wrapper">
      <form onSubmit={handleSubmit} className="comment-input-form">
        <div className="comment-input-header">
          <img
            src={user.user_metadata?.avatar_url || "/placeholder-avatar.jpg"}
            alt="Your avatar"
            className="comment-input-avatar"
          />
          <div className="comment-input-info">
            <span className="comment-input-name">
              {user.user_metadata?.display_name || user.email}
            </span>
          </div>
        </div>

        <div className="comment-input-body">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="comment-input-textarea"
            rows={3}
            disabled={submitting}
            maxLength={2000}
          />

          {error && <div className="comment-input-error">{error}</div>}

          <div className="comment-input-footer">
            <div className="comment-input-hint">
              <small>
                Press Ctrl+Enter to submit • {2000 - content.length} characters
                remaining
              </small>
            </div>
            <div className="comment-input-actions">
              {content.trim() && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setContent("")}
                  disabled={submitting}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting || !content.trim()}
              >
                {submitting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
