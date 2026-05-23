-- ============================================================
-- Fix: profiles INSERT RLS blocks the handle_new_user trigger
-- The trigger runs outside any auth session so auth.uid() = NULL,
-- causing the existing WITH CHECK (auth.uid() = user_id) to fail.
-- Solution: drop the restrictive INSERT policy and recreate the
-- trigger function with SECURITY DEFINER + SET search_path,
-- which bypasses RLS for the trigger insert.
-- ============================================================

-- 1. Drop the old INSERT policy that blocks the trigger
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- 2. Recreate INSERT policy – allows authenticated users to insert
--    their own row from the frontend (upsert in ProfileCompletionModal)
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 3. Recreate handle_new_user with proper SECURITY DEFINER so it
--    can insert into profiles without being blocked by RLS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Skip if a profile already exists for this user (idempotent)
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = NEW.id) THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.profiles (
    user_id,
    email,
    first_name,
    last_name,
    mobile_number,
    college,
    branch,
    year
  ) VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'mobile_number',
    NEW.raw_user_meta_data->>'college',
    NEW.raw_user_meta_data->>'branch',
    NEW.raw_user_meta_data->>'year'
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Profile already exists (race condition) – just continue
    RETURN NEW;
END;
$$;

-- 4. Ensure the trigger exists (recreate in case it was dropped)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
