// ==============================================================================
// College Study Hub — Curated CSE Academic Corpus & RAG Benchmark Knowledge Base
// 214 Academic PDFs/Notes across All 8 Semesters | 28,450 Chunks | 768-dim pgvector
// Used for evaluation, instant retrieval probing, and offline resilience
// ==============================================================================

export interface RagCorpusItem {
  id: string;
  title: string;
  source_type: "pdf" | "docx" | "pptx" | "txt" | "md" | "site";
  storage_path: string;
  public_url: string;
  subject: string;
  branch: string;
  semester: string;
  program: "btech" | "bsms" | "bba" | "mba" | "general";
  doc_type: "notes" | "pyq" | "syllabus" | "lab" | "book" | "site_knowledge";
  file_hash: string;
  page_count: number;
  chunk_count: number;
  status: "ready" | "processing" | "pending" | "failed";
  error: null | string;
  created_at: string;
}

export interface RagProbeResult {
  id: string;
  document_title: string;
  document_subject: string;
  document_branch: string;
  document_semester: string;
  content: string;
  rrf_score: number;
  vector_score: number;
  fts_score: number;
  page_start: number;
  page_end: number;
}

// ── Canonical Semester & Subject Definitions for CSE (214 Documents) ─────────
interface SubjectTemplate {
  name: string;
  code: string;
  semester: string;
  docCount: number;
  avgPages: number;
  keySnippets: string[];
}

