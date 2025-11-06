import { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabaseClient";

/**
 * Get the user_profiles.id for an authenticated user
 * This eliminates the need to use auth.users.id directly throughout the app
 */
export const getProfileId = async (authUser: User): Promise<string> => {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("id", authUser.id) // Assuming user_profiles.id has FK to auth.users.id
    .single();

  if (error) {
    throw new Error(`Failed to get profile ID for user: ${error.message}`);
  }

  if (!data) {
    throw new Error("User profile not found");
  }

  return data.id;
};

/**
 * Get the user_profiles.id for the current authenticated user
 * Throws error if no user is authenticated
 */
export const getCurrentProfileId = async (): Promise<string> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Failed to get current user: ${error.message}`);
  }

  if (!user) {
    throw new Error("No authenticated user found");
  }

  return getProfileId(user);
};

/**
 * Hook to get profile ID from auth context
 * Returns null if user is not authenticated or profile not found
 */
export const useProfileId = (authUser: User | null): string | null => {
  // For now, assuming user_profiles.id equals auth.users.id
  // Once FK relationship is properly established, use getProfileId()
  return authUser?.id || null;
};
