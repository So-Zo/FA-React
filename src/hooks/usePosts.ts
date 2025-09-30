import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./useAuth";

export type PostType = "discussion" | "feedback" | "misc";

export type MediaType =
  | "anime"
  | "manga"
  | "comics"
  | "tv"
  | "movies"
  | "games"
  | "books"
  | "other";

export type ContentGenre =
  | "comedy"
  | "horror"
  | "drama"
  | "romance"
  | "action"
  | "adventure"
  | "fantasy"
  | "sci-fi";

interface MediaItem {
  id: string;
  file_name: string;
  storage_path: string;
  alt_text?: string;
  blurhash?: string;
}

interface Like {
  id: string;
  post_id: string;
  author_id: string;
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
  media_type?: MediaType;
  content_genre?: ContentGenre;
  author_id: string;
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
  actual_likes_count: number;
  actual_comments_count: number;
  engagement_score: number;
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
export type PostCategory =
  | "creators"
  | "fan-art"
  | "fan-fiction"
  | "world-building"
  | "all";

export interface PostQueryOptions {
  sort?: SortOption;
  timeFilter?: TimeFilter;
  category?: PostCategory;
  postType?: PostType;
  genre?: ContentGenre;
  searchQuery?: string;
}

export interface Post {
  id: string;
  created_at: string;
  title: string;
  content: string;
  post_type: PostType;
  media_type?: MediaType;
  content_genre?: ContentGenre;
  author_id: string; // References user_profiles.id
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
  // Author details from user_profiles
  author?: {
    id: string; // This is user_profiles.id
    display_name: string;
    username: string;
    avatar_url: string;
    is_verified: boolean;
  };
  // Likes data
  likes?: Like[];
  isLikedByUser?: boolean;
  // Client-side state
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
  }, [options.sort, options.timeFilter, options.category, options.searchQuery]);

  const fetchPosts = async (options: PostQueryOptions = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Start with base query from post_feed view
      let query = supabase.from("post_feed").select("*");

      // Apply time filter
      if (options.timeFilter) {
        switch (options.timeFilter) {
          case "today":
            query = query.gte(
              "created_at",
              new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            );
            break;
          case "this_week":
            query = query.gte(
              "created_at",
              new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            );
            break;
          case "this_month":
            query = query.gte(
              "created_at",
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            );
            break;
        }
      }

      // Apply category filter
      if (options.category && options.category !== "all") {
        query = query.eq("category", options.category);
      }

      // Apply search filter if provided
      if (options.searchQuery) {
        query = query.textSearch("content", options.searchQuery);
      }

      // Apply sorting
      switch (options.sort) {
        case "trending":
          query = query.order("engagement_score", { ascending: false });
          break;
        case "top":
          query = query.order("actual_likes_count", { ascending: false });
          break;
        case "most_commented":
          query = query.order("actual_comments_count", { ascending: false });
          break;
        case "most_liked":
          query = query.order("actual_likes_count", { ascending: false });
          break;
        default: // 'latest' is default
          query = query.order("created_at", { ascending: false });
      }

      // Always filter for public posts
      query = query.eq("visibility", "public");

      const { data: postsData, error: postsError } = (await query) as {
        data: PostFeedRow[] | null;
        error: any;
      };

      if (postsError) throw postsError;

      // Process posts and likes data
      const processedPosts = (postsData || []).map(
        (post: PostFeedRow) =>
          ({
            id: post.id,
            created_at: post.created_at,
            title: post.title,
            content: post.content,
            author_id: post.author_id,
            media_ids: post.media_ids,
            hashtags: post.hashtags,
            mentions: post.mentions,
            visibility: post.visibility,
            location: post.location,
            updated_at: post.updated_at,
            likes_count: post.actual_likes_count,
            comments_count: post.actual_comments_count,
            reposts_count: 0, // not implemented yet
            views_count: 0, // not implemented yet
            is_pinned: false,
            is_archived: false,
            author: {
              id: post.author_id,
              display_name: post.display_name,
              username: post.username,
              avatar_url: post.avatar_url,
              is_verified: post.is_verified,
            },
            likes: post.likes,
            isLikedByUser: user
              ? post.likes?.some((like: Like) => like.author_id === user.id)
              : false,
          } as Post)
      );

      setPosts(processedPosts);

      // Then get the likes for the current user if logged in
      let userLikes: Record<string, boolean> = {};
      if (user) {
        // First get the user's profile
        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("username", user.email)
          .single();

        if (profileData) {
          const { data: likesData } = await supabase
            .from("likes")
            .select<"post_id", Pick<Like, "post_id">>("post_id")
            .eq("author_id", profileData.id)
            .in(
              "post_id",
              (postsData as PostFeedRow[]).map((p) => p.id)
            );

          userLikes = (likesData || []).reduce<Record<string, boolean>>(
            (acc, like) => {
              acc[like.post_id] = true;
              return acc;
            },
            {}
          );
        }
      }

      // Get media info for posts with media_ids
      const mediaIds = (postsData as PostFeedRow[])
        .flatMap((post) => post.media_ids)
        .filter((id): id is string => !!id);

      let mediaByPostId: Record<string, MediaItem[]> = {};
      if (mediaIds.length > 0) {
        const { data: mediaData } = await supabase
          .from("media")
          .select<"*", MediaItem>("*")
          .in("id", mediaIds);

        if (mediaData) {
          // Group media by post using media_ids arrays
          (postsData as PostFeedRow[]).forEach((post) => {
            if (post.media_ids?.length > 0) {
              mediaByPostId[post.id] = post.media_ids
                .map((id) => mediaData.find((m) => m.id === id))
                .filter((m): m is MediaItem => !!m);
            }
          });
        }
      }

      if (postsError) {
        throw postsError;
      }

      // Transform the data to include all related info
      const transformedPosts = (postsData as PostFeedRow[]).map(
        (post): Post => ({
          ...post,
          author: {
            id: post.author_id,
            display_name: post.display_name,
            username: post.username,
            avatar_url: post.avatar_url,
            is_verified: post.is_verified,
          },
          isLikedByUser: userLikes[post.id] || false,
          media: mediaByPostId[post.id] || [],
          likes_count: post.actual_likes_count || 0,
          comments_count: post.actual_comments_count || 0,
          reposts_count: 0, // These aren't in the feed view yet
          views_count: 0,
          is_pinned: false,
          is_archived: false,
        })
      );

      setPosts(transformedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (
    postData: Omit<Post, "id" | "created_at" | "author_id" | "author">
  ) => {
    if (!user) {
      throw new Error("Must be logged in to create a post");
    }

    try {
      // First get the user's profile ID
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("username", user.email)
        .single();

      if (profileError) throw profileError;
      if (!profileData) throw new Error("User profile not found");

      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            ...postData,
            author_id: profileData.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Refresh posts after creating a new one
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

      // Optimistically update the UI
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

      // Get the user's profile ID first
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("username", user.email)
        .single();

      if (profileError) throw profileError;
      if (!profileData) throw new Error("User profile not found");

      if (post.isLikedByUser) {
        // Unlike: Delete the like
        const { error } = await supabase
          .from("likes")
          .delete()
          .match({ post_id: postId, author_id: profileData.id });

        if (error) throw error;
      } else {
        // Like: Insert new like
        const { error } = await supabase
          .from("likes")
          .insert([{ post_id: postId, author_id: profileData.id }]);

        if (error) throw error;
      }

      // The triggers will handle updating counts in the database
    } catch (err) {
      // Revert optimistic update on error
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
