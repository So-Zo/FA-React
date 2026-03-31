import { useState, useEffect } from "react";
import { WikiPage } from "../../types";
import { WikiPageService } from "../../services/WikiPageService";

/**
 * Hook to load wiki page content with loading states
 * Uses WikiPageService with built-in caching
 */
export const useWikiPage = (fullPath: string | null) => {
  const [page, setPage] = useState<WikiPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      if (!fullPath) {
        setPage(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const pageData = await WikiPageService.loadWikiPage(fullPath);
        setPage(pageData);
      } catch (err) {
        console.error("Failed to load wiki page:", err);
        setError(err instanceof Error ? err.message : "Failed to load page");
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [fullPath]);

  const refreshPage = async () => {
    if (!fullPath) return;

    setLoading(true);
    setError(null);

    try {
      const pageData = await WikiPageService.loadWikiPage(fullPath);
      setPage(pageData);
    } catch (err) {
      console.error("Failed to refresh wiki page:", err);
      setError(err instanceof Error ? err.message : "Failed to refresh page");
    } finally {
      setLoading(false);
    }
  };

  return {
    page,
    loading,
    error,
    refreshPage,
  };
};

export default useWikiPage;
