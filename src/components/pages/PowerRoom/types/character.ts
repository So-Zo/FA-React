/**
 * Character data types for PowerRoom character comparison
 */

export type UniverseType = "anime" | "comics" | "manga" | "tv" | "games";

export interface Character {
  id: string;
  name: string;
  universe: string;
  universe_type: UniverseType;
  description?: string;
  image_url?: string;

  // Character details - these come from related tables
  abilities: CharacterAbilities;
  timeline: CharacterEvent[];
  world_info: WorldInfo;
  notable_feats: NotableFeat[];

  // Metadata
  created_at: string;
  updated_at: string;
  created_by: string;
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

// For character selection and search
export interface CharacterSearchResult {
  id: string;
  name: string;
  universe: string;
  universe_type: UniverseType;
  image_url?: string;
}

// For comparison state management
export interface CharacterComparison {
  leftCharacter: Character | null;
  rightCharacter: Character | null;
  activeTab: "abilities" | "timelines" | "worlds" | "feats";
}
