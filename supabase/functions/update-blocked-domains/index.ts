import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("Starting weekly blocked domains sync...");

    // Initialize Supabase Client with service role key to bypass RLS for insertions
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables.");
    }

    // Verify request is authorized (using Service Role key)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.includes(supabaseServiceKey)) {
      console.warn("Unauthorized request attempt to sync blocked domains.");
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized access" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Fetch Groundcat Domains list
    console.log("Fetching Groundcat blocklist...");
    const groundcatResponse = await fetch(
      "https://raw.githubusercontent.com/groundcat/disposable-email-domain-list/master/domains.txt"
    );
    if (!groundcatResponse.ok) {
      throw new Error("Failed to fetch Groundcat domains list.");
    }
    const groundcatText = await groundcatResponse.text();
    const groundcatDomains = groundcatText
      .split("\n")
      .map((d) => d.trim().toLowerCase())
      .filter((d) => d && !d.startsWith("#"));

    // 2. Fetch Martenson Blacklist
    console.log("Fetching Martenson blocklist...");
    const martensonResponse = await fetch(
      "https://raw.githubusercontent.com/martenson/disposable-email-domains/master/disposable_email_blocklist.conf"
    );
    let martensonDomains: string[] = [];
    if (martensonResponse.ok) {
      const martensonText = await martensonResponse.text();
      martensonDomains = martensonText
        .split("\n")
        .map((d) => d.trim().toLowerCase())
        .filter((d) => d && !d.startsWith("#") && !d.startsWith("//"));
    } else {
      console.warn("Could not fetch Martenson blocklist, using Groundcat only.");
    }

    // 3. Combine lists and unique-fy
    const uniqueDomains = new Set([...groundcatDomains, ...martensonDomains]);
    
    // Explicitly enforce buloan.com and other common ones
    const manualDomains = [
      "buloan.com", "yopmail.com", "mailinator.com", "tempmail.com",
      "10minutemail.com", "guerrillamail.com", "dispostable.com"
    ];
    for (const d of manualDomains) {
      uniqueDomains.add(d);
    }

    const domainsList = Array.from(uniqueDomains).map((domain) => ({ domain }));
    console.log(`Parsed total unique domains: ${domainsList.length}`);

    // 4. Batch upsert into database in chunks of 1000 to prevent payload size limits
    const chunkSize = 1000;
    let insertedCount = 0;

    for (let i = 0; i < domainsList.length; i += chunkSize) {
      const chunk = domainsList.slice(i, i + chunkSize);
      
      const { error } = await supabase
        .from("blocked_email_domains")
        .upsert(chunk, { onConflict: "domain" });

      if (error) {
        console.error(`Error inserting chunk starting at index ${i}:`, error.message);
        throw error;
      }
      insertedCount += chunk.length;
      console.log(`Successfully synced chunk ${i / chunkSize + 1} (${insertedCount}/${domainsList.length} domains)`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully synchronized ${insertedCount} disposable email domains.`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Critical error in sync function:", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to synchronize blocked domains.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
