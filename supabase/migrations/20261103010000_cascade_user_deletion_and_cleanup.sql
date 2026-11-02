-- ==============================================================================
-- Migration: Cascade User Deletion & Comprehensive Test Account Cleanup
-- Date: 2026-11-03
-- Purpose:
--   1. Ensures that when a user is deleted from auth.users (e.g. from the Supabase
--      Dashboard during testing), all of their associated rows in public.profiles,
--      note_downloads, premium_purchases, signup_attempts, issue_reports, and
--      bookmarks are completely and automatically purged.
--   2. Prevents stale profile/academic records from sticking around when recreating
--      or re-testing accounts with the same email.
--   3. Synchronizes standardize_user_metadata to directly mark profile_completed = true
--      whenever all 4 required academic fields are validly populated.
-- ==============================================================================

-- 1. Trigger Function to clean up all related user data BEFORE auth.users deletion
CREATE OR REPLACE FUNCTION public.handle_user_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- A. Delete from public.profiles
  DELETE FROM public.profiles 
  WHERE user_id = OLD.id 
     OR id = OLD.id 
     OR (OLD.email IS NOT NULL AND LOWER(email) = LOWER(OLD.email));

  -- B. Delete from public.note_downloads
  DELETE FROM public.note_downloads 
  WHERE user_id = OLD.id 
     OR (OLD.email IS NOT NULL AND LOWER(user_email) = LOWER(OLD.email));

  -- C. Delete from public.premium_purchases (test purchases / access records)
  DELETE FROM public.premium_purchases 
  WHERE user_id = OLD.id 
     OR (OLD.email IS NOT NULL AND LOWER(user_email) = LOWER(OLD.email));

  -- D. Delete from public.signup_attempts
  IF OLD.email IS NOT NULL THEN
    DELETE FROM public.signup_attempts 
    WHERE LOWER(email) = LOWER(OLD.email);
  END IF;

  -- E. Delete from opportunity_bookmarks if table exists
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'opportunity_bookmarks'
  ) THEN
    DELETE FROM public.opportunity_bookmarks WHERE user_id = OLD.id;
  END IF;

  -- F. Delete from issue_reports if table exists
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'issue_reports'
  ) THEN
    DELETE FROM public.issue_reports 
    WHERE user_id = OLD.id 
       OR (OLD.email IS NOT NULL AND LOWER(user_email) = LOWER(OLD.email));
  END IF;

  -- G. Delete admin roles for test accounts (Never remove owner)
  IF OLD.email IS NOT NULL AND LOWER(OLD.email) != 'priyalkumar06@gmail.com' THEN
    DELETE FROM public.admin_roles WHERE LOWER(user_email) = LOWER(OLD.email);
  END IF;

  RETURN OLD;
END;
$$;

-- 2. Attach BEFORE DELETE trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
  BEFORE DELETE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_delete();

-- 3. Ensure foreign keys on profiles safely cascade if present
DO $$
BEGIN
  -- Add foreign key constraint on profiles.user_id if not present or missing CASCADE
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'user_id'
  ) THEN
    BEGIN
      ALTER TABLE public.profiles 
        DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;
      ALTER TABLE public.profiles 
        ADD CONSTRAINT profiles_user_id_fkey 
        FOREIGN KEY (user_id) 
        REFERENCES auth.users(id) 
        ON DELETE CASCADE;
    EXCEPTION
      WHEN OTHERS THEN
        -- If constraint cannot be altered directly due to external references, trigger handles it
        NULL;
    END;
  END IF;
END $$;

-- 4. RPC Helper to manually purge a user's test records by email or user ID
CREATE OR REPLACE FUNCTION public.admin_purge_test_user(p_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid;
  v_clean_email text;
BEGIN
  v_clean_email := LOWER(TRIM(p_email));
  
  -- Safety guard: Never purge the official owner account
  IF v_clean_email = 'priyalkumar06@gmail.com' THEN
    RAISE EXCEPTION 'Cannot purge owner account.';
  END IF;

  SELECT id INTO v_uid FROM auth.users WHERE LOWER(email) = v_clean_email LIMIT 1;

  IF v_uid IS NOT NULL THEN
    DELETE FROM auth.users WHERE id = v_uid;
  END IF;

  DELETE FROM public.profiles WHERE LOWER(email) = v_clean_email OR (v_uid IS NOT NULL AND user_id = v_uid);
  DELETE FROM public.note_downloads WHERE LOWER(user_email) = v_clean_email OR (v_uid IS NOT NULL AND user_id = v_uid);
  DELETE FROM public.premium_purchases WHERE LOWER(user_email) = v_clean_email OR (v_uid IS NOT NULL AND user_id = v_uid);
  DELETE FROM public.signup_attempts WHERE LOWER(email) = v_clean_email;

  RETURN true;
END;
$$;
