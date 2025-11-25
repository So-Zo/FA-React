// Profile-specific types
export interface ProfileData {
  id: string;
  username: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  banner_url?: string;
  website_url?: string;
  location?: string;
  is_verified?: boolean;
  is_private?: boolean;
  show_online_status?: boolean;
  email_notifications?: boolean;
  comment_notifications?: boolean;
  follower_notifications?: boolean;
  content_notifications?: boolean;
  last_seen?: string;
  created_at: string;
  updated_at: string;
}

export interface UserActivityMetrics {
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
  totalLikes?: number;
}

export interface UserPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  post_type: string;
  medium?: string;
  genre?: string;
  tags: string[];
  visibility: "public" | "private" | "followers";
  user_profile_id: string;
  media_ids: string[];
  likes_count: number;
  comments_count: number;
  author?: {
    id: string;
    display_name: string;
    avatar_url?: string;
    is_verified: boolean;
  };
}

export interface ProfileState {
  loadingStates: {
    profileDataLoading: boolean;
    userPostsLoading: boolean;
    statsDataLoading: boolean;
  };
  operationErrors: {
    profileLoadError: Error | null;
    postsLoadError: Error | null;
    statsLoadError: Error | null;
  };
  profileData: ProfileData | null;
  activityMetrics: UserActivityMetrics;
  userPosts: UserPost[];
  totalUserPosts: number;
}
