import { useState, useEffect, useCallback, useMemo } from "react";
import {
  SectionRenderMeta,
  WikiSectionService,
} from "../../services/WikiSectionService";
import { TipTapContent } from "../../types";

export interface SectionDefinition {
  id: string; // section_id slug like "the-basics"
  title: string; // Display title like "The Basics"
}

export interface UseWikiPageSectionsReturn {
  sectionContent: Record<string, TipTapContent>;
  sectionHtml: Record<string, string>;
  sectionMeta: Record<string, SectionRenderMeta>;
  loading: boolean;
  error: string | null;
  updateSectionContent: (
    sectionId: string,
    content: TipTapContent,
    html: string,
  ) => void;
  saveAllSections: () => Promise<void>;
  discardChanges: () => void;
  hasPendingChanges: boolean;
  hasRenderMismatch: boolean;
  refreshSections: () => Promise<void>;
}

interface PendingSectionChange {
  content: TipTapContent;
  html: string;
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
  const [sectionHtml, setSectionHtml] = useState<Record<string, string>>({});
  const [sectionMeta, setSectionMeta] = useState<
    Record<string, SectionRenderMeta>
  >({});
  const [pendingChanges, setPendingChanges] = useState<
    Record<string, PendingSectionChange>
  >({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch sections from database
  const fetchSections = useCallback(async () => {
    if (!pageId || sections.length === 0) {
      setSectionContent({});
      setSectionHtml({});
      setSectionMeta({});
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const sectionIds = sections.map((s) => s.id);
      const [content, html, meta] = await Promise.all([
        WikiSectionService.loadWikiPageSections(pageId, sectionIds),
        WikiSectionService.loadWikiPageSectionsHtml(pageId, sectionIds),
        WikiSectionService.loadWikiPageSectionsMeta(pageId, sectionIds),
      ]);

      setSectionContent(content);
      setSectionHtml(html);
      setSectionMeta(meta);
    } catch (err) {
      console.error("Failed to load wiki page sections:", err);
      setError(err instanceof Error ? err.message : "Failed to load sections");
      setSectionContent({});
      setSectionHtml({});
      setSectionMeta({});
    } finally {
      setLoading(false);
    }
  }, [pageId, sections]);

  // Load sections on mount and when dependencies change
  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  // NEW: Update local state only (no DB save)
  const updateSectionContent = useCallback(
    (sectionId: string, content: TipTapContent, html: string) => {
      console.log("📋 updateSectionContent called", {
        sectionId,
        content,
        html,
      });
      setPendingChanges((prev) => {
        const updated = {
          ...prev,
          [sectionId]: {
            content,
            html,
          },
        };
        console.log("📋 pendingChanges updated", { prev, updated });
        return updated;
      });
    },
    [],
  );

  // NEW: Save all pending changes to DB
  const saveAllSections = useCallback(async () => {
    console.log("💾 saveAllSections called", {
      pageId,
      pendingChangesCount: Object.keys(pendingChanges).length,
      pendingChanges,
    });

    if (!pageId || Object.keys(pendingChanges).length === 0) {
      console.warn("⚠️ Save skipped - no pageId or no pending changes");
      return;
    }

    try {
      console.log("💾 Saving to DB...");
      // Save all sections in parallel (much faster than sequential)
      await Promise.all(
        Object.entries(pendingChanges).map(([sectionId, change]) =>
          WikiSectionService.saveWikiPageSection(
            pageId,
            sectionId,
            change.content,
            change.html,
            userId,
          ),
        ),
      );

      console.log("✅ DB save complete, merging into local state");
      // Merge pending into saved state
      setSectionContent((prev) => {
        const merged = { ...prev };
        Object.entries(pendingChanges).forEach(([sectionId, change]) => {
          merged[sectionId] = change.content;
        });
        return merged;
      });
      setSectionHtml((prev) => {
        const merged = { ...prev };
        Object.entries(pendingChanges).forEach(([sectionId, change]) => {
          merged[sectionId] = change.html;
        });
        return merged;
      });
      setPendingChanges({}); // Clear pending changes
    } catch (err) {
      console.error("❌ Failed to save sections:", err);
      throw err;
    }
  }, [pageId, pendingChanges, userId]);

  // NEW: Discard pending changes
  const discardChanges = useCallback(() => {
    setPendingChanges({});
  }, []);

  // Merged content for display (saved + pending overrides)
  const displayContent = useMemo(() => {
    const merged = { ...sectionContent };
    Object.entries(pendingChanges).forEach(([sectionId, change]) => {
      merged[sectionId] = change.content;
    });
    return merged;
  }, [sectionContent, pendingChanges]);

  // Refresh sections manually
  const refreshSections = useCallback(async () => {
    await fetchSections();
    setPendingChanges({}); // Clear pending on refresh
  }, [fetchSections]);

  const hasRenderMismatch = useMemo(() => {
    return Object.values(sectionMeta).some((meta) => meta?.status !== "ready");
  }, [sectionMeta]);

  return {
    sectionContent: displayContent,
    sectionHtml,
    sectionMeta,
    loading,
    error,
    updateSectionContent,
    saveAllSections,
    discardChanges,
    hasPendingChanges: Object.keys(pendingChanges).length > 0,
    hasRenderMismatch,
    refreshSections,
  };
};

export default useWikiPageSections;
