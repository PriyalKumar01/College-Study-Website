-- Migration: Add full_name column to public.profiles and ensure backwards compatibility
-- Timestamp: 2026-10-25 02:00:00 UTC

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'profiles' 
      AND column_name = 'full_name'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN full_name TEXT;
  END IF;
END $$;

-- Populate full_name for existing profiles if currently null
UPDATE public.profiles
SET full_name = TRIM(CONCAT(COALESCE(first_name, ''), ' ', COALESCE(last_name, '')))
WHERE (full_name IS NULL OR full_name = '')
  AND (first_name IS NOT NULL OR last_name IS NOT NULL);

-- Create or replace trigger to auto-maintain full_name on insert or update
CREATE OR REPLACE FUNCTION public.sync_profile_full_name()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.first_name IS NOT NULL OR NEW.last_name IS NOT NULL THEN
    NEW.full_name := TRIM(CONCAT(COALESCE(NEW.first_name, ''), ' ', COALESCE(NEW.last_name, '')));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_sync_profile_full_name ON public.profiles;
CREATE TRIGGER trigger_sync_profile_full_name
BEFORE INSERT OR UPDATE OF first_name, last_name ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_profile_full_name();
