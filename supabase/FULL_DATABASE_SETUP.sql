-- ==============================================================================
-- STUDYHUB UNLOCKED NEXUS - COMPLETE ALL-IN-ONE DATABASE SETUP SCRIPT
-- Run this entire script in your new Supabase Project:
-- Dashboard -> SQL Editor -> New Query -> Paste & Run!
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 1. ADMIN ROLES
-- ==========================================
CREATE TABLE IF NOT EXISTS public.admin_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT UNIQUE NOT NULL,
  user_phone TEXT,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by TEXT DEFAULT 'system'
);

ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow read admin roles" ON public.admin_roles;
CREATE POLICY "Allow read admin roles" ON public.admin_roles FOR SELECT USING (true);

DROP POLICY IF EXISTS "System can insert admin roles" ON public.admin_roles;
CREATE POLICY "System can insert admin roles" ON public.admin_roles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update admin roles" ON public.admin_roles;
CREATE POLICY "Admins can update admin roles" ON public.admin_roles FOR UPDATE USING (true);

-- Insert super admin
INSERT INTO public.admin_roles (user_email, user_phone, role)
VALUES ('priyalkumar06@gmail.com', '8957221543', 'super_admin')
ON CONFLICT (user_email) DO UPDATE SET role = 'super_admin';

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_roles
    WHERE user_email = auth.jwt() ->> 'email'
  );
END;
$$;

-- ==========================================
-- 2. PROFILES & AUTH TRIGGER
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  college TEXT,
  branch TEXT,
  year TEXT,
  mobile_number TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT profiles_user_id_key UNIQUE (user_id)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (true);

CREATE OR REPLACE FUNCTION public.upsert_my_profile(
  p_first_name     text    DEFAULT NULL,
  p_last_name      text    DEFAULT NULL,
  p_college        text    DEFAULT NULL,
  p_branch         text    DEFAULT NULL,
  p_year           text    DEFAULT NULL,
  p_email          text    DEFAULT NULL,
  p_mobile_number  text    DEFAULT NULL,
  p_avatar_url     text    DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO public.profiles (
    user_id, email, first_name, last_name, college, branch, year, mobile_number, avatar_url, updated_at
  )
  VALUES (
    v_uid,
    COALESCE(p_email, ''),
    p_first_name,
    p_last_name,
    p_college,
    p_branch,
    p_year,
    p_mobile_number,
    p_avatar_url,
    now()
  )
  ON CONFLICT (user_id)
  DO UPDATE SET
    first_name    = EXCLUDED.first_name,
    last_name     = EXCLUDED.last_name,
    college       = EXCLUDED.college,
    branch        = EXCLUDED.branch,
    year          = EXCLUDED.year,
    email         = COALESCE(EXCLUDED.email, profiles.email),
    mobile_number = EXCLUDED.mobile_number,
    avatar_url    = EXCLUDED.avatar_url,
    updated_at    = now();
END;
$$;

GRANT EXECUTE ON FUNCTION public.upsert_my_profile(text, text, text, text, text, text, text, text) TO authenticated, anon;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, email, mobile_number)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'first_name', 
    NEW.raw_user_meta_data->>'last_name', 
    NEW.email,
    NEW.raw_user_meta_data->>'mobile_number'
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 3. NOTES & DOWNLOAD TRACKING
-- ==========================================
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  semester TEXT NOT NULL,
  material_type TEXT NOT NULL,
  year TEXT,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  uploaded_by TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  status TEXT DEFAULT 'approved',
  approved BOOLEAN DEFAULT true,
  approved_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  approved_by TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view notes" ON public.notes;
CREATE POLICY "Public can view notes" ON public.notes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert notes" ON public.notes;
CREATE POLICY "Public can insert notes" ON public.notes FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update notes" ON public.notes;
CREATE POLICY "Public can update notes" ON public.notes FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public can delete notes" ON public.notes;
CREATE POLICY "Public can delete notes" ON public.notes FOR DELETE USING (true);

CREATE TABLE IF NOT EXISTS public.note_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note_title TEXT NOT NULL,
  note_url TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT,
  user_id TEXT,
  semester TEXT,
  subject TEXT,
  download_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT
);

ALTER TABLE public.note_downloads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access note_downloads" ON public.note_downloads;
CREATE POLICY "Public can access note_downloads" ON public.note_downloads FOR ALL USING (true);

-- ==========================================
-- 4. OPPORTUNITIES & SCHOLARSHIPS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  apply_url TEXT NOT NULL,
  deadline DATE,
  image_url TEXT,
  created_by TEXT NOT NULL,
  user_name TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access opportunities" ON public.opportunities;
