-- Seed data for `raids` table
-- Run this in the Supabase SQL editor or via psql
-- Matches schema in SUPABASE_SETUP.md

BEGIN;

INSERT INTO public.raids (
  id, project_name, status, progress, likes, retweets, comments, engagements,
  started_at, estimated_end, twitter_link, duration, package, chain_id, token_address, created_at, updated_at
) VALUES
  (1, '$clippy', 'active', 45, 1250, 680, 320, 2250,
    NOW() - INTERVAL '22 minutes', NOW() + INTERVAL '2 days', 'https://x.com/TheClippyMeme?s=20', '2 weeks', '24hrs', 'solana', 'GKjAe1bQXXLoEitJYSuyw6qt97tTVoKkGEgWPEo6pump', now(), now());

-- Ensure the serial/sequence advances to the max id
SELECT setval(pg_get_serial_sequence('raids', 'id'), (SELECT COALESCE(MAX(id), 1) FROM raids));

COMMIT;
