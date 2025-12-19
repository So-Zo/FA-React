import { supabase } from "../lib/supabaseClient";
import { WikiPage, WikiContributor } from "../types";
import { withCache } from "../utils/cache";

// Service class for loading and saving wiki pages
export class WikiPageLoader {
  // Load a wiki page by its full path (e.g., "/anime", "/anime/history")
  static async loadWikiPage(path: string): Promise<WikiPage | null> {
    return withCache(
      `wiki-page-${path}`,
      async () => {
        try {
          // Query the wiki_pages table directly to avoid contributor join issues
          const { data, error } = await supabase
            .from("wiki_pages")
            .select(
              `
              id,
              title,
              slug,
              full_path,
              page_type,
              genre,
              content,
              created_at,
              updated_at,
              created_by
            `
            )
            .eq("full_path", path)
            .single();

          if (error) {
            if (error.code === "PGRST116") {
              // No rows returned - page doesn't exist
              return null;
            }
            throw error;
          }

          return {
            id: data.id,
            title: data.title,
            slug: data.slug,
            full_path: data.full_path,
            page_type: data.page_type,
            genre: data.genre,
            content: data.content,
            created_at: data.created_at,
            updated_at: data.updated_at,
            created_by: data.created_by, // We'll get creator name separately if needed
          };
        } catch (error) {
          console.error("Failed to load wiki page:", error);
          throw error;
        }
      },
      30 * 60 * 1000 // 30 minute cache
    );
  }

  // Save wiki page content and track contributor
  static async saveWikiPage(
    pageId: string,
    content: any,
    userId?: string
  ): Promise<void> {
    try {
      // Update the page content
      const { error: updateError } = await supabase
        .from("wiki_pages")
        .update({
          content,
          updated_at: new Date().toISOString(),
        })
        .eq("id", pageId);

      if (updateError) {
        throw updateError;
      }

      // Track contributor if user is logged in
      if (userId) {
        await this.trackContributor(pageId, userId);
      }
    } catch (error) {
      console.error("Failed to save wiki page:", error);
      throw error;
    }
  }

  // Track or update contributor information
  static async trackContributor(pageId: string, userId: string): Promise<void> {
    try {
      // Try to update existing contributor
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
      // Don't throw here - contributor tracking shouldn't block page saves
    }
  }

  // Get contributors for a wiki page by full path
  static async getPageContributors(
    fullPath: string
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
            `
            )
            .eq("page_path", fullPath)
            .not("contributor_id", "is", null)
            .order("last_contributed_at", { ascending: false });

          if (error) throw error;

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
        } catch (error) {
          console.error("Failed to get page contributors:", error);
          return [];
        }
      },
      15 * 60 * 1000 // 15 minute cache
    );
  }
}
