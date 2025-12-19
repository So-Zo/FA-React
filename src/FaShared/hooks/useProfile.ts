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

  console.log("🎣 useProfile hook called with userId:", userId);

  // Fetch profile when userId changes
  useEffect(() => {
    console.log("⚡ useProfile useEffect triggered for userId:", userId);

    if (!userId) {
      console.log("❌ useProfile - no userId provided, clearing data");
      setData(null);
      setError(null);
      return;
    }

    let cancelled = false;

    const fetchProfile = async () => {
      console.log("🔄 useProfile - starting fetch for userId:", userId);
      setLoading(true);
      setError(null);

      try {
        // This call is automatically cached by dataService
        const profileData = await dataService.getUserProfileComplete(userId);

        if (!cancelled) {
          console.log("✅ useProfile - profile data received, updating state");
          setData(profileData);
        } else {
          console.log("🚫 useProfile - fetch cancelled, not updating state");
        }
      } catch (err) {
        if (!cancelled) {
          console.log("❌ useProfile - fetch error:", err);
          setError(
            err instanceof Error ? err : new Error("Failed to fetch profile")
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          console.log("🏁 useProfile - fetch completed");
        }
      }
    };

    fetchProfile();

    return () => {
      console.log("🧹 useProfile - cleanup for userId:", userId);
      cancelled = true;
    };
  }, [userId]);

  const refresh = useCallback(async () => {
    if (!userId) {
      console.log("❌ useProfile.refresh - no userId provided");
      return;
    }

    console.log("🔄 useProfile.refresh called for userId:", userId);
    setLoading(true);
    setError(null);

    try {
      const profileData = await dataService.getUserProfileComplete(userId);
      console.log("✅ useProfile.refresh - profile data received");
      setData(profileData);
    } catch (err) {
      console.log("❌ useProfile.refresh - error:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch profile")
      );
    } finally {
      setLoading(false);
      console.log("🏁 useProfile.refresh completed");
    }
  }, [userId]);

  return {
    data,
    loading,
    error,
    refresh,
  };
};
