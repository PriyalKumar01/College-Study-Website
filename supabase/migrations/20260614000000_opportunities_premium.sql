-- ============================================================
-- Opportunities Premium System Migration
-- ============================================================

-- 1. Coupon codes table
CREATE TABLE IF NOT EXISTS public.coupon_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_percent integer NOT NULL DEFAULT 0 CHECK (discount_percent BETWEEN 0 AND 100),
  applicable_plan text NOT NULL DEFAULT 'all',   -- 'all', 'companies', 'hr_emails'
  max_uses integer DEFAULT NULL,                 -- NULL = unlimited
  used_count integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Seed the initial coupon
INSERT INTO public.coupon_codes (code, discount_percent, applicable_plan, max_uses, is_active)
VALUES ('HBTU@1843', 100, 'all', NULL, true)
ON CONFLICT (code) DO NOTHING;

-- 2. Premium purchases table (tracks who bought what)
CREATE TABLE IF NOT EXISTS public.premium_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  plan text NOT NULL CHECK (plan IN ('companies', 'hr_emails')),
  amount_paid integer NOT NULL DEFAULT 0,       -- in paise (INR * 100)
  original_amount integer NOT NULL,
  coupon_used text DEFAULT NULL,
  discount_percent integer NOT NULL DEFAULT 0,
  razorpay_order_id text DEFAULT NULL,
  razorpay_payment_id text DEFAULT NULL,
  razorpay_signature text DEFAULT NULL,
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'free')),
  purchased_at timestamptz NOT NULL DEFAULT now()
);

-- RLS for premium_purchases
ALTER TABLE public.premium_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own purchases"
  ON public.premium_purchases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchases"
  ON public.premium_purchases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Owner can view all purchases
CREATE POLICY "Owner can view all purchases"
  ON public.premium_purchases FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles
      WHERE user_email = auth.email() AND role = 'owner'
    )
  );

-- RLS for coupon_codes (anyone can read active coupons for validation)
ALTER TABLE public.coupon_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active coupons"
  ON public.coupon_codes FOR SELECT
  USING (is_active = true);

CREATE POLICY "Owner can manage coupons"
  ON public.coupon_codes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles
      WHERE user_email = auth.email() AND role = 'owner'
    )
  );

-- 3. Dynamic company_directory table (owner can add/edit/delete)
CREATE TABLE IF NOT EXISTS public.company_directory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  no integer,
  name text NOT NULL,
  type text NOT NULL DEFAULT 'MNC',
  sector text NOT NULL DEFAULT '',
  url text NOT NULL,
  mode text NOT NULL DEFAULT 'Off-Campus',
  branches text NOT NULL DEFAULT '',
  note text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.company_directory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view companies"
  ON public.company_directory FOR SELECT
  USING (true);

CREATE POLICY "Owner can manage companies"
  ON public.company_directory FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles
      WHERE user_email = auth.email() AND role = 'owner'
    )
  );

-- 4. Dynamic hr_contacts table (owner can add/edit/delete)
CREATE TABLE IF NOT EXISTS public.hr_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  hr_email text UNIQUE NOT NULL,
  name text,
  designation text,
  type text NOT NULL DEFAULT 'MNC',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hr_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view hr contacts"
  ON public.hr_contacts FOR SELECT
  USING (true);

CREATE POLICY "Owner can manage hr contacts"
  ON public.hr_contacts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_roles
      WHERE user_email = auth.email() AND role = 'owner'
    )
  );

