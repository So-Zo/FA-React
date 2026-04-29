import { supabase } from "../lib/supabaseClient";
import { TipTapContent } from "../types";
import { withCache, cache } from "../utils/cache";
import { WikiContributorService } from "./WikiContributorService";
import {
  hashTipTapContent,
  WIKI_RENDERER_SIG,
  WIKI_RENDERER_VERSION,
} from "../config/wikiRenderer";

export interface SectionRenderMeta {
  rendererVersion: string;
  rendererSig: string;
  contentHash: string;
  status: "ready" | "stale" | "regen_failed" | "conflict";
  updatedAt: string;
  updatedBy?: string | null;
  lastErrorCode?: string | null;
}

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
   * Load rendered HTML map keyed by section id.
   */
  static async loadWikiPageSectionsHtml(
    pageId: string,
    sectionIds: string[],
  ): Promise<Record<string, string>> {
    return withCache(
      `wiki-sections-html-${pageId}`,
      async () => {
        try {
          const { data, error } = await supabase
            .from("wiki_pages")
            .select("sections_html")
            .eq("id", pageId)
            .single();

          if (error) throw error;

          const sectionHtmlMap: Record<string, string> = {};

          if (data?.sections_html) {
            sectionIds.forEach((sectionId) => {
              if (data.sections_html[sectionId]) {
                sectionHtmlMap[sectionId] = data.sections_html[sectionId];
              }
            });
          }

          return sectionHtmlMap;
        } catch (error) {
          console.error("Failed to load wiki page section html:", error);
          throw error;
        }
      },
      30 * 60 * 1000,
    );
  }

  /**
   * Load render metadata keyed by section id.
   */
  static async loadWikiPageSectionsMeta(
    pageId: string,
    sectionIds: string[],
  ): Promise<Record<string, SectionRenderMeta>> {
    return withCache(
      `wiki-sections-meta-${pageId}`,
      async () => {
        try {
          const { data, error } = await supabase
            .from("wiki_pages")
            .select("sections_meta")
            .eq("id", pageId)
            .single();

          if (error) throw error;

          const sectionMetaMap: Record<string, SectionRenderMeta> = {};

          if (data?.sections_meta) {
            sectionIds.forEach((sectionId) => {
              if (data.sections_meta[sectionId]) {
                sectionMetaMap[sectionId] = data.sections_meta[sectionId];
              }
            });
          }

          return sectionMetaMap;
        } catch (error) {
          console.error("Failed to load wiki page section metadata:", error);
          throw error;
        }
      },
      30 * 60 * 1000,
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
    html: string,
    userId?: string,
  ): Promise<void> {
    try {
      const contentHash = hashTipTapContent(content);

      console.log("💾 WikiSectionService.saveWikiPageSection", {
        pageId,
        sectionId,
        content,
        html,
        contentHash,
        rendererSig: WIKI_RENDERER_SIG,
      });

      // Use PostgreSQL's jsonb_set to update just this section atomically
      const { data, error } = await supabase.rpc("update_wiki_section", {
        page_id: pageId,
        section_id: sectionId,
        section_content: content,
        section_html: html,
        renderer_version: WIKI_RENDERER_VERSION,
        renderer_sig: WIKI_RENDERER_SIG,
        content_hash: contentHash,
        updated_by: userId ?? null,
      });

      console.log("💾 RPC response", { data, error, errorCode: error?.code });

      // Fallback: if RPC doesn't exist, use client-side merge
      if (error?.code === "42883") {
        console.warn("⚠️ RPC not found, using fallback");
        await this.saveWikiPageSectionFallback(
          pageId,
          sectionId,
          content,
          html,
          contentHash,
          userId,
        );
        return;
      }

      if (error) {
        console.error("❌ RPC error:", error);
        throw new Error(`Failed to save section: ${error.message}`);
      }

      // Check if the update actually happened (data is boolean from RPC)
      if (data === false) {
        throw new Error(
          "Update failed - you may not be logged in or lack permission to edit this page.",
        );
      }

      console.log("✅ RPC succeeded");

      // Track contributor if user is logged in
      if (userId) {
        await WikiContributorService.trackContributor(pageId, userId);
      }

      // Invalidate ALL caches for this page
      cache.invalidateWikiPage(pageId);
    } catch (error) {
      console.error("❌ Failed to save wiki page section:", error);
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
    html: string,
    contentHash: string,
    userId?: string,
  ): Promise<void> {
    // Get current section payloads
    const { data: currentPage } = await supabase
      .from("wiki_pages")
      .select("sections, sections_html, sections_meta")
      .eq("id", pageId)
      .single();

    const currentSections = currentPage?.sections || {};
    const currentSectionsHtml = currentPage?.sections_html || {};
    const currentSectionsMeta = currentPage?.sections_meta || {};

    const updatedSections = {
      ...currentSections,
      [sectionId]: content,
    };
    const updatedSectionsHtml = {
      ...currentSectionsHtml,
      [sectionId]: html,
    };
    const updatedSectionsMeta = {
      ...currentSectionsMeta,
      [sectionId]: {
        rendererVersion: WIKI_RENDERER_VERSION,
        rendererSig: WIKI_RENDERER_SIG,
        contentHash,
        status: "ready",
        updatedAt: new Date().toISOString(),
        updatedBy: userId ?? null,
        lastErrorCode: null,
      } as SectionRenderMeta,
    };

    // Update section payloads and metadata
    const { error } = await supabase
      .from("wiki_pages")
      .update({
        sections: updatedSections,
        sections_html: updatedSectionsHtml,
        sections_meta: updatedSectionsMeta,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pageId);

    if (error) throw error;

    // Track contributor if user is logged in
    if (userId) {
      await WikiContributorService.trackContributor(pageId, userId);
    }

    // Invalidate ALL caches for this page (sections + contributors + page)
    cache.invalidateWikiPage(pageId);
  }
}
