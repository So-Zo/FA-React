import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
} from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../../hooks/useAuth";

// Stronger typing for a Post record from Supabase
interface Post {
  id: string;
  title: string;
  category: string;
  content: string;
  visibility: "public" | "followers" | "private";
  user_id: string;
  created_at?: string;
}

const ProfilePage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<"comments" | "posts" | "work-requests" | "settings" | "drafts">("posts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/placeholder-avatar.jpg");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const postMediaInputRef = useRef<HTMLInputElement>(null);

  // ✅ Stable fetch function
  const fetchPosts = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from<Post>("posts")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // ✅ Only fire after auth is resolved
  useEffect(() => {
    if (!authLoading && user) {
      fetchPosts();
    }
  }, [authLoading, user, fetchPosts]);

  const handleOptionClick = (section: typeof activeSection) =>
    setActiveSection(section);

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setMediaPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
    setMediaPreview(null);

    const form = document.getElementById(
      "post-creation-form"
    ) as HTMLFormElement | null;
    if (form) form.reset();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create a post.");
      return;
    }

    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("post-title") as HTMLInputElement).value;
    const category = (form.elements.namedItem("post-category") as HTMLSelectElement).value;
    const content = (form.elements.namedItem("post-content") as HTMLTextAreaElement).value;
    const visibility = (form.elements.namedItem("post-visibility") as HTMLInputElement).value as Post["visibility"];

    try {
      const { error } = await supabase.from("posts").insert([
        {
          user_id: user.id,
          title,
          category,
          content,
          visibility,
        },
      ]);

      if (error) throw error;

      await fetchPosts();
      alert("Post created successfully!");
      closeModal();
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post.");
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="profile-page">
      {authLoading && <div>Loading your profile…</div>}

      {/* Modal for post creation */}
      <div
        className={`modal${isModalOpen ? " active" : ""}`}
        onClick={handleModalClick}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create New Post</h2>
            <button
              className="modal-close"
              aria-label="Close modal"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form
              id="post-creation-form"
              className="form-container"
              onSubmit={handleFormSubmit}
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="post-category" className="form-label">
                  Category
                </label>
                <select
                  id="post-category"
                  name="post-category"
                  className="form-select"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="anime">Anime</option>
                  <option value="manga">Manga</option>
                  <option value="comics">Comics</option>
                  <option value="metaverse">Metaverse</option>
                  <option value="worlds">Worlds & Universes</option>
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
                    ref={postMediaInputRef}
                    onChange={handlePostMediaChange}
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
                    defaultChecked
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
                  onClick={closeModal}
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

      {/* Profile Header */}
      <header className="profile-header">
        <div className="profile-header-row">
          <div className="profile-avatar-block">
            <img
              id="user-profile-image"
              alt="User Profile Picture"
              src={profileImage}
              className="profile-avatar"
              onClick={handleProfileImageClick}
            />
            <input
              type="file"
              id="profile-image-upload"
              accept="image/*"
              aria-label="Upload profile picture"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleProfileImageChange}
            />
            <button
              className="profile-image-label"
              type="button"
              onClick={handleProfileImageClick}
            >
              Change Profile Picture
            </button>
          </div>
          <div className="user-overview-block">
            <h1 className="profile-user-name">
              {user ? user.email : "User Name"}
            </h1>
            <div className="profile-stats-row">
              <div className="profile-stat">
                <span className="stat-number">{posts.length}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="profile-stat">
                <span className="stat-number">256</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="profile-stat">
                <span className="stat-number">128</span>
                <span className="stat-label">Following</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="profile-main">
        <nav className="profile-options-bar">
          {["comments", "posts", "work-requests", "settings", "drafts"].map(
            (sec) => (
              <button
                key={sec}
                className={`profile-option-item${
                  activeSection === sec ? " active" : ""
                }`}
                onClick={() => handleOptionClick(sec as typeof activeSection)}
              >
                {sec.charAt(0).toUpperCase() +
                  sec.slice(1).replace("-", " ")}
              </button>
            )
          )}
        </nav>
        <section className="profile-content-container">
          <div
            className={`profile-content-section${
              activeSection === "comments" ? " active" : ""
            }`}
          >
            <h2>Recent Comments</h2>
            <div className="comment-placeholder">No comments yet.</div>
          </div>
          <div
            className={`profile-content-section${
              activeSection === "posts" ? " active" : ""
            }`}
          >
            <h2>Your Posts</h2>
            {loading ? (
              <p>Loading posts...</p>
            ) : posts.length > 0 ? (
              <div className="posts-grid">
                {posts.map((post) => (
                  <div key={post.id} className="post-card">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <span>Category: {post.category}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="posts-placeholder">
                No posts yet. Create your first post!
              </div>
            )}
          </div>
          <div
            className={`profile-content-section${
              activeSection === "work-requests" ? " active" : ""
            }`}
          >
            <h2>Work Requests</h2>
            <div className="work-requests-placeholder">No work requests.</div>
          </div>
          <div
            className={`profile-content-section${
              activeSection === "settings" ? " active" : ""
            }`}
          >
            <h2>Account Settings</h2>
          </div>
          <div
            className={`profile-content-section${
              activeSection === "drafts" ? " active" : ""
            }`}
          >
            <h2>Your Drafts</h2>
            <div className="drafts-placeholder">No drafts yet.</div>
          </div>
        </section>
      </main>

      <button
        className="create-post-button"
        aria-label="Create New Post"
        onClick={openModal}
      >
        +
      </button>
    </div>
  );
};

export default ProfilePage;
