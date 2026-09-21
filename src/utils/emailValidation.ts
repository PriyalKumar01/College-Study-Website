/**
 * Utility for verifying email addresses and detecting disposable/temporary/fake emails.
 */

// A blacklist of common temporary / disposable email domains
const DISPOSABLE_DOMAINS_BLACKLIST = new Set([
  'fpklm.com', 'mail.fpklm.com',
  'atomicmail.io', 'atomicmail.com', 'atomicmail.org', 'atomic-mail.com', 'atomicmail.co',
  'yopmail.com', 'mailinator.com', 'tempmail.com', '10minutemail.com',
  'guerrillamail.com', 'dispostable.com', 'getairmail.com', 'sharklasers.com',
  'maildrop.cc', 'throwawaymail.com', 'tempmailaddress.com', 'boun.cr',
  'doefy.com', 'mailnesia.com', 'mailcatch.com', 'trashmail.com',
  'generator.email', 'disposable.com', 'duck.com', 'mozmail.com',
  'protonmail.ch', 'temp-mail.org', 'tempmail.dev', 'fakeinbox.com',
  'crazymailing.com', 'mintemail.com', 'jetable.org', 'safetymail.info',
  'mailnull.com', 'discard.email', 'mailinater.com', 'suremail.info',
  'buloan.com', 'fxzig.com', 'fxmail.org', 'fxspost.com', 'fxtemp.com',
  'fxpost.org', 'fxzig.org', 'fxmail.net', 'fxspost.org', 'inboxkitten.com',
  'temp-mail.io', '1secmail.com', '1secmail.net', '1secmail.org', 'burnermail.io',
  'internalmail.net', 'mohmal.com', 'nada.ltd', 'mailsac.com', 'guerrillamailblock.com',
  'fakemailgenerator.com', 'mytemp.email', 'emailfake.com', 'trashmail.net',
  'dropmail.me', 'emlhub.com', 'mimimail.me', 'spymail.one', 'dynv6.net',
  'blobapps.com', 'blobapps.net', 'blobapps.org'
]);

// Common patterns in disposable email domains
const DISPOSABLE_DOMAIN_PATTERNS = [
  /blobapps/i,
  /fpklm/i,
  /dropmail/i,
  /emlhub/i,
  /mimimail/i,
  /spymail/i,
  /emailfake/i,
  /dynv6/i,
  /atomicmail/i,
  /temp.*mail/i,
  /dispos/i,
  /throwaway/i,
  /mailinator/i,
  /guerrilla/i,
  /10minute/i,
  /trashmail/i,
  /sharklaser/i,
  /fake.*mail/i,
  /fakeinbox/i,
  /burner.*mail/i,
  /inboxkitten/i,
  /1secmail/i,
  /mohmal/i,
  /yopmail/i,
  /getnada/i,
  /internalmail/i
];

// Major directly allowed educational and trusted personal mail providers (instant access, 0ms)
export const DIRECT_ALLOWED_DOMAINS = new Set([
  'gmail.com', 'googlemail.com',
  'outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'outlook.in',
  'yahoo.com', 'yahoo.co.in', 'yahoo.in', 'ymail.com',
  'icloud.com', 'me.com', 'mac.com',
  'hbtu.ac.in', 'iitk.ac.in', 'iitd.ac.in', 'iitb.ac.in',
  'iitkgp.ac.in', 'iitm.ac.in', 'iitr.ac.in', 'iitg.ac.in',
  'iitbhu.ac.in', 'bhu.ac.in', 'du.ac.in', 'jnu.ac.in',
  'nitk.ac.in', 'mnnit.ac.in', 'nitt.ac.in', 'nitw.ac.in',
  'dtu.ac.in', 'nsut.ac.in', 'iiit.ac.in', 'iiitd.ac.in', 'iiita.ac.in',
  'bits-pilani.ac.in', 'thapar.edu', 'vit.ac.in', 'manipal.edu',
  'srmist.edu.in', 'aktu.ac.in'
]);

/**
 * Checks whether an email address or domain is an official college/academic credential
 * (e.g., hbtu.ac.in, .ac.in, .edu, .edu.in).
 */
export function isAcademicCredential(emailOrDomain: string): boolean {
  if (!emailOrDomain) return false;
  const domain = emailOrDomain.includes('@')
    ? emailOrDomain.split('@')[1].trim().toLowerCase()
    : emailOrDomain.trim().toLowerCase();

  if (domain === 'hbtu.ac.in') return true;
  return (
    domain.endsWith('.ac.in') ||
    domain.endsWith('.edu') ||
    domain.endsWith('.edu.in') ||
    domain.endsWith('.res.in') ||
    domain.endsWith('.ernet.in') ||
    domain.endsWith('.gov.in') ||
    domain.endsWith('.org.in') ||
    domain.endsWith('.ac.uk') ||
    domain.endsWith('.edu.au')
  );
}

/**
 * Checks whether an email domain is in the directly allowed whitelist (instant access).
 * Returns true for Gmail, Outlook, Hotmail, Live, Yahoo, iCloud, HBTU, and any recognized
 * academic domain ending with .ac.in, .edu, .edu.in, or .res.in.
 */
export function isDirectlyAllowedDomain(domain: string): boolean {
  if (!domain) return false;
  const clean = domain.trim().toLowerCase();
  if (DIRECT_ALLOWED_DOMAINS.has(clean)) return true;
  return isAcademicCredential(clean);
}

/** Synchronous check to see if a domain matches known disposable patterns or blacklist */
export function isDisposableDomain(domain: string): boolean {
  if (!domain) return false;
  const clean = domain.trim().toLowerCase();
  if (DISPOSABLE_DOMAINS_BLACKLIST.has(clean)) return true;
  return DISPOSABLE_DOMAIN_PATTERNS.some(re => re.test(clean));
}

