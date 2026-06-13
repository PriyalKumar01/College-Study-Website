-- Allow owner (priyalkumar06@gmail.com) to update admin roles (name, dates)
-- Also allow any admin to update admin roles (for the owner dashboard)
DROP POLICY IF EXISTS "Owner can update admin roles" ON public.admin_roles;

CREATE POLICY "Owner can update admin roles"
ON public.admin_roles
FOR UPDATE
USING (
  -- Allow if the current user's email is in admin_roles (i.e. they are an admin/owner)
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
)
WITH CHECK (true);