CREATE POLICY "Public can access opportunities" ON public.opportunities FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.opportunity_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
  user_id UUID,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.opportunity_comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access opportunity_comments" ON public.opportunity_comments;
CREATE POLICY "Public can access opportunity_comments" ON public.opportunity_comments FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.opportunity_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.opportunity_likes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access opportunity_likes" ON public.opportunity_likes;
CREATE POLICY "Public can access opportunity_likes" ON public.opportunity_likes FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  org TEXT NOT NULL,
  amount TEXT NOT NULL,
  amount_num NUMERIC DEFAULT 0,
  deadline TEXT NOT NULL,
  level TEXT NOT NULL,
  type TEXT NOT NULL,
  marks TEXT NOT NULL,
  income TEXT NOT NULL,
  apply_url TEXT NOT NULL,
  description TEXT NOT NULL,
  who TEXT[] DEFAULT '{}'::TEXT[],
  streams TEXT[] DEFAULT '{}'::TEXT[],
  tags TEXT[] DEFAULT '{}'::TEXT[],
  status TEXT DEFAULT 'active',
  approval_status TEXT DEFAULT 'approved',
  submitted_by TEXT,
  submitted_by_email TEXT,
  submitted_by_user_id UUID,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access scholarships" ON public.scholarships;
CREATE POLICY "Public can access scholarships" ON public.scholarships FOR ALL USING (true);

-- ==========================================
-- 5. RESUME, CONTRIBUTORS, COMPANY & HR
-- ==========================================
CREATE TABLE IF NOT EXISTS public.resume_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  file_name TEXT,
  file_path TEXT,
  overall_score NUMERIC,
  analysis_result JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access resume_analyses" ON public.resume_analyses;
CREATE POLICY "Public can access resume_analyses" ON public.resume_analyses FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.contributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  branch TEXT,
  year TEXT,
  contributions INTEGER DEFAULT 0,
  avatar_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  email TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.contributors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access contributors" ON public.contributors;
CREATE POLICY "Public can access contributors" ON public.contributors FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.company_directory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  no integer,
  name text NOT NULL,
  type text NOT NULL DEFAULT 'MNC',
  sector text NOT NULL DEFAULT '',
  url text NOT NULL,
  mode text NOT NULL DEFAULT 'Off-Campus',
  branches text NOT NULL DEFAULT '',
  note text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.company_directory ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access company_directory" ON public.company_directory;
CREATE POLICY "Public can access company_directory" ON public.company_directory FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.hr_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  hr_email text UNIQUE NOT NULL,
  name text,
  designation text,
  type text NOT NULL DEFAULT 'MNC',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hr_contacts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access hr_contacts" ON public.hr_contacts;
CREATE POLICY "Public can access hr_contacts" ON public.hr_contacts FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.coupon_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_percent integer NOT NULL DEFAULT 0 CHECK (discount_percent BETWEEN 0 AND 100),
  applicable_plan text NOT NULL DEFAULT 'all',
  max_uses integer DEFAULT NULL,
  used_count integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.coupon_codes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access coupon_codes" ON public.coupon_codes;
CREATE POLICY "Public can access coupon_codes" ON public.coupon_codes FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.premium_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  plan text NOT NULL,
  amount_paid integer NOT NULL DEFAULT 0,
  original_amount integer NOT NULL,
  coupon_used text DEFAULT NULL,
  discount_percent integer NOT NULL DEFAULT 0,
  razorpay_order_id text DEFAULT NULL,
  razorpay_payment_id text DEFAULT NULL,
  razorpay_signature text DEFAULT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  purchased_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.premium_purchases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access premium_purchases" ON public.premium_purchases;
CREATE POLICY "Public can access premium_purchases" ON public.premium_purchases FOR ALL USING (true);

-- ==========================================
-- 6. NOTIFICATIONS & EMAIL SYSTEMS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  sent_by text NOT NULL DEFAULT 'Priyal Kumar',
  sent_by_email text,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access notifications" ON public.notifications;
CREATE POLICY "Public can access notifications" ON public.notifications FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.user_notification_reads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  notification_id uuid NOT NULL REFERENCES public.notifications(id) ON DELETE CASCADE,
  read_at timestamptz DEFAULT now(),
  UNIQUE(user_id, notification_id)
);

ALTER TABLE public.user_notification_reads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access user_notification_reads" ON public.user_notification_reads;
CREATE POLICY "Public can access user_notification_reads" ON public.user_notification_reads FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.signup_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  full_name TEXT,
  username TEXT,
  status TEXT DEFAULT 'pending',
  error_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.signup_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access signup_attempts" ON public.signup_attempts;
