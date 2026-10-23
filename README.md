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
# [rag-build-step 1/7]: docs(readme): update README with RAG system architecture overview