import { supabase } from "../lib/supabaseClient";
import {
  CharacterSearchResult,
  PowerRoomCharacter,
  TipTapContent,
  UniverseType,
} from "../types";
import { cache } from "../utils/cache";

interface CharacterMasterViewRow {
  character_id: string;
  character_name: string;
  universe: string;
  universe_type: UniverseType;
  character_description: string | null;
  character_image: string | null;
  character_created_at: string;
  character_updated_at: string;
  character_created_by: string;
  abilities_id: string | null;
  abilities_content: TipTapContent;
  abilities_content_html: string | null;
  abilities_created_at: string | null;
  abilities_updated_at: string | null;
  timeline_id: string | null;
  timeline_content: TipTapContent;
  timeline_content_html: string | null;
  timeline_created_at: string | null;
  timeline_updated_at: string | null;
  feats_id: string | null;
  feats_content: TipTapContent;
  feats_content_html: string | null;
  feats_created_at: string | null;
  feats_updated_at: string | null;
  world_info_id: string | null;
  world_info_content: TipTapContent;
  world_info_content_html: string | null;
  world_info_created_at: string | null;
  world_info_updated_at: string | null;
}

const EMPTY_DOC: TipTapContent = { type: "doc", content: [] };

export type CharacterCategoryKey =
  | "abilities"
  | "timeline"
  | "world_info"
  | "notable_feats";

const CHARACTER_CATEGORY_TABLES: Record<CharacterCategoryKey, string> = {
  abilities: "character_abilities",
  timeline: "character_events",
  world_info: "character_world_info",
  notable_feats: "character_feats",
};

const buildSection = (
  sectionId: string | null,
  characterId: string,
  content: TipTapContent | null,
  contentHtml: string | null,
  createdAt: string | null,
  updatedAt: string | null,
) => ({
  id: sectionId ?? "",
  character_id: characterId,
  content: content ?? EMPTY_DOC,
  content_html: contentHtml ?? "",
  created_at: createdAt ?? updatedAt ?? new Date().toISOString(),
  updated_at: updatedAt ?? createdAt ?? new Date().toISOString(),
});

export class CharacterService {
  static async getCharacterComplete(
    characterId: string,
  ): Promise<PowerRoomCharacter> {
    const { data, error } = await supabase
      .from("character_master_view")
      .select("*")
      .eq("character_id", characterId)
      .single<CharacterMasterViewRow>();

    if (error) throw error;
    if (!data) throw new Error("Character not found");

    return {
      id: data.character_id,
      name: data.character_name,
      universe: data.universe,
      universe_type: data.universe_type,
      description: data.character_description ?? undefined,
      image_url: data.character_image ?? undefined,
      created_at: data.character_created_at,
      updated_at: data.character_updated_at,
      created_by: data.character_created_by,
      abilities: buildSection(
        data.abilities_id,
        data.character_id,
        data.abilities_content,
        data.abilities_content_html,
        data.abilities_created_at,
        data.abilities_updated_at,
      ),
      timeline: buildSection(
        data.timeline_id,
        data.character_id,
        data.timeline_content,
        data.timeline_content_html,
        data.timeline_created_at,
        data.timeline_updated_at,
      ),
      world_info: buildSection(
        data.world_info_id,
        data.character_id,
        data.world_info_content,
        data.world_info_content_html,
        data.world_info_created_at,
        data.world_info_updated_at,
      ),
      notable_feats: buildSection(
        data.feats_id,
        data.character_id,
        data.feats_content,
        data.feats_content_html,
        data.feats_created_at,
        data.feats_updated_at,
      ),
    };
  }

  static async searchCharacters(
    searchTerm: string,
    universeType?: UniverseType,
  ): Promise<CharacterSearchResult[]> {
    let query = supabase
      .from("characters")
      .select("id, name, universe, universe_type, image_url")
      .order("name")
      .limit(20);

    if (searchTerm) {
      query = query.ilike("name", `%${searchTerm}%`);
    }

    if (universeType) {
      query = query.eq("universe_type", universeType);
    }

    const { data, error } = await query;
    if (error) throw error;

    return (data ?? []).map((character) => ({
      id: character.id,
      name: character.name,
      universe: character.universe,
      universe_type: character.universe_type,
      image_url: character.image_url ?? undefined,
    }));
  }

  static async getCharactersByUniverse(
    universeType: UniverseType,
  ): Promise<CharacterSearchResult[]> {
    return this.searchCharacters("", universeType);
  }

  static async saveCharacterCategoryContent(
    characterId: string,
    category: CharacterCategoryKey,
    content: TipTapContent,
    contentHtml: string,
  ): Promise<void> {
    const table = CHARACTER_CATEGORY_TABLES[category];

    const { error } = await supabase.from(table).upsert(
      {
        character_id: characterId,
        content,
        content_html: contentHtml,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "character_id",
      },
    );

    if (error) {
      throw error;
    }

    cache.invalidate(`character-complete-${characterId}`);
  }
}
