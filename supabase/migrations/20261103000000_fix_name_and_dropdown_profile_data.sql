-- Migration: Fix student names being populated with roll numbers & repair incomplete metadata
-- Date: 2026-11-03

-- 1. Standardize user metadata function (disallows numeric roll numbers as real names)
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
  
  -- If raw name is purely digits (roll number), disregard it
  IF v_raw_name ~ '^\d+$' THEN
    v_raw_name := NULL;
  END IF;

  IF v_raw_name IS NULL OR v_raw_name = '' THEN
    v_fallback := COALESCE(
      NULLIF(TRIM(p_raw->>'user_name'), ''),
      NULLIF(TRIM(p_raw->>'preferred_username'), '')
    );
    -- If candidate fallback is numeric, ignore it
    IF v_fallback IS NOT NULL AND v_fallback !~ '^\d+$' THEN
      v_raw_name := INITCAP(REGEXP_REPLACE(v_fallback, '[._-]+', ' ', 'g'));
    ELSE
      v_raw_name := '';
    END IF;
  END IF;

  v_first_name := COALESCE(
    NULLIF(TRIM(p_prof_first), ''),
    NULLIF(TRIM(p_raw->>'first_name'), ''),
    SPLIT_PART(v_raw_name, ' ', 1),
    ''
  );

  -- Disallow roll numbers and 'user' placeholders
  IF v_first_name ~ '^\d+$' OR LOWER(v_first_name) = 'user' THEN
    v_first_name := '';
  END IF;

  v_last_name := COALESCE(
    NULLIF(TRIM(p_prof_last), ''),
    NULLIF(TRIM(p_raw->>'last_name'), ''),
    CASE 
      WHEN POSITION(' ' IN v_raw_name) > 0 THEN SUBSTRING(v_raw_name FROM POSITION(' ' IN v_raw_name) + 1)
      ELSE ''
    END
  );

  IF v_last_name ~ '^\d+$' OR v_last_name = v_first_name THEN
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
    LOWER(v_first_name) <> 'user' AND
    v_first_name !~ '^\d+$'
  );

  v_profile_completed := v_has_all_fields;

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

-- 2. Clear corrupted roll-number names in public.profiles so users are prompted to enter their real name
UPDATE public.profiles
SET first_name = NULL, last_name = NULL, updated_at = now()
WHERE first_name ~ '^\d+$';

-- 3. Ensure all HBTU profiles have college set to 'HBTU Kanpur'
UPDATE public.profiles
SET college = 'HBTU Kanpur', updated_at = now()
WHERE (email ILIKE '%@hbtu.ac.in') AND (college IS NULL OR college = '');

-- 4. Invalidate profile_completed for any accounts missing branch, year, or real name
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || jsonb_build_object('profile_completed', false)
WHERE (
  raw_user_meta_data->>'first_name' ~ '^\d+$'
  OR COALESCE(NULLIF(TRIM(raw_user_meta_data->>'branch'), ''), '') = ''
  OR COALESCE(NULLIF(TRIM(raw_user_meta_data->>'year'), ''), '') = ''
  OR COALESCE(NULLIF(TRIM(raw_user_meta_data->>'college'), ''), '') = ''
);
