import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { useAuth } from "../../../../shared/hooks/useAuth";

export type PostType =
  | "discussion"
  | "question"
  | "fan-art"
  | "fan-fiction"
  | "world-building"
  | "feedback"
  | "review"
  | "theory"
  | "news"
  | "meme"
  | "cosplay";

export type Medium =
  | "anime"
  | "manga"
  | "comics"
  | "tv"
  | "movies"
  | "games"
  | "books"
  | "other";

export type Genre =
  | "comedy"
  | "horror"
  | "drama"
  | "romance"
  | "action"
  | "adventure"
  | "fantasy"
  | "sci-fi"
  | "other";

interface Like {
  id: string;
  post_id: string;
  user_profile_id: string; // Changed from author_id to user_profile_id
  created_at: string;
  user?: {
    display_name: string;
    username: string;
    avatar_url: string;
  };
}

interface PostFeedRow {
  id: string;
  created_at: string;
  title: string;
  content: string;
  post_type: PostType;
  medium: Medium;
  genre: Genre;
  tags: string[];
  user_profile_id: string; // Changed from author_id to user_profile_id
  media_ids: string[];
  hashtags: string[];
  mentions: string[];
  visibility: "public" | "private" | "followers";
  location?: string;
  updated_at: string;
  display_name: string;
  username: string;
  avatar_url: string;
  is_verified: boolean;
  likes_count: number;
  comments_count: number;
  likes: Like[];
  user_has_liked?: boolean;
}

export type SortOption =
  | "latest"
  | "trending"
  | "top"
  | "most_commented"
  | "most_liked";
export type TimeFilter = "today" | "this_week" | "this_month" | "all_time";
export interface PostQueryOptions {
  sort?: SortOption;
  timeFilter?: TimeFilter;
  postType?: PostType;
  medium?: Medium;
  genre?: Genre;
  searchQuery?: string;
}

export interface Post {
  id: string;
  created_at: string;
  title: string;
  content: string;
  post_type: PostType;
  medium: Medium;
  genre: Genre;
  tags: string[];
  user_profile_id: string; // Changed from author_id to user_profile_id
  media_ids: string[];
  hashtags: string[];
  mentions: string[];
  likes_count: number;
  comments_count: number;
  reposts_count: number;
  views_count: number;
  is_pinned: boolean;
  is_archived: boolean;
  visibility: "public" | "private" | "followers";
  location?: string;
  updated_at: string;
  author?: {
    id: string;
    display_name: string;
    username: string;
    avatar_url: string;
    is_verified: boolean;
  };
  likes?: Like[];
  isLikedByUser?: boolean;
  media?: Array<{
    id: string;
    file_name: string;
    storage_path: string;
    alt_text?: string;
    blurhash?: string;
  }>;
}

