import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import {
  ProfileState,
  ProfileData,
  UserActivityMetrics,
  UserPost,
} from "./types";
import { useAuth } from "../../../shared/hooks/useAuth";
import { supabase } from "../../../lib/supabaseClient";

// Initial state
const initialState: ProfileState = {
  loadingStates: {
    profileDataLoading: false,
    userPostsLoading: false,
    statsDataLoading: false,
  },
  operationErrors: {
    profileLoadError: null,
    postsLoadError: null,
    statsLoadError: null,
  },
  profileData: null,
  activityMetrics: {
    totalFollowers: 0,
    totalFollowing: 0,
    totalPosts: 0,
  },
  userPosts: [],
  totalUserPosts: 0,
};

// Action types
type ProfileAction =
  | {
      type: "SET_LOADING";
      payload: { key: keyof ProfileState["loadingStates"]; value: boolean };
    }
  | {
      type: "SET_ERROR";
      payload: {
        key: keyof ProfileState["operationErrors"];
        value: Error | null;
      };
    }
  | { type: "SET_PROFILE_DATA"; payload: ProfileData }
  | { type: "SET_PROFILE_STATS"; payload: UserActivityMetrics }
  | { type: "SET_POSTS"; payload: { posts: UserPost[]; totalPosts: number } }
  | { type: "RESET_STATE" };

// Reducer
function profileReducer(
  state: ProfileState,
  action: ProfileAction
): ProfileState {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loadingStates: {
          ...state.loadingStates,
          [action.payload.key]: action.payload.value,
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        operationErrors: {
          ...state.operationErrors,
          [action.payload.key]: action.payload.value,
        },
      };
    case "SET_PROFILE_DATA":
      return {
        ...state,
        profileData: action.payload,
      };
    case "SET_PROFILE_STATS":
      return {
        ...state,
        activityMetrics: action.payload,
      };
    case "SET_POSTS":
      return {
        ...state,
        userPosts: action.payload.posts,
        totalUserPosts: action.payload.totalPosts,
      };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
}

// Context
interface ProfileContextType extends ProfileState {
  refreshProfileData: () => Promise<void>;
  fetchProfilePosts: (page: number, limit: number) => Promise<void>;
  updateProfileData: (data: Partial<ProfileData>) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

// Provider component
export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const fetchProfilePosts = useCallback(
    async (page: number, limit: number) => {
      if (!user) return;

      dispatch({
        type: "SET_LOADING",
        payload: { key: "userPostsLoading", value: true },
      });

      try {
        const start = (page - 1) * limit;
        const end = start + limit - 1;

        const [postsResult, countResult] = await Promise.all([
          supabase
            .from("posts")
            .select("*")
            .eq("author_id", user.id)
            .range(start, end)
            .order("created_at", { ascending: false }),
          supabase
            .from("posts")
            .select("id", { count: "exact", head: true })
            .eq("author_id", user.id),
        ]);

        if (postsResult.error) throw postsResult.error;
        if (countResult.error) throw countResult.error;

        dispatch({
          type: "SET_POSTS",
          payload: {
            posts: postsResult.data || [],
            totalPosts: countResult.count || 0,
          },
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: {
            key: "postsLoadError",
            value: error instanceof Error ? error : new Error("Unknown error"),
          },
        });
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "userPostsLoading", value: false },
        });
      }
    },
    [user]
  );

  const refreshProfileData = useCallback(async () => {
    if (!user) return;

    dispatch({
      type: "SET_LOADING",
      payload: { key: "profileDataLoading", value: true },
    });
    dispatch({
      type: "SET_LOADING",
      payload: { key: "statsDataLoading", value: true },
    });

    try {
      const [profileResult, statsResult] = await Promise.all([
        supabase.from("user_profiles").select("*").eq("id", user.id).single(),
        supabase.rpc("get_profile_stats", { user_id: user.id }),
      ]);

      if (profileResult.error) throw profileResult.error;
      if (statsResult.error) throw statsResult.error;

      dispatch({ type: "SET_PROFILE_DATA", payload: profileResult.data });
      dispatch({ type: "SET_PROFILE_STATS", payload: statsResult.data });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: {
          key: "profileLoadError",
          value: error instanceof Error ? error : new Error("Unknown error"),
        },
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: { key: "profileDataLoading", value: false },
      });
      dispatch({
        type: "SET_LOADING",
        payload: { key: "statsDataLoading", value: false },
      });
    }
  }, [user]);

  const updateProfileData = useCallback(
    async (data: Partial<ProfileData>) => {
      if (!user) return;

      dispatch({
        type: "SET_LOADING",
        payload: { key: "profileDataLoading", value: true },
      });

      try {
        const { error } = await supabase
          .from("user_profiles")
          .update(data)
          .eq("id", user.id);

        if (error) throw error;

        // Refresh profile data after update
        await refreshProfileData();
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: {
            key: "profileLoadError",
            value: error instanceof Error ? error : new Error("Unknown error"),
          },
        });
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "profileDataLoading", value: false },
        });
      }
    },
    [user, refreshProfileData]
  );

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        refreshProfileData,
        fetchProfilePosts,
        updateProfileData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use the profile context
export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
}
