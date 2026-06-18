import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Globe, Terminal, Laptop, Video, Music, FileText, Award,
  Shield, Compass, Image, Users, Brain, Search, ChevronDown, ChevronUp,
  ArrowUpRight, ArrowLeft, ArrowRight, Check, Sparkles, HelpCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AI_CATEGORIES_DATA } from '@/data/aiToolsData';

export default function UsefulAITools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'coding-dev': true, // Keep first one open by default
  });

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'coding-dev': return <Code className="w-4.5 h-4.5 text-indigo-500" />;
      case 'web-builders': return <Globe className="w-4.5 h-4.5 text-indigo-500" />;
      case 'ml-data-science': return <Terminal className="w-4.5 h-4.5 text-indigo-500" />;
      case 'presentations-docs': return <Laptop className="w-4.5 h-4.5 text-indigo-500" />;
      case 'video-creation': return <Video className="w-4.5 h-4.5 text-indigo-500" />;
      case 'audio-voice': return <Music className="w-4.5 h-4.5 text-indigo-500" />;
      case 'docs-formatters': return <FileText className="w-4.5 h-4.5 text-indigo-500" />;
      case 'careers-resumes': return <Award className="w-4.5 h-4.5 text-indigo-500" />;
      case 'writing-seo': return <FileText className="w-4.5 h-4.5 text-indigo-500" />;
      case 'ai-detection': return <Shield className="w-4.5 h-4.5 text-indigo-500" />;
      case 'diagrams-drawing': return <Compass className="w-4.5 h-4.5 text-indigo-500" />;
      case 'images-editing': return <Image className="w-4.5 h-4.5 text-indigo-500" />;
      case 'linkedin-growth': return <Users className="w-4.5 h-4.5 text-indigo-500" />;
      case 'ai-agents': return <Brain className="w-4.5 h-4.5 text-indigo-500" />;
      default: return <Brain className="w-4.5 h-4.5 text-indigo-500" />;
    }
  };

  // Filter tools based on search term
  const searchFilteredResults = AI_CATEGORIES_DATA.reduce((acc, category) => {
    const matchedTools = category.tools.filter(tool => 
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchedTools.length > 0) {
      acc.push({
        ...category,
        tools: matchedTools
      });
    }
    return acc;
  }, [] as typeof AI_CATEGORIES_DATA);

  // Total count of tools in the dataset
  const totalToolsCount = AI_CATEGORIES_DATA.reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <div className="min-h-screen bg-[#f9faf7] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors duration-300">
      <Navbar />

      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 animate-fade-in">
        {/* Header Banner - Attracting Premium Design */}
        <div className="relative rounded-3xl overflow-hidden mb-10 border border-slate-800 dark:border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 sm:p-10 shadow-xl shadow-slate-950/40">
          {/* Glowing Gradient Background Shapes */}
          <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[60%] h-[150%] rounded-full bg-gradient-to-br from-emerald-500/5 to-teal-500/10 pointer-events-none blur-3xl" />

          {/* Subtle background tech grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-20" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-slate-300 border border-white/10 uppercase tracking-widest inline-flex items-center gap-1.5 mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Curated Productivity Suite
              </span>
              
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3 flex-wrap">
                <Brain className="w-9 h-9 text-indigo-400 animate-pulse shrink-0" />
                <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  500+ Curated AI Tools Directory
                </span>
              </h1>
              
              <p className="text-slate-300 text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed font-medium">
                Smarter studying, faster programming, premium video creation, audio generation, and ATS optimization. Graded and organized for college students and developers.
              </p>
            </div>
            
            <div className="shrink-0 flex items-center">
              <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500/15 to-blue-500/5 border border-indigo-500/30 rounded-2xl px-4 py-3 flex items-center gap-3 backdrop-blur-md shadow-lg shadow-indigo-500/5">
                <div className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </div>
                <div className="flex flex-col font-mono text-[9px] font-black uppercase tracking-widest">
                  <span className="text-indigo-400">Total Curated Tools</span>
                  <span className="text-white text-xs mt-1 font-bold">{totalToolsCount} Tools Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Box in Header */}
          <div className="mt-8 relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search tools by name, utility, or keywords (e.g. 'lovable', 'video', 'pdf')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/10 focus:border-white/20 rounded-2xl py-3.5 pl-10 pr-4 text-xs font-bold text-white placeholder-slate-400 focus:outline-none transition-all shadow-inner backdrop-blur-md"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[10px] font-black text-indigo-300 hover:text-white uppercase tracking-wider transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ACCORDIONS / RESULTS CONTAINER */}
        <div className="space-y-5 mb-12">
          {searchTerm ? (
            /* Search Results View */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  Search Results
                </span>
                <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 text-[10px] font-black rounded-lg uppercase tracking-wide">
                  Found {searchFilteredResults.reduce((sum, c) => sum + c.tools.length, 0)} Matches
                </span>
              </div>

              {searchFilteredResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchFilteredResults.flatMap(category => 
                    category.tools.map(tool => (
                      <a
                        key={tool.title}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 hover:border-emerald-250 dark:hover:border-emerald-900 hover:bg-emerald-50/20 dark:hover:bg-emerald-955/10 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                              {category.name}
                            </span>
                            <span className="text-[9px] font-bold text-slate-505 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                              {tool.access}
                            </span>
                          </div>
                          <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-450 transition-colors">
                            {tool.title}
                          </h4>
                          <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-normal">
                            {tool.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-850 flex items-center justify-end text-[10px] font-black text-blue-605 group-hover:text-emerald-500 transition-colors gap-0.5">
                          <span>Visit Tool</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </a>
                    ))
                  )}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-10 text-center flex flex-col items-center gap-3">
                  <span className="text-3xl">🔍</span>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">No AI Tools Found</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                    We couldn't find any tools matching "{searchTerm}". Try checking your spelling or searching other keywords.
                  </p>
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="mt-2 bg-slate-900 hover:bg-slate-850 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                  >
                    Browse Categories
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Accordion Categories View */
            AI_CATEGORIES_DATA.map(category => (
              <div key={category.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-855/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                      {getCategoryIcon(category.id)}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                        {category.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Explore {category.tools.length} curated AI resources and platforms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black rounded-lg uppercase tracking-wide">
                      {category.tools.length} Tools
                    </span>
                    {openCategories[category.id] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                <AnimatePresence>
                  {openCategories[category.id] && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-slate-150 dark:border-slate-800"
                    >
                      <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {category.tools.map(tool => (
                            <a
                              key={tool.title}
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 hover:border-emerald-250 dark:hover:border-emerald-900 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300 cursor-pointer"
                            >
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[9px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                    {tool.access}
                                  </span>
                                </div>
                                <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-450 transition-colors">
                                  {tool.title}
                                </h4>
                                <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-normal">
                                  {tool.description}
                                </p>
                              </div>
                              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-855 flex items-center justify-end text-[10px] font-black text-blue-605 group-hover:text-emerald-500 transition-colors gap-0.5">
                                <span>Visit Tool</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </div>

        {/* Action Banner */}
        <div className="mt-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
          <span className="text-2xl">⚡</span>
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white">Save Time with AI Automations</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
            Integrate these AI utilities into your daily learning stack. Build websites, check resume ATS grades, humanize documents, and accelerate your coding tasks.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}