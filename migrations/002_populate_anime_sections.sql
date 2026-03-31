-- Insert/Update Anime page with initial section content
-- Run this AFTER running 001_add_sections_jsonb.sql

-- First ensure the anime page exists
INSERT INTO wiki_pages (
  id,
  title,
  slug,
  full_path,
  page_type,
  genre,
  sections,
  created_at,
  updated_at,
  created_by
)
VALUES (
  gen_random_uuid(),
  'Anime',
  'anime',
  '/anime',
  'wiki',
  NULL,
  '{}'::jsonb,  -- Empty sections initially
  NOW(),
  NOW(),
  NULL  -- Replace with actual user ID if needed
)
ON CONFLICT (full_path) DO NOTHING;

-- Update the anime page with section content
-- This populates all 9 sections defined in AnimePage.tsx
UPDATE wiki_pages
SET sections = jsonb_build_object(
  'the-basics', jsonb_build_object(
    'type', 'doc',
    'content', json_build_array(
      json_build_object(
        'type', 'heading',
        'attrs', json_build_object('level', 2),
        'content', json_build_array(json_build_object('type', 'text', 'text', 'The Basics'))
      ),
      json_build_object(
        'type', 'paragraph',
        'content', json_build_array(
          json_build_object('type', 'text', 'text', 'Anime is a style of animation originating from Japan, characterized by vibrant characters, fantastical themes, and colorful graphics.')
        )
      )
    )
  ),
  'history-of-anime', jsonb_build_object(
    'type', 'doc',
    'content', json_build_array(
      json_build_object(
        'type', 'heading',
        'attrs', json_build_object('level', 2),
        'content', json_build_array(json_build_object('type', 'text', 'text', 'History of Anime'))
      ),
      json_build_object(
        'type', 'paragraph',
        'content', json_build_array(
          json_build_object('type', 'text', 'text', 'Anime began in the early 20th century, evolving from traditional Japanese art forms into the globally recognized medium we know today.')
        )
      )
    )
  ),
  'terminology-guide', jsonb_build_object(
    'type', 'doc',
    'content', json_build_array(
      json_build_object(
        'type', 'heading',
        'attrs', json_build_object('level', 2),
        'content', json_build_array(json_build_object('type', 'text', 'text', 'Terminology Guide'))
      ),
      json_build_object(
        'type', 'paragraph',
        'content', json_build_array(
          json_build_object('type', 'text', 'text', 'Understanding anime terminology enhances your viewing experience. Common terms include manga (Japanese comics), otaku (enthusiast), and many more.')
        )
      )
    )
  ),
  'anime-genres', jsonb_build_object(
    'type', 'doc',
    'content', json_build_array(
      json_build_object(
        'type', 'heading',
        'attrs', json_build_object('level', 2),
        'content', json_build_array(json_build_object('type', 'text', 'text', 'Anime Genres'))
      ),
      json_build_object(
        'type', 'paragraph',
        'content', json_build_array(
          json_build_object('type', 'text', 'text', 'Anime spans numerous genres including action, romance, mecha, slice of life, and psychological thrillers.')
        )
      )
    )
  ),
  'anime-worlds', jsonb_build_object(
    'type', 'doc',
    'content', json_build_array(
      json_build_object(
        'type', 'heading',
        'attrs', json_build_object('level', 2),
        'content', json_build_array(json_build_object('type', 'text', 'text', 'Anime Worlds'))
      ),
      json_build_object(
        'type', 'paragraph',
        'content', json_build_array(
          json_build_object('type', 'text', 'text', 'From the ninja villages of Naruto to the post-apocalyptic landscapes of Attack on Titan, anime creates rich and diverse worlds.')
        )
      )
    )
  ),
  'audience-categories', jsonb_build_object(
    'type', 'doc',
    'content', json_build_array(
      json_build_object(
        'type', 'heading',
        'attrs', json_build_object('level', 2),
        'content', json_build_array(json_build_object('type', 'text', 'text', 'Audience Categories'))
      ),
      json_build_object(
        'type', 'paragraph',
        'content', json_build_array(
          json_build_object('type', 'text', 'text', 'Anime is categorized by target demographics: Shōnen (young boys), Shōjo (young girls), Seinen (adult men), and Josei (adult women).')
        )
      )
    )
  ),
  'production-process', jsonb_build_object(
    'type', 'doc',
    'content', json_build_array(
      json_build_object(
        'type', 'heading',
        'attrs', json_build_object('level', 2),
        'content', json_build_array(json_build_object('type', 'text', 'text', 'Production Process'))
      ),
      json_build_object(
        'type', 'paragraph',
        'content', json_build_array(
          json_build_object('type', 'text', 'text', 'Anime production involves multiple stages including storyboarding, animation, voice acting, and post-production.')
        )
      )
    )
  ),
  'cultural-impact', jsonb_build_object(
    'type', 'doc',
    'content', json_build_array(
      json_build_object(
        'type', 'heading',
        'attrs', json_build_object('level', 2),
        'content', json_build_array(json_build_object('type', 'text', 'text', 'Cultural Impact'))
      ),
      json_build_object(
        'type', 'paragraph',
        'content', json_build_array(
          json_build_object('type', 'text', 'text', 'Anime has become a global cultural phenomenon, influencing art, fashion, gaming, and storytelling worldwide.')
        )
      )
    )
  ),
  'learning-resources', jsonb_build_object(
    'type', 'doc',
    'content', json_build_array(
      json_build_object(
        'type', 'heading',
        'attrs', json_build_object('level', 2),
        'content', json_build_array(json_build_object('type', 'text', 'text', 'Learning Resources'))
      ),
      json_build_object(
        'type', 'paragraph',
        'content', json_build_array(
          json_build_object('type', 'text', 'text', 'Explore anime through streaming platforms, community forums, conventions, and educational resources.')
        )
      )
    )
  )
),
updated_at = NOW()
WHERE full_path = '/anime';
