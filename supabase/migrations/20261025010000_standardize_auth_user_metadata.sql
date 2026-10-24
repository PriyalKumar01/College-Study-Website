-- ==============================================================================
-- MIGRATION: Standardize auth.users raw_user_meta_data for All Auth Providers
-- (Google, GitHub, Email, HBTU auto-detection)
-- ==============================================================================
-- Ensures that EVERY user in auth.users has the exact uniform JSON structure:
-- {
--   "name": "...",
--   "full_name": "...",
--   "first_name": "...",
--   "last_name": "...",
--   "college": "...",
--   "branch": "...",
--   "year": "...",
--   "email": "...",
--   "email_verified": true,
--   "phone_verified": false,
--   "profile_completed": true / false
-- }
-- ==============================================================================

-- 1. Helper function to standardize metadata JSON
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
  v_username TEXT;
  v_adm_year INT;
  v_prog TEXT;
  v_branch_code TEXT;
  v_profile_completed BOOLEAN;
BEGIN
  -- A. Determine Name (Handles GitHub where name is null/empty)
  v_raw_name := COALESCE(NULLIF(TRIM(p_raw->>'name'), ''), NULLIF(TRIM(p_raw->>'full_name'), ''));
  
  IF v_raw_name IS NULL OR v_raw_name = '' THEN
    v_fallback := COALESCE(
      NULLIF(TRIM(p_raw->>'user_name'), ''),
      NULLIF(TRIM(p_raw->>'preferred_username'), ''),
      SPLIT_PART(COALESCE(p_email, ''), '@', 1),
      'User'
    );
    -- Convert dots/hyphens/underscores to spaces and capitalize each word
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

  -- B. College, Branch, Year resolution
  v_college := COALESCE(NULLIF(TRIM(p_prof_college), ''), NULLIF(TRIM(p_raw->>'college'), ''), '');
  v_branch := COALESCE(NULLIF(TRIM(p_prof_branch), ''), NULLIF(TRIM(p_raw->>'branch'), ''), '');
  v_year := COALESCE(NULLIF(TRIM(p_prof_year), ''), NULLIF(TRIM(p_raw->>'year'), ''), '');

  -- C. HBTU Auto-detection (Handles roll number emails e.g. 240112025@hbtu.ac.in)
  IF LOWER(COALESCE(p_email, '')) LIKE '%@hbtu.ac.in' THEN
    IF v_college = '' THEN 
      v_college := 'HBTU Kanpur'; 
    END IF;

    v_username := SPLIT_PART(LOWER(p_email), '@', 1);
    -- Match 9-digit roll number pattern: YY PP BB NNN
    IF v_username ~ '^[0-9]{9}$' THEN
      v_adm_year := 2000 + SUBSTRING(v_username FROM 1 FOR 2)::INT;
      v_prog := SUBSTRING(v_username FROM 3 FOR 2);
      v_branch_code := SUBSTRING(v_username FROM 5 FOR 2);

      -- Passing year calculation
      IF v_year = '' THEN
        IF v_prog = '01' THEN 
          v_year := (v_adm_year + 4)::TEXT; -- B.Tech (4 years)
        ELSIF v_prog IN ('02', '03') THEN 
          v_year := (v_adm_year + 2)::TEXT; -- M.Tech / MCA (2 years)
        ELSE 
          v_year := (v_adm_year + 4)::TEXT;
        END IF;
      END IF;

      -- Branch lookup
      IF v_branch = '' THEN
        v_branch := CASE v_branch_code
          WHEN '01' THEN 'Computer Science & Engineering (CSE)'
          WHEN '02' THEN 'Information Technology (IT)'
          WHEN '03' THEN 'Electronics Engineering (ET)'
          WHEN '04' THEN 'Electrical Engineering (EE)'
          WHEN '05' THEN 'Mechanical Engineering (ME)'
          WHEN '06' THEN 'Civil Engineering (CE)'
          WHEN '07' THEN 'Chemical Engineering (CHE)'
          WHEN '08' THEN 'Biochemical Engineering (BE)'
          WHEN '09' THEN 'Food Technology (FT)'
          WHEN '10' THEN 'Oil Technology (OT)'
          WHEN '11' THEN 'Paint Technology (PT)'
          WHEN '12' THEN 'Plastic Technology (PL)'
          WHEN '13' THEN 'Leather & Fashion Technology (LFT)'
          ELSE ''
        END;
      END IF;
    END IF;
  END IF;

  -- D. Completion check
  v_profile_completed := (v_college <> '' AND v_branch <> '' AND v_year <> '' AND v_first_name <> '');

  -- E. Construct unified JSON object preserving existing keys while ensuring standard schema
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


-- 2. Trigger function on auth.users before insert or update
CREATE OR REPLACE FUNCTION public.handle_auth_user_metadata_standardization()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_prof RECORD;
BEGIN
  -- Look for existing profile if any
  SELECT first_name, last_name, college, branch, year 
  INTO v_prof
  FROM public.profiles
  WHERE user_id = NEW.id OR email = LOWER(TRIM(NEW.email))
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


-- 3. Trigger on public.profiles to keep auth.users.raw_user_meta_data synced on profile update
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


-- 4. Immediate Backfill: Update ALL existing users in auth.users
-- Part A: Users with matching rows in public.profiles
UPDATE auth.users u
SET raw_user_meta_data = public.standardize_user_metadata(
  u.raw_user_meta_data,
  u.email,
  p.first_name,
  p.last_name,
  p.college,
  p.branch,
  p.year
)
FROM (
  SELECT DISTINCT ON (user_id) user_id, first_name, last_name, college, branch, year
  FROM public.profiles
  WHERE user_id IS NOT NULL
  ORDER BY user_id, updated_at DESC NULLS LAST
) p
WHERE u.id = p.user_id;

-- Part B: Users with matching email in public.profiles
UPDATE auth.users u
SET raw_user_meta_data = public.standardize_user_metadata(
  u.raw_user_meta_data,
  u.email,
  p.first_name,
  p.last_name,
  p.college,
  p.branch,
  p.year
)
FROM (
  SELECT DISTINCT ON (LOWER(TRIM(email))) email, first_name, last_name, college, branch, year
  FROM public.profiles
  WHERE email IS NOT NULL
  ORDER BY LOWER(TRIM(email)), updated_at DESC NULLS LAST
) p
WHERE LOWER(TRIM(u.email)) = LOWER(TRIM(p.email))
  AND (u.raw_user_meta_data->>'college' IS NULL OR u.raw_user_meta_data->>'college' = '');

-- Part C: Users without public.profiles entry (e.g. pure OAuth or fresh signups)
UPDATE auth.users u
SET raw_user_meta_data = public.standardize_user_metadata(
  u.raw_user_meta_data,
  u.email,
  NULL, NULL, NULL, NULL, NULL
)
WHERE u.raw_user_meta_data->>'first_name' IS NULL 
   OR u.raw_user_meta_data->>'college' IS NULL
   OR u.raw_user_meta_data->>'branch' IS NULL
   OR u.raw_user_meta_data->>'year' IS NULL
   OR u.raw_user_meta_data->>'name' IS NULL
   OR TRIM(u.raw_user_meta_data->>'name') = '';
