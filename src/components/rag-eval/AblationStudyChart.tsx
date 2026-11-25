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
      <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-emerald-500/40 p-3 rounded-md shadow-xl backdrop-blur-md text-xs space-y-2 z-50 max-w-sm text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-zinc-800 pb-1.5">
          <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">{config?.name || label}</p>
          {config?.isFinal && (
            <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 border border-emerald-500/40">
              Selected Final
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center py-1.5 bg-slate-50 dark:bg-zinc-900/60 rounded-md">
          <div>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">Precision@6</p>
            <p className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{payload[0]?.value?.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">Recall@6</p>
            <p className="font-mono font-bold text-teal-700 dark:text-teal-400">{payload[1]?.value?.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">MRR</p>
            <p className="font-mono font-bold text-amber-700 dark:text-amber-400">{payload[2]?.value?.toFixed(2)}</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-zinc-300 leading-relaxed">
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
    <div className="w-full bg-white/95 dark:bg-[#0e1424] rounded-md p-4 sm:p-5 border border-slate-200/90 dark:border-emerald-500/20 shadow-sm hover:border-emerald-500/40 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-zinc-800/80">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse" />
            Ablation Study: Retrieval Modality & Chunk Granularity (Figure 6.2)
          </h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Empirical validation of Sparse vs. Dense vs. Hybrid RRF chunking (500 vs. 900 vs. 1500 chars).
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-600 dark:bg-emerald-500" />
            <span className="text-slate-700 dark:text-zinc-300 font-medium">Precision@6</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-teal-600 dark:bg-teal-500" />
            <span className="text-slate-700 dark:text-zinc-300 font-medium">Recall@6</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-600 dark:bg-amber-500" />
            <span className="text-slate-700 dark:text-zinc-300 font-medium">MRR</span>
          </div>
        </div>
      </div>

      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: -10, bottom: 25 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tick={{ fill: "#64748b", fontSize: 11 }}
              interval={0}
              angle={-10}
              textAnchor="end"
              height={45}
            />
            <YAxis
              domain={[0.5, 1.0]}
              ticks={[0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
              stroke="#94a3b8"
              tick={{ fill: "#64748b", fontSize: 11 }}
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

      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-zinc-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 gap-2">
        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
          Selected Final Architecture: Hybrid RRF (900 chars / 150 overlap) with k=60
        </span>
        <span className="text-slate-500 dark:text-zinc-400 font-mono">
          Highest harmonic mean of Precision@6 (0.81) and Recall@6 (0.88)
        </span>
      </div>
    </div>
  );
};
