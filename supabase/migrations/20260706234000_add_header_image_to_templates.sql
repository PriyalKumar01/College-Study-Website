-- Add header banner support to email templates
ALTER TABLE public.email_templates
ADD COLUMN IF NOT EXISTS header_url TEXT,
ADD COLUMN IF NOT EXISTS show_header_image BOOLEAN DEFAULT FALSE;
