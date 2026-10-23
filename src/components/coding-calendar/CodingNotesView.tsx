import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Search,
  ExternalLink,
  Download,
  BookOpen,
  Server,
  Code2,
  Database,
  Cpu,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';
import { GitHubLogo } from './BrandLogos';

interface CodingNoteItem {
  id: string;
  title: string;
  category: 'System Design' | 'DSA' | 'Web & Backend' | 'Core CS';
  description: string;
  url: string;
  isExternalResource?: boolean;
  fileSize?: string;
}

export const CodingNotesView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const notesList: CodingNoteItem[] = [
    // System Design
    {
      id: 'sd-github-topics',
      title: 'GitHub Curated System Design Interview Topics & Solutions',
      category: 'System Design',
      description: 'Comprehensive repository covering scalable architectures, microservices, load balancers, caching, and database sharding.',
      url: 'https://github.com/topics/system-design-interview',
      isExternalResource: true,
    },
    {
      id: 'sd-handbook',
      title: 'System Design Handbook & Cheat Sheet',
      category: 'System Design',
      description: 'Complete high-level (HLD) and low-level (LLD) design patterns, CAP theorem, consistent hashing, and message queues.',
      url: 'https://drive.google.com/file/d/113jEs3RkyjV1u46W_bD-vTvTMnm9Jf-x/view?usp=drive_link',
      fileSize: '8.4 MB',
    },
    {
      id: 'sd-core-notes',
      title: 'System Design Complete Interview Notes',
      category: 'System Design',
      description: 'Real-world interview architectures: URL Shortener, Twitter Feed, Uber Ride Matching, and WhatsApp Chat.',
      url: 'https://drive.google.com/file/d/10tvBr8onwzSc8q8TpdyRdpbZ21vKfPlO/view?usp=drive_link',
      fileSize: '6.2 MB',
    },

    // DSA
    {
      id: 'dsa-100-leetcode',
      title: '100 Must Do Leetcode Problems Handwritten Notes',
      category: 'DSA',
      description: 'Handwritten problem approaches, time complexity breakdown, and edge-case handling for top 100 questions.',
      url: 'https://drive.google.com/file/d/103Mm8QysPI19PJ0mBNlJSqS_SizI7J1x/view?usp=drive_link',
      fileSize: '14.2 MB',
    },
    {
      id: 'dsa-striver-sde',
      title: 'Strivers SDE Sheet Complete Notes & Solutions',
      category: 'DSA',
      description: 'Curated 191 problem solutions covering arrays, 2-pointers, linked lists, binary trees, graphs, and dynamic programming.',
      url: 'https://drive.google.com/file/d/1-zbaZduTV7s_cNC8gVwFQS5duTtv_1P7/view?usp=drive_link',
      fileSize: '19.5 MB',
    },
    {
      id: 'dsa-handwritten-full',
      title: 'DSA Complete Handwritten Notes (Made Easy)',
      category: 'DSA',
      description: 'Detailed diagrams, master theorem proofs, sorting visualizers, tree traversals, and dynamic programming memoization grids.',
      url: 'https://drive.google.com/file/d/12IljJkQxxytSV9a7KniIezBLyknqo7Cz/view?usp=drive_link',
      fileSize: '24.1 MB',
    },
    {
      id: 'dsa-top-arrays',
      title: 'Top Array Interview Questions & Solutions',
      category: 'DSA',
      description: 'Dutch national flag, Kadane’s algorithm, next permutation, 3-sum, and sliding window maximum patterns.',
      url: 'https://drive.google.com/file/d/11CSx57aoluwvGA-dJ2Qiszc2mRiTuE1e/view?usp=drive_link',
      fileSize: '5.8 MB',
    },
    {
      id: 'dsa-made-easy-book',
      title: 'DSA Complete Book PDF – Made Easy Publication',
      category: 'DSA',
      description: 'Industry benchmark book for technical rounds and competitive coding examinations.',
      url: 'https://drive.google.com/file/d/12KMt3yfyVXg2TLIkSYE3axFA3-i8Axku/view?usp=drive_link',
      fileSize: '32.0 MB',
    },

    // Web & Backend
    {
      id: 'web-backend-expert',
      title: 'Backend Expert Interview Questions & Architectures',
      category: 'Web & Backend',
      description: 'RESTful API principles, JWT authentication, connection pooling, indexing, and distributed transactions.',
      url: 'https://drive.google.com/file/d/10Mf4HwXV0A0wSCSnTmJJUD3Vls3wQ05g/view?usp=drive_link',
      fileSize: '7.9 MB',
    },
    {
      id: 'web-spring-boot',
      title: 'Spring Boot REST API Development Guide',
      category: 'Web & Backend',
      description: 'Dependency injection, Spring Security, JPA/Hibernate mapping, exception handling, and unit testing.',
      url: 'https://drive.google.com/file/d/10FgdWUI-mmIqFuUsycbUhcruZwmEGfxV/view?usp=drive_link',
      fileSize: '11.3 MB',
    },
    {
      id: 'web-sql-complete',
      title: 'SQL Top 100 Important Questions & PDF Notes',
      category: 'Web & Backend',
      description: 'Window functions (RANK, DENSE_RANK), joins, subqueries, group by having, query optimization, and triggers.',
      url: 'https://drive.google.com/file/d/10GPBEqENiiNq_jbIbmRUF84eIkOw8C83/view?usp=drive_link',
      fileSize: '9.2 MB',
    },
    {
      id: 'web-node-handwritten',
      title: 'Node.js & Express Handwritten Notes',
      category: 'Web & Backend',
      description: 'Event loop phases, streams, buffer management, clustering, async/await, and middleware pipelining.',
      url: 'https://drive.google.com/file/d/1-wbRT2L4rE4GsFV3d2nsECsJ4GQmbBcs/view?usp=drive_link',
      fileSize: '8.1 MB',
    },
    {
      id: 'web-react-100',
      title: '100 React.js Senior Interview Q/A',
      category: 'Web & Backend',
      description: 'Virtual DOM, reconciliation, custom hooks, useMemo/useCallback optimization, context API, and SSR.',
      url: 'https://drive.google.com/file/d/11NOUSmHg-JNqPVAa7K_xwPULrHd68t33/view?usp=drive_link',
      fileSize: '6.7 MB',
    },

    // Core CS
    {
      id: 'cs-os-notes',
      title: 'Operating Systems (OS) Placement Notes',
      category: 'Core CS',
      description: 'Process vs Thread, CPU scheduling, synchronization, semaphores, deadlock detection, and virtual memory paging.',
      url: 'https://drive.google.com/file/d/120uObg7nA5cbG36oCbgU4zD7Cm69x6yB/view?usp=drive_link',
      fileSize: '12.4 MB',
    },
    {
      id: 'cs-dbms-notes',
      title: 'Database Management Systems (DBMS) Notes',
      category: 'Core CS',
      description: 'ACID properties, normal forms (1NF to BCNF), indexing (B+ Trees), concurrency control, and two-phase locking.',
      url: 'https://drive.google.com/file/d/111xaHcL9ZDKtTpdB2mk-ceir5kZ7LQfT/view?usp=drive_link',
      fileSize: '10.8 MB',
    },
    {
      id: 'cs-cn-notes',
      title: 'Computer Networks (CN) Protocols & Architecture',
      category: 'Core CS',
      description: 'OSI 7 layers, TCP 3-way handshake, flow control, DNS resolution, HTTP/2 vs HTTP/3, and subnetting.',
      url: 'https://drive.google.com/file/d/12ETGjzq5U3SwDY-wRhmnFJVxkrxj0R0f/view?usp=drive_link',
      fileSize: '8.9 MB',
    },
  ];

  const categories = ['All', 'System Design', 'DSA', 'Web & Backend', 'Core CS'];

  const filteredNotes = useMemo(() => {
    return notesList.filter((note) => {
      if (activeCategory === 'All') return true;
      return note.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-xl shadow-sm">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 border ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/50">
                  {note.category}
                </span>
                {note.fileSize && (
                  <span className="text-[10px] font-bold text-slate-400">
                    {note.fileSize}
                  </span>
                )}
                {note.isExternalResource && (
                  <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                    <GitHubLogo className="w-3 h-3 text-slate-700 dark:text-slate-300" />
                    Open Source
                  </span>
                )}
              </div>

              <h4 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                {note.title}
              </h4>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
                {note.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => viewInBrowser(note.url, note.title)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Read Online
              </button>

              <button
                onClick={() => smartDownload(note.url, `${note.title}.pdf`)}
                className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                title="Download Study Material"
              >
                <Download className="w-3.5 h-3.5" />
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
