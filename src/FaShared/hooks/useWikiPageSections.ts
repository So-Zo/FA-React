import { useState, useEffect, useCallback } from "react";
import { WikiSectionService } from "../../services/WikiSectionService";
import { TipTapContent } from "../../types";

export interface SectionDefinition {
  id: string; // section_id slug like "the-basics"
  title: string; // Display title like "The Basics"
}

export interface UseWikiPageSectionsReturn {
  sectionContent: Record<string, TipTapContent>;
  loading: boolean;
  error: string | null;
  saveSectionContent: (
    sectionId: string,
    content: TipTapContent,
  ) => Promise<void>;
  refreshSections: () => Promise<void>;
}

/**
 * Hook to load and manage individual wiki page sections
 *
 * @param pageId - The wiki page ID
 * @param sections - Array of section definitions with id and title
 * @param userId - Current user ID for tracking contributions
 * @returns Object with section content, loading states, and save method
 */
export const useWikiPageSections = (
  pageId: string | null,
  sections: SectionDefinition[],
  userId?: string,
): UseWikiPageSectionsReturn => {
  const [sectionContent, setSectionContent] = useState<
    Record<string, TipTapContent>
  >({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch sections from database
  const fetchSections = useCallback(async () => {
    if (!pageId || sections.length === 0) {
      setSectionContent({});
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const sectionIds = sections.map((s) => s.id);
      const content = await WikiSectionService.loadWikiPageSections(
        pageId,
        sectionIds,
      );
      setSectionContent(content);
    } catch (err) {
      console.error("Failed to load wiki page sections:", err);
      setError(err instanceof Error ? err.message : "Failed to load sections");
      setSectionContent({});
    } finally {
      setLoading(false);
    }
  }, [pageId, sections]);

  // Load sections on mount and when dependencies change
  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  // Save individual section content
  const saveSectionContent = useCallback(
    async (sectionId: string, content: TipTapContent) => {
      if (!pageId) {
        console.warn("Cannot save: no page ID available");
        return;
      }

      const section = sections.find((s) => s.id === sectionId);
      if (!section) {
        console.warn(`Cannot save: section ${sectionId} not found`);
        return;
      }

      try {
        await WikiSectionService.saveWikiPageSection(
          pageId,
          sectionId,
          content,
          userId,
        );

        // Update local state
        setSectionContent((prev) => ({
          ...prev,
          [sectionId]: content,
        }));
      } catch (err) {
        console.error("Failed to save section:", err);
        throw err;
      }
    },
    [pageId, sections, userId],
  );

  // Refresh sections manually
  const refreshSections = useCallback(async () => {
    await fetchSections();
  }, [fetchSections]);

  return {
    sectionContent,
    loading,
    error,
    saveSectionContent,
    refreshSections,
  };
};

export default useWikiPageSections;
