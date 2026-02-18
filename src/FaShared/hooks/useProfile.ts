import { useState, useEffect, useCallback } from "react";
import { dataService } from "../../services/dataService";

/**
 * Hook that fetches user profile data with automatic caching
 * Prevents redundant fetches - data is cached for 5 minutes
 */
export const useProfile = (userId: string | null) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch profile when userId changes
  useEffect(() => {
    if (!userId) {
      setData(null);
      setError(null);
      return;
    }

    let cancelled = false;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        // This call is automatically cached by dataService
        const profileData = await dataService.getUserProfileComplete(userId);

        if (!cancelled) {
          setData(profileData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err : new Error("Failed to fetch profile")
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const refresh = useCallback(async () => {
    if (!userId) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const profileData = await dataService.getUserProfileComplete(userId);
      setData(profileData);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch profile")
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    data,
    loading,
    error,
    refresh,
  };
};
