-- Migration: Add optimized update_wiki_section RPC function
-- Purpose: Allows atomic section updates without client-side SELECT+UPDATE round-trip
-- Performance: Reduces section save from 2 queries to 1

CREATE OR REPLACE FUNCTION update_wiki_section(
  page_id UUID,
  section_id TEXT,
  section_content JSONB
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE wiki_pages
  SET 
    sections = COALESCE(sections, '{}'::jsonb) || jsonb_build_object(section_id, section_content),
    updated_at = NOW()
  WHERE id = page_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_wiki_section(UUID, TEXT, JSONB) TO authenticated;

COMMENT ON FUNCTION update_wiki_section IS 'Atomically update a single section in wiki_pages.sections JSONB field';
