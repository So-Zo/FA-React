# Project Architecture Overview

> High-level reference for the FanArcs codebase. For new devs, read this first.

---

## What This Project Is

FanArcs is a community wiki + social platform for anime, manga, comics, TV, games, and fictional universes. Core features:

- **Wiki pages** — structured, editable pages per medium/topic (section-based architecture)
- **Community** — posts, comments, likes, follows (Twitter/Reddit hybrid)
- **PowerRoom** — character comparison tool (abilities, timeline, feats side-by-side)
- **Characters** — searchable character database with full-text search
- **Profiles** — user profiles, activity feed, settings

---

## Tech Stack

| Layer     | Technology                                                   |
| --------- | ------------------------------------------------------------ |
| Frontend  | React 19 + TypeScript + Vite                                 |
| Routing   | React Router v6                                              |
| Rich text | TipTap (ProseMirror-based, JSON output)                      |
| Database  | Supabase (PostgreSQL)                                        |
| Auth      | Supabase Auth (JWT, session stored in localStorage)          |
| Styling   | CSS modules + global CSS (no Tailwind, no styled-components) |
| Build     | Vite with lazy-loaded routes                                 |

---

## Directory Map

```
src/
  App.tsx                    — Route definitions, provider tree
  types/index.ts             — ALL types (single source of truth)
  lib/supabaseClient.ts      — Supabase client singleton

  services/                  — Data access layer (static classes)
    WikiPageService.ts       — Wiki page CRUD (metadata + full page loads)
    WikiSectionService.ts    — Per-section read/write (JSONB operations)
    WikiContributorService.ts — Contributor tracking
    dataService.ts           — Posts, comments, characters, search
    adminService.ts          — Site asset management

  FaShared/
    hooks/                   — Shared React hooks
      AuthProvider.tsx       — Auth state (Supabase session)
      AuthContext.tsx        — Auth context definition
      useAuth.ts             — Hook to consume auth context
      useWikiPage.ts         — Legacy: loads full wiki page blob
      useWikiPageSections.ts — Modern: loads/saves individual sections
      useProfile.ts          — User profile data
      useComments.ts         — Post comments
      EditModeContext.tsx    — Global edit mode toggle
      TipTapContext.tsx      — Shared TipTap extension registry
      ThemeContext.tsx        — Dark/light theme
    Components/              — Shared UI components
    Css/                     — Global/shared stylesheets

  components/
    wiki-pages/              — Wiki page components (per medium)
      Anime/                 — AnimePage (MODERN), AnimeDirectory/History (LEGACY)
      Comics/                — All LEGACY
      Manga/                 — All LEGACY
      TV/                    — All LEGACY
      VideoGames/            — All LEGACY
      WorldsUniverses/       — All LEGACY, History page missing
    pages/                   — Non-wiki pages (auth, community, profile, etc.)

  config/
    wikiRenderer.ts          — Renderer version + content hash utility
    pageAssets.ts            — Page-to-asset mapping

  context/
    AssetContext.tsx         — Site-wide asset loading (hero images, banners)

  utils/
    cache.ts                 — In-memory TTL cache with manual invalidation

migrations/                  — SQL migration files (run in Supabase dashboard)
docs/                        — This directory
```

---

## Key Architecture Decisions

### 1. Sections as JSONB Properties

Wiki sections are stored as `{ "section-id": TipTapJSON }` in a single JSONB column (`wiki_pages.sections`). They are **not** a separate table. This keeps sections as properties of a page, not independent entities — no orphan risk, simpler queries.

### 2. React Controls Section IDs

Section IDs (e.g. `"the-basics"`) are hardcoded in the React component as a memoized array. The DB doesn't generate them. This ensures `#the-basics` anchor links are stable even if section titles change.

### 3. Render Cache Columns

`sections_html` and `sections_meta` cache pre-rendered HTML per section. Read-mode renders static HTML without mounting TipTap. The renderer signature (`WIKI_RENDERER_SIG`) and content hash detect staleness.

### 4. Service Layer Pattern