export function usePosts(options: PostQueryOptions = {}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts(options);
  }, [
    options.sort,
    options.timeFilter,
    options.postType,
    options.medium,
    options.genre,
    options.searchQuery,
  ]);

  const fetchPosts = async (options: PostQueryOptions = {}) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("master_view")
        .select(
          `
        post_id,
        post_created_at,
        title,
        post_content,
        post_type,
        medium,
        genre,
        tags,
        post_author_profile_id,
        media_ids,
        hashtags,
        mentions,
        visibility,
        location,
        post_updated_at,
        post_author_name,
        post_author_username,
        post_author_avatar,
        post_author_verified,
        likes_count,
        comments_count
      `
        )
        .not("post_id", "is", null); // Get all rows that have posts (regardless of comments)

      console.log("📦 Base query set up, applying filters...");

      if (options.timeFilter) {
        switch (options.timeFilter) {
          case "today":
            query = query.gte(
              "post_created_at", // Updated column name
              new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            );
            break;
          case "this_week":
            query = query.gte(
              "post_created_at", // Updated column name
              new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            );
            break;
          case "this_month":
            query = query.gte(
              "post_created_at", // Updated column name
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            );
            break;
        }
      }

      if (options.postType) {
        query = query.eq("post_type", options.postType);
      }
      if (options.medium) {
        query = query.eq("medium", options.medium);
      }
      if (options.genre) {
        query = query.eq("genre", options.genre);
      }

      if (options.searchQuery) {
        console.log("🔍 Searching for:", options.searchQuery);
        // Note: textSearch uses PostgreSQL full-text search, which might not work as expected
        // Let's also search in title for better results
        query = query.or(
          `title.ilike.%${options.searchQuery}%,post_content.ilike.%${options.searchQuery}%`
        );
      }

      switch (options.sort) {
        case "trending":
        case "top":
        case "most_liked":
          query = query.order("likes_count", { ascending: false });
          break;
        case "most_commented":
          query = query.order("comments_count", { ascending: false });
          break;
        default:
          query = query.order("post_created_at", { ascending: false }); // Updated column name
      }

      query = query.eq("visibility", "public");

      const { data: postsData, error: postsError } = (await query) as {
        data: PostFeedRow[] | null;
        error: any;
      };

      if (postsError) throw postsError;

      // Since master_view can have multiple rows per post (due to comments),
      // we need to deduplicate by post_id and only keep unique posts
      const uniquePostsMap = new Map();
      (postsData || []).forEach((row: any) => {
        if (row.post_id && !uniquePostsMap.has(row.post_id)) {
          uniquePostsMap.set(row.post_id, row);
        }
      });

      const uniquePostsData = Array.from(uniquePostsMap.values());

      const processedPosts = uniquePostsData.map(
        (
          post: any // Changed to any since field names are different
        ) =>
          ({
            id: post.post_id, // Updated field name
            created_at: post.post_created_at, // Updated field name
            title: post.title,
            content: post.post_content, // Updated field name
            post_type: post.post_type,
            medium: post.medium,
            genre: post.genre,
            tags: post.tags,
            user_profile_id: post.post_author_profile_id, // Updated field name
            media_ids: post.media_ids,
            hashtags: post.hashtags,
            mentions: post.mentions,
            visibility: post.visibility,
            location: post.location,
            updated_at: post.post_updated_at, // Updated field name
            likes_count: post.likes_count,
            comments_count: post.comments_count,
            reposts_count: 0,
            views_count: 0,
            is_pinned: false,
            is_archived: false,
            author: {
              id: post.post_author_profile_id, // Updated field name
              display_name: post.post_author_name, // Updated field name
              username: post.post_author_username, // Updated field name
              avatar_url: post.post_author_avatar, // Updated field name
              is_verified: post.post_author_verified, // Updated field name
            },
            likes: [], // TODO: Will need to handle likes differently with new schema
            isLikedByUser: false, // TODO: Will need to implement this separately
          } as Post)
      );

      setPosts(processedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (
    postData: Omit<Post, "id" | "created_at" | "user_profile_id" | "author">
  ) => {
    if (!user) {
      throw new Error("Must be logged in to create a post");
    }

    // TODO: Need to get user's profile_id instead of using auth user.id directly
    // For now using user.id assuming it matches user_profiles.id
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            ...postData,
            user_profile_id: user.id, // This should be the user_profiles.id
          },
        ])
        .select()
        .single();

      if (error) throw error;

      await fetchPosts();

      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to create post");
    }
  };

  const toggleLike = async (postId: string) => {
    if (!user) {
      throw new Error("Must be logged in to like posts");
    }

    try {
      const post = posts.find((p) => p.id === postId);
      if (!post) throw new Error("Post not found");

      setPosts((currentPosts) =>
        currentPosts.map((p) =>
          p.id === postId
            ? {
                ...p,
                likes_count: p.likes_count + (p.isLikedByUser ? -1 : 1),
                isLikedByUser: !p.isLikedByUser,
              }
            : p
        )
      );

      if (post.isLikedByUser) {
        const { error } = await supabase
          .from("likes")
          .delete()
          .match({ post_id: postId, user_profile_id: user.id }); // Changed from author_id to user_profile_id

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("likes")
          .insert([{ post_id: postId, user_profile_id: user.id }]); // Changed from author_id to user_profile_id

        if (error) throw error;
      }
    } catch (err) {
      await fetchPosts();
      throw err instanceof Error ? err : new Error("Failed to toggle like");
    }
  };

  return {
    posts,
    loading,
    error,
    createPost,
    toggleLike,
    refreshPosts: fetchPosts,
  };
}
