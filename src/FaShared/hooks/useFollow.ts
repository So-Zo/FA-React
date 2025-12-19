import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "./useAuth";

export const useFollow = (targetUserId: string) => {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  // Check if current user is following target user
  useEffect(() => {
    if (!user || !targetUserId || user.id === targetUserId) return;

    checkFollowStatus();
    fetchFollowersCount();
  }, [user, targetUserId]);

  const checkFollowStatus = async () => {
    if (!user) return;

    try {
      // Use the indexes on follower_id and following_id
      const { data, error } = await supabase
        .from("follows")
        .select("id")
        .eq("follower_id", user.id)
        .eq("following_id", targetUserId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error checking follow status:", error);
        return;
      }

      setIsFollowing(!!data);
    } catch (err) {
      console.error("Follow status check failed:", err);
    }
  };

  const fetchFollowersCount = async () => {
    try {
      // Use the index on following_id for fast count
      const { count, error } = await supabase
        .from("follows")
        .select("*", { count: "exact", head: true })
        .eq("following_id", targetUserId);

      if (error) {
        console.error("Error fetching followers count:", error);
        return;
      }

      setFollowersCount(count || 0);
    } catch (err) {
      console.error("Followers count fetch failed:", err);
    }
  };

  const toggleFollow = async () => {
    if (!user || !targetUserId || user.id === targetUserId || loading) return;

    setLoading(true);

    try {
      if (isFollowing) {
        // Unfollow
        const { error } = await supabase
          .from("follows")
          .delete()
          .eq("follower_id", user.id)
          .eq("following_id", targetUserId);

        if (error) throw error;

        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
      } else {
        // Follow
        const { error } = await supabase.from("follows").insert([
          {
            follower_id: user.id,
            following_id: targetUserId,
          },
        ]);

        if (error) throw error;

        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Toggle follow failed:", err);
      // Revert optimistic update on error
      await checkFollowStatus();
      await fetchFollowersCount();
    } finally {
      setLoading(false);
    }
  };

  return {
    isFollowing,
    loading,
    followersCount,
    toggleFollow,
    canFollow: user && targetUserId && user.id !== targetUserId,
  };
};
