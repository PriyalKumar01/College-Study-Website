-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars', 
  'avatars', 
  true,
  2097152, -- 2MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  file_size_limit = 2097152,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

-- Drop existing policies if they exist (to recreate clean)
DROP POLICY IF EXISTS "Allow authenticated users to upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update their avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete their avatars" ON storage.objects;

-- Allow authenticated users to upload avatars (INSERT)
CREATE POLICY "Allow authenticated users to upload avatars"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read access to avatars (SELECT)
CREATE POLICY "Allow public read access to avatars"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'avatars');

-- Allow authenticated users to update their own avatar (UPDATE)
CREATE POLICY "Allow authenticated users to update their avatars"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to delete their own avatar (DELETE)
CREATE POLICY "Allow authenticated users to delete their avatars"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);