interface EmailValidationResult {
  isValid: boolean;
  isDisposable: boolean;
  reason?: string;
}

let cachedCdnDomains: Set<string> | null = null;
let cdnFetchPromise: Promise<Set<string>> | null = null;

/**
 * Fetches the disposable email domains list from jsDelivr CDN (which supports CORS perfectly).
 * Caches the result in memory so it is only fetched once per application session.
 */
async function fetchCdnDomains(): Promise<Set<string>> {
  if (cachedCdnDomains) return cachedCdnDomains;
  if (cdnFetchPromise) return cdnFetchPromise;

  cdnFetchPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5 second timeout

      const res = await fetch("https://cdn.jsdelivr.net/gh/disposable-email-domains/disposable-email-domains@master/disposable_email_blocklist.conf", {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const text = await res.text();
        const domains = text.split("\n").map(d => d.trim().toLowerCase()).filter(Boolean);
        cachedCdnDomains = new Set(domains);
        console.log(`Successfully fetched and cached ${cachedCdnDomains.size} disposable domains from CDN.`);
        return cachedCdnDomains;
      }
    } catch (e) {
      console.warn("Failed to fetch disposable email domains from CDN, relying on static blacklist and APIs:", e);
    }
    return new Set<string>();
  })();

  return cdnFetchPromise;
}

/**
 * Validates the syntax of an email and checks if it belongs to a disposable email provider.
 * Uses a dynamic CDN blocklist, a static local blacklist, pattern matching, and fallback APIs (Kickbox + Debounce).
 */
export async function validateEmail(email: string): Promise<EmailValidationResult> {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return {
      isValid: false,
      isDisposable: false,
      reason: 'Invalid email format'
    };
  }

  const domain = cleanEmail.split('@')[1];
  if (!domain) {
    return {
      isValid: false,
      isDisposable: false,
      reason: 'Could not extract email domain'
    };
  }

  // 2. Check static disposable list & known patterns (fast, local check)
  if (isDisposableDomain(domain)) {
    return {
      isValid: false,
      isDisposable: true,
      reason: 'Temporary or disposable email addresses are not permitted on our platform.'
    };
  }

  // If from a known, trusted legitimate provider (Gmail, Outlook, Yahoo, HBTU, .ac.in, .edu, etc.), allow immediately
  if (isDirectlyAllowedDomain(domain)) {
    return {
      isValid: true,
      isDisposable: false
    };
  }

  // Known legitimate external email providers (e.g. Proton, Zoho, AOL, GMX)
  // These are valid, permanent email services (not disposable), though they still require administrative approval
  const KNOWN_LEGITIMATE_NON_ACADEMIC = new Set([
    'proton.me', 'protonmail.com', 'pm.me',
    'zoho.com', 'zoho.in', 'rediffmail.com',
    'aol.com', 'mail.com', 'gmx.com', 'gmx.net', 'yandex.com'
  ]);
  if (KNOWN_LEGITIMATE_NON_ACADEMIC.has(domain)) {
    return {
      isValid: true,
      isDisposable: false
    };
  }

  // 3. Check dynamic CDN blocklist (comprehensive check with ~8k domains)
  try {
    const cdnDomains = await fetchCdnDomains();
    if (cdnDomains.has(domain)) {
      return {
        isValid: false,
        isDisposable: true,
        reason: 'Temporary or disposable email addresses are not permitted.'
      };
    }
  } catch (err) {
    console.warn('Failed to check CDN blocklist, falling back to APIs:', err);
  }

  // 4. Real-time Live APIs (Mailcheck, Debounce, Kickbox) executed concurrently with strict 1.5s timeout
  try {
    const checkMailcheck = async (): Promise<EmailValidationResult | null> => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1500);
      try {
        const res = await fetch(`https://api.mailcheck.ai/domain/${domain}`, { signal: controller.signal });
        clearTimeout(timeout);
        if (res.ok) {
          const data = await res.json();
          if (data.disposable === true) {
            return { isValid: false, isDisposable: true, reason: 'Temporary or disposable email domain detected.' };
          }
          if (data.mx === false) {
            return { isValid: false, isDisposable: false, reason: 'This domain cannot receive emails (no valid MX record found).' };
          }
        }
      } catch {}
      return null;
    };

    const checkDebounce = async (): Promise<EmailValidationResult | null> => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1500);
      try {
        const res = await fetch(`https://disposable.debounce.io/?email=${cleanEmail}`, { signal: controller.signal });
        clearTimeout(timeout);
        if (res.ok) {
          const data = await res.json();
          if (data.disposable === 'true' || data.disposable === true) {
            return { isValid: false, isDisposable: true, reason: 'Temporary email domain detected via verification API.' };
          }
        }
      } catch {}
      return null;
    };

    const checkKickbox = async (): Promise<EmailValidationResult | null> => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1500);
      try {
        const res = await fetch(`https://open.kickbox.com/v1/disposable/${domain}`, { signal: controller.signal });
        clearTimeout(timeout);
        if (res.ok) {
          const data = await res.json();
          if (data.disposable === true) {
            return { isValid: false, isDisposable: true, reason: 'Temporary email domain detected via verification API.' };
          }
        }
      } catch {}
      return null;
    };

    const results = await Promise.allSettled([checkMailcheck(), checkDebounce(), checkKickbox()]);
    for (const r of results) {
      if (r.status === 'fulfilled' && r.value) {
        return r.value;
      }
    }
  } catch (error) {
    console.warn('Live API checks error, proceeding with local validations:', error);
  }

  return {
    isValid: true,
    isDisposable: false
  };
}
