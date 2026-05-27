// Centralized course structure mapping for the admin upload form
// Maps exactly to the existing website pages and structure

export interface SubjectInfo {
  name: string;
  fullName: string;
  /** 'notes' for regular subjects, 'pyqs' for Previous Year Questions, 'assignments' for assignments */
  type?: 'notes' | 'pyqs' | 'assignments';
}

export interface SemesterInfo {
  semester: string;
  semNumber: number;
  subjects: SubjectInfo[];
}

export interface BranchInfo {
  code: string;
  fullName: string;
  semesters: Record<string, SemesterInfo[]>; // year -> semesters
}

export interface CategoryInfo {
  id: string;
  label: string;
  icon: string; // lucide icon name
  hasYears: boolean;
  hasBranches: boolean;
  hasSemesters: boolean;
  gradient: string;
}

// ── All note categories on the site ─────────────────────────────
export const CATEGORIES: CategoryInfo[] = [
  { id: 'btech', label: 'B.Tech Notes', icon: 'GraduationCap', hasYears: true, hasBranches: true, hasSemesters: true, gradient: 'from-blue-500 to-blue-600' },
  { id: 'mba', label: 'MBA Notes', icon: 'Briefcase', hasYears: false, hasBranches: false, hasSemesters: true, gradient: 'from-indigo-500 to-indigo-600' },
  { id: 'bba', label: 'BBA Notes', icon: 'Briefcase', hasYears: false, hasBranches: false, hasSemesters: true, gradient: 'from-pink-500 to-pink-600' },
  { id: 'dsa', label: 'DSA Notes', icon: 'Database', hasYears: false, hasBranches: false, hasSemesters: false, gradient: 'from-green-500 to-green-600' },
  { id: 'coding', label: 'Coding Study Material', icon: 'Code', hasYears: false, hasBranches: false, hasSemesters: false, gradient: 'from-purple-500 to-purple-600' },
  { id: 'webdev', label: 'Web Development', icon: 'Globe', hasYears: false, hasBranches: false, hasSemesters: false, gradient: 'from-orange-500 to-orange-600' },
  { id: 'placement', label: 'Placement Guide', icon: 'Sparkles', hasYears: false, hasBranches: false, hasSemesters: false, gradient: 'from-green-500 to-blue-500' },
];

// ── BTech Year → Semester mapping ────────────────────────────────
export const BTECH_YEARS = [
  { id: '1st', label: '1st Year', semesters: ['1st Semester', '2nd Semester'] },
  { id: '2nd', label: '2nd Year', semesters: ['3rd Semester', '4th Semester'] },
  { id: '3rd', label: '3rd Year', semesters: ['5th Semester', '6th Semester'] },
  { id: '4th', label: '4th Year', semesters: ['7th Semester', '8th Semester'] },
];

// ── BTech Branches ───────────────────────────────────────────────
export const BTECH_BRANCHES = [
  { code: 'CSE', fullName: 'Computer Science & Information Technology' },
  { code: 'ET', fullName: 'Electronics Technology' },
  { code: 'EE', fullName: 'Electrical Engineering' },
  { code: 'ME', fullName: 'Mechanical Engineering' },
  { code: 'CE', fullName: 'Civil Engineering' },
  { code: 'CHE', fullName: 'Chemical Engineering' },
  { code: 'BE', fullName: 'Biochemical Engineering' },
  { code: 'LFT', fullName: 'Leather & Fashion Technology' },
  { code: 'PT', fullName: 'Plastic Technology' },
  { code: 'FT', fullName: 'Food Technology' },
  { code: 'OT', fullName: 'Oil Technology' },
];

// ── Special sections that appear as subject-level cards ──────────
// PYQs and Assignments exist alongside regular subjects on each page
const SPECIAL_SECTIONS: SubjectInfo[] = [
  { name: 'Previous Year Questions', fullName: 'Previous Year Questions', type: 'pyqs' },
  { name: 'Assignments', fullName: 'Assignments - All Subjects', type: 'assignments' },
];

