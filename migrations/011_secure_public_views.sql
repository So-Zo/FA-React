-- Migration: Make exposed public views obey underlying RLS
-- Purpose: Fix advisor findings for security definer views in the public schema.

BEGIN;

ALTER VIEW public.wiki_master_view SET (security_invoker = true);
ALTER VIEW public.master_view SET (security_invoker = true);
ALTER VIEW public.character_master_view SET (security_invoker = true);

GRANT SELECT ON public.wiki_master_view TO anon, authenticated;
GRANT SELECT ON public.master_view TO anon, authenticated;
GRANT SELECT ON public.character_master_view TO anon, authenticated;

COMMIT;