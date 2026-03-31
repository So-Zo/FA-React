import { useState, useEffect } from "react";
import { WikiContributor } from "../../types";
import { WikiContributorService } from "../../services/WikiContributorService";

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
        // Use WikiContributorService's caching built-in
        const data =
          await WikiContributorService.getPageContributorsById(pageId);

        setContributors(data || []);
      } catch (err) {
        console.error("Failed to fetch page contributors:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load contributors",
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
