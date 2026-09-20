-- ===========================================================================
-- MIGRATION: Enforce External Email Approval & Status Backfill
-- ===========================================================================

-- 1. Ensure any existing profiles with proton.me or external personal domains are set to 'pending'
UPDATE public.profiles
SET approval_status = 'pending', updated_at = now()
WHERE (
  email ILIKE '%@proton.me' OR
  email ILIKE '%@protonmail.com' OR
  email ILIKE '%@pm.me' OR
  email ILIKE '%@zoho.com' OR
  email ILIKE '%@zoho.in' OR
  email ILIKE '%@rediffmail.com' OR
  email ILIKE '%captaindark%'
)
AND (approval_status IS NULL OR approval_status = '' OR approval_status = 'pending');

-- 2. Update handle_new_user trigger function to ensure pending status on all external domains
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_domain TEXT;
  v_approval TEXT := 'approved';
BEGIN
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = NEW.id) THEN
    RETURN NEW;
  END IF;

  v_domain := LOWER(SPLIT_PART(NEW.email, '@', 2));
  -- Only official college credentials and standard personal email providers get instant approval
  IF v_domain NOT IN (
    'gmail.com', 'googlemail.com',
    'outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'outlook.in',
    'yahoo.com', 'yahoo.co.in', 'ymail.com',
    'icloud.com', 'me.com', 'mac.com',
    'hbtu.ac.in'
  )
  AND v_domain !~* '\.(ac\.in|edu|edu\.in|res\.in|ernet\.in|gov\.in)$' THEN
    v_approval := 'pending';
  END IF;

  INSERT INTO public.profiles (
    user_id,
    email,
    first_name,
    last_name,
    mobile_number,
    college,
    branch,
    year,
    approval_status,
    banned_until
  ) VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'mobile_number',
    NEW.raw_user_meta_data->>'college',
    NEW.raw_user_meta_data->>'branch',
    NEW.raw_user_meta_data->>'year',
    v_approval,
    NEW.banned_until
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    RETURN NEW;
END;
$$;

-- 3. Update upsert_my_profile to preserve existing approval_status and assign 'pending' for external domains
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
  v_domain text;
  v_default_approval text := 'approved';
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  v_domain := LOWER(SPLIT_PART(COALESCE(p_email, auth.email(), ''), '@', 2));
  IF v_domain NOT IN (
    'gmail.com', 'googlemail.com',
    'outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'outlook.in',
    'yahoo.com', 'yahoo.co.in', 'ymail.com',
    'icloud.com', 'me.com', 'mac.com',
    'hbtu.ac.in'
  )
  AND v_domain !~* '\.(ac\.in|edu|edu\.in|res\.in|ernet\.in|gov\.in)$' THEN
    v_default_approval := 'pending';
  END IF;

  INSERT INTO public.profiles (
    user_id, email, first_name, last_name, college, branch, year, mobile_number, avatar_url, approval_status, updated_at
  )
  VALUES (
    v_uid,
    COALESCE(p_email, auth.email(), ''),
    p_first_name,
    p_last_name,
    p_college,
    p_branch,
    p_year,
    p_mobile_number,
    p_avatar_url,
    v_default_approval,
    now()
  )
  ON CONFLICT (user_id)
  DO UPDATE SET
    first_name    = EXCLUDED.first_name,
    last_name     = EXCLUDED.last_name,
    college       = EXCLUDED.college,
    branch        = EXCLUDED.branch,
    year          = EXCLUDED.year,
    email         = COALESCE(EXCLUDED.email, profiles.email),
    mobile_number = EXCLUDED.mobile_number,
    avatar_url    = EXCLUDED.avatar_url,
    updated_at    = now();
END;
$$;
