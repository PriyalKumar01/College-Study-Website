import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface Recipient {
  email: string;
  name?: string;
  isGoogleAuthFail?: boolean;
}

interface CampaignButton {
  text: string;
  url: string;
}

interface SendCampaignRequest {
  action: "send" | "sync";
  siteUrl?: string;
  // For action === 'send'
  campaignId?: string;
  recipients?: Recipient[];
  subject?: string;
  bodyText?: string;
  logoUrl?: string;
  headerUrl?: string;
  bannerUrl?: string;
  buttons?: CampaignButton[];
  fromAddress?: string;
  sendAsBcc?: boolean;
  // For action === 'sync'
  emailIds?: string[]; // Resend email IDs to sync status
}

// Simple markdown-to-html formatter for body text
function formatMarkdownToHtml(text: string): string {
  if (!text) return "";
  
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  
  // Italic *text*
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  
  // Paragraphs by double line breaks
  html = html.split(/\n\s*\n/).map(p => {
    const trimmed = p.trim();
    if (!trimmed) return "";
    return `<p style="margin: 0 0 16px; line-height: 1.6; color: #334155; font-size: 15px;">${trimmed.replace(/\n/g, "<br>")}</p>`;
  }).join("");

  return html;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "re_7oYzeKGo_FPFyksyTHad8KrwsX3oA92qM";
  const RESEND_FROM = Deno.env.get("RESEND_FROM") || "College Study <onboarding@resend.dev>";

  try {
    const body: SendCampaignRequest = await req.json();
    const { action, siteUrl } = body;

    const rawSiteUrl = siteUrl || Deno.env.get("SITE_URL") || "https://college-study.netlify.app";
    const cleanSiteUrl = (rawSiteUrl && !rawSiteUrl.includes('localhost') && !rawSiteUrl.includes('127.0.0.1'))
      ? rawSiteUrl
      : "https://college-study.netlify.app";
    const SITE_URL = cleanSiteUrl.endsWith('/') ? cleanSiteUrl.slice(0, -1) : cleanSiteUrl;

    if (action === "send") {
      const { recipients, subject, bodyText, logoUrl, headerUrl, bannerUrl, buttons, fromAddress, sendAsBcc } = body;

      if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: "Recipients array is required and must not be empty" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (!subject || !bodyText) {
        return new Response(
          JSON.stringify({ success: false, error: "Subject and bodyText are required" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      console.log(`Sending campaign with ${recipients.length} recipients. Subject: "${subject}"`);

      // We will prepare the batch send array for Resend API
      const emailBatch = recipients.map((recipient) => {
        const name = recipient.name || "Student";
        const email = recipient.email;

        // Custom personalization based on whether it is a google auth failure or standard verification failure
        let introGreeting = `Hi ${name}! 👋`;
        let processedBody = bodyText;

        if (recipient.isGoogleAuthFail) {
          introGreeting = `Dear ${name},`;
          processedBody = `We noticed you encountered an authentication issue while trying to sign up using your Google Account. 

Usually, this is a temporary connection glitch. Please wait for 5 minutes and try registering again. We've optimized our portal to make sure your next attempt is smooth!

${bodyText}`;
        }

        const formattedHtmlBody = formatMarkdownToHtml(processedBody);
        
        // Buttons rendering HTML
        let buttonsHtml = "";
        if (buttons && buttons.length > 0) {
          buttonsHtml = `
            <div style="margin: 24px 0; text-align: center;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; border-collapse: collapse;">
                <tr>
          `;

          buttons.forEach((btn, idx) => {
            const btnUrl = btn.url.startsWith("http") ? btn.url : `${SITE_URL}${btn.url}`;
            const lowerText = btn.text.toLowerCase();
            
            let buttonStyle = "background-color: #0284c7; color: #ffffff; border: 1px solid #0284c7; padding: 12px 20px; font-weight: 600; font-size: 14px; text-decoration: none; border-radius: 8px; display: inline-block; transition: background-color 0.2s;";
            let iconHtml = "";

            if (lowerText.includes("google")) {
              buttonStyle = "background-color: #ffffff; color: #1e293b; border: 1px solid #cbd5e1; padding: 12px 20px; font-weight: 600; font-size: 14px; text-decoration: none; border-radius: 8px; display: inline-block; transition: background-color 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);";
              iconHtml = `<img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" style="width: 16px; height: 16px; margin-right: 8px; vertical-align: middle; display: inline-block; border: 0;" />`;
            } else if (lowerText.includes("github")) {
              buttonStyle = "background-color: #ffffff; color: #1e293b; border: 1px solid #cbd5e1; padding: 12px 20px; font-weight: 600; font-size: 14px; text-decoration: none; border-radius: 8px; display: inline-block; transition: background-color 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);";
              iconHtml = `<img src="https://img.icons8.com/material-outlined/48/000000/github.png" alt="GitHub" style="width: 16px; height: 16px; margin-right: 8px; vertical-align: middle; display: inline-block; border: 0;" />`;
            }

            const cleanText = btn.text.replace(/🌐|💻/g, "").trim();

            buttonsHtml += `
              <td style="padding: 0 8px 12px 8px;">
                <a href="${btnUrl}" target="_blank" style="${buttonStyle}">
                  ${iconHtml}<span style="vertical-align: middle;">${cleanText}</span>
                </a>
              </td>
            `;
          });

          buttonsHtml += `
                </tr>
              </table>
            </div>
          `;
        }

        // Render full responsive HTML email template
        // Using high-quality sky blue and white aesthetics as requested
        const emailHtml = `
<!DOCTYPE html>
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
          
          <!-- Email Header (Logo) -->
          <tr>
            <td style="padding: 32px 32px 20px; background-color: #ffffff; text-align: center; border-bottom: 1px solid #f0f9ff;">
              <img src="${logoUrl || 'https://college-study.netlify.app/logo.png'}" alt="College Study" style="height: 50px; width: auto; margin-bottom: 8px;" />
              <p style="margin: 0; font-size: 20px; font-weight: 700; color: #0369a1; letter-spacing: 0.5px;">College Study</p>
              <p style="margin: 0; font-size: 11px; color: #0284c7; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Ultimate Academic Hub</p>
            </td>
          </tr>
          
          <!-- Optional Header Banner -->
          ${headerUrl ? `
          <tr>
            <td style="padding: 0 32px 10px; background-color: #ffffff; text-align: center;">
              <img src="${headerUrl.startsWith("http") ? headerUrl : `${SITE_URL}${headerUrl}`}" alt="College Study Banner" style="width: 100%; height: auto; border-radius: 12px; display: block; border: 0;" />
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
              
              <!-- Action Buttons -->
              ${buttonsHtml}
            </td>
          </tr>

          <!-- Banner / Poster Section (Clickable) -->
          <tr>
            <td style="padding: 0 32px; background-color: #ffffff; text-align: center;">
              <a href="${SITE_URL}" target="_blank" style="display: block; border-radius: 12px; overflow: hidden; border: 1px solid #e0f2fe;">
                <img src="${bannerUrl ? (bannerUrl.startsWith("http") ? bannerUrl : `${SITE_URL}${bannerUrl}`) : `${SITE_URL}/college_study_email_poster.png`}" alt="College Study Features" style="width: 100%; height: auto; display: block; border: 0;" />
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
</html>
        `;

        const mailTo = sendAsBcc ? ["College Study <no-reply@college-study.netlify.app>"] : [email];
        const mailBcc = sendAsBcc ? [email] : undefined;

        return {
          from: fromAddress || RESEND_FROM,
          to: mailTo,
          bcc: mailBcc,
          reply_to: "collegestudy.support@gmail.com", // Set reply-to to support Gmail
          subject: subject,
          html: emailHtml,
        };
      });

      // Split into batches of 100 (Resend Batch API limit)
      const batches = [];
      const batchSize = 100;
      for (let i = 0; i < emailBatch.length; i += batchSize) {
        batches.push(emailBatch.slice(i, i + batchSize));
      }

      const results = [];

      for (const batch of batches) {
        console.log(`Posting batch of ${batch.length} emails to Resend...`);
        const resendResponse = await fetch("https://api.resend.com/emails/batch", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(batch),
        });

        const resendData = await resendResponse.json();
        console.log("Resend Batch response status:", resendResponse.status);

        if (!resendResponse.ok) {
          console.error("Resend API batch failed:", resendData);
          results.push({
            success: false,
            error: resendData.error?.message || resendData.message || "Failed to send batch",
            recipients: batch.map(b => b.to[0])
          });
        } else {
          // Resend returns an array of { id } objects
          results.push({
            success: true,
            data: resendData.data || resendData, // returns array of email status ids
            recipients: batch.map(b => b.to[0])
          });
        }
      }

      return new Response(
        JSON.stringify({ success: true, results }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );

    } else if (action === "sync") {
      const { emailIds } = body;

      if (!emailIds || !Array.isArray(emailIds) || emailIds.length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: "emailIds array is required" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      console.log(`Syncing status for ${emailIds.length} emails...`);

      const syncResults = [];

      // Query Resend API for status of each email ID
      for (const id of emailIds) {
        try {
          const res = await fetch(`https://api.resend.com/emails/${id}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            }
          });

          if (res.ok) {
            const emailDetails = await res.json();
            // Statuses can be: 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained'
            syncResults.push({
              resendEmailId: id,
              status: emailDetails.last_event || "sent"
            });
          } else {
            console.warn(`Failed to fetch status for email ${id}: ${res.statusText}`);
            syncResults.push({
              resendEmailId: id,
              status: "unknown",
              error: `API error: ${res.status}`
            });
          }
        } catch (err: any) {
          syncResults.push({
            resendEmailId: id,
            status: "error",
            error: err.message
          });
        }
      }

      return new Response(
        JSON.stringify({ success: true, statuses: syncResults }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );

    } else {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid action. Supported actions: 'send', 'sync'" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

  } catch (error: any) {
    console.error("Campaign Function Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
