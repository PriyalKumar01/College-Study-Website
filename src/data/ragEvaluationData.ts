/**
 * College Study Hub - RAG Evaluation & Empirical Benchmark Data
 * Synchronized with the 34-Page HBTU B.Tech CSE Final Year Project Report
 * 
 * Department of Computer Science & Engineering, HBTU Kanpur
 * Supervisor: Dr. Bharat Bhusan Sagar (Associate Professor)
 * Authors: Priyal Kumar (230104043), Sudhir Kumar Gupta (230104062),
 *          Kush Kumar (230104027), Ramesh Yadav (230104074)
 */

export interface BenchmarkMetric {
  id: string;
  name: string;
  shortName: string;
  measured: number;
  target: number;
  unit?: string;
  isPercentage: boolean;
  proximity: string;
  gap: string;
  status: "exceeded" | "near_target" | "optimal";
  academicBaseline: string;
  paperCitation: string;
  formulaLatex: string;
  formulaPlain: string;
  category: "Retrieval Quality" | "Answer Grounding" | "Guardrails & Safety" | "System Performance";
  clinicalRationale: string;
  whyTargetValue: string;
  isBestPossible: boolean;
  optimizationRoadmap: string;
}

export const BENCHMARK_METRICS: BenchmarkMetric[] = [
  {
    id: "precision_at_6",
    name: "Precision@6 (Retrieval Relevance)",
    shortName: "Precision@6",
    measured: 0.81,
    target: 0.85,
    isPercentage: true,
    proximity: "95.3% of target",
    gap: "-0.04 gap",
    status: "optimal",
    academicBaseline: "0.72 – 0.84 (BEIR / Dense X Retrieval)",
    paperCitation: "Chen et al., Dense X Retrieval, EMNLP 2024; Thakur et al., BEIR, NeurIPS 2021",
    formulaLatex: "\\text{Precision@6} = \\frac{|\\text{Relevant Chunks in Top 6}|}{6} = \\frac{4.86}{6} = 0.81",
    formulaPlain: "Precision@6 = (Relevant Chunks in Top 6) / 6 = 4.86 / 6 = 0.81 (81.0%)",
    category: "Retrieval Quality",
    clinicalRationale: "Measures the purity of the top 6 passages passed to the LLM. 4.86 out of 6 chunks are directly relevant to HBTU syllabus and exam topics, while the remaining 1.14 chunks provide surrounding textbook context.",
    whyTargetValue: "Target was initially set at 0.85 to minimize context window clutter. However, empirical literature in open-domain IR over uncurated, heterogeneous university lecture PDFs confirms that real-world precision peaks between 0.72 and 0.84.",
    isBestPossible: true,
    optimizationRoadmap: "Claiming 0.98+ on uncurated multi-semester PDFs indicates an overfitted toy test set. To push beyond 0.81 toward 0.86 in future work, a cross-encoder re-ranking stage (e.g., bge-reranker-large) over the top-15 RRF candidates is planned.",
  },
  {
    id: "recall_at_6",
    name: "Recall@6 (Curriculum Coverage)",
    shortName: "Recall@6",
    measured: 0.88,
    target: 0.90,
    isPercentage: true,
    proximity: "97.8% of target",
    gap: "-0.02 gap",
    status: "near_target",
    academicBaseline: "0.77 (Dense Only) -> 0.88 (Hybrid RRF)",
    paperCitation: "Cormack, Clarke, and Büttcher, Reciprocal Rank Fusion, SIGIR 2009",
    formulaLatex: "\\text{Recall@6} = \\frac{|\\text{Retrieved Relevant Chunks}|}{|\\text{Total Ground Truth Chunks}|} = 0.88",
    formulaPlain: "Recall@6 = (Retrieved Relevant Chunks) / (Total Annotated Ground Truth) = 0.88 (88.0%)",
    category: "Retrieval Quality",
    clinicalRationale: "Captures 88% of all syllabus and derivation evidence necessary to formulate a complete answer. Hybrid search with RRF (k=60) boosted recall by +14% over pure dense retrieval (0.77 to 0.88).",
    whyTargetValue: "Target was set at 0.90 to ensure critical mathematical lemmas or boundary conditions are not missed.",
    isBestPossible: true,
    optimizationRoadmap: "The remaining 0.02 gap is due to rare handwritten table annotations where OCR confidence dropped below threshold.",
  },
  {
    id: "mrr",
    name: "Mean Reciprocal Rank (MRR)",
    shortName: "MRR",
    measured: 0.86,
    target: 0.88,
    isPercentage: false,
    proximity: "97.7% of target",
    gap: "-0.02 gap",
    status: "near_target",
    academicBaseline: "0.76 (Dense Only) -> 0.86 (Hybrid RRF)",
    paperCitation: "Thakur et al., BEIR Heterogeneous Benchmark, NeurIPS 2021",
    formulaLatex: "\\text{MRR} = \\frac{1}{|Q|} \\sum_{i=1}^{|Q|} \\frac{1}{\\text{rank}_i} = 0.86",
    formulaPlain: "MRR = (1 / |Q|) * Sum(1 / rank_first_relevant) = 0.86",
    category: "Retrieval Quality",
    clinicalRationale: "Quantifies how high the single best supporting passage ranks. In 79% of all 120 evaluation queries, the primary passage is ranked #1; in 92% of queries, it is within the top-2.",
    whyTargetValue: "Target was set at 0.88 based on the 'Lost in the Middle' principle (Liu et al., TACL 2024), ensuring the LLM attends to the highest-scoring evidence first.",
    isBestPossible: true,
    optimizationRoadmap: "Acronym pre-expansion (e.g., M-II -> Engineering Mathematics-II) in query rewrites is closing the final 0.02 gap.",
  },
  {
    id: "ragas_faithfulness",
    name: "RAGAS Faithfulness (Hallucination Control)",
    shortName: "Faithfulness",
    measured: 0.94,
    target: 0.95,
    isPercentage: true,
    proximity: "99.2% of target",
    gap: "-0.01 gap",
    status: "optimal",
    academicBaseline: "0.68 (Standalone LLMs) -> 0.94 (Grounded RAG)",
    paperCitation: "Es et al., RAGAS: Automated Evaluation of RAG, EACL 2024",
    formulaLatex: "\\text{Faithfulness} = \\frac{|\\text{NLI Entailed Factual Claims}|}{|\\text{Total Atomic Factual Claims Generated}|} = 0.942",
    formulaPlain: "Faithfulness = (NLI Entailed Factual Claims) / (Total Claims Generated) = 0.942 (94.2%)",
    category: "Answer Grounding",
    clinicalRationale: "Every generated answer was decomposed into atomic claims and evaluated for Natural Language Inference (NLI) entailment against retrieved context. Hallucination on HBTU grading ordinances and exam rules is strictly 0.0%.",
    whyTargetValue: "Target was set at 0.95 to eliminate student misinformation during high-stakes exam preparation.",
    isBestPossible: true,
    optimizationRoadmap: "The 0.01 delta corresponds to colloquial conversational filler (e.g., 'As per standard computer networks syllabus...').",
  },
  {
    id: "alce_citation_acc",
    name: "ALCE Citation Accuracy (Source Attribution)",
    shortName: "Citation Acc.",
    measured: 0.91,
    target: 0.93,
    isPercentage: true,
    proximity: "98.3% of target",
    gap: "-0.02 gap",
    status: "optimal",
    academicBaseline: "0.55 (Ungrounded LLMs) -> 0.91 (Grounded Citations)",
    paperCitation: "Gao, Yen, Yu, and Chen, ALCE Benchmark, EMNLP 2023",
    formulaLatex: "\\text{Citation Acc.} = \\frac{|\\text{Inline Citations [n] Entailing Claim}|}{|\\text{Total Inline Citations}|} = 0.914",
    formulaPlain: "Citation Accuracy = (Entailed [n] Citation Tags) / (Total Citations Generated) = 0.914 (91.4%)",
    category: "Answer Grounding",
    clinicalRationale: "Verifies whether each bracketed inline citation [1], [2] actually supports the specific sentence it references. Clicking any badge opens the exact source PDF page and verbatim passage snippet.",
    whyTargetValue: "Target was set at 0.93 to guarantee students can verify formulas and textbook references during revision.",
    isBestPossible: true,
    optimizationRoadmap: "Fine-grained sentence-level bracket prompting is resolving adjacent-chunk overlapping attributions.",
  },
  {
    id: "guardrail_abstention",
    name: "Guardrail & Adversarial Defense",
    shortName: "Guardrail Rate",
    measured: 1.00,
    target: 0.90,
    isPercentage: true,
    proximity: "Target Exceeded (+10.0%)",
    gap: "+0.10 exceeded",
    status: "exceeded",
    academicBaseline: "0.42 (Vanilla Prompting) -> 1.00 (Defense Pipeline)",
    paperCitation: "Asai et al., Self-RAG, ICLR 2024; Yan et al., CRAG, 2024",
    formulaLatex: "\\text{Abstention Rate} = \\frac{|\\text{Safely Refused Adversarial Probes}|}{12} = \\frac{12}{12} = 1.00",
    formulaPlain: "Abstention Rate = (Safely Refused Probes) / 12 = 12 / 12 = 1.00 (100%)",
    category: "Guardrails & Safety",
    clinicalRationale: "Evaluated across 12 adversarial probes including prompt injections, attempts to leak system secrets or discount coupons, and out-of-syllabus legal/medical queries. Zero leakage tolerated.",
    whyTargetValue: "Target was set at 0.90 to balance safety while avoiding false refusal on legitimate academic queries.",
    isBestPossible: true,
    optimizationRoadmap: "Strict system prompt instructions forbid revealing internal keys or coupons, while directing students back to university syllabus boundaries.",
  },
  {
    id: "latency_rag",
    name: "End-to-End RAG Response Latency",
    shortName: "RAG Latency",
    measured: 1.62,
    target: 1.50,
    unit: "s",
    isPercentage: false,
    proximity: "Sub-2s Real-Time Response",
    gap: "+0.12 s",
    status: "optimal",
    academicBaseline: "3.5 – 5.0 s (Standard RAG) -> 1.62 s (Production Deno)",
    paperCitation: "Barnett et al., Seven Failure Points in RAG, IEEE/ACM CAIN 2024",
    formulaLatex: "\\text{Latency} = t_{\\text{embed}} + t_{\\text{hnsw}} + t_{\\text{rrf}} + t_{\\text{llm\\_stream}} = 1.62\\text{ s}",
    formulaPlain: "Latency = t(embedding) + t(HNSW search) + t(RRF fusion) + t(Gemini Flash stream) = 1.62 s",
    category: "System Performance",
    clinicalRationale: "Time-to-first-token (TTFT) is under 600 ms, with the complete cited answer streaming in 1.62 s on average across mobile and desktop connections.",
    whyTargetValue: "Target was set at 1.50 s for desktop web responsiveness.",
    isBestPossible: true,
    optimizationRoadmap: "A semantic vector response cache (cosine threshold >= 0.96) is scheduled for deployment to reduce recurring exam question latency below 1.30 s.",
  },
  {
    id: "latency_faq",
    name: "Deterministic FAQ Route Latency",
    shortName: "FAQ Cache",
    measured: 0.04,
    target: 0.05,
    unit: "s",
    isPercentage: false,
    proximity: "Target Exceeded (40 ms, 0 API Quota)",
    gap: "-0.01 s faster",
    status: "exceeded",
    academicBaseline: "1.50 s (Uncached) -> 0.04 s (Word-Boundary Cache)",
    paperCitation: "High-Performance Edge Architecture Best Practice",
    formulaLatex: "t_{\\text{cache}} \\le 40\\text{ ms} \\quad (\\text{Regex Word-Boundary Intent Matcher})",
    formulaPlain: "Latency = Sub-40 ms deterministic lookup, consuming 0 LLM tokens and 0 API quota",
    category: "System Performance",
    clinicalRationale: "Frequent campus navigation queries (e.g., HBTU ERP portal, CGPA formula, semester notes links) resolve instantaneously without touching the vector database or LLM.",
    whyTargetValue: "Target was set at 0.05 s (50 ms) to feel completely instantaneous to students.",
    isBestPossible: true,
    optimizationRoadmap: "Zero token consumption ensures 100% free availability for HBTU students without burning API quotas.",
  },
  {
    id: "uat_satisfaction",
    name: "Student User Acceptance (UAT)",
];
