import React from "react";
import { UserPost } from "../types";
import { useProfileContext } from "../ProfileContext";

interface PostListProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  postsPerPage: number;
}

export const PostList: React.FC<PostListProps> = ({
  currentPage,
  onPageChange,
  postsPerPage,
}) => {
  const { userPosts, totalUserPosts, loadingStates } = useProfileContext();

  if (loadingStates.userPostsLoading) {
    return <p>Loading posts...</p>;
  }

  if (!userPosts || userPosts.length === 0) {
    return (
      <div className="posts-placeholder">
        No posts yet. Create your first post!
      </div>
    );
  }

  return (
    <>
      <div className="two-column-grid">
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="pagination-controls">
        <button
          className="btn"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          className="btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={userPosts.length < postsPerPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

interface PostCardProps {
  post: UserPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
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
          {post.media_url && (
            <div className="media-container">
              <img
                src={post.media_url}
                alt="Post media"
                className="post-image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
