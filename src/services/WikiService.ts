import { supabase } from "../lib/supabaseClient";
import { WikiPage, WikiContributor } from "../types";
import { withCache } from "../utils/cache";

/**
 * WikiService - Unified service for all wiki-related operations
 * Uses wiki_master_view for optimal performance and normalized data
 */
export class WikiService {
  private static readonly CACHE_TTL = {
    PAGE_CONTENT: 30 * 60 * 1000, // 30 minutes
    CONTRIBUTORS: 15 * 60 * 1000, // 15 minutes
    PAGE_LIST: 10 * 60 * 1000, // 10 minutes
    SEARCH: 5 * 60 * 1000, // 5 minutes
  };

  /**
   * Get page content by full path
   */
  static async getPageContent(fullPath: string): Promise<WikiPage | null> {
    return withCache(
      `wiki-page-${fullPath}`,
      async () => {
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
            page_content,
            page_created_at,
            page_updated_at,
            page_creator_name,
            page_creator_avatar
          `
          )
          .eq("page_path", fullPath)
          .is("contributor_id", null)
          .single();

        if (error) {
          console.error("Failed to get page content:", error);
          return null;
        }

        return {
          id: data.page_id,
          title: data.page_title,
          slug: data.page_slug,
          full_path: data.page_path,
          page_type: data.page_type,
          genre: data.genre,
          content: data.page_content,
          created_at: data.page_created_at,
          updated_at: data.page_updated_at,
          created_by: data.page_creator_name,
        };
      },
      this.CACHE_TTL.PAGE_CONTENT
    );
  }

  /**
   * Get contributors for a page
   */
  static async getPageContributors(
    fullPath: string
  ): Promise<WikiContributor[]> {
    return withCache(
      `wiki-contributors-${fullPath}`,
      async () => {
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

        if (error) {
          console.error("Failed to get contributors:", error);
          return [];
        }

        return data.map((row: any) => ({
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
      this.CACHE_TTL.CONTRIBUTORS
    );
  }

  /**
   * Get page and contributors in one optimized call
   */
  static async getPageWithContributors(fullPath: string) {
    return withCache(
      `wiki-page-full-${fullPath}`,
      async () => {
        const [page, contributors] = await Promise.all([
          this.getPageContent(fullPath),
          this.getPageContributors(fullPath),
        ]);

        return {
          page,
          contributors: contributors || [],
        };
      },
      this.CACHE_TTL.PAGE_CONTENT
    );
  }

  /**
   * Search wiki pages
   */
  static async searchPages(
    query: string,
    filters?: {
      pageType?: string;
      genre?: string;
      limit?: number;
    }
  ) {
    return withCache(
      `wiki-search-${query}-${JSON.stringify(filters)}`,
      async () => {
        let dbQuery = supabase
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
            page_creator_name
          `
          )
          .is("contributor_id", null) // Only get page info, not contributor rows
          .textSearch("page_title", query, { type: "websearch" });

        if (filters?.pageType) {
          dbQuery = dbQuery.eq("page_type", filters.pageType);
        }

        if (filters?.genre) {
          dbQuery = dbQuery.eq("genre", filters.genre);
        }

        const { data, error } = await dbQuery
          .order("page_created_at", { ascending: false })
          .limit(filters?.limit || 20);

        if (error) {
          console.error("Search failed:", error);
          return [];
        }

        return data;
      },
      this.CACHE_TTL.SEARCH
    );
  }

  /**
   * Get pages by type (directory, history, etc.)
   */
  static async getPagesByType(pageType: string, genre?: string) {
    return withCache(
      `wiki-pages-${pageType}-${genre || "all"}`,
      async () => {
        let query = supabase
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
            page_updated_at
          `
          )
          .eq("page_type", pageType)
          .is("contributor_id", null);

        if (genre) {
          query = query.eq("genre", genre);
        }

        const { data, error } = await query.order("page_updated_at", {
          ascending: false,
        });

        if (error) {
          console.error("Failed to get pages by type:", error);
          return [];
        }

        return data;
      },
      this.CACHE_TTL.PAGE_LIST
    );
  }

  /**
   * Update page content (with contributor tracking)
   */
  static async updatePageContent(
    fullPath: string,
    content: any,
    userId?: string
  ): Promise<boolean> {
    try {
      // First get the page ID
      const page = await this.getPageContent(fullPath);
      if (!page) {
        throw new Error("Page not found");
      }

      // Update the page content
      const { error: updateError } = await supabase
        .from("wiki_pages")
        .update({
          content,
          updated_at: new Date().toISOString(),
        })
        .eq("id", page.id);

      if (updateError) {
        throw updateError;
      }

      // Track contributor if user is logged in
      if (userId) {
        await this.trackContributor(page.id, userId);
      }

      // Invalidate caches
      this.invalidatePageCaches(fullPath);

      return true;
    } catch (error) {
      console.error("Failed to update page:", error);
      return false;
    }
  }

  /**
   * Track contributor (private method)
   */
  private static async trackContributor(pageId: string, userId: string) {
    try {
      // Try to update existing contributor
      const { data: existing } = await supabase
        .from("wiki_contributors")
        .select("contribution_count")
        .eq("wiki_page_id", pageId)
        .eq("user_profile_id", userId)
        .single();

      if (existing) {
        await supabase
          .from("wiki_contributors")
          .update({
            contribution_count: existing.contribution_count + 1,
            last_contributed_at: new Date().toISOString(),
          })
          .eq("wiki_page_id", pageId)
          .eq("user_profile_id", userId);
      } else {
        await supabase.from("wiki_contributors").insert({
          wiki_page_id: pageId,
          user_profile_id: userId,
          contribution_count: 1,
          first_contributed_at: new Date().toISOString(),
          last_contributed_at: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Failed to track contributor:", error);
      // Don't throw - contributor tracking shouldn't block saves
    }
  }

  /**
   * Invalidate page-related caches
   */
  private static invalidatePageCaches(fullPath: string) {
    // This would be implemented based on your cache utility
    // For now, just log the intention
    console.log(`Invalidating caches for ${fullPath}`);
  }

  /**
   * Prefetch related pages for better UX
   */
  static async prefetchRelatedPages(currentPath: string) {
    const pathParts = currentPath.split("/");
    const basePath = pathParts.slice(0, -1).join("/") || "/";

    // Prefetch sibling pages
    const relatedPaths = [
      `${basePath}/history`,
      `${basePath}/directory`,
      basePath, // parent page
    ].filter((path) => path !== currentPath);

    // Prefetch in background (don't await)
    relatedPaths.forEach((path) => {
      this.getPageContent(path).catch(() => {
        // Silently fail for prefetch
      });
    });
  }
}

export default WikiService;
