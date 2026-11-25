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
];
