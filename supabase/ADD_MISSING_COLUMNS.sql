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


-- Add is_trending flag to opportunities
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS is_trending BOOLEAN DEFAULT false;
COMMENT ON COLUMN public.opportunities.is_trending IS 'Flag for highlighting top opportunities in trending banner';

-- Ensure unique constraint on user_id and plan
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'uq_premium_purchases_user_plan'
  ) THEN 
    ALTER TABLE public.premium_purchases ADD CONSTRAINT uq_premium_purchases_user_plan UNIQUE (user_id, plan);
  END IF;
END $$;

DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'premium_purchases' AND policyname = 'Users can update their own purchases'
  ) THEN 
    CREATE POLICY "Users can update their own purchases"
      ON public.premium_purchases FOR UPDATE
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;