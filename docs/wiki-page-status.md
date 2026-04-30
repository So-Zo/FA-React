# Wiki Page Migration Status

> Last updated: April 14, 2026  
> Reference implementation: `AnimePage.tsx` (section-based architecture)

## Legend

| Status     | Meaning                                                                  |
| ---------- | ------------------------------------------------------------------------ |
| ✅ MODERN  | Section-based (`useWikiPageSections`, JSONB, per-section TipTap editors) |
| ⚠️ LEGACY  | Single blob (`useWikiPage`, `wikiPage.content`, one WikiEditor)          |
| ❌ MISSING | File doesn't exist yet                                                   |

---

## Anime

| File                 | Route              | Status    | Notes                                                               |
| -------------------- | ------------------ | --------- | ------------------------------------------------------------------- |
| `AnimePage.tsx`      | `/anime`           | ✅ MODERN | **Reference impl.** 9 sections, TableOfContents, optimistic save    |
| `AnimeDirectory.tsx` | `/anime/directory` | ⚠️ LEGACY | Single blob editor, calls `WikiPageService.saveWikiPage()` directly |
| `AnimeHistory.tsx`   | `/anime/history`   | ⚠️ LEGACY | Single blob editor, has PageContributor                             |

## Manga

| File                 | Route              | Status    | Notes                                                    |
| -------------------- | ------------------ | --------- | -------------------------------------------------------- |
| `MangaPage.tsx`      | `/manga`           | ⚠️ LEGACY | Uses `usePageAssets` for hero image (keep); content blob |
| `MangaDirectory.tsx` | `/manga/directory` | ⚠️ LEGACY | Standard legacy pattern                                  |
| `MangaHistory.tsx`   | `/manga/history`   | ⚠️ LEGACY | Standard legacy pattern                                  |

## Comics

| File                  | Route               | Status    | Notes                                                         |
| --------------------- | ------------------- | --------- | ------------------------------------------------------------- |
| `ComicsPage.tsx`      | `/comics`           | ⚠️ LEGACY | Has inline save handler with `try/catch` (console.error only) |
| `ComicsDirectory.tsx` | `/comics/directory` | ⚠️ LEGACY | Standard legacy pattern                                       |
| `ComicsHistory.tsx`   | `/comics/history`   | ⚠️ LEGACY | Standard legacy pattern                                       |

## TV

| File              | Route           | Status    | Notes                   |
| ----------------- | --------------- | --------- | ----------------------- |
| `TVPage.tsx`      | `/tv`           | ⚠️ LEGACY | Standard legacy pattern |
| `TVDirectory.tsx` | `/tv/directory` | ⚠️ LEGACY | Standard legacy pattern |
| `TVHistory.tsx`   | `/tv/history`   | ⚠️ LEGACY | Standard legacy pattern |

## Video Games

| File                      | Route                    | Status    | Notes                   |
| ------------------------- | ------------------------ | --------- | ----------------------- |
| `VideoGamesPage.tsx`      | `/video-games`           | ⚠️ LEGACY | Standard legacy pattern |
| `VideoGamesDirectory.tsx` | `/video-games/directory` | ⚠️ LEGACY | Standard legacy pattern |
| `VideoGamesHistory.tsx`   | `/video-games/history`   | ⚠️ LEGACY | Standard legacy pattern |

## Worlds & Universes

| File                           | Route                         | Status     | Notes                                                   |
| ------------------------------ | ----------------------------- | ---------- | ------------------------------------------------------- |
| `WorldsUniversesPage.tsx`      | `/worlds-universes`           | ⚠️ LEGACY  | No PageContributor (unlike other overview pages)        |
| `WorldsUniversesDirectory.tsx` | `/worlds-universes/directory` | ⚠️ LEGACY  | Has PageContributor                                     |
| `WorldsUniversesHistory.tsx`   | `/worlds-universes/history`   | ❌ MISSING | No file exists — route not registered in App.tsx either |

---

## Migration Plan

The migration from LEGACY → MODERN is a per-medium script job:

1. **Test flow on Anime** — verify sections, render cache, save/discard cycle
2. **Write migration script** — for each LEGACY page:
   - Define sections array (matching the page's expected content structure)
   - Populate `wiki_pages.sections` JSONB from existing... (no `content` column after 006)
   - Populate initial `sections_html` / `sections_meta`
3. **Convert component** — swap `useWikiPage` → `useWikiPageSections`, define sections, wire editors
4. **Repeat per medium** — Manga, Comics, TV, VideoGames, WorldsUniverses

**Order recommendation:** AnimePage (done) → MangaPage → ComicsPage → TVPage → VideoGamesPage → WorldsUniversesPage → then do all Directories → then all Histories

---

## What Makes a Page "MODERN"

Checklist for a fully converted wiki page:

- [ ] Imports `useWikiPageSections` (not `useWikiPage`)
- [ ] Defines `sections` as a `useMemo` array of `{ id: string, title: string }`
- [ ] Section IDs are stable string slugs (e.g. `"the-basics"`, `"history"`)
- [ ] Renders one `<WikiEditor>` per section, keyed by section id
- [ ] Read-only render uses `sectionHtml[section.id]` (pre-rendered HTML, no TipTap mount)
- [ ] Save calls `saveAllSections()` not `WikiPageService.saveWikiPage()`
- [ ] Discard calls `discardChanges()`
- [ ] `hasPendingChanges` drives the save/discard button visibility
- [ ] Has `<TableOfContents>` fed from sections array
- [ ] Has `<PageContributor>` component
