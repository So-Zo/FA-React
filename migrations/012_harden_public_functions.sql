-- Migration: Harden exposed public functions
-- Purpose: Fix mutable search_path warnings on known functions and revoke
-- unintended API execute access for security definer functions.

BEGIN;

-- Keep search_path fixed for known public functions.
ALTER FUNCTION public.update_wiki_section(UUID, TEXT, JSONB, TEXT, TEXT, TEXT, TEXT, UUID)
  SET search_path = public, auth;

ALTER FUNCTION public.create_notification()
  SET search_path = public, auth;

ALTER FUNCTION public.handle_new_user()
  SET search_path = public, auth;

ALTER FUNCTION public.handle_user_update()
  SET search_path = public, auth;

ALTER FUNCTION public.get_trending_hashtags(integer)
  SET search_path = public, auth;

ALTER FUNCTION public.get_user_complete_info(UUID)
  SET search_path = public, auth;

ALTER FUNCTION public.get_user_feed(UUID, integer, integer)
  SET search_path = public, auth;

ALTER FUNCTION public.get_page_section_asset(TEXT)
  SET search_path = public, auth;

ALTER FUNCTION public.is_user_blocked(UUID, UUID)
  SET search_path = public, auth;

ALTER FUNCTION public.increment_post_count()
  SET search_path = public, auth;

ALTER FUNCTION public.decrement_post_count()
  SET search_path = public, auth;

ALTER FUNCTION public.update_comment_counts()
  SET search_path = public, auth;

ALTER FUNCTION public.update_follow_counts()
  SET search_path = public, auth;

ALTER FUNCTION public.update_like_counts()
  SET search_path = public, auth;

ALTER FUNCTION public.update_post_comments_count()
  SET search_path = public, auth;

ALTER FUNCTION public.update_post_likes_count()
  SET search_path = public, auth;

ALTER FUNCTION public.update_user_post_counts()
  SET search_path = public, auth;

ALTER FUNCTION public.update_character_updated_at()
  SET search_path = public, auth;

ALTER FUNCTION public.update_updated_at_column()
  SET search_path = public, auth;

-- Revoke public API execute access from functions that should not be callable
-- directly from anon/authenticated REST RPC endpoints.
REVOKE EXECUTE ON FUNCTION public.create_notification() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_user_update() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_trending_hashtags(integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_user_complete_info(UUID) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_user_blocked(UUID, UUID) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_comment_counts() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_follow_counts() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_like_counts() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_user_post_counts() FROM PUBLIC, anon, authenticated;

-- The wiki section RPC is intentionally client-callable for authenticated users.
REVOKE EXECUTE ON FUNCTION public.update_wiki_section(UUID, TEXT, JSONB, TEXT, TEXT, TEXT, TEXT, UUID)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.update_wiki_section(UUID, TEXT, JSONB, TEXT, TEXT, TEXT, TEXT, UUID)
  TO authenticated;

COMMIT;