// ── Subject lists per branch per semester ─────────────────────────
// Key format: "{branch}-{semester}" e.g. "CSE-1st Semester"
// Special sections (PYQs, Assignments) are appended automatically

export const SUBJECTS: Record<string, SubjectInfo[]> = {
  // ════════════════════════════════════════════════════════════════
  // 1st Year — Common for all branches
  // ════════════════════════════════════════════════════════════════
  'ALL-1st Semester': [
    { name: 'Chemistry', fullName: 'Engineering Chemistry' },
    { name: 'Civil Engineering', fullName: 'Civil Engineering' },
    { name: 'ICS', fullName: 'Introduction to Computer Science' },
    { name: 'ICT', fullName: 'Intro to Communication Technology' },
    { name: 'IET', fullName: 'Intro to Emerging Technology' },
    { name: 'Workshop', fullName: 'Workshop Practice' },
  ],
  'ALL-2nd Semester': [
    { name: 'Electrical Engineering', fullName: 'Electrical Engineering' },
    { name: 'Engineering Mechanics', fullName: 'Engineering Mechanics' },
    { name: 'Engineering Mathematics', fullName: 'Engineering Mathematics' },
    { name: 'Professional Communication', fullName: 'Professional Communication' },
    { name: 'Engineering Physics', fullName: 'Engineering Physics' },
    { name: 'Engineering Graphics', fullName: 'Engineering Graphics' },
  ],

  // ════════════════════════════════════════════════════════════════
  // CSE/IT Branch
  // ════════════════════════════════════════════════════════════════
  'CSE-3rd Semester': [
    { name: 'Data Structures Using C', fullName: 'Data Structures Using C' },
    { name: 'Intro to Emerging Technologies in ICT', fullName: 'Intro to Emerging Technologies in ICT' },
    { name: 'Computer Organisation', fullName: 'Computer Organisation' },
    { name: 'Python Programming', fullName: 'Python Programming' },
    { name: 'Engineering Mathematics-II', fullName: 'Engineering Mathematics-II' },
    { name: 'Digital Electronics', fullName: 'Digital Electronics' },
  ],
  'CSE-4th Semester': [
    { name: 'Economics & Management', fullName: 'Economics & Management' },
    { name: 'Engineering Mathematics-III', fullName: 'Engineering Mathematics-III' },
    { name: 'Operating System', fullName: 'Operating Systems' },
    { name: 'Software Engineering', fullName: 'Software Engineering' },
    { name: 'Principles of Programming Language', fullName: 'Principles of Programming Language' },
    { name: 'Web Technology', fullName: 'Web Technology' },
  ],
  'CSE-5th Semester': [
    { name: 'TOAFL', fullName: 'Theory of Automata and Formal Languages' },
    { name: 'DBMS', fullName: 'Database Management Systems' },
    { name: 'Data Science', fullName: 'Data Science' },
    { name: 'Computer Network', fullName: 'Computer Networks' },
    { name: 'DAA', fullName: 'Design and Analysis of Algorithms' },
  ],
  'CSE-6th Semester': [
    { name: 'Artificial Intelligence', fullName: 'Artificial Intelligence' },
    { name: 'Digital Image Processing', fullName: 'Digital Image Processing' },
    { name: 'Compiler Design', fullName: 'Compiler Design' },
    { name: 'Entrepreneurship', fullName: 'Entrepreneurship' },
    { name: 'Object Oriented System Design', fullName: 'Object Oriented System Design' },
    { name: 'Computer Graphics', fullName: 'Computer Graphics' },
  ],

  // ════════════════════════════════════════════════════════════════
  // ET Branch
  // ════════════════════════════════════════════════════════════════
  'ET-3rd Semester': [
    { name: 'ECA', fullName: 'Electronic Circuit Analysis' },
    { name: 'DE', fullName: 'Digital Electronics' },
    { name: 'EMMI', fullName: 'Electrical Machines & Measurements Instrumentation' },
    { name: 'HDL', fullName: 'Hardware Description Language' },
    { name: 'SSD', fullName: 'Solid State Devices' },
    { name: 'Math-II', fullName: 'Engineering Mathematics-II' },
  ],
  'ET-4th Semester': [
    { name: 'Microprocessor', fullName: 'Microprocessor & Microcontroller' },
    { name: 'Signals & Systems', fullName: 'Signals & Systems' },
    { name: 'Communication System', fullName: 'Communication System' },
    { name: 'Control System', fullName: 'Control System' },
    { name: 'Math-III', fullName: 'Engineering Mathematics-III' },
    { name: 'Economics & Management', fullName: 'Economics & Management' },
  ],
  'ET-5th Semester': [
    { name: 'VLSI Design', fullName: 'VLSI Design' },
    { name: 'Digital Communication', fullName: 'Digital Communication' },
    { name: 'DSP', fullName: 'Digital Signal Processing' },
    { name: 'Antenna & Wave Propagation', fullName: 'Antenna & Wave Propagation' },
    { name: 'Embedded System', fullName: 'Embedded System' },
  ],
  'ET-6th Semester': [
    { name: 'Optical Communication', fullName: 'Optical Communication' },
    { name: 'Mobile Communication', fullName: 'Mobile Communication' },
    { name: 'Radar & Satellite', fullName: 'Radar & Satellite Communication' },
    { name: 'IoT', fullName: 'Internet of Things' },
    { name: 'Entrepreneurship', fullName: 'Entrepreneurship' },
  ],

  // ════════════════════════════════════════════════════════════════
  // EE Branch
  // ════════════════════════════════════════════════════════════════
  'EE-3rd Semester': [
    { name: 'Network Theory', fullName: 'Network Theory' },
    { name: 'Electrical Machines-I', fullName: 'Electrical Machines-I' },
    { name: 'Electromagnetic Theory', fullName: 'Electromagnetic Theory' },
    { name: 'Digital Electronics', fullName: 'Digital Electronics' },
    { name: 'Math-II', fullName: 'Engineering Mathematics-II' },
  ],
  'EE-4th Semester': [
    { name: 'Electrical Machines-II', fullName: 'Electrical Machines-II' },
    { name: 'Power System-I', fullName: 'Power System-I' },
    { name: 'Control System', fullName: 'Control System' },
    { name: 'Measurements & Instrumentation', fullName: 'Measurements & Instrumentation' },
    { name: 'Math-III', fullName: 'Engineering Mathematics-III' },
    { name: 'Economics & Management', fullName: 'Economics & Management' },
  ],
  'EE-5th Semester': [
    { name: 'Power Electronics', fullName: 'Power Electronics' },
    { name: 'Power System-II', fullName: 'Power System-II' },
    { name: 'Microprocessor', fullName: 'Microprocessor & Microcontroller' },
    { name: 'Signals & Systems', fullName: 'Signals & Systems' },
    { name: 'Switchgear & Protection', fullName: 'Switchgear & Protection' },
  ],

  // ════════════════════════════════════════════════════════════════
  // ME Branch
  // ════════════════════════════════════════════════════════════════
  'ME-3rd Semester': [
    { name: 'Thermodynamics', fullName: 'Engineering Thermodynamics' },
    { name: 'Material Science', fullName: 'Material Science & Engineering' },
    { name: 'Strength of Materials', fullName: 'Strength of Materials' },
    { name: 'Manufacturing Process', fullName: 'Manufacturing Process' },
    { name: 'Math-II', fullName: 'Engineering Mathematics-II' },
  ],
  'ME-4th Semester': [
    { name: 'Fluid Mechanics', fullName: 'Fluid Mechanics' },
    { name: 'Theory of Machines', fullName: 'Theory of Machines' },
    { name: 'Machine Design', fullName: 'Machine Design' },
    { name: 'Manufacturing Technology', fullName: 'Manufacturing Technology' },
    { name: 'Math-III', fullName: 'Engineering Mathematics-III' },
    { name: 'Economics & Management', fullName: 'Economics & Management' },
  ],
  'ME-5th Semester': [
    { name: 'Heat Transfer', fullName: 'Heat Transfer' },
    { name: 'IC Engines', fullName: 'Internal Combustion Engines' },
    { name: 'Industrial Engineering', fullName: 'Industrial Engineering' },
    { name: 'CAD/CAM', fullName: 'Computer Aided Design & Manufacturing' },
    { name: 'Dynamics of Machinery', fullName: 'Dynamics of Machinery' },
  ],

  // ════════════════════════════════════════════════════════════════
  // CE Branch
  // ════════════════════════════════════════════════════════════════
  'CE-3rd Semester': [
    { name: 'Surveying', fullName: 'Surveying' },
    { name: 'Building Materials', fullName: 'Building Materials & Construction' },
    { name: 'Solid Mechanics', fullName: 'Solid Mechanics' },
    { name: 'Fluid Mechanics', fullName: 'Fluid Mechanics' },
    { name: 'Math-II', fullName: 'Engineering Mathematics-II' },
  ],
  'CE-4th Semester': [
    { name: 'Structural Analysis', fullName: 'Structural Analysis' },
    { name: 'Geotechnical Engineering', fullName: 'Geotechnical Engineering' },
    { name: 'Hydraulics', fullName: 'Hydraulics & Hydraulic Machines' },
    { name: 'Concrete Technology', fullName: 'Concrete Technology' },
    { name: 'Math-III', fullName: 'Engineering Mathematics-III' },
    { name: 'Economics & Management', fullName: 'Economics & Management' },
  ],
  'CE-5th Semester': [
    { name: 'RCC Design', fullName: 'Reinforced Concrete Design' },
    { name: 'Transportation Engineering', fullName: 'Transportation Engineering' },
    { name: 'Environmental Engineering', fullName: 'Environmental Engineering' },
    { name: 'Estimation & Costing', fullName: 'Estimation & Costing' },
    { name: 'Steel Structures', fullName: 'Steel Structures' },
  ],

  // ════════════════════════════════════════════════════════════════
  // CHE Branch
  // ════════════════════════════════════════════════════════════════
  'CHE-3rd Semester': [
    { name: 'Chemical Process Calculations', fullName: 'Chemical Process Calculations' },
    { name: 'Fluid Mechanics', fullName: 'Fluid Mechanics for Chemical Engineers' },
    { name: 'Physical Chemistry', fullName: 'Physical Chemistry' },
    { name: 'Organic Chemistry', fullName: 'Organic Chemistry' },
    { name: 'Math-II', fullName: 'Engineering Mathematics-II' },
  ],
  'CHE-4th Semester': [
    { name: 'Chemical Engineering Thermodynamics', fullName: 'Chemical Engineering Thermodynamics' },
    { name: 'Heat Transfer', fullName: 'Heat Transfer Operations' },
    { name: 'Mass Transfer', fullName: 'Mass Transfer Operations' },
    { name: 'Chemical Technology', fullName: 'Chemical Technology' },
    { name: 'Math-III', fullName: 'Engineering Mathematics-III' },
    { name: 'Economics & Management', fullName: 'Economics & Management' },
  ],
  'CHE-5th Semester': [
    { name: 'Chemical Reaction Engineering', fullName: 'Chemical Reaction Engineering' },
    { name: 'Process Dynamics & Control', fullName: 'Process Dynamics & Control' },
    { name: 'Polymer Technology', fullName: 'Polymer Technology' },
    { name: 'Environmental Engineering', fullName: 'Environmental Engineering' },
    { name: 'Transport Phenomena', fullName: 'Transport Phenomena' },
  ],

  // ════════════════════════════════════════════════════════════════
  // Other branches (BE, LFT, PT, FT, OT)
  // ════════════════════════════════════════════════════════════════
  'BE-3rd Semester': [
    { name: 'Human Anatomy', fullName: 'Human Anatomy & Physiology' },
    { name: 'Biomaterials', fullName: 'Biomaterials' },
    { name: 'Biomedical Instrumentation', fullName: 'Biomedical Instrumentation' },
    { name: 'Math-II', fullName: 'Engineering Mathematics-II' },
  ],
  'BE-4th Semester': [
    { name: 'Medical Electronics', fullName: 'Medical Electronics' },
    { name: 'Biosensors', fullName: 'Biosensors & Transducers' },
    { name: 'Signal Processing', fullName: 'Biomedical Signal Processing' },
    { name: 'Math-III', fullName: 'Engineering Mathematics-III' },
    { name: 'Economics & Management', fullName: 'Economics & Management' },
  ],
  'BE-5th Semester': [
    { name: 'Medical Imaging', fullName: 'Medical Imaging Techniques' },
    { name: 'Biomechanics', fullName: 'Biomechanics' },
    { name: 'Hospital Engineering', fullName: 'Hospital Engineering' },
    { name: 'Rehabilitation Engineering', fullName: 'Rehabilitation Engineering' },
  ],

  'LFT-3rd Semester': [
    { name: 'Leather Chemistry', fullName: 'Leather Chemistry' },
    { name: 'Unit Operations', fullName: 'Unit Operations in Leather' },
    { name: 'Shoe Making', fullName: 'Shoe Making Technology' },
    { name: 'Math-II', fullName: 'Engineering Mathematics-II' },
  ],
  'LFT-4th Semester': [
    { name: 'Leather Processing', fullName: 'Leather Processing Technology' },
    { name: 'Footwear Technology', fullName: 'Footwear Technology' },
    { name: 'Fashion Design', fullName: 'Fashion Design' },
    { name: 'Math-III', fullName: 'Engineering Mathematics-III' },
    { name: 'Economics & Management', fullName: 'Economics & Management' },
  ],
  'LFT-5th Semester': [
    { name: 'Leather Finishing', fullName: 'Leather Finishing' },
    { name: 'Quality Control', fullName: 'Quality Control in Leather' },
    { name: 'Leather Goods', fullName: 'Leather Goods Manufacturing' },
    { name: 'Environmental Management', fullName: 'Environmental Management' },
  ],

  'PT-3rd Semester': [
    { name: 'Polymer Science', fullName: 'Polymer Science' },
    { name: 'Plastic Processing', fullName: 'Plastic Processing' },
    { name: 'Rubber Technology', fullName: 'Rubber Technology' },
    { name: 'Math-II', fullName: 'Engineering Mathematics-II' },
  ],
  'PT-4th Semester': [
    { name: 'Mould Design', fullName: 'Mould Design' },
    { name: 'Plastic Testing', fullName: 'Plastic Testing' },
    { name: 'Composite Materials', fullName: 'Composite Materials' },
    { name: 'Math-III', fullName: 'Engineering Mathematics-III' },
    { name: 'Economics & Management', fullName: 'Economics & Management' },
  ],
  'PT-5th Semester': [
    { name: 'Advanced Polymer Processing', fullName: 'Advanced Polymer Processing' },
    { name: 'Packaging Technology', fullName: 'Packaging Technology' },
    { name: 'Polymer Characterization', fullName: 'Polymer Characterization' },
    { name: 'Environmental Science', fullName: 'Environmental Science' },
  ],

  'FT-3rd Semester': [
    { name: 'Food Chemistry', fullName: 'Food Chemistry' },
    { name: 'Food Microbiology', fullName: 'Food Microbiology' },
    { name: 'Food Processing', fullName: 'Food Processing Technology' },
    { name: 'Math-II', fullName: 'Engineering Mathematics-II' },
    { name: 'Economics & Management', fullName: 'Economics & Management' },
  ],
  'FT-4th Semester': [
    { name: 'Dairy Technology', fullName: 'Dairy Technology' },
    { name: 'Cereal Technology', fullName: 'Cereal Technology' },
    { name: 'Food Preservation', fullName: 'Food Preservation' },
    { name: 'Math-III', fullName: 'Engineering Mathematics-III' },
    { name: 'Economics & Management', fullName: 'Economics & Management' },
  ],
  'FT-5th Semester': [
    { name: 'Food Packaging', fullName: 'Food Packaging' },
    { name: 'Fruit & Vegetable Tech', fullName: 'Fruit & Vegetable Technology' },
    { name: 'Quality Assurance', fullName: 'Food Quality Assurance' },
    { name: 'Nutrition', fullName: 'Human Nutrition' },
  ],

  'OT-3rd Semester': [
    { name: 'Oil Chemistry', fullName: 'Oil Chemistry' },
    { name: 'Oil Processing', fullName: 'Oil Processing Technology' },
    { name: 'Surface Coatings', fullName: 'Surface Coatings' },
    { name: 'Math-II', fullName: 'Engineering Mathematics-II' },
    { name: 'Economics & Management', fullName: 'Economics & Management' },
  ],
  'OT-4th Semester': [
    { name: 'Paint Technology', fullName: 'Paint Technology' },
    { name: 'Detergent Technology', fullName: 'Detergent Technology' },
    { name: 'Fat & Oil Processing', fullName: 'Fat & Oil Processing' },
    { name: 'Math-III', fullName: 'Engineering Mathematics-III' },
    { name: 'Economics & Management', fullName: 'Economics & Management' },
  ],
  'OT-5th Semester': [
    { name: 'Cosmetic Technology', fullName: 'Cosmetic Technology' },
    { name: 'Quality Control', fullName: 'Quality Control in Oil' },
    { name: 'Process Engineering', fullName: 'Process Engineering' },
    { name: 'Environmental Science', fullName: 'Environmental Science' },
  ],

  // ════════════════════════════════════════════════════════════════
  // MBA Semesters
  // ════════════════════════════════════════════════════════════════
  'MBA-1st Semester': [
    { name: 'Management Principles', fullName: 'Principles of Management' },
    { name: 'Organizational Behavior', fullName: 'Organizational Behavior' },
    { name: 'Managerial Economics', fullName: 'Managerial Economics' },
    { name: 'Financial Accounting', fullName: 'Financial Accounting' },
    { name: 'Business Statistics', fullName: 'Business Statistics' },
  ],
  'MBA-2nd Semester': [
    { name: 'Marketing Management', fullName: 'Marketing Management' },
    { name: 'Financial Management', fullName: 'Financial Management' },
    { name: 'HRM', fullName: 'Human Resource Management' },
    { name: 'Operations Management', fullName: 'Operations Management' },
    { name: 'Business Research', fullName: 'Business Research Methods' },
  ],
  'MBA-3rd Semester': [
    { name: 'Strategic Management', fullName: 'Strategic Management' },
    { name: 'International Business', fullName: 'International Business' },
    { name: 'Business Law', fullName: 'Business Law & Ethics' },
    { name: 'Entrepreneurship', fullName: 'Entrepreneurship Development' },
  ],
  'MBA-4th Semester': [
    { name: 'Project Management', fullName: 'Project Management' },
    { name: 'Supply Chain Management', fullName: 'Supply Chain Management' },
    { name: 'Business Analytics', fullName: 'Business Analytics' },
    { name: 'Corporate Governance', fullName: 'Corporate Governance' },
  ],

  // ════════════════════════════════════════════════════════════════
  // BBA Semesters
  // ════════════════════════════════════════════════════════════════
  'BBA-1st Semester': [
    { name: 'Business Organization', fullName: 'Business Organization & Management' },
    { name: 'Micro Economics', fullName: 'Micro Economics' },
    { name: 'Financial Accounting', fullName: 'Financial Accounting' },
    { name: 'Business Mathematics', fullName: 'Business Mathematics' },
  ],
  'BBA-2nd Semester': [
    { name: 'Macro Economics', fullName: 'Macro Economics' },
    { name: 'Cost Accounting', fullName: 'Cost Accounting' },
    { name: 'Business Communication', fullName: 'Business Communication' },
    { name: 'Organizational Behavior', fullName: 'Organizational Behavior' },
  ],
  'BBA-3rd Semester': [
    { name: 'Marketing Management', fullName: 'Marketing Management' },
    { name: 'HRM', fullName: 'Human Resource Management' },
    { name: 'Financial Management', fullName: 'Financial Management' },
    { name: 'Business Statistics', fullName: 'Business Statistics' },
  ],
  'BBA-4th Semester': [
    { name: 'Business Law', fullName: 'Business Law' },
    { name: 'Indian Financial System', fullName: 'Indian Financial System' },
    { name: 'Production Management', fullName: 'Production & Operations Management' },
    { name: 'Computer Applications', fullName: 'Computer Applications in Business' },
  ],
  'BBA-5th Semester': [
    { name: 'E-Commerce', fullName: 'E-Commerce' },
    { name: 'Entrepreneurship', fullName: 'Entrepreneurship Development' },
    { name: 'International Business', fullName: 'International Business' },
    { name: 'Tax Planning', fullName: 'Tax Planning & Management' },
  ],
  'BBA-6th Semester': [
    { name: 'Strategic Management', fullName: 'Strategic Management' },
    { name: 'Project Management', fullName: 'Project Management' },
    { name: 'Corporate Governance', fullName: 'Corporate Governance' },
    { name: 'Business Ethics', fullName: 'Business Ethics & CSR' },
  ],
};

