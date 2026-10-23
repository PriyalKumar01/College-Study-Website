import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const EMBEDDING_DIMENSION = 768;
const EMBEDDING_MODEL = "gemini-embedding-001";
const FALLBACK_EMBEDDING_MODEL = "gemini-embedding-2";

// ── Embed helper ─────────────────────────────────────────────
async function getGeminiEmbedding(text: string, apiKey: string): Promise<number[]> {
  const models = [EMBEDDING_MODEL, FALLBACK_EMBEDDING_MODEL];
  let lastError: unknown = null;

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: `models/${model}`,
            content: { parts: [{ text }] },
            taskType: "RETRIEVAL_DOCUMENT",
            outputDimensionality: EMBEDDING_DIMENSION,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const values = data.embedding?.values;
        if (Array.isArray(values) && values.length > 0) {
          return values.slice(0, EMBEDDING_DIMENSION);
        }
      } else {
        lastError = new Error(`Embedding error: ${response.status}`);
      }
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError ?? new Error("Gemini embedding failed");
}

// ── Verified Knowledge Chunks (Sanitized: NO secrets/coupons) ─
const SITE_KNOWLEDGE_CHUNKS = [
  {
    heading: "HBTU Kanpur University Overview & Campuses",
    subject: "HBTU Knowledge",
    content: `Harcourt Butler Technical University (HBTU Kanpur) was established in 1921 as Government Technological Institute, became HBTI in 1965, and was upgraded to a premier State Technical University in 2016 in Kanpur, Uttar Pradesh.
Campuses:
1. East Campus (Main Campus, Nawabganj): Academic departments, Central Library, CSE, IT, EE, ET, ME, CE, CHE, Administrative building, Cafeteria, and Sports Ground.
2. West Campus: Hostels (DBRA, Visvesvaraya, Raman, Ramanujan, WCH), Food Technology, Paint Technology, Plastic Technology, Leather Technology, Biochemical Engineering, and Oil Technology departments.
Major Fests: Incord (Technical Fest), Adhyayan (Literary Fest), Zenith (Sports Fest), and Spandan/Aagaz (Cultural Fest). Active societies include E-Cell, IEEE Student Branch, and Rotaract Club.`,
  },
  {
    heading: "Official Portals & Attendance Regulations",
    subject: "HBTU Portals",
    content: `HBTU Official Web Portals:
- Official University Website: https://hbtu.ac.in/ (Circulars, tenders, academic notices, syllabus, and faculty directories).
- Student ERP Portal: https://erp.hbtu.ac.in/NewIndex.html (Semester registration, downloadable fee receipts, semester grade cards, and admit cards).
- Live Attendance Portal: https://erp.hbtu.ac.in/StudentAttendance.aspx (Subject-wise & aggregate real-time attendance percentage).
Attendance Rules:
- Minimum 75% attendance is strictly mandatory to appear in Mid-Semester and End-Semester examinations.
- Medical certificates must be submitted timely to the Office of Dean of Academic Affairs.
- Relative grading scale on a 10-point basis: O (10), A+ (9), A (8), B+ (7), B (6), C (5), P (4), F (0).`,
  },
  {
    heading: "Scholarships (UP Scholarship, Buddy4Study, Digi Shakti)",
    subject: "Scholarships",
    content: `State & National Scholarship Schemes:
1. UP Scholarship & Fee Reimbursement: Official portal at https://scholarship.up.gov.in/index.aspx. Engineering and management students apply under "Post-Matric Other Than Inter". Key requirements include Income, Caste, and Domicile certificates, College Fee Receipts, and Aadhaar-seeded bank account. Hard copies must be submitted to the college scholarship section.
2. Buddy4Study Scholarships: https://www.buddy4study.com/scholarships features CSR merit-cum-means awards from corporate partners (Tata, Reliance, Infosys, HDFC, Kotak) ranging from ₹50,000 to ₹2,00,000 per annum, including special STEM initiatives for female students.
3. Digi Shakti Free Tablet/Smartphone Scheme: https://digishakti.up.gov.in/. Student details are uploaded by the university; students only need to complete online eKYC when notified. Distribution is arranged on campus.`,
  },
  {
    heading: "BTech 1st and 2nd Semester Notes (Common to All Branches)",
// [rag-build-step 6/15]: feat(site-ingest): extract HBTU university facts and admissions info