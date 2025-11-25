import { useState, useEffect } from "react";
import { WikiContributor } from "../../../types";
import { dataService } from "../../../services/dataService";
import { withCache } from "../../../utils/cache";

export const usePageContributors = (pageId: string | null) => {
  const [contributors, setContributors] = useState<WikiContributor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributors = async () => {
      if (!pageId) {
        setContributors([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch contributors with user data for the specific page
        const data = await withCache(
          `page-contributors-${pageId}`,
          () => dataService.getPageContributors(pageId),
          5 * 60 * 1000 // 5 minute cache
        );

        setContributors(data || []);
      } catch (err) {
        console.error("Failed to fetch page contributors:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load contributors"
        );
        setContributors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, [pageId]);

  return { contributors, loading, error };
};