All DB access goes through static service classes (`WikiPageService`, etc.). Components never call `supabase` directly — they call services via hooks. This makes caching, error handling, and testing consistent.

### 5. In-Memory TTL Cache

`src/utils/cache.ts` provides a simple in-memory cache with TTL and pattern-based invalidation. NOT persisted — clears on page reload. Primarily reduces repeat DB hits during a session.

### 6. Lazy-Loaded Routes

All page components are lazy-loaded via `React.lazy()` in `App.tsx`. Reduces initial bundle size significantly. Suspense boundary shows a loading state during load.

---

## Significant Known Gaps

| Gap                                                             | Where documented                  |
| --------------------------------------------------------------- | --------------------------------- |
| No user-facing error feedback                                   | `docs/error-handling-gaps.md`     |
| 16 wiki pages on legacy blob architecture                       | `docs/wiki-page-status.md`        |
| `WikiSection` type is dead (normalized table abandoned)         | `docs/types-map.md`               |
| `WorldsUniversesHistory` page doesn't exist                     | `docs/wiki-page-status.md`        |
| `SectionDefinition` / `SectionRenderMeta` not in `index.ts`     | `docs/types-map.md`               |
| `saveWikiPage()` `_content` param is intentionally unused       | `src/services/WikiPageService.ts` |
| Optimistic concurrency (conflict detection) not yet implemented | Plan documented in commit history |

---

## Render Versioning

`src/config/wikiRenderer.ts` defines `WIKI_RENDERER_SIG` — bump this string whenever TipTap extensions or render options change in a way that would alter HTML output. This marks all existing `sections_meta` as stale, triggering re-render on next edit.

Current sig: `tiptap-v3-starterkit-link-image-v1`

---

## Route Map

| Path                          | Component                       | Wiki status |
| ----------------------------- | ------------------------------- | ----------- |
| `/`                           | HomePage                        | —           |
| `/anime`                      | AnimePage                       | ✅ MODERN   |
| `/anime/history`              | AnimeHistory                    | ⚠️ LEGACY   |
| `/anime/directory`            | AnimeDirectory                  | ⚠️ LEGACY   |
| `/manga`                      | MangaPage                       | ⚠️ LEGACY   |
| `/manga/history`              | MangaHistory                    | ⚠️ LEGACY   |
| `/manga/directory`            | MangaDirectory                  | ⚠️ LEGACY   |
| `/comics`                     | ComicsPage                      | ⚠️ LEGACY   |
| `/comics/history`             | ComicsHistory                   | ⚠️ LEGACY   |
| `/comics/directory`           | ComicsDirectory                 | ⚠️ LEGACY   |
| `/tv`                         | TVPage                          | ⚠️ LEGACY   |
| `/tv/history`                 | TVHistory                       | ⚠️ LEGACY   |
| `/tv/directory`               | TVDirectory                     | ⚠️ LEGACY   |
| `/video-games`                | VideoGamesPage                  | ⚠️ LEGACY   |
| `/video-games/history`        | VideoGamesHistory               | ⚠️ LEGACY   |
| `/video-games/directory`      | VideoGamesDirectory             | ⚠️ LEGACY   |
| `/worlds-universes`           | WorldsUniversesPage             | ⚠️ LEGACY   |
| `/worlds-universes/directory` | WorldsUniversesDirectory        | ⚠️ LEGACY   |
| `/worlds-universes/history`   | —                               | ❌ MISSING  |
| `/power-room`                 | PowerRoomPage                   | —           |
| `/community`                  | CommunityPage                   | —           |
| `/post/:id`                   | PostDetailPage                  | —           |
| `/profile`                    | ProfilePage (+ ProfileProvider) | —           |
| `/user/:userId`               | UserProfilePage                 | —           |
| `/characters`                 | CharacterPage                   | —           |
| `/login`                      | LoginPage                       | —           |
| `/about`                      | AboutPage                       | —           |
| `/contribute`                 | ContributePage                  | —           |
| `/page-history/:pageId`       | PageHistory                     | —           |
| `/admin`                      | AdminAssetsPage                 | —           |
