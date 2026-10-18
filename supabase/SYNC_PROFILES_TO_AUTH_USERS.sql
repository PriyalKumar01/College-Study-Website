-- Migration Script: Sync public.profiles to auth.users
-- Prepared for dual Supabase migration

BEGIN;

-- Ensure confirmation_token is populated with non-null strings for GoTrue compatibility
