import { supabase } from '@/integrations/supabase/client';

export interface Recipient {
  email: string;
  name?: string;
  isGoogleAuthFail?: boolean;
}

export interface CampaignButton {
  text: string;
  url: string;
}

export interface SendCampaignOptions {
  recipients: Recipient[];
  subject: string;
  bodyText: string;
  logoUrl?: string;
  headerUrl?: string;
  bannerUrl?: string;
  buttons?: CampaignButton[];
  fromAddress?: string;
  sendAsBcc?: boolean;
  siteUrl?: string;
  brevoApiKey?: string;
  resendApiKey?: string;
  onLog?: (msg: string) => void;
}

export interface EmailDispatchResult {
  success: boolean;
  recipientEmail: string;
  brevoMessageId?: string;
  resendEmailId?: string;
  error?: string;
}

export interface BatchDispatchResponse {
  success: boolean;
  results: EmailDispatchResult[];
  error?: string;
  usedFallback?: boolean;
}

export function formatMarkdownToHtml(text: string): string {
  if (!text) return '';

  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic *text*
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Paragraphs by double line breaks
  html = html
    .split(/\n\s*\n/)
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      return `<p style="margin: 0 0 16px; line-height: 1.6; color: #334155; font-size: 15px;">${trimmed.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');

  return html;
}

export function buildButtonsHtml(buttons?: CampaignButton[], siteUrl: string = 'https://college-study.netlify.app'): string {
  if (!buttons || buttons.length === 0) return '';
  const cleanSiteUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  let html = `<div style="margin: 24px 0; text-align: center;"><table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; border-collapse: collapse;"><tr>`;
  
  buttons.forEach((btn) => {
    if (!btn.text?.trim()) return;
    const btnUrl = btn.url.startsWith('http') ? btn.url : `${cleanSiteUrl}${btn.url}`;
    const lowerText = btn.text.toLowerCase();
    let buttonStyle = 'background-color: #0284c7; color: #ffffff; border: 1px solid #0284c7; padding: 12px 20px; font-weight: 600; font-size: 14px; text-decoration: none; border-radius: 8px; display: inline-block;';
    let iconHtml = '';
    
    if (lowerText.includes('google')) {
      buttonStyle = 'background-color: #ffffff; color: #1e293b; border: 1px solid #cbd5e1; padding: 12px 20px; font-weight: 600; font-size: 14px; text-decoration: none; border-radius: 8px; display: inline-block; box-shadow: 0 1px 2px rgba(0,0,0,0.05);';
      iconHtml = `<img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" style="width: 16px; height: 16px; margin-right: 8px; vertical-align: middle; display: inline-block; border: 0;" />`;
    } else if (lowerText.includes('github')) {
      buttonStyle = 'background-color: #ffffff; color: #1e293b; border: 1px solid #cbd5e1; padding: 12px 20px; font-weight: 600; font-size: 14px; text-decoration: none; border-radius: 8px; display: inline-block; box-shadow: 0 1px 2px rgba(0,0,0,0.05);';
      iconHtml = `<img src="https://img.icons8.com/material-outlined/48/000000/github.png" alt="GitHub" style="width: 16px; height: 16px; margin-right: 8px; vertical-align: middle; display: inline-block; border: 0;" />`;
    }
    const cleanText = btn.text.replace(/🌐|💻/g, '').trim();
    html += `<td style="padding: 0 8px 12px 8px;"><a href="${btnUrl}" target="_blank" style="${buttonStyle}">${iconHtml}<span style="vertical-align: middle;">${cleanText}</span></a></td>`;
  });
  
  html += `</tr></table></div>`;
  return html;
}

