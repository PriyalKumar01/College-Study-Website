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
    },
  },
  bba: { path: "/bba-notes", label: "BBA Notes" },
  mba: { path: "/mba-notes", label: "MBA Notes" },
};

// ── Premium System Info ──────────────────────────────────────
export const PREMIUM_INFO = {
  plans: [
    {
      name: "Company Directory & HR Emails",
      includes: ["Premium list of hiring companies", "Direct HR email contacts database", "Company profiles and hiring info"],
      path: "/premium-directory",
    },
    {
      name: "Career Roadmaps",
      includes: ["Fresher job guide with step-by-step plans", "Domain-specific career paths", "Salary insights"],
      path: "/premium-content",
    },
    {
      name: "GATE Study Hub",
      includes: ["Subject-wise GATE preparation material", "Previous year analysis", "Topic-wise notes"],
      path: "/gate-study",
    },
    {
      name: "ATS Resume Builder",
      includes: ["ATS-optimized resume templates", "Overleaf templates", "AI ATS Scorer (new)"],
      path: "/ats-resume",
    },
  ],
  payment: "Razorpay (secure Indian payment gateway)",
};

// ── Contribution & Admin Info ────────────────────────────────
export const CONTRIBUTION_INFO = {
  howToContribute: "To contribute notes, you need to become an admin first. Contact Founder Priyal Kumar sir for admin access.",
  adminContact: "WhatsApp: +91 89572 21543 | Reach out via the WhatsApp button on the website",
  founderName: "Priyal Kumar",
  adminProcess: "Once you become an admin, you can submit notes through the Admin Portal. Notes go through an approval workflow before being published.",
  communityNotes: "Community members can also view student-submitted notes at /notes/community",
};

// ── Useful External Links & Portals ──────────────────────────
export const USEFUL_EXTERNAL_LINKS = {
  hbtuOfficial: { label: "HBTU Official Website", url: "https://hbtu.ac.in/", description: "Circulars, tenders, notices, syllabus & university updates" },
  hbtuErp: { label: "HBTU ERP Portal", url: "https://erp.hbtu.ac.in/NewIndex.html", description: "Student login, semester registration, fee receipts & results" },
  hbtuAttendance: { label: "HBTU Attendance Portal", url: "https://erp.hbtu.ac.in/StudentAttendance.aspx", description: "Live subject-wise & daily attendance tracking" },
  upScholarship: { label: "UP Scholarship Portal", url: "https://scholarship.up.gov.in/index.aspx", description: "State post-matric scholarship & fee reimbursement" },
  buddy4Study: { label: "Buddy4Study Scholarships", url: "https://www.buddy4study.com/scholarships", description: "Pan-India private, CSR & merit-cum-means scholarship opportunities" },
  digiShakti: { label: "Digi Shakti Portal (Tablet/Smartphone)", url: "https://digishakti.up.gov.in/", description: "UP Govt Free Tablet/Smartphone Scheme — eKYC check & status" },
};

