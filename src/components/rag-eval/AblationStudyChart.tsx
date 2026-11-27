// Benchmark: bar chart comparing dense, sparse, and hybrid retrieval MRR
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ABLATION_STUDY_CONFIGS } from "@/data/ragEvaluationData";

const CustomAblationTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const config = ABLATION_STUDY_CONFIGS.find((c) => c.shortName === label);
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-3 rounded-md shadow-xl text-xs space-y-2 z-50 max-w-sm text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-1.5">
          <p className="font-bold text-slate-900 dark:text-emerald-400 text-sm">{config?.name || label}</p>
          {config?.isFinal && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Selected Final
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center py-1.5 bg-[#f8fafc] dark:bg-slate-900/60 rounded">
          <div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Precision@6</p>
            <p className="font-mono font-bold text-slate-900 dark:text-emerald-400">{payload[0]?.value?.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Recall@6</p>
            <p className="font-mono font-bold text-slate-900 dark:text-teal-400">{payload[1]?.value?.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">MRR</p>
            <p className="font-mono font-bold text-slate-900 dark:text-amber-400">{payload[2]?.value?.toFixed(2)}</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
          {config?.empiricalFinding}
        </p>
      </div>
    );
  }
  return null;
};

export const AblationStudyChart: React.FC = () => {
  const chartData = ABLATION_STUDY_CONFIGS.map((c) => ({
    name: c.shortName,
    fullName: c.name,
    "Precision@6": c.precision,
    "Recall@6": c.recall,
    "MRR": c.mrr,
    isFinal: c.isFinal,
  }));

  return (
    <div className="w-full bg-white dark:bg-[#0f172a] rounded-lg p-4 sm:p-5 border border-slate-300 dark:border-slate-800 shadow-sm hover:border-emerald-500 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse" />
            Ablation Study: Retrieval Modality & Chunks (Figure 6.2)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Empirical validation of Sparse vs. Dense vs. Hybrid RRF chunking (500 vs. 900 vs. 1500 chars).
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-600 dark:bg-emerald-500" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">Precision@6</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-teal-600 dark:bg-teal-500" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">Recall@6</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-600 dark:bg-amber-500" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">MRR</span>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 15, right: 15, left: -15, bottom: 25 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              tick={{ fill: "#475569", fontSize: 11 }}
              interval={0}
              angle={-10}
              textAnchor="end"
              height={40}
            />
            <YAxis
              domain={[0.5, 1.0]}
              ticks={[0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
              stroke="#64748b"
              tick={{ fill: "#475569", fontSize: 11 }}
              tickFormatter={(v) => v.toFixed(2)}
            />
            <Tooltip content={<CustomAblationTooltip />} />
            <Bar
              dataKey="Precision@6"
              fill="#059669"
              radius={[3, 3, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="Recall@6"
              fill="#0d9488"
              radius={[3, 3, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="MRR"
              fill="#d97706"
              radius={[3, 3, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2">
        <span className="text-slate-800 dark:text-emerald-400 font-semibold">
          Selected Final Architecture: Hybrid RRF (900 chars / 150 overlap) with k=60
        </span>
        <span className="text-slate-500 dark:text-slate-400 font-mono">
          Highest harmonic mean of Precision@6 (0.81) and Recall@6 (0.88)
        </span>
      </div>
    </div>
  );
};
