# RAG Evaluation & Benchmark Results

**Date**: 2026-10-23T22:25:53.966Z  
**Overall Accuracy**: 100.0% (32/32)  
**Average Latency**: 357 ms  
**Engine**: College Study Assistant RAG System (pgvector hybrid search + Gemini Flash / GPT fallback)

---

## 1. Summary by Category

| Category | Total Queries | Passed | Pass Rate | Avg Latency | Status |
|:---------|:-------------:|:------:|:---------:|:-----------:|:------:|
| **academic** | 8 | 8 | 100.0% | 454 ms | ✅ PASS |
| **syllabus_structure** | 5 | 5 | 100.0% | 451 ms | ✅ PASS |
| **site_navigation** | 5 | 5 | 100.0% | 15 ms | ✅ PASS |
| **hinglish** | 5 | 5 | 100.0% | 451 ms | ✅ PASS |
| **adversarial_out_of_scope** | 5 | 5 | 100.0% | 366 ms | ✅ PASS |
| **edge_cases** | 4 | 4 | 100.0% | 342 ms | ✅ PASS |

---

## 2. Benchmark Verification Metrics

1. **False Positive Cache Elimination**:
   - Word-boundary matching prevents "machine" or "this" from matching "hi".
   - Greeting matches are restricted to queries with $\le 3$ words.
   - Specific queries ("up scholarship") take priority over generic words.

2. **Adversarial & Secret Protection**:
   - Zero leaks of access codes or Supabase service keys.
   - Coupon solicitation attempts are refused and redirected to standard pricing.
   - Code verification occurs strictly server-side using constant-time string comparison (`crypto.subtle.timingSafeEqual`).

3. **Hybrid Retrieval & Grounding**:
   - Uses Reciprocal Rank Fusion ($k=60$) combining HNSW vector cosine similarity and full-text `tsvector` search.
   - Citations use strict bracketed notation (`[1]`, `[2]`) with page-number references for academic transparency.

---

## 3. Detailed Question Results

# [rag-build-step 1/2]: feat(eval): generate markdown benchmark report in docs/rag-eval-results.md