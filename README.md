# College Study — Your Study Hub 🗂️📝

<div align="center">
  <img src="public/CollegeStudy-Homepageview.png" alt="College Study Web Banner" width="100%" />
  
  <br />
  
  ## 🌐 [Live Website : College Study](https://college-study.netlify.app/)
  <p><strong>A Premium Full-Stack Academic & Career Platform for HBTU Kanpur Students</strong></p>

  <br/>

  [![Live Website](https://img.shields.io/badge/🌐_Live_Demo-college--study.netlify.app-1E90FF?style=for-the-badge&logo=google-chrome&logoColor=white)](https://college-study.netlify.app/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Supabase pgvector](https://img.shields.io/badge/Supabase-pgvector-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![Google Gemini](https://img.shields.io/badge/Gemini-3.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
  [![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

</div>

---

## 🚀 Overview

**College Study Hub** is a production-grade, full-stack academic ecosystem engineered specifically for students of **Harcourt Butler Technical University (HBTU Kanpur)**. Serving over 2,500 active students, the platform acts as a unified digital hub for engineering lecture notes, past-year question papers (PYQs), career roadmaps, real-time scholarship listings, campus placement prep, GATE preparation, and verified HR contacts.

The platform features **College Study Assistant**, an enterprise-level **Retrieval-Augmented Generation (RAG)** system built on **Supabase pgvector (HNSW)**, **Google Gemini 3.5 Flash**, and automatic **OpenAI GPT-4o-mini fallback**, delivering grounded academic explanations with inline source citations (`[1]`, `[2]`).

Built as an installable **Progressive Web App (PWA)**, College Study Hub functions seamlessly across mobile and desktop environments, strictly secured with **PostgreSQL Row Level Security (RLS)**, **Role-Based Access Control (RBAC)**, server-side secret management, and **Razorpay** payment processing.

---

## 🧠 College Study Assistant (RAG Architecture)

The **College Study Assistant** provides students with instant, grounded answers from official syllabus documents, semester notes, and university circulars. It eliminates AI hallucinations by retrieving factual context vectors from PostgreSQL before synthesizing answers in clear, professional English.

```mermaid
flowchart TD
    subgraph Client ["Client UI (React 18 + Shadcn)"]
        UserQuery["Student Query / Document Upload"] --> ClientCache{"Fuzzy Cache Match?"}
        ClientCache -- Hit --> InstantCache["Instant Quota-Free Response"]
        ClientCache -- Miss --> AccessCheck{"Session Token Valid or Code Verified?"}
        AccessCheck --> EdgeCall["Invoke Supabase Edge Function: rag-chat"]
    end

    subgraph Serverless ["Supabase Edge Runtime (Deno)"]
        EdgeCall --> RateLimit{"Server Daily Rate Limit (<= 10 queries)"}
        RateLimit -- Exceeded --> 429["Return HTTP 429 Rate Limit"]
        RateLimit -- Allowed --> EmbedQuery["Vectorize Query (gemini-embedding-001, 768-dim)"]
        
        EmbedQuery --> HybridSearch["Call PostgreSQL RPC: rag_hybrid_search"]
        
        subgraph StorageEngine ["Supabase PostgreSQL + pgvector"]
            HybridSearch --> VectorSim["Vector Cosine Distance (HNSW Index)"]
            HybridSearch --> FTS["Full-Text Keyword Search (English tsvector)"]
            VectorSim & FTS --> RRF["Reciprocal Rank Fusion (RRF Scoring)"]
            RRF --> TopChunks[("Top 6 Relevant Academic Chunks")]
        end

        TopChunks --> GroundedPrompt["Assemble Grounded Prompt + Numbered Sources"]
        
        subgraph DualLLM ["Dual-LLM Failover Engine"]
            GroundedPrompt --> PrimaryLLM["Primary: Google Gemini 3.5 Flash"]
            PrimaryLLM -- Success (200 OK) --> ResponseFormat["Format Inline Citations [1], [2]"]
            PrimaryLLM -- Fail (Timeout / 429 / 5xx) --> FallbackLLM["Fallback: OpenAI GPT-4o-mini"]
            FallbackLLM --> ResponseFormat
        end
        
        ResponseFormat --> Telemetry["Log Query & Latency (ai_query_logs)"]
        Telemetry --> JSONResponse["Return Grounded JSON Response"]
    end

    JSONResponse --> RenderChat["Render Message with Clickable Citations & Sheet Drawer"]
```

### 🔬 Core Components of the RAG Engine

1. **Document Ingestion Pipeline (`rag-ingest`)**:
   - Multi-format ingestion supporting **PDF**, **DOCX**, **PPTX**, **TXT**, and **MD** (up to 25 MB).
   - Page-by-page extraction preserving structural headers, tables, and page boundaries.
   - **Gemini Multimodal OCR Fallback**: Scanned or handwritten pages with sparse text are automatically transcribed via Gemini Vision OCR (`metadata.ocr = true`).
   - **Semantic Chunking**: 800–1000 characters (~200–250 tokens) with 150-character overlap, splitting strictly on paragraph and heading boundaries.
   - **Batch Embedding**: Vectorized via `gemini-embedding-001` (768 dimensions) with exponential backoff and rate-limit retry logic.

2. **Vector Store & Hybrid Retrieval (`rag_hybrid_search`)**:
   - Vector indexing powered by **pgvector** using **Hierarchical Navigable Small World (HNSW)** cosine distance indexes (`m=16`, `ef_construction=64`).
   - Hybrid retrieval combines dense semantic vector search with sparse full-text lexical search (`websearch_to_tsquery`) through **Reciprocal Rank Fusion (RRF)**:
     $$\text{RRF Score} = \frac{1}{60 + \text{Rank}_{\text{dense}}} + \frac{1}{60 + \text{Rank}_{\text{sparse}}}$$
   - Granular filtering by branch, semester, and course subject.

3. **Grounding & Source Citation**:
   - Context is injected as numbered blocks (`[1]`, `[2]`).
   - Every claim is tied to an inline citation tag.
   - Students can click any citation pill to view the source title, page range, similarity score, and raw text preview.

4. **Dual-LLM Failover Architecture**:
   - **Primary Model**: Google Gemini 3.5 Flash (sub-second TTFT, generous context window).
   - **Fallback Model**: OpenAI GPT-4o-mini, triggered automatically if Gemini encounters network timeouts, 429 rate limits, or service outages.

5. **Quota-Free Server-Side Cached Response Layer**:
   - Scored keyword and word-boundary matching for common university queries (e.g., ERP links, attendance regulations, scholarship procedures, notes contribution).
   - High-confidence matches return instantly without consuming LLM API quota or user daily query limits.

6. **Admin Knowledge Base Dashboard (`/admin/knowledge-base`)**:
   - Drag-and-drop batch document upload into private Supabase Storage (`rag-documents`).
   - Live document processing status (Pending, Processing, Ready, Failed), page counts, and chunk totals.
   - Built-in **Retrieval Testing Console** to test queries and inspect top-scoring vectors and similarity weights in real time.

7. **One-Off Chat File Analysis (`rag-extract`)**:
   - Any student can attach a document directly in the chat interface.
   - Text is extracted transiently in memory for immediate question-answering without permanently saving the file to the shared knowledge base.

---

## ✨ Key Features & Platform Modules

### 📚 Academic Notes Repository
- **B.Tech 11 Branches (Semesters 1 to 8)**: Computer Science & Engineering (CSE), Information Technology (IT), Electronics Engineering (ET), Electrical Engineering (EE), Mechanical Engineering (ME), Civil Engineering (CE), Chemical Engineering (CHE), Biochemical Engineering (BE), Food Technology (FT), Oil Technology (OT), Paint Technology (PT), Plastic Technology (PL), and Leather Technology (LFT).
- **Other Programs**: Complete curriculum materials for BS-MS Integrated, BBA, and MBA.
- **Dedicated Foundations**: Curated modules for Data Structures & Algorithms (DSA), Modern Web Development, and Competitive Programming.

### 💻 In-Browser Coding Space & Online Compiler
- Integrated online code execution playground supporting **C**, **C++**, **Java**, **Python**, and **JavaScript**.
- Real-time syntax highlighting, custom test case input, and execution output console.

### 🎓 GATE Study Hub & Practice Arena
- Subject-wise GATE syllabus roadmaps, previous year question analyses, and core engineering modules.
- **Interactive GATE Quiz**: Free, branch-wise, and year-wise practice quiz engine with real-time scoring.

### 📄 AI ATS-Friendly Resume Builder & Scorer
- Industry-tested, single-column LaTeX/Overleaf resume templates engineered for high Applicant Tracking System (ATS) parsing rates.
- **Multimodal AI ATS Scorer**: Upload a resume PDF alongside a target Job Description to receive a 0–100 compatibility rating, missing technical keywords, and impact-driven bullet point recommendations.

### 📊 Academic Utility Suite
- **HBTU CGPA & SGPA Calculator**: Fully calibrated to HBTU Kanpur's 10-point relative grading scale ($O=10, A^+=9, A=8, B^+=7, B=6, C=5, P=4, F=0$).
- Real-time grade forecasting and semester-wise credit-weighted SGPA calculation.

### 💼 Career Opportunities & Scholarships Portal
- **Opportunities Board**: Actively updated off-campus hiring drives, tech internships, hackathons, and national coding competitions.
- **Scholarships Directory**: Comprehensive tracking for UP Post-Matric Fee Reimbursement, Buddy4Study corporate grants, and private CSR scholarships with deadline notifications.

### 🏆 Gamified Contributor Hall of Fame
- Peer-driven contribution mechanism: students submit verified notes to earn **StudyCoins**.
- Dynamic leaderboard showcasing top student contributors with Gold, Silver, and Bronze community badges.

### 💎 Premium Services & Verified HR Directory
- **2,500+ Verified HR Emails**: Direct recruiter contacts and talent acquisition email addresses for top tech enterprises.
- **Fresher Career Roadmaps**: Domain-specific interview prep guides (SDE, Data Science, DevOps, Cloud).
- **Payment Processing**: Integrated with Razorpay for secure Indian payments (UPI, Cards, NetBanking) with automated student coupon validation.

---

## 🗄️ Database Architecture & Schema

All tables reside within Supabase PostgreSQL, protected by **Row Level Security (RLS)** policies ensuring zero unauthorized reads or writes.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            SUPABASE POSTGRESQL                              │
├──────────────────────────────────────────┬──────────────────────────────────┤
│ Core Platform Tables                     │ RAG & AI Vector Tables           │
├──────────────────────────────────────────┼──────────────────────────────────┤
│ • profiles (user info, branch, coins)    │ • rag_documents (source docs)    │
│ • admin_roles (owner / admin / member)   │ • rag_chunks (embeddings, HNSW)  │
│ • premium_purchases (Razorpay orders)    │ • ai_sessions (hashed tokens)    │
│ • coupon_codes (premium discounts)       │ • ai_usage (daily rate limits)   │
│ • opportunities (jobs, internships)      │ • ai_query_logs (telemetry)      │
│ • scholarships (deadlines, URLs)         │ • study_materials (notes review) │
│ • contributors (gamified leaderboard)    │ • email_campaigns & logs         │
└──────────────────────────────────────────┴──────────────────────────────────┘
```

### Table Definitions

| Table | Purpose | Security / Access |
|---|---|---|
| `rag_documents` | Metadata for ingested files (PDF, DOCX, PPTX, TXT) | Public read (ready only), Admin write |
| `rag_chunks` | Text chunks, page metadata, and 768-dim vector embeddings | Service Role only (accessed via Edge Functions) |
| `ai_sessions` | SHA-256 hashed session tokens with 30-day expiration | Service Role only |
| `ai_usage` | Per-user daily query tracking (enforcing 10 queries/day) | Service Role only |
| `ai_query_logs` | Query telemetry, retrieved chunk IDs, models used, latency | Service Role only |
| `profiles` | Student branch, batch, StudyCoins, avatar, and academic info | Users read all, update own |
| `admin_roles` | Granular 3-tier RBAC (`member`, `admin`, `owner`) | Authenticated read, Owner write |
| `premium_purchases`| Payment records, Razorpay order IDs, and active tiers | User read own, Service Role write |
| `coupon_codes` | Discount codes for premium purchases (e.g., `HBTU@1843`) | Admin/Owner manage |
| `opportunities` | Curated listings for jobs, internships, and hackathons | Public read, Admin manage |
| `scholarships` | State and national scholarship schemes and deadlines | Public read, Admin manage |
| `contributors` | Gamified leaderboard entries, coin totals, and badges | Public read, Admin manage |

---

## ⚡ Supabase Edge Functions Suite

Built on the **Deno** runtime and deployed globally on Supabase Edge Network:

| Function Name | Description | Invocation |
|---|---|---|
| `rag-chat` | Core RAG chat endpoint: access verification, cached lookup, query vectorization, pgvector hybrid retrieval, and dual-LLM generation | Authenticated / Client |
| `rag-ingest` | Multi-file document ingestion, text sanitization, chunking, OCR fallback, and batch vector embedding | Admin JWT only |
| `rag-extract` | Ephemeral document parser for client-side chat attachments | Authenticated / Client |
| `rag-ingest-site-knowledge` | Syncs curriculum routes, site knowledge base, and official portal URLs into the vector store | Admin / Service Role |
| `ai-unlock` | Validates server-side access code against secret and issues SHA-256 hashed session tokens | Public / Client |
| `ai-assistant` | Legacy assistant endpoint & ATS Multimodal Resume Scorer | Authenticated / Client |
| `send-otp-email` | Generates and sends passwordless email login OTPs via Brevo API | Public Auth |
| `send-campaign-emails` | Dispatches bulk email announcements to registered university students | Admin / Owner only |
| `update-blocked-domains` | Automated maintenance function filtering spam and disposable email domains | Cron / Service Role |

---

## 🏗️ Platform System Architecture

College Study Hub is built on a resilient, micro-service-inspired serverless architecture designed for zero downtime, strict egress optimization, and rapid client-side rendering.

```mermaid
flowchart TD
    subgraph ClientLayer ["Client Layer (Progressive Web App)"]
        UI["React 18 + TypeScript + Tailwind CSS"]
        Router["React Router DOM (Code-Split Lazy Pages)"]
        AuthCtx["AuthContext (JWT Session + Role Hierarchy)"]
        PWA["Service Worker (Workbox Offline Cache 300+ Assets)"]
    end

    subgraph CDNAndAPIs ["External CDNs & Upstream APIs"]
        Netlify["Netlify Edge CDN (Hosting & Headers)"]
        CF_API["Codeforces Official REST API"]
        GDocs["Google Docs Viewer (Offloaded PDF Delivery)"]
        Brevo["Brevo Transactional SMTP Engine"]
        Razorpay["Razorpay Payment Gateway"]
    end

    subgraph SupabaseServices ["Supabase BaaS Infrastructure"]
        AuthService["Supabase Auth (GoTrue - OAuth & Email OTP)"]
        EdgeFunctions["Edge Functions (Deno Serverless Runtime)"]
        
        subgraph PostgresEngine ["PostgreSQL 15 Database"]
            RLS["Row Level Security (Tenant Data Isolation)"]
            PGVector["pgvector (HNSW Index for Semantic Search)"]
            Triggers["Lifecycle Triggers (User Creation & Cascade Purge)"]
            Tables[("profiles, note_downloads, premium_purchases, rag_chunks")]
        end
        
        Storage["Supabase Storage (Community Uploads)"]
    end

    UI --> Router
    Router --> AuthCtx
    UI --> PWA
    Netlify --> UI

    UI -->|"Live Contest Sync"| CF_API
    UI -->|"Zero-Egress PDF Preview"| GDocs
    AuthCtx -->|"Auth State & Token Refresh"| AuthService
    UI -->|"Vector RAG Chat / ATS Scorer"| EdgeFunctions
    UI -->|"Transactional Queries & RPCs"| RLS
    RLS --> Tables
    Triggers --> Tables
    EdgeFunctions -->|"Vector Distance & RRF"| PGVector
    EdgeFunctions --> Brevo
    UI -->|"Order Verification"| Razorpay
```

---

## 📅 Coding Calendar & Contest Synchronization Engine

The **Coding Calendar** (`/coding-calendar`) is a centralized competitive programming dashboard aggregating active and upcoming coding contests across 5 premier global platforms: **Codeforces**, **LeetCode**, **CodeChef**, **AtCoder**, and **Code360 (Coding Ninjas / Naukri)**.

### 1. Hybrid Ingestion Pipeline (Live API + Mathematical Determinism)
- **Live Codeforces Synchronization**:
  - Live contests are queried directly from the official Codeforces API endpoint:
    `https://codeforces.com/api/contest.list?gym=false`
  - Contests falling within a sliding window of **past 30 days to next 35 days** are dynamically normalized into standardized `ContestEvent` objects.
  - **12-Hour Stale-While-Revalidate Client Caching**: API responses are cached in `localStorage` under `csh_codeforces_contests` with epoch timestamps to prevent hitting Codeforces rate limits while guaranteeing lightning-fast tab switches.
- **Mathematical Recurrence Formula Engine**:
  - Platforms with fixed weekly/biweekly schedules (LeetCode, CodeChef, AtCoder, Code360) are calculated on-the-fly using mathematical epoch anchors without requiring brittle web scraping:
    - **LeetCode Weekly Contest**: Every Sunday 08:00 AM – 09:30 AM IST. Calculated from anchor `2024-06-02` (Contest #400) + $\Delta\text{weeks}$.
    - **LeetCode Biweekly Contest**: Alternate Saturdays 08:00 PM – 09:30 PM IST. Calculated from anchor `2024-05-11` (Contest #130) + $\lfloor\Delta\text{weeks} / 2\rfloor$.
    - **CodeChef Starters**: Every Wednesday 08:00 PM – 10:00 PM IST. Calculated from anchor `2024-05-29` (Starters #136) + $\Delta\text{weeks}$.
    - **AtCoder Beginner Contest (ABC)**: Every Saturday 05:30 PM – 07:10 PM IST. Calculated from anchor `2024-06-01` (ABC #356) + $\Delta\text{weeks}$.
    - **Code360 Weekly Contest**: Every Thursday 08:31 PM – 10:01 PM IST. Calculated from anchor `2026-10-22` (Contest #254) + $\Delta\text{weeks}$.
- **Deduplication Engine**:
  - All contests are funneled through `deduplicateContests()` to guarantee that overlapping live rounds and generated slots merge into unique chronological items with accurate URLs.

### 2. Embedded Preparation Ecosystem
- **Curated DSA Sheets Hub**: Direct progress tracking for **Striver's SDE Sheet**, **Love Babbar 450**, **NeetCode 150**, **Fraz SDE Sheet**, and **Blind 75**.
- **Company Interview Preparation Kits**: System design, core subject cheat sheets, and interview experiences for **Google, Microsoft, Amazon, Adobe, and Flipkart**.
- **Starred GitHub Repositories**: Fast navigation to high-impact open-source computer science resources.

---

## 🛡️ Bandwidth Protection & PDF Rate-Limiting Engine

To allow **100% free lifetime access** without exceeding Supabase monthly egress limits or crashing server bandwidth during peak examination weeks, College Study Hub implements a multi-tiered PDF delivery architecture:

1. **Google Drive Proxying & Strict Rate Limiting** (`src/lib/downloadLimits.ts`):
   - Direct Google Drive downloads enforce student quotas: **5 PDFs per day** and **20 PDFs per month**.
   - Quotas are logged in `note_downloads` table with UTC date boundaries.
   - When a student reaches the quota, they are politely directed to read online in their browser.
2. **Google Docs Viewer CDN Offloading** (`src/lib/downloadUtils.ts`):
   - For all community-uploaded and server-hosted notes, direct blob fetching is intercepted and opened via Google Docs Viewer:
     `https://docs.google.com/viewer?url={encodedUrl}`
   - Google's worldwide edge CDN downloads and renders the PDF bytes, completely eliminating Supabase storage egress.
3. **Owner Exemption Protocol**:
   - The platform Owner (`priyalkumar06@gmail.com` or users with `role: 'owner'` / `'super_admin'`) is automatically exempted from all download limits and preview restrictions, enabling unrestricted content audits.

---

## 🔄 Account Lifecycle & Automated Cascade Cleanup

During rapid staging and student testing, accounts are frequently created and removed from the Supabase Authentication dashboard. To prevent orphan profile records or stale data from corrupting new test signups:

- **`BEFORE DELETE ON auth.users` Database Trigger** (`handle_user_delete`):
  - When an account is removed from Supabase `auth.users`, a `SECURITY DEFINER` trigger immediately executes and purges all associated records:
    - `public.profiles` (by `user_id`, `id`, and lowercase `email`)
    - `public.note_downloads` (by `user_id` and `user_email`)
    - `public.premium_purchases` (test access grants)
    - `public.signup_attempts`
    - `public.issue_reports`
    - `public.opportunity_bookmarks`
  - Prevents foreign key constraint errors (`violates foreign key constraint`) when deleting users in the Supabase Dashboard.
  - Ensures that re-registering with the same test email provides a 100% clean, pristine onboarding experience.

---

---

## 🛠️ Tech Stack & Key Libraries

<div align="center">

| Layer | Technologies & Libraries |
|---|---|
| **Frontend Core** | React 18, TypeScript 5, Vite 5 (SWC), React Router DOM v6 |
| **Styling & Design** | Tailwind CSS v3, Shadcn UI, Radix UI Primitives, Lucide Icons |
| **State & Data Fetching** | TanStack React Query v5, Context API, LocalStorage persistence |
| **Animations** | Framer Motion v12 |
| **Vector Database** | Supabase PostgreSQL with `pgvector` extension (HNSW indexing) |
| **AI & Embeddings** | Google Gemini 3.5 Flash, Gemini Embedding-001 (768 dims), OpenAI GPT-4o-mini |
| **Backend & Serverless** | Supabase Edge Functions (Deno runtime), PostgreSQL RLS, PL/pgSQL RPCs |
| **Payments & Auth** | Razorpay Indian Gateway, Supabase Auth (Email OTP + Google OAuth) |
| **Hosting & PWA** | Netlify Global CDN, `vite-plugin-pwa` (Workbox Service Worker) |

</div>

---

## 🔐 Security, Privacy & Confidentiality Protocols

1. **Zero Client Secrets**:
   - Neither Gemini nor OpenAI API keys are exposed to client-side bundles.
   - All AI interactions proxy through Supabase Edge Functions where secrets are injected via encrypted environment variables.
2. **Access Gatekeeper Protocol**:
   - Access to the AI Assistant is guarded by server-side verification (`ai-unlock`).
   - Successful unlocks receive a cryptographic SHA-256 session token stored in PostgreSQL (`ai_sessions`) with expiration controls.
3. **Strict Confidentiality Enforcement**:
   - Built-in prompt guardrails strictly prevent disclosing discount coupons, access codes, or private system keys under any prompt injection attempt.
4. **PostgreSQL Row Level Security (RLS)**:
   - Vector chunks (`rag_chunks`) and document binaries are accessible strictly by the Supabase Service Role.
   - User profile and purchase records are isolated per authenticated user ID (`auth.uid() = id`).

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **Supabase CLI**: `npm install -g supabase`

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/PriyalKumar01/studyhub-unlocked-nexus.git
cd studyhub-unlocked-nexus
npm install
```

### 2. Environment Configuration
Create a `.env` file in the project root (refer to `.env.example`):
```env
# Client-Side Public Variables (Vite)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_BREVO_API_KEY=your-brevo-api-key
```

### 3. Supabase Edge Function Secrets
Set your server-side API keys in your Supabase project (never commit these to git):
```bash
# Login to Supabase CLI
npx supabase login

# Set Secrets
npx supabase secrets set GEMINI_API_KEY="your-gemini-api-key" --project-ref your-project-ref
npx supabase secrets set OPENAI_API_KEY="your-openai-api-key" --project-ref your-project-ref
npx supabase secrets set AI_ACCESS_CODE="your-custom-access-code" --project-ref your-project-ref
```

### 4. Database Migrations & Edge Functions Deployment
```bash
# Apply RAG database migration (pgvector, tables, RLS, hybrid search RPC)
npx supabase db push

# Deploy all Edge Functions
npx supabase functions deploy --project-ref your-project-ref
```

### 5. Run Local Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:8080`.

### 6. Verify Production Build & RAG Test Suite
```bash
# Type-check TypeScript codebase
npx tsc --noEmit

# Run 32-case automated RAG Evaluation Suite
npx tsx scripts/rag-eval.ts

# Build production bundle
npm run build
```

---

## 📊 RAG Benchmark & Evaluation Suite

The repository includes an automated evaluation suite (`scripts/rag-eval.ts`) testing 32 benchmark scenarios across 6 core categories:

| Evaluation Category | Test Objective | Benchmark Target | Result |
|---|---|---|---|
| **Cache Protection** | Verifies keyword scoring prevents false-positive substrings | 100% precision | ✅ Passed |
| **Syllabus & Routes** | Validates correct curriculum route matching for all 11 branches | Exact link check | ✅ Passed |
| **Academic Concepts** | Assesses accuracy of theoretical answers (e.g., OS, DBMS, DSA) | Grounded explanation | ✅ Passed |
| **Citation Grounding** | Checks that retrieved claims contain valid inline `[1]`, `[2]` tags | Syntax verification | ✅ Passed |
| **Prompt Injection Defense** | Verifies zero leakage of coupon codes, access codes, or secrets | 0 leaks tolerated | ✅ Passed |
| **Latency Benchmark** | Ensures query vectorization and generation return within limits | Sub-4s target | ✅ Passed |

---

## 📸 Platform Gallery

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="public/CollegeStudy-Homepageview.png" alt="Home Page" width="400"/>
        <br />
        <em>College Study Hub — Home Page</em>
      </td>
      <td align="center">
        <img src="public/AllYouNeedtoSucceed.png" alt="Resources" width="400"/>
        <br />
        <em>Academic Resources & Subject Modules</em>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="public/CollegeStudy UserProfile.png" alt="User Profile" width="400"/>
        <br />
        <em>User Profile, Academic Branch & StudyCoins</em>
      </td>
      <td align="center">
        <img src="public/CollegeStudy_TopContributor.png" alt="Top Contributors" width="400"/>
        <br />
        <em>Gamified Contributor Hall of Fame</em>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="public/CollegeStudy-academicAchieversPage.png" alt="Achievers" width="400"/>
        <br />
        <em>HBTU Academic Achievers & Placements</em>
      </td>
      <td align="center">
        <img src="public/collegeStudyAboutpage.png" alt="About Page" width="400"/>
        <br />
        <em>About the Platform & Mission</em>
      </td>
    </tr>
  </table>
</div>

---

## 👨‍💻 Founder & Maintainer

<div align="center">
  <h3>Priyal Kumar</h3>
  <p><strong>Founder & Lead Engineer — College Study Hub</strong></p>
  <p>Final Year B.Tech Computer Science & Engineering • HBTU Kanpur</p>
  
  <br/>

  <a href="https://github.com/PriyalKumar01" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
  <a href="https://linkedin.com/in/priyal-kumar-374282324" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
  <a href="https://wa.me/918957221543" target="_blank">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp"/>
  </a>
</div>

---

<div align="center">
  <p><em>© 2026 College Study Hub. All rights reserved.</em></p>
  <p>Crafted with ❤️ for the student community of Harcourt Butler Technical University (HBTU Kanpur).</p>
</div>
