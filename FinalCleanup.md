This will be to note all the things across the code base we want to check, clean, document and go over before final production.

1. Using Explict types where any works but lacks the self documenting that 'any' provides. The noteable example being TipTapContent instead of amongst the wiki service and hook files.
2. Investigate the intermittent editor-side module resolution issues around newly extracted shared wiki components in some page files. `npx tsc --project tsconfig.app.json --noEmit` passes, so this appears to be language service or workspace resolver noise rather than a real compile failure.
3. Post-launch pass on loading and error UX across the app: improve user-facing feedback, add retry actions where hooks already support recovery, and avoid unnecessarily clearing last-known-good content when refreshes fail.
4. Naming-only page-edit symbol churn for later search/replace on the user side if desired: `EditModeProvider`, `EditModeContext`, `EditModeContextType`, `useEditMode`, `GlobalEditMode`, and any remaining `editMode` file/module names still reflect the old "global edit" wording even though the behavior is now page-level editing.

Rename wiki edits and similar components/services to be more granular for what they actually do

The next cleanup pass (on index.ts), if you want it, should be more deliberate rather than blind deletion. The main remaining questionable cluster is the old legacy character row-shape types in src/types/index.ts: CharacterAbilities, CharacterEvent, WorldInfo, and NotableFeat. They are only referenced by Character now, which suggests that whole branch may be removable or reshapable, but that needs an intentional decision instead of a drive-by delete.

there are lots of little index.ts files all over some sub directories that need cleaned, some of them only have one line of an export.

5. Post-launch launch-readiness cleanup:
   - Add visible wiki save-failure feedback so failed section saves do not appear inert to the user.
   - Fix the Worlds & Universes TOC deep link path mismatch (`/worldsuniverses/directory` vs `/worlds-universes/directory`).
   - Refresh stale docs (`docs/wiki-page-status.md`, `docs/user-flow.md`) so they match the current section-based wiki implementation.
