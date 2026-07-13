-- ===========================================================================
-- MIGRATION: Sync Profile Metadata & Fix RLS Policies
-- ===========================================================================

-- 1. Fix RLS policies on public.profiles to use auth.uid() = user_id
-- This allows authenticated users to read/insert/update their own profile rows.
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Profiles are viewable by owner" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Users can read their own profile" 
ON public.profiles FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);


-- 2. Create the Trigger Function to sync public.profiles -> auth.users.raw_user_meta_data
-- Whenever a user completes or updates their profile in public.profiles, this trigger
-- will automatically update their raw_user_meta_data in auth.users.
CREATE OR REPLACE FUNCTION public.sync_profile_to_user_metadata()
RETURNS TRIGGER AS $$
DECLARE
  v_profile_completed BOOLEAN;
BEGIN
  -- Compute profile completion status based on required fields
  v_profile_completed := (
    NEW.first_name IS NOT NULL AND NEW.first_name <> '' AND
    NEW.college IS NOT NULL AND NEW.college <> '' AND
    NEW.branch IS NOT NULL AND NEW.branch <> '' AND
    NEW.year IS NOT NULL AND NEW.year <> ''
  );

  UPDATE auth.users
  SET raw_user_meta_data = 
    COALESCE(raw_user_meta_data, '{}'::jsonb) || 
    jsonb_build_object(
      'first_name', NEW.first_name,
      'last_name', NEW.last_name,
      'college', NEW.college,
      'branch', NEW.branch,
      'year', NEW.year,
      'profile_completed', v_profile_completed
    )
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on public.profiles
DROP TRIGGER IF EXISTS sync_profile_to_user_metadata_trigger ON public.profiles;
CREATE TRIGGER sync_profile_to_user_metadata_trigger
AFTER INSERT OR UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_profile_to_user_metadata();


-- 3. Backfill existing user records
-- Sync metadata for all existing users from public.profiles table to auth.users.
UPDATE auth.users u
SET raw_user_meta_data = 
  COALESCE(u.raw_user_meta_data, '{}'::jsonb) || 
  jsonb_build_object(
    'first_name', p.first_name,
    'last_name', p.last_name,
    'college', p.college,
    'branch', p.branch,
    'year', p.year,
    'profile_completed', (
      p.first_name IS NOT NULL AND p.first_name <> '' AND
      p.college IS NOT NULL AND p.college <> '' AND
      p.branch IS NOT NULL AND p.branch <> '' AND
      p.year IS NOT NULL AND p.year <> ''
    )
  )
FROM public.profiles p
WHERE p.user_id = u.id;
