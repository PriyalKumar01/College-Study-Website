-- Create a security definer function to return the total students count bypassing RLS
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

-- Grant execution permissions
GRANT EXECUTE ON FUNCTION public.get_total_students_count() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_total_students_count() TO anon;
GRANT EXECUTE ON FUNCTION public.get_total_students_count() TO service_role;
