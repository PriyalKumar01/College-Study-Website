-- ════════════════════════════════════════════════════════════
-- 1. Contributors table (persistent, DB-driven)
-- ════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.contributors (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  branch      TEXT NOT NULL DEFAULT '',
  batch       TEXT NOT NULL DEFAULT '',
  coins       INTEGER NOT NULL DEFAULT 0,
  linkedin_url TEXT,
  image_url   TEXT,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.contributors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read contributors"   ON public.contributors;
DROP POLICY IF EXISTS "Admins can insert contributors" ON public.contributors;
DROP POLICY IF EXISTS "Admins can update contributors" ON public.contributors;
DROP POLICY IF EXISTS "Admins can delete contributors" ON public.contributors;

-- Public read
CREATE POLICY "Anyone can read contributors"
ON public.contributors FOR SELECT USING (true);

-- Only admins/owner can write
CREATE POLICY "Admins can insert contributors"
ON public.contributors FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.admin_roles ar
  WHERE ar.user_email = auth.jwt() ->> 'email'
));

CREATE POLICY "Admins can update contributors"
ON public.contributors FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.admin_roles ar
  WHERE ar.user_email = auth.jwt() ->> 'email'
))
WITH CHECK (true);

CREATE POLICY "Admins can delete contributors"
ON public.contributors FOR DELETE
USING (EXISTS (
  SELECT 1 FROM public.admin_roles ar
  WHERE ar.user_email = auth.jwt() ->> 'email'
));

-- ════════════════════════════════════════════════════════════
-- 2. Fix admin_roles UPDATE policy (name/date edits persist)
-- ════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "Owner can update admin roles" ON public.admin_roles;
CREATE POLICY "Owner can update admin roles"
ON public.admin_roles FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.admin_roles ar
  WHERE ar.user_email = auth.jwt() ->> 'email'
))
WITH CHECK (true);

-- ════════════════════════════════════════════════════════════
-- 3. Seed existing contributors (run only once on fresh table)
-- ════════════════════════════════════════════════════════════
INSERT INTO public.contributors (name, branch, batch, coins, linkedin_url, image_url) VALUES
  ('Devanshi Saxena',   'PT',     '28', 219, 'https://www.linkedin.com/in/devanshisaxena82/',         '/Devanshi.png'),
  ('Raunak Gupta',      'EE',     '28', 120, 'https://www.linkedin.com/in/raunak-gupta-4a4266328/',   '/Raunak.png'),
  ('Rahul Singh',       'CHE',    '27', 105, 'https://www.linkedin.com/in/rahul-singh-79729b28a/',    '/Rahul.png'),
  ('Tanishka Gupta',    'ET',     '28',  98, 'https://www.linkedin.com/in/tanishka-gupta-a6b6b7325/', NULL),
  ('Manya Singh',       'BS-MS',  '29',  95, NULL, NULL),
  ('Sonam Yadav',       'BioTech','28',  90, NULL, NULL),
  ('Anmol Singh',       'ET',     '27',  82, 'https://www.linkedin.com/in/anmol94',                   NULL),
  ('Smriti Dwivedi',    'CE',     '28',  75, NULL, NULL),
  ('Vrishti Chauhan',   'ME',     '28',  70, 'https://www.linkedin.com/in/vrishti-chauhan-51b752375/', NULL),
  ('Kanchan Upadhyay',  'PT',     '28',  67, 'https://www.linkedin.com/in/kanchan-upadhyay-1a051a326/', NULL),
  ('Bhoomika',          'MBA',    '27',  54, NULL, NULL),
  ('Shikhar Maurya',    'ME',     '28',  48, 'https://www.linkedin.com/in/shikhar-maurya-003541321/', NULL),
  ('Ananya Kanujiya',   'CSE',    '28',  40, 'https://www.linkedin.com/in/ananya-kanaujiya-1475b5380/', NULL),
  ('Rachna Sharma',     'FT',     '28',  40, NULL, NULL),
  ('Amarendra Sengar',  'CSE',    '27',  15, 'https://www.linkedin.com/in/amarendra386/',              NULL),
  ('Amit Singh',        'CSE',    '27',  13, NULL, NULL),
  ('Sumit Chaurasia',   'ET',     '28',  10, NULL, NULL),
  ('Rakesh Varun',      'PL',     '29',   8, 'https://www.linkedin.com/in/rakesh-varun-618309381/',   NULL),
  ('Anshika Chaudhary', 'CSE',    '29',   7, 'https://www.linkedin.com/in/anshika-chaudhary-5535763a1/', NULL),
  ('Ghanisth Umrao',    'ET',     '28',   5, 'https://www.linkedin.com/in/ghanisth-umrao-98a66732a/', NULL),
  ('Sudhir Kumar Gupta','CSE',    '27',   4, 'https://www.linkedin.com/in/spidy-sudhir/',             NULL),
  ('Vishal Yadav',      'CSE',    '27',   2, NULL, NULL),
  ('Tanya Verma',       'FT',     '28',   2, 'https://www.linkedin.com/in/verma-tanya-18t/',          NULL),
  ('Soni Rawat',        'ME',     '28',   2, 'https://www.linkedin.com/in/soni-rawat-717768332/',     NULL),
  ('Kanishtha Mishra',  'LFT',    '28',   2, 'https://www.linkedin.com/in/kanishtha-mishra-8709932ba/', NULL),
  ('Satyam Tripathi',   'IT',     '28',   2, NULL, NULL),
  ('Ankit Yadav',       'FT',     '27',   1, NULL, NULL),
  ('Aryan Gaurav',      'IT',     '27',   1, 'https://www.linkedin.com/in/aryan-gaurav-420744242/',   NULL),
  ('Laxita Rajora',     'PT',     '29',   1, 'https://www.linkedin.com/in/laxita-rajora-3000b7380/', NULL),
  ('Jaideep Kumar',     'CSE',    '29',   1, NULL, NULL),
  ('Arjun Gupta',       'CHE',    '28',   1, 'https://www.linkedin.com/in/arjun-gupta-9597a8329/',   NULL),
  ('Radhika Goyal',     'ET',     '29',   1, 'https://www.linkedin.com/in/radhika-goyal-8b7950383/', NULL);
