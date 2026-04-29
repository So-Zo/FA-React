import { supabase } from "../../../../lib/supabaseClient";
import { cache } from "../../../../utils/cache";
import { ProfileData, UserActivityMetrics, UserPost } from "../../../../types";

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
      `File size must be less than ${config.maxSize / (1024 * 1024)}MB`,
    );
  }

  // Check MIME type
  if (!config.allowedTypes.includes(file.type)) {
    throw new Error(
      `File type ${
        file.type
      } is not allowed. Allowed types: ${config.allowedTypes.join(", ")}`,
    );
  }

  // Check file extension
  const fileExt = "." + file.name.split(".").pop()?.toLowerCase();
  if (!config.allowedExtensions.includes(fileExt)) {
    throw new Error(
      `File extension ${fileExt} is not allowed. Allowed extensions: ${config.allowedExtensions.join(
        ", ",
      )}`,
    );
  }
}

export const profileService = {
  async getUserProfileComplete(userId: string) {
    const cacheKey = `profile-complete-${userId}`;

    return await cache.get(
      cacheKey,
      async () => {
        const { data, error } = await supabase
          .from("master_view")
          .select("*")
          .eq("post_author_profile_id", userId);

        if (error) {
          throw error;
        }

        if (!data || data.length === 0) {
          const { data: profileData, error: profileError } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", userId)
            .single();

          if (profileError) {
            throw profileError;
          }

          return {
            ...profileData,
            posts: [],
            follows_followers: [],
            follows_following: [],
          };
        }

        const firstRow = data[0];
        const profileData = {
          id: firstRow.post_author_profile_id,
          username: firstRow.post_author_username,
          display_name: firstRow.post_author_name,
          bio: firstRow.post_author_bio,
          avatar_url: firstRow.post_author_avatar,
          is_verified: firstRow.post_author_verified,
          created_at: firstRow.post_created_at,
          updated_at: firstRow.post_updated_at,
        };

        const postsMap = new Map();
        data.forEach((row) => {
          if (row.post_id && !postsMap.has(row.post_id)) {
            postsMap.set(row.post_id, {
              id: row.post_id,
              title: row.title,
              content: row.post_content,
              post_type: row.post_type,
              medium: row.medium,
              genre: row.genre,
              tags: row.tags || [],
              media_ids: row.media_ids || [],
              hashtags: row.hashtags || [],
              mentions: row.mentions || [],
              visibility: row.visibility,
              location: row.location,
              likes_count: row.likes_count || 0,
              comments_count: row.comments_count || 0,
              created_at: row.post_created_at,
              updated_at: row.post_updated_at,
              user_profile_id: row.post_author_profile_id,
            });
          }
        });

        return {
          ...profileData,
          posts: Array.from(postsMap.values()),
          follows_followers: [],
          follows_following: [],
        };
      },
      5 * 60 * 1000,
    );
  },

  async updateUserProfile(userId: string, updates: Record<string, any>) {
    const { data, error } = await supabase
      .from("user_profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    cache.invalidatePattern(`user-${userId}`);
    cache.invalidatePattern(`profile-${userId}`);
    cache.invalidatePattern(`profile-complete-${userId}`);

    return data;
  },

  // Get complete profile data from normalized view (includes profile + stats)
  async getCompleteProfileData(userId: string): Promise<{
    profileData: ProfileData;
    activityMetrics: UserActivityMetrics;
  }> {
    console.log("=== PROFILE SERVICE DEBUG ===");
    console.log(
      "profileService - getCompleteProfileData called for userId:",
      userId,
    );

    // Just get profile data directly from user_profiles since master_view is for posts
    const { data: profileData, error: profileError } = await supabase
      .from("user_profiles")
      .select(
        "id, display_name, username, bio, avatar_url, website_url, location, is_verified, is_private, show_online_status, email_notifications, comment_notifications, follower_notifications, content_notifications, last_seen",
      )
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error(
        "profileService - error fetching profile data:",
        profileError,
      );
      throw profileError;
    }

    console.log("profileService - raw profile data from DB:", profileData);

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

    const formattedProfileData = {
      id: profileData.id,
      display_name: profileData.display_name,
      username: profileData.username,
      bio: profileData.bio,
      avatar_url: profileData.avatar_url,
      website_url: profileData.website_url,
      location: profileData.location,
      is_verified: profileData.is_verified,
      is_private: profileData.is_private,
      // Privacy & Online Status Settings
      show_online_status: profileData.show_online_status,
      // Notification Settings
      email_notifications: profileData.email_notifications,
      comment_notifications: profileData.comment_notifications,
      follower_notifications: profileData.follower_notifications,
      content_notifications: profileData.content_notifications,
      // Activity tracking
      last_seen: profileData.last_seen,
      // Add required timestamps with defaults
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log(
      "profileService - formatted profile data:",
      formattedProfileData,
    );

    return {
      profileData: formattedProfileData,
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
    updates: Partial<ProfileData>,
  ): Promise<void> {
    console.log("=== PROFILE SERVICE UPDATE DEBUG ===");
    console.log("profileService - updateProfileData called");
    console.log("  userId:", userId);
    console.log("  updates:", updates);

    const { error } = await supabase
      .from("user_profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("profileService - update failed:", error);
      throw error;
    }

    console.log("profileService - update completed successfully");
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
    limit: number,
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
      tags: post.tags || [], // Add default empty tags
      media_ids: post.media_ids,
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
    post: Omit<UserPost, "id" | "created_at" | "updated_at">,
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
    const { error: insertError } = await supabase
      .from("posts")
      .insert([dbPost])
      .select();

    if (insertError) {
      console.error("Post creation failed:", insertError);
      throw insertError;
    }
  },

  // Update a post
  async updatePost(
    postId: string,
    updates: Partial<Omit<UserPost, "id" | "created_at" | "updated_at">>,
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
    file: File,
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
      publicURL.publicUrl,
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
    file: File,
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

  // Get user comments with post context
  async getUserComments(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ comments: any[]; total: number }> {
    try {
      const offset = (page - 1) * limit;

      // Fetch comments by user from master_view with post context
      const {
        data,
        error: fetchError,
        count,
      } = await supabase
        .from("master_view")
        .select(
          `
          comment_id,
          post_id,
          title,
          comment_content,
          comment_created_at,
          comment_updated_at,
          post_author_name,
          post_author_username,
          post_author_avatar,
          medium,
          genre
        `,
          { count: "exact" },
        )
        .eq("comment_author_profile_id", userId)
        .not("comment_id", "is", null) // Only get comments, not posts
        .order("comment_created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (fetchError) throw fetchError;

      // Transform the data to match our UserComment interface
      const comments = (data || []).map((item) => ({
        id: item.comment_id,
        post_id: item.post_id,
        content: item.comment_content,
        created_at: item.comment_created_at,
        updated_at: item.comment_updated_at,
        post: {
          id: item.post_id,
          title: item.title,
          author: {
            display_name: item.post_author_name,
            avatar_url: item.post_author_avatar,
          },
        },
        author: {
          id: userId, // The comment author is the user we're fetching for
          display_name: "", // We don't have this in master_view, could add if needed
          avatar_url: undefined,
          is_verified: false,
        },
      }));

      return {
        comments,
        total: count || 0,
      };
    } catch (error) {
      console.error("Error fetching user comments:", error);
      throw error;
    }
  },
};
