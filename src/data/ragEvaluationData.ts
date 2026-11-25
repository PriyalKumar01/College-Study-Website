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
export const BENCHMARK_METRICS: BenchmarkMetric[] = [];
