-- Add user_name and date columns to admin_roles for recognition feature
ALTER TABLE public.admin_roles ADD COLUMN IF NOT EXISTS user_name text;
ALTER TABLE public.admin_roles ADD COLUMN IF NOT EXISTS from_date date;
ALTER TABLE public.admin_roles ADD COLUMN IF NOT EXISTS to_date date;
