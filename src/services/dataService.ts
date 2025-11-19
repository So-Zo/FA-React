import { supabase } from "../lib/supabaseClient";

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
  async getCharacterComplete(characterId: string) {
    const { data, error } = await supabase
      .from("characters")
      .select(
        `
        *,
        character_abilities(*),
        character_events(*),
        character_world_info(*),
        character_feats(*)
      `
      )
      .eq("id", characterId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Search characters with basic info for selectors/dropdowns
   */
  async searchCharacters(searchTerm: string, universeType?: string) {
    let query = supabase
      .from("characters")
      .select("id, name, universe, universe_type, image_url")
      .ilike("name", `%${searchTerm}%`)
      .limit(20);

    if (universeType) {
      query = query.eq("universe_type", universeType);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
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
};

export default dataService;