CREATE POLICY "Public can access signup_attempts" ON public.signup_attempts FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  logo_url TEXT,
  banner_url TEXT,
  body_text TEXT NOT NULL,
  button_1_text TEXT,
  button_1_url TEXT,
  button_2_text TEXT,
  button_2_url TEXT,
  button_3_text TEXT,
  button_3_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access email_templates" ON public.email_templates;
CREATE POLICY "Public can access email_templates" ON public.email_templates FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_id UUID REFERENCES public.email_templates(id) ON DELETE SET NULL,
  target_group TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  total_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access email_campaigns" ON public.email_campaigns;
CREATE POLICY "Public can access email_campaigns" ON public.email_campaigns FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  resend_email_id TEXT,
  status TEXT NOT NULL,
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access email_logs" ON public.email_logs;
CREATE POLICY "Public can access email_logs" ON public.email_logs FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.blocked_email_domains (
  domain TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.blocked_email_domains ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access blocked_email_domains" ON public.blocked_email_domains;
CREATE POLICY "Public can access blocked_email_domains" ON public.blocked_email_domains FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.ai_rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  query_text TEXT,
  response_type TEXT DEFAULT 'chat',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ai_rate_limits ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access ai_rate_limits" ON public.ai_rate_limits;
CREATE POLICY "Public can access ai_rate_limits" ON public.ai_rate_limits FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS public.ai_pdf_uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  file_name TEXT,
  analysis_type TEXT DEFAULT 'pyq_analyzer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ai_pdf_uploads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can access ai_pdf_uploads" ON public.ai_pdf_uploads;
CREATE POLICY "Public can access ai_pdf_uploads" ON public.ai_pdf_uploads FOR ALL USING (true);

-- ==========================================
-- 7. COLLEGE STATS FUNCTIONS
-- ==========================================
CREATE OR REPLACE FUNCTION public.get_college_stats()
RETURNS TABLE(college_name text, student_count bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH categorized AS (
    SELECT 
      CASE 
        WHEN college IS NOT NULL AND (
          TRIM(college) ILIKE '%hbtu%' OR 
          TRIM(college) ILIKE '%harcourt%' OR 
          TRIM(college) ILIKE '%hbtuk%'
        ) THEN 'HBTU'
        WHEN (college IS NULL OR TRIM(college) = '') AND (
          branch IS NOT NULL AND branch <> 'Other Colleges' AND branch <> ''
        ) THEN 'HBTU'
        ELSE 'Other'
      END as cat_name
    FROM public.profiles
  )
  SELECT 
    cat_name as college_name,
    COUNT(*)::bigint as student_count
  FROM categorized
  GROUP BY cat_name
  ORDER BY student_count DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_college_stats() TO authenticated, anon, service_role;

CREATE OR REPLACE FUNCTION public.get_total_students_count()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (SELECT COUNT(*)::integer FROM public.profiles);
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_total_students_count() TO authenticated, anon, service_role;

-- ==========================================
-- 8. STORAGE BUCKETS SETUP
-- ==========================================
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES 
  ('study-materials', 'study-materials', true, 52428800),
  ('avatars', 'avatars', true, 5242880),
  ('notes-files', 'notes-files', true, 52428800),
  ('opportunity-images', 'opportunity-images', true, 10485760),
  ('scholarship-images', 'scholarship-images', true, 10485760)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public access to storage" ON storage.objects;
CREATE POLICY "Public access to storage"
ON storage.objects FOR SELECT
USING (bucket_id IN ('study-materials', 'avatars', 'notes-files', 'opportunity-images', 'scholarship-images'));

DROP POLICY IF EXISTS "Allow uploads to storage" ON storage.objects;
CREATE POLICY "Allow uploads to storage"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id IN ('study-materials', 'avatars', 'notes-files', 'opportunity-images', 'scholarship-images'));

DROP POLICY IF EXISTS "Allow updates to storage" ON storage.objects;
CREATE POLICY "Allow updates to storage"
ON storage.objects FOR UPDATE
USING (bucket_id IN ('study-materials', 'avatars', 'notes-files', 'opportunity-images', 'scholarship-images'));

DROP POLICY IF EXISTS "Allow deletes to storage" ON storage.objects;
CREATE POLICY "Allow deletes to storage"
ON storage.objects FOR DELETE
USING (bucket_id IN ('study-materials', 'avatars', 'notes-files', 'opportunity-images', 'scholarship-images'));
