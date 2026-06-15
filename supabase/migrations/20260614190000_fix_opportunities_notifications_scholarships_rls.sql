-- ============================================================
-- Fix RLS policies for opportunities, notifications, and scholarships
-- Prevents "permission denied for table users" error caused by
-- querying auth.users table in RLS policies.
-- ============================================================

-- 1. opportunities Table RLS Policies
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view opportunities" ON public.opportunities;
DROP POLICY IF EXISTS "Admins can insert opportunities" ON public.opportunities;
DROP POLICY IF EXISTS "Admins can update opportunities" ON public.opportunities;
DROP POLICY IF EXISTS "Admins can delete opportunities" ON public.opportunities;
DROP POLICY IF EXISTS "Admin can insert opportunities" ON public.opportunities;
DROP POLICY IF EXISTS "Admin can update opportunities" ON public.opportunities;
DROP POLICY IF EXISTS "Allow public read access" ON public.opportunities;
DROP POLICY IF EXISTS "Allow admin insert" ON public.opportunities;
DROP POLICY IF EXISTS "Allow admin update" ON public.opportunities;
DROP POLICY IF EXISTS "Allow admin delete" ON public.opportunities;

CREATE POLICY "Anyone can view opportunities"
ON public.opportunities FOR SELECT
USING (true);

CREATE POLICY "Admins can insert opportunities"
ON public.opportunities FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admins can update opportunities"
ON public.opportunities FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
)
WITH CHECK (true);

CREATE POLICY "Admins can delete opportunities"
ON public.opportunities FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
);

-- Fix check constraint on opportunities type column to allow frontend values
ALTER TABLE public.opportunities DROP CONSTRAINT IF EXISTS opportunities_type_check;
ALTER TABLE public.opportunities ADD CONSTRAINT opportunities_type_check CHECK (
  type IN ('Job', 'Internship', 'Hackathon', 'Competition', 'Full-Time', 'Hackathons', 'Challenges', 'Contests', 'Others')
);


-- 2. notifications Table RLS Policies
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Only owner can manage notifications" ON public.notifications;

CREATE POLICY "Only owner can manage notifications"
ON public.notifications FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
    AND ar.role = 'owner'
  )
);


-- 3. scholarships Table RLS Policies
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view scholarships" ON public.scholarships;
DROP POLICY IF EXISTS "Admins can insert scholarships" ON public.scholarships;
DROP POLICY IF EXISTS "Admins can update scholarships" ON public.scholarships;
DROP POLICY IF EXISTS "Admins can delete scholarships" ON public.scholarships;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.scholarships;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.scholarships;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.scholarships;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON public.scholarships;

CREATE POLICY "Anyone can view scholarships"
ON public.scholarships FOR SELECT
USING (true);

CREATE POLICY "Admins can insert scholarships"
ON public.scholarships FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admins can update scholarships"
ON public.scholarships FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
)
WITH CHECK (true);

CREATE POLICY "Admins can delete scholarships"
ON public.scholarships FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
);
