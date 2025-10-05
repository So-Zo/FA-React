import { supabase } from "../../../lib/supabaseClient";
import { ProfileData, UserActivityMetrics, UserPost } from "../types";

export const profileService = {
  // Get profile data for a user
  async getProfileData(userId: string): Promise<ProfileData> {
    const { data, error } = await supabase
      .from("user_profiles")
      .select(
        "id, display_name, username, bio, avatar_url, website_url, location, is_verified, is_private"
      )
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  },

  // Update profile data
  async updateProfileData(
    userId: string,
    updates: Partial<ProfileData>
  ): Promise<void> {
    const { error } = await supabase
      .from("user_profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) throw error;
  },

  // Get profile statistics
  async getProfileStats(userId: string): Promise<UserActivityMetrics> {
    const { data, error } = await supabase.rpc("get_profile_stats", {
      user_id: userId,
    });

    if (error) throw error;
    // Transform database response to match our UserActivityMetrics interface
    return {
      totalFollowers: data.followers_count || 0,
      totalFollowing: data.following_count || 0,
      totalPosts: data.posts_count || 0,
    };
  },

  // Get posts with pagination
  async getPosts(
    userId: string,
    page: number,
    limit: number
  ): Promise<{ posts: UserPost[]; total: number }> {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const [postsResult, countResult] = await Promise.all([
      supabase
        .from("posts")
        .select(
          `
          id,
          author_id,
          title,
          content,
          post_type,
          medium,
          genre,
          tags,
          visibility,
          created_at,
          updated_at,
          media_url,
          author:user_profiles(display_name, avatar_url)
        `
        )
        .eq("author_id", userId)
        .range(start, end)
        .order("created_at", { ascending: false }),
      supabase
        .from("posts")
        .select("id", { count: "exact", head: true })
        .eq("author_id", userId),
    ]);

    if (postsResult.error) throw postsResult.error;
    if (countResult.error) throw countResult.error;

    // Ensure we have the right shape before returning
    const posts: UserPost[] = (postsResult.data || []).map((post) => ({
      id: post.id,
      author_id: post.author_id,
      title: post.title,
      content: post.content,
      post_type: post.post_type,
      medium: post.medium,
      genre: post.genre,
      tags: post.tags || [],
      visibility: post.visibility,
      media_url: post.media_url,
      created_at: post.created_at,
      updated_at: post.updated_at,
      author:
        post.author && post.author[0]
          ? {
              display_name: post.author[0].display_name,
              avatar_url: post.author[0].avatar_url,
            }
          : undefined,
    }));

    return {
      posts,
      total: countResult.count || 0,
    };
  },

  // Create a new post
  async createPost(
    post: Omit<UserPost, "id" | "created_at" | "updated_at">
  ): Promise<void> {
    const { error } = await supabase.from("posts").insert([post]);
    if (error) throw error;
  },

  // Update a post
  async updatePost(
    postId: string,
    updates: Partial<Omit<UserPost, "id" | "created_at" | "updated_at">>
  ): Promise<void> {
    const { error } = await supabase
      .from("posts")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", postId);

    if (error) throw error;
  },

  // Delete a post
  async deletePost(postId: string): Promise<void> {
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) throw error;
  },

  // Update profile image
  async updateProfileImage(
    userId: string,
    file: File
  ): Promise<{ url: string }> {
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/profile-image.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: publicURL } = supabase.storage
      .from("profile-images")
      .getPublicUrl(filePath);

    await this.updateProfileData(userId, {
      avatar_url: publicURL.publicUrl,
    });

    return { url: publicURL.publicUrl };
  },

  // Upload post media
  async uploadPostMedia(
    userId: string,
    postId: string,
    file: File
  ): Promise<{ url: string }> {
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/posts/${postId}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("post-media")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: publicURL } = supabase.storage
      .from("post-media")
      .getPublicUrl(filePath);

    return { url: publicURL.publicUrl };
  },
};
