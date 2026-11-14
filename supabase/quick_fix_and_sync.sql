-- ==============================================================================
-- STUDYHUB UNLOCKED - ALL-IN-ONE FIX & SYNC SCRIPT
-- 1. Sync all notes on Supabase storage to Cloudflare R2 (100% Zero Egress)
-- 2. Create get_user_count() RPC function (Synchronizes Home, About, Dashboards: 3,290)
-- 3. Create recommended_notes table (Owner Star Recommendations live for all users)
-- ==============================================================================

-- 1. Update notes to point to Cloudflare R2 CDN (Eliminates Supabase storage egress)
UPDATE public.notes
SET file_url = REPLACE(file_url, 'https://axalbmmjqdezbkpffore.supabase.co/storage/v1/object/public/', 'https://pub-a7a8e9cce7e14983a69b9c28a6487e28.r2.dev/')
WHERE file_url LIKE '%axalbmmjqdezbkpffore.supabase.co%';

UPDATE public.notes
SET file_url = REPLACE(file_url, 'https://xjxdauvimiflzbozycki.supabase.co/storage/v1/object/public/', 'https://pub-a7a8e9cce7e14983a69b9c28a6487e28.r2.dev/')
WHERE file_url LIKE '%xjxdauvimiflzbozycki.supabase.co%';

-- 2. Fast User Count RPC Function (Publicly readable, cached on frontend for 1 hour)
CREATE OR REPLACE FUNCTION public.get_user_count()
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count(*) FROM public.profiles;
$$;

GRANT EXECUTE ON FUNCTION public.get_user_count() TO anon, authenticated;

-- 3. Recommended Notes Table for Dynamic Owner Star Toggle
CREATE TABLE IF NOT EXISTS public.recommended_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_key text NOT NULL UNIQUE,
  note_title text,
  is_recommended boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.recommended_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read recommended_notes" ON public.recommended_notes;
CREATE POLICY "Public read recommended_notes" ON public.recommended_notes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public write recommended_notes" ON public.recommended_notes;
CREATE POLICY "Public write recommended_notes" ON public.recommended_notes FOR ALL USING (true);

-- 4. Admin Applications Table for Student Admin Recruitment
CREATE TABLE IF NOT EXISTS public.admin_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text,
  phone text,
  branch text NOT NULL,
  batch_year text NOT NULL,
  college text NOT NULL,
  reason text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.admin_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on admin_applications" ON public.admin_applications;
CREATE POLICY "Allow public insert on admin_applications"
  ON public.admin_applications
  FOR INSERT
  TO public, anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all select on admin_applications" ON public.admin_applications;
CREATE POLICY "Allow all select on admin_applications"
  ON public.admin_applications
  FOR SELECT
  TO public, anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow all update on admin_applications" ON public.admin_applications;
CREATE POLICY "Allow all update on admin_applications"
  ON public.admin_applications
  FOR UPDATE
  TO public, anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow all delete on admin_applications" ON public.admin_applications;
CREATE POLICY "Allow all delete on admin_applications"
  ON public.admin_applications
  FOR DELETE
  TO public, anon, authenticated
  USING (true);
