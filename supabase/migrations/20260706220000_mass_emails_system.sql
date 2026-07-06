-- Mass Personalized Email Campaign & Signup Tracking System Migration

-- 1. Create Signup Attempts tracking table
CREATE TABLE IF NOT EXISTS public.signup_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  full_name TEXT,
  username TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'failed'
  error_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Email Templates table
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

-- 3. Create Email Campaigns table
CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_id UUID REFERENCES public.email_templates(id) ON DELETE SET NULL,
  target_group TEXT NOT NULL, -- 'failed_verification', 'failed_signups', 'verified', 'all', 'custom'
  status TEXT DEFAULT 'draft', -- 'draft', 'sending', 'completed', 'failed', 'paused'
  total_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 4. Create Email Logs table
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  resend_email_id TEXT,
  status TEXT NOT NULL, -- 'queued', 'sent', 'opened', 'clicked', 'bounced', 'failed'
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on all new tables
ALTER TABLE public.signup_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Create Policies (drop existing first to make migration idempotent)

-- 1. Signup Attempts Policies
DROP POLICY IF EXISTS "Anyone can insert signup attempts" ON public.signup_attempts;
-- Anyone (even anonymous guests) can insert a signup attempt when they fill in the registration form
CREATE POLICY "Anyone can insert signup attempts"
ON public.signup_attempts FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can select signup attempts" ON public.signup_attempts;
-- Only owners/admins can read signup attempts
CREATE POLICY "Admins can select signup attempts"
ON public.signup_attempts FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
);

DROP POLICY IF EXISTS "Admins can update signup attempts" ON public.signup_attempts;
-- Only owners/admins can update/delete signup attempts
CREATE POLICY "Admins can update signup attempts"
ON public.signup_attempts FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can delete signup attempts" ON public.signup_attempts;
CREATE POLICY "Admins can delete signup attempts"
ON public.signup_attempts FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
);


-- 2. Email Templates Policies
DROP POLICY IF EXISTS "Admins can manage templates" ON public.email_templates;
CREATE POLICY "Admins can manage templates"
ON public.email_templates
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
);

-- 3. Email Campaigns Policies
DROP POLICY IF EXISTS "Admins can manage campaigns" ON public.email_campaigns;
CREATE POLICY "Admins can manage campaigns"
ON public.email_campaigns
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
);

-- 4. Email Logs Policies
DROP POLICY IF EXISTS "Admins can manage logs" ON public.email_logs;
CREATE POLICY "Admins can manage logs"
ON public.email_logs
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  )
);


-- Create Trigger to automatically mark signup attempts as verified when profile is created
CREATE OR REPLACE FUNCTION public.handle_profile_verification_sync()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.signup_attempts
  SET status = 'verified', updated_at = now()
  WHERE email = NEW.email AND status = 'pending';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger if it exists
DROP TRIGGER IF EXISTS sync_signup_attempt_verification ON public.profiles;
CREATE TRIGGER sync_signup_attempt_verification
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_profile_verification_sync();


-- Seed default template
INSERT INTO public.email_templates (
  name,
  subject,
  logo_url,
  banner_url,
  body_text,
  button_1_text,
  button_1_url,
  button_2_text,
  button_2_url,
  button_3_text,
  button_3_url
) VALUES (
  'College Study Default Promo Template',
  'Exclusive Updates and Opportunities - College Study Website',
  'https://axalbmmjqdezbkpffore.supabase.co/storage/v1/object/public/study-materials/logo.png', -- default logo placeholder
  '/college_study_email_poster.png', -- will resolve relative to domain on client side, or full URL
  'We have added some amazing resources, scholarships, and opportunities for HBTU students on the **College Study** website. Check them out now to stay ahead in your academics and career!',
  'Check Scholarships 🎓',
  '/scholarship-portal',
  'Explore Opportunities 💼',
  '/opportunities',
  'Placement Prep 🚀',
  '/placement-preparation'
) ON CONFLICT DO NOTHING;

-- RPC to securely fetch user login activity from auth.users (for admins/owners only)
CREATE OR REPLACE FUNCTION public.get_user_login_activity()
RETURNS TABLE (
  id UUID,
  email TEXT,
  full_name TEXT,
  provider TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  last_sign_in_at TIMESTAMP WITH TIME ZONE,
  is_verified BOOLEAN
) AS $$
BEGIN
  -- Check if the calling user is an admin or owner
  IF NOT EXISTS (
    SELECT 1 FROM public.admin_roles ar
    WHERE ar.user_email = auth.jwt() ->> 'email'
  ) THEN
    RAISE EXCEPTION 'Unauthorized: Only admins or owners can access login activity logs.';
  END IF;

  RETURN QUERY
  SELECT 
    u.id,
    u.email::TEXT,
    COALESCE(p.first_name || ' ' || COALESCE(p.last_name, ''), '')::TEXT,
    COALESCE(u.raw_app_meta_data->>'provider', 'Email')::TEXT as provider,
    u.created_at,
    u.last_sign_in_at,
    (u.email_confirmed_at IS NOT NULL) as is_verified
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.user_id = u.id
  ORDER BY u.last_sign_in_at DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;
