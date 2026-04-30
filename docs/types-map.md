# Types Organization

> Single source of truth: `src/types/index.ts`  
> This was a deliberate consolidation from scattered per-file types. Don't undo it.

---

## Current Layout in `index.ts`

Sections in file order:

| Section               | Types                                                                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Base / Primitives** | `UniverseType`, `PageType`, `UserRole`, `TipTapContent`                                                                                                                               |
| **Auth**              | `AuthContextType`                                                                                                                                                                     |
| **Community & Posts** | `PostType`, `Medium`, `Genre`, `SortOption`, `TimeFilter`, `PostQueryOptions`, `Like`, `Post`, `PostLike`                                                                             |
| **Comments**          | `Comment`, `CommentForm`, `UserComment`                                                                                                                                               |
| **Characters**        | `Character`, `CharacterAbilities`, `CharacterEvent`, `WorldInfo`, `NotableFeat`, `CharacterSearchResult`, `CharacterForm`                                                             |
| **PowerRoom**         | `PowerRoomCharacter`, `CharacterComparison`, `CharacterComparisonProps`, `TabComponentProps`                                                                                          |
| **Wiki**              | `WikiPage`, `WikiSection`, `WikiRevision`, `WikiContributor`, `WikiSearchResult`, `WikiSearchOptions`, `WikiEditorRef`                                                                |
| **Pages (generic)**   | `Page`, `PageSection`, `PageMetadata`                                                                                                                                                 |
| **Users**             | `User`                                                                                                                                                                                |
| **Profiles**          | `UserPost`, `UserActivityMetrics`, `LoadingStates`, `OperationErrors`, `ProfileData`, `ProfileState`, `ProfileSettingsInputs`, `NewPostInputs`, `ProfileFormsState`, `ProfileSection` |
| **Reports**           | `Report`, `CreateReportRequest`, `UpdateReportRequest`, `ReportSubmission`                                                                                                            |
| **Search**            | `SearchResult`, `SearchParams`                                                                                                                                                        |
| **API Responses**     | `ApiResponse<T>`, `ApiError`                                                                                                                                                          |
| **Hook Returns**      | `DataHookReturn<T>`, `PaginatedDataHookReturn<T>`                                                                                                                                     |
| **Forms**             | `PostForm`                                                                                                                                                                            |
| **Admin / Assets**    | `AssetType`, `SiteAsset`, `UploadAssetParams`, `UpdateAssetParams`                                                                                                                    |

---

## Exception: Profile Types

Profile-specific types are **intentionally duplicated / kept in `ProfileContext`** per earlier decision. If you're looking for types related to profile context state, check `src/components/pages/Profile/ProfileContext.tsx` too.

---

## Wiki-Specific Types to Know

### `WikiPage`

The DB row. After migration 006, `content` is deprecated and optional. The live storage is `sections` (JSONB) — but that column isn't in this type directly because it's accessed via service, not returned to components.

### `WikiSection`

**Unused currently.** This was from an old normalized-table approach that was abandoned in favor of the JSONB sections column. Dead type — keep for reference or remove in cleanup.

### `SectionDefinition` (not in index.ts yet)

Used internally by `useWikiPageSections` but defined locally in that hook file. Should be promoted to `index.ts` when stable.

```typescript
interface SectionDefinition {
  id: string; // stable slug e.g. "the-basics"
  title: string; // display label, can change without breaking anchors
}
```

### `SectionRenderMeta` (not in index.ts yet)

Also local to `useWikiPageSections`. Tracks render cache validity:

```typescript
interface SectionRenderMeta {
  rendererSig: string; // e.g. "tiptap-v3-starterkit-link-image-v1"
  contentHash: string; // FNV-1a hash of TipTap JSON
  status: "ready" | "stale" | "pending";
  renderedAt: string; // ISO timestamp
}
```

---

## What to Promote to `index.ts` (When Ready)

- [ ] `SectionDefinition` — currently local to `useWikiPageSections`
- [ ] `SectionRenderMeta` — currently local to `useWikiPageSections`
- [ ] `WikiSectionService` return types — currently inline in service file

## What to Clean Up

- [ ] `WikiSection` interface — dead, references normalized table that doesn't exist
- [ ] `WikiEditorRef` — verify it's actually used somewhere or remove
- [ ] `Page` + `PageSection` + `PageMetadata` — the generic `pages` table; confirm if actively used or legacy from early architecture

---

## Import Pattern

All types come from one place:

```typescript
import { WikiPage, TipTapContent, UserRole } from "../types";
// or
import type { SomeType } from "../../types";
```

Never import from a service or component file for types — add it to `index.ts` instead.
