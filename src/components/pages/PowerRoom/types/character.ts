/**
 * Character data types for PowerRoom character comparison
 * Extends the main Character type with required relationships for comparison
 */

import {
  Character as BaseCharacter,
  CharacterAbilities,
  CharacterEvent,
  WorldInfo,
  NotableFeat,
} from "../../../../types";

// PowerRoom-specific Character type with required relationships
export interface Character
  extends Omit<
    BaseCharacter,
    "abilities" | "timeline" | "world_info" | "notable_feats"
  > {
  // These are required for character comparison
  abilities: CharacterAbilities;
  timeline: CharacterEvent[];
  world_info: WorldInfo;
  notable_feats: NotableFeat[];
}
