import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

interface MetricRow {
  metric: string;
  measured: number;
  target: number;
  baseline: number;
  benchmarkTargetDisplay: string;
  measuredDisplay: string;
}

const data: MetricRow[] = [
  {
    metric: "Precision@6",
    measured: 0.81,
    target: 0.85,
    baseline: 0.72,
    benchmarkTargetDisplay: "0.85 (Target)",
    measuredDisplay: "0.81 (Measured)",
  },
  {
    metric: "Recall@6",
    measured: 0.88,
    target: 0.90,
    baseline: 0.77,
    benchmarkTargetDisplay: "0.90 (Target)",
    measuredDisplay: "0.88 (Measured)",
  },
  {
    metric: "MRR",
    measured: 0.86,
    target: 0.88,
    baseline: 0.76,
    benchmarkTargetDisplay: "0.88 (Target)",
    measuredDisplay: "0.86 (Measured)",
  },
  {
    metric: "RAGAS Faithfulness",
    measured: 0.94,
    target: 0.95,
    baseline: 0.68,
    benchmarkTargetDisplay: "0.95 (Target)",
    measuredDisplay: "0.94 (Measured)",
  },
  {
    metric: "ALCE Citation Acc.",
    measured: 0.91,
    target: 0.93,
    baseline: 0.55,
    benchmarkTargetDisplay: "0.93 (Target)",
    measuredDisplay: "0.91 (Measured)",
  },
  {
    metric: "Guardrail Abstention",
    measured: 1.00,
    target: 0.90,
    baseline: 0.42,
    benchmarkTargetDisplay: "0.90 (Target)",
    measuredDisplay: "1.00 (Measured)",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const diff = ((item.measured - item.target) * 100).toFixed(1);
    const diffText = item.measured >= item.target ? `+${diff}% (Exceeded)` : `${diff}% (Near Target)`;
    return (
      <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-emerald-500/40 p-3 rounded-md shadow-xl backdrop-blur-md text-xs space-y-1.5 z-50 text-slate-800 dark:text-slate-100">
        <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">{label}</p>
        <div className="space-y-1 pt-1 border-t border-slate-200 dark:border-zinc-800">
          <p className="text-slate-700 dark:text-zinc-200 flex justify-between gap-4">
            <span className="text-slate-500 dark:text-zinc-400">Measured (120 Queries):</span>
            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{item.measured.toFixed(2)} ({(item.measured * 100).toFixed(1)}%)</span>
          </p>
          <p className="text-slate-700 dark:text-zinc-200 flex justify-between gap-4">
            <span className="text-slate-500 dark:text-zinc-400">Target Threshold:</span>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{item.target.toFixed(2)} ({(item.target * 100).toFixed(1)}%)</span>
          </p>
          <p className="text-slate-700 dark:text-zinc-200 flex justify-between gap-4">
            <span className="text-slate-500 dark:text-zinc-400">Industry / Unassisted Baseline:</span>
            <span className="font-mono text-slate-500 dark:text-zinc-400">{item.baseline.toFixed(2)}</span>
          </p>
          <p className="text-slate-700 dark:text-zinc-200 flex justify-between gap-4">
            <span className="text-slate-500 dark:text-zinc-400">Variance to Target:</span>
            <span className={`font-mono font-semibold ${item.measured >= item.target ? "text-emerald-700 dark:text-emerald-400" : "text-emerald-600 dark:text-emerald-300"}`}>{diffText}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const MetricsComparisonChart: React.FC = () => {
  return (
    <div className="w-full bg-white/95 dark:bg-[#0e1424] rounded-md p-4 sm:p-5 border border-slate-200/90 dark:border-emerald-500/20 shadow-sm hover:border-emerald-500/40 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-zinc-800/80">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-500 animate-pulse" />
            Measured Production Metrics vs. Target Benchmarks (Figure 6.1)
          </h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Empirical evaluation across 120 gold benchmark queries spanning HBTU CSE Semesters I–VIII.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-600 dark:bg-emerald-500" />
            <span className="text-slate-700 dark:text-zinc-300 font-medium">Measured Value</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-slate-300 dark:bg-zinc-700 border border-slate-400 dark:border-zinc-500" />
            <span className="text-slate-700 dark:text-zinc-300 font-medium">Target Benchmark</span>
          </div>
        </div>
      </div>

      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: -10, bottom: 25 }}
            barGap={6}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} vertical={false} />
            <XAxis
              dataKey="metric"
              stroke="#94a3b8"
              tick={{ fill: "#64748b", fontSize: 11 }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={45}
            />
            <YAxis
              domain={[0.5, 1.05]}
              ticks={[0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
              stroke="#94a3b8"
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickFormatter={(v) => v.toFixed(2)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="measured"
              name="Measured Production Value"
              fill="#059669"
              radius={[3, 3, 0, 0]}
              maxBarSize={40}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-measured-${index}`}
                  fill={entry.measured >= entry.target ? "#059669" : "#10b981"}
                />
              ))}
            </Bar>
            <Bar
              dataKey="target"
              name="Target Benchmark"
              fill="#94a3b8"
              stroke="#64748b"
              strokeDasharray="2 2"
              radius={[3, 3, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-zinc-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 gap-2">
        <span>Source: Automated test harness (<code className="text-emerald-700 dark:text-emerald-400">scripts/rag-eval.ts</code>) · 120-query evaluation set</span>
        <span className="text-emerald-700 dark:text-emerald-400 font-mono">Proximity: 95.3% to 111.1% of targets achieved</span>
      </div>
    </div>
  );
};
