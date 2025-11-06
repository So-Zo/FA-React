import { PostType, Medium, Genre } from "../Community/hooks/usePosts";
// User's post data structure
export interface UserPost {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  post_type: PostType;
  medium: Medium;
  genre: Genre;
  user_profile_id: string; // Changed from author_id to user_profile_id
  media_ids: string[];
  visibility: "public" | "followers" | "private";
  likes_count: number;
  comments_count: number;
  // Author info comes from view joins, not reconstructed client-side
  author?: {
    id: string;
    display_name: string;
    avatar_url: string;
    is_verified: boolean;
  };
}

// User's activity metrics
export interface UserActivityMetrics {
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
}

// Loading states for different operations
export interface LoadingStates {
  profileDataLoading: boolean;
  userPostsLoading: boolean;
  statsDataLoading: boolean;
}

// Error states for different operations
export interface OperationErrors {
  profileLoadError: Error | null;
  postsLoadError: Error | null;
  statsLoadError: Error | null;
}

// Main profile state interface
export interface ProfileData {
  id: string;
  display_name: string;
  username: string;
  bio: string;
  avatar_url?: string;
  website_url?: string;
  location?: string;
  is_verified?: boolean;
  is_private?: boolean;
}

// Loading and error states for profile data
export interface ProfileState {
  loadingStates: LoadingStates;
  operationErrors: OperationErrors;
  profileData: ProfileData | null;
  activityMetrics: UserActivityMetrics;
  userPosts: UserPost[];
  totalUserPosts: number;
}

// Form input interfaces
export interface ProfileSettingsInputs {
  userDisplayName: string;
  userBio: string;
}

export interface NewPostInputs {
  postTitle: string;
  postContent: string;
  postType: PostType;
  postMedium: Medium;
  postGenre: Genre;
  postTags: string[];
  postVisibility: UserPost["visibility"];
}

export interface ProfileFormsState {
  settingsForm: ProfileSettingsInputs;
  newPostForm: NewPostInputs;
}

// Active section type for profile navigation
export type ProfileSection =
  | "comments"
  | "posts"
  | "work-requests"
  | "settings"
  | "drafts"
  | "notifications";
