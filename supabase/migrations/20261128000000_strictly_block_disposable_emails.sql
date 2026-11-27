-- ===========================================================================
-- MIGRATION: Strictly Block Temporary & Disposable Emails (PostgreSQL Trigger)
-- ===========================================================================

-- 1. Ensure public.blocked_email_domains table exists
CREATE TABLE IF NOT EXISTS public.blocked_email_domains (
  domain TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.blocked_email_domains ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to blocked_email_domains" ON public.blocked_email_domains;
CREATE POLICY "Allow public read access to blocked_email_domains" 
ON public.blocked_email_domains FOR SELECT 
USING (true);

-- 2. Insert prominent disposable and temporary email domains
INSERT INTO public.blocked_email_domains (domain)
VALUES
  ('inboxbear.com'),
  ('grr.la'),
  ('pokemail.net'),
  ('spam4.me'),
  ('moakt.com'),
  ('cuvox.de'),
  ('dayrep.com'),
  ('armyspy.com'),
  ('teleworm.us'),
  ('zillamail.com'),
  ('chacuo.net'),
  ('tmail.ws'),
  ('tempm.com'),
  ('tempail.com'),
  ('guerrillamail.biz'),
  ('guerrillamail.net'),
  ('guerrillamail.com'),
  ('guerrillamail.org'),
  ('guerrillamailblock.com'),
  ('10minutemail.net'),
  ('10minutemail.com'),
  ('10minemail.com'),
  ('yopmail.net'),
  ('yopmail.com'),
  ('trashmail.me'),
  ('trashmail.com'),
  ('trashmail.net'),
  ('clipmail.top'),
  ('clipmail.site'),
  ('fakemail.io'),
  ('generator.email'),
  ('dispostable.com'),
  ('fakemailgenerator.com'),
  ('temp-mail.org'),
  ('tempmail.com'),
  ('temp-mail.io'),
  ('sharklasers.com'),
  ('atomicmail.io'),
  ('atomicmail.com'),
  ('atomicmail.org'),
  ('atomic-mail.com'),
  ('atomicmail.co'),
  ('tempmailaddress.com'),
  ('boun.cr'),
  ('doefy.com'),
  ('mailnesia.com'),
  ('mailcatch.com'),
  ('duck.com'),
  ('mozmail.com'),
  ('tempmail.dev'),
  ('fakeinbox.com'),
  ('crazymailing.com'),
  ('mintemail.com'),
  ('jetable.org'),
  ('safetymail.info'),
  ('mailnull.com'),
  ('discard.email'),
  ('mailinater.com'),
  ('suremail.info'),
  ('burnermail.io'),
  ('internalmail.net'),
  ('mohmal.com'),
  ('nada.ltd'),
  ('getnada.com'),
  ('mailsac.com'),
  ('mytemp.email'),
  ('emailfake.com'),
  ('getairmail.com'),
  ('maildrop.cc'),
  ('fpklm.com'),
  ('mail.fpklm.com'),
  ('blobapps.com'),
  ('blobapps.net'),
  ('blobapps.org'),
  ('buloan.com'),
  ('fxzig.com'),
  ('fxmail.org'),
  ('fxspost.com'),
  ('fxtemp.com'),
  ('fxpost.org'),
  ('fxzig.org'),
  ('fxmail.net'),
  ('fxspost.org'),
  ('dropmail.me'),
  ('emlhub.com'),
  ('mimimail.me'),
  ('spymail.one'),
  ('dynv6.net'),
  ('indevs.in'),
  ('ccwu.cc'),
  ('1secmail.com'),
  ('1secmail.net'),
  ('1secmail.org'),
  ('inboxkitten.com')
ON CONFLICT (domain) DO NOTHING;

-- 3. Comprehensive Database Trigger Function to block disposable emails at PostgreSQL level
CREATE OR REPLACE FUNCTION public.check_disposable_email()
RETURNS TRIGGER AS $$
DECLARE
  email_domain TEXT;
  is_blocked BOOLEAN;
BEGIN
  -- Allow updates to existing records if email itself is not being changed (e.g. banning, metadata sync)
  IF TG_OP = 'UPDATE' AND (OLD.email = NEW.email OR OLD.email IS NOT DISTINCT FROM NEW.email) THEN
    RETURN NEW;
  END IF;

  -- Extract domain from email
  email_domain := LOWER(substring(NEW.email from '@(.*)$'));

  -- A. Check if domain exists in our blocked_email_domains table
  SELECT EXISTS (
    SELECT 1 FROM public.blocked_email_domains
    WHERE domain = email_domain
  ) INTO is_blocked;

  IF is_blocked THEN
    RAISE EXCEPTION 'Signup/Login with temporary or disposable email addresses is not permitted. Please use a permanent, valid personal or academic email address.';
  END IF;

  -- B. Comprehensive Regex Pattern Check for Burner / Disposable Domains
  IF email_domain ~* '(temp|dispos|throwaway|mailinator|guerrilla|10min|minute.*mail|trashmail|sharklaser|fake.*mail|fakeinbox|burner.*mail|inboxkitten|1sec|mohmal|yopmail|getnada|internalmail|atomicmail|fpklm|buloan|fxzig|fxmail|fxpost|fxtemp|dropmail|emlhub|mimimail|spymail|emailfake|dynv6|blobapps|cuvox|dayrep|armyspy|teleworm|zillamail|chacuo|pokemail|grr\.la|spam4|moakt|inboxbear|generator.*email|tmail|tempm|tempail|0-mail|0click|33mail|mytemp|jetable|safetymail|discard|suremail|nada\.ltd|mailsac|boun\.cr|doefy|mailnesia|mailcatch|mintemail|crazymailing|clipmail|fakemail)' THEN
    RAISE EXCEPTION 'Signup/Login with temporary or disposable email addresses is not permitted. Please use a permanent, valid personal or academic email address.';
  END IF;

  -- C. Suspicious Burner TLD Check (when not on official academic or legitimate domain)
  IF email_domain ~* '\.(tk|ml|ga|cf|gq|rest|buzz|icu|party|link|stream|loan|trade|men|racing)$'
     AND email_domain !~* '\.(ac\.in|edu|edu\.in|res\.in|ernet\.in|gov\.in)$' THEN
    RAISE EXCEPTION 'Emails from temporary or untrusted domain extensions are not permitted. Please use Gmail, Outlook, or your official college email.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Reattach trigger on auth.users
DROP TRIGGER IF EXISTS check_disposable_email_trigger ON auth.users;
CREATE TRIGGER check_disposable_email_trigger
BEFORE INSERT OR UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.check_disposable_email();
