-- ===========================================================================
-- MIGRATION: Fix College Stats RPC, Total Counts & Storage Bucket Permissions
-- ===========================================================================

-- 1. Ensure study-materials bucket exists with 50MB file size limit
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'study-materials', 
  'study-materials', 
  true, 
  52428800, -- 50 MB
  ARRAY['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800;

-- 2. Storage Policies for study-materials
DROP POLICY IF EXISTS "Public read access for study-materials" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload study-materials" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own study-materials" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete study-materials" ON storage.objects;

CREATE POLICY "Public read access for study-materials"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'study-materials');

CREATE POLICY "Authenticated users can upload study-materials"
ON storage.objects FOR INSERT
TO authenticated, anon
WITH CHECK (bucket_id = 'study-materials');

CREATE POLICY "Users can update their own study-materials"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'study-materials');

CREATE POLICY "Users can delete study-materials"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'study-materials');


-- 3. Robust get_college_stats RPC
-- Returns accurate aggregated counts partitioned by HBTU vs other colleges
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

GRANT EXECUTE ON FUNCTION public.get_college_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_college_stats() TO anon;
GRANT EXECUTE ON FUNCTION public.get_college_stats() TO service_role;


-- 4. Get all students count RPC
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

GRANT EXECUTE ON FUNCTION public.get_total_students_count() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_total_students_count() TO anon;
GRANT EXECUTE ON FUNCTION public.get_total_students_count() TO service_role;
