-- ===========================================================================
-- MIGRATION: Fix Contributors Role Constraint & Add Owners Profiles SELECT Policy
-- ===========================================================================

-- 1. Contributors table fixes (allow null / set default 'Contributor' for role)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'contributors' AND column_name = 'role'
  ) THEN
    ALTER TABLE public.contributors ALTER COLUMN role DROP NOT NULL;
    ALTER TABLE public.contributors ALTER COLUMN role SET DEFAULT 'Contributor';
  ELSE
    ALTER TABLE public.contributors ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'Contributor';
  END IF;
END $$;

-- 2. Ensure Owners and Admins can read all profiles (required for pending account approvals & user metrics)
DROP POLICY IF EXISTS "Owners and admins can read all profiles" ON public.profiles;
CREATE POLICY "Owners and admins can read all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
  OR EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE user_email = auth.jwt()->>'email' AND role IN ('owner', 'admin')
  )
);

-- 3. Dedicated security definer function to fetch pending approvals reliably
CREATE OR REPLACE FUNCTION public.get_pending_account_approvals()
RETURNS SETOF public.profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify caller is admin or owner
  IF NOT EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE user_email = auth.jwt()->>'email' AND role IN ('owner', 'admin')
  ) THEN
    RAISE EXCEPTION 'Access denied: Admin or owner role required';
  END IF;

  RETURN QUERY
  SELECT *
  FROM public.profiles
  WHERE approval_status = 'pending'
  ORDER BY created_at DESC;
END;
$$;

-- 4. Helper function to atomically increment coins or insert a new contributor
CREATE OR REPLACE FUNCTION public.increment_or_add_contributor(
  p_name   TEXT,
  p_count  INTEGER DEFAULT 1,
  p_branch TEXT DEFAULT '',
  p_batch  TEXT DEFAULT ''
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
  v_trimmed TEXT := TRIM(p_name);
BEGIN
  IF v_trimmed IS NULL OR v_trimmed = '' THEN
    RETURN;
  END IF;

  SELECT id INTO v_id
  FROM public.contributors
  WHERE LOWER(TRIM(name)) = LOWER(v_trimmed)
  LIMIT 1;

  IF v_id IS NOT NULL THEN
    UPDATE public.contributors
    SET coins = COALESCE(coins, 0) + GREATEST(1, COALESCE(p_count, 1))
    WHERE id = v_id;
  ELSE
    INSERT INTO public.contributors (name, role, branch, batch, coins)
    VALUES (
      v_trimmed,
      'Contributor',
      COALESCE(NULLIF(TRIM(p_branch), ''), 'Engineering'),
      COALESCE(NULLIF(TRIM(p_batch), ''), TO_CHAR(now(), 'YY')),
      GREATEST(1, COALESCE(p_count, 1))
    );
  END IF;
END;
$$;
