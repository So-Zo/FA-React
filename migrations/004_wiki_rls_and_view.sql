-- Migration: Add RLS policies to wiki_pages and create wiki_master_view
-- Purpose: Enable public read access and set up contributor view

-- ============================================
-- PART 1: RLS Policies for wiki_pages table
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "wiki_pages_select_all" ON public.wiki_pages;
DROP POLICY IF EXISTS "wiki_pages_insert_auth" ON public.wiki_pages;
DROP POLICY IF EXISTS "wiki_pages_update_auth" ON public.wiki_pages;

-- Allow public read access to wiki pages
CREATE POLICY "wiki_pages_select_all"
ON public.wiki_pages
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to insert wiki pages
CREATE POLICY "wiki_pages_insert_auth"
ON public.wiki_pages
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update wiki pages
CREATE POLICY "wiki_pages_update_auth"
ON public.wiki_pages
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- PART 2: wiki_master_view for contributor queries
-- ============================================

-- Drop existing view if it exists
DROP VIEW IF EXISTS wiki_master_view CASCADE;

-- Create view that joins pages with contributors and user profiles
-- NOTE: This returns MULTIPLE rows per page (one per contributor)
-- Use this ONLY for contributor queries, not for page data
CREATE VIEW wiki_master_view AS
SELECT 
  -- Page data
  wp.id AS page_id,
  wp.title AS page_title,
  wp.slug AS page_slug,
  wp.full_path AS page_path,
  wp.page_type,
  wp.genre,
  wp.content AS page_content,
  wp.sections AS page_sections,
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

-- Grant permissions on view
GRANT SELECT ON wiki_master_view TO anon, authenticated;

-- ============================================
-- ARCHITECTURE NOTES
-- ============================================

-- Query Strategy:
-- 1. WikiPageService → queries wiki_pages TABLE directly (single row)
-- 2. WikiSectionService → queries wiki_pages TABLE directly (single row)
-- 3. WikiContributorService → queries wiki_master_view VIEW (multiple rows)
-- 
-- Why separate?
-- - wiki_pages table queries use .single() expectation
-- - wiki_master_view returns multiple rows due to LEFT JOIN on contributors
-- - Mixing them causes "cannot coerce to single object" errors
-- 
-- Performance:
-- - Direct table queries are faster for single-row lookups
-- - View is optimized for contributor aggregation queries
-- - RLS policies enable public read without exposing sensitive data

COMMENT ON VIEW wiki_master_view IS 'Denormalized view for wiki contributor queries. Returns multiple rows per page (one per contributor). Use wiki_pages table directly for single-row page queries.';
