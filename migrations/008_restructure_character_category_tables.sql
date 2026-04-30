-- Migration: Restructure character category tables into wiki-style content rows
-- Purpose: Replace row-per-item character detail tables with one row per character per category,
-- using `content` (TipTap JSON) and `content_html` (rendered HTML), while keeping
-- filter/query fields on the base `characters` table.
--
-- IMPORTANT ROLLOUT NOTE:
-- This is a hard cutover migration. It intentionally discards existing category-table data,
-- keeps the `characters` table intact, and replaces the `character_master_view` contract.
-- Run it only when the matching service / hook / Power Room frontend changes are ready.

BEGIN;

DROP VIEW IF EXISTS public.character_master_view;

DROP TABLE IF EXISTS public.character_abilities CASCADE;
DROP TABLE IF EXISTS public.character_world_info CASCADE;
DROP TABLE IF EXISTS public.character_events CASCADE;
DROP TABLE IF EXISTS public.character_feats CASCADE;

CREATE TABLE public.character_abilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID NOT NULL UNIQUE REFERENCES public.characters(id) ON DELETE CASCADE,
  content JSONB NOT NULL DEFAULT '{"type":"doc","content":[]}'::jsonb,
  content_html TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.character_world_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID NOT NULL UNIQUE REFERENCES public.characters(id) ON DELETE CASCADE,
  content JSONB NOT NULL DEFAULT '{"type":"doc","content":[]}'::jsonb,
  content_html TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.character_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID NOT NULL UNIQUE REFERENCES public.characters(id) ON DELETE CASCADE,
  content JSONB NOT NULL DEFAULT '{"type":"doc","content":[]}'::jsonb,
  content_html TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.character_feats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID NOT NULL UNIQUE REFERENCES public.characters(id) ON DELETE CASCADE,
  content JSONB NOT NULL DEFAULT '{"type":"doc","content":[]}'::jsonb,
  content_html TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_character_abilities_character_id
  ON public.character_abilities(character_id);
CREATE INDEX idx_character_world_info_character_id
  ON public.character_world_info(character_id);
CREATE INDEX idx_character_events_character_id
  ON public.character_events(character_id);
CREATE INDEX idx_character_feats_character_id
  ON public.character_feats(character_id);

CREATE INDEX idx_character_abilities_content
  ON public.character_abilities USING GIN (content);
CREATE INDEX idx_character_world_info_content
  ON public.character_world_info USING GIN (content);
CREATE INDEX idx_character_events_content
  ON public.character_events USING GIN (content);
CREATE INDEX idx_character_feats_content
  ON public.character_feats USING GIN (content);

COMMENT ON COLUMN public.character_abilities.content IS 'TipTap JSON source for the character abilities section';
COMMENT ON COLUMN public.character_abilities.content_html IS 'Rendered HTML for the character abilities section';
COMMENT ON COLUMN public.character_world_info.content IS 'TipTap JSON source for the character world info section';
COMMENT ON COLUMN public.character_world_info.content_html IS 'Rendered HTML for the character world info section';
COMMENT ON COLUMN public.character_events.content IS 'TipTap JSON source for the character timeline section';
COMMENT ON COLUMN public.character_events.content_html IS 'Rendered HTML for the character timeline section';
COMMENT ON COLUMN public.character_feats.content IS 'TipTap JSON source for the character feats section';
COMMENT ON COLUMN public.character_feats.content_html IS 'Rendered HTML for the character feats section';

CREATE VIEW public.character_master_view AS
SELECT
  c.id AS character_id,
  c.name AS character_name,
  c.universe,
  c.universe_type,
  c.description AS character_description,
  c.image_url AS character_image,
  c.created_at AS character_created_at,
  c.updated_at AS character_updated_at,
  c.created_by AS character_created_by,

  ca.id AS abilities_id,
  COALESCE(ca.content, '{"type":"doc","content":[]}'::jsonb) AS abilities_content,
  COALESCE(ca.content_html, '') AS abilities_content_html,
  ca.created_at AS abilities_created_at,
  ca.updated_at AS abilities_updated_at,

  ce.id AS timeline_id,
  COALESCE(ce.content, '{"type":"doc","content":[]}'::jsonb) AS timeline_content,
  COALESCE(ce.content_html, '') AS timeline_content_html,
  ce.created_at AS timeline_created_at,
  ce.updated_at AS timeline_updated_at,

  cf.id AS feats_id,
  COALESCE(cf.content, '{"type":"doc","content":[]}'::jsonb) AS feats_content,
  COALESCE(cf.content_html, '') AS feats_content_html,
  cf.created_at AS feats_created_at,
  cf.updated_at AS feats_updated_at,

  cwi.id AS world_info_id,
  COALESCE(cwi.content, '{"type":"doc","content":[]}'::jsonb) AS world_info_content,
  COALESCE(cwi.content_html, '') AS world_info_content_html,
  cwi.created_at AS world_info_created_at,
  cwi.updated_at AS world_info_updated_at
FROM public.characters c
LEFT JOIN public.character_abilities ca ON ca.character_id = c.id
LEFT JOIN public.character_events ce ON ce.character_id = c.id
LEFT JOIN public.character_feats cf ON cf.character_id = c.id
LEFT JOIN public.character_world_info cwi ON cwi.character_id = c.id;

GRANT SELECT ON public.character_master_view TO anon, authenticated;

COMMENT ON VIEW public.character_master_view IS 'One-row-per-character Power Room read model joining base character metadata with wiki-style category content rows.';

COMMIT;
