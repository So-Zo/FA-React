import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { profileService } from "./services/profileService";
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
  createPost: (
    post: Omit<UserPost, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
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
        const { posts, total } = await profileService.getPosts(
          user.id,
          page,
          limit
        );

        dispatch({
          type: "SET_POSTS",
          payload: {
            posts: posts,
            totalPosts: total,
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

    try {
      // Single call to get both profile data and stats from normalized view
      const { profileData, activityMetrics } =
        await profileService.getCompleteProfileData(user.id);

      dispatch({ type: "SET_PROFILE_DATA", payload: profileData });
      dispatch({ type: "SET_PROFILE_STATS", payload: activityMetrics });
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

  const createPost = useCallback(
    async (post: Omit<UserPost, "id" | "created_at" | "updated_at">) => {
      if (!user) return;

      try {
        await profileService.createPost(post);

        // Refresh both profile stats and posts
        await Promise.all([
          refreshProfileData(),
          fetchProfilePosts(1, 10), // Refresh first page of posts
        ]);
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: {
            key: "postsLoadError",
            value: error instanceof Error ? error : new Error("Unknown error"),
          },
        });
      }
    },
    [user, refreshProfileData, fetchProfilePosts]
  );

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        refreshProfileData,
        fetchProfilePosts,
        updateProfileData,
        createPost,
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
