-- Migration Script: Sync public.profiles to auth.users
-- Prepared for dual Supabase migration

BEGIN;

-- Handle unique email constraints and ON CONFLICT DO NOTHING
