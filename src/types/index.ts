/**
 * =========================================================================
 * SINGLE SOURCE OF TRUTH - ALL APPLICATION TYPES
 * =========================================================================
 * This is the ONLY types file - everything else gets imported from here
 */

import { Session, User as SupabaseUser } from "@supabase/supabase-js";

// ============= BASE TYPES =============

export type UniverseType = "anime" | "comics" | "manga" | "tv" | "games";
export type PageType =
  | "home"
  | "directory"
  | "character"
  | "wiki"
  | "community";
export type UserRole = "user" | "moderator" | "admin";

// ============= AUTH TYPES =============

export interface AuthContextType {
  user: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
}

// ============= COMMUNITY & POSTS TYPES =============

export type PostType =
  | "discussion"
  | "question"
  | "fan-art"
  | "fan-fiction"
  | "world-building"
  | "feedback"
  | "review"
  | "theory"
  | "news"
  | "meme"
  | "cosplay";

export type Medium =
  | "anime"
  | "manga"
  | "comics"
  | "tv"
  | "movies"
  | "games"
  | "books"
  | "other";

export type Genre =
  | "comedy"
  | "horror"
  | "drama"
  | "romance"
  | "action"
  | "adventure"
  | "fantasy"
  | "sci-fi"
  | "other";

export type SortOption =
  | "latest"
  | "trending"
  | "top"
  | "most_commented"
  | "most_liked";

export type TimeFilter = "today" | "this_week" | "this_month" | "all_time";

export interface PostQueryOptions {
  sort?: SortOption;
  timeFilter?: TimeFilter;
  postType?: PostType;
  medium?: Medium;
  genre?: Genre;
  searchQuery?: string;
}

export interface Like {
  id: string;
  user_profile_id: string;
  post_id: string;
  created_at: string;
}

export interface Post {
  id: string;
  created_at: string;
  title: string;
  content: string;
  post_type: PostType;
  medium: Medium;
  genre: Genre;
  tags: string[];
  user_profile_id: string;
  media_ids: string[];
  hashtags: string[];
  mentions: string[];
  likes_count: number;
  comments_count: number;
  reposts_count: number;
  views_count: number;
  is_pinned: boolean;
  is_archived: boolean;
  visibility: "public" | "private" | "followers";
  location?: string;
  updated_at: string;
  author?: {
    id: string;
    display_name: string;
    username: string;
    avatar_url: string;
    is_verified: boolean;
  };
  likes?: Like[];
  isLikedByUser?: boolean;
  media?: Array<{
    id: string;
    file_name: string;
    storage_path: string;
    alt_text?: string;
    blurhash?: string;
  }>;
}

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

// ============= COMMENT TYPES =============

export interface Comment {
  id: string;
  content: string;
  parent_comment_id?: string;
  post_id?: string;
  page_id?: string;
  like_count: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  users?: User;
  replies?: Comment[];
  author?: {
    id: string;
    display_name: string;
    username: string;
    avatar_url?: string;
    is_verified: boolean;
  };
}

export interface CommentForm {
  content: string;
  parent_comment_id?: string;
}

// User comment with post context for profile page
export interface UserComment {
  id: string;
  post_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  post: {
    id: string;
    title: string;
    author: {
      display_name: string;
      avatar_url?: string;
    };
  };
  author: {
    id: string;
    display_name: string;
    avatar_url?: string;
    is_verified: boolean;
  };
}

// ============= CHARACTER TYPES =============

export interface Character {
  id: string;
  name: string;
  universe: string;
  universe_type: UniverseType;
  description?: string;
  image_url?: string;
  search_vector?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  // Related data (from joins) - OPTIONAL for base queries
  abilities?: CharacterAbilities;
  timeline?: CharacterEvent[];
  world_info?: WorldInfo;
  notable_feats?: NotableFeat[];
}

export interface CharacterAbilities {
  id: string;
  character_id: string;
  primary_powers: string[];
  special_techniques: string[];
  weaknesses: string[];
  power_description?: string;
  updated_at: string;
}

export interface CharacterEvent {
  id: string;
  character_id: string;
  title: string;
  description: string;
  order_index: number;
  category?: "origin" | "major_event" | "power_evolution" | "other";
  created_at: string;
}

