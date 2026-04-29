import { CharacterCategoryKey } from "../../../services/CharacterService";
import { CharacterSearchResult, TipTapContent } from "../../../types";

export type PowerRoomTabId = "abilities" | "timelines" | "worlds" | "feats";

export interface DraftChange {
  content: TipTapContent;
  html: string;
}

export interface PendingCharacterSwap {
  side: "left" | "right";
  nextCharacter: CharacterSearchResult;
  currentCharacterId: string;
  currentCharacterName: string;
  draftCount: number;
}

export const TAB_CATEGORY_MAP: Record<PowerRoomTabId, CharacterCategoryKey> = {
  abilities: "abilities",
  timelines: "timeline",
  worlds: "world_info",
  feats: "notable_feats",
};

export const EMPTY_CONTENT: TipTapContent = {
  type: "doc",
  content: [],
};

export const buildTargetId = (tabId: PowerRoomTabId, characterId: string) =>
  `${tabId}:${characterId}`;

export const isPowerRoomTabId = (
  tabId: string | null,
): tabId is PowerRoomTabId =>
  tabId === "abilities" ||
  tabId === "timelines" ||
  tabId === "worlds" ||
  tabId === "feats";

export const parseTargetId = (targetId: string) => {
  const [tabId, characterId] = targetId.split(":");

  if (!isPowerRoomTabId(tabId) || !characterId) {
    return null;
  }

  return {
    tabId,
    characterId,
  };
};
