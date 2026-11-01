-- Migration: Permanent profile completion fix & repair corrupted branch/profile records
-- Run automatically by Supabase CLI or SQL Editor

-- 1A. Fix 104 CSE roll numbers that were auto-assigned to Electrical Engineering (EE)
UPDATE public.profiles
SET 
  branch = 'Computer Science & Engineering (CSE)',
  updated_at = now()
WHERE (email ILIKE '%104%@hbtu.ac.in' OR email ILIKE '%04%@hbtu.ac.in')
  AND branch = 'Electrical Engineering (EE)';

UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || jsonb_build_object(
  'branch', 'Computer Science & Engineering (CSE)'
)
WHERE (email ILIKE '%104%@hbtu.ac.in' OR email ILIKE '%04%@hbtu.ac.in')
  AND raw_user_meta_data->>'branch' = 'Electrical Engineering (EE)';


-- 1B. Fix 108 IT roll numbers that were auto-assigned to Biochemical Engineering (BE)
UPDATE public.profiles
SET 
  branch = 'Information Technology (IT)',
  updated_at = now()
WHERE (email ILIKE '%108%@hbtu.ac.in' OR email ILIKE '%08%@hbtu.ac.in')
  AND branch = 'Biochemical Engineering (BE)';

UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || jsonb_build_object(
  'branch', 'Information Technology (IT)'
)
WHERE (email ILIKE '%108%@hbtu.ac.in' OR email ILIKE '%08%@hbtu.ac.in')
  AND raw_user_meta_data->>'branch' = 'Biochemical Engineering (BE)';


-- 1C. Sync all users who have genuinely complete records in public.profiles to auth.users
UPDATE auth.users u
SET raw_user_meta_data = COALESCE(u.raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
  'first_name', p.first_name,
  'last_name', COALESCE(p.last_name, ''),
  'name', TRIM(CONCAT(p.first_name, ' ', COALESCE(p.last_name, ''))),
  'full_name', TRIM(CONCAT(p.first_name, ' ', COALESCE(p.last_name, ''))),
  'college', p.college,
  'branch', p.branch,
  'year', p.year,
  'email', LOWER(TRIM(u.email)),
  'email_verified', true,
  'phone_verified', false,
  'profile_completed', true
)
FROM public.profiles p
WHERE (p.user_id = u.id OR LOWER(TRIM(p.email)) = LOWER(TRIM(u.email)))
  AND p.first_name IS NOT NULL AND TRIM(p.first_name) <> '' AND LOWER(TRIM(p.first_name)) <> 'user'
  AND p.college IS NOT NULL AND TRIM(p.college) <> ''
  AND p.branch IS NOT NULL AND TRIM(p.branch) <> ''
  AND p.year IS NOT NULL AND TRIM(p.year) <> '';


-- 1D. Mark users with missing/incomplete profile data as profile_completed = FALSE
UPDATE auth.users u
SET raw_user_meta_data = COALESCE(u.raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
  'profile_completed', false
)
WHERE (
  COALESCE(NULLIF(TRIM(u.raw_user_meta_data->>'college'), ''), '') = ''
  OR COALESCE(NULLIF(TRIM(u.raw_user_meta_data->>'branch'), ''), '') = ''
  OR COALESCE(NULLIF(TRIM(u.raw_user_meta_data->>'year'), ''), '') = ''
  OR COALESCE(NULLIF(TRIM(u.raw_user_meta_data->>'first_name'), ''), '') = ''
  OR LOWER(TRIM(COALESCE(u.raw_user_meta_data->>'first_name', ''))) = 'user'
);


