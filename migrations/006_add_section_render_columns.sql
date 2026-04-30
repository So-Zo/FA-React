-- Migration: Add rendered HTML and metadata storage for section-based wiki pages
-- Purpose: Enable reader-mode static HTML without mounting TipTap
-- Also drops legacy single-blob content column (replaced by sections JSONB architecture)

-- Drop dependent view before dropping content column
DROP VIEW IF EXISTS wiki_master_view;

-- search_vector currently depends on content; replace it with a sections-based generated column
DROP INDEX IF EXISTS idx_wiki_pages_search;

ALTER TABLE wiki_pages
DROP COLUMN IF EXISTS search_vector;

-- Drop legacy single-blob content column
ALTER TABLE wiki_pages
DROP COLUMN IF EXISTS content;

-- Add render cache columns
ALTER TABLE wiki_pages
ADD COLUMN IF NOT EXISTS sections_html JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS sections_meta JSONB DEFAULT '{}'::jsonb;

-- Recreate generated search vector without legacy content dependency
ALTER TABLE wiki_pages
ADD COLUMN IF NOT EXISTS search_vector tsvector GENERATED ALWAYS AS (
	to_tsvector(
		'english',
		COALESCE(title, '') || ' ' || COALESCE(full_path, '') || ' ' || COALESCE(sections::text, '')
	)
) STORED;

COMMENT ON COLUMN wiki_pages.sections_html IS 'Pre-rendered HTML for each section, keyed by section id';
COMMENT ON COLUMN wiki_pages.sections_meta IS 'Render metadata keyed by section id (rendererSig, contentHash, status, etc.)';

CREATE INDEX IF NOT EXISTS idx_wiki_pages_search ON wiki_pages USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS idx_wiki_pages_sections_html ON wiki_pages USING GIN (sections_html);
CREATE INDEX IF NOT EXISTS idx_wiki_pages_sections_meta ON wiki_pages USING GIN (sections_meta);

-- Recreate wiki_master_view without legacy content dependency
CREATE VIEW wiki_master_view AS
SELECT
	-- Page data
	wp.id AS page_id,
	wp.title AS page_title,
	wp.slug AS page_slug,
	wp.full_path AS page_path,
	wp.page_type,
	wp.genre,
	COALESCE(wp.sections, '{}'::jsonb) AS page_content,
	COALESCE(wp.sections, '{}'::jsonb) AS page_sections,
	wp.created_at AS page_created_at,
	wp.updated_at AS page_updated_at,
	wp.created_by AS page_creator_id,

	-- Page creator info
	creator.display_name AS page_creator_name,
	creator.username AS page_creator_username,
	creator.avatar_url AS page_creator_avatar,
	creator.is_verified AS page_creator_verified,

	-- Contributor data (multiple rows per page)
	wc.id AS contributor_id,
	wc.user_profile_id AS contributor_profile_id,
	wc.contribution_count,
	wc.first_contributed_at,
	wc.last_contributed_at,

	-- Contributor profile info
	contributor.display_name AS contributor_name,
	contributor.username AS contributor_username,
	contributor.avatar_url AS contributor_avatar,
	contributor.is_verified AS contributor_verified,
	contributor.bio AS contributor_bio

FROM wiki_pages wp
LEFT JOIN user_profiles creator ON wp.created_by = creator.id
LEFT JOIN wiki_contributors wc ON wp.id = wc.wiki_page_id
LEFT JOIN user_profiles contributor ON wc.user_profile_id = contributor.id;

GRANT SELECT ON wiki_master_view TO anon, authenticated;

COMMENT ON VIEW wiki_master_view IS 'Denormalized view for wiki contributor queries. Returns multiple rows per page (one per contributor). page_content aliases sections JSONB after legacy content removal.';
