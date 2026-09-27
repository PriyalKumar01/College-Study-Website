-- ==============================================================================
-- Migration: Add DELETE policy and remove_admin_role RPC on public.admin_roles
-- ==============================================================================

-- 1. Enable RLS and add DELETE policy for Owner / Super Admin
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owner can delete admin roles" ON public.admin_roles;
CREATE POLICY "Owner can delete admin roles"
ON public.admin_roles FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
    AND ar.role IN ('owner', 'super_admin')
  )
  OR auth.jwt() ->> 'email' = 'priyalkumar06@gmail.com'
);

-- 2. SECURITY DEFINER RPC function to delete an admin role cleanly
CREATE OR REPLACE FUNCTION public.remove_admin_role(p_role_id UUID, p_email TEXT DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller_email TEXT;
BEGIN
  caller_email := auth.jwt() ->> 'email';
  
  IF caller_email != 'priyalkumar06@gmail.com' AND NOT EXISTS (
    SELECT 1 FROM public.admin_roles
    WHERE user_email = caller_email AND role IN ('owner', 'super_admin')
  ) THEN
    RAISE EXCEPTION 'Access denied: Only owner can remove admins.';
  END IF;

  DELETE FROM public.admin_roles
  WHERE id = p_role_id OR (p_email IS NOT NULL AND user_email = p_email);

  RETURN true;
END;
$$;
