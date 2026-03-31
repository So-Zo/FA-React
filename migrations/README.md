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
