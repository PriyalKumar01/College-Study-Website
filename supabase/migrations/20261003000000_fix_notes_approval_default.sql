-- Migration: Ensure notes table defaults to pending approval
-- Prevent any non-owner uploaded note from being auto-approved by database defaults

ALTER TABLE public.notes ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE public.notes ALTER COLUMN approved SET DEFAULT false;
ALTER TABLE public.notes ALTER COLUMN approved_at DROP DEFAULT;
