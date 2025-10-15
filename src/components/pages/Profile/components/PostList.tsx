import React from "react";


interface PostListProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PostList: React.FC<PostListProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
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
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};
