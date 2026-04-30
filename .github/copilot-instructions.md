# FanArcs Project Guidelines

## Architecture Principles

### Abstract Concepts, Not Code Patterns

**Trigger for abstraction:** The same domain concept appears in multiple contexts, not just similar-looking code.

Example: "Wiki page persistence" is a concept that appeared across multiple features → extract `WikiPageService`. But multiple pages calling that service is _correct reuse_, not repetition.

**Key distinction:**

- Repetition of concept → Abstract it
- Reuse of abstraction → Correct usage, don't over-abstract

Avoid creating abstractions when you can't hand them off cleanly due to dependencies or coupling issues.

### Model Real-World Relationships

Structure data to reflect how the domain actually works, not just database normalization rules.

**Decision framework:** "Is this a property/characteristic of the parent, or an independent entity?"

- Properties belong to the parent → Nest/embed (JSONB, arrays)
- Independent lifecycle → Separate table

Example: Wiki page sections are **properties of a page** (stored in `wiki_pages.sections` JSONB), not independent entities. This prevents orphaned data and maintains conceptual integrity.

### Optimize for Change Over Perfection

Choose solutions based on **best possible trade-off**, not theoretical purity:

- Quick to implement
- Creates separation of concerns
- Makes future refactors easier (loose coupling)
- Can evolve without breaking existing code

**Strategy:** Create escape hatches and migration paths for complex refactors, but complete migrations fully to avoid technical debt.

### Control Structural Logic in Application Layer

Database handles **non-structural operations**:

- Auto-incrementing IDs, random UUIDs
- Counts, aggregations, simple calculations
- Hashing, encryption
- Triggers for audit logging

Application controls **structural/domain logic**:

- Ordering and sequencing (when stability matters)
- Business rules and validation
- State transitions and workflows
- Critical invariants (like stable bookmark IDs)

**Rule of thumb:** If changing it would break user expectations or external references, control it in the app.

### Minimize Shortcuts Through Scoped Changes

**Goal:** Each iteration should be clean and productive, minimizing noted shortcuts. Small, focused changes make this achievable because:

- Easier to get right the first time
- Less temptation to take shortcuts
- Faster feedback loops catch issues early

**Reality:** Nothing works perfectly on first/second try. FinalCleanup.md exists for genuine shortcuts, but prefer designs that don't need them.

### Defensive Implementation Practices

Prefer explicit over automatic when reliability matters:

- Manual `useMemo`/`useCallback` over relying on compiler optimization
- Explicit cache invalidation (`cache.invalidateWikiPage()`) over automatic detection
- Defined dependencies in hooks over implicit detection
- Clear error boundaries over hope-based error handling

### Centralized Pragmatic `any` Usage

