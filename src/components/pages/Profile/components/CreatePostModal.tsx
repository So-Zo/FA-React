import React, { useState } from "react";
import { profileService } from "../services/profileService";
import { useModal, useFileUpload, useProfileForms } from "../hooks";
import { useProfileContext } from "../ProfileContext";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { PostType, Medium, Genre } from "../../Community/hooks/usePosts";

type PostVisibility = "public" | "private" | "followers";

interface CreatePostModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  onClose,
  isOpen,
}) => {
  const { user } = useAuth();
  const { createPost } = useProfileContext();
  const { handleModalClick } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle file upload to storage
  const handleFileUpload = async (file: File): Promise<string> => {
    if (!user) throw new Error("User not authenticated");

    // Generate a temporary post ID for storage path
    const tempPostId = `temp_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const result = await profileService.uploadPostMedia(
      user.id,
      tempPostId,
      file
    );
    return result.url;
  };

  const {
    mediaPreview,
    uploadedMediaId,
    isUploading,
    handleFileChange,
    clearPreview,
  } = useFileUpload({
    onUpload: handleFileUpload,
  });

  const { formState, updatePostForm, resetPostForm } = useProfileForms();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create a post.");
      return;
    }

    setIsSubmitting(true);

    try {
      const {
        postTitle,
        postContent,
        postType,
        postMedium,
        postGenre,
        postVisibility,
      } = formState.newPostForm;

      // Create post with uploaded media ID (if any)
      await createPost({
        author_id: user.id,
        title: postTitle,
        content: postContent,
        post_type: postType,
        medium: postMedium,
        genre: postGenre,
        visibility: postVisibility,
        media_ids: uploadedMediaId ? [uploadedMediaId] : [],
        // These fields will be computed by the database/view
        likes_count: 0,
        comments_count: 0,
        author: {
          id: user.id,
          display_name: "",
          avatar_url: "",
          is_verified: false,
        },
      });

      // Reset form and close modal
      resetPostForm();
      clearPreview();
      onClose();
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post.");
    } finally {
      setIsSubmitting(false);
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
                value={formState.newPostForm.postTitle}
                onChange={(e) => updatePostForm({ postTitle: e.target.value })}
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
                value={formState.newPostForm.postType}
                onChange={(e) =>
                  updatePostForm({
                    postType: e.target.value as PostType,
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
                value={formState.newPostForm.postMedium}
                onChange={(e) =>
                  updatePostForm({ postMedium: e.target.value as Medium })
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
                value={formState.newPostForm.postGenre}
                onChange={(e) =>
                  updatePostForm({ postGenre: e.target.value as Genre })
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
                value={formState.newPostForm.postContent}
                onChange={(e) =>
                  updatePostForm({ postContent: e.target.value })
                }
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
                  accept=".jpg,.jpeg,.png,.webp,.gif"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                <label htmlFor="post-media" className="media-upload-label">
                  <span className="media-upload-icon">📷</span>
                  <span className="media-upload-text">
                    {isUploading ? "Uploading..." : "Click to upload image"}
                  </span>
                </label>
                <div
                  className={`media-preview${mediaPreview ? " has-image" : ""}`}
                >
                  {mediaPreview && (
                    <img src={mediaPreview} alt="Post media preview" />
                  )}
                  {isUploading && (
                    <div className="upload-spinner">Uploading...</div>
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
                  checked={formState.newPostForm.postVisibility === "public"}
                  onChange={(e) =>
                    updatePostForm({
                      postVisibility: e.target.value as PostVisibility,
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
                  checked={formState.newPostForm.postVisibility === "followers"}
                  onChange={(e) =>
                    updatePostForm({
                      postVisibility: e.target.value as
                        | "public"
                        | "private"
                        | "followers",
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
                  checked={formState.newPostForm.postVisibility === "private"}
                  onChange={(e) =>
                    updatePostForm({
                      postVisibility: e.target.value as
                        | "public"
                        | "private"
                        | "followers",
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
                disabled={isSubmitting || isUploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting ? "Creating..." : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