export interface WorldInfo {
  id: string;
  character_id: string;
  universe_name: string;
  universe_description: string;
  notable_locations: string[];
  power_system_description: string;
  scaling_context?: string;
  updated_at: string;
}

export interface NotableFeat {
  id: string;
  character_id: string;
  title: string;
  description: string;
  power_level: "low" | "medium" | "high" | "extreme";
  difficulty: "easy" | "medium" | "hard" | "extreme";
  context?: string;
  created_at: string;
}

export interface CharacterSearchResult {
  id: string;
  name: string;
  universe: string;
  universe_type: UniverseType;
  image_url?: string;
}

export interface CharacterForm {
  name: string;
  universe: string;
  universe_type: UniverseType;
  description?: string;
  image_url?: string;
  abilities: {
    primary_powers: string[];
    special_techniques: string[];
    weaknesses: string[];
    power_description?: string;
  };
}

// ============= POWERROOM CHARACTER TYPES =============
// PowerRoom needs REQUIRED relationships for comparison

export interface PowerRoomCharacter extends Omit<
  Character,
  "abilities" | "timeline" | "world_info" | "notable_feats"
> {
  // These are REQUIRED for character comparison
  abilities: CharacterAbilities;
  timeline: CharacterEvent[];
  world_info: WorldInfo;
  notable_feats: NotableFeat[];
}

export interface CharacterComparison {
  leftCharacter: PowerRoomCharacter | null;
  rightCharacter: PowerRoomCharacter | null;
  activeTab: "abilities" | "timelines" | "worlds" | "feats";
}

export interface CharacterComparisonProps {
  leftCharacter: PowerRoomCharacter | null;
  rightCharacter: PowerRoomCharacter | null;
  activeTab: "abilities" | "timeline" | "worlds" | "feats";
}

export interface TabComponentProps {
  leftCharacter: PowerRoomCharacter | null;
  rightCharacter: PowerRoomCharacter | null;
}

// ============= WIKI TYPES =============

export interface WikiPage {
  id: string;
  title: string;
  slug: string;
  full_path: string;
  page_type: string;
  genre?: string;
  content: string;
  summary?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  wiki_sections?: WikiSection[];
  wiki_revisions?: WikiRevision[];
  wiki_contributors?: WikiContributor[];
}

export interface WikiSection {
  id: string;
  wiki_page_id: string;
  title: string;
  content: string;
  order_index: number;
  created_at: string;
}

export interface WikiRevision {
  id: string;
  wiki_page_id: string;
  title: string;
  content: string;
  edit_summary?: string;
  is_major_edit: boolean;
  created_at: string;
  created_by: string;
  users?: User;
  wiki_pages?: Pick<WikiPage, "title" | "slug">;
}

export interface WikiContributor {
  id: string;
  wiki_page_id: string;
  user_profile_id: string;
  contribution_count: number;
  first_contributed_at: string;
  last_contributed_at: string;
  user_profiles?: {
    id: string;
    username: string;
    display_name: string;
    avatar_url?: string;
  };
}

export interface WikiSearchResult {
  id: string;
  name: string;
  type: "character" | "world" | "series";
  description?: string;
  tags?: string[];
  created_at: string;
  full_path: string;
}

export interface WikiSearchOptions {
  type?: "character" | "world" | "series" | "all";
  tags?: string[];
  limit?: number;
}

export interface WikiEditorRef {
  getContent: () => string;
  setContent: (content: string) => void;
  focus: () => void;
}

// ============= PAGE/CONTENT TYPES =============

export interface Page {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  page_type: PageType;
  universe_type?: UniverseType;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  page_sections?: PageSection[];
  page_metadata?: PageMetadata;
  comments?: Comment[];
}

export interface PageSection {
  id: string;
  page_id: string;
  title: string;
  content: string;
  order_index: number;
  section_type: "text" | "image" | "gallery" | "list" | "table";
  created_at: string;
}

export interface PageMetadata {
  id: string;
  page_id: string;
  meta_title?: string;
  meta_description?: string;
  keywords: string[];
  canonical_url?: string;
  updated_at: string;
}

// ============= USER TYPES =============

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  role: UserRole;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
  posts?: { count: number }[];
  comments?: { count: number }[];
  wiki_revisions?: { count: number }[];
}

// ============= PROFILE TYPES =============
// NOTE: Profile types stay in Profile folder per user request

