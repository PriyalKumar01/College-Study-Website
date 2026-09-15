/**
 * Utility for verifying email addresses and detecting disposable/temporary/fake emails.
 */

// A blacklist of common temporary / disposable email domains
const DISPOSABLE_DOMAINS_BLACKLIST = new Set([
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
  'fakemailgenerator.com', 'mytemp.email', 'emailfake.com', 'trashmail.net'
]);

// Common patterns in disposable email domains
const DISPOSABLE_DOMAIN_PATTERNS = [
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

  // 4. Dynamic Checker API 1: Debounce API (Real-time active lookup, no key needed)
  try {
    const debounceController = new AbortController();
    const debounceTimeout = setTimeout(() => debounceController.abort(), 3000); // 3-second timeout

    const debounceResponse = await fetch(`https://disposable.debounce.io/?email=${cleanEmail}`, {
      signal: debounceController.signal
    });

    clearTimeout(debounceTimeout);

    if (debounceResponse.ok) {
      const data = await debounceResponse.json();
      // Debounce returns {"disposable": "true"} or {"disposable": "false"} as strings (sometimes boolean)
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

  // 5. Dynamic Checker API 2: Kickbox's free disposable email checker API
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
    // If external APIs fail, we fail-open on dynamic checks but still respect static list
    console.warn('Kickbox API check failed, relying on local filters:', error);
  }

  return {
    isValid: true,
    isDisposable: false
  };
}
