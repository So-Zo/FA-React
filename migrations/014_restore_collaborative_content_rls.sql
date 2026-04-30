-- Migration: Restore collaborative content RLS for wiki and Power Room
-- Purpose: Correct the owner-based write restrictions introduced in 013 for
-- collaborative content tables while leaving site-assets restrictions intact.

BEGIN;

-- ============================================
-- wiki_pages: allow authenticated users to update existing page content rows
-- ============================================

DROP POLICY IF EXISTS "wiki_pages_insert_owner" ON public.wiki_pages;
DROP POLICY IF EXISTS "wiki_pages_update_owner" ON public.wiki_pages;

CREATE POLICY "wiki_pages_update_auth"
ON public.wiki_pages
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Intentionally do not restore a broad INSERT policy here.
-- Collaborative users may edit existing page content, but page creation stays
-- outside the normal user path until admin/mod role handling exists.

-- ============================================
-- Character content tables: allow authenticated users to edit content rows
-- tied to real parent characters, regardless of creator ownership
-- ============================================

DROP POLICY IF EXISTS "character_abilities_insert_owner" ON public.character_abilities;
DROP POLICY IF EXISTS "character_abilities_update_owner" ON public.character_abilities;

CREATE POLICY "character_abilities_insert_auth"
ON public.character_abilities
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_abilities.character_id
  )
);

CREATE POLICY "character_abilities_update_auth"
ON public.character_abilities
FOR UPDATE
TO authenticated
USING (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_abilities.character_id
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_abilities.character_id
  )
);

DROP POLICY IF EXISTS "character_events_insert_owner" ON public.character_events;
DROP POLICY IF EXISTS "character_events_update_owner" ON public.character_events;

CREATE POLICY "character_events_insert_auth"
ON public.character_events
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_events.character_id
  )
);

CREATE POLICY "character_events_update_auth"
ON public.character_events
FOR UPDATE
TO authenticated
USING (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_events.character_id
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_events.character_id
  )
);

DROP POLICY IF EXISTS "character_feats_insert_owner" ON public.character_feats;
DROP POLICY IF EXISTS "character_feats_update_owner" ON public.character_feats;

CREATE POLICY "character_feats_insert_auth"
ON public.character_feats
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_feats.character_id
  )
);

CREATE POLICY "character_feats_update_auth"
ON public.character_feats
FOR UPDATE
TO authenticated
USING (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_feats.character_id
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_feats.character_id
  )
);

DROP POLICY IF EXISTS "character_world_info_insert_owner" ON public.character_world_info;
DROP POLICY IF EXISTS "character_world_info_update_owner" ON public.character_world_info;

CREATE POLICY "character_world_info_insert_auth"
ON public.character_world_info
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_world_info.character_id
  )
);

CREATE POLICY "character_world_info_update_auth"
ON public.character_world_info
FOR UPDATE
TO authenticated
USING (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_world_info.character_id
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM public.characters c
    WHERE c.id = character_world_info.character_id
  )
);

COMMIT;