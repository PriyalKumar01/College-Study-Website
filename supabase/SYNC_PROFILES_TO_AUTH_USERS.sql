-- Migration Script: Sync public.profiles to auth.users
-- Prepared for dual Supabase migration

BEGIN;

-- Insert into auth.identities with matching user_id UUID and provider_id
