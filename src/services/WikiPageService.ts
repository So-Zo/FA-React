import { supabase } from "../lib/supabaseClient";
import { WikiContributor, WikiPage, TipTapContent } from "../types";
import { withCache, cache } from "../utils/cache";
import { WikiContributorService } from "./WikiContributorService";

interface WikiPageHistoryInfo {
  page_id: string;
  page_title: string;
  page_slug: string;
  page_path: string;
  page_type: string;
  genre: string | null;
  page_created_at: string;
  page_updated_at: string;
  page_creator_name: string | null;
  page_creator_avatar: string | null;
}

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
   * Load page-history metadata and contributors for a wiki page path.
   */
  static async getPageWithContributors(fullPath: string): Promise<{
    page: WikiPageHistoryInfo | null;
    contributors: WikiContributor[];
  }> {
    return withCache(
      `page-with-contributors-${fullPath}`,
      async () => {
        try {
          const [page, contributors] = await Promise.all([
            supabase
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
              `,
              )
              .eq("page_path", fullPath)
              .is("contributor_id", null)
              .single(),
            WikiContributorService.getPageContributors(fullPath),
          ]);

          if (page.error) {
            if (page.error.code === "PGRST116") {
              return {
                page: null,
                contributors,
              };
            }

            throw page.error;
          }

          return {
            page: page.data as WikiPageHistoryInfo,
            contributors,
          };
        } catch (error) {
          console.error("Failed to load page history data:", error);
          throw error;
        }
      },
      10 * 60 * 1000,
    );
  }

  /**
   * Save wiki page content
   * Invalidates cache and optionally tracks contributor
   */
  static async saveWikiPage(
    pageId: string,
    _content: TipTapContent,
    userId?: string,
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from("wiki_pages")
        .update({
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
