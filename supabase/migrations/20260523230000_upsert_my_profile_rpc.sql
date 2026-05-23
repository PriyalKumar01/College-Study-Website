-- ============================================================
-- PERMANENT FIX: Safe profile upsert RPC function
-- Uses SECURITY DEFINER so it bypasses RLS entirely.
-- Uses auth.uid() internally (cannot be spoofed by client).
-- ON CONFLICT handles both insert and update cases.
-- This replaces the problematic INSERT/UPDATE dance in frontend.
-- ============================================================

-- First, drop the old versions of the function to avoid "not unique" errors
DROP FUNCTION IF EXISTS public.upsert_my_profile(text, text, text, text, text, text);
DROP FUNCTION IF EXISTS public.upsert_my_profile(text, text, text, text, text, text, text, text);

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
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO public.profiles (
    user_id, email, first_name, last_name, college, branch, year, mobile_number, avatar_url, updated_at
  )
  VALUES (
    v_uid,
    COALESCE(p_email, ''),
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.upsert_my_profile(text, text, text, text, text, text, text, text) TO authenticated;
