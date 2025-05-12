# CSS Reset Migration Documentation

## Overview

This document outlines the consolidation of CSS reset styles across the FanArcs React project. The goal was to centralize all reset styles into a single file (`src/components/ui/reset.css`) to ensure consistency and reduce duplication.

## Changes Made

### 1. Consolidated Reset Styles

All reset styles from the following files have been consolidated into `src/components/ui/reset.css`:

- `css/core/reset.css` (used as reference)
- `css/core/universal-style.css`
- `src/index.css`
- `src/components/ui/global.css`

### 2. Updated Files

#### src/components/ui/reset.css

- **Action**: Created new file with all reset styles from across the project
- **Content Added**:
  - Base reset for all elements
  - HTML and body element resets
  - Typography resets
  - List resets
  - Link resets
  - Image resets
  - Form element resets
  - Focus outline resets
  - Reduced motion preference media query

#### src/components/ui/global.css

- **Action**: Reset styles commented out and replaced with import
- **Changes**:
  - Added import for reset.css: `@import './reset.css';`
  - Commented out all reset-related styles
  - Added explanatory comment about the migration
  - Kept non-reset styling (colors, transitions, etc.)

#### css/core/universal-style.css

- **Action**: Reset styles commented out, file marked as deprecated
- **Changes**:
  - Added comment explaining this is a deprecated file from the vanilla project
  - Commented out the reset styles
  - Kept other styles for reference until they can be properly migrated

#### src/index.css

- **Action**: All styles commented out, file marked as deprecated
- **Changes**:
  - Added comment explaining reset styles are now imported through global.css
  - Added comment explaining this is the default Vite/React CSS file
  - Commented out all styles as they conflict with the custom styling system
  - Removed the import from main.tsx

### 3. No Changes Made To

- `css/core/variables.css` - This file contains CSS variables, not reset styles

## HTML Elements and Classes Affected

The following HTML elements now receive their base styling from the consolidated reset.css:

- `*` (all elements)
- `html`
- `body`
- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- `p`
- `ul`, `ol`
- `a`
- `img`
- `button`
- `input`, `select`, `textarea`
- `:focus`, `:focus-visible`

## Redundant or Deprecated Files

1. **css/core/universal-style.css**
   - This file was the main global style sheet in the vanilla version of the project
   - Most styles are now redundant with src/components/ui/global.css
   - Consider migrating any unique styles to global.css and then removing this file

2. **src/index.css**
   - This is the default Vite/React CSS file
   - All styles conflict with the custom styling system
   - The import has been commented out in main.tsx

## Next Steps

1. **Review the changes** to ensure all pages render correctly
2. **Migrate any remaining unique styles** from universal-style.css to global.css
3. **Consider removing src/index.css** after confirming no styles are needed
4. **Consider removing universal-style.css** after confirming all needed styles are migrated
5. **Update any component-specific CSS files** that may be importing these files directly

## Benefits of This Migration

1. **Single source of truth** for all CSS reset styles
2. **Reduced duplication** across the codebase
3. **Consistent styling** across all pages
4. **Easier maintenance** as all reset styles are in one place
5. **Clearer separation** between reset styles and application-specific styles
