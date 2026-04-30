# Error Handling Gaps

> This is a known weakness across the project. Document it, plan for it, don't block shipping on it.

---

## Current State

### What exists

- Services log to `console.error` and re-throw (`throw error`)
- Hooks catch thrown errors and set `error: string | null` state
- Components receive `error` string from hooks but the UX response varies

### What's missing almost everywhere

**There is no standardized user-facing error feedback UI.**  
Errors surface to `console.error` or to an `error` string in state that most components don't render visibly.

---

## Gap Inventory by Layer

### Services (WikiPageService, WikiSectionService, WikiContributorService)

| Method                   | Error handling                               | User sees anything?                       |
| ------------------------ | -------------------------------------------- | ----------------------------------------- |
| `loadWikiPage()`         | `console.error`, re-throws                   | No — hook catches it, sets `error` string |
| `saveWikiPage()`         | `console.error`, re-throws                   | No                                        |
| `loadWikiPageSections()` | `console.error`, re-throws                   | No                                        |
| `saveWikiPageSection()`  | `console.error`, throws custom message       | No                                        |
| `trackContributor()`     | `console.error` only — **silently swallows** | No                                        |

### Component-level save handlers (LEGACY pages)

Components like `ComicsPage.tsx` and `WorldsUniversesPage.tsx` have inline save handlers:

```typescript
try {
  await WikiPageService.saveWikiPage(pageId, content);
} catch (error) {
  console.error("Failed to save wiki page:", error);
  // user sees nothing
}
```

This is the worst failure mode: the user clicks Save, nothing happens, no feedback.

### Modern flow (`useWikiPageSections`)

`saveAllSections()` sets `error` state on failure, which **is** available to consuming components as `error: string | null`. But `AnimePage.tsx` does not currently render this error anywhere visible to the user.

---

## Planned Approach (When Implementing)

### Pattern to use: Toast / Banner notifications

The project doesn't have a toast system yet. Options when building it:

1. **Simple global toast** — a single context-based queue that any component can push to:

   ```typescript
   const { notify } = useToast();
   notify("error", "Failed to save. Your changes were not lost.");
   ```

2. **Inline section banners** — show error adjacent to the section that failed. Better UX for wiki editing since you can tell which section failed.

### Behaviors to implement per error type

| Error case                                | Desired behavior                                                        |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| Page load fails                           | Show full-page error with retry button                                  |
| Section load fails                        | Show placeholder with "Failed to load section" + retry                  |
| Save fails                                | Show banner: "Save failed — your changes are preserved in the editor"   |
| Auth error on save                        | Show: "You've been signed out. Please sign in to save." with login link |
| RPC unavailable (fallback already exists) | Transparent to user — handled in service                                |
| Network offline                           | Future: detect and queue saves                                          |

### Auth-specific gap (your debugging notes)

RLS silently blocks writes when not logged in. The RPC returns "success" but updates 0 rows. There is no row-count check after saves. When implementing error handling, add:

```typescript
// After RPC save, check affected rows:
if (data?.rows_updated === 0) {
  throw new Error("Save succeeded but no rows were updated — check auth/RLS");
}
```

---

## Priority Order

1. **Save failure feedback** — most impactful, users lose work silently today
2. **Auth-gated save** — detect logged-out state before attempting save (not after)
3. **Page load error** — full-page error + retry UI
4. **Section load error** — per-section placeholder
5. **Toast/notification system** — shared infrastructure for all the above

---

## Notes

- Don't build the toast system until at least 2-3 places need it — avoid premature abstraction
- Error feedback can be added to `AnimePage.tsx` first as a simple inline banner, no shared system needed initially
- The wiki editor already has `hasPendingChanges` state — a "save failed" banner can piggyback on this pattern