-- Function to validate and apply coupon
CREATE OR REPLACE FUNCTION public.validate_coupon(
  p_code text,
  p_plan text
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_coupon record;
BEGIN
  SELECT * INTO v_coupon
  FROM public.coupon_codes
  WHERE code = upper(p_code) AND is_active = true;

  IF NOT FOUND THEN
    RETURN json_build_object('valid', false, 'message', 'Invalid or expired coupon code');
  END IF;

  IF v_coupon.applicable_plan != 'all' AND v_coupon.applicable_plan != p_plan THEN
    RETURN json_build_object('valid', false, 'message', 'Coupon not applicable for this plan');
  END IF;

  IF v_coupon.max_uses IS NOT NULL AND v_coupon.used_count >= v_coupon.max_uses THEN
    RETURN json_build_object('valid', false, 'message', 'Coupon usage limit reached');
  END IF;

  RETURN json_build_object(
    'valid', true,
    'discount_percent', v_coupon.discount_percent,
    'message', 'Coupon applied successfully!'
  );
END;
$$;

-- Function to record free purchase (when amount=0 after coupon)
CREATE OR REPLACE FUNCTION public.record_free_purchase(
  p_plan text,
  p_coupon text,
  p_discount integer
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_email text := auth.email();
  v_original integer;
BEGIN
  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'message', 'Not authenticated');
  END IF;

  -- Check not already purchased
  IF EXISTS (
    SELECT 1 FROM public.premium_purchases
    WHERE user_id = v_user_id AND plan = p_plan AND payment_status IN ('completed', 'free')
  ) THEN
    RETURN json_build_object('success', true, 'message', 'Already purchased');
  END IF;

  v_original := CASE WHEN p_plan = 'companies' THEN 14900 ELSE 99900 END;

  INSERT INTO public.premium_purchases (
    user_id, user_email, plan, amount_paid, original_amount,
    coupon_used, discount_percent, payment_status
  ) VALUES (
    v_user_id, v_email, p_plan, 0, v_original,
    p_coupon, p_discount, 'free'
  );

  -- Increment coupon used_count
  UPDATE public.coupon_codes SET used_count = used_count + 1 WHERE code = upper(p_coupon);

  RETURN json_build_object('success', true, 'message', 'Access granted!');
END;
$$;


-- Seed HR Contacts
INSERT INTO public.hr_contacts (company, hr_email, name, designation, type)
VALUES
  ('SourceFuse Technologies', 'akanksha.puri@sourcefuse.com', 'Akanksha Puri', 'Associate Director HR', 'MNC'),
  ('Perennial Systems', 'akanksha.sogani@perennialsys.com', 'Akanksha Sogani', 'Head HR', 'MNC'),
  ('iB Hubs', 'akhil@ibhubs.co', 'Akhil Jogiparthi', 'Vice President - Talent Accelerator', 'MNC'),
  ('Estuate,', 'akhila@estuate.com', 'Akhila Chandan', 'Associate Vice President Human Resources', 'MNC'),
  ('Colruyt India', 'akram.mohammad@colruytgroup.com', 'Akram Mohammad', 'Deputy Head Head HR', 'MNC'),
  ('Elsner Technologies', 'akriti@elsner.in', 'Akriti', 'HR-Head', 'MNC'),
  ('Windmill', 'akshata.bhandare@windmill.ch', 'Akshata Bhandare', 'HR & Location Head, India', 'MNC'),
  ('Pyxis One', 'albino@pixis.ai', 'Albino Mascarenhas', 'Head - Human Resources Global', 'MNC'),
  ('QBrainX Inc', 'allwyn.r@qbrainx.com', 'Allwyn Richard', 'Head of Human Resources', 'MNC'),
  ('Recro', 'alok.singh@recro.io', 'Alok Baghel', 'Head Of Talent Management', 'MNC'),
  ('VFI SLK', 'alok.kumar@vfislk.com', 'Alok Kumar', 'Operations Leader and Head Transitions, L&D', 'MNC'),
  ('Infrasoft Technologies', 'alwyn.barretto@infrasofttech.com', 'Alwyn Barretto', 'Head Recruitments', 'MNC'),
  ('Areteans', 'aman.khan@areteanstech.com', 'Aman Khan', 'Vice President Human Resources', 'MNC'),
  ('Antier Solutions', 'amandeep.k@antiersolutions.com', 'Amandeep Kaur', 'Sr. HR Executive (Technical Recruitment Head)', 'MNC'),
  ('Nitor Infotech', 'amar.sinha@nitorinfotech.com', 'Amar Sinha', 'Director Talent Acquisition (People Function)', 'MNC'),
  ('Beyond Key', 'ambrish.kanungo@beyondkey.com', 'Ambrish Kanungo', 'Head of HR', 'MNC'),
  ('Altudo', 'amiit.avaasthi@altudo.co', 'Amiit Avaasthi', 'Chief People Officer', 'MNC'),
  ('Wunderman Thompson MSC', 'amit.malhotra@wundermanthompson.com', 'Amit', 'Chief People Officer', 'MNC'),
  ('Hanu Software', 'amit@hanu.com', 'Amit Kataria', 'Chief Human Resources Officer', 'MNC'),
  ('Claim Genius', 'amit.prayagi@claimgenius.com', 'Amit Prayagi', 'Head Of Recruitment & HR Operation', 'MNC'),
  ('SCIKEY', 'amit.ranjan@scikey.ai', 'Amit Ranjan', 'Associate Director- Talent Solutions', 'MNC'),
  ('Areteans', 'amit.sahoo@areteanstech.com', 'Amit Sahoo', 'Vice President and Global Head - Human Resources', 'MNC'),
  ('SVAM International', 'ashital@svam.com', 'Amita Shital', 'Head of HR', 'MNC'),
  ('Cheers Interactive', 'amitesh.verma@cheersin.com', 'Amitesh Verma', 'Associate Director, Talent Acquisition', 'MNC'),
  ('Secure-24', 'amitha.k@secure-24.com', 'Amitha K', 'Director- HR', 'MNC'),
  ('mjunction services', 'amlan.nag@mjunction.in', 'Amlan Nag', 'General Manager & Head HR', 'MNC'),
  ('Zendrive', 'amreshm@zendrive.com', 'Amresh Mehra', 'VP - People & Culture', 'MNC'),
  ('Dimagi', 'akishore@dimagi.com', 'Amrita', 'Director of People Operations, India', 'MNC'),
  ('LocoNav', 'amrita.cheema@loconav.com', 'Amrita Cheema', 'Head HR - Global SaaS', 'MNC'),
  ('COGENT Infotech', 'amrita.singh@cogentinfo.com', 'Amrita Singh', 'Director - Recruitment & Delivery (US Staffing)', 'MNC'),
  ('IT BY DESIGN', 'amrita.singh@itbd.net', 'Amrita Singh', 'Head HR (India)', 'MNC'),
  ('Stanley David and Associates', 'amrita@sdnaglobal.com', 'Amrita Tripathi', 'VP - India, ME and APAC HR', 'MNC'),
  ('MyGate', 'amritesh.shukla@mygate.com', 'Amritesh Shukla', 'Head Of Human Resources', 'MNC'),
  ('Great Place IT Services', 'amruta@greatplaceitservices.com', 'Amruta Urkude', 'HR Head (Generalist)', 'MNC'),
  ('Utthunga', 'amulya.ms@utthunga.com', 'Amulya', 'Director HR', 'MNC'),
  ('Grassroots', 'anand.christopher@grassrootsbpo.com', 'Anand Christopher', 'Vice President Human Resources', 'MNC'),
  ('Increff', 'anand.e@increff.com', 'Anand E', 'Chief Human Resources Officer', 'MNC'),
  ('SecureKloud Technologies', 'ak@8kmiles.com', 'Anand K', 'Vice President Human Resources', 'MNC'),
  ('Pharmarack', 'anandk@pharmarack.com', 'Anand Khot', 'Chief Human Resources Officer', 'MNC'),
  ('ADK Rage', 'anand.r@whatarage.com', 'Anand Rajendran', 'Director - HR', 'MNC'),
  ('Hubilo', 'anand@hubilo.com', 'Anand Sasidharan', 'Head of Talent Acquisition', 'MNC'),
  ('Auzmor', 'anand@auzmor.com', 'Anand Sl', 'HR Director / Operations Head (India)', 'MNC'),
  ('Capsitech', 'anand@capsitech.com', 'Anand Soni', 'Talent Acquisition Head', 'MNC'),
  ('Innive Inc', 'athiagarajan@inniveinc.com', 'Anand Thiagarajan', 'Vice President - Human Resources', 'MNC'),
  ('DSM SOFT', 'anandhi.s@dsmsoft.com', 'Anandhi Srinivasan', 'Associate Vice President - Human Resources', 'MNC'),
  ('Customer Centria', 'ananthram.iyer@customercentria.com', 'Ananthram Iyer', 'Vice President HR', 'MNC'),
  ('Enhance IT', 'anrastogi@enhanceit.com', 'Anchal Rastogi', 'AVP Recruitments', 'MNC'),
  ('TEKsystems Global Services in India', 'aarasina@teksystems.com', 'Anchan Arasinaguppe', 'Associate Director Talent Acquisition', 'MNC'),
  ('Delphix', 'angel.mathew@delphix.com', 'Angel Mathew', 'Human Resources Director', 'MNC'),
  ('ThoughtSpot', 'anil.chandra@thoughtspot.com', 'Anil Chandra', 'Senior Director, Talent Acquisition', 'MNC'),
  ('CoreStack', 'anil.k@corestack.io', 'Anil K', 'Human Resources Director', 'MNC'),
  ('Solugenix', 'anil.moturi@solugenix.com', 'Anil Moturi', 'Director Talent Acquisition', 'MNC'),
  ('Visible Alpha', 'anil.pereira@visiblealpha.com', 'Anil Pereira', 'Senior Director Human Resources', 'MNC'),
  ('Flytxt', 'anil.kumar@flytxt.com', 'Anil Ramachandran', 'Head - Global HR', 'MNC'),
  ('Fourth Dimension Solutions', 'anil.tomar@fdsindia.co.in', 'Anil Tomar', 'HR Head', 'MNC'),
  ('Novopay', 'animesh.kumar@novopay.in', 'Animesh Kumar', 'Head HR, Novopay', 'MNC'),
  ('Dassault Systems', 'anindita.ranjan@3ds.com', 'Anindita Ranjan', 'Director HR', 'MNC'),
  ('NTT DATA', 'anirban.chakravorty@nttdata.com', 'Anirban Chakravorty', 'Senior Director & Regional Head - Human Resources', 'MNC'),
  ('Data Glove', 'aghosh@trimaxamericas.com', 'Anirban Ghosh', 'Head - Human Resources Management', 'MNC'),
  ('Replicon', 'anirudhan.vasudevan@replicon.com', 'Anirudhan Vasudevan', 'Senior Director Human Resources', 'MNC'),
  ('Vaave', 'anish.ahmed@vaave.com', 'Anish Ahmed', 'Head-13x Talent', 'MNC'),
  ('Sentieo', 'anish.raj@sentieo.com', 'Anish Raj', 'Human Resources Director', 'MNC'),
  ('Capricot Technologies', 'anita.mourya@capricot.com', 'Anita Mourya', 'PS to Chairman / Director - HR', 'MNC'),
  ('ShoreWise Consulting', 'anoronha@shorewise.com', 'Anita Noronha', 'Global Head Human Resources', 'MNC'),
  ('Cleo', 'asidhwani@cleo.com', 'Anita Sidhwani', 'Head HR', 'MNC'),
  ('Appventurez', 'anita@appventurez.com', 'Anita Yadav', 'Global HR Head', 'MNC'),
  ('Incture', 'anitha.davis@incture.com', 'Anitha Davis', 'Associate Director - Talent Acquisition', 'MNC'),
  ('Pramati Technologies', 'anitha.prabhakar@pramati.com', 'Anitha Prabhakar', 'HR Director', 'MNC'),
  ('KnackForge', 'anjali@knackforge.com', 'Anjali', 'Vice President Human Resources & Operations', 'MNC'),
  ('MangoApps', 'anjalig@mangoapps.com', 'Anjali Ghadge', 'VP - HR & Operations I We''re Hiring!', 'MNC'),
  ('WorkIndia', 'anjali.patil@workindia.in', 'Anjali Patil', 'HR Director', 'MNC'),
  ('Fulcrum Digital Inc', 'anjali.sharma@fulcrumdigital.com', 'Anjali Sharma', 'Director, Global head of L&D', 'MNC'),
  ('HPL', 'anjan.bose@hpl.co.in', 'Anjan Bose', 'CIO & Head of HR', 'MNC'),
  ('Net Business Solutions', 'anjani.salian@in.nbssap.com', 'Anjani Salian', 'Head - Talent Acquisition & Talent Management', 'MNC'),
  ('BPO Convergence', 'anju.tyagi@bpoconvergence.com', 'Anju Tyagi', 'Head of HR', 'MNC'),
  ('CompuMatrice', 'ankit@compumatrice.com', 'Ankit Shah', 'Head of HR & Operations', 'MNC'),
  ('A-1 Technology', 'ankit.sharma@a1technology.com', 'Ankit Sharma', 'Head Of Recruitment & HR', 'MNC'),
  ('RateGain', 'ankit.tomar@rategain.com', 'Ankit Tomar', 'Associate Director HR Transformation', 'MNC'),
  ('Zenwork', 'ankita@zenwork.com', 'Ankita', 'Vice President HR & Operations', 'MNC'),
  ('Condeco', 'ankita.rajrishi@condecosoftware.com', 'Ankita Rajrishi', 'Head of Shared Services - Talent Acquisition', 'MNC'),
  ('MTX Group', 'ankita.sinha@mtxb2b.com', 'Ankita Sinha', 'Chief People Officer', 'MNC'),
  ('NIIT Technologies', 'ankur.beri@niit-tech.com', 'Ankur Beri', 'Group Head Human Resources', 'MNC'),
  ('SmarTek21', 'annaa@smartek21.com', 'Anna Andrews', 'Head-Human Resources (India)', 'MNC'),
  ('Transact Global', 'anna@transactglobal.com', 'Anna Mathunny', 'Head Of Human Resources', 'MNC'),
  ('FIME', 'annapurna.a@fime.com', 'Annapurna A', 'Head of HR & Admn', 'MNC'),
  ('Grasko Solutions', 'annie.manoj@grasko.com', 'Annie Manoj', 'Director - Human Resources', 'MNC'),
  ('Arcadia', 'anoob.abraham@arcadia.com', 'Anoob Abraham', 'Associate Director - Talent Acquisition', 'MNC'),
  ('Vymo', 'anshika.khaitan@getvymo.com', 'Anshika Khaitan', 'Director-People & Culture', 'MNC'),
  ('Absolutdata Analytics', 'anshu.anand@absolutdata.com', 'Anshu Anand', 'Head Of Human Resources', 'MNC'),
  ('Mindfire Solutions', 'ansumans@mindfiresolutions.com', 'Ansuman Sahu', 'Head of HR / Staffing', 'MNC'),
  ('Urban Ladder', 'anto.faria@urbanladder.com', 'Anto Faria', 'Head L&D Operation and Fulfillment', 'MNC'),
  ('Deskera', 'anuj@deskera.com', 'Anuj Agarwal', 'VP, Corporate Operations & HR', 'MNC'),
  ('Trilogy Innovations', 'anuja@codenation.co.in', 'Anuja Sivaram', 'CHRO & COO', 'MNC'),
  ('Ginesys', 'anupam.j@gsl.in', 'Anupam Jauhari', 'Group CHRO', 'MNC'),
  ('Reltio', 'anupam.srivastava@reltio.com', 'Anupam Srivastava', 'Head Of Human Resources', 'MNC'),
  ('eRevMax', 'anupamadg@erevmax.com', 'Anupama Dasgupta', 'SVP Human Resources', 'MNC'),
  ('Julia Computing', 'anupriya.gandhi@juliacomputing.com', 'Anupriya Gandhi', 'Global Director People Ops', 'MNC'),
  ('SirionLabs', 'anurag.rana@sirionlabs.com', 'Anurag Rana', 'Head of Human Resources', 'MNC'),
  ('Talisma', 'anurags@talisma.com', 'Anurag Shrivastava', 'Director - HR', 'MNC'),
  ('Uniphore', 'anurag@uniphore.com', 'Anurag Verma', 'Vice President Human Resources', 'MNC'),
  ('SRS Web Solutions', 'anusha@srswebsolutions.com', 'Anusha Jayachandran', 'Head - Human Resources Operations', 'MNC'),
  ('Loco', 'anusha.kishore@loco.gg', 'Anusha Kishore', 'Assistant Vice President Human Resources', 'MNC'),
  ('Softnautics', 'aparna.gunjikar@softnautics.com', 'Aparna Gunjikar', 'Head Of Human Resources', 'MNC'),
  ('Pathlock', 'aparna.srikanth@appsian.com', 'Aparna Srikanth', 'Head, Human Resources - India', 'MNC'),
  ('SafexPay', 'aradhana@safexpay.com', 'Aradhana Gupta', 'Chief People Officer', 'MNC'),
  ('Vyom Labs', 'arathi.gs@vyomlabs.com', 'Arathi', 'AVP HR', 'MNC'),
  ('Altruista Health', 'arathi.prabhu@altruistahealth.com', 'Arathi Prabhu', 'Director - Talent Acquisition', 'MNC'),
  ('SunTec Business Solutions', 'arathi@suntecgroup.com', 'Arathi Rajeswari', 'AVP, Head of Talent Advancement and Excellence', 'MNC'),
  ('Concentrix Tigerspike', 'aravind.chandrasekar@tigerspike.com', 'Aravind Chandrasekar', 'Associate Director, Talent Acquisition', 'MNC'),
  ('RapidValue', 'aravind.warrier@rapidvaluesolutions.com', 'Aravind Warrier', 'Human Resources Director', 'MNC'),
  ('Aufait Technologies', 'archana@aufait.in', 'Archana Anand', 'Head of Talent Acquisition', 'MNC'),
  ('Kilowott', 'archana.kp@kilowott.com', 'Archana Kp', 'Vice President Human Resources', 'MNC'),
  ('Quinbay', 'archana@quinbay.com', 'Archana Kunde', 'Human Resources Director', 'MNC'),
  ('Locuz', 'archana.manne@locuz.com', 'Archana Manne', 'Vice President Human Resources', 'MNC'),
  ('Microlise', 'archana.sarda@microlise.com', 'Archana Sarda', 'Head Of Human Resources', 'MNC'),
  ('Cognologix Technologies', 'archana.shinde@cognologix.com', 'Archana Shinde', 'Head Human Resources Department', 'MNC'),
  ('Abzooba', 'arif.memon@abzooba.com', 'Arif Memon', 'Associate Vice President Talent Acquisition', 'MNC'),
  ('Envestnet', 'arindam.kar@yodlee.com', 'Arindam Kar', 'Head-Talent Acquisition', 'MNC'),
  ('Quytech', 'arjita.chawla@quytech.com', 'Arjita Chawla', 'Head Of Human Resources', 'MNC'),
  ('Sun Life', 'arjun.chatterjee@sunlife.com', 'Arjun Chatterjee', 'Director & Head of Talent Acquisition', 'MNC'),
  ('Umbrella Infocare', 'arpanaj@umbrellainfocare.com', 'Arpana Jaiswal', 'Head Human Resources', 'MNC'),
  ('WEBSKITTERS TECHNOLOGY SOLUTIONS', 'arpita.sarkar@webskitters.com', 'Arpita Sarkar', 'Director Talent Acquisition', 'MNC'),
  ('Artoon Solutions', 'qa@artoonsolutions.com', 'Artoon Solutions', 'Chief Human Resources Officer', 'MNC'),
  ('Data Dynamics', 'aru.uppal@datdyn.com', 'Aru Uppal', 'Global Head Human Resources', 'MNC'),
  ('BOB Tech Solutions', 'arun.kumar@bobtechsolutions.com', 'Arun Kumar', 'HEAD - Human Resources & Operations', 'MNC'),
  ('Shipsy', 'arun.kumar@shipsy.io', 'Arun Kumar', 'Mentor/ Chief People Officer', 'MNC'),
  ('Wavicle Data Solutions', 'arun.kumar@wavicledata.com', 'Arun Kumar', 'Director - Human Resources', 'MNC'),
  ('ATEM Software Solutions', 'arun@theatem.com', 'Arun Murugappa', 'Delivery Head - Talent Acquisition', 'MNC'),
  ('Amelia', 'arun.ravi@ipsoft.com', 'Arun Ravi', 'Digital Workforce Management - Head', 'MNC'),
  ('PureSoftware', 'arun.singh@puresoftware.com', 'Arun Singh', 'Senior Director Talent Acquisition', 'MNC'),
  ('xto10x', 'arun@xto10x.com', 'Arun Vigneswaran', 'Head of People Excellence & HR head for xto10x', 'MNC'),
  ('Orcapod', 'arunima.bhushan@orcapodservices.com', 'Arunima Bhushan', 'AVP-HR', 'MNC'),
  ('BetterPlace', 'arushi.goel@betterplace.co.in', 'Arushi Goel', 'Director HRBP', 'MNC'),
  ('Altezzasys Systems', 'arushi.sawhney@e2eresearch.com', 'Arushi Sawhney', 'Head Of Human Resources', 'MNC'),
  ('Eka Software Solutions', 'arvind.sadasivan@ekaplus.com', 'Arvind Sadasivan', 'Director Global Human Resources', 'MNC'),
  ('SrinSoft Technologies', 'sharon@srinsofttech.com', 'Asenath Sharon', 'Associate Vice President - HR', 'MNC'),
  ('Unilog', 'asha.j@unilogcorp.com', 'Asha Rao', 'Associate Director - Human Resources', 'MNC'),
  ('Pavilion', 'ashish.karnik@pavilion.io', 'Ashish Karnik', 'Head Performance Engineering', 'MNC'),
  ('Mindgate Solutions', 'ashish.naidu@mindgate.in', 'Ashish Naidu', 'Assistant Vice President - Talent Acquisition', 'MNC'),
  ('Spenmo', 'ashok@spenmo.com', 'Ashok Manjunath', 'Head of Talent Acquisition', 'MNC'),
  ('SenecaGlobal', 'ashok.putsala@senecaglobal.com', 'Ashok Putsala', 'Associate Vice President - Talent Acquisition', 'MNC'),
  ('ObjectFrontier Software', 'ashok.seshadri@objectfrontier.com', 'Ashok Seshadri', 'Head - Global Talent Management', 'MNC'),
  ('BPO Convergence', 'ashok.tripathy@bpoconvergence.com', 'Ashok Tripathy', 'PRINCIPAL CONSULTANT & GROUP HEAD HR', 'MNC'),
  ('Simplify Healthcare', 'ashraf.kazi@simplifyhealthcare.com', 'Ashraf Kazi', 'Associate Director Talent Acquisition', 'MNC'),
  ('qSEAp Infotech', 'ashraf.mulla@qseap.com', 'Ashraf Mulla', 'AVP- Talent Acquisition & Strategy', 'MNC'),
  ('MasterSoft ERP Solutions', 'ashton.lawrie@iitms.co.in', 'Ashton Lawrie', 'General Manager - HR (Head of Department)', 'MNC'),
  ('Tuyasmart India', 'ashutosh@tuya.com', 'Ashutosh Sinha', 'Head - Human Resource', 'MNC'),
  ('Decision Minds', 'ashwanib@decisionminds.com', 'Ashwani Bhargava', 'Director Recruitment', 'MNC'),
  ('Successive Technologies', 'ashwani@successive.tech', 'Ashwani Kumar', 'Vice President - People & Culture', 'MNC'),
  ('Suki', 'ashwin@suki.ai', 'Ashwin Singh', 'Head of Talent Acquisition', 'MNC'),
  ('Eton Solutions LP', 'ashwini.ashok@eton-solutions.com', 'Ashwini Ashok', 'Head of Human Resources', 'MNC'),
  ('Kaleyra', 'ashwini.janardhanan@kaleyra.com', 'Ashwini J', 'Head - People & Culture, APAC', 'MNC'),
  ('WorkFusion', 'agoka@workfusion.com', 'Aswanth Goka', 'Vice President Human Resources', 'MNC'),
  ('PSRTEK', 'aswin@psrtek.com', 'Aswin Prashannth', 'Head Talent Acquisition of India Operation', 'MNC'),
  ('Pentagon System and Services', 'atin.karmokar@pentagon.co.in', 'Atin Karmokar', 'AVP - Head Human Resources & Admin', 'MNC'),
  ('Crave InfoTech', 'atul.kanknala@craveinfotech.com', 'Atul Kanknala', 'Head HR- Talent Acquisition and Strategy', 'MNC'),
  ('Innefu Labs', 'atul.pal@innefu.com', 'Atul Pal', 'Head Of Human Resources - Client Operations', 'MNC'),
  ('Sedin Technologies', 'avinash@sedintechnologies.com', 'Avinash Poojari', 'AVP - Talent Acquisition', 'MNC'),
  ('Niftel Communications', 'ayush.daryani@niftel.com', 'Ayush Daryani', 'Head Of Recruitment', 'MNC'),
  ('SugarBox Networks', 'ayush.sinha@sugarboxnetworks.com', 'Ayush Sinha', 'Vice President Human Resources', 'MNC'),
  ('Opus Consulting Solutions', 'babitha.nambiar@opusconsulting.com', 'Babitha Nambiar', 'VP - Head Human Resources', 'MNC'),
  ('Mahindra Satyam BPO', 'babu_thoppil@mahindrasatyam.com', 'Babu Thoppil', 'VP - HR', 'MNC'),
  ('iSource ITES', 'balaji@isourceindia.com', 'Balaji Er', 'Head Of Recruitment', 'MNC'),
  ('Thirdware Solution INC', 'balaji.thiyagarajan@thirdware.com', 'Balaji Thiyagarajan', 'Associate Director HR', 'MNC'),
  ('Genisys Group', 'balakrishna.shetty@genisys-group.com', 'Balakrishna Shetty', 'Vice President - Human Resource', 'MNC'),
  ('Brane Enterprises', 'balaraju.g@nslhub.com', 'Balaraju Guddinti', 'Head of Talent Acquisition', 'MNC'),
  ('Adarsh Solutions', 'balesh@adarshsolutions.com', 'Balesh S', 'Head HR & Operations', 'MNC'),
  ('Net Solutions', 'balneet.birah@netsolutions.com', 'Balneet Birah', 'Chief Human Resources Officer', 'MNC'),
  ('Airdit Software Services', 'bandana@airditsoftware.com', 'Bandana Kaul', 'Director-Human Resources', 'MNC'),
  ('Terralogic', 'bandla.shyamprasad@terralogic.com', 'Bandla Shyamprasad', 'Director - HR & Operations', 'MNC'),
  ('IT BY DESIGN', 'banmeet.kour@itbd.net', 'Banmeet Kour', 'Head of Talent Acquisition India/PH/US', 'MNC'),
  ('Computer Power Group', 'bagrawal@cpg-inc.com', 'Barkha Agrawal', 'Director-Talent Acquisition', 'MNC'),
  ('Trellissoft,', 'barkha@trellissoft.ai', 'Barkha Dave', 'Head of HR & Operations Compliance', 'MNC'),
  ('Wobot.ai', 'barkha@wobot.ai', 'Barkha Sharma', 'CHRO', 'MNC'),
  ('Kami Vision', 'basava@kamivision.com', 'Basava', 'Head Of Human Resources', 'MNC'),
  ('Ford Pro Charging', 'batool.ali@electriphi.ai', 'Batool Ali', 'Head Of Human Resources', 'MNC'),
  ('Reward360 Global Services.', 'bedisha@reward360.co', 'Bedisha Karmakar', 'Senior Director People Operations', 'MNC'),
  ('SISA', 'benoy.koshy@sisainfosec.com', 'Benoy Koshy', 'Head of Talent Acquisition', 'MNC'),
  ('Fulcrum Digital Inc', 'bensely.zachariah@fulcrumdigital.com', 'Bensely Zachariah', 'Global Head of Human Resources', 'MNC'),
  ('Fulcrum Digital Inc', 'bensley.zachariah@fulcrumdigital.com', 'Bensley Zachariah', 'Global Head of Human Resources', 'MNC'),
  ('MicroObjects', 'benson.mendez@microobjects.net', 'Benson Mendez', 'VP - Human Resources', 'MNC'),
  ('IDfy', 'bhakti.dharod@idfy.com', 'Bhakti Dharod', 'Head of HR', 'MNC'),
  ('WorkIndia', 'bharat.bhartia@workindia.in', 'Bharat Bhartia', 'Head of Talent Acquisition and HR', 'MNC'),
  ('CK Solutions', 'bharat@ka-nex.com', 'Bharat Rao', 'Director - Talent Acquisition', 'MNC'),
  ('AppsTek', 'bravipati@appstekcorp.com', 'Bharathi Ravipati', 'Sr. Director HR- Eastern Region', 'MNC'),
  ('Aissel Technologies', 'bhargavic@aissel.com', 'Bhargavi Challa', 'Head of Human Resources', 'MNC'),
  ('Edifecs', 'bharti.negi@edifecs.com', 'Bharti Negi', 'Sr. Director, Recruitment, Talent Acquisition', 'MNC'),
  ('Netcore Cloud', 'bhavana@netcore.co.in', 'Bhavana Jain', 'Chief Human Resources Officer', 'MNC'),
  ('Diabsolut Inc', 'bkaklotar@diabsolut.com', 'Bhavik Kaklotar', 'Head Global Talent Acquisition', 'MNC'),
  ('Games2win India', 'bhavik@games2win.com', 'Bhavik Shah', 'Human Resources Head', 'MNC'),
  ('ITCG Solutions', 'bhavika.sheth@itcgindia.com', 'Bhavika Sheth', 'HR Head at ITCG', 'MNC'),
  ('Dukaan', 'bhavin@mydukaan.io', 'Bhavin Sanghavi', 'Head - Talent Acquisition', 'MNC'),
  ('Supply Wisdom', 'bhavya@supplywisdom.com', 'Bhavya Shetty', 'Director Talent Management', 'MNC'),
  ('HR', 'bhawna@weexcel.in', 'Bhawna Suri', 'Head HR & Operations', 'MNC'),
  ('VerSe Innovation', 'bhupesh.wasmatkar@verse.in', 'Bhupesh Wasmatkar', 'Head - Talent Acquisition', 'MNC'),
  ('InApp', 'biju.v@inapp.com', 'Biju Varghese', 'Director | HR | InApp', 'MNC'),
  ('TATWA Technologies', 'bikram.dash@tatwa.info', 'Bikram Dash', 'Vice President HR L&D', 'MNC'),
  ('Ospyn Technologies', 'bindu.krishnan@ospyn.com', 'Bindu Krishnan', 'Director-Human Resources and Administration', 'MNC'),
  ('RGI Group', 'binoy.varghese@rgigroup.com', 'Binoy Varghese', 'Group Head (Human Resources)', 'MNC'),
  ('izmo', 'biplob.das@izmoltd.com', 'Biplob Das', 'Head Of Human Resources', 'MNC')
ON CONFLICT (hr_email) DO NOTHING;
