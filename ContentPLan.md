# Content Structure Refactor Plan

**Goal:** Move from single-blob wiki pages to section-based architecture with explicit control over HTML structure, ordering, and styling.

---

## Current Architecture (BROKEN)

- Single `content` column in `wiki_pages` table
- One giant TipTap JSON blob
- No control over section order or HTML structure
- Content got accidentally wiped (AnimePage = empty paragraph 💀)

## New Architecture (TARGET)

### Component Level

```tsx
// AnimePage.tsx defines sections explicitly
const sections = [
  { id: "the-basics", title: "The Basics" },
  { id: "history-of-anime", title: "History of Anime" },
  { id: "terminology-guide", title: "Terminology Guide" },
];

// Hook fetches sections individually
const { sectionContent, loading, saveSectionContent } = useWikiPageSections(
  "/anime",
  sections,
);

// Render each section with full HTML control
{
  sections.map((section) => (
    <section id={section.id} className="dynamic-section" key={section.id}>
      <WikiEditor
        content={sectionContent[section.id]}
        onUpdate={(content) => saveSectionContent(section.id, content)}
      />
    </section>
  ));
}
```

### Database Level

```sql
-- wiki_sections table (already exists?)
- id (uuid)
- wiki_page_id (uuid) → foreign key to wiki_pages
- section_id (text) → e.g. "the-basics", "history-of-anime"
- title (text)
- content (jsonb) → TipTap JSON for THIS section only
- order_index (integer) → ignored, order controlled by component
- created_at, updated_at
```

---

## Files We Need to Check/Alter (In Order)

### 1. Database Schema

- [ ] `src/types/index.ts` - WikiSection interface (verify structure)
- [ ] Check if `wiki_sections` table exists in Supabase
- [ ] Verify foreign keys and RLS policies

### 2. Data Layer

- [ ] `src/services/WikiPageLoader.ts` - Add methods:
  - `loadWikiPageSections(pageId, sectionIds[])`
  - `saveWikiPageSection(pageId, sectionId, content)`
- [ ] `src/FaShared/hooks/useWikiPageSections.ts` - NEW HOOK

### 3. Component Layer

- [ ] `src/components/wiki-pages/Anime/AnimePage.tsx` - First implementation
- [ ] Test with AnimePage (content already wiped, perfect clean slate)
- [ ] Roll out to other pages after validation

### 4. Cache Layer

- [ ] `src/utils/cache.ts` - Support section-based caching
  - Cache individual sections: `wiki-section-${pageId}-${sectionId}`
  - Invalidation patterns

---

## Implementation Steps

### Step 1: Define WikiSection Type

Verify/update the WikiSection interface in types/index.ts

### Step 2: Create useWikiPageSections Hook

New hook that:

- Takes pageId and section definitions
- Fetches each section from `wiki_sections` table
- Returns object: `{ sectionContent: Record<string, TipTapJSON>, loading, error }`
- Provides save method per section

### Step 3: Update WikiPageLoader

Add methods to load/save individual sections instead of the whole page blob

### Step 4: Refactor AnimePage

- Define sections array in component
- Use new hook
- Map over sections with full HTML control
- Test thoroughly

### Step 5: Migrate Other Pages

Once AnimePage works, roll out to all wiki pages

---

## Benefits of New Architecture

✅ **Full HTML control** - You define `<section>`, classes, structure
✅ **Section-level editing** - Edit one section without loading entire page
✅ **Better caching** - Cache sections individually
✅ **Easier to manage** - Each section is isolated
✅ **No more accidental wipes** - Sections are separate DB rows
✅ **Order control** - Order defined in component, not database

---

## Current Status

- AnimePage content wiped in DB (perfect clean slate!)
- React Compiler warnings fixed (dependency arrays corrected)
- Ready to start refactor
