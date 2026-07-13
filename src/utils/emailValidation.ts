/**
 * Utility for verifying email addresses and detecting disposable/temporary/fake emails.
 */

// A blacklist of common temporary / disposable email domains
const DISPOSABLE_DOMAINS_BLACKLIST = new Set([
  'yopmail.com', 'mailinator.com', 'tempmail.com', '10minutemail.com',
  'guerrillamail.com', 'dispostable.com', 'getairmail.com', 'sharklasers.com',
  'maildrop.cc', 'throwawaymail.com', 'tempmailaddress.com', 'boun.cr',
  'doefy.com', 'mailnesia.com', 'mailcatch.com', 'trashmail.com',
  'generator.email', 'disposable.com', 'duck.com', 'mozmail.com',
  'protonmail.ch', 'temp-mail.org', 'tempmail.dev', 'fakeinbox.com',
  'crazymailing.com', 'mintemail.com', 'jetable.org', 'safetymail.info',
  'mailnull.com', 'discard.email', 'mailinater.com', 'suremail.info',
  'buloan.com'
]);

interface EmailValidationResult {
  isValid: boolean;
  isDisposable: boolean;
  reason?: string;
}

/**
 * Validates the syntax of an email and checks if it belongs to a disposable email provider.
 * Uses a static blacklist and also checks multiple free disposable check APIs (Kickbox + Debounce).
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

  // 2. Check static disposable list
  if (DISPOSABLE_DOMAINS_BLACKLIST.has(domain)) {
    return {
      isValid: false,
      isDisposable: true,
      reason: 'Temporary or disposable email addresses are not allowed.'
    };
  }

  // 3. Dynamic Checker API 1: Debounce API (Real-time active lookup, no key needed)
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
          reason: 'Temporary email domain detected via Debounce verification API.'
        };
      }
    }
  } catch (error) {
    console.warn('Debounce API check failed, falling back:', error);
  }

  // 4. Dynamic Checker API 2: Kickbox's free disposable email checker API
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
          reason: 'Temporary email domain detected via Kickbox verification API.'
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
