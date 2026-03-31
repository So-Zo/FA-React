import { supabase } from "../lib/supabaseClient";
import { WikiContributor } from "../types";
import { withCache } from "../utils/cache";

/**
 * Service for wiki page contributor tracking and retrieval
 * Consolidates contributor logic from WikiPageLoader and dataService
 */
export class WikiContributorService {
  /**
   * Track or update contributor information
   * Uses upsert pattern to increment contribution count
   * Non-blocking: won't throw errors to avoid blocking saves
   */
  static async trackContributor(pageId: string, userId: string): Promise<void> {
    try {
      // Check if contributor record exists
      const { data: existingContributor } = await supabase
        .from("wiki_contributors")
        .select("contribution_count")
        .eq("wiki_page_id", pageId)
        .eq("user_profile_id", userId)
        .single();

      if (existingContributor) {
        // Update existing contributor
        const { error } = await supabase
          .from("wiki_contributors")
          .update({
            contribution_count: existingContributor.contribution_count + 1,
            last_contributed_at: new Date().toISOString(),
          })
          .eq("wiki_page_id", pageId)
          .eq("user_profile_id", userId);

        if (error) throw error;
      } else {
        // Create new contributor record
        const { error } = await supabase.from("wiki_contributors").insert({
          wiki_page_id: pageId,
          user_profile_id: userId,
          contribution_count: 1,
          first_contributed_at: new Date().toISOString(),
          last_contributed_at: new Date().toISOString(),
        });

        if (error) throw error;
      }
    } catch (error) {
      console.error("Failed to track contributor:", error);
      // Don't throw - contributor tracking shouldn't block page saves
    }
  }

  /**
   * Get contributors for a wiki page by full path
   * Returns array sorted by most recent contribution
   */
  static async getPageContributors(
    fullPath: string,
  ): Promise<WikiContributor[]> {
    return withCache(
      `wiki-contributors-${fullPath}`,
      async () => {
        try {
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
            `,
            )
            .eq("page_path", fullPath)
            .not("contributor_id", "is", null)
            .order("last_contributed_at", { ascending: false });

          if (error) throw error;

          return (data || []).map((row) => ({
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
        } catch (error) {
          console.error("Failed to get page contributors:", error);
          return [];
        }
      },
      15 * 60 * 1000, // 15 minute cache
    );
  }

  /**
   * Get contributors by page ID instead of path
   * Alternative method when you have pageId but not path
   */
  static async getPageContributorsById(
    pageId: string,
  ): Promise<WikiContributor[]> {
    return withCache(
      `wiki-contributors-id-${pageId}`,
      async () => {
        try {
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
            `,
            )
            .eq("page_id", pageId)
            .not("contributor_id", "is", null)
            .order("last_contributed_at", { ascending: false });

          if (error) throw error;

          return (data || []).map((row) => ({
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
        } catch (error) {
          console.error("Failed to get page contributors by ID:", error);
          return [];
        }
      },
      15 * 60 * 1000, // 15 minute cache
    );
  }
}
