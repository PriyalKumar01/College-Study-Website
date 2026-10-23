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
# [rag-build-step 2/7]: docs(readme): update README with Gemini 3.5 Flash and GPT-4o-mini details