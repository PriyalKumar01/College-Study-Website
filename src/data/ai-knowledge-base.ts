// ============================================================
//  College Study Hub — AI Assistant Knowledge Base (RAG Core)
//  All website knowledge: routes, notes, FAQs, guidance
// ============================================================

export const SITE_URL = "https://college-study.netlify.app";

// ── Site Navigation Map ──────────────────────────────────────
export const SITE_NAVIGATION = {
  dashboard: { path: "/dashboard", label: "Dashboard", description: "Main student dashboard with overview of all features" },
  notes: { path: "/notes", label: "Notes", description: "Main notes categories — BTech, BSMS, BBA, MBA, DSA, WebDev, Coding" },
  cgpaCalculator: { path: "/cgpa-calculator", label: "CGPA Calculator", description: "Calculate SGPA and CGPA using HBTU grading scale" },
  opportunities: { path: "/opportunities", label: "Opportunities", description: "Jobs, internships, hackathons, and competitions" },
  scholarships: { path: "/scholarship-portal", label: "Scholarships Portal", description: "Scholarship listings with deadline tracking and shareable links" },
  placementPrep: { path: "/placement-preparation", label: "Placement Preparation", description: "Structured placement prep resources" },
  gateStudy: { path: "/gate-study", label: "GATE Study Hub", description: "GATE preparation material — subject-wise (premium feature)" },
  gateQuiz: { path: "/gate-study/quiz", label: "GATE Quiz", description: "Interactive GATE practice questions by branch and year" },
  resume: { path: "/ats-resume", label: "ATS Resume Builder", description: "ATS-friendly resume builder with templates optimised for ATS" },
  premiumContent: { path: "/premium-content", label: "Premium Content", description: "Career roadmaps, fresher job guide, step-by-step plans" },
  premiumDirectory: { path: "/premium-directory", label: "Company Directory & HR Emails", description: "Premium list of hiring companies and direct HR contact database" },
  aiTools: { path: "/useful-ai-tools", label: "Useful AI Tools", description: "Curated AI tools for student productivity" },
  contributors: { path: "/notes-contributors", label: "Notes Contributors", description: "Hall of Fame — gamified leaderboard with StudyCoins and badges" },
  profile: { path: "/profile", label: "My Profile", description: "User profile settings and information" },
  about: { path: "/about", label: "About", description: "About College Study Hub and team information" },
  communityNotes: { path: "/notes/community", label: "Community Notes", description: "Student-submitted notes with admin approval workflow" },
  dsaNotes: { path: "/dsa-notes", label: "DSA Notes", description: "Data Structures and Algorithms study material" },
  webDevNotes: { path: "/web-dev-notes", label: "Web Development Notes", description: "Modern web development resources" },
  codingMaterial: { path: "/coding-study-material", label: "Coding Study Material", description: "Competitive programming and coding content" },
};

