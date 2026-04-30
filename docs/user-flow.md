# User Flow Reference

> Covers: Auth, Wiki Read, Wiki Edit/Save, Community Post, Character/PowerRoom  
> Each flow is traced from user action → component → hook → service → database

---

## 1. App Bootstrap

```
Browser loads index.html
  → main.tsx mounts <App />
  → Provider tree wraps everything (order matters):
      ThemeProvider        — dark/light mode, persisted to localStorage
      AuthProvider         — calls supabase.auth.getSession() on mount
        AssetProvider      — loads site-wide hero/banner assets
          EditModeProvider — global edit mode flag (off by default)
            TipTapProvider — shared TipTap extension registry
              AppContent   — lazy-loaded route components
```

Auth state is **synchronous on re-visit** (Supabase restores session from localStorage token) and **async on first load**. `AuthProvider.loading = true` until session resolves — components should check this before gating on `user`.

---

## 2. Authentication Flow

### Sign In

```
User fills LoginPage form
  → supabase.auth.signInWithPassword({ email, password })
  → Supabase returns { session, user }
  → AuthProvider.onAuthStateChange fires
  → setUser(user), setSession(session), setLoading(false)
  → All useAuth() consumers re-render with new user
  → Navigate to previous route or "/"
```

### Sign Out

```
User clicks sign out
  → supabase.auth.signOut()
  → onAuthStateChange fires with session = null
  → setUser(null), setSession(null)
  → Protected pages see user = null
```

### Session Persistence

- Supabase stores JWT in localStorage automatically
- On next app load, `getSession()` restores it without re-login
- Token refresh handled automatically by Supabase client

### Consuming Auth in a Component

```typescript
const { user, session, loading } = useAuth();
// user.id  → UUID for DB queries
// session  → contains access_token if you need raw JWT
```

---

## 3. Wiki Page: Read Flow (Modern / Section-Based)

**Route:** `/anime` → `AnimePage.tsx`

```
AnimePage mounts
  → useWikiPage("/anime")
      → WikiPageService.loadWikiPage("/anime")
          → cache.get("wiki-page-/anime")  [HIT → return cached]
          → supabase.from("wiki_pages").select(id, title, slug, ...).eq("full_path", "/anime")
          → cache.set("wiki-page-/anime", result, 30min TTL)
          → returns WikiPage { id, title, ... }

  → useWikiPageSections(page.id, sections, user?.id)
      → WikiSectionService.loadWikiPageSections(pageId, sectionIds)
          → supabase.from("wiki_pages").select("sections").eq("id", pageId)
          → extracts { "the-basics": TipTapJSON, ... } from JSONB
      → WikiSectionService.loadWikiPageSectionsHtml(pageId, sectionIds)
          → supabase.from("wiki_pages").select("sections_html").eq("id", pageId)
      → WikiSectionService.loadWikiPageSectionsMeta(pageId, sectionIds)
          → supabase.from("wiki_pages").select("sections_meta").eq("id", pageId)
      → returns { sectionContent, sectionHtml, sectionMeta, loading, ... }

Render (read mode, edit mode OFF):
  → For each section: render <div dangerouslySetInnerHTML={sectionHtml[id]} />
  → No TipTap editor mounted — fast, no JS editor overhead
```

---

## 4. Wiki Page: Edit/Save Flow (Modern)

```
User toggles edit mode (GlobalEditMode)
  → EditModeProvider.isEditMode = true
  → WikiEditor mounts TipTap for each section (lazy, on demand)

User edits section "the-basics"
  → TipTap fires onUpdate({ editor })
  → AnimePage calls updateSectionContent("the-basics", content, html)
      → useWikiPageSections stores { content, html } in pendingChanges state
      → NO DB write yet (optimistic local-only update)
      → hasPendingChanges = true → save button becomes visible

User clicks Save
  → saveAllSections() called
      → for each section in pendingChanges (parallel Promise.all):
          → WikiSectionService.saveWikiPageSection(pageId, sectionId, content, html)
              → supabase.rpc("update_wiki_section", { page_id, section_id, section_content, ... })
              → RPC does atomic update: wiki_pages.sections["the-basics"] = content
              → Also writes sections_html and sections_meta
          → WikiContributorService.trackContributor(pageId, userId)
      → pendingChanges cleared
      → cache.invalidateWikiPage(pageId)
      → hasPendingChanges = false → save button hidden

User clicks Discard
  → discardChanges()
  → pendingChanges cleared, local display reverts to last loaded state
```

---

## 5. Wiki Page: Read Flow (Legacy / Blob)

**Routes:** Everything except `/anime` currently

```
e.g. MangaPage mounts
  → useWikiPage("/manga")
      → WikiPageService.loadWikiPage("/manga")  [same as above]
      → returns WikiPage { content: "..." }  [NOW UNDEFINED — column dropped in 006]

Render:
  → wikiPage?.content ? <WikiEditor content={wikiPage.content} /> : null
  → Since content is now undefined, this branch renders nothing
  → These pages will appear blank for content until migrated
```

> ⚠️ These pages are **non-functional for content display** after migration 006 runs.  
> They are intentionally allowed to be blank until the section migration script runs.

---

## 6. Community Post Flow

```
User navigates to /community → CommunityPage
  → Fetches posts via dataService (paginated)
  → Posts rendered as PostCard components

User opens post → /post/:id → PostDetailPage
  → useComments(postId) fetches threaded comments

User creates post (must be logged in):
  → PostCard / form submits → dataService.createPost(...)
  → supabase.from("posts").insert(...)
  → Re-fetches post list

User likes post:
  → supabase.from("likes").insert({ post_id, user_profile_id })
  → likes_count updated
```

---

## 7. Character / PowerRoom Flow

```
User navigates to /characters → CharacterPage
  → Search input → dataService.searchCharacters(query)
      → queries characters table with FTS (search_vector)
      → returns CharacterSearchResult[]

User opens /power-room
  → Selects two characters
  → dataService.getCharacterWithRelations(id) × 2
      → Returns PowerRoomCharacter (abilities, timeline, world_info, notable_feats REQUIRED)
  → CharacterComparison component renders side-by-side tabs
```

---

## 8. Context Provider Dependency Map

```
ThemeProvider          — no deps
  AuthProvider         — no deps (reads supabase directly)
    AssetProvider      — no deps (reads supabase directly)
      EditModeProvider — no deps
        TipTapProvider — no deps
          [routes]
            ProfilePage requires ProfileProvider (scoped, wraps only /profile route)
```

All providers are safe to consume anywhere beneath their level. `useAuth()` throws if called outside `AuthProvider`.

---

## 9. Cache Invalidation Reference

| Action            | Cache key invalidated                         |
| ----------------- | --------------------------------------------- |
| Save wiki section | `wiki-page-${pageId}`                         |
| Save wiki section | `wiki-sections-${pageId}`                     |
| Track contributor | `wiki-contributors-${path}`                   |
| Load wiki page    | Reads `wiki-page-${path}` (30min TTL)         |
| Load sections     | Reads `wiki-sections-${pageId}` (30min TTL)   |
| Load contributors | Reads `wiki-contributors-${path}` (15min TTL) |
