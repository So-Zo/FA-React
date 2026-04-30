-- Migration: Add RLS policies for Power Room character category tables
-- Purpose: Allow public reads and authenticated writes for wiki-style
-- character category content rows used by the Power Room save flow.

BEGIN;

ALTER TABLE public.character_abilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.character_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.character_world_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.character_feats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "character_abilities_select_all" ON public.character_abilities;
DROP POLICY IF EXISTS "character_abilities_insert_auth" ON public.character_abilities;
DROP POLICY IF EXISTS "character_abilities_update_auth" ON public.character_abilities;

CREATE POLICY "character_abilities_select_all"
ON public.character_abilities
FOR SELECT
TO public
USING (true);

CREATE POLICY "character_abilities_insert_auth"
ON public.character_abilities
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "character_abilities_update_auth"
ON public.character_abilities
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "character_events_select_all" ON public.character_events;
DROP POLICY IF EXISTS "character_events_insert_auth" ON public.character_events;
DROP POLICY IF EXISTS "character_events_update_auth" ON public.character_events;

CREATE POLICY "character_events_select_all"
ON public.character_events
FOR SELECT
TO public
USING (true);

CREATE POLICY "character_events_insert_auth"
ON public.character_events
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "character_events_update_auth"
ON public.character_events
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "character_world_info_select_all" ON public.character_world_info;
DROP POLICY IF EXISTS "character_world_info_insert_auth" ON public.character_world_info;
DROP POLICY IF EXISTS "character_world_info_update_auth" ON public.character_world_info;

CREATE POLICY "character_world_info_select_all"
ON public.character_world_info
FOR SELECT
TO public
USING (true);

CREATE POLICY "character_world_info_insert_auth"
ON public.character_world_info
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "character_world_info_update_auth"
ON public.character_world_info
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "character_feats_select_all" ON public.character_feats;
DROP POLICY IF EXISTS "character_feats_insert_auth" ON public.character_feats;
DROP POLICY IF EXISTS "character_feats_update_auth" ON public.character_feats;

CREATE POLICY "character_feats_select_all"
ON public.character_feats
FOR SELECT
TO public
USING (true);

CREATE POLICY "character_feats_insert_auth"
ON public.character_feats
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "character_feats_update_auth"
ON public.character_feats
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

GRANT SELECT ON public.character_abilities TO anon, authenticated;
GRANT INSERT, UPDATE ON public.character_abilities TO authenticated;

GRANT SELECT ON public.character_events TO anon, authenticated;
GRANT INSERT, UPDATE ON public.character_events TO authenticated;

GRANT SELECT ON public.character_world_info TO anon, authenticated;
GRANT INSERT, UPDATE ON public.character_world_info TO authenticated;

GRANT SELECT ON public.character_feats TO anon, authenticated;
GRANT INSERT, UPDATE ON public.character_feats TO authenticated;

COMMIT;