// ── Pre-Cached Common Responses (no API needed) ──────────────
// Fuzzy-match these before calling any AI API to save API quota
export const CACHED_RESPONSES: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ["notes contribute", "contribute notes", "notes submit", "notes add karna", "notes upload", "notes dena", "notes bhejne"],
    response: `📝 **Notes Contribution Process:**

To contribute notes to College Study Hub, **Admin Access** is required.

**Steps:**
1. 📞 **Contact Founder Priyal Kumar** via WhatsApp: *+91 89572 21543* (or click the floating WhatsApp button on the platform).
2. Provide your name, branch, and semester.
3. You will receive **Admin Portal access** to upload notes.
4. Submitted notes are reviewed and published live on the platform.

🏆 **Perks:** Contributors earn *StudyCoins* and are featured on our **Hall of Fame**! Check out [Notes Contributors](/notes-contributors).`,
  },
  {
    keywords: ["admin kaise bane", "admin access", "admin banana", "admin banna", "admin chahiye"],
    response: `🔐 **How to Become an Admin:**

Admin access is granted on a selective basis to active student contributors.

📱 **WhatsApp:** +91 89572 21543
🌐 Or click the floating WhatsApp button on the website.

**Admin Capabilities:**
- ✅ Upload, review, and approve study notes
- ✅ Post job, internship, and hackathon opportunities  
- ✅ Manage scholarship announcements and listings`,
  },
  {
    keywords: ["premium kaise lein", "premium access", "premium kaise milega", "premium unlock", "premium buy", "premium kharidna"],
    response: `💎 **How to Get Premium Access:**

Access premium resources through the **Premium** section on our platform or visit directly:
- 🗂️ [Company Directory & HR Emails](/premium-directory)
- 🎯 [Career Roadmaps](/premium-content)
- 📚 [GATE Study Hub](/gate-study)
- 📄 [ATS Resume Builder](/ats-resume)

**Payment:** Secure checkout powered by Razorpay (UPI, Credit/Debit Cards, NetBanking).

🎁 **Student Discount:** HBTU students are eligible for exclusive discounts. Contact Founder [Priyal Kumar](/about) via WhatsApp (+91 89572 21543) for discount codes! 🎉`,
  },
  {
    keywords: ["cgpa calculator", "cgpa calculate", "cgpa kaise calculate", "sgpa calculator", "cgpa kahan", "cgpa tool"],
    response: `📊 **CGPA & SGPA Calculator:**

Direct link: [CGPA Calculator](/cgpa-calculator)

**Features:**
- ✅ Calibrated strictly to the HBTU Kanpur 10-point relative grading scale
- ✅ Semester-wise SGPA calculation
- ✅ Cumulative CGPA computation across all semesters
- ✅ Accessible anytime from the sidebar navigation 🎓`,
  },
  {
    keywords: ["scholarship", "scholarship kahan", "scholarship portal", "scholarship list", "scholarship kaise milega"],
    response: `🏆 **Scholarships Portal:**

Direct link: [Scholarships Portal](/scholarship-portal)

**Features:**
- 🔍 State (UP Scholarship) and national corporate/CSR scholarships
- ⏰ Real-time application deadlines & eligibility criteria
- 🔗 Direct application links and shareable cards

*Also explore [Useful Websites](/dashboard) in the navigation bar for external scholarship links!* 🎁`,
  },
  {
    keywords: ["gate preparation", "gate study", "gate material", "gate notes", "gate kaise prepare", "gate hub"],
    response: `📚 **GATE Study Hub:**

Direct link: [GATE Study Hub](/gate-study) *(Premium Feature)*

**Includes:**
- 📖 Subject-wise GATE preparation material
- 📝 Previous year question analysis
- 🧩 Topic-wise notes organized by branch

**GATE Quiz (Free):** [GATE Quiz](/gate-study/quiz) — branch and year-wise practice questions

**Access:** Premium plan required. Contact Founder Priyal Kumar (WhatsApp +91 89572 21543) for special student discounts! 🎁`,
  },
  {
    keywords: ["opportunities", "jobs", "internship", "hackathon", "competition", "job kahan", "internship kahan"],
    response: `💼 **Opportunities Portal:**

Direct link: [Opportunities](/opportunities)

**What's available:**
- 🏢 Job openings for fresh graduates and experienced alumni
- 🎓 Internship listings across major domains
- 💻 Hackathons and competitive coding contests
- 🏆 Academic and technical competitions

Filter by category, deadline, and eligibility. Regularly updated with active notifications! 🔔`,
  },
  {
    keywords: ["placement preparation", "placement prep", "placement kaise kare", "interview prep", "placement resources"],
    response: `💼 **Placement Preparation:**

Direct link: [Placement Preparation](/placement-preparation)

**Includes:**
- 📋 Structured technical preparation roadmap
- 💡 Core interview tips and strategies
- 📝 Quantitative aptitude & logical reasoning practice
- 💻 Technical coding interview guidance

Also explore: [ATS Resume Builder](/ats-resume) to generate interview-ready resumes!`,
  },
  {
    keywords: ["resume builder", "resume banana", "ats resume", "cv builder", "resume template"],
    response: `📄 **ATS-Friendly Resume Builder:**

Direct link: [ATS Resume Builder](/ats-resume)

**Features:**
- 📋 Overleaf-ready ATS-optimized resume templates
- ✅ Industry-standard formatting guidelines
- 🤖 **AI ATS Scorer** — Upload your resume + job description to get instant compatibility scores and keyword gap analysis
- 💼 Benchmarked for technology and engineering recruitment

*Contact Founder Priyal Kumar on WhatsApp (+91 89572 21543) for special student discounts!*`,
  },
  {
    keywords: ["dsa notes", "data structures notes", "algorithm notes", "dsa kahan", "data structure"],
    response: `💻 **DSA (Data Structures & Algorithms) Notes:**

Direct link: [DSA Notes](/dsa-notes)

**Covers:**
- Arrays, Linked Lists, Stacks, Queues
- Trees, Binary Search Trees, Graphs, Heaps
- Sorting & Searching algorithms
- Dynamic Programming and Greedy strategies
- Asymptotic Time & Space Complexity analysis

Ideal for academic exams and technical coding interviews! Also explore [Coding Study Material](/coding-study-material).`,
  },
  {
    keywords: ["web development notes", "webdev notes", "web dev", "html css", "javascript notes", "react notes"],
    response: `🌐 **Web Development Notes:**

Direct link: [Web Development Notes](/web-dev-notes)

**Covers:**
- HTML5, CSS3, Modern JavaScript (ES6+)
- React.js architecture and state management
- Backend fundamentals with Node.js and Express
- RESTful APIs and database connectivity
- Responsive UI design with Tailwind CSS`,
  },
  {
    keywords: ["hall of fame", "contributors", "leaderboard", "studycoins", "badges", "top contributors"],
    response: `🏆 **Notes Contributors Hall of Fame:**

Direct link: [Notes Contributors](/notes-contributors)

**Gamification System:**
- 🪙 **StudyCoins** awarded for contributing verified notes
- 🥇 Gold, 🥈 Silver, 🥉 Bronze contributor badges
- 📊 Real-time community leaderboard
- ⭐ Spotlight on top contributors

Contribute notes and earn your spot on the leaderboard! Contact [Priyal Kumar](/about) for admin upload credentials.`,
  },
  {
    keywords: ["login", "sign in", "signup", "register", "account banana", "login kaise kare", "otp login"],
    response: `🔐 **Login / Registration:**

**Available Authentication Methods:**
1. 📧 **Email OTP** — Passwordless verification directly to your inbox
2. 🔵 **Google OAuth** — Instant one-click Google login

Navigate to the [Auth Page](/auth) or click the Login button in the top navigation bar.

**Note:** Registration is secured with bot protection. Please complete the captcha during signup! ✅`,
  },
  {
    keywords: ["dark mode", "light mode", "theme change", "theme toggle", "dark theme"],
    response: `🌙 **Theme Settings (Dark / Light Mode):**

Toggle the theme anytime using the sun/moon icon in the navigation bar or sidebar.

Choose between:
- ☀️ Light Mode
- 🌙 Dark Mode

Your preference is saved locally across sessions! 💾`,
  },
  {
    keywords: ["whatsapp", "contact", "help", "support", "founder", "priyal kumar"],
    response: `📞 **Contact & Support:**

**Founder:** Priyal Kumar
📱 **WhatsApp:** +91 89572 21543 (or click the floating WhatsApp button on the platform)

**Inquiries Welcomed:**
- 🔧 Technical issues & bug reports
- 🔐 Admin access requests
- 💎 Premium subscription questions
- 📝 Notes contribution
- 💡 Feature suggestions & feedback

Typical response time: Within a few hours! 🙏`,
  },
  {
    keywords: ["pwa", "install app", "app install", "mobile app", "install website", "add to home"],
    response: `📱 **PWA (Progressive Web App) Installation:**

College Study Hub is an installable PWA designed for mobile and desktop environments:

**Android (Chrome):**
1. Open the website in Google Chrome
2. Tap Menu (⋮) → "Add to Home screen"
3. Tap "Install"

**iOS (Safari):**
1. Open the site in Safari
2. Tap the Share icon (⬆️) → "Add to Home Screen"

**Desktop (Chrome / Edge):**
1. Click the install icon (🖥️) in the URL bar
2. Confirm "Install"

Launches in full-screen standalone mode with offline caching support! 🎉`,
  },
  {
    keywords: ["notification", "bell icon", "alerts", "updates", "new notifications"],
    response: `🔔 **Platform Notifications:**

Click the **Bell Icon** 🔔 in the top navigation bar to view recent alerts.

**You will receive notifications for:**
- 📚 Newly published branch and semester notes
- 💼 Fresh job, internship, and hackathon opportunities
- 🏆 New scholarship announcements
- 📢 Important campus and platform notices

An unread badge indicates fresh updates!`,
  },
  {
    keywords: ["ai tools", "artificial intelligence tools", "ai resources", "useful tools", "productivity tools"],
    response: `🤖 **Useful AI Tools Directory:**

Direct link: [Useful AI Tools](/useful-ai-tools)

**Curated tools for engineering students:**
- Academic research and summarization tools
- Code generation and debugging assistants
- Productivity, writing, and presentation utilities

Perfect for project development, research papers, and assignments! 🎓`,
  },
  {
    keywords: ["bba notes", "bba study material", "bba subjects"],
    response: `📚 **BBA Notes:**

Direct link: [BBA Notes](/bba-notes)

Curated study materials and references for Bachelor of Business Administration (BBA) subjects. Visit the page for detailed subject-wise downloads!`,
  },
  {
    keywords: ["mba notes", "mba study material", "mba subjects"],
    response: `📚 **MBA Notes:**

Direct link: [MBA Notes](/mba-notes)

Comprehensive study resources for Master of Business Administration (MBA) courses, organized by semester and specialization.`,
  },
  {
    keywords: ["cse 1st semester", "first semester", "sem 1 notes", "1st sem", "first sem"],
    response: `📚 **1st Semester Notes (Common across all branches):**

Direct link: [First Semester Notes](/first-semester-notes)

**Core Subjects:**
- Basic Electrical Engineering (BEE)
- Engineering Mathematics-I
- Engineering Physics / Engineering Chemistry
- Professional Communication
- Engineering Graphics & Workshop Practice

The 1st-year curriculum is standardized across all 11 branches at HBTU! 🎓`,
  },
  {
    keywords: ["cse 2nd semester", "second semester", "sem 2 notes", "2nd sem", "second sem"],
    response: `📚 **2nd Semester Notes (Common across all branches):**

Direct link: [Second Semester Notes](/second-semester-notes)

**Core Subjects:**
- Engineering Mathematics-II
- Engineering Mechanics
- Basic Electronics Engineering
- Programming for Problem Solving (C Language)
- Environmental Science
- Engineering Drawing`,
  },
  {
    keywords: ["cse 3rd semester", "third semester cse", "sem 3 cse", "3rd sem cse"],
    response: `📚 **3rd Semester CSE Notes:**

Direct link: [3rd Semester CSE Notes](/third-semester-cse-notes)

**Subjects:**
- Data Structures
- Digital Electronics
- Discrete Mathematics
- Object Oriented Programming (Java/OOP)
- Mathematics-III
- Analog Electronics`,
  },
  {
    keywords: ["cse 4th semester", "fourth semester cse", "sem 4 cse", "4th sem cse", "dbms notes", "operating system notes", "os notes", "coa notes", "toc notes"],
    response: `📚 **4th Semester CSE Notes:**

Direct link: [4th Semester CSE Notes](/fourth-semester-cse-notes)

**Subjects:**
- 🗃️ Database Management Systems (DBMS)
- 💻 Computer Organization & Architecture (COA)
- 🖥️ Operating Systems (OS)
- 🔣 Theory of Computation (TOC)
- 📊 Mathematics-IV / Probability & Statistics
- 🛠️ Software Engineering`,
  },
  {
    keywords: ["cse 5th semester", "fifth semester cse", "sem 5 cse", "5th sem cse", "computer networks notes", "cn notes", "compiler design notes", "microprocessor notes", "web technologies notes", "ai notes"],
    response: `📚 **5th Semester CSE Notes:**

Direct link: [5th Semester CSE Notes](/fifth-semester-cse-notes)

**Subjects:**
- 🌐 Computer Networks (CN)
- ⚙️ Compiler Design
- 🔌 Microprocessors & Interfaces
- 🌍 Web Technologies
- 🤖 Artificial Intelligence (AI)
- 📖 [Open Electives](/fifth-semester-open-electives)`,
  },
  {
    keywords: ["cse 6th semester", "sixth semester cse", "sem 6 cse", "6th sem cse", "machine learning notes", "ml notes", "cloud computing notes", "information security notes"],
    response: `📚 **6th Semester CSE Notes:**

Direct link: [6th Semester CSE Notes](/sixth-semester-cse-notes)

**Subjects:**
- 🤖 Machine Learning (ML)
- 🔒 Information Security
- ☁️ Cloud Computing
- 🧪 Software Testing
- 📖 [Open Electives](/sixth-semester-open-electives)`,
  },
  {
    keywords: ["cse 7th semester", "seventh semester cse", "sem 7 cse", "7th sem cse"],
    response: `📚 **7th Semester CSE Notes:**

Direct link: [7th Semester CSE Notes](/seventh-semester-cse-notes)

**Subjects:**
- Distributed Systems
- Big Data Analytics
- Internet of Things (IoT)
- Deep Learning & Electives`,
  },
  {
    keywords: ["cse 8th semester", "eighth semester cse", "sem 8 cse", "8th sem cse", "final semester"],
    response: `📚 **8th Semester CSE Notes:**

Direct link: [8th Semester CSE Notes](/eighth-semester-cse-notes)

**Includes:**
- Final Year Capstone Project guidance
- Technical Seminar resources
- Industrial Training reports & Electives`,
  },
  {
    keywords: ["bsms notes", "bs ms", "bs-ms", "bsms semester", "integrated program"],
    response: `📚 **BS-MS Integrated Program Notes:**

Available semester pages:
- [BS-MS Semester 3 Notes](/bsms-sem3-notes)
- [BS-MS Semester 4 Notes](/bsms-sem4-notes)
- [BS-MS Semester 5 Notes](/bsms-sem5-notes)
- [BS-MS Semester 6 Notes](/bsms-sem6-notes)

Year-wise: [2nd Year](/bsms-second-year-notes) | [3rd Year](/bsms-third-year-notes)`,
  },
  {
    keywords: ["hr contacts", "hr emails", "company contacts", "hr directory", "recruiter contacts"],
    response: `💼 **HR Contacts & Company Directory:**

Direct link: [Premium Directory](/premium-directory) *(Premium Feature)*

**Includes:**
- Verified HR email addresses for 2500+ technology and engineering firms
- Direct recruiter contacts and company hiring portals
- Streamlined off-campus outreach resources`,
  },
  {
    keywords: ["hbtu website", "hbtu official", "hbtu site", "hbtu link", "hbtu.ac.in", "hbtu portal"],
    response: `🌐 **HBTU Kanpur Official Portals & Direct Links:**

1. 🏛️ **Official University Website:** [hbtu.ac.in](https://hbtu.ac.in/)
   - Academic circulars, exam notices, syllabus, tenders, and faculty directory.
2. 💻 **ERP Portal (Student Login):** [erp.hbtu.ac.in](https://erp.hbtu.ac.in/NewIndex.html)
   - Semester registration, fee payment receipts, grade cards, and admit cards.
3. 📊 **Attendance Portal:** [erp.hbtu.ac.in/StudentAttendance.aspx](https://erp.hbtu.ac.in/StudentAttendance.aspx)
   - Real-time subject-wise and aggregate attendance tracking (75% mandatory rule).
4. 🎓 **UP Scholarship Portal:** [scholarship.up.gov.in](https://scholarship.up.gov.in/index.aspx)
5. 📱 **Digi Shakti Portal (Tablet Scheme):** [digishakti.up.gov.in](https://digishakti.up.gov.in/)

*All links are also organized under the **Useful Websites** dropdown in the top navbar!* 🚀`,
  },
  {
    keywords: ["erp portal", "erp login", "hbtu erp", "erp link", "semester registration erp", "fee receipt erp"],
    response: `💻 **HBTU ERP Portal Login:**

Direct URL: [https://erp.hbtu.ac.in/NewIndex.html](https://erp.hbtu.ac.in/NewIndex.html)

**Key ERP Functions:**
- 📝 **Semester Registration:** Select and register for your semester courses when sessions begin.
- 💳 **Fee Payment & Receipts:** Pay university fees online and download official receipts.
- 📜 **Admit Cards & Grade Sheets:** Download examination admit cards and semester grade cards.
- 👤 **Student Profile:** Review and update your official university profile.

💡 If you forgot your password, use the *Forgot Password* link or visit the Academic Section (Dean Office).`,
  },
  {
    keywords: ["attendance portal", "attendance check", "hbtu attendance", "attendance link", "75 attendance", "attendance rule"],
    response: `📊 **HBTU Attendance Portal & Regulations:**

Direct Link: [HBTU Student Attendance Portal](https://erp.hbtu.ac.in/StudentAttendance.aspx)

**Important Regulations:**
- ⚠️ **75% Mandatory Attendance:** A minimum of 75% attendance is required to appear for Mid-Semester and End-Semester examinations.
- 🔍 Subject-wise and cumulative attendance is updated periodically by course instructors.
- 🩺 In case of medical absence, submit official medical certificates to the Dean of Academic Affairs within the stipulated timeframe.

*Check your live attendance directly at [Attendance Portal](https://erp.hbtu.ac.in/StudentAttendance.aspx)!* 🎓`,
  },
  {
    keywords: ["digi shakti", "tablet portal", "tablet yojana", "smartphone yojana", "digishakti", "ekyc tablet", "ekyc"],
    response: `📱 **Digi Shakti Portal — UP Free Tablet & Smartphone Scheme:**

Direct Link: [https://digishakti.up.gov.in/](https://digishakti.up.gov.in/)

**Instructions for Students:**
- 🔹 Student records are uploaded directly to the state portal by the university administration.
- 🔹 Students only need to verify their credentials and complete **eKYC** when prompted on the portal.
- 🔹 Devices are distributed on campus once official university notification schedules are published.

*For inquiries, contact the Student Welfare Section on campus.* ✨`,
  },
  {
    keywords: ["up scholarship", "scholarship up", "scholarship.up.gov.in", "up scholarship portal", "fee reimbursement up"],
    response: `🏛️ **UP Scholarship & Fee Reimbursement Scheme:**

Direct Link: [https://scholarship.up.gov.in/index.aspx](https://scholarship.up.gov.in/index.aspx)

**Key Information for HBTU Students:**
1. **Application Category:** Apply under *Post-Matric Other Than Inter* for engineering and postgraduate courses.
2. **Required Documents:** Income Certificate, Caste Certificate, Domicile Certificate, Fee Receipt, Academic Marksheets, and Aadhaar-seeded Bank Account.
3. **Mandatory Hard Copy:** Print and submit your final application form with supporting proofs to the University Scholarship Office for verification.

*Also explore our [Scholarships Portal](/scholarship-portal) for corporate and CSR opportunities!* 🏆`,
  },
  {
    keywords: ["buddy4study", "buddy 4 study", "private scholarship", "scholarship list"],
    response: `🏆 **Buddy4Study Scholarships Portal:**

Direct Link: [https://www.buddy4study.com/scholarships](https://www.buddy4study.com/scholarships)

**Available Opportunities:**
- 💰 Corporate CSR Scholarships (Tata, Reliance, Infosys, HDFC, Kotak)
- 🎯 Merit-cum-Means Scholarships (₹50,000 to ₹2,00,000/year)
- 👩‍🎓 Special STEM & Women-in-Tech Scholarships

*Check our [Scholarships Portal](/scholarship-portal) for active deadlines and application guides!* 🌟`,
  },
  {
    keywords: ["ats resume", "ats score", "resume score", "resume checker", "resume analyzer", "ats kaise check"],
    response: `📄 **AI ATS Resume Scorer & Analyzer:**

Direct link: [ATS Resume Builder & Scorer](/ats-resume)

**Capabilities:**
- 🤖 **Direct PDF Scan:** Upload your resume PDF — AI scans every section, skill, and formatting layout.
- 📊 **ATS Score (0–100):** Real-time compatibility rating benchmarked against recruitment standards.
- 🎯 **Matched & Missing Keywords:** Pinpoints exact missing technical skills required by target job descriptions.
- ✍️ **Actionable Bullet Points:** Generates copy-paste ready, high-impact resume bullet points.

*Visit [ATS Resume Builder](/ats-resume) to analyze your resume today!* 🚀`,
  },
  {
    keywords: ["about hbtu", "hbtu overview", "hbtu college info", "hbtu kanpur info", "hbtu history"],
    response: `🎓 **About HBTU Kanpur & College Study Hub:**

- 🏛️ **Harcourt Butler Technical University (HBTU Kanpur):** Founded in 1921, upgraded to a premier state university in 2016.
- 🌐 **Official Portals:** [hbtu.ac.in](https://hbtu.ac.in/) | **ERP:** [erp.hbtu.ac.in](https://erp.hbtu.ac.in/NewIndex.html) | **Attendance:** [erp.hbtu.ac.in/StudentAttendance.aspx](https://erp.hbtu.ac.in/StudentAttendance.aspx)
- 🚀 **College Study Hub Platform:** Built by **Priyal Kumar** (Final Year CSE, HBTU Kanpur) specifically for the student community.
- 📚 **Coverage:** All 11 B.Tech branches (8 semesters), BS-MS, BBA, and MBA with 2500+ active students!

For inquiries or special student discounts, connect with Founder Priyal Kumar on WhatsApp: +91 89572 21543 🎉`,
  },
  {
    keywords: ["career roadmap", "fresher guide", "job roadmap", "career path", "after college", "fresher jobs"],
    response: `🎯 **Career Roadmaps & Job Guides:**

Direct link: [Premium Content](/premium-content) *(Premium Feature)*

**Includes:**
- Step-by-step fresher job preparation strategies
- Domain-specific career roadmaps (SDE, Data Science, DevOps, Cloud)
- Salary insights, interview benchmarks, and top target companies

**Access:** Contact Founder Priyal Kumar on WhatsApp (+91 89572 21543) for special student rates! 💎`,
  },
  {
    keywords: ["pyq", "pyqs", "previous year questions", "previous year papers", "past paper", "pyqs kahan", "old question papers"],
    response: `📝 **Previous Year Questions (PYQs):**

PYQs are integrated within branch and semester notes pages:
- CSE 4th Semester PYQs: [4th Semester CSE Notes](/fourth-semester-cse-notes)
- CSE 5th Semester PYQs: [5th Semester CSE Notes](/fifth-semester-cse-notes)
- 1st & 2nd Semester (All Branches): [First Semester Notes](/first-semester-notes) | [Second Semester Notes](/second-semester-notes)

💡 **Tip:** You can attach any question paper PDF or document directly in this chat to extract key topics and top probable questions! 🤖`,
  },
  {
    keywords: ["coding playground", "online compiler", "code compiler", "online ide", "code editor", "coding space"],
    response: `💻 **Coding Space & Online Compiler:**

Practice and execute code directly in your browser:
- 🚀 **Online Compiler & Playground:** [Coding Space](/coding-space)
- 📚 **Coding Study Material:** [Coding Study Material](/coding-study-material)

Supports C, C++, Java, Python, and JavaScript with fast client-side execution! ⚡`,
  },
  {
    keywords: ["hello", "hi", "hey", "namaste", "hii", "helo"],
    response: `👋 **Hello! Welcome to College Study Assistant!**

I am your official academic AI assistant for College Study Hub.

**Feel free to ask me about:**
- 📚 Branch & semester notes, syllabus, and PYQs
- 🏛️ HBTU portals (ERP, Attendance, Circulars)
- 🏆 UP Scholarships, corporate CSR grants, and Digi Shakti tablet scheme
- 📄 Resume ATS scoring & job description analysis
- 💼 Placement roadmaps, GATE Study Hub & career resources

How can I assist you today? 😊`,
  },
];

// ── System Prompt for AI API ─────────────────────────────────
export const buildSystemPrompt = (): string => {
  return `You are College Study Assistant, the official AI academic assistant for College Study Hub (college-study.netlify.app), built specifically for Harcourt Butler Technical University (HBTU Kanpur) students.
// [rag-build-step 21/25]: test(knowledge-base): verify unrelated queries return null from cache