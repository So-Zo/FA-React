import { supabase } from "../lib/supabaseClient";

// Wiki page interface matching our database schema
export interface WikiPage {
  id: string;
  full_path: string;
  title: string;
  slug: string;
  page_type: string;
  genre?: string;
  content: any; // TipTap JSON content
  created_by?: string;
  created_at: string;
  updated_at: string;
}

// Contributor interface for tracking page edits
export interface WikiContributor {
  user_id: string;
  display_name: string;
  contribution_count: number;
  first_contributed_at: string;
  last_contributed_at: string;
}

// Service class for loading and saving wiki pages
export class WikiPageLoader {
  // Load a wiki page by its full path (e.g., "/anime", "/anime/history")
  static async loadWikiPage(path: string): Promise<WikiPage | null> {
    try {
      const { data, error } = await supabase
        .from("wiki_pages")
        .select("*")
        .eq("full_path", path)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No rows returned - page doesn't exist
          return null;
        }
        throw error;
      }

      return data as WikiPage;
    } catch (error) {
      console.error("Failed to load wiki page:", error);
      throw error;
    }
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

  // Get contributors for a wiki page
  static async getPageContributors(pageId: string): Promise<WikiContributor[]> {
    try {
      const { data, error } = await supabase
        .from("wiki_contributors")
        .select(
          `
          user_profile_id,
          contribution_count,
          first_contributed_at,
          last_contributed_at,
          user_profiles (
            display_name
          )
        `
        )
        .eq("wiki_page_id", pageId)
        .order("contribution_count", { ascending: false });

      if (error) throw error;

      return (data || []).map((contributor: any) => ({
        user_id: contributor.user_profile_id,
        display_name: contributor.user_profiles?.display_name || "Unknown User",
        contribution_count: contributor.contribution_count,
        first_contributed_at: contributor.first_contributed_at,
        last_contributed_at: contributor.last_contributed_at,
      }));
    } catch (error) {
      console.error("Failed to get page contributors:", error);
      return [];
    }
  }
}