// ── BTech Notes Structure ────────────────────────────────────
export const BTECH_NOTES = {
  base: { path: "/notes/btech", label: "BTech Notes" },
  years: {
    first: { path: "/notes/btech/first-year", label: "First Year" },
    second: { path: "/notes/btech/second-year", label: "Second Year" },
    third: { path: "/notes/btech/third-year", label: "Third Year" },
    fourth: { path: "/notes/btech/fourth-year", label: "Fourth Year" },
  },
  semesters: {
    sem1: {
      path: "/first-semester-notes",
      label: "1st Semester",
      branches: "Common for all branches",
      subjects: ["Basic Electrical Engineering (BEE)", "Engineering Mathematics-I", "Engineering Physics", "Engineering Chemistry", "Professional Communication", "Engineering Graphics", "Workshop Practice"],
    },
    sem2: {
      path: "/second-semester-notes",
      label: "2nd Semester",
      branches: "Common for all branches",
      subjects: ["Engineering Mathematics-II", "Engineering Mechanics", "Basic Electronics Engineering", "Programming for Problem Solving (C Language)", "Environmental Science", "Engineering Drawing"],
    },
    sem3: {
      path: "/notes/btech/third-semester",
      label: "3rd Semester",
      branches: ["CSE", "ME", "CE", "CH", "LFT", "ET", "PT", "BE", "FT", "OT", "EE"],
      cse: { path: "/third-semester-cse-notes", subjects: ["Data Structures", "Digital Electronics", "Discrete Mathematics", "Object Oriented Programming (OOP/Java)", "Mathematics-III", "Analog Electronics"] },
      me: { path: "/third-semester-me-notes", subjects: ["Thermodynamics", "Fluid Mechanics", "Manufacturing Technology", "Strength of Materials", "Mathematics-III"] },
      ce: { path: "/third-semester-ce-notes" },
      ch: { path: "/third-semester-ch-notes" },
      lft: { path: "/third-semester-lft-notes" },
      et: { path: "/third-semester-et-notes" },
      pt: { path: "/third-semester-pt-notes" },
      be: { path: "/third-semester-be-notes" },
      ft: { path: "/third-semester-ft-notes" },
      ot: { path: "/third-semester-ot-notes" },
      ee: { path: "/third-semester-ee-notes" },
    },
    sem4: {
      path: "/notes/btech/fourth-semester",
      label: "4th Semester",
      branches: ["CSE", "ME", "CE", "CH", "LFT", "ET", "PT", "BE", "FT", "OT", "EE"],
      cse: { path: "/fourth-semester-cse-notes", subjects: ["DBMS (Database Management Systems)", "Computer Organization & Architecture (COA)", "Operating Systems (OS)", "Theory of Computation (TOC)", "Mathematics-IV / Probability & Statistics", "Software Engineering"] },
      me: { path: "/fourth-semester-me-notes" },
      ce: { path: "/fourth-semester-ce-notes" },
      ch: { path: "/fourth-semester-ch-notes" },
      lft: { path: "/fourth-semester-lft-notes" },
      et: { path: "/fourth-semester-et-notes" },
      pt: { path: "/fourth-semester-pt-notes" },
      be: { path: "/fourth-semester-be-notes" },
      ft: { path: "/fourth-semester-ft-notes" },
      ot: { path: "/fourth-semester-ot-notes" },
      ee: { path: "/fourth-semester-ee-notes" },
    },
    sem5: {
      path: "/notes/btech/fifth-semester",
      label: "5th Semester",
      branches: ["CSE", "ME", "CE", "CH", "LFT", "ET", "PT", "BE", "FT", "OT", "EE", "Open Electives"],
      cse: { path: "/fifth-semester-cse-notes", subjects: ["Computer Networks (CN)", "Compiler Design", "Microprocessors & Interfaces", "Web Technologies", "Artificial Intelligence (AI)", "Open Electives"] },
      me: { path: "/fifth-semester-me-notes" },
      ce: { path: "/fifth-semester-ce-notes" },
      ch: { path: "/fifth-semester-ch-notes" },
      lft: { path: "/fifth-semester-lft-notes" },
      et: { path: "/fifth-semester-et-notes" },
      pt: { path: "/fifth-semester-pt-notes" },
      be: { path: "/fifth-semester-be-notes" },
      ft: { path: "/fifth-semester-ft-notes" },
      ot: { path: "/fifth-semester-ot-notes" },
      ee: { path: "/fifth-semester-ee-notes" },
      openElectives: { path: "/fifth-semester-open-electives" },
    },
    sem6: {
      path: "/notes/btech/sixth-semester",
      label: "6th Semester",
      branches: ["CSE", "ME", "CE", "CH", "LFT", "ET", "PT", "BE", "FT", "OT", "EE", "Open Electives"],
      cse: { path: "/sixth-semester-cse-notes", subjects: ["Machine Learning (ML)", "Information Security", "Cloud Computing", "Software Testing", "Open Electives"] },
      me: { path: "/sixth-semester-me-notes" },
      ce: { path: "/sixth-semester-ce-notes" },
      ch: { path: "/sixth-semester-ch-notes" },
      lft: { path: "/sixth-semester-lft-notes" },
      et: { path: "/sixth-semester-et-notes" },
      pt: { path: "/sixth-semester-pt-notes" },
      be: { path: "/sixth-semester-be-notes" },
      ft: { path: "/sixth-semester-ft-notes" },
      ot: { path: "/sixth-semester-ot-notes" },
      ee: { path: "/sixth-semester-ee-notes" },
      openElectives: { path: "/sixth-semester-open-electives" },
    },
    sem7: {
      path: "/seventh-semester-cse-notes",
      label: "7th Semester (CSE)",
      cse: { path: "/seventh-semester-cse-notes", subjects: ["Distributed Systems", "Big Data Analytics", "Internet of Things (IoT)", "Deep Learning", "Electives"] },
    },
    sem8: {
      path: "/eighth-semester-cse-notes",
      label: "8th Semester (CSE)",
      cse: { path: "/eighth-semester-cse-notes", subjects: ["Project Work", "Seminar", "Industrial Training", "Electives"] },
    },
  },
};

// ── BSMS / BBA / MBA Notes ───────────────────────────────────
export const OTHER_PROGRAM_NOTES = {
  bsms: {
    base: { path: "/notes/bsms", label: "BS-MS Notes" },
    years: {
      second: { path: "/bsms-second-year-notes" },
      third: { path: "/bsms-third-year-notes" },
    },
    semesters: {
      sem3: { path: "/bsms-sem3-notes", label: "BS-MS Semester 3" },
      sem4: { path: "/bsms-sem4-notes", label: "BS-MS Semester 4" },
      sem5: { path: "/bsms-sem5-notes", label: "BS-MS Semester 5" },
      sem6: { path: "/bsms-sem6-notes", label: "BS-MS Semester 6" },
// [rag-build-step 4/25]: feat(knowledge-base): prioritize exact phrase matches over partial substring matches