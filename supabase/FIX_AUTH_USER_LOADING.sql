-- Fix GoTrue Database Error Loading User
-- Updates missing token fields on auth.users

BEGIN;

UPDATE auth.users SET confirmation_token = coalesce(confirmation_token, '') WHERE confirmation_token IS NULL;
