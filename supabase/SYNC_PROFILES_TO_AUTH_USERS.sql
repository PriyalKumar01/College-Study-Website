-- ==============================================================================
-- STUDYHUB UNLOCKED NEXUS - SYNC ALL 3,000+ PROFILES INTO AUTH.USERS
-- ==============================================================================
-- Why run this?
-- 1. Copies all 3,096 users from public.profiles into auth.users.
-- 2. Deduplicates emails (handles multiple profile entries per email safely).
-- 3. Avoids type-casting errors (no uuid = text issues).
-- 4. Instantly makes all 3,096 users visible in Supabase Dashboard -> Authentication -> Users!
--
-- How to run:
-- 1. Open your Supabase Project Dashboard (https://supabase.com/dashboard)
-- 2. Click "SQL Editor" on the left menu
-- 3. Click "New query" -> Paste this entire script -> Click "Run" (green button)
-- ==============================================================================

INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin
)
SELECT DISTINCT ON (LOWER(TRIM(p.email)))
  COALESCE(p.user_id, gen_random_uuid()),
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  LOWER(TRIM(p.email)),
  '', -- empty encrypted password for OTP / Google Sign-in
  COALESCE(p.created_at, now()),
  COALESCE(p.created_at, now()),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  jsonb_build_object(
    'first_name', p.first_name,
    'last_name', p.last_name,
    'college', p.college,
    'branch', p.branch,
    'year', p.year
  ),
  false
FROM public.profiles p
WHERE p.email IS NOT NULL 
  AND p.email LIKE '%@%'
  -- Strictly exclude any email that ALREADY exists in auth.users
  AND LOWER(TRIM(p.email)) NOT IN (
    SELECT LOWER(TRIM(email)) 
    FROM auth.users 
    WHERE email IS NOT NULL
  )
  -- Strictly exclude any user_id that ALREADY exists in auth.users
  AND p.user_id NOT IN (
    SELECT id 
    FROM auth.users
  )
ORDER BY LOWER(TRIM(p.email)), p.created_at DESC NULLS LAST
ON CONFLICT (id) DO NOTHING;

-- Verification count: Shows total users in both places
SELECT 
  (SELECT COUNT(*) FROM auth.users) AS total_auth_users,
  (SELECT COUNT(*) FROM public.profiles) AS total_profiles;
