import { WikiPageService } from "./WikiPageService";
import { WikiSectionService } from "./WikiSectionService";
import { WikiContributorService } from "./WikiContributorService";
import { WikiPage, WikiContributor, TipTapContent } from "../types";

/**
 * BACKWARD COMPATIBILITY LAYER
 *
 * This class now acts as a facade/wrapper over the refactored service layer:
 * - WikiPageService: Core page CRUD operations
 * - WikiSectionService: Section-based operations with optimized saves
 * - WikiContributorService: Contributor tracking and retrieval
 *
 * All methods delegate to the appropriate specialized service.
 * Existing code using WikiPageLoader will continue to work without changes.
 *
 * @deprecated Prefer using WikiPageService, WikiSectionService, or WikiContributorService directly
 */
export class WikiPageLoader {
  // ============= PAGE METHODS (delegate to WikiPageService) =============

  static async loadWikiPage(path: string): Promise<WikiPage | null> {
    return WikiPageService.loadWikiPage(path);
  }

  static async saveWikiPage(
    pageId: string,
    content: TipTapContent,
    userId?: string,
  ): Promise<void> {
    return WikiPageService.saveWikiPage(pageId, content, userId);
  }

  // ============= CONTRIBUTOR METHODS (delegate to WikiContributorService) =============

  static async trackContributor(pageId: string, userId: string): Promise<void> {
    return WikiContributorService.trackContributor(pageId, userId);
  }

  static async getPageContributors(
    fullPath: string,
  ): Promise<WikiContributor[]> {
    return WikiContributorService.getPageContributors(fullPath);
  }

  // ============= SECTION METHODS (delegate to WikiSectionService) =============

  static async loadWikiPageSections(
    pageId: string,
    sectionIds: string[],
  ): Promise<Record<string, TipTapContent>> {
    return WikiSectionService.loadWikiPageSections(pageId, sectionIds);
  }

  static async saveWikiPageSection(
    pageId: string,
    sectionId: string,
    content: TipTapContent,
    userId?: string,
  ): Promise<void> {
    return WikiSectionService.saveWikiPageSection(
      pageId,
      sectionId,
      content,
      userId,
    );
  }
}