// ── Helper functions ─────────────────────────────────────────────

/** Get subjects for a given category, branch, and semester.
 *  Automatically includes PYQs and Assignments at the end. */
export function getSubjects(
  category: string,
  semester: string,
  branch?: string
): SubjectInfo[] {
  let baseSubjects: SubjectInfo[] = [];

  if (category === 'btech') {
    // First check branch-specific subjects
    const branchKey = `${branch}-${semester}`;
    if (SUBJECTS[branchKey]) baseSubjects = SUBJECTS[branchKey];

    // Fallback: 1st year is common
    if (baseSubjects.length === 0) {
      const allKey = `ALL-${semester}`;
      if (SUBJECTS[allKey]) baseSubjects = SUBJECTS[allKey];
    }
  } else {
    // MBA/BBA
    const key = `${category.toUpperCase()}-${semester}`;
    if (SUBJECTS[key]) baseSubjects = SUBJECTS[key];
  }

  if (baseSubjects.length === 0) return [];

  // Append PYQs and Assignments as subject-level options
  return [...baseSubjects, ...SPECIAL_SECTIONS];
}

/** Get subjects WITHOUT special sections (for display purposes) */
export function getSubjectsOnly(
  category: string,
  semester: string,
  branch?: string
): SubjectInfo[] {
  if (category === 'btech') {
    const branchKey = `${branch}-${semester}`;
    if (SUBJECTS[branchKey]) return SUBJECTS[branchKey];
    const allKey = `ALL-${semester}`;
    if (SUBJECTS[allKey]) return SUBJECTS[allKey];
    return [];
  }
  const key = `${category.toUpperCase()}-${semester}`;
  return SUBJECTS[key] || [];
}

/** Get semesters for a given category and year */
export function getSemesters(category: string, year?: string): string[] {
  if (category === 'btech' && year) {
    const y = BTECH_YEARS.find(y => y.id === year);
    return y ? y.semesters : [];
  }
  if (category === 'mba') {
    return ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester'];
  }
  if (category === 'bba') {
    return ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester'];
  }
  return [];
}

/** Get year for a given BTech semester */
export function getYearForSemester(semester: string): string | undefined {
  for (const y of BTECH_YEARS) {
    if (y.semesters.includes(semester)) return y.id;
  }
  return undefined;
}
