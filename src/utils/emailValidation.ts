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

// Major directly allowed educational and trusted personal mail providers (instant access)
export const DIRECT_ALLOWED_DOMAINS = new Set([
  'gmail.com', 'googlemail.com',
  'outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'outlook.in',
  'yahoo.com', 'yahoo.co.in', 'ymail.com',
  'icloud.com', 'me.com', 'mac.com',
  'hbtu.ac.in', 'iitk.ac.in', 'iitd.ac.in', 'iitb.ac.in'
]);

/**
 * Checks whether an email domain is in the directly allowed whitelist (instant access).
 * Returns true for Gmail, Outlook, Hotmail, Live, Yahoo, iCloud, HBTU, and any recognized
 * academic domain ending with .ac.in, .edu, .edu.in, or .res.in.
 */
export function isDirectlyAllowedDomain(domain: string): boolean {
  if (!domain) return false;
  const clean = domain.trim().toLowerCase();
  if (DIRECT_ALLOWED_DOMAINS.has(clean)) return true;
  if (
    clean.endsWith('.ac.in') ||
    clean.endsWith('.edu') ||
    clean.endsWith('.edu.in') ||
    clean.endsWith('.res.in')
  ) {
    return true;
  }
  return false;
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

  // 4. Real-time Live API 1: Mailcheck.ai (Real-time MX, domain age, & disposable check - detects fpklm.com and new burners)
  try {
    const mailcheckController = new AbortController();
    const mailcheckTimeout = setTimeout(() => mailcheckController.abort(), 3500);

    const mailcheckRes = await fetch(`https://api.mailcheck.ai/domain/${domain}`, {
      signal: mailcheckController.signal
    });
    clearTimeout(mailcheckTimeout);

    if (mailcheckRes.ok) {
      const data = await mailcheckRes.json();
      if (data.disposable === true) {
        return {
          isValid: false,
          isDisposable: true,
          reason: 'Temporary or disposable email domain detected via security verification.'
        };
      }
      if (data.mx === false) {
        return {
          isValid: false,
          isDisposable: false,
          reason: 'This domain cannot receive emails (no valid MX record found).'
        };
      }
    }
  } catch (error) {
    console.warn('Mailcheck.ai check failed, falling back to secondary APIs:', error);
  }

  // 5. Real-time Live API 2: Debounce API (Real-time active lookup)
  try {
    const debounceController = new AbortController();
    const debounceTimeout = setTimeout(() => debounceController.abort(), 3000); // 3-second timeout

    const debounceResponse = await fetch(`https://disposable.debounce.io/?email=${cleanEmail}`, {
      signal: debounceController.signal
    });

    clearTimeout(debounceTimeout);

    if (debounceResponse.ok) {
      const data = await debounceResponse.json();
      if (data.disposable === 'true' || data.disposable === true) {
        return {
          isValid: false,
          isDisposable: true,
          reason: 'Temporary email domain detected via verification API.'
        };
      }
    }
  } catch (error) {
    console.warn('Debounce API check failed, falling back:', error);
  }

  // 6. Real-time Live API 3: Kickbox's free disposable email checker API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout

    const response = await fetch(`https://open.kickbox.com/v1/disposable/${domain}`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.disposable === true) {
        return {
          isValid: false,
          isDisposable: true,
          reason: 'Temporary email domain detected via verification API.'
        };
      }
    }
  } catch (error) {
    console.warn('Kickbox API check failed, relying on local filters:', error);
  }

  return {
    isValid: true,
    isDisposable: false
  };
}