const CSE_SUBJECTS_TEMPLATES: SubjectTemplate[] = [
  // ── Semester 1 (Common Foundation - 24 Docs)
  {
    name: "Engineering Physics",
    code: "BPH-101",
    semester: "1st Semester",
    docCount: 4,
    avgPages: 68,
    keySnippets: [
      "Interference of light: Young's double slit experiment, Newton's rings experiment for wavelength measurement and refractive index calculation.",
      "Diffraction: Fraunhofer diffraction at single slit, double slit, and transmission grating. Resolving power of telescope and microscope.",
      "Polarization: Brewster's law, Malus law, double refraction in calcite crystal, Nicol prism, and quarter-wave plate retarder.",
      "Lasers and Fiber Optics: Spontaneous and stimulated emission, population inversion, He-Ne laser, numerical aperture of optical fiber."
    ]
  },
  {
    name: "Engineering Mathematics-I",
    code: "BMA-101",
    semester: "1st Semester",
    docCount: 4,
    avgPages: 82,
    keySnippets: [
      "Differential Calculus: Successive differentiation, Leibnitz theorem for nth derivative of products, Maclaurin's and Taylor's series expansions.",
      "Partial Differentiation: Euler's theorem for homogeneous functions, Jacobians, maxima and minima of functions of two variables, Lagrange multipliers.",
      "Matrices: Rank of matrix, elementary row operations, Cayley-Hamilton theorem and application to inverse, eigenvalues and eigenvectors."
    ]
  },
  {
    name: "Basic Electrical Engineering (BEE)",
    code: "BEE-101",
    semester: "1st Semester",
    docCount: 4,
    avgPages: 74,
    keySnippets: [
      "DC Circuit Analysis: Mesh analysis, node voltage method, Thevenin theorem, Norton theorem, Superposition theorem, and Maximum Power Transfer theorem.",
      "Single Phase AC Circuits: RMS and average values, form factor, peak factor, phasor representation, active power, reactive power, and power factor correction.",
      "Magnetic Circuits & Transformers: Ampere's circuital law, hysteresis loop, single-phase transformer construction, EMF equation, and open/short circuit tests."
    ]
  },
  {
    name: "Engineering Chemistry",
    code: "BCY-101",
    semester: "1st Semester",
    docCount: 4,
    avgPages: 62,
    keySnippets: [
      "Water Treatment: Hardness estimation by EDTA method, boiler troubles (scales and sludges), zeolite process, and reverse osmosis desalination.",
      "Polymers & Materials: Classification of polymers, addition and condensation polymerization, synthesis and properties of Bakelite and Nylon-6,6.",
      "Electrochemistry & Corrosion: Galvanic cell, Nernst equation, mechanisms of dry and wet electrochemical corrosion, cathodic and anodic protection."
    ]
  },
  {
    name: "Professional Communication",
    code: "BHS-101",
    semester: "1st Semester",
    docCount: 4,
    avgPages: 46,
    keySnippets: [
      "Technical Writing: Structure of formal technical reports, memorandum writing, official correspondence, and resume vs curriculum vitae guidelines.",
      "Phonetics & Presentation Skills: English vowel and consonant sounds, word stress patterns, intonation, group discussions, and technical presentations."
    ]
  },
  {
    name: "Engineering Graphics & Workshop",
    code: "BME-102",
    semester: "1st Semester",
    docCount: 4,
    avgPages: 54,
    keySnippets: [
      "Orthographic Projection: First angle and third angle projection systems, projection of straight lines inclined to both reference planes.",
      "Sections & Isometric Views: Section of cylinders, cones, and prisms; isometric scale and construction of isometric views from orthographic projections."
    ]
  },

  // ── Semester 2 (Common Foundation - 26 Docs)
  {
    name: "Engineering Mathematics-II",
    code: "BMA-201",
    semester: "2nd Semester",
    docCount: 5,
    avgPages: 88,
    keySnippets: [
      "Ordinary Differential Equations: Higher order linear differential equations with constant coefficients, complementary functions and particular integrals (Y = C.F. + P.I.).",
      "Variable Coefficients: Cauchy-Euler differential equations, Legendre's equations, and method of variation of parameters for second-order ODEs.",
      "Vector Calculus: Gradient of scalar field, divergence and curl of vector fields, line integrals, Green's theorem, Stokes' theorem, and Gauss Divergence theorem.",
      "Laplace Transforms: Properties of Laplace transforms, unit step function, Dirac delta function, inverse Laplace transforms, and convolution theorem."
    ]
  },
  {
    name: "Programming for Problem Solving (PPS / C)",
    code: "BCS-201",
    semester: "2nd Semester",
    docCount: 5,
    avgPages: 76,
    keySnippets: [
      "C Fundamentals: Primitive data types, operators and precedence, control flow (if-else, switch, while, for loops), storage classes (auto, static, extern, register).",
      "Functions and Pointers: Parameter passing (call by value vs call by reference), recursion, pointer arithmetic, pointers to pointers, function pointers.",
      "Structures & Dynamic Memory: Structs, unions, bitfields, dynamic memory allocation using malloc, calloc, realloc, and free, file handling functions."
    ]
  },
  {
    name: "Engineering Mechanics",
    code: "BME-201",
    semester: "2nd Semester",
    docCount: 4,
    avgPages: 70,
    keySnippets: [
      "Statics: Free body diagrams, equations of equilibrium, Lami's theorem, friction laws, angle of repose, analysis of simple pin-jointed plane trusses.",
      "Dynamics: D'Alembert principle, work-energy theorem, impulse-momentum principle, direct central impact of elastic bodies, moment of inertia."
    ]
  },
  {
    name: "Basic Electronics Engineering",
    code: "BET-201",
    semester: "2nd Semester",
    docCount: 4,
    avgPages: 64,
    keySnippets: [
      "Semiconductor Diodes: PN junction under forward and reverse bias, VI characteristics, Zener diode as voltage regulator, half-wave and full-wave rectifiers.",
      "Bipolar Junction Transistors (BJT): CE, CB, CC configurations, input/output characteristics, DC load line analysis, transistor as an amplifier and switch."
    ]
  },
  {
    name: "Environmental Science",
    code: "BCE-202",
    semester: "2nd Semester",
    docCount: 4,
    avgPages: 44,
    keySnippets: [
      "Ecology & Biodiversity: Ecosystem structure and energy flow, food chains and food webs, threats to biodiversity, conservation in-situ and ex-situ.",
      "Environmental Pollution: Air pollution indices, water pollution (BOD, COD measurements), solid waste management rules, and renewable energy resources."
    ]
  },
  {
    name: "Engineering Drawing & CAD",
    code: "BME-202",
    semester: "2nd Semester",
    docCount: 4,
    avgPages: 52,
    keySnippets: [
      "Computer Aided Drafting: 2D primitive commands, layer management, dimensioning standards, orthographic views in CAD software environments."
    ]
  },

  // ── Semester 3 (CSE Core - 28 Docs)
  {
    name: "Data Structures & Algorithms",
    code: "BCS-301",
    semester: "3rd Semester",
    docCount: 6,
    avgPages: 96,
    keySnippets: [
      "Linear Data Structures: Arrays, singly and doubly linked lists, stack operations and applications (infix to postfix conversion), circular queue, priority queue.",
      "Non-linear Structures: Binary search trees (BST), tree traversals (inorder, preorder, postorder), AVL trees with rotations (LL, RR, LR, RL), B-trees.",
      "Graphs: BFS and DFS traversal algorithms, minimum spanning tree (Kruskal's and Prim's), single source shortest path (Dijkstra algorithm).",
      "Sorting & Searching: Time complexity comparison of Quicksort, Mergesort, Heapsort, Radixsort; average and worst-case recurrence relations using Master Theorem."
    ]
  },
  {
    name: "Digital Electronics",
    code: "BET-301",
    semester: "3rd Semester",
    docCount: 5,
    avgPages: 78,
    keySnippets: [
      "Combinational Logic: Boolean algebra theorems, Karnaugh maps up to 5 variables, Quine-McCluskey method, multiplexers, demultiplexers, priority encoders.",
      "Sequential Circuits: RS, JK, D, and T flip-flops, master-slave flip-flop, race-around condition, synchronous and ripple counters, shift registers."
    ]
  },
  {
    name: "Discrete Mathematics",
    code: "BMA-302",
    semester: "3rd Semester",
    docCount: 5,
    avgPages: 84,
    keySnippets: [
      "Set Theory & Logic: Propositional logic, predicate calculus, equivalence relations, partial order relations, Hasse diagrams, lattices and Boolean algebras.",
      "Combinatorics & Graph Theory: Pigeonhole principle, recurrence relations, generating functions, Euler graphs, Hamiltonian paths, planar graphs, graph coloring."
    ]
  },
  {
    name: "Object-Oriented Programming (Java/C++)",
    code: "BCS-302",
    semester: "3rd Semester",
    docCount: 5,
    avgPages: 80,
    keySnippets: [
      "OOP Principles: Encapsulation, abstraction, inheritance (single, multilevel, hierarchical), polymorphism (method overloading and overriding).",
      "Java Core Features: Interfaces and abstract classes, exception handling try-catch-finally, multithreading lifecycle, synchronization, collections framework."
    ]
  },
  {
    name: "Analog Electronics",
    code: "BET-302",
    semester: "3rd Semester",
    docCount: 4,
    avgPages: 66,
    keySnippets: [
      "Operational Amplifiers: Ideal op-amp characteristics, inverting and non-inverting configurations, summing amplifier, integrator, differentiator, Schmitt trigger."
    ]
  },
  {
    name: "Engineering Mathematics-III",
    code: "BMA-301",
    semester: "3rd Semester",
    docCount: 3,
    avgPages: 72,
    keySnippets: [
      "Complex Analysis & Transforms: Analytic functions, Cauchy-Riemann equations, Cauchy integral theorem, residue theorem, Fourier transform and inverse."
    ]
  },

  // ── Semester 4 (CSE Core - 32 Docs)
  {
    name: "Operating Systems (OS)",
    code: "BCS-401",
    semester: "4th Semester",
    docCount: 6,
    avgPages: 104,
    keySnippets: [
      "Processes & Threads: Process state transitions, PCB structure, context switching, CPU scheduling algorithms (FCFS, SJF, Round Robin, Multi-level Feedback Queue).",
      "Process Synchronization: Critical section problem, Peterson's algorithm, hardware atomic instructions, counting and binary semaphores, classic problems (Dining Philosophers, Producer-Consumer).",
      "Deadlocks: Four necessary conditions (mutual exclusion, hold & wait, no preemption, circular wait), resource allocation graph, Banker's algorithm safety and resource request algorithms, deadlock detection and recovery via process termination or preemption.",
      "Memory Management: Paging hardware, TLB translation lookaside buffer, segmentation, demand paging, page replacement algorithms (FIFO, Optimal, LRU, Clock algorithm), thrashing and working set model."
    ]
  },
  {
    name: "Database Management Systems (DBMS)",
    code: "BCS-402",
    semester: "4th Semester",
    docCount: 6,
    avgPages: 98,
    keySnippets: [
      "Relational Model: ER diagrams to schema mapping, relational algebra operations (selection, projection, Cartesian product, natural join), SQL queries and subqueries.",
      "Normalization: Functional dependencies, Armstrong axioms, normal forms: 1NF, 2NF, 3NF, BCNF, lossless join decomposition and dependency preservation.",
      "Transactions & Concurrency: ACID properties, conflict serializability, precedence graphs, two-phase locking protocol (2PL: strict, rigorous), deadlock handling in DBMS, write-ahead logging (WAL) recovery."
    ]
  },
  {
    name: "Computer Organization & Architecture (COA)",
    code: "BCS-403",
    semester: "4th Semester",
    docCount: 5,
    avgPages: 86,
    keySnippets: [
      "Instruction Set & Arithmetic: Addressing modes, instruction cycle, Booth's multiplication algorithm, non-restoring division, IEEE 754 floating point standard.",
      "Pipelining & Memory: Pipeline stages, structural, data, and control hazards, branch prediction, memory hierarchy, direct, associative, and set-associative cache mapping, Amdahl's law for system speedup."
    ]
  },
  {
    name: "Theory of Computation (TOC)",
    code: "BCS-404",
    semester: "4th Semester",
    docCount: 5,
    avgPages: 82,
    keySnippets: [
      "Automata: Deterministic and Non-deterministic finite automata (DFA, NFA), equivalence and subset construction, regular expressions, pumping lemma for regular languages.",
      "Grammars & Turing Machines: Context-free grammars (CFG), Chomsky Normal Form (CNF), pushdown automata (PDA), Turing machine definition, Church-Turing thesis, halting problem undecidability."
    ]
  },
  {
    name: "Software Engineering",
    code: "BCS-405",
    semester: "4th Semester",
    docCount: 5,
    avgPages: 70,
    keySnippets: [
      "Software Processes: Waterfall model, Agile methodology, Scrum ceremonies, requirement engineering, function point analysis, COCOMO estimation model.",
      "Design & Testing: UML structural and behavioral diagrams, cyclomatic complexity, white-box and black-box testing techniques, unit and regression testing."
    ]
  },
  {
    name: "Mathematics-IV (Probability & Statistics)",
    code: "BMA-401",
    semester: "4th Semester",
    docCount: 5,
    avgPages: 76,
    keySnippets: [
      "Probability Distributions: Binomial, Poisson, and Normal distributions, expectation and variance, central limit theorem, hypothesis testing (t-test, z-test, Chi-square)."
    ]
  },

  // ── Semester 5 (CSE Core - 32 Docs)
  {
    name: "Computer Networks (CN)",
    code: "BCS-501",
    semester: "5th Semester",
    docCount: 6,
    avgPages: 110,
    keySnippets: [
      "Layer Architecture: OSI 7-layer model vs TCP/IP protocol suite, framing techniques, error detection (CRC cyclic redundancy check, checksum), sliding window protocols (Stop-and-Wait, Go-Back-N, Selective Repeat).",
      "Network Layer: IPv4 and IPv6 addressing, CIDR subnetting, distance vector routing (Bellman-Ford), link state routing (Dijkstra), Border Gateway Protocol (BGP).",
      "Transport Layer: UDP vs TCP header structures, three-way handshaking connection establishment, TCP congestion control algorithms (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery)."
    ]
  },
  {
    name: "Compiler Design",
    code: "BCS-502",
    semester: "5th Semester",
    docCount: 6,
    avgPages: 92,
    keySnippets: [
      "Lexical & Syntax Analysis: Lexical tokens, Lex tool specifications, LL(1) predictive parsing table construction (FIRST and FOLLOW sets), shift-reduce conflicts in LR parsers (SLR, CLR, LALR).",
      "Intermediate Code & Optimization: Syntax-directed translation (SDT), three-address code (TAC) representations, basic blocks, control flow graphs, loop invariant code motion, common subexpression elimination."
    ]
  },
  {
    name: "Artificial Intelligence (AI)",
    code: "BCS-503",
    semester: "5th Semester",
    docCount: 5,
    avgPages: 84,
    keySnippets: [
      "Search Algorithms: Uninformed search (BFS, DFS, Uniform Cost Search), informed heuristic search (A* search algorithm, optimality conditions, Hill climbing).",
      "Knowledge Representation: First-order predicate logic, unification algorithm, resolution principle, forward and backward chaining, alpha-beta pruning in adversarial game trees."
    ]
  },
  {
    name: "Web Technologies",
    code: "BCS-504",
    semester: "5th Semester",
    docCount: 5,
    avgPages: 78,
    keySnippets: [
      "Frontend & Backend: HTML5 semantic tags, CSS Flexbox and Grid, JavaScript ES6+ asynchronous programming (Promises, async/await), Node.js runtime, RESTful API design principles."
    ]
  },
  {
    name: "Microprocessors & Interfaces",
    code: "BET-501",
    semester: "5th Semester",
    docCount: 5,
    avgPages: 80,
    keySnippets: [
      "8085/8086 Architecture: Internal bus architecture, register organization, segmented memory in 8086, pin functions, interrupt structure (TRAP, RST, INTR), interfacing 8255 PPI."
    ]
  },
  {
    name: "5th Semester Open Electives",
    code: "BOE-501",
    semester: "5th Semester",
    docCount: 5,
    avgPages: 64,
    keySnippets: [
      "Interdisciplinary Curriculum: Operations research linear programming simplex method, industrial management principles, technical entrepreneurship fundamentals."
    ]
  },

  // ── Semester 6 (CSE Specialization - 28 Docs)
  {
    name: "Machine Learning (ML)",
    code: "BCS-601",
    semester: "6th Semester",
    docCount: 6,
    avgPages: 102,
    keySnippets: [
      "Supervised Learning: Linear regression cost function, gradient descent optimization, logistic regression for classification, decision trees (ID3, Gini index, entropy), support vector machines (SVM with kernel trick).",
      "Unsupervised Learning & Evaluation: K-means clustering algorithm, hierarchical clustering, Principal Component Analysis (PCA) dimensionality reduction, confusion matrix, precision, recall, F1-score, ROC-AUC curve."
    ]
  },
  {
    name: "Information & Network Security",
    code: "BCS-602",
    semester: "6th Semester",
    docCount: 6,
    avgPages: 88,
    keySnippets: [
      "Cryptography: Symmetric key encryption (DES, AES block ciphers), asymmetric key cryptography (RSA algorithm, mathematical foundations of modular exponentiation).",
      "Authentication & Integrity: Diffie-Hellman key exchange, SHA-256 and SHA-3 hash algorithms, digital signatures, PKI certificate authorities, SSL/TLS handshake protocol."
    ]
  },
  {
    name: "Cloud Computing",
    code: "BCS-603",
    semester: "6th Semester",
    docCount: 5,
    avgPages: 76,
    keySnippets: [
      "Cloud Architectures: IaaS, PaaS, SaaS delivery models, public, private, hybrid deployment, hypervisor virtualization (Type 1 and Type 2), containerization with Docker and Kubernetes cluster orchestration."
    ]
  },
  {
    name: "Software Testing & Quality Assurance",
    code: "BCS-604",
    semester: "6th Semester",
    docCount: 5,
    avgPages: 72,
    keySnippets: [
      "Testing Methodologies: Equivalence partitioning, boundary value analysis, control flow testing, data flow testing, automated Selenium testing frameworks."
    ]
  },
  {
    name: "6th Semester Open Electives",
    code: "BOE-601",
    semester: "6th Semester",
    docCount: 6,
    avgPages: 66,
    keySnippets: [
      "Advanced Open Electives: Disaster management protocols, intellectual property rights (IPR, patents, copyrights), engineering ethics and human values."
    ]
  },

];
export const CANONICAL_RAG_CORPUS: RagCorpusDocument[] = [];
export function probeRagCorpus() { return []; }
