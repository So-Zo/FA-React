import { supabase } from "../lib/supabaseClient";
import { cache } from "../utils/cache";

/**
 * Centralized data service for optimized database queries
 * Replaces multiple separate queries with single optimized calls
 */

export const dataService = {
  // ============= CHARACTER DATA =============

  /**
   * Get complete character data in a single query
   * Replaces 4 separate queries with 1 optimized join
   */
  /**
   * Get complete character data with all relationships from master view
   */
  async getCharacterComplete(characterId: string) {
    const { data, error } = await supabase
      .from("character_master_view")
      .select("*")
      .eq("character_id", characterId);

    if (error) throw error;

    // Transform the flattened master_view data into nested structure
    if (!data || data.length === 0) {
      throw new Error("Character not found");
    }

    // Group the flat rows back into structured data
    const character = data[0]; // Get base character info from first row

    const result = {
      id: character.character_id,
      name: character.character_name,
      universe: character.universe,
      universe_type: character.universe_type,
      description: character.character_description,
      image_url: character.character_image,
      created_at: character.character_created_at,
      updated_at: character.character_updated_at,
      created_by: character.character_created_by,

      // Abilities (should be same across all rows for a character)
      character_abilities: character.ability_id
        ? [
            {
              id: character.ability_id,
              character_id: character.character_id,
              primary_powers: character.primary_powers || [],
              special_techniques: character.special_techniques || [],
              weaknesses: character.weaknesses || [],
              power_description: character.power_description || "",
              updated_at: character.abilities_updated_at,
            },
          ]
        : [],

      // Events (collect unique events from all rows)
      character_events: data
        .filter((row) => row.event_id)
        .map((row) => ({
          id: row.event_id,
          character_id: row.character_id,
          title: row.event_title,
          description: row.event_description,
          category: row.event_category,
          order_index: row.event_order,
          created_at: row.event_created_at,
        }))
        .filter(
          (event, index, self) =>
            index === self.findIndex((e) => e.id === event.id)
        ), // Remove duplicates

      // Feats (collect unique feats from all rows)
      character_feats: data
        .filter((row) => row.feat_id)
        .map((row) => ({
          id: row.feat_id,
          character_id: row.character_id,
          title: row.feat_title,
          description: row.feat_description,
          power_level: row.feat_power_level,
          difficulty: row.feat_difficulty,
          context: row.feat_context,
          created_at: row.feat_created_at,
        }))
        .filter(
          (feat, index, self) =>
            index === self.findIndex((f) => f.id === feat.id)
        ), // Remove duplicates

      // World info (should be same across all rows for a character)
      character_world_info: character.world_id
        ? [
            {
              id: character.world_id,
              character_id: character.character_id,
              universe_name: character.universe_name,
              universe_description: character.universe_description || "",
              notable_locations: character.notable_locations || [],
              power_system_description:
                character.power_system_description || "",
              scaling_context: character.scaling_context || "",
              updated_at: character.world_updated_at,
            },
          ]
        : [],
    };

    return result;
  },

  /**
   * Search characters with basic info for selectors/dropdowns
   */
  async searchCharacters(searchTerm: string, universeType?: string) {
    let query = supabase
      .from("character_master_view")
      .select(
        "character_id, character_name, universe, universe_type, character_image"
      )
      .ilike("character_name", `%${searchTerm}%`)
      .limit(20);

    if (universeType) {
      query = query.eq("universe_type", universeType);
    }

    const { data, error } = await query;
    if (error) throw error;

    // Transform to expected format and deduplicate
    const uniqueCharacters = new Map();
    data?.forEach((row) => {
      if (!uniqueCharacters.has(row.character_id)) {
        uniqueCharacters.set(row.character_id, {
          id: row.character_id,
          name: row.character_name,
          universe: row.universe,
          universe_type: row.universe_type,
          image_url: row.character_image,
        });
      }
    });

    return Array.from(uniqueCharacters.values());
  },

  /**
   * Get all characters for a specific universe type
   */
  async getCharactersByUniverse(universeType: string) {
    const { data, error } = await supabase
      .from("characters")
      .select("id, name, universe, universe_type, image_url")
      .eq("universe_type", universeType)
      .order("name");

    if (error) throw error;
    return data;
  },

  // ============= PAGE DATA =============

  /**
   * Get complete page data with content and metadata
   * For main content pages (Home, Comics, Anime, etc.)
   */
  async getPageComplete(pageId: string) {
    const { data, error } = await supabase
      .from("pages")
      .select(
        `
        *,
        page_sections(*),
        page_metadata(*)
      `
      )
      .eq("id", pageId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get page with comments for community features
   */
  async getPageWithComments(pageId: string) {
    const { data, error } = await supabase
      .from("pages")
      .select(
        `
        *,
        comments(*),
        page_sections(*)
      `
      )
      .eq("id", pageId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get directory/listing pages with pagination
   */
  async getDirectoryPage(universeType: string, offset = 0, limit = 50) {
    const { data, error } = await supabase
      .from("pages")
      .select(
        `
        *,
        page_sections(*)
      `
      )
      .eq("universe_type", universeType)
      .eq("page_type", "directory")
      .range(offset, offset + limit - 1)
      .order("title");

    if (error) throw error;
    return data;
  },

  // ============= SEARCH DATA =============

  /**
   * Global search across multiple content types
   */
  async globalSearch(searchTerm: string, contentTypes: string[] = []) {
    const searches = [];

    // Search characters
    if (contentTypes.length === 0 || contentTypes.includes("characters")) {
      searches.push(
        supabase
          .from("characters")
          .select("id, name, universe, universe_type, description")
          .or(
            `name.ilike.%${searchTerm}%,universe.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
          )
          .limit(10)
          .then(({ data }) => ({ type: "character", results: data || [] }))
      );
    }

    // Search pages
    if (contentTypes.length === 0 || contentTypes.includes("pages")) {
      searches.push(
        supabase
          .from("pages")
          .select("id, title, description, universe_type, page_type")
          .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
          .limit(10)
          .then(({ data }) => ({ type: "page", results: data || [] }))
      );
    }

    const results = await Promise.all(searches);
    return results.reduce((acc, curr) => {
      acc[curr.type] = curr.results;
      return acc;
    }, {} as Record<string, any[]>);
  },

  // ============= COMMUNITY DATA =============

  /**
   * Get user's posts with engagement data
   */
  async getUserPosts(userId: string, offset = 0, limit = 20) {
    const cacheKey = `user-posts-${userId}-${offset}-${limit}`;

    return await cache.get(
      cacheKey,
      async () => {
        const { data, error } = await supabase
          .from("posts")
          .select(
            `
          *,
          comments(*),
          post_likes(count),
          users(username, avatar_url)
        `
          )
          .eq("user_id", userId)
          .range(offset, offset + limit - 1)
          .order("created_at", { ascending: false });

        if (error) throw error;
        return data;
      },
      5 * 60 * 1000
    ); // 5 minute cache
  },

  /**
   * Get community feed with pagination
   */
  async getCommunityFeed(universeType?: string, offset = 0, limit = 20) {
    let query = supabase
      .from("posts")
      .select(
        `
        *,
        comments(*),
        post_likes(count),
        users(username, avatar_url)
      `
      )
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });

    if (universeType) {
      query = query.eq("universe_type", universeType);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // ============= WIKI DATA =============

  /**
   * Get wiki page with complete content structure
   */
  async getWikiPage(pageSlug: string) {
    const { data, error } = await supabase
      .from("wiki_pages")
      .select(
        `
        *,
        wiki_sections(*),
        wiki_revisions(*),
        wiki_contributors(*)
      `
      )
      .eq("slug", pageSlug)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get recent wiki changes for history/activity feeds
   */
  async getRecentWikiChanges(limit = 50) {
    const { data, error } = await supabase
      .from("wiki_revisions")
      .select(
        `
        *,
        wiki_pages(title, slug),
        users(username, avatar_url)
      `
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  /**
   * Get contributors for a specific wiki page using master view
   */
  async getPageContributors(fullPath: string) {
    const { data, error } = await supabase
      .from("wiki_master_view")
      .select(
        `
        contributor_id,
        page_id,
        contributor_profile_id,
        contribution_count,
        first_contributed_at,
        last_contributed_at,
        contributor_name,
        contributor_username,
        contributor_avatar,
        contributor_verified
      `
      )
      .eq("page_path", fullPath)
      .not("contributor_id", "is", null) // Only get rows with actual contributors
      .order("last_contributed_at", { ascending: false });

    if (error) {
      console.error("Failed to get page contributors:", error);
      return [];
    }

    // Transform the normalized data back to our expected interface
    return (data || []).map((row: any) => ({
      id: row.contributor_id,
      wiki_page_id: row.page_id,
      user_profile_id: row.contributor_profile_id,
      contribution_count: row.contribution_count,
      first_contributed_at: row.first_contributed_at,
      last_contributed_at: row.last_contributed_at,
      user_profiles: {
        id: row.contributor_profile_id,
        display_name: row.contributor_name,
        username: row.contributor_username,
        avatar_url: row.contributor_avatar,
        is_verified: row.contributor_verified,
      },
    }));
  },

  /**
   * Get basic page info using master view (faster than separate queries)
   */
  async getPageInfo(fullPath: string) {
    const { data, error } = await supabase
      .from("wiki_master_view")
      .select(
        `
        page_id,
        page_title,
        page_slug,
        page_path,
        page_type,
        genre,
        page_created_at,
        page_updated_at,
        page_creator_name,
        page_creator_avatar
      `
      )
      .eq("page_path", fullPath)
      .is("contributor_id", null) // Get page info row (not contributor rows)
      .single();

    if (error) {
      console.error("Failed to get page info:", error);
      return null;
    }

    return data;
  },

  /**
   * Get combined page info and contributors in one optimized call
   */
  async getPageWithContributors(fullPath: string) {
    return await cache.get(
      `page-with-contributors-${fullPath}`,
      async () => {
        const [pageInfo, contributors] = await Promise.all([
          this.getPageInfo(fullPath),
          this.getPageContributors(fullPath),
        ]);

        return {
          page: pageInfo,
          contributors: contributors || [],
        };
      },
      10 * 60 * 1000 // 10 minute cache for combined data
    );
  },

  // ============= AUTHENTICATION & USER DATA =============

  /**
   * Get user profile with activity summary
   */
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from("users")
      .select(
        `
        *,
        posts(count),
        comments(count),
        wiki_revisions(count)
      `
      )
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update user profile data with caching invalidation
   */
  async updateUserProfile(userId: string, updates: Record<string, any>) {
    console.log(
      "📝 dataService.updateUserProfile called for userId:",
      userId,
      "updates:",
      updates
    );

    const { data, error } = await supabase
      .from("user_profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.log("❌ dataService.updateUserProfile error:", error);
      throw error;
    }

    // Invalidate relevant cache entries
    console.log("🗑️ Invalidating cache for user:", userId);
    cache.invalidatePattern(`user-${userId}`);
    cache.invalidatePattern(`profile-${userId}`);
    cache.invalidatePattern(`profile-complete-${userId}`);
    console.log("✅ dataService.updateUserProfile success, cache invalidated");

    return data;
  },

  /**
   * Get complete user profile with all related data from master_view
   * Single query to rule them all!
   */
  async getUserProfileComplete(userId: string) {
    const cacheKey = `profile-complete-${userId}`;
    console.log(
      "🔍 dataService.getUserProfileComplete called for userId:",
      userId
    );

    return await cache.get(
      cacheKey,
      async () => {
        console.log(
          "🚀 CACHE MISS - Fetching profile data from master_view for userId:",
          userId
        );

        // Get ALL profile data from master_view in ONE query
        const { data, error } = await supabase
          .from("master_view")
          .select("*")
          .eq("post_author_profile_id", userId); // Use correct column name from master_view

        if (error) {
          console.log("❌ dataService.getUserProfileComplete error:", error);
          throw error;
        }

        if (!data || data.length === 0) {
          // User exists but has no posts - get basic profile from user_profiles
          const { data: profileData, error: profileError } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", userId)
            .single();

          if (profileError) {
            console.log(
              "❌ dataService.getUserProfileComplete profile error:",
              profileError
            );
            throw profileError;
          }

          return {
            ...profileData,
            posts: [],
            follows_followers: [],
            follows_following: [],
          };
        }

        // Transform master_view data to match expected profile structure
        const firstRow = data[0];
        const profileData = {
          id: firstRow.post_author_profile_id,
          username: firstRow.post_author_username,
          display_name: firstRow.post_author_name,
          bio: firstRow.post_author_bio,
          avatar_url: firstRow.post_author_avatar,
          is_verified: firstRow.post_author_verified,
          created_at: firstRow.post_created_at, // Will use first post's creation as fallback
          updated_at: firstRow.post_updated_at,
        };

        // Extract unique posts from the data
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

        const posts = Array.from(postsMap.values());

        // TODO: Add follows data when you need it
        const result = {
          ...profileData,
          posts,
          follows_followers: [], // Will implement when needed
          follows_following: [], // Will implement when needed
        };

        console.log(
          "✅ dataService.getUserProfileComplete success, transformed master_view data"
        );
        return result;
      },
      5 * 60 * 1000
    ); // 5 minute cache
  },
};

export default dataService;
