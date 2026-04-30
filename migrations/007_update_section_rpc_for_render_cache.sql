-- Migration: Upgrade update_wiki_section RPC to save JSON + rendered HTML + metadata atomically
-- Purpose: Keep editor source JSON and reader HTML cache in sync in one write path

DROP FUNCTION IF EXISTS update_wiki_section(UUID, TEXT, JSONB);

CREATE OR REPLACE FUNCTION update_wiki_section(
  page_id UUID,
  section_id TEXT,
  section_content JSONB,
  section_html TEXT,
  renderer_version TEXT,
  renderer_sig TEXT,
  content_hash TEXT,
  updated_by UUID DEFAULT NULL
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
    sections_html = COALESCE(sections_html, '{}'::jsonb) || jsonb_build_object(section_id, section_html),
    sections_meta = COALESCE(sections_meta, '{}'::jsonb) || jsonb_build_object(
      section_id,
      jsonb_build_object(
        'rendererVersion', renderer_version,
        'rendererSig', renderer_sig,
        'contentHash', content_hash,
        'status', 'ready',
        'updatedAt', NOW(),
        'updatedBy', updated_by,
        'lastErrorCode', NULL
      )
    ),
    updated_at = NOW()
  WHERE id = page_id;

  GET DIAGNOSTICS rows_updated = ROW_COUNT;

  RETURN rows_updated > 0;
END;
$$;

GRANT EXECUTE ON FUNCTION update_wiki_section(UUID, TEXT, JSONB, TEXT, TEXT, TEXT, TEXT, UUID) TO authenticated;

COMMENT ON FUNCTION update_wiki_section IS 'Atomically update wiki section JSON, rendered HTML, and metadata; returns false when no rows updated (e.g., RLS)';
