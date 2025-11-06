import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../shared/hooks/useAuth";
import { useProfileId } from "../utils/userUtils";

// Comment interface based on Supabase comments table structure
export interface Comment {
  id: string;
  post_id: string;
  user_profile_id: string; // Changed from author_id to user_profile_id
  content: string;
  created_at: string;
  updated_at: string;
  author: {
    id: string;
    display_name: string;
    username: string;
    avatar_url: string;
    is_verified: boolean;
  };
}

interface UseCommentsOptions {
  postId: string;
}

export function useComments({ postId }: UseCommentsOptions) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const profileId = useProfileId(user);

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);

      // Query comments with joined user profile data from master_view
      const { data, error: fetchError } = await supabase
        .from("master_view")
        .select(
          `
          comment_id,
          post_id,
          comment_author_profile_id,
          comment_content,
          comment_created_at,
          comment_updated_at,
          comment_author_name,
          comment_author_username,
          comment_author_avatar,
          comment_author_verified
        `
        )
        .eq("post_id", postId)
        .not("comment_id", "is", null) // Only get comments, not posts
        .order("comment_created_at", { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      // Transform the data to match our Comment interface
      const transformedComments: Comment[] = (data || []).map(
        (comment: any) => ({
          id: comment.comment_id, // Updated field name from master_view
          post_id: comment.post_id,
          user_profile_id: comment.comment_author_profile_id, // Updated field name from master_view
          content: comment.comment_content, // Updated field name from master_view
          created_at: comment.comment_created_at, // Updated field name from master_view
          updated_at: comment.comment_updated_at, // Updated field name from master_view
          author: {
            id: comment.comment_author_profile_id, // Updated field name from master_view
            display_name: comment.comment_author_name || "Unknown User", // Updated field name from master_view
            username: comment.comment_author_username || "unknown", // Updated field name from master_view
            avatar_url:
              comment.comment_author_avatar || "/placeholder-avatar.jpg", // Updated field name from master_view
            is_verified: comment.comment_author_verified || false, // Updated field name from master_view
          },
        })
      );

      setComments(transformedComments);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError(err instanceof Error ? err.message : "Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (content: string): Promise<void> => {
    if (!profileId) {
      throw new Error("Must be logged in to comment");
    }

    if (!content.trim()) {
      throw new Error("Comment cannot be empty");
    }

    try {
      setSubmitting(true);
      setError(null);

      // Insert the comment using profileId directly
      const { error: insertError } = await supabase.from("comments").insert([
        {
          post_id: postId,
          user_profile_id: profileId, // Use profileId directly as user_profile_id
          content: content.trim(),
        },
      ]);

      if (insertError) {
        throw insertError;
      }

      // Refresh comments to show the new one
      await fetchComments();

      // Update the post's comment count (if needed - this might be handled by triggers)
      // Note: This should ideally be handled by database triggers for consistency
      const { error: updateError } = await supabase.rpc(
        "increment_comment_count",
        {
          post_id: postId,
        }
      );

      if (updateError) {
        console.warn("Failed to update comment count:", updateError);
        // Don't throw here as the comment was successfully created
      }
    } catch (err) {
      console.error("Error creating comment:", err);
      throw err instanceof Error ? err : new Error("Failed to create comment");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteComment = async (commentId: string): Promise<void> => {
    if (!profileId) {
      throw new Error("Must be logged in to delete comments");
    }

    try {
      setError(null);

      // Check if user owns the comment
      const comment = comments.find((c) => c.id === commentId);
      if (!comment) {
        throw new Error("Comment not found");
      }

      if (comment.user_profile_id !== profileId) {
        throw new Error("You can only delete your own comments");
      }

      // Delete the comment
      const { error: deleteError } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (deleteError) {
        throw deleteError;
      }

      // Update local state immediately for better UX
      setComments((prev) => prev.filter((c) => c.id !== commentId));

      // Update the post's comment count (if needed)
      const { error: updateError } = await supabase.rpc(
        "decrement_comment_count",
        {
          post_id: postId,
        }
      );

      if (updateError) {
        console.warn("Failed to update comment count:", updateError);
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      throw err instanceof Error ? err : new Error("Failed to delete comment");
    }
  };

  return {
    comments,
    loading,
    error,
    submitting,
    createComment,
    deleteComment,
    refetch: fetchComments,
  };
}
