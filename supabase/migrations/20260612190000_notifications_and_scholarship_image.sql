-- Add image_url to scholarships table (optional field)
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS image_url text;

-- Add submitted_by_user_id to track who submitted (for edit permissions)
ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS submitted_by_user_id uuid;

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  sent_by text NOT NULL DEFAULT 'Priyal Kumar',
  sent_by_email text,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Everyone can read notifications
CREATE POLICY "Anyone can read notifications"
  ON public.notifications FOR SELECT
  USING (true);

-- Only owner can insert/update/delete notifications
CREATE POLICY "Only owner can manage notifications"
  ON public.notifications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles
      WHERE user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
      AND role = 'owner'
    )
  );

-- Create user_notification_reads table to track which notifications user has seen
CREATE TABLE IF NOT EXISTS public.user_notification_reads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  notification_id uuid NOT NULL REFERENCES public.notifications(id) ON DELETE CASCADE,
  read_at timestamptz DEFAULT now(),
  UNIQUE(user_id, notification_id)
);

ALTER TABLE public.user_notification_reads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own reads"
  ON public.user_notification_reads FOR ALL
  USING (auth.uid() = user_id);