export interface UserPost {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  post_type: PostType;
  medium: Medium;
  genre: Genre;
  user_profile_id: string;
  media_ids: string[];
  visibility: "public" | "followers" | "private";
  likes_count: number;
  comments_count: number;
  author?: {
    id: string;
    display_name: string;
    avatar_url: string;
    is_verified: boolean;
  };
}

export interface UserActivityMetrics {
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
}

export interface LoadingStates {
  profileDataLoading: boolean;
  userPostsLoading: boolean;
  userCommentsLoading: boolean;
  statsDataLoading: boolean;
}

export interface OperationErrors {
  profileLoadError: Error | null;
  postsLoadError: Error | null;
  commentsLoadError: Error | null;
  statsLoadError: Error | null;
}

export interface ProfileData {
  id: string;
  display_name: string;
  username: string;
  bio: string;
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

export interface ProfileState {
  loadingStates: LoadingStates;
  operationErrors: OperationErrors;
  profileData: ProfileData | null;
  activityMetrics: UserActivityMetrics;
  userPosts: UserPost[];
  totalUserPosts: number;
  userComments: UserComment[];
  totalUserComments: number;
}

export interface ProfileSettingsInputs {
  userDisplayName: string;
  userBio: string;
  isPrivateProfile: boolean;
  showOnlineStatus: boolean;
  allowTagging: boolean;
  emailNotifications: boolean;
  commentNotifications: boolean;
  followerNotifications: boolean;
  contentNotifications: boolean;
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

export type ProfileSection =
  | "comments"
  | "posts"
  | "work-requests"
  | "settings"
  | "drafts"
  | "notifications";

// ============= REPORT TYPES =============

export interface Report {
  id: string;
  created_at: string;
  resolved_at?: string;
  reporter_id: string;
  reported_user_id: string;
  post_id?: string;
  comment_id?: string;
  reason: string;
  description?: string;
  status: "pending" | "reviewed" | "resolved" | "dismissed";
  moderator_id?: string;
  moderator_notes?: string;
}

export interface CreateReportRequest {
  reported_user_id: string;
  post_id?: string;
  comment_id?: string;
  reason: string;
  description?: string;
}

export interface UpdateReportRequest {
  status: Report["status"];
  moderator_notes?: string;
}

export interface ReportSubmission {
  reason: string;
  description?: string;
}

// ============= SEARCH TYPES =============

export interface SearchResult {
  character?: CharacterSearchResult[];
  page?: Pick<
    Page,
    "id" | "title" | "description" | "universe_type" | "page_type"
  >[];
  wiki?: Pick<WikiPage, "id" | "title" | "summary" | "slug">[];
  post?: Pick<Post, "id" | "title" | "content">[];
}

export interface SearchParams {
  query: string;
  contentTypes?: ("character" | "page" | "wiki" | "post")[];
  universeType?: UniverseType;
  limit?: number;
  offset?: number;
}

// ============= API RESPONSE TYPES =============

export interface ApiResponse<T> {
  data: T;
  error: null;
  status: number;
}

export interface ApiError {
  data: null;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
  status: number;
}

// ============= HOOK RETURN TYPES =============

export interface DataHookReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch?: () => void;
}

export interface PaginatedDataHookReturn<T> extends DataHookReturn<T[]> {
  hasMore: boolean;
  loadMore: () => void;
  page: number;
}

// ============= FORM TYPES =============

export interface PostForm {
  title: string;
  content: string;
  universe_type?: UniverseType;
  is_pinned?: boolean;
}

// ============= ADMIN / SITE ASSETS TYPES =============

export type AssetType =
  | "hero"
  | "logo"
  | "banner"
  | "icon"
  | "thumbnail"
  | "background"
  | "other";

export interface SiteAsset {
  id: string;
  file_name: string;
  storage_path: string;
  public_url: string;
  asset_type: AssetType;
  page_section: string | null;
  alt_text: string | null;
  width?: number;
  height?: number;
  file_size?: number;
  mime_type?: string;
  uploaded_by?: string;
  created_at: string;
  updated_at: string;
}

export interface UploadAssetParams {
  file: File;
  assetType: AssetType;
  altText?: string;
  pageSection?: string;
}

export interface UpdateAssetParams {
  assetId: string;
  altText?: string;
  pageSection?: string;
  assetType?: AssetType;
}

// ============= EXPORT ALL =============
