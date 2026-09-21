-- Add missing columns to support full CSV data import
ALTER TABLE public.admin_roles ADD COLUMN IF NOT EXISTS user_name TEXT;
ALTER TABLE public.admin_roles ADD COLUMN IF NOT EXISTS from_date DATE;
ALTER TABLE public.admin_roles ADD COLUMN IF NOT EXISTS to_date DATE;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS banned_until TIMESTAMPTZ;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'approved';

ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS duration TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS eligibility TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS category TEXT;

ALTER TABLE public.contributors ADD COLUMN IF NOT EXISTS batch TEXT;
ALTER TABLE public.contributors ADD COLUMN IF NOT EXISTS coins INTEGER DEFAULT 0;
ALTER TABLE public.contributors ADD COLUMN IF NOT EXISTS image_url TEXT;

ALTER TABLE public.email_templates ADD COLUMN IF NOT EXISTS header_url TEXT;
ALTER TABLE public.email_templates ADD COLUMN IF NOT EXISTS show_header_image BOOLEAN DEFAULT true;

ALTER TABLE public.premium_purchases ADD COLUMN IF NOT EXISTS target_branch TEXT;
