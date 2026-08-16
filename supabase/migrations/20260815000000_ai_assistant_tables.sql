-- =========================================================
--  AI Assistant Rate Limiting & Logging Tables
--  Migration: 20260815000000_ai_assistant_tables.sql
-- =========================================================

-- ── ai_rate_limits: tracks per-user daily query usage ─────
CREATE TABLE IF NOT EXISTS public.ai_rate_limits (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email  TEXT        NOT NULL,
  query_text  TEXT,
  response_type TEXT      DEFAULT 'chat', -- 'chat' | 'pdf_analyze' | 'ats_score'
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast daily count lookups per email
CREATE INDEX IF NOT EXISTS idx_ai_rate_limits_email_date
  ON public.ai_rate_limits (user_email, created_at);

-- ── RLS: edge function writes via service role; users can view own ─
ALTER TABLE public.ai_rate_limits ENABLE ROW LEVEL SECURITY;

-- Users can view their own rate limit entries (to show count in UI)
CREATE POLICY "Users can view own rate limits"
  ON public.ai_rate_limits
  FOR SELECT
  USING (user_email = auth.jwt() ->> 'email');

-- Service role (edge function) can insert
CREATE POLICY "Service role can insert rate limits"
  ON public.ai_rate_limits
  FOR INSERT
  WITH CHECK (true);

-- ── Cleanup function: auto-delete entries older than 7 days ─
CREATE OR REPLACE FUNCTION public.cleanup_old_ai_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.ai_rate_limits
  WHERE created_at < NOW() - INTERVAL '7 days';
END;
$$;

-- Grant execute to service role
GRANT EXECUTE ON FUNCTION public.cleanup_old_ai_rate_limits() TO service_role;

-- ── ai_pdf_uploads: optional tracking for PDF analysis ────
CREATE TABLE IF NOT EXISTS public.ai_pdf_uploads (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email  TEXT        NOT NULL,
  file_name   TEXT,
  analysis_type TEXT      DEFAULT 'pyq_analyzer',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ai_pdf_uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages pdf uploads"
  ON public.ai_pdf_uploads
  FOR ALL
  WITH CHECK (true);

-- ── Grant permissions ──────────────────────────────────────
GRANT SELECT ON public.ai_rate_limits TO anon, authenticated;
GRANT INSERT ON public.ai_rate_limits TO service_role;
GRANT ALL ON public.ai_pdf_uploads TO service_role;
