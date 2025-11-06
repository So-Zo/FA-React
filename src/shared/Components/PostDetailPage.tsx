import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { Post } from "../../components/pages/Community/hooks/usePosts";
import { UserPost } from "../../components/pages/Profile/types";
import { useComments } from "../hooks/useComments";
import UserComm from "./UserComm";
import CommentInput from "./CommentInput";
import "../Css/PostDetailPage.css";

interface PostDetailPageProps {}

// Define a union type for the post that could come from either context
type DetailPost = Post | UserPost;

export const PostDetailPage: React.FC<PostDetailPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState<DetailPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const commentsRef = useRef<HTMLElement>(null);

  // Initialize comments hook
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    submitting,
    createComment,
    deleteComment,
  } = useComments({ postId: id || "" });

  // Check if we should auto-scroll to comments
  const shouldAutoScrollToComments = location.state?.scrollToComments;

  useEffect(() => {
    if (!id) {
      setError("No post ID provided");
      setLoading(false);
      return;
    }

    fetchPost(id);
  }, [id]);

  // Auto-scroll to comments if requested
  useEffect(() => {
    if (
      shouldAutoScrollToComments &&
      commentsRef.current &&
      !loading &&
      !commentsLoading
    ) {
      setTimeout(() => {
        commentsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Focus on comment input if it exists
        const commentInput = commentsRef.current?.querySelector(
          ".comment-input-textarea"
        ) as HTMLTextAreaElement;
        if (commentInput) {
          commentInput.focus();
        }
      }, 100);
    }
  }, [shouldAutoScrollToComments, loading, commentsLoading]);

  const handleCommentButtonClick = () => {
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Focus on comment input
      setTimeout(() => {
        const commentInput = commentsRef.current?.querySelector(
          ".comment-input-textarea"
        ) as HTMLTextAreaElement;
        if (commentInput) {
          commentInput.focus();
        }
      }, 500);
    }
  };

  useEffect(() => {
    if (!id) {
      setError("No post ID provided");
      setLoading(false);
      return;
    }

    fetchPost(id);
  }, [id]);

  const fetchPost = async (postId: string) => {
    try {
      setLoading(true);
      setError(null);

      // Query the posts table directly with joined user profile data
      // This ensures we always get the post data regardless of comments
      const { data, error: fetchError } = await supabase
        .from("posts")
        .select(
          `
          id,
          created_at,
          title,
          content,
          post_type,
          medium,
          genre,
          tags,
          user_profile_id,
          media_ids,
          hashtags,
          mentions,
          visibility,
          location,
          updated_at,
          user_profiles!posts_user_profile_id_fkey (
            id,
            display_name,
            username,
            avatar_url,
            is_verified
          )
        `
        )
        .eq("id", postId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      if (!data) {
        throw new Error("Post not found");
      }

      // Get likes and comments count separately
      const [likesResult, commentsResult] = await Promise.all([
        supabase
          .from("likes")
          .select("id", { count: "exact" })
          .eq("post_id", postId),
        supabase
          .from("comments")
          .select("id", { count: "exact" })
          .eq("post_id", postId),
      ]);

      // Transform the data to match our Post interface
      const transformedPost: DetailPost = {
        id: data.id,
        created_at: data.created_at,
        title: data.title,
        content: data.content,
        post_type: data.post_type,
        medium: data.medium,
        genre: data.genre,
        tags: data.tags,
        user_profile_id: data.user_profile_id,
        media_ids: data.media_ids,
        hashtags: data.hashtags,
        mentions: data.mentions,
        visibility: data.visibility,
        location: data.location,
        updated_at: data.updated_at,
        likes_count: likesResult.count || 0,
        comments_count: commentsResult.count || 0,
        author: {
          id: data.user_profiles[0]?.id || "",
          display_name: data.user_profiles[0]?.display_name || "Unknown User",
          username: data.user_profiles[0]?.username || "unknown",
          avatar_url:
            data.user_profiles[0]?.avatar_url || "/placeholder-avatar.jpg",
          is_verified: data.user_profiles[0]?.is_verified || false,
        },
      };

      setPost(transformedPost);
    } catch (err) {
      console.error("Error fetching post:", err);
      setError(err instanceof Error ? err.message : "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    // Try to go back in history, but fallback to community if no history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/community");
    }
  };

  if (loading) {
    return (
      <div className="post-detail-page">
        <div className="post-detail-container">
          <div className="loading-state">Loading post...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-detail-page">
        <div className="post-detail-container">
          <div className="error-state">
            <h2>Post Not Found</h2>
            <p>{error || "The post you're looking for doesn't exist."}</p>
            <button className="btn btn-primary" onClick={handleBack}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-page">
      <div className="post-detail-container">
        {/* Back Navigation */}
        <div className="post-detail-nav">
          <button className="btn btn-outline back-btn" onClick={handleBack}>
            ← Back to Feed
          </button>
        </div>

        {/* Post Content */}
        <article className="post-detail-card">
          {/* Post Header */}
          <header className="post-detail-header">
            <div className="post-author-info">
              <img
                src={post.author?.avatar_url || "/placeholder-avatar.jpg"}
                alt={`${post.author?.display_name}'s avatar`}
                className="author-avatar"
              />
              <div className="author-details">
                <h3 className="author-name">
                  {post.author?.display_name}
                  {post.author?.is_verified && (
                    <span className="verified-badge">✓</span>
                  )}
                </h3>
                <div className="post-metadata">
                  <span className="post-date">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="post-medium">{post.medium}</span>
                  {post.genre && (
                    <span className="post-genre">{post.genre}</span>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Post Body */}
          <div className="post-detail-body">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-content">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Media Content */}
            {"media" in post && post.media && post.media.length > 0 && (
              <div className="post-media">
                {post.media.map((mediaItem, index) => (
                  <div key={index} className="media-item">
                    <img
                      src={`/storage/${mediaItem.storage_path}`}
                      alt={mediaItem.alt_text || `Media for ${post.title}`}
                      className="post-image"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            {"tags" in post && post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag: string, index: number) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Post Interactions */}
          <footer className="post-detail-footer">
            <div className="post-interactions">
              <div className="interaction-group">
                <button className="action-btn like-btn">
                  <span className="icon">❤️</span>
                  <span className="count">{post.likes_count || 0}</span>
                </button>
                <button
                  className="action-btn comment-btn"
                  onClick={handleCommentButtonClick}
                >
                  <span className="icon">💬</span>
                  <span className="count">{post.comments_count || 0}</span>
                </button>
                <button className="action-btn share-btn">
                  <span className="icon">🔗</span>
                  <span className="label">Share</span>
                </button>
              </div>
            </div>
          </footer>
        </article>

        {/* Comments Section */}
        <section ref={commentsRef} className="comments-section" id="comments">
          <h3>Comments ({comments.length})</h3>

          {/* Comment Input */}
          <CommentInput
            onSubmit={createComment}
            submitting={submitting}
            autoFocus={shouldAutoScrollToComments}
            placeholder="Share your thoughts..."
          />

          {/* Comments List */}
          <div className="comments-list">
            {commentsLoading ? (
              <div className="comments-loading">Loading comments...</div>
            ) : commentsError ? (
              <div className="comments-error">
                Error loading comments: {commentsError}
              </div>
            ) : comments.length === 0 ? (
              <div className="comments-empty">
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <UserComm
                  key={comment.id}
                  comment={comment}
                  onDelete={deleteComment}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetailPage;
