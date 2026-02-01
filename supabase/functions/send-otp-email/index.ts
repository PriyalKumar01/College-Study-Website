import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OTPEmailRequest {
  email: string;
  otp: string;
  firstName: string;
  isPasswordReset?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, otp, firstName, isPasswordReset }: OTPEmailRequest = await req.json();

    console.log(`Sending OTP email to: ${email}`);

    // Validate required fields
    if (!email || !otp) {
      throw new Error("Missing required fields: email and otp are required");
    }

    const userName = firstName || "Student";
    const subject = isPasswordReset 
      ? "Reset Your Password - College Study" 
      : "Your Verification Code - College Study";
    const heading = isPasswordReset 
      ? "Reset Your Password" 
      : "Verify Your Email";
    const message = isPasswordReset
      ? `Use the code below to reset your password. This code expires in 2 minutes.`
      : `Use the code below to verify your email and complete your registration. This code expires in 2 minutes.`;

    const emailResponse = await resend.emails.send({
      from: "College Study <noreply@resend.dev>",
      to: [email],
      subject,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${heading}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 440px; width: 100%; background-color: #ffffff; border: 1px solid #e5e5e5;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px; border-bottom: 1px solid #e5e5e5;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td>
                    <img 
                      src="https://axalbmmjqdezbkpffore.supabase.co/storage/v1/object/public/assets/college-study-logo.png" 
                      alt="College Study" 
                      style="height: 40px; width: auto;"
                      onerror="this.style.display='none'"
                    />
                    <div style="display: inline-block; vertical-align: middle; margin-left: 12px;">
                      <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1a1a1a;">College Study</p>
                      <p style="margin: 0; font-size: 11px; color: #666666; text-transform: uppercase; letter-spacing: 0.5px;">Your Study Hub</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 600; color: #1a1a1a; text-align: center;">
                ${heading}
              </h1>
              
              <p style="margin: 0 0 24px; font-size: 14px; color: #4a4a4a; line-height: 1.6; text-align: center;">
                Hi ${userName}! 👋<br><br>
                ${message}
              </p>
              
              <!-- OTP Code Box -->
              <div style="background-color: #f9f9f9; border: 1px solid #e5e5e5; padding: 24px; text-align: center; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 11px; color: #666666; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  Your Verification Code
                </p>
                <p style="margin: 0; font-size: 32px; font-weight: 700; color: #1a1a1a; letter-spacing: 6px; font-family: 'Courier New', monospace;">
                  ${otp}
                </p>
              </div>
              
              <p style="margin: 0 0 24px; font-size: 12px; color: #888888; text-align: center;">
                ⚠️ Please don't share this code with anyone. Our team will never ask for it.
              </p>
              
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;">
              
              <p style="margin: 0; font-size: 12px; color: #888888; text-align: center; line-height: 1.6;">
                If you didn't request this code, you can safely ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #fafafa; border-top: 1px solid #e5e5e5; text-align: center;">
              <p style="margin: 0 0 4px; font-size: 13px; color: #4a4a4a;">
                Made with ❤️ for HBTU Students
              </p>
              <p style="margin: 0; font-size: 11px; color: #888888;">
                © 2025 College Study. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    console.log("OTP email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-otp-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
