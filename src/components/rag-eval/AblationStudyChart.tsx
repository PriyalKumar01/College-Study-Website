import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";
import { ABLATION_STUDY_CONFIGS } from "@/data/ragEvaluationData";

const CustomAblationTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const config = ABLATION_STUDY_CONFIGS.find((c) => c.shortName === label);
    return (
      <div className="bg-zinc-950/95 border border-emerald-500/40 p-3.5 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-2 z-50 max-w-sm">
        <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-1.5">
          <p className="font-bold text-emerald-400 text-sm">{config?.name || label}</p>
          {config?.isFinal && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              Final Choice
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center py-1 bg-zinc-900/60 rounded-lg">
          <div>
            <p className="text-[10px] text-zinc-400">Precision@6</p>
            <p className="font-mono font-bold text-emerald-400">{payload[0]?.value?.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-400">Recall@6</p>
            <p className="font-mono font-bold text-teal-400">{payload[1]?.value?.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-400">MRR</p>
            <p className="font-mono font-bold text-amber-400">{payload[2]?.value?.toFixed(2)}</p>
          </div>
        </div>
        <p className="text-[11px] text-zinc-300 leading-relaxed">
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
    <div className="w-full bg-zinc-950/80 rounded-2xl p-4 sm:p-6 border border-emerald-500/20 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-zinc-800/80">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            Ablation Study: Retrieval Modality & Chunk Granularity (Figure 6.2)
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Empirical validation of Sparse vs. Dense vs. Hybrid RRF chunking (500 vs. 900 vs. 1500 chars).
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-zinc-300 font-medium">Precision@6</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-teal-500" />
            <span className="text-zinc-300 font-medium">Recall@6</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500" />
            <span className="text-zinc-300 font-medium">MRR</span>
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
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#a1a1aa"
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
              interval={0}
              angle={-10}
              textAnchor="end"
              height={45}
            />
            <YAxis
              domain={[0.5, 1.0]}
              ticks={[0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
              stroke="#a1a1aa"
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
              tickFormatter={(v) => v.toFixed(2)}
            />
            <Tooltip content={<CustomAblationTooltip />} />
            <Bar
              dataKey="Precision@6"
              fill="#10b981"
              radius={[3, 3, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="Recall@6"
              fill="#14b8a6"
              radius={[3, 3, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="MRR"
              fill="#f59e0b"
              radius={[3, 3, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-[11px] text-zinc-400 gap-2">
        <span className="text-emerald-400 font-semibold">
          Selected Final Architecture: Hybrid RRF (900 chars / 150 overlap) with k=60
        </span>
        <span className="text-zinc-400 font-mono">
          Highest harmonic mean of Precision@6 (0.81) and Recall@6 (0.88)
        </span>
      </div>
    </div>
  );
};
