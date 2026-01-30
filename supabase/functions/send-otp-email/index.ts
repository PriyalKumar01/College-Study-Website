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
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, otp, firstName }: OTPEmailRequest = await req.json();

    console.log(`Sending OTP email to: ${email}`);

    // Validate required fields
    if (!email || !otp) {
      throw new Error("Missing required fields: email and otp are required");
    }

    const userName = firstName || "Student";

    const emailResponse = await resend.emails.send({
      from: "College Study <noreply@resend.dev>",
      to: [email],
      subject: "Your Verification Code - College Study",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 480px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center; border-bottom: 1px solid #e2e8f0;">
              <div style="display: inline-flex; align-items: center; gap: 12px;">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 24px;">📚</span>
                </div>
                <div style="text-align: left;">
                  <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #1e293b;">College Study</h1>
                  <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Your Study Hub</p>
                </div>
              </div>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #1e293b; text-align: center;">
                Verify Your Email
              </h2>
              
              <p style="margin: 0 0 24px; font-size: 15px; color: #475569; line-height: 1.6; text-align: center;">
                Hi ${userName}! 👋<br><br>
                Use the code below to verify your email and complete your registration. This code expires in 10 minutes.
              </p>
              
              <!-- OTP Code Box -->
              <div style="background: linear-gradient(135deg, #f1f5f9, #e2e8f0); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  Your Verification Code
                </p>
                <p style="margin: 0; font-size: 36px; font-weight: 700; color: #6366f1; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                  ${otp}
                </p>
              </div>
              
              <p style="margin: 0 0 24px; font-size: 13px; color: #94a3b8; text-align: center;">
                ⚠️ Please don't share this code with anyone. Our team will never ask for it.
              </p>
              
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
              
              <p style="margin: 0; font-size: 13px; color: #94a3b8; text-align: center; line-height: 1.6;">
                If you didn't request this code, you can safely ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8fafc; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #64748b;">
                Made with ❤️ for HBTU Students
              </p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
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