-- 2A. Core standardization function (Strict, clean, no branch guessing)
CREATE OR REPLACE FUNCTION public.standardize_user_metadata(
  p_raw jsonb,
  p_email text,
  p_prof_first text DEFAULT NULL,
  p_prof_last text DEFAULT NULL,
  p_prof_college text DEFAULT NULL,
  p_prof_branch text DEFAULT NULL,
  p_prof_year text DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_raw_name TEXT;
  v_fallback TEXT;
  v_first_name TEXT;
  v_last_name TEXT;
  v_full_name TEXT;
  v_college TEXT;
  v_branch TEXT;
  v_year TEXT;
  v_profile_completed BOOLEAN;
  v_has_all_fields BOOLEAN;
BEGIN
  v_raw_name := COALESCE(NULLIF(TRIM(p_raw->>'name'), ''), NULLIF(TRIM(p_raw->>'full_name'), ''));
  
  IF v_raw_name IS NULL OR v_raw_name = '' THEN
    v_fallback := COALESCE(
      NULLIF(TRIM(p_raw->>'user_name'), ''),
      NULLIF(TRIM(p_raw->>'preferred_username'), ''),
      SPLIT_PART(COALESCE(p_email, ''), '@', 1),
      'User'
    );
    v_raw_name := INITCAP(REGEXP_REPLACE(v_fallback, '[._-]+', ' ', 'g'));
  END IF;

  v_first_name := COALESCE(
    NULLIF(TRIM(p_prof_first), ''),
    NULLIF(TRIM(p_raw->>'first_name'), ''),
    SPLIT_PART(v_raw_name, ' ', 1),
    'User'
  );

  v_last_name := COALESCE(
    NULLIF(TRIM(p_prof_last), ''),
    NULLIF(TRIM(p_raw->>'last_name'), ''),
    CASE 
      WHEN POSITION(' ' IN v_raw_name) > 0 THEN SUBSTRING(v_raw_name FROM POSITION(' ' IN v_raw_name) + 1)
      ELSE ''
    END
  );

  IF v_last_name = v_first_name THEN
    v_last_name := '';
  END IF;

  v_full_name := TRIM(CONCAT(v_first_name, ' ', v_last_name));
  IF v_full_name = '' THEN 
    v_full_name := v_raw_name; 
  END IF;

  v_college := COALESCE(NULLIF(TRIM(p_prof_college), ''), NULLIF(TRIM(p_raw->>'college'), ''), '');
  v_branch  := COALESCE(NULLIF(TRIM(p_prof_branch), ''), NULLIF(TRIM(p_raw->>'branch'), ''), '');
  v_year    := COALESCE(NULLIF(TRIM(p_prof_year), ''), NULLIF(TRIM(p_raw->>'year'), ''), '');

  IF LOWER(COALESCE(p_email, '')) LIKE '%@hbtu.ac.in' THEN
    IF v_college = '' THEN 
      v_college := 'HBTU Kanpur'; 
    END IF;
  END IF;

  v_has_all_fields := (
    v_college <> '' AND 
    v_branch <> '' AND 
    v_year <> '' AND 
    v_first_name <> '' AND 
    LOWER(v_first_name) <> 'user'
  );

  v_profile_completed := (
    v_has_all_fields AND (
      COALESCE((p_raw->>'profile_completed')::boolean, false) = true OR
      p_prof_branch IS NOT NULL AND p_prof_branch <> ''
    )
  );

  RETURN COALESCE(p_raw, '{}'::jsonb) || jsonb_build_object(
    'name', v_full_name,
    'full_name', v_full_name,
    'first_name', v_first_name,
    'last_name', v_last_name,
    'college', v_college,
    'branch', v_branch,
    'year', v_year,
    'email', LOWER(TRIM(COALESCE(p_email, ''))),
    'email_verified', true,
    'phone_verified', false,
    'profile_completed', v_profile_completed
  );
END;
$$;


-- 2B. Trigger on auth.users before insert or update
CREATE OR REPLACE FUNCTION public.handle_auth_user_metadata_standardization()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_prof RECORD;
BEGIN
  SELECT first_name, last_name, college, branch, year 
  INTO v_prof
  FROM public.profiles
  WHERE user_id = NEW.id OR email = LOWER(TRIM(NEW.email))
  ORDER BY updated_at DESC NULLS LAST
  LIMIT 1;

  NEW.raw_user_meta_data := public.standardize_user_metadata(
    NEW.raw_user_meta_data,
    NEW.email,
    v_prof.first_name,
    v_prof.last_name,
    v_prof.college,
    v_prof.branch,
    v_prof.year
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_auth_user_metadata_standardization ON auth.users;
CREATE TRIGGER trg_auth_user_metadata_standardization
BEFORE INSERT OR UPDATE OF raw_user_meta_data ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_auth_user_metadata_standardization();


-- 2C. Trigger on public.profiles to sync changes directly into auth.users.raw_user_meta_data
CREATE OR REPLACE FUNCTION public.sync_profile_to_user_metadata()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = public.standardize_user_metadata(
    raw_user_meta_data,
    NEW.email,
    NEW.first_name,
    NEW.last_name,
    NEW.college,
    NEW.branch,
    NEW.year
  )
  WHERE id = NEW.user_id OR email = LOWER(TRIM(NEW.email));

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS sync_profile_to_user_metadata_trigger ON public.profiles;
CREATE TRIGGER sync_profile_to_user_metadata_trigger
AFTER INSERT OR UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_profile_to_user_metadata();


-- 2D. Safe upsert_my_profile RPC function
CREATE OR REPLACE FUNCTION public.upsert_my_profile(
  p_first_name     text    DEFAULT NULL,
  p_last_name      text    DEFAULT NULL,
  p_college        text    DEFAULT NULL,
  p_branch         text    DEFAULT NULL,
  p_year           text    DEFAULT NULL,
  p_email          text    DEFAULT NULL,
  p_mobile_number  text    DEFAULT NULL,
  p_avatar_url     text    DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_email text := LOWER(TRIM(COALESCE(p_email, '')));
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO public.profiles (
    user_id, email, first_name, last_name, college, branch, year, mobile_number, avatar_url, updated_at
  )
  VALUES (
    v_uid,
    v_email,
    p_first_name,
    p_last_name,
    p_college,
    p_branch,
    p_year,
    p_mobile_number,
    p_avatar_url,
    now()
  )
  ON CONFLICT (user_id)
  DO UPDATE SET
    first_name    = COALESCE(NULLIF(EXCLUDED.first_name, ''), profiles.first_name),
    last_name     = COALESCE(EXCLUDED.last_name, profiles.last_name),
    college       = COALESCE(NULLIF(EXCLUDED.college, ''), profiles.college),
    branch        = COALESCE(NULLIF(EXCLUDED.branch, ''), profiles.branch),
    year          = COALESCE(NULLIF(EXCLUDED.year, ''), profiles.year),
    email         = COALESCE(NULLIF(EXCLUDED.email, ''), profiles.email),
    mobile_number = COALESCE(EXCLUDED.mobile_number, profiles.mobile_number),
    avatar_url    = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    updated_at    = now();
END;
$$;

GRANT EXECUTE ON FUNCTION public.upsert_my_profile(text, text, text, text, text, text, text, text) TO authenticated, anon;
