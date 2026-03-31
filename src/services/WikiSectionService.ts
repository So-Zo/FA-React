import { supabase } from "../lib/supabaseClient";
import { TipTapContent } from "../types";
import { withCache, cache } from "../utils/cache";
import { WikiContributorService } from "./WikiContributorService";

/**
 * Service for section-based wiki page operations
 * Handles JSONB sections field for granular editing
 */
export class WikiSectionService {
  /**
   * Load multiple wiki page sections from JSONB sections field
   * Returns a map of section_id -> content for requested sections
   */
  static async loadWikiPageSections(
    pageId: string,
    sectionIds: string[],
  ): Promise<Record<string, TipTapContent>> {
    return withCache(
      `wiki-sections-${pageId}`,
      async () => {
        try {
          const { data, error } = await supabase
            .from("wiki_pages")
            .select("sections")
            .eq("id", pageId)
            .single();

          if (error) throw error;

          // sections is a JSONB object: { "the-basics": {...}, "history": {...} }
          // Filter to only requested sections
          const sectionMap: Record<string, TipTapContent> = {};
          if (data?.sections) {
            sectionIds.forEach((sectionId) => {
              if (data.sections[sectionId]) {
                sectionMap[sectionId] = data.sections[sectionId];
              }
            });
          }

          return sectionMap;
        } catch (error) {
          console.error("Failed to load wiki page sections:", error);
          throw error;
        }
      },
      30 * 60 * 1000, // 30 minute cache
    );
  }

  /**
   * Save or update a single wiki page section in JSONB sections field
   * OPTIMIZED: Uses PostgreSQL jsonb_set in a single query (no SELECT first)
   */
  static async saveWikiPageSection(
    pageId: string,
    sectionId: string,
    content: TipTapContent,
    userId?: string,
  ): Promise<void> {
    try {
      // Use PostgreSQL's jsonb_set to update just this section atomically
      // COALESCE ensures we handle NULL sections field gracefully
      const { error } = await supabase.rpc("update_wiki_section", {
        page_id: pageId,
        section_id: sectionId,
        section_content: content,
      });

      // Fallback: if RPC doesn't exist, use client-side merge (less efficient)
      if (error?.code === "42883") {
        // Function doesn't exist
        console.warn(
          "update_wiki_section RPC not found, using fallback method",
        );
        await this.saveWikiPageSectionFallback(
          pageId,
          sectionId,
          content,
          userId,
        );
        return;
      }

      if (error) throw error;

      // Track contributor if user is logged in
      if (userId) {
        await WikiContributorService.trackContributor(pageId, userId);
      }

      // Invalidate cache for this page's sections
      cache.invalidateWikiPageSections(pageId);
    } catch (error) {
      console.error("Failed to save wiki page section:", error);
      throw error;
    }
  }

  /**
   * Fallback method: client-side merge (requires SELECT then UPDATE)
   * Less efficient but works without custom database function
   */
  private static async saveWikiPageSectionFallback(
    pageId: string,
    sectionId: string,
    content: TipTapContent,
    userId?: string,
  ): Promise<void> {
    // Get current sections
    const { data: currentPage } = await supabase
      .from("wiki_pages")
      .select("sections")
      .eq("id", pageId)
      .single();

    const currentSections = currentPage?.sections || {};
    const updatedSections = {
      ...currentSections,
      [sectionId]: content,
    };

    // Update the sections field
    const { error } = await supabase
      .from("wiki_pages")
      .update({
        sections: updatedSections,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pageId);

    if (error) throw error;

    // Track contributor if user is logged in
    if (userId) {
      await WikiContributorService.trackContributor(pageId, userId);
    }

    // Invalidate cache
    cache.invalidateWikiPageSections(pageId);
  }
}
