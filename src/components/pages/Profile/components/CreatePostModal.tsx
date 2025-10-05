import React from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { useModal, useFileUpload, useProfileForms } from "../hooks";
import { useProfileContext } from "../ProfileContext";
import { Post } from "../types";
import { useAuth } from "../../../../hooks/useAuth";

interface CreatePostModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  onClose,
  isOpen,
}) => {
  const { user } = useAuth();
  const { refreshProfileData } = useProfileContext();
  const { handleModalClick } = useModal();
  const { mediaPreview, handleFileChange, clearPreview } = useFileUpload();
  const { formState, updatePostForm, resetPostForm } = useProfileForms();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create a post.");
      return;
    }

    try {
      const { title, content, post_type, medium, genre, tags, visibility } =
        formState.post;

      const { error } = await supabase.from("posts").insert([
        {
          author_id: user.id,
          title,
          content,
          post_type,
          medium,
          genre,
          tags,
          visibility,
          media_url: mediaPreview,
        },
      ]);

      if (error) throw error;

      // Reset form and refresh data
      resetPostForm();
      clearPreview();
      await refreshProfileData();
      onClose();
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post.");
    }
  };

  return (
    <div
      className={`modal${isOpen ? " active" : ""}`}
      onClick={handleModalClick}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button
            className="modal-close"
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form
            id="post-creation-form"
            className="form-container"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="post-title" className="form-label">
                Post Title
              </label>
              <input
                type="text"
                id="post-title"
                name="post-title"
                className="form-input"
                placeholder="Give your post a title"
                value={formState.post.title}
                onChange={(e) => updatePostForm({ title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="post-type" className="form-label">
                Post Type
              </label>
              <select
                id="post-type"
                name="post-type"
                className="form-select"
                value={formState.post.post_type}
                onChange={(e) =>
                  updatePostForm({
                    post_type: e.target.value as Post["post_type"],
                  })
                }
                required
              >
                <option value="" disabled>
                  Select a post type
                </option>
                <option value="discussion">Discussion</option>
                <option value="question">Question</option>
                <option value="fan-art">Fan Art</option>
                <option value="fan-fiction">Fan Fiction</option>
                <option value="world-building">World Building</option>
                <option value="feedback">Feedback</option>
                <option value="review">Review</option>
                <option value="theory">Theory</option>
                <option value="news">News</option>
                <option value="meme">Meme</option>
                <option value="cosplay">Cosplay</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="medium" className="form-label">
                Medium
              </label>
              <select
                id="medium"
                name="medium"
                className="form-select"
                value={formState.post.medium}
                onChange={(e) =>
                  updatePostForm({ medium: e.target.value as Post["medium"] })
                }
                required
              >
                <option value="" disabled>
                  Select a medium
                </option>
                <option value="anime">Anime</option>
                <option value="manga">Manga</option>
                <option value="comics">Comics</option>
                <option value="tv">TV</option>
                <option value="movies">Movies</option>
                <option value="games">Games</option>
                <option value="books">Books</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="genre" className="form-label">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                className="form-select"
                value={formState.post.genre}
                onChange={(e) =>
                  updatePostForm({ genre: e.target.value as Post["genre"] })
                }
                required
              >
                <option value="" disabled>
                  Select a genre
                </option>
                <option value="comedy">Comedy</option>
                <option value="horror">Horror</option>
                <option value="drama">Drama</option>
                <option value="romance">Romance</option>
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option value="fantasy">Fantasy</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="post-content" className="form-label">
                Post Content
              </label>
              <textarea
                id="post-content"
                name="post-content"
                className="form-textarea"
                rows={5}
                placeholder="Share your thoughts..."
                value={formState.post.content}
                onChange={(e) => updatePostForm({ content: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="post-media" className="form-label">
                Add Media (Optional)
              </label>
              <div className="media-upload-container">
                <input
                  type="file"
                  id="post-media"
                  className="media-upload-input"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label htmlFor="post-media" className="media-upload-label">
                  <span className="media-upload-icon">📷</span>
                  <span className="media-upload-text">
                    Click to upload image
                  </span>
                </label>
                <div
                  className={`media-preview${mediaPreview ? " has-image" : ""}`}
                >
                  {mediaPreview && (
                    <img src={mediaPreview} alt="Post media preview" />
                  )}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Post Visibility</label>
              <div className="form-radio">
                <input
                  type="radio"
                  id="visibility-public"
                  name="post-visibility"
                  value="public"
                  checked={formState.post.visibility === "public"}
                  onChange={(e) =>
                    updatePostForm({
                      visibility: e.target.value as Post["visibility"],
                    })
                  }
                />
                <label htmlFor="visibility-public">
                  Public - Anyone can see this post
                </label>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  id="visibility-followers"
                  name="post-visibility"
                  value="followers"
                  checked={formState.post.visibility === "followers"}
                  onChange={(e) =>
                    updatePostForm({
                      visibility: e.target.value as Post["visibility"],
                    })
                  }
                />
                <label htmlFor="visibility-followers">
                  Followers Only - Only your followers can see this post
                </label>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  id="visibility-private"
                  name="post-visibility"
                  value="private"
                  checked={formState.post.visibility === "private"}
                  onChange={(e) =>
                    updatePostForm({
                      visibility: e.target.value as Post["visibility"],
                    })
                  }
                />
                <label htmlFor="visibility-private">
                  Private - Only you can see this post
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline cancel-post-btn"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
