-- Create a security definer function to return user counts grouped by college, bypassing client-side RLS constraints
CREATE OR REPLACE FUNCTION public.get_college_stats()
RETURNS TABLE(college_name text, student_count bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(NULLIF(TRIM(college), ''), 'Other')::text as college_name,
    COUNT(*)::bigint as student_count
  FROM public.profiles
  GROUP BY COALESCE(NULLIF(TRIM(college), ''), 'Other')
  ORDER BY student_count DESC;
END;
$$;

-- Grant execution permissions
GRANT EXECUTE ON FUNCTION public.get_college_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_college_stats() TO anon;
GRANT EXECUTE ON FUNCTION public.get_college_stats() TO service_role;
