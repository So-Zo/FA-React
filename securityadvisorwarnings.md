[
  {
    "name": "function_search_path_mutable",
    "title": "Function Search Path Mutable",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects functions where the search_path parameter is not set.",
    "detail": "Function \\`public.get_page_section_asset\\` has a role mutable search_path",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
    "metadata": {
      "name": "get_page_section_asset",
      "type": "function",
      "schema": "public"
    },
    "cache_key": "function_search_path_mutable_public_get_page_section_asset_0ec22a7e1d204b9711f58cc25bfcdc64"
  },
  {
    "name": "function_search_path_mutable",
    "title": "Function Search Path Mutable",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects functions where the search_path parameter is not set.",
    "detail": "Function \\`public.get_user_feed\\` has a role mutable search_path",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
    "metadata": {
      "name": "get_user_feed",
      "type": "function",
      "schema": "public"
    },
    "cache_key": "function_search_path_mutable_public_get_user_feed_ed23786a05d3193d4b67d276bf01c37d"
  },
  {
    "name": "function_search_path_mutable",
    "title": "Function Search Path Mutable",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects functions where the search_path parameter is not set.",
    "detail": "Function \\`public.increment_post_count\\` has a role mutable search_path",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
    "metadata": {
      "name": "increment_post_count",
      "type": "function",
      "schema": "public"
    },
    "cache_key": "function_search_path_mutable_public_increment_post_count_7d341f91fd524d780cafa061db4fde07"
  },
  {
    "name": "function_search_path_mutable",
    "title": "Function Search Path Mutable",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects functions where the search_path parameter is not set.",
    "detail": "Function \\`public.decrement_post_count\\` has a role mutable search_path",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
    "metadata": {
      "name": "decrement_post_count",
      "type": "function",
      "schema": "public"
    },
    "cache_key": "function_search_path_mutable_public_decrement_post_count_851c5690b3c6988f2baac90ff8a28d86"
  },
  {
    "name": "function_search_path_mutable",
    "title": "Function Search Path Mutable",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects functions where the search_path parameter is not set.",
    "detail": "Function \\`public.update_post_likes_count\\` has a role mutable search_path",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
    "metadata": {
      "name": "update_post_likes_count",
      "type": "function",
      "schema": "public"
    },
    "cache_key": "function_search_path_mutable_public_update_post_likes_count_05d0b84ea3ccc3396db708c6d3f6b4dc"
  },
  {
    "name": "function_search_path_mutable",
    "title": "Function Search Path Mutable",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects functions where the search_path parameter is not set.",
    "detail": "Function \\`public.update_post_comments_count\\` has a role mutable search_path",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
    "metadata": {
      "name": "update_post_comments_count",
      "type": "function",
      "schema": "public"
    },
    "cache_key": "function_search_path_mutable_public_update_post_comments_count_8cd94b32772c5864a44aaca5d52f112b"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.character_abilities` has an RLS policy `character_abilities_insert_auth` for `INSERT` that allows unrestricted access (WITH CHECK clause is always true). This effectively bypasses row-level security for authenticated.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "character_abilities",
      "qual": null,
      "type": "table",
      "roles": [
        "authenticated"
      ],
      "schema": "public",
      "command": "INSERT",
      "with_check": "true",
      "policy_name": "character_abilities_insert_auth",
      "permissive_using": false,
      "permissive_with_check": true
    },
    "cache_key": "rls_policy_always_true_public_character_abilities_character_abilities_insert_auth"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.character_abilities` has an RLS policy `character_abilities_update_auth` for `UPDATE` that allows unrestricted access (both USING and WITH CHECK are always true). This effectively bypasses row-level security for authenticated.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "character_abilities",
      "qual": "true",
      "type": "table",
      "roles": [
        "authenticated"
      ],
      "schema": "public",
      "command": "UPDATE",
      "with_check": "true",
      "policy_name": "character_abilities_update_auth",
      "permissive_using": true,
      "permissive_with_check": true
    },
    "cache_key": "rls_policy_always_true_public_character_abilities_character_abilities_update_auth"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.character_events` has an RLS policy `character_events_insert_auth` for `INSERT` that allows unrestricted access (WITH CHECK clause is always true). This effectively bypasses row-level security for authenticated.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "character_events",
      "qual": null,
      "type": "table",
      "roles": [
        "authenticated"
      ],
      "schema": "public",
      "command": "INSERT",
      "with_check": "true",
      "policy_name": "character_events_insert_auth",
      "permissive_using": false,
      "permissive_with_check": true
    },
    "cache_key": "rls_policy_always_true_public_character_events_character_events_insert_auth"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.character_events` has an RLS policy `character_events_update_auth` for `UPDATE` that allows unrestricted access (both USING and WITH CHECK are always true). This effectively bypasses row-level security for authenticated.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "character_events",
      "qual": "true",
      "type": "table",
      "roles": [
        "authenticated"
      ],
      "schema": "public",
      "command": "UPDATE",
      "with_check": "true",
      "policy_name": "character_events_update_auth",
      "permissive_using": true,
      "permissive_with_check": true
    },
    "cache_key": "rls_policy_always_true_public_character_events_character_events_update_auth"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.character_feats` has an RLS policy `character_feats_insert_auth` for `INSERT` that allows unrestricted access (WITH CHECK clause is always true). This effectively bypasses row-level security for authenticated.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "character_feats",
      "qual": null,
      "type": "table",
      "roles": [
        "authenticated"
      ],
      "schema": "public",
      "command": "INSERT",
      "with_check": "true",
      "policy_name": "character_feats_insert_auth",
      "permissive_using": false,
      "permissive_with_check": true
    },
    "cache_key": "rls_policy_always_true_public_character_feats_character_feats_insert_auth"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.character_feats` has an RLS policy `character_feats_update_auth` for `UPDATE` that allows unrestricted access (both USING and WITH CHECK are always true). This effectively bypasses row-level security for authenticated.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "character_feats",
      "qual": "true",
      "type": "table",
      "roles": [
        "authenticated"
      ],
      "schema": "public",
      "command": "UPDATE",
      "with_check": "true",
      "policy_name": "character_feats_update_auth",
      "permissive_using": true,
      "permissive_with_check": true
    },
    "cache_key": "rls_policy_always_true_public_character_feats_character_feats_update_auth"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.character_world_info` has an RLS policy `character_world_info_insert_auth` for `INSERT` that allows unrestricted access (WITH CHECK clause is always true). This effectively bypasses row-level security for authenticated.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "character_world_info",
      "qual": null,
      "type": "table",
      "roles": [
        "authenticated"
      ],
      "schema": "public",
      "command": "INSERT",
      "with_check": "true",
      "policy_name": "character_world_info_insert_auth",
      "permissive_using": false,
      "permissive_with_check": true
    },
    "cache_key": "rls_policy_always_true_public_character_world_info_character_world_info_insert_auth"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.character_world_info` has an RLS policy `character_world_info_update_auth` for `UPDATE` that allows unrestricted access (both USING and WITH CHECK are always true). This effectively bypasses row-level security for authenticated.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "character_world_info",
      "qual": "true",
      "type": "table",
      "roles": [
        "authenticated"
      ],
      "schema": "public",
      "command": "UPDATE",
      "with_check": "true",
      "policy_name": "character_world_info_update_auth",
      "permissive_using": true,
      "permissive_with_check": true
    },
    "cache_key": "rls_policy_always_true_public_character_world_info_character_world_info_update_auth"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.site-assets` has an RLS policy `Anyone can delete site assets` for `DELETE` that allows unrestricted access (USING clause is always true). This effectively bypasses row-level security for -.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "site-assets",
      "qual": "true",
      "type": "table",
      "roles": [
        "-"
      ],
      "schema": "public",
      "command": "DELETE",
      "with_check": null,
      "policy_name": "Anyone can delete site assets",
      "permissive_using": true,
      "permissive_with_check": false
    },
    "cache_key": "rls_policy_always_true_public_site-assets_Anyone can delete site assets"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.site-assets` has an RLS policy `Anyone can insert site assets` for `INSERT` that allows unrestricted access (WITH CHECK clause is always true). This effectively bypasses row-level security for -.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "site-assets",
      "qual": null,
      "type": "table",
      "roles": [
        "-"
      ],
      "schema": "public",
      "command": "INSERT",
      "with_check": "true",
      "policy_name": "Anyone can insert site assets",
      "permissive_using": false,
      "permissive_with_check": true
    },
    "cache_key": "rls_policy_always_true_public_site-assets_Anyone can insert site assets"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.site-assets` has an RLS policy `Anyone can update site assets` for `UPDATE` that allows unrestricted access (both USING and WITH CHECK are always true). This effectively bypasses row-level security for -.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "site-assets",
      "qual": "true",
      "type": "table",
      "roles": [
        "-"
      ],
      "schema": "public",
      "command": "UPDATE",
      "with_check": "true",
      "policy_name": "Anyone can update site assets",
      "permissive_using": true,
      "permissive_with_check": true
    },
    "cache_key": "rls_policy_always_true_public_site-assets_Anyone can update site assets"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.wiki_pages` has an RLS policy `wiki_pages_insert_auth` for `INSERT` that allows unrestricted access (WITH CHECK clause is always true). This effectively bypasses row-level security for authenticated.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "wiki_pages",
      "qual": null,
      "type": "table",
      "roles": [
        "authenticated"
      ],
      "schema": "public",
      "command": "INSERT",
      "with_check": "true",
      "policy_name": "wiki_pages_insert_auth",
      "permissive_using": false,
      "permissive_with_check": true
    },
    "cache_key": "rls_policy_always_true_public_wiki_pages_wiki_pages_insert_auth"
  },
  {
    "name": "rls_policy_always_true",
    "title": "RLS Policy Always True",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects RLS policies that use overly permissive expressions like \\`USING (true)\\` or \\`WITH CHECK (true)\\` for UPDATE, DELETE, or INSERT operations. SELECT policies with \\`USING (true)\\` are intentionally excluded as this pattern is often used deliberately for public read access.",
    "detail": "Table `public.wiki_pages` has an RLS policy `wiki_pages_update_auth` for `UPDATE` that allows unrestricted access (both USING and WITH CHECK are always true). This effectively bypasses row-level security for authenticated.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy",
    "metadata": {
      "name": "wiki_pages",
      "qual": "true",
      "type": "table",
      "roles": [
        "authenticated"
      ],
      "schema": "public",
      "command": "UPDATE",
      "with_check": "true",
      "policy_name": "wiki_pages_update_auth",
      "permissive_using": true,
      "permissive_with_check": true
    },
    "cache_key": "rls_policy_always_true_public_wiki_pages_wiki_pages_update_auth"
  },
  {
    "name": "public_bucket_allows_listing",
    "title": "Public Bucket Allows Listing",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Detects public storage buckets with a broad SELECT policy on `storage.objects`, which allows clients to list all files in the bucket.",
    "detail": "Public bucket `site-assets` has 1 broad SELECT policy on `storage.objects` (Admin site assets select), allowing clients to list all files. Public buckets don't need this for object URL access and it may expose more data than intended.",
    "remediation": "https://supabase.com/docs/guides/database/database-linter?lint=0025_public_bucket_allows_listing",
    "metadata": {
      "name": "site-assets",
      "type": "bucket",
      "schema": "storage",
      "bucket_id": "site-assets",
      "bucket_name": "site-assets",
      "policy_count": 1,
      "policy_names": [
        "Admin site assets select"
      ]
    },
    "cache_key": "public_bucket_allows_listing_site-assets"
  },
  {
    "name": "auth_leaked_password_protection",
    "title": "Leaked Password Protection Disabled",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Leaked password protection is currently disabled.",
    "detail": "Supabase Auth prevents the use of compromised passwords by checking against HaveIBeenPwned.org. Enable this feature to enhance security.",
    "cache_key": "auth_leaked_password_protection",
    "remediation": "https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection",
    "metadata": {
      "type": "auth",
      "entity": "Auth"
    }
  },
  {
    "name": "vulnerable_postgres_version",
    "title": "Current Postgres version has security patches available",
    "level": "WARN",
    "facing": "EXTERNAL",
    "categories": [
      "SECURITY"
    ],
    "description": "Upgrade your postgres database to apply important security patches",
    "detail": "We have detected that the current version of postgres, supabase-postgres-17.4.1.074, has outstanding security patches available. Upgrade your database to receive the latest security patches.",
    "cache_key": "vulnerable_postgres_version",
    "remediation": "https://supabase.com/docs/guides/platform/upgrading",
    "metadata": {
      "type": "compliance",
      "entity": "Config"
    }
  }
]