export function buildEmailHtml(params: {
  subject: string;
  introGreeting: string;
  formattedHtmlBody: string;
  buttonsHtml: string;
  logoUrl?: string;
  headerUrl?: string;
  bannerUrl?: string;
  SITE_URL?: string;
}): string {
  const {
    subject,
    introGreeting,
    formattedHtmlBody,
    buttonsHtml,
    logoUrl,
    headerUrl,
    bannerUrl,
    SITE_URL = 'https://college-study.netlify.app',
  } = params;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f0f9ff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f0f9ff; padding: 20px 0;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #e0f2fe; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);">
          
          <!-- Header (Logo) -->
          <tr>
            <td style="padding: 32px 32px 20px; background-color: #ffffff; text-align: center; border-bottom: 1px solid #f0f9ff;">
              <img src="${logoUrl || 'https://college-study.netlify.app/logo.png'}" alt="College Study" style="height: 50px; width: auto; margin-bottom: 8px;" />
              <p style="margin: 0; font-size: 20px; font-weight: 700; color: #0369a1; letter-spacing: 0.5px;">College Study</p>
              <p style="margin: 0; font-size: 11px; color: #0284c7; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Ultimate Academic Hub</p>
            </td>
          </tr>
          
          <!-- Header Banner -->
          ${headerUrl ? `
          <tr>
            <td style="padding: 0 32px 10px; background-color: #ffffff; text-align: center;">
              <img src="${headerUrl.startsWith('http') ? headerUrl : `${SITE_URL}${headerUrl}`}" alt="College Study Banner" style="width: 100%; height: auto; border-radius: 12px; display: block; border: 0;" />
            </td>
          </tr>
          ` : ''}
          
          <!-- Email Body Content -->
          <tr>
            <td style="padding: 40px 32px 32px; background-color: #ffffff;">
              <h2 style="margin: 0 0 20px; font-size: 20px; font-weight: 700; color: #0f172a;">
                ${introGreeting}
              </h2>
              ${formattedHtmlBody}
              ${buttonsHtml}
            </td>
          </tr>

          <!-- Clickable Banner Section -->
          <tr>
            <td style="padding: 0 32px; background-color: #ffffff; text-align: center;">
              <a href="${SITE_URL}" target="_blank" style="display: block; border-radius: 12px; overflow: hidden; border: 1px solid #e0f2fe;">
                <img src="${bannerUrl ? (bannerUrl.startsWith('http') ? bannerUrl : `${SITE_URL}${bannerUrl}`) : `${SITE_URL}/college_study_email_poster.png`}" alt="College Study Features" style="width: 100%; height: auto; display: block; border: 0;" />
              </a>
            </td>
          </tr>

          <!-- Footer / Support Section -->
          <tr>
            <td style="padding: 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 13px; color: #475569; font-weight: 600;">
                Have questions or need help?
              </p>
              <p style="margin: 0 0 24px; font-size: 13px; color: #64748b; line-height: 1.5;">
                Reach out to us at <a href="mailto:collegestudy.support@gmail.com" style="color: #0284c7; text-decoration: none; font-weight: 500;">collegestudy.support@gmail.com</a>.
              </p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
              <p style="margin: 0 0 6px; font-size: 12px; color: #0284c7; font-weight: 600;">
                Made with ❤️ for College Students
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                © 2026 College Study. All rights reserved.<br>
                Kanpur, Uttar Pradesh, India.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Sends a batch of campaign emails.
 * Attempts Supabase Edge Function first; if it returns a non-2xx status code or errors,
 * seamlessly fails over to direct Brevo transactional API.
 */
export async function sendCampaignBatch(options: SendCampaignOptions): Promise<BatchDispatchResponse> {
  const {
    recipients,
    subject,
    bodyText,
    logoUrl,
    headerUrl,
    bannerUrl,
    buttons,
    fromAddress = 'College Study <collegestudy.support@gmail.com>',
    sendAsBcc = false,
    siteUrl = 'https://college-study.netlify.app',
    brevoApiKey,
    resendApiKey,
    onLog
  } = options;

  if (!recipients || recipients.length === 0) {
    return { success: true, results: [] };
  }

  // Parse sender details
  let senderName = 'College Study';
  let senderEmail = 'collegestudy.support@gmail.com';
  if (fromAddress) {
    const match = fromAddress.match(/^(.*?)\s*<(.+)>$/);
    if (match) {
      senderName = match[1].trim() || 'College Study';
      senderEmail = match[2].trim();
    } else {
      senderEmail = fromAddress.trim();
    }
  }

  // Primary Path: Supabase Edge Function
  try {
    const { data: result, error: invokeError } = await supabase.functions.invoke('send-campaign-emails', {
      body: {
        action: 'send',
        recipients,
        subject,
        bodyText,
        logoUrl,
        headerUrl,
        bannerUrl,
        buttons,
        fromAddress,
        sendAsBcc,
        siteUrl,
        brevoApiKey: brevoApiKey || localStorage.getItem('mass_email_brevo_key') || import.meta.env.VITE_BREVO_API_KEY || undefined,
        resendApiKey: resendApiKey || undefined
      }
    });

    if (!invokeError && result && result.success && Array.isArray(result.results)) {
      return { success: true, results: result.results };
    }

    if (invokeError) {
      onLog?.(`[Info] Edge Function unavailable (${invokeError.message}). Activating direct delivery engine...`);
    }
  } catch (edgeErr: any) {
    onLog?.(`[Info] Edge Function exception (${edgeErr?.message || 'Network'}). Activating direct delivery engine...`);
  }

  // Failover Path: Direct Client-Side Delivery via Brevo API
  const DEFAULT_BREVO_KEY = (import.meta.env.VITE_BREVO_API_KEY as string) || '';
  const activeKey = (brevoApiKey || resendApiKey || localStorage.getItem('mass_email_brevo_key') || localStorage.getItem('mass_email_api_key') || DEFAULT_BREVO_KEY).trim();
  const buttonsHtml = buildButtonsHtml(buttons, siteUrl);
  const results: EmailDispatchResult[] = [];

  const isResendKey = activeKey.startsWith('re_');

  for (const recipient of recipients) {
    const name = recipient.name || 'Student';
    const email = recipient.email;

    let introGreeting = `Hi ${name}! 👋`;
    let processedBody = bodyText;

    if (recipient.isGoogleAuthFail) {
      introGreeting = `Dear ${name},`;
      processedBody = `We noticed you encountered an authentication issue while trying to sign up using your Google Account.\n\nUsually, this is a temporary connection glitch. Please wait for 5 minutes and try registering again. We've optimized our portal to make sure your next attempt is smooth!\n\n${bodyText}`;
    }

    const formattedHtmlBody = formatMarkdownToHtml(processedBody);
    const emailHtml = buildEmailHtml({
      subject,
      introGreeting,
      formattedHtmlBody,
      buttonsHtml,
      logoUrl,
      headerUrl,
      bannerUrl,
      SITE_URL: siteUrl
    });

    if (activeKey) {
      if (isResendKey) {
        // Direct Resend API Delivery
        try {
          const resendPayload = {
            from: fromAddress.includes('@') ? fromAddress : 'College Study <onboarding@resend.dev>',
            to: [email],
            subject,
            html: emailHtml,
          };

          const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${activeKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(resendPayload),
          });

          const data = await response.json();

          if (response.ok && data.id) {
            results.push({
              success: true,
              recipientEmail: email,
              resendEmailId: data.id,
            });
          } else {
            const errMsg = data?.message || data?.error || `HTTP ${response.status}`;
            results.push({
              success: false,
              recipientEmail: email,
              error: errMsg,
            });
          }
        } catch (err: any) {
          results.push({
            success: false,
            recipientEmail: email,
            error: err.message || 'Direct network error',
          });
        }
      } else {
        // Direct Brevo API Delivery
        try {
          const brevoPayload = {
            sender: { name: senderName, email: senderEmail },
            to: [{ email, name }],
            replyTo: { email: 'collegestudy.support@gmail.com', name: 'College Study Support' },
            subject,
            htmlContent: emailHtml,
          };

          const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'api-key': activeKey,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(brevoPayload),
          });

          const data = await response.json();

          if (response.ok && data.messageId) {
            results.push({
              success: true,
              recipientEmail: email,
              brevoMessageId: data.messageId,
            });
          } else {
            const errMsg = data?.message || data?.error || `HTTP ${response.status}`;
            results.push({
              success: false,
              recipientEmail: email,
              error: errMsg,
            });
          }
        } catch (err: any) {
          results.push({
            success: false,
            recipientEmail: email,
            error: err.message || 'Direct network error',
          });
        }
      }
    } else {
      results.push({
        success: false,
        recipientEmail: email,
        error: 'Please paste your Brevo API key (xkeysib-...) or Resend API key (re_...) in the Step 1 API key box to send emails directly.',
      });
    }
  }

  const anySuccess = results.some(r => r.success);
  return {
    success: anySuccess,
    results,
    usedFallback: true,
    error: anySuccess ? undefined : (results[0]?.error || 'Failed to dispatch emails')
  };
}