When TypeScript typing is complex or unstable (like TipTap's JSON structure), create semantic type aliases instead of scattering `any` everywhere:

```typescript
// ✅ Good - Centralized, searchable, upgradeable
export type TipTapContent = any;

// ❌ Bad - Scattered anys with no semantic meaning
function save(content: any) {}
```

## Workflow & Interaction Guidelines

### Change Philosophy

**Prioritize small, targeted changes over large sweeping edits or file replacements.** Break work into incremental steps with natural pause points for feedback. If a change requires touching 5+ files or replacing entire file contents, stop and propose the plan first.

### Permission Model

**Never make changes that weren't explicitly requested without confirming first.** If you notice something that needs fixing (broken pattern, missing cache invalidation, etc.), ask:

- "I notice X needs fixing - should I add that to the task list?"
- "This would also benefit from Y - want me to include that?"

### Recovery Protocol

**NEVER replace an entire file.** If refactoring gets complex enough that full file replacement seems necessary, STOP and explain:

- "This requires substantial restructuring. I need user action to undo and redo this integration safely."
- Break the change into smaller diffs or propose an alternative approach

### Communication Tone

Assume senior developer reviewing for engineering principles. Explain **trade-offs and implications**, not just mechanics. Focus on maintainability, conceptual clarity, and long-term consequences of decisions.

### Explanation Style

Explain refactors and feature options assuming the user is intelligent but not formally trained. Lead with a plain-English explanation first, then expand only if needed. Prioritize clarity and directness over long, verbose, or overly contextual explanations.

## Code Style

### High-Level Understanding First

Focus on **why** architecture decisions were made, not just syntax. Comments should explain the reasoning behind non-obvious choices, especially trade-offs.

### FinalCleanup.md Pattern

Non-critical tech debt goes in `FinalCleanup.md` at the project root. This allows shipping working code without blocking on polish tasks like:

- Type refinements (`any` → proper types)
- Performance micro-optimizations
- Documentation improvements

**Purpose:** Pragmatic progress tracking without slowing iteration. Review before production deployment.

### Commit Discipline

Refactors should be committed **before** adding new features. Keep git history clean and semantically grouped:

```bash
# ✅ Good
git commit -m "refactor: split WikiPageLoader into services"
git commit -m "feat: add section-based editing to AnimePage"

# ❌ Bad
git commit -m "misc changes and new feature"
```

## Technology Stack

### React 19

- Using React Compiler hooks rules but with defensive manual memoization
- TipTap editor for rich text (WYSIWYG with JSON output)
- Custom hooks pattern: `use[Feature]` for data, components consume hooks

### Supabase (PostgreSQL)

- JSONB for nested/property data (sections, metadata)
- Row Level Security (RLS) policies for auth
- Custom caching layer (`src/utils/cache.ts`) with TTL and pattern invalidation
- Optimized queries with indexing (GIN indexes on JSONB columns)

### Service Layer Pattern

Services are static classes with focused responsibilities:

- `WikiPageService`: Core CRUD for full pages
- `WikiSectionService`: Section-specific operations with optimized saves
- `WikiContributorService`: Contributor tracking and retrieval

Hooks wrap services and manage React state/effects.

## Project-Specific Patterns

### Wiki Section Architecture

- **Storage:** JSONB object in `wiki_pages.sections` column: `{ "section-id": TipTapContent }`
- **Component control:** Section IDs, titles, and order defined in React components (memoized)
- **Stable bookmarks:** `#the-basics` anchor always works even if title changes
- **Granular editing:** Individual sections update without loading entire page
- **Optimization:** PostgreSQL RPC `update_wiki_section()` for atomic updates (fallback method if RPC unavailable)

### Cache Strategy

- Page-level: `wiki-page-${path}` (30min TTL)
- Section-level: `wiki-sections-${pageId}` (30min TTL)
- Contributors: `wiki-contributors-${path}` (15min TTL)
- Manual invalidation on writes: `cache.invalidateWikiPage(pageId)`

### Type Definitions

- Centralized in `src/types/index.ts`
- Service-specific types co-located with service files when appropriate
- Semantic aliases preferred over direct `any` usage

## Don't Do This

- ❌ Adding separate normalized tables when data is a **property** of parent entity
- ❌ Letting database control ordering/IDs when React needs stability
- ❌ Blocking progress on perfect TypeScript types (use semantic aliases, track in FinalCleanup.md)
- ❌ Forgetting to invalidate cache after database writes
- ❌ Mixing multiple concerns in one commit
- ❌ Using both `copilot-instructions.md` and `AGENTS.md` (choose one)
- ❌ Making large sweeping changes across many files without breaking into steps
- ❌ Replacing entire files instead of targeted edits
- ❌ Fixing issues that weren't requested without asking first

## References

- Architecture decisions: See commit messages for refactors (git log)
- Database schema: `migrations/` folder with detailed README
- Service patterns: `src/services/` (WikiPageService, WikiSectionService, WikiContributorService)
- Component patterns: `src/components/wiki-pages/Anime/AnimePage.tsx` (section-based architecture)
