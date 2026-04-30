-- Migration: Add RLS policies for social and content tables
-- Purpose: Lock down publicly exposed tables that currently have RLS enabled
-- without policies, while preserving the access patterns used by the app.

BEGIN;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valid_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wiki_contributors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "posts_select_visible" ON public.posts;
DROP POLICY IF EXISTS "posts_insert_own" ON public.posts;
DROP POLICY IF EXISTS "posts_update_own" ON public.posts;
DROP POLICY IF EXISTS "posts_delete_own" ON public.posts;

CREATE POLICY "posts_select_visible"
ON public.posts
FOR SELECT
TO anon, authenticated
USING (
  visibility = 'public'
  OR user_profile_id = (SELECT auth.uid())
  OR (
    visibility = 'followers'
    AND EXISTS (
      SELECT 1
      FROM public.follows
      WHERE follows.following_id = posts.user_profile_id
        AND follows.follower_id = (SELECT auth.uid())
    )
  )
);

CREATE POLICY "posts_insert_own"
ON public.posts
FOR INSERT
TO authenticated
WITH CHECK (
  user_profile_id = (SELECT auth.uid())
);

CREATE POLICY "posts_update_own"
ON public.posts
FOR UPDATE
TO authenticated
USING (
  user_profile_id = (SELECT auth.uid())
)
WITH CHECK (
  user_profile_id = (SELECT auth.uid())
);

CREATE POLICY "posts_delete_own"
ON public.posts
FOR DELETE
TO authenticated
USING (
  user_profile_id = (SELECT auth.uid())
);

DROP POLICY IF EXISTS "comments_select_visible" ON public.comments;
DROP POLICY IF EXISTS "comments_insert_own" ON public.comments;
DROP POLICY IF EXISTS "comments_delete_own" ON public.comments;

CREATE POLICY "comments_select_visible"
ON public.comments
FOR SELECT
TO anon, authenticated
USING (
  user_profile_id = (SELECT auth.uid())
  OR EXISTS (
    SELECT 1
    FROM public.posts
    WHERE posts.id = comments.post_id
      AND (
        posts.visibility = 'public'
        OR posts.user_profile_id = (SELECT auth.uid())
        OR (
          posts.visibility = 'followers'
          AND EXISTS (
            SELECT 1
            FROM public.follows
            WHERE follows.following_id = posts.user_profile_id
              AND follows.follower_id = (SELECT auth.uid())
          )
        )
      )
  )
);

CREATE POLICY "comments_insert_own"
ON public.comments
FOR INSERT
TO authenticated
WITH CHECK (
  user_profile_id = (SELECT auth.uid())
  AND EXISTS (
    SELECT 1
    FROM public.posts
    WHERE posts.id = comments.post_id
      AND (
        posts.visibility = 'public'
        OR posts.user_profile_id = (SELECT auth.uid())
        OR (
          posts.visibility = 'followers'
          AND EXISTS (
            SELECT 1
            FROM public.follows
            WHERE follows.following_id = posts.user_profile_id
              AND follows.follower_id = (SELECT auth.uid())
          )
        )
      )
  )
);

CREATE POLICY "comments_delete_own"
ON public.comments
FOR DELETE
TO authenticated
USING (
  user_profile_id = (SELECT auth.uid())
);

DROP POLICY IF EXISTS "likes_select_own" ON public.likes;
DROP POLICY IF EXISTS "likes_insert_own" ON public.likes;
DROP POLICY IF EXISTS "likes_delete_own" ON public.likes;

CREATE POLICY "likes_select_own"
ON public.likes
FOR SELECT
TO authenticated
USING (
  user_profile_id = (SELECT auth.uid())
);

CREATE POLICY "likes_insert_own"
ON public.likes
FOR INSERT
TO authenticated
WITH CHECK (
  user_profile_id = (SELECT auth.uid())
  AND EXISTS (
    SELECT 1
    FROM public.posts
    WHERE posts.id = likes.post_id
      AND (
        posts.visibility = 'public'
        OR posts.user_profile_id = (SELECT auth.uid())
        OR (
          posts.visibility = 'followers'
          AND EXISTS (
            SELECT 1
            FROM public.follows
            WHERE follows.following_id = posts.user_profile_id
              AND follows.follower_id = (SELECT auth.uid())
          )
        )
      )
  )
);

CREATE POLICY "likes_delete_own"
ON public.likes
FOR DELETE
TO authenticated
USING (
  user_profile_id = (SELECT auth.uid())
);

DROP POLICY IF EXISTS "follows_select_public" ON public.follows;
DROP POLICY IF EXISTS "follows_insert_own" ON public.follows;
DROP POLICY IF EXISTS "follows_delete_own" ON public.follows;

CREATE POLICY "follows_select_public"
ON public.follows
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "follows_insert_own"
ON public.follows
FOR INSERT
TO authenticated
WITH CHECK (
  follower_id = (SELECT auth.uid())
  AND follower_id <> following_id
);

CREATE POLICY "follows_delete_own"
ON public.follows
FOR DELETE
TO authenticated
USING (
  follower_id = (SELECT auth.uid())
);

DROP POLICY IF EXISTS "valid_tags_select_public" ON public.valid_tags;

CREATE POLICY "valid_tags_select_public"
ON public.valid_tags
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "wiki_contributors_select_public" ON public.wiki_contributors;
DROP POLICY IF EXISTS "wiki_contributors_insert_own" ON public.wiki_contributors;
DROP POLICY IF EXISTS "wiki_contributors_update_own" ON public.wiki_contributors;

CREATE POLICY "wiki_contributors_select_public"
ON public.wiki_contributors
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "wiki_contributors_insert_own"
ON public.wiki_contributors
FOR INSERT
TO authenticated
WITH CHECK (
  user_profile_id = (SELECT auth.uid())
);

CREATE POLICY "wiki_contributors_update_own"
ON public.wiki_contributors
FOR UPDATE
TO authenticated
USING (
  user_profile_id = (SELECT auth.uid())
)
WITH CHECK (
  user_profile_id = (SELECT auth.uid())
);

GRANT SELECT ON public.posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.posts TO authenticated;

GRANT SELECT ON public.comments TO anon, authenticated;
GRANT INSERT, DELETE ON public.comments TO authenticated;

GRANT SELECT ON public.likes TO authenticated;
GRANT INSERT, DELETE ON public.likes TO authenticated;

GRANT SELECT ON public.follows TO anon, authenticated;
GRANT INSERT, DELETE ON public.follows TO authenticated;

GRANT SELECT ON public.valid_tags TO anon, authenticated;

GRANT SELECT ON public.wiki_contributors TO anon, authenticated;
GRANT INSERT, UPDATE ON public.wiki_contributors TO authenticated;

COMMIT;