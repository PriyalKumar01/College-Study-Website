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
      <div className="bg-zinc-950/95 border border-emerald-500/40 p-3.5 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-1.5 z-50">
        <p className="font-bold text-emerald-400 text-sm">{label}</p>
        <div className="space-y-1 pt-1 border-t border-zinc-800">
          <p className="text-zinc-200 flex justify-between gap-4">
            <span className="text-zinc-400">Measured (120 Queries):</span>
            <span className="font-mono font-bold text-emerald-400">{item.measured.toFixed(2)} ({(item.measured * 100).toFixed(1)}%)</span>
          </p>
          <p className="text-zinc-200 flex justify-between gap-4">
            <span className="text-zinc-400">Target Threshold:</span>
            <span className="font-mono font-bold text-amber-400">{item.target.toFixed(2)} ({(item.target * 100).toFixed(1)}%)</span>
          </p>
          <p className="text-zinc-200 flex justify-between gap-4">
            <span className="text-zinc-400">Industry / Unassisted Baseline:</span>
            <span className="font-mono text-zinc-400">{item.baseline.toFixed(2)}</span>
          </p>
          <p className="text-zinc-200 flex justify-between gap-4">
            <span className="text-zinc-400">Variance to Target:</span>
            <span className={`font-mono font-semibold ${item.measured >= item.target ? "text-emerald-400" : "text-emerald-300"}`}>{diffText}</span>
          </p>
        </div>
      </div>
  return <div className="p-4 bg-zinc-950 text-white">Metrics Chart</div>;
};
