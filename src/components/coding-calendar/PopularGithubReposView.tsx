import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  ExternalLink,
  Bookmark
} from 'lucide-react';
import { GitHubLogo } from './BrandLogos';

interface GithubRepo {
  id: string;
  name: string;
  owner: string;
  description: string;
  stars: string;
  starsNum: number;
  category: 'System Design' | 'DSA & Algorithms' | 'Interview Prep' | 'CS Curriculum' | 'Roadmaps' | 'Projects';
  language: string;
  url: string;
  topics: string[];
}

const POPULAR_REPOS: GithubRepo[] = [
  {
    id: 'system-design-primer',
    name: 'system-design-primer',
    owner: 'donnemartin',
    description: 'Learn how to design large-scale systems. Prep for the system design interview with comprehensive diagrams, flashcards, and step-by-step walkthroughs.',
    stars: '290k+',
    starsNum: 290000,
    category: 'System Design',
    language: 'Python',
    url: 'https://github.com/donnemartin/system-design-primer',
    topics: ['system-design', 'distributed-systems', 'scalability', 'interview-prep'],
  },
  {
    id: 'coding-interview-university',
    name: 'coding-interview-university',
    owner: 'jwasham',
    description: 'A complete multi-month study plan for becoming a software engineer for a large tech company like Google, Amazon, Facebook, or Microsoft.',
    stars: '305k+',
    starsNum: 305000,
    category: 'CS Curriculum',
    language: 'Markdown',
    url: 'https://github.com/jwasham/coding-interview-university',
    topics: ['computer-science', 'interview-study-plan', 'algorithms', 'faang'],
  },
  {
    id: 'developer-roadmap',
    name: 'developer-roadmap',
    owner: 'kamranahmedse',
    description: 'Interactive roadmaps, guides and educational content to help developers choose a path and guide their learning journey in modern tech.',
    stars: '310k+',
    starsNum: 310000,
    category: 'Roadmaps',
    language: 'TypeScript',
    url: 'https://github.com/kamranahmedse/developer-roadmap',
    topics: ['career-path', 'roadmaps', 'frontend', 'backend', 'devops'],
  },
  {
    id: 'build-your-own-x',
    name: 'build-your-own-x',
    owner: 'codecrafters-io',
    description: 'Master programming by recreating your favorite technologies from scratch: Git, Docker, Redis, SQLite, React, Torrent client, and more.',
    stars: '350k+',
    starsNum: 350000,
    category: 'Projects',
    language: 'Markdown',
    url: 'https://github.com/codecrafters-io/build-your-own-x',
    topics: ['project-based-learning', 'tutorials', 'build-from-scratch', 'internals'],
  },
  {
    id: 'tech-interview-handbook',
    name: 'tech-interview-handbook',
    owner: 'yangshun',
    description: 'Curated coding interview preparation materials for busy software engineers: Blind 75 questions, algorithmic cheatsheets, behavioral tips, and resume templates.',
    stars: '125k+',
    starsNum: 125000,
    category: 'Interview Prep',
    language: 'TypeScript',
    url: 'https://github.com/yangshun/tech-interview-handbook',
    topics: ['coding-interview', 'blind-75', 'behavioral', 'resume-guide'],
  },
  {
    id: 'javascript-algorithms',
    name: 'javascript-algorithms',
    owner: 'trekhleb',
    description: 'Algorithms and data structures implemented in JavaScript with explanations and links to further readings. Covers Big O notation and visual diagrams.',
    stars: '190k+',
    starsNum: 190000,
    category: 'DSA & Algorithms',
    language: 'JavaScript',
    url: 'https://github.com/trekhleb/javascript-algorithms',
    topics: ['algorithms', 'data-structures', 'javascript', 'big-o'],
  },
  {
    id: 'the-algorithms-python',
    name: 'Python',
    owner: 'TheAlgorithms',
    description: 'All algorithms implemented in Python — for education and reference. Covers sorting, graphs, trees, dynamic programming, and cryptographic math.',
    stars: '195k+',
    starsNum: 195000,
    category: 'DSA & Algorithms',
    language: 'Python',
    url: 'https://github.com/TheAlgorithms/Python',
    topics: ['python', 'algorithms', 'educational', 'dsa'],
  },
  {
    id: 'computer-science-ossu',
    name: 'computer-science',
    owner: 'ossu',
    description: 'Path to a free self-taught education in Computer Science! Curated degree curriculum from MIT, Harvard, Berkeley, and Stanford free open courses.',
    stars: '175k+',
    starsNum: 175000,
    category: 'CS Curriculum',
    language: 'Markdown',
    url: 'https://github.com/ossu/computer-science',
    topics: ['curriculum', 'mit-courses', 'harvard-cs50', 'self-taught'],
  },
  {
    id: 'public-apis',
    name: 'public-apis',
    owner: 'public-apis',
    description: 'A collective list of free APIs for use in software and web development. Filterable by category, auth type, HTTPS, and CORS support.',
    stars: '335k+',
    starsNum: 335000,
    category: 'Projects',
    language: 'Python',
    url: 'https://github.com/public-apis/public-apis',
    topics: ['api', 'development', 'free-tier', 'project-ideas'],
  },
  {
    id: 'free-programming-books',
    name: 'free-programming-books',
    owner: 'EbookFoundation',
    description: 'Freely available programming books, cheat sheets, podcasts, and online interactive tutorials in multiple languages worldwide.',
    stars: '355k+',
    starsNum: 355000,
    category: 'CS Curriculum',
    language: 'Markdown',
    url: 'https://github.com/EbookFoundation/free-programming-books',
    topics: ['books', 'free-learning', 'reference', 'cheatsheets'],
  },
  {
    id: 'project-based-learning',
    name: 'project-based-learning',
    owner: 'practical-tutorials',
    description: 'A curated list of project-based programming tutorials in which aspiring developers learn how to build an application from scratch in C++, Python, Java, or Go.',
    stars: '195k+',
    starsNum: 195000,
    category: 'Projects',
    language: 'Markdown',
    url: 'https://github.com/practical-tutorials/project-based-learning',
    topics: ['hands-on', 'projects', 'learn-by-doing', 'portfolio'],
  },
  {
    id: 'realworld',
    name: 'realworld',
    owner: 'gothinkster',
    description: '"The mother of all demo apps" — Exemplary fullstack Medium.com clone built across React, Vue, Angular, Node, Spring Boot, Go, Django, and Rails.',
    stars: '82k+',
    starsNum: 82000,
    category: 'Projects',
    language: 'TypeScript',
    url: 'https://github.com/gothinkster/realworld',
    topics: ['fullstack', 'production-grade', 'clean-code', 'architectures'],
  },
  {
    id: 'awesome-python',
    name: 'awesome-python',
    owner: 'vinta',
    description: 'A curated list of awesome Python frameworks, libraries, software, tools, and resources for machine learning, data science, and web development.',
    stars: '230k+',
    starsNum: 230000,
    category: 'Roadmaps',
    language: 'Python',
    url: 'https://github.com/vinta/awesome-python',
    topics: ['python', 'awesome', 'libraries', 'ecosystem'],
  },
  {
    id: 'awesome-react',
    name: 'awesome-react',
    owner: 'enaqx',
    description: 'A collection of awesome things regarding the React ecosystem: State management, UI kits, design systems, animation libraries, and server-side rendering.',
    stars: '68k+',
    starsNum: 68000,
    category: 'Roadmaps',
    language: 'Markdown',
    url: 'https://github.com/enaqx/awesome-react',
    topics: ['react', 'nextjs', 'state-management', 'ui-libraries'],
  },
  {
    id: '33-js-concepts',
    name: '33-js-concepts',
    owner: 'leonardomso',
    description: '33 JavaScript concepts every developer should know: Call stack, primitive types, closures, scope, prototypes, event loop, and promises.',
    stars: '65k+',
    starsNum: 65000,
    category: 'Interview Prep',
    language: 'JavaScript',
    url: 'https://github.com/leonardomso/33-js-concepts',
    topics: ['javascript-fundamentals', 'event-loop', 'closures', 'interview-questions'],
  },
  {
    id: 'nodebestpractices',
    name: 'nodebestpractices',
    owner: 'goldbergyoni',
    description: 'The Node.js best practices list: Architecture, code style, error handling, security, Dockerization, and production testing checklist.',
    stars: '105k+',
    starsNum: 105000,
    category: 'System Design',
    language: 'JavaScript',
    url: 'https://github.com/goldbergyoni/nodebestpractices',
    topics: ['nodejs', 'backend-best-practices', 'security', 'architecture'],
  },
  {
    id: 'devops-exercises',
    name: 'devops-exercises',
    owner: 'bregman-arie',
    description: 'Linux, Jenkins, AWS, SRE, Prometheus, Docker, Python, Ansible, Git, Kubernetes, Terraform, and system administration interview questions and exercises.',
    stars: '70k+',
    starsNum: 70000,
    category: 'Interview Prep',
    language: 'Python',
    url: 'https://github.com/bregman-arie/devops-exercises',
    topics: ['devops', 'linux', 'kubernetes', 'docker', 'cloud'],
  },
  {
    id: 'kubernetes-the-hard-way',
    name: 'kubernetes-the-hard-way',
    owner: 'kelseyhightower',
    description: 'Bootstrap Kubernetes the hard way without scripts. Master certificates, etcd, control plane, workers, and networking fundamentals.',
    stars: '42k+',
    starsNum: 42000,
    category: 'System Design',
    language: 'HCL',
    url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way',
    topics: ['kubernetes', 'cloud-infrastructure', 'networking', 'security'],
  },
  {
    id: 'every-programmer-should-know',
    name: 'every-programmer-should-know',
    owner: 'mtdvio',
    description: 'A collection of (mostly) technical things every software developer should know: Time zones, floating point math, UTF-8, caching, and network latency.',
    stars: '85k+',
    starsNum: 85000,
    category: 'CS Curriculum',
    language: 'Markdown',
    url: 'https://github.com/mtdvio/every-programmer-should-know',
    topics: ['fundamentals', 'distributed-systems', 'software-engineering'],
  },
  {
    id: 'the-algorithms-java',
    name: 'Java',
    owner: 'TheAlgorithms',
    description: 'All algorithms implemented in Java for education and interview preparation. Covers graph traversals, segment trees, and dynamic programming.',
    stars: '62k+',
    starsNum: 62000,
    category: 'DSA & Algorithms',
    language: 'Java',
    url: 'https://github.com/TheAlgorithms/Java',
    topics: ['java', 'algorithms', 'data-structures', 'interview-prep'],
  },
  {
    id: 'system-design-interview',
    name: 'system-design-interview',
    owner: 'checkcheckzz',
    description: 'System design interview questions and solutions: Design URL shortener, TinyURL, Twitter feed, Uber, WhatsApp, YouTube, and Web Crawler.',
    stars: '20k+',
    starsNum: 20000,
    category: 'System Design',
    language: 'Markdown',
    url: 'https://github.com/checkcheckzz/system-design-interview',
    topics: ['system-design', 'hld', 'microservices', 'architectures'],
  },
  {
    id: 'professional-programming',
    name: 'professional-programming',
    owner: 'charlax',
    description: 'A curated collection of learning resources for curious developers: Architecture, code quality, testing, databases, and engineering management.',
    stars: '40k+',
    starsNum: 40000,
    category: 'CS Curriculum',
    language: 'Markdown',
    url: 'https://github.com/charlax/professional-programming',
    topics: ['software-craftsmanship', 'reading-list', 'databases'],
  },
  {
    id: 'practical-projects-karan',
    name: 'Projects',
    owner: 'karan',
    description: 'A comprehensive list of practical engineering projects that anyone can solve in any programming language: Numbers, classic algorithms, graphs, and networking.',
    stars: '27k+',
    starsNum: 27000,
    category: 'Projects',
    language: 'Markdown',
    url: 'https://github.com/karan/Projects',
    topics: ['practical-problems', 'code-challenges', 'portfolio-builders'],
  },
  {
    id: 'fucking-algorithm',
    name: 'fucking-algorithm',
    owner: 'labuladong',
    description: 'Visual algorithm handbook and LeetCode problem solving framework. Covers two pointers, binary search, sliding window, and tree backtracking.',
    stars: '125k+',
    starsNum: 125000,
    category: 'DSA & Algorithms',
    language: 'Markdown',
    url: 'https://github.com/labuladong/fucking-algorithm',
    topics: ['leetcode-framework', 'dsa-patterns', 'visual-algorithms'],
  },
  {
    id: 'awesome-stars',
    name: 'awesome',
    owner: 'sindresorhus',
    description: 'The original directory of curated awesome lists on GitHub. Discover tools, platforms, languages, frameworks, and engineering knowledge.',
    stars: '360k+',
    starsNum: 360000,
    category: 'Roadmaps',
    language: 'Markdown',
    url: 'https://github.com/sindresorhus/awesome',
    topics: ['curated-lists', 'developer-resources', 'awesome-repo'],
  },
  {
    id: 'freeCodeCamp',
    name: 'freeCodeCamp',
    owner: 'freeCodeCamp',
    description: 'The world\'s most popular open-source coding curriculum. Learn web development, JavaScript algorithms, frontend libraries, and backend APIs.',
    stars: '405k+',
    starsNum: 405000,
    category: 'CS Curriculum',
    language: 'TypeScript',
    url: 'https://github.com/freeCodeCamp/freeCodeCamp',
    topics: ['web-development', 'curriculum', 'learn-to-code', 'certifications'],
  },
];

