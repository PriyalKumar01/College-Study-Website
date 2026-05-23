-- Deduplicate any existing profile rows per user (keep most recent)
DELETE FROM public.profiles a
USING public.profiles b
WHERE a.user_id = b.user_id
  AND a.updated_at < b.updated_at;

-- Add unique constraint so upsert(onConflict: user_id) works
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);