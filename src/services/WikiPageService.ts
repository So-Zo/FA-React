import { supabase } from "../lib/supabaseClient";
import { WikiPage, TipTapContent } from "../types";
import { withCache, cache } from "../utils/cache";
import { WikiContributorService } from "./WikiContributorService";

/**
 * Service for core wiki page CRUD operations
 * Handles single-blob page content loading and saving
 */
export class WikiPageService {
  /**
   * Load a wiki page by its full path (e.g., "/anime", "/anime/history")
   * Returns cached result if available
   */
  static async loadWikiPage(path: string): Promise<WikiPage | null> {
    return withCache(
      `wiki-page-${path}`,
      async () => {
        try {
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
            `,
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
            created_by: data.created_by,
          };
        } catch (error) {
          console.error("Failed to load wiki page:", error);
          throw error;
        }
      },
      30 * 60 * 1000, // 30 minute cache
    );
  }

  /**
   * Save wiki page content
   * Invalidates cache and optionally tracks contributor
   */
  static async saveWikiPage(
    pageId: string,
    content: TipTapContent,
    userId?: string,
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from("wiki_pages")
        .update({
          content,
          updated_at: new Date().toISOString(),
        })
        .eq("id", pageId);

      if (error) throw error;

      // Invalidate page cache
      cache.invalidateWikiPage(pageId);

      // Track contributor if user is logged in
      if (userId) {
        await WikiContributorService.trackContributor(pageId, userId);
      }
    } catch (error) {
      console.error("Failed to save wiki page:", error);
      throw error;
    }
  }
}
