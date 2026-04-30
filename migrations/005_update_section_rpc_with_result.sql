-- Migration: Update update_wiki_section RPC to return success status
-- Purpose: Allow client to detect when RLS blocks updates (authentication required)
-- Fixes: Silent failures where RPC returns no error but updates 0 rows

-- Drop the old function first
DROP FUNCTION IF EXISTS update_wiki_section(UUID, TEXT, JSONB);

CREATE OR REPLACE FUNCTION update_wiki_section(
  page_id UUID,
  section_id TEXT,
  section_content JSONB
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  rows_updated INTEGER;
BEGIN
  UPDATE wiki_pages
  SET 
    sections = COALESCE(sections, '{}'::jsonb) || jsonb_build_object(section_id, section_content),
    updated_at = NOW()
  WHERE id = page_id;
  
  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  
  RETURN rows_updated > 0;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_wiki_section(UUID, TEXT, JSONB) TO authenticated;

COMMENT ON FUNCTION update_wiki_section IS 'Atomically update a single section in wiki_pages.sections JSONB field. Returns true if update succeeded, false if no rows were updated (e.g., due to RLS)';
