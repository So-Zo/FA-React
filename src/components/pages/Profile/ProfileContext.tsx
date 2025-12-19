import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { profileService } from "./services/profileService";
import { dataService } from "../../../services/dataService";
import { useProfile } from "../../../FaShared/hooks/useProfile";
import {
  ProfileState,
  ProfileData,
  UserActivityMetrics,
  UserPost,
  UserComment,
} from "../../../types";
import { useAuth } from "../../../FaShared/hooks/useAuth";

// Initial state
const initialState: ProfileState = {
  loadingStates: {
    profileDataLoading: false,
    userPostsLoading: false,
    userCommentsLoading: false,
    statsDataLoading: false,
  },
  operationErrors: {
    profileLoadError: null,
    postsLoadError: null,
    commentsLoadError: null,
    statsLoadError: null,
  },
  profileData: null,
  activityMetrics: {
    totalFollowers: 0,
    totalFollowing: 0,
    totalPosts: 0,
  },
  userPosts: [],
  userComments: [],
  totalUserPosts: 0,
  totalUserComments: 0,
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
  | {
      type: "SET_COMMENTS";
      payload: { comments: UserComment[]; totalComments: number };
    }
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
    case "SET_COMMENTS":
      return {
        ...state,
        userComments: action.payload.comments,
        totalUserComments: action.payload.totalComments,
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
  fetchUserComments: (page: number, limit: number) => Promise<void>;
  updateProfileData: (data: Partial<ProfileData>) => Promise<void>;
  createPost: (
    post: Omit<UserPost, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  isOwnProfile: boolean; // Add this to help components know if viewing own profile
}

const ProfileContext = createContext<ProfileContextType | null>(null);

// Provider component
export const ProfileProvider: React.FC<{
  children: React.ReactNode;
  userId?: string;
}> = ({ children, userId }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const targetUserId = userId !== undefined ? userId : user?.id;
  const isOwnProfile = Boolean(
    user && targetUserId && user.id === targetUserId
  );

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refresh,
  } = useProfile(targetUserId || null);

  // Sync profile data to local state when it changes
  useEffect(() => {
    if (profileData) {
      const transformedData = {
        id: profileData.id,
        username: profileData.username,
        display_name: profileData.display_name,
        bio: profileData.bio,
        avatar_url: profileData.avatar_url,
        banner_url: profileData.banner_url,
        created_at: profileData.created_at,
        updated_at: profileData.updated_at,
      };

      const activityMetrics = {
        totalPosts: profileData.posts?.length || 0,
        totalLikes: 0,
        totalFollowers: profileData.follows_followers?.length || 0,
        totalFollowing: profileData.follows_following?.length || 0,
        joinDate: profileData.created_at,
      };

      dispatch({ type: "SET_PROFILE_DATA", payload: transformedData });
      dispatch({ type: "SET_PROFILE_STATS", payload: activityMetrics });
    }
  }, [profileData]);

  // Sync loading state
  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      payload: { key: "profileDataLoading", value: profileLoading },
    });
  }, [profileLoading]);

  // Sync error state
  useEffect(() => {
    dispatch({
      type: "SET_ERROR",
      payload: { key: "profileLoadError", value: profileError },
    });
  }, [profileError]);

  const fetchProfilePosts = useCallback(
    async (page: number, limit: number) => {
      if (!targetUserId) return;

      dispatch({
        type: "SET_LOADING",
        payload: { key: "userPostsLoading", value: true },
      });

      try {
        const { posts, total } = await profileService.getPosts(
          targetUserId, // Use dynamic user ID instead of hardcoded user.id
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
    [targetUserId] // Update dependency to targetUserId instead of user
  );

  const fetchUserComments = useCallback(
    async (page: number, limit: number) => {
      if (!targetUserId) return;

      dispatch({
        type: "SET_LOADING",
        payload: { key: "userCommentsLoading", value: true },
      });

      try {
        const { comments, total } = await profileService.getUserComments(
          targetUserId,
          page,
          limit
        );

        dispatch({
          type: "SET_COMMENTS",
          payload: {
            comments: comments,
            totalComments: total,
          },
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: {
            key: "commentsLoadError",
            value: error instanceof Error ? error : new Error("Unknown error"),
          },
        });
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "userCommentsLoading", value: false },
        });
      }
    },
    [targetUserId]
  );

  const refreshProfileData = useCallback(async () => {
    await refresh();
  }, [refresh]);

  const updateProfileData = useCallback(
    async (data: Partial<ProfileData>) => {
      if (!user || !isOwnProfile) {
        throw new Error("Can only update your own profile");
      }

      try {
        await dataService.updateUserProfile(user.id, data);
        // Refresh to get updated data (cache was invalidated)
        await refresh();
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: {
            key: "profileLoadError",
            value: error instanceof Error ? error : new Error("Unknown error"),
          },
        });
      }
    },
    [user, isOwnProfile, refresh]
  );

  const createPost = useCallback(
    async (post: Omit<UserPost, "id" | "created_at" | "updated_at">) => {
      // Security: Only allow creating posts on your own profile
      if (!user || !isOwnProfile) {
        throw new Error("Can only create posts on your own profile");
      }

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
        fetchUserComments,
        updateProfileData,
        createPost,
        isOwnProfile, // Include isOwnProfile in the context value
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
