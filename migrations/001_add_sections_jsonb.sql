-- Migration: Add JSONB sections field to wiki_pages table
-- This replaces the need for a separate wiki_sections table
-- Sections are stored as a JSONB object: { "section-id": { content }, ... }

-- Add sections column as JSONB
ALTER TABLE wiki_pages 
ADD COLUMN IF NOT EXISTS sections JSONB DEFAULT '{}'::jsonb;

-- Create an index on the sections column for faster lookups
CREATE INDEX IF NOT EXISTS idx_wiki_pages_sections 
ON wiki_pages USING gin (sections);

-- Add a comment to document the structure
COMMENT ON COLUMN wiki_pages.sections IS 
'JSONB object storing page sections. Structure: { "section-id": { TipTap JSON content }, ... }. Section IDs are controlled by React components for stable bookmarks.';

-- Example data structure:
-- {
--   "the-basics": {
--     "type": "doc",
--     "content": [
--       { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "The Basics" }] },
--       { "type": "paragraph", "content": [{ "type": "text", "text": "Introduction text..." }] }
--     ]
--   },
--   "history-of-anime": {
--     "type": "doc",
--     "content": [...]
--   }
-- }
