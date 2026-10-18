-- Fix GoTrue Database Error Loading User
-- Updates missing token fields on auth.users

BEGIN;

UPDATE auth.users SET recovery_token = coalesce(recovery_token, '') WHERE recovery_token IS NULL;
