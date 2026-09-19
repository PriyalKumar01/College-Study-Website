-- ===========================================================================
-- MIGRATION: Fix Security, Disposable Email Blocking, GATE Branch, & User Meta
-- ===========================================================================

-- 0. Ensure public.blocked_email_domains table exists
CREATE TABLE IF NOT EXISTS public.blocked_email_domains (
  domain TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.blocked_email_domains ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to blocked_email_domains" ON public.blocked_email_domains;
CREATE POLICY "Allow public read access to blocked_email_domains" 
ON public.blocked_email_domains FOR SELECT 
USING (true);

-- 1. Block 'fpklm.com', 'blobapps.com', and newly identified disposable domains
INSERT INTO public.blocked_email_domains (domain)
VALUES
  ('fpklm.com'),
  ('mail.fpklm.com'),
  ('blobapps.com'),
  ('blobapps.net'),
  ('blobapps.org'),
  ('buloan.com'),
  ('fxzig.com'),
  ('fxmail.org'),
  ('fxspost.com'),
  ('fxtemp.com'),
  ('dropmail.me'),
  ('emlhub.com'),
  ('mimimail.me'),
  ('spymail.one'),
  ('emailfake.com'),
  ('dynv6.net'),
  ('indevs.in'),
  ('ccwu.cc')
ON CONFLICT (domain) DO NOTHING;

-- 2. Enhanced Trigger function to block disposable emails at PostgreSQL database level
CREATE OR REPLACE FUNCTION public.check_disposable_email()
RETURNS TRIGGER AS $$
DECLARE
  email_domain TEXT;
  is_blocked BOOLEAN;
BEGIN
  -- Extract domain from email
  email_domain := LOWER(substring(NEW.email from '@(.*)$'));

  -- A. Check if domain exists in our blocked_email_domains table
  SELECT EXISTS (
    SELECT 1 FROM public.blocked_email_domains
    WHERE domain = email_domain
  ) INTO is_blocked;

  IF is_blocked THEN
    RAISE EXCEPTION 'Signup/Login with temporary or disposable email addresses is not permitted. Please use a permanent, valid personal or academic email address.';
  END IF;

  -- B. Check regex patterns for burner/disposable domains
  IF email_domain ~* '(temp.*mail|dispos|throwaway|mailinator|guerrilla|10minute|trashmail|sharklaser|fake.*mail|fakeinbox|burner.*mail|inboxkitten|1secmail|mohmal|yopmail|getnada|internalmail|atomicmail|fpklm|buloan|fxzig|fxmail|dropmail|emlhub|mimimail|spymail|emailfake|dynv6\.net)' THEN
    RAISE EXCEPTION 'Signup/Login with temporary or disposable email addresses is not permitted. Please use a permanent, valid personal or academic email address.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Reattach trigger on auth.users
DROP TRIGGER IF EXISTS check_disposable_email_trigger ON auth.users;
CREATE TRIGGER check_disposable_email_trigger
BEFORE INSERT OR UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.check_disposable_email();


-- 3. Add target_branch column to public.premium_purchases for GATE study
ALTER TABLE public.premium_purchases 
ADD COLUMN IF NOT EXISTS target_branch TEXT;


-- 4. Revert 'theakshone@gmail.com' branch back to ET (Electronics)
UPDATE public.profiles
SET branch = 'ET', updated_at = now()
WHERE email = 'theakshone@gmail.com';

UPDATE auth.users
SET raw_user_meta_data = 
  COALESCE(raw_user_meta_data, '{}'::jsonb) || 
  jsonb_build_object(
    'branch', 'ET',
    'email_verified', true
  )
WHERE email = 'theakshone@gmail.com';


-- 5. Ban & remove the disposable spam user 'xt4jdrbqfm@fpklm.com'
DELETE FROM public.profiles WHERE email = 'xt4jdrbqfm@fpklm.com';
UPDATE auth.users 
SET banned_until = '2099-01-01 00:00:00+00'::timestamptz 
WHERE email = 'xt4jdrbqfm@fpklm.com';


-- 6. Ensure public.admin_roles allows public read access so Admin Team is visible to all
DROP POLICY IF EXISTS "Anyone can read admin roles" ON public.admin_roles;
DROP POLICY IF EXISTS "Admins can read all admin roles" ON public.admin_roles;
CREATE POLICY "Anyone can read admin roles"
ON public.admin_roles FOR SELECT
TO public
USING (true);


-- 7. Update sync_profile_to_user_metadata() to ALWAYS synchronize name, full_name, first_name, last_name, and email_verified
CREATE OR REPLACE FUNCTION public.sync_profile_to_user_metadata()
RETURNS TRIGGER AS $$
DECLARE
  v_profile_completed BOOLEAN;
  v_full_name TEXT;
  v_first_name TEXT;
  v_last_name TEXT;
BEGIN
  -- Compute profile completion status based on required fields
  v_profile_completed := (
    NEW.first_name IS NOT NULL AND NEW.first_name <> '' AND
    NEW.college IS NOT NULL AND NEW.college <> '' AND
    NEW.branch IS NOT NULL AND NEW.branch <> '' AND
    NEW.year IS NOT NULL AND NEW.year <> ''
  );

  v_first_name := COALESCE(NEW.first_name, '');
  v_last_name := COALESCE(NEW.last_name, '');
  v_full_name := TRIM(CONCAT(v_first_name, ' ', v_last_name));

  IF v_full_name = '' THEN
    SELECT 
      COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', raw_user_meta_data->>'user_name', raw_user_meta_data->>'preferred_username', SPLIT_PART(NEW.email, '@', 1))
    INTO v_full_name
    FROM auth.users
    WHERE id = NEW.user_id;
  END IF;

  UPDATE auth.users
  SET raw_user_meta_data = 
    COALESCE(raw_user_meta_data, '{}'::jsonb) || 
    jsonb_build_object(
      'name', v_full_name,
      'full_name', v_full_name,
      'first_name', v_first_name,
      'last_name', v_last_name,
      'college', NEW.college,
      'branch', NEW.branch,
      'year', NEW.year,
      'email', NEW.email,
      'email_verified', true,
      'profile_completed', v_profile_completed
    )
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate trigger on public.profiles
DROP TRIGGER IF EXISTS sync_profile_to_user_metadata_trigger ON public.profiles;
CREATE TRIGGER sync_profile_to_user_metadata_trigger
AFTER INSERT OR UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_profile_to_user_metadata();


-- 8. Auto-populate name and full_name for new OAuth users (e.g. GitHub) on INSERT into auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user_oauth_metadata()
RETURNS TRIGGER AS $$
DECLARE
  v_name TEXT;
  v_user_name TEXT;
  v_email_name TEXT;
  v_first_name TEXT;
  v_last_name TEXT;
BEGIN
  v_name := COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name');
  v_user_name := COALESCE(NEW.raw_user_meta_data->>'user_name', NEW.raw_user_meta_data->>'preferred_username');
  v_email_name := SPLIT_PART(NEW.email, '@', 1);

  -- If name is not populated (standard with GitHub OAuth), derive it
  IF v_name IS NULL OR TRIM(v_name) = '' THEN
    v_name := COALESCE(v_user_name, v_email_name, 'User');
  END IF;

  v_first_name := COALESCE(NEW.raw_user_meta_data->>'first_name', SPLIT_PART(v_name, ' ', 1));
  v_last_name := COALESCE(NEW.raw_user_meta_data->>'last_name', SUBSTRING(v_name FROM POSITION(' ' IN v_name) + 1));

  NEW.raw_user_meta_data := 
    COALESCE(NEW.raw_user_meta_data, '{}'::jsonb) || 
    jsonb_build_object(
      'name', v_name,
      'full_name', v_name,
      'first_name', v_first_name,
      'last_name', v_last_name,
      'email_verified', true
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created_oauth_meta ON auth.users;
CREATE TRIGGER on_auth_user_created_oauth_meta
BEFORE INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_oauth_metadata();


-- 9. Backfill all existing users in auth.users whose name or full_name is currently missing
UPDATE auth.users u
SET raw_user_meta_data = 
  COALESCE(u.raw_user_meta_data, '{}'::jsonb) || 
  jsonb_build_object(
    'name', COALESCE(
      TRIM(CONCAT(COALESCE(p.first_name, ''), ' ', COALESCE(p.last_name, ''))),
      u.raw_user_meta_data->>'user_name',
      u.raw_user_meta_data->>'preferred_username',
      SPLIT_PART(u.email, '@', 1)
    ),
    'full_name', COALESCE(
      TRIM(CONCAT(COALESCE(p.first_name, ''), ' ', COALESCE(p.last_name, ''))),
      u.raw_user_meta_data->>'user_name',
      u.raw_user_meta_data->>'preferred_username',
      SPLIT_PART(u.email, '@', 1)
    ),
    'first_name', COALESCE(p.first_name, u.raw_user_meta_data->>'first_name', SPLIT_PART(u.email, '@', 1)),
    'last_name', COALESCE(p.last_name, u.raw_user_meta_data->>'last_name', ''),
    'college', COALESCE(p.college, u.raw_user_meta_data->>'college'),
    'branch', COALESCE(p.branch, u.raw_user_meta_data->>'branch'),
    'year', COALESCE(p.year, u.raw_user_meta_data->>'year'),
    'email_verified', true
  )
FROM public.profiles p
WHERE p.user_id = u.id
  AND (
    u.raw_user_meta_data->>'name' IS NULL OR 
    u.raw_user_meta_data->>'full_name' IS NULL OR
    TRIM(u.raw_user_meta_data->>'name') = '' OR 
    TRIM(u.raw_user_meta_data->>'full_name') = ''
  );


-- 10. Add banned_until and approval_status columns to public.profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS banned_until TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'approved';

-- Default existing accounts to approved
UPDATE public.profiles
SET approval_status = 'approved'
WHERE approval_status IS NULL;


-- 11. Real-time Trigger on auth.users to sync banned_until to public.profiles
CREATE OR REPLACE FUNCTION public.sync_user_banned_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET banned_until = NEW.banned_until
  WHERE user_id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_banned ON auth.users;
CREATE TRIGGER on_auth_user_banned
AFTER UPDATE OF banned_until ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.sync_user_banned_status();


-- 12. Backfill existing banned users from auth.users to public.profiles
UPDATE public.profiles p
SET banned_until = u.banned_until
FROM auth.users u
WHERE u.id = p.user_id AND u.banned_until IS NOT NULL;


-- 13. Ban & remove burner spam accounts (e.g. 'sipaxe3418@blobapps.com')
DELETE FROM public.profiles WHERE email = 'sipaxe3418@blobapps.com';
UPDATE auth.users 
SET banned_until = '2099-01-01 00:00:00+00'::timestamptz 
WHERE email = 'sipaxe3418@blobapps.com';


-- 14. Update handle_new_user() trigger function to assign approval_status
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
  -- Check if email domain is directly allowed (Gmail, Outlook, Yahoo, iCloud, HBTU, .ac.in, .edu)
  IF v_domain NOT IN ('gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'outlook.in', 'yahoo.com', 'yahoo.co.in', 'ymail.com', 'icloud.com', 'me.com', 'mac.com', 'hbtu.ac.in')
     AND v_domain !~* '\.(ac\.in|edu|edu\.in|res\.in)$' THEN
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


-- 15. Ensure Owners and Admins can update approval_status on public.profiles
DROP POLICY IF EXISTS "Owners and admins can update all profiles" ON public.profiles;
CREATE POLICY "Owners and admins can update all profiles"
ON public.profiles FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE user_email = auth.jwt()->>'email' AND role IN ('owner', 'admin')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE user_email = auth.jwt()->>'email' AND role IN ('owner', 'admin')
  )
);


-- 16. Ensure public.profiles is in supabase_realtime publication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'profiles'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END;
$$;

