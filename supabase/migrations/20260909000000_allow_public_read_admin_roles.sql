-- Allow public read access to admin_roles so that Admin Team is visible on the contributors page
DROP POLICY IF EXISTS "Anyone can read admin roles" ON public.admin_roles;
CREATE POLICY "Anyone can read admin roles"
ON public.admin_roles FOR SELECT
USING (true);
