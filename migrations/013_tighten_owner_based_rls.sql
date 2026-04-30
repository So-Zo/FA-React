-- Migration: Tighten owner-based RLS for wiki pages, character sections,
-- and site assets.
-- Purpose: Replace permissive write policies with checks tied to the actual
-- owner columns available in the current schema and remove broad storage
-- bucket listing for the public site-assets bucket.

BEGIN;

-- ============================================
-- wiki_pages: only the page creator can insert/update their rows
-- ============================================

DROP POLICY IF EXISTS "wiki_pages_insert_auth" ON public.wiki_pages;
DROP POLICY IF EXISTS "wiki_pages_update_auth" ON public.wiki_pages;

CREATE POLICY "wiki_pages_insert_owner"
ON public.wiki_pages
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "wiki_pages_update_owner"
ON public.wiki_pages
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- ============================================
-- Character section tables: write access follows the owning character row
-- ============================================

DROP POLICY IF EXISTS "character_abilities_insert_auth" ON public.character_abilities;
DROP POLICY IF EXISTS "character_abilities_update_auth" ON public.character_abilities;

CREATE POLICY "character_abilities_insert_owner"
ON public.character_abilities
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_abilities.character_id
      AND c.created_by = auth.uid()
  )
);

CREATE POLICY "character_abilities_update_owner"
ON public.character_abilities
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_abilities.character_id
      AND c.created_by = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_abilities.character_id
      AND c.created_by = auth.uid()
  )
);

DROP POLICY IF EXISTS "character_events_insert_auth" ON public.character_events;
DROP POLICY IF EXISTS "character_events_update_auth" ON public.character_events;

CREATE POLICY "character_events_insert_owner"
ON public.character_events
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_events.character_id
      AND c.created_by = auth.uid()
  )
);

CREATE POLICY "character_events_update_owner"
ON public.character_events
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_events.character_id
      AND c.created_by = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_events.character_id
      AND c.created_by = auth.uid()
  )
);

DROP POLICY IF EXISTS "character_feats_insert_auth" ON public.character_feats;
DROP POLICY IF EXISTS "character_feats_update_auth" ON public.character_feats;

CREATE POLICY "character_feats_insert_owner"
ON public.character_feats
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_feats.character_id
      AND c.created_by = auth.uid()
  )
);

CREATE POLICY "character_feats_update_owner"
ON public.character_feats
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_feats.character_id
      AND c.created_by = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_feats.character_id
      AND c.created_by = auth.uid()
  )
);

DROP POLICY IF EXISTS "character_world_info_insert_auth" ON public.character_world_info;
DROP POLICY IF EXISTS "character_world_info_update_auth" ON public.character_world_info;

CREATE POLICY "character_world_info_insert_owner"
ON public.character_world_info
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_world_info.character_id
      AND c.created_by = auth.uid()
  )
);

CREATE POLICY "character_world_info_update_owner"
ON public.character_world_info
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_world_info.character_id
      AND c.created_by = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_world_info.character_id
      AND c.created_by = auth.uid()
  )
);

-- ============================================
-- site-assets metadata: public read, owner-only writes
-- ============================================

DROP POLICY IF EXISTS "Anyone can insert site assets" ON public."site-assets";
DROP POLICY IF EXISTS "Anyone can update site assets" ON public."site-assets";
DROP POLICY IF EXISTS "Anyone can delete site assets" ON public."site-assets";

CREATE POLICY "site_assets_insert_owner"
ON public."site-assets"
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "site_assets_update_owner"
ON public."site-assets"
FOR UPDATE
TO authenticated
USING (auth.uid() = uploaded_by)
WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "site_assets_delete_owner"
ON public."site-assets"
FOR DELETE
TO authenticated
USING (auth.uid() = uploaded_by);

-- Public bucket object URLs do not require listing permissions.
DROP POLICY IF EXISTS "Admin site assets select" ON storage.objects;

COMMIT;