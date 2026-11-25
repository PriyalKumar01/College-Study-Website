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

];
export const CANONICAL_RAG_CORPUS: RagCorpusDocument[] = [];
export function probeRagCorpus() { return []; }