type RepoCategoryFilter = 'All' | 'System Design' | 'DSA & Algorithms' | 'Interview Prep' | 'CS Curriculum' | 'Roadmaps' | 'Projects';

export const PopularGithubReposView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<RepoCategoryFilter>('All');
  const [bookmarkedRepos, setBookmarkedRepos] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('csh_bookmarked_repos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const categories: RepoCategoryFilter[] = [
    'All',
    'System Design',
    'DSA & Algorithms',
    'Interview Prep',
    'CS Curriculum',
    'Roadmaps',
    'Projects',
  ];

  const toggleBookmark = (id: string) => {
    setBookmarkedRepos((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('csh_bookmarked_repos', JSON.stringify(updated));
      } catch {
        // storage quota
      }
      return updated;
    });
  };

  const filteredRepos = useMemo(() => {
    return POPULAR_REPOS.filter((repo) => {
      if (selectedCategory === 'All') return true;
      return repo.category === selectedCategory;
    });
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER with high-contrast visible logo */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {/* High contrast badge ensuring GitHub logo is 100% visible in both light & dark mode */}
          <div className="w-11 h-11 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center shrink-0 shadow-sm border border-slate-700/50">
            <GitHubLogo className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Popular GitHub Repositories
              </h2>
              <Badge className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5">
                {POPULAR_REPOS.length} Curated
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Top open-source computer science curricula, system design roadmaps, interview guides, and project templates.
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CATEGORY FILTER PILLS */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* REPOSITORIES GRID */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.map((repo) => {
          const isBookmarked = Boolean(bookmarkedRepos[repo.id]);

          return (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full min-w-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:border-emerald-500/50 hover:bg-emerald-50/15 dark:hover:bg-emerald-950/20 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="space-y-3">
                {/* Header: Owner / Name & Star count */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex items-center gap-2">
                    <GitHubLogo className="w-4 h-4 shrink-0 text-slate-800 dark:text-slate-200" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 block truncate">
                        {repo.owner}
                      </span>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate block"
                      >
                        {repo.name}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      {repo.stars}
                    </span>
                    <button
                      onClick={() => toggleBookmark(repo.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-amber-500 transition-colors"
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark repository'}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isBookmarked ? 'fill-amber-400 text-amber-500' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {repo.description}
                </p>

                {/* Topics / Tags */}
                <div className="flex flex-wrap gap-1">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded"
                    >
                      #{topic}
                    </span>
                  ))}
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                    {repo.language}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Less rounded, not touching border */}
              <div className="pt-4 mt-4 mb-0.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <Badge
                  variant="outline"
                  className="text-[10px] font-bold border-slate-200 dark:border-slate-800 text-slate-500"
                >
                  {repo.category}
                </Badge>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-colors"
                >
                  <span>Open Repo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
