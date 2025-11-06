import { supabase } from "../../../../lib/supabaseClient";
import { ProfileData, UserActivityMetrics, UserPost } from "../types";

// File upload configurations
const PROFILE_IMAGE_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
};

const POST_MEDIA_CONFIG = {
  maxSize: 25 * 1024 * 1024, // 25MB
  allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp", ".gif"],
};

// File validation helper
function validateFile(file: File, config: typeof PROFILE_IMAGE_CONFIG) {
  // Check file size
  if (file.size > config.maxSize) {
    throw new Error(
      `File size must be less than ${config.maxSize / (1024 * 1024)}MB`
    );
  }

  // Check MIME type
  if (!config.allowedTypes.includes(file.type)) {
    throw new Error(
      `File type ${
        file.type
      } is not allowed. Allowed types: ${config.allowedTypes.join(", ")}`
    );
  }

  // Check file extension
  const fileExt = "." + file.name.split(".").pop()?.toLowerCase();
  if (!config.allowedExtensions.includes(fileExt)) {
    throw new Error(
      `File extension ${fileExt} is not allowed. Allowed extensions: ${config.allowedExtensions.join(
        ", "
      )}`
    );
  }
}

export const profileService = {
  // Get complete profile data from normalized view (includes profile + stats)
  async getCompleteProfileData(userId: string): Promise<{
    profileData: ProfileData;
    activityMetrics: UserActivityMetrics;
  }> {
    // Just get profile data directly from user_profiles since master_view is for posts
    const { data: profileData, error: profileError } = await supabase
      .from("user_profiles")
      .select(
        "id, display_name, username, bio, avatar_url, website_url, location, is_verified, is_private"
      )
      .eq("id", userId)
      .single();

    if (profileError) throw profileError;

    console.log("User profile data:", profileData);

    // Get activity metrics from master_view (post counts, etc.)
    const { data: statsData } = await supabase
      .from("master_view")
      .select("post_id")
      .eq("post_author_profile_id", userId)
      .not("post_id", "is", null); // Get all rows with posts

    // Deduplicate posts to get accurate count
    const uniquePostIds = new Set(statsData?.map((row) => row.post_id) || []);
    const postCount = uniquePostIds.size;

    // Get follower/following counts from follows table
    const [followersResult, followingResult] = await Promise.all([
      supabase
        .from("follows")
        .select("id", { count: "exact", head: true })
        .eq("following_id", userId),
      supabase
        .from("follows")
        .select("id", { count: "exact", head: true })
        .eq("follower_id", userId),
    ]);

    return {
      profileData: {
        id: profileData.id,
        display_name: profileData.display_name,
        username: profileData.username,
        bio: profileData.bio,
        avatar_url: profileData.avatar_url,
        website_url: profileData.website_url,
        location: profileData.location,
        is_verified: profileData.is_verified,
        is_private: profileData.is_private,
      },
      activityMetrics: {
        totalPosts: postCount,
        totalFollowers: followersResult.count || 0,
        totalFollowing: followingResult.count || 0,
      },
    };
  },

  // Get profile data for a user (legacy method for backward compatibility)
  async getProfileData(userId: string): Promise<ProfileData> {
    const { profileData } = await this.getCompleteProfileData(userId);
    return profileData;
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

  // Get profile statistics (legacy method - now uses consolidated approach)
  async getProfileStats(userId: string): Promise<UserActivityMetrics> {
    const { activityMetrics } = await this.getCompleteProfileData(userId);
    return activityMetrics;
  },

  // Get posts with pagination
  async getPosts(
    userId: string,
    page: number,
    limit: number
  ): Promise<{ posts: UserPost[]; total: number }> {
    const start = (page - 1) * limit;

    const [postsResult] = await Promise.all([
      supabase
        .from("master_view") // Changed from profile_view to master_view
        .select("*")
        .eq("post_author_profile_id", userId) // Use the correct column name from master_view
        .not("post_id", "is", null) // Get all rows with posts
        .order("post_created_at", { ascending: false }), // Use the correct column name
    ]);

    if (postsResult.error) throw postsResult.error;

    // Deduplicate posts since master_view can have multiple rows per post
    const uniquePostsMap = new Map();
    (postsResult.data || []).forEach((row: any) => {
      if (row.post_id && !uniquePostsMap.has(row.post_id)) {
        uniquePostsMap.set(row.post_id, row);
      }
    });

    const uniquePostsData = Array.from(uniquePostsMap.values());
    const totalUniquePosts = uniquePostsData.length;

    // Apply pagination after deduplication
    const paginatedPosts = uniquePostsData.slice(start, start + limit);

    // Transform the data to match the UserPost interface
    const posts: UserPost[] = paginatedPosts.map((post) => ({
      id: post.post_id, // Use the correct field name from master_view
      created_at: post.post_created_at, // Use the correct field name from master_view
      updated_at: post.post_updated_at, // Use the correct field name from master_view
      title: post.title,
      content: post.post_content, // Use the correct field name from master_view
      post_type: post.post_type,
      medium: post.medium,
      genre: post.genre,
      user_profile_id: post.post_author_profile_id, // Use the correct field name from master_view
      media_ids: post.media_ids || [],
      visibility: post.visibility,
      likes_count: post.likes_count || 0,
      comments_count: post.comments_count || 0,
      author: {
        id: post.post_author_profile_id, // Use the correct field name from master_view
        display_name: post.post_author_name, // Use the correct field name from master_view
        avatar_url: post.post_author_avatar, // Use the correct field name from master_view
        is_verified: post.post_author_verified, // Use the correct field name from master_view
      },
    }));

    return {
      posts,
      total: totalUniquePosts,
    };
  },

  // Create a new post
  async createPost(
    post: Omit<UserPost, "id" | "created_at" | "updated_at">
  ): Promise<void> {
    // Extract only the database fields (remove UI-only fields like author object)
    const dbPost = {
      user_profile_id: post.user_profile_id, // Changed from author_id to user_profile_id
      title: post.title,
      content: post.content,
      post_type: post.post_type,
      medium: post.medium,
      genre: post.genre,
      visibility: post.visibility,
      media_ids: post.media_ids,
      // Don't include author object, likes_count, comments_count as they're computed/joined
    };

    console.log("Creating post with data:", dbPost);

    // Insert the post
    const { data, error: insertError } = await supabase
      .from("posts")
      .insert([dbPost])
      .select();

    if (insertError) {
      console.error("Post creation failed:", insertError);
      throw insertError;
    }

    console.log("Post created successfully:", data);
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
    // Validate file before upload
    validateFile(file, PROFILE_IMAGE_CONFIG);

    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/profile-image.${fileExt}`;

    console.log("Uploading file to storage...", filePath);
    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Storage upload failed:", uploadError);
      throw uploadError;
    }

    const { data: publicURL } = supabase.storage
      .from("profile-images")
      .getPublicUrl(filePath);

    console.log(
      "File uploaded successfully, updating database...",
      publicURL.publicUrl
    );
    console.log("Updating user_profiles for userId:", userId);

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
    // Validate file before upload
    validateFile(file, POST_MEDIA_CONFIG);

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
