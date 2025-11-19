/**
 * Centralized type definitions for the entire application
 * Matches database schema exactly
 */

// ============= BASE TYPES =============

export type UniverseType = "anime" | "comics" | "manga" | "tv" | "games";

export type PageType =
  | "home"
  | "directory"
  | "character"
  | "wiki"
  | "community";

export type UserRole = "user" | "moderator" | "admin";

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

  // Related data (from joins)
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

// For search and selection
export interface CharacterSearchResult {
  id: string;
  name: string;
  universe: string;
  universe_type: UniverseType;
  image_url?: string;
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

  // Related data (from joins)
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

// ============= WIKI TYPES =============

export interface WikiPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  is_featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  created_by: string;

  // Related data
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

  // Related data
  users?: User;
  wiki_pages?: Pick<WikiPage, "title" | "slug">;
}

export interface WikiContributor {
  id: string;
  wiki_page_id: string;
  user_id: string;
  contribution_count: number;
  last_contribution: string;

  // Related data
  users?: User;
}

// ============= COMMUNITY TYPES =============

export interface Post {
  id: string;
  title: string;
  content: string;
  universe_type?: UniverseType;
  is_pinned: boolean;
  like_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  user_id: string;

  // Related data
  comments?: Comment[];
  post_likes?: PostLike[];
  users?: User;
}

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

  // Related data
  users?: User;
  replies?: Comment[];
}

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
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

  // Aggregated data (from joins)
  posts?: { count: number }[];
  comments?: { count: number }[];
  wiki_revisions?: { count: number }[];
}

// ============= SEARCH TYPES =============

export interface SearchResult {
  character?: CharacterSearchResult[];
  page?: Pick<
    Page,
    "id" | "title" | "description" | "universe_type" | "page_type"
  >[];
  wiki?: Pick<WikiPage, "id" | "title" | "summary" | "slug">[];
  post?: Pick<Post, "id" | "title" | "content" | "universe_type">[];
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

export interface PostForm {
  title: string;
  content: string;
  universe_type?: UniverseType;
  is_pinned?: boolean;
}

export interface CommentForm {
  content: string;
  parent_comment_id?: string;
}

// ============= COMPONENT PROP TYPES =============

export interface CharacterComparisonProps {
  leftCharacter: Character | null;
  rightCharacter: Character | null;
  activeTab: "abilities" | "timeline" | "worlds" | "feats";
}

export interface TabComponentProps {
  leftCharacter: Character | null;
  rightCharacter: Character | null;
}

// ============= EXPORT ALL =============
export * from "./character"; // Keep existing character types for backwards compatibility
