import React, { useState } from "react";
import { BookOpen, ExternalLink, Search, Bookmark, Layers, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { VERIFIED_RESEARCH_PAPERS, VerifiedResearchPaper } from "@/data/ragEvaluationData";

export const ResearchReferencesView: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("all");

  const themes = [
    "all",
    "Foundational RAG",
    "Embeddings & Indexing",
    "Hybrid RRF",
    "Chunking & Context",
    "Evaluation & Hallucination",
    "Education RAG",
  ];

  const filteredPapers = VERIFIED_RESEARCH_PAPERS.filter((p) => {
    const matchesSearch =
      search.trim() === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.authors.toLowerCase().includes(search.toLowerCase()) ||
      p.venue.toLowerCase().includes(search.toLowerCase());

    const matchesTheme = selectedTheme === "all" || p.theme === selectedTheme;
    return matchesSearch && matchesTheme;
  });

  return (
    <div className="space-y-5 text-zinc-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-zinc-800">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            36 Peer-Reviewed Research Papers & Theoretical Foundations
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Synthesized across Google Scholar, arXiv, ACM SIGIR, NeurIPS, EMNLP, and EACL to guide our production RAG architecture.
          </p>
        </div>
        <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 font-mono text-xs self-start sm:self-auto">
          Chapter 6 · Verified Bibliography
        </Badge>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search papers by author, title, or conference (e.g., Lewis, BEIR, Cormack, RAGAS)..."
            className="pl-10 bg-zinc-900 border-zinc-700 text-xs text-zinc-100 placeholder:text-zinc-500 h-10"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 shrink-0">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTheme(t)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedTheme === t
                  ? "bg-emerald-500 text-zinc-950 font-bold"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {t === "all" ? "All Papers" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredPapers.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-850 hover:border-emerald-500/40 transition-all space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline" className="border-zinc-700 text-zinc-400 font-mono text-[10px]">
                  [{p.id}] {p.year}
                </Badge>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px]">
                  {p.theme}
                </Badge>
              </div>

              <h4 className="font-bold text-xs sm:text-sm text-zinc-100 leading-snug">
                "{p.title}"
              </h4>

              <p className="text-[11px] text-zinc-400">
                {p.authors}
              </p>

              <p className="text-[11px] font-serif italic text-teal-300/90">
                {p.venue}
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-850 text-[11px] text-zinc-300/90 bg-zinc-900/60 p-2.5 rounded-lg mt-2 space-y-0.5">
              <span className="font-bold text-emerald-400 uppercase text-[9px] block tracking-wider">
                Direct Architectural Impact:
              </span>
              <p className="leading-relaxed">{p.architecturalImpact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
