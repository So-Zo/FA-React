# Database Migrations

This folder contains SQL migrations for the FanArcs wiki system.

## Migration Files

### 001_add_sections_jsonb.sql

Adds a `sections` JSONB column to the `wiki_pages` table. This column stores page sections as a JSON object where keys are section IDs and values are TipTap editor content.

**Structure:**

```json
{
  "section-id": {
    "type": "doc",
    "content": [
      /* TipTap JSON nodes */
    ]
  }
}
```

### 002_populate_anime_sections.sql

Populates the Anime wiki page with initial content for all 9 sections defined in `AnimePage.tsx`.

### 003_add_update_section_rpc.sql

Creates an optimized PostgreSQL RPC function `update_wiki_section()` for atomic section updates. This reduces section saves from 2 queries (SELECT + UPDATE) to a single query.

**Performance:** Used by WikiSectionService for efficient section updates without client-side round-trips.

### 004_wiki_rls_and_view.sql

Sets up Row Level Security (RLS) policies for the wiki_pages table. Allows public read access but restricts write operations to authenticated users.

### 005_update_section_rpc_with_result.sql

**CRITICAL:** Updates the `update_wiki_section()` RPC to return a boolean indicating success/failure. This prevents silent failures when RLS blocks unauthenticated updates.

**Before:** RPC returned void, causing silent failures when users weren't logged in (RLS blocked write but no error was thrown).

**After:** RPC returns `true` if rows were updated, `false` if blocked by RLS. Client can now detect and show meaningful error messages.

**Fixes:** "Content not saving after edit" issue caused by hard refresh clearing session tokens, leaving users logged out without knowing it.

### 006_add_section_render_columns.sql

Adds `sections_html` and `sections_meta` JSONB columns to `wiki_pages`.

- `sections_html`: pre-rendered HTML for each section (reader path)
- `sections_meta`: renderer metadata (signature/hash/status timestamps)

This enables dual rendering paths where readers can consume static HTML without mounting TipTap.

### 007_update_section_rpc_for_render_cache.sql

Upgrades `update_wiki_section()` to atomically persist:

- section JSON (`sections`)
- rendered section HTML (`sections_html`)
- render metadata (`sections_meta`)

Returns boolean success/failure so auth/RLS failures remain detectable.

### 008_restructure_character_category_tables.sql

Converts the character detail tables from row-per-item structures into one row per character per category using the wiki-style storage contract:

- `content`: TipTap JSON source
- `content_html`: rendered HTML

The migration:

- drops the old row-based category tables outright
- creates new one-to-one category tables for abilities, world info, timeline, and feats
- does not migrate legacy category content
- rebuilds `character_master_view` as a one-row-per-character read model

**Critical rollout note:** This is a hard cutover migration. Do not run it until the matching app-side `CharacterService` / hook / Power Room updates are ready. The new `character_master_view` no longer matches the current row-based `dataService` expectations.

## Running Migrations

### Option 1: Supabase CLI

```bash
supabase db push
```

### Option 2: SQL Editor (Supabase Dashboard)

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the content of each migration file
4. Run them in order (001, then 002)

### Option 3: psql (Direct PostgreSQL)

```bash
psql -h your-db-host -U your-user -d your-database -f migrations/001_add_sections_jsonb.sql
psql -h your-db-host -U your-user -d your-database -f migrations/002_populate_anime_sections.sql
psql -h your-db-host -U your-user -d your-database -f migrations/003_add_update_section_rpc.sql
psql -h your-db-host -U your-user -d your-database -f migrations/006_add_section_render_columns.sql
psql -h your-db-host -U your-user -d your-database -f migrations/007_update_section_rpc_for_render_cache.sql
```

## Architecture Notes

### Why JSONB Instead of Separate Table?

**Encapsulation:** Sections are properties of a page, not independent entities. Storing them in the parent row maintains conceptual cohesion.

**Stable IDs:** Section IDs are controlled by React components (defined in code), preventing the Wikipedia problem where changing section names breaks bookmarks.

**Independent Editing:** Individual sections can still be updated efficiently using `jsonb_set`.

**Performance:** Indexed JSONB queries are fast, and most pages load all sections anyway.

### Section Structure

Sections are defined in React components:

```typescript
const sections = useMemo(
  () => [
    { id: "the-basics", title: "The Basics" },
    { id: "history-of-anime", title: "History of Anime" },
    // ... more sections
  ],
  [],
);
```

The section order is controlled by React (component-level), not the database. This allows for:

- Stable bookmark URLs (#the-basics always works)
- SEO-friendly section anchors
- Screen reader navigation
- Flexible rearranging without database changes

## Troubleshooting

**Error: column "sections" already exists**

- The migration is idempotent (uses `IF NOT EXISTS`), so it's safe to re-run

**Error: relation "wiki_pages" does not exist**

- Ensure your base wiki_pages table is created first

**Empty sections showing**

- Run migration 002 to populate initial content
- Or enable edit mode and add content manually
