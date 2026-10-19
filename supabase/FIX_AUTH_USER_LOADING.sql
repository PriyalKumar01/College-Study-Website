-- ==============================================================================
-- STUDYHUB UNLOCKED NEXUS - FIX USER LOADING & DASHBOARD MANAGEMENT
-- ==============================================================================
-- Fixes:
-- 1. "Failed to delete user: Database error loading user"
-- 2. Links auth.identities for all 2,484 unique users so GoTrue can manage them.
-- 3. Sets empty string defaults for auth tokens to satisfy GoTrue scanner.
--
-- How to run:
-- 1. Open Supabase Project Dashboard (https://supabase.com/dashboard)
-- 2. Click "SQL Editor" -> "New query" -> Paste this -> Click "Run"
-- ==============================================================================

-- Step 1: Fix all NULL token strings in auth.users (fixes GoTrue Scan error)
UPDATE auth.users
SET 
  confirmation_token = COALESCE(confirmation_token, ''),
  recovery_token = COALESCE(recovery_token, ''),
  email_change_token_new = COALESCE(email_change_token_new, ''),
  email_change = COALESCE(email_change, ''),
  email_change_token_current = COALESCE(email_change_token_current, ''),
  phone_change = COALESCE(phone_change, ''),
  phone_change_token = COALESCE(phone_change_token, ''),
  reauthentication_token = COALESCE(reauthentication_token, ''),
  is_sso_user = COALESCE(is_sso_user, false)
WHERE confirmation_token IS NULL 
   OR recovery_token IS NULL 
   OR email_change_token_new IS NULL
   OR email_change IS NULL;

-- Step 2: Ensure auth.identities exists for all users so Dashboard can load and delete them
INSERT INTO auth.identities (
  id,
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT
  gen_random_uuid(),
  u.id::text,
  u.id,
  jsonb_build_object('sub', u.id::text, 'email', u.email),
  'email',
  now(),
  now(),
  now()
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM auth.identities i WHERE i.user_id = u.id
)
ON CONFLICT DO NOTHING;

-- Step 3: Verification Check
SELECT 
  (SELECT COUNT(*) FROM auth.users) AS total_auth_users,
  (SELECT COUNT(*) FROM auth.identities) AS total_identities,
  (SELECT COUNT(*) FROM public.profiles) AS total_profiles;
