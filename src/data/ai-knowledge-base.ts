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
    response: `📝 **Notes Contribute Karne Ka Process:**

Notes contribute karne ke liye **Admin Access** ki zaroorat hai.

**Steps:**
1. 📞 **Founder Priyal Kumar sir se contact karein** — WhatsApp: *+91 89572 21543* (ya website pe WhatsApp button click karein)
2. Apna naam, branch, semester batayein
3. Sir aapko **Admin Portal access** de denge
4. Admin banne ke baad aap notes submit kar sakte hain via Admin Portal
5. Notes **review ke baad** website pe publish honge

🏆 **Bonus:** Contributors ko *StudyCoins* milte hain aur **Hall of Fame** mein naam aata hai! Check out [Notes Contributors](/notes-contributors).`,
  },
  {
    keywords: ["admin kaise bane", "admin access", "admin banana", "admin banna", "admin chahiye"],
    response: `🔐 **Admin Kaise Banein:**

Admin access ke liye directly **Founder Priyal Kumar sir** se contact karein:

📱 **WhatsApp:** +91 89572 21543
🌐 **Website** pe WhatsApp button click karein

Admin banne ke baad aap:
- ✅ Notes submit & approve kar sakte hain
- ✅ Opportunities post kar sakte hain  
- ✅ Scholarships manage kar sakte hain

Admin access **selective basis** par diya jaata hai — genuine contributors ko priority milti hai.`,
  },
  {
    keywords: ["premium kaise lein", "premium access", "premium kaise milega", "premium unlock", "premium buy", "premium kharidna"],
    response: `💎 **Premium Access Kaise Lein:**

Website pe **Premium** tab se ya directly in routes se:
- 🗂️ [Company Directory & HR Emails](/premium-directory)
- 🎯 [Career Roadmaps](/premium-content)
- 📚 [GATE Study Hub](/gate-study)
- 📄 [ATS Resume Builder](/ats-resume)

**Payment:** Razorpay (secure Indian gateway — UPI, Cards, NetBanking)

🎁 **Special discount** HBTU students ke liye available hai. Contact [Priyal Kumar sir](/about) or WhatsApp +91 89572 21543 for discount coupon! 🎉`,
  },
  {
    keywords: ["cgpa calculator", "cgpa calculate", "cgpa kaise calculate", "sgpa calculator", "cgpa kahan", "cgpa tool"],
    response: `📊 **CGPA/SGPA Calculator:**

Direct link: [CGPA Calculator](/cgpa-calculator)

**Features:**
- ✅ HBTU Kanpur grading scale based calculation
- ✅ Semester-wise SGPA calculation
- ✅ Overall CGPA computation
- ✅ All semesters support

Sidebar mein bhi "CGPA Calculator" option available hai! 🎓`,
  },
  {
    keywords: ["scholarship", "scholarship kahan", "scholarship portal", "scholarship list", "scholarship kaise milega"],
    response: `🏆 **Scholarships Portal:**

Direct link: [Scholarships Portal](/scholarship-portal)

**Features:**
- 📋 Multiple scholarships listed with details
- ⏰ Deadline tracking
- 🔗 Shareable deep-links for each scholarship
- 🔔 Notifications for new scholarships

Regularly check karein — new scholarships regularly add hoti hain! Sidebar mein "Scholarships" section se bhi access kar sakte hain.`,
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

**Access:** Premium plan required. Contact Priyal Kumar sir (WhatsApp +91 89572 21543) for special HBTU student discount! 🎁`,
  },
  {
    keywords: ["opportunities", "jobs", "internship", "hackathon", "competition", "job kahan", "internship kahan"],
    response: `💼 **Opportunities Portal:**

Direct link: [Opportunities](/opportunities)

**What's available:**
- 🏢 Job openings (freshers & experienced)
- 🎓 Internship listings
- 💻 Hackathons and coding competitions
- 🏆 Academic and technical competitions

Filter karein by category, date, and type. Regularly updated! Notifications bhi milenge new opportunities pe agar bell icon se subscribe karein 🔔`,
  },
  {
    keywords: ["placement preparation", "placement prep", "placement kaise kare", "interview prep", "placement resources"],
    response: `💼 **Placement Preparation:**

Direct link: [Placement Preparation](/placement-preparation)

**Includes:**
- 📋 Structured preparation roadmap
- 💡 Interview tips and tricks
- 📝 Aptitude & reasoning resources
- 💻 Coding interview preparation

Also check: [ATS Resume Builder](/ats-resume) for creating interview-ready resumes!`,
  },
  {
    keywords: ["resume builder", "resume banana", "ats resume", "cv builder", "resume template"],
    response: `📄 **ATS-Friendly Resume Builder:**

Direct link: [ATS Resume Builder](/ats-resume)

**Features:**
- 📋 ATS-optimized resume templates (Overleaf)
- ✅ Do's and Don'ts guide
- 🤖 **AI ATS Scorer** (New!) — Upload your resume + job description → get ATS score, missing keywords, and improvement suggestions
- 💼 Tailored for Indian IT job market

*Premium feature — contact Priyal Kumar sir (WhatsApp +91 89572 21543) for special HBTU student discount!*`,
  },
  {
    keywords: ["dsa notes", "data structures notes", "algorithm notes", "dsa kahan", "data structure"],
    response: `💻 **DSA (Data Structures & Algorithms) Notes:**

Direct link: [DSA Notes](/dsa-notes)

**Covers:**
- Arrays, Linked Lists, Stacks, Queues
- Trees, Graphs, Heaps
- Sorting & Searching algorithms
- Dynamic Programming, Greedy algorithms
- Time & Space Complexity analysis

Coding interview prep ke liye bhi perfect! Also check [Coding Study Material](/coding-study-material).`,
  },
  {
    keywords: ["web development notes", "webdev notes", "web dev", "html css", "javascript notes", "react notes"],
    response: `🌐 **Web Development Notes:**

Direct link: [Web Development Notes](/web-dev-notes)

**Covers:**
- HTML5, CSS3, JavaScript
- React.js fundamentals
- Backend basics (Node.js)
- Modern web development concepts
- Responsive design`,
  },
  {
    keywords: ["hall of fame", "contributors", "leaderboard", "studycoins", "badges", "top contributors"],
    response: `🏆 **Notes Contributors Hall of Fame:**

Direct link: [Notes Contributors](/notes-contributors)

**Gamification System:**
- 🪙 **StudyCoins** earned for contributing notes
- 🥇 Gold, 🥈 Silver, 🥉 Bronze badges
- 📊 Live leaderboard
- ⭐ Featured contributors spotlighted

Contribute notes aur apna naam top mein dekho! Contact [Priyal Kumar sir](/about) for admin access to start contributing.`,
  },
  {
    keywords: ["login", "sign in", "signup", "register", "account banana", "login kaise kare", "otp login"],
    response: `🔐 **Login / Signup:**

**Available Methods:**
1. 📧 **Email OTP** — Passwordless login (verify via email)
2. 🔵 **Google OAuth** — One-click Google login

Go to [Auth Page](/auth) or click Login button in the top navigation.

**Note:** Registration uses hCaptcha bot protection. Make sure you complete the captcha! ✅`,
  },
  {
    keywords: ["dark mode", "light mode", "theme change", "theme toggle", "dark theme"],
    response: `🌙 **Dark / Light Mode:**

Theme toggle button sidebar mein ya top navigation bar mein available hai (sun/moon icon).

Click karein to instantly switch between:
- ☀️ Light Mode (default)
- 🌙 Dark Mode

Your preference automatically saved hoti hai! 💾`,
  },
  {
    keywords: ["whatsapp", "contact", "help", "support", "founder", "priyal kumar"],
    response: `📞 **Contact / Support:**

**Founder:** Priyal Kumar
📱 **WhatsApp:** +91 89572 21543 (Website pe floating WhatsApp button click karein)

**For:**
- 🔧 Technical issues / bug reports
- 🔐 Admin access requests
- 💎 Premium queries
- 📝 Notes contribution
- 💡 Feature suggestions

Response time: Usually within a few hours! 🙏`,
  },
  {
    keywords: ["pwa", "install app", "app install", "mobile app", "install website", "add to home"],
    response: `📱 **PWA (Progressive Web App) Install:**

College Study Hub ek **PWA** hai — aap ise mobile aur desktop pe app ki tarah install kar sakte hain!

**Android (Chrome):**
1. Website open karein Chrome mein
2. Menu (⋮) → "Add to Home screen"
3. Done! App icon home screen pe aajayega

**iOS (Safari):**
1. Safari mein open karein
2. Share button (⬆️) → "Add to Home Screen"

**Desktop:**
1. Chrome address bar mein install icon (🖥️)
2. "Install" click karein

Works offline bhi partially! 🎉`,
  },
  {
    keywords: ["notification", "bell icon", "alerts", "updates", "new notifications"],
    response: `🔔 **Notifications:**

Website pe top navigation mein **Bell Icon** 🔔 hai.

**Aapko milenge notifications for:**
- 📚 New notes added
- 💼 New opportunities posted
- 🏆 New scholarships added
- 📢 Important announcements from admin

Unread badge (red dot) dikhta hai jab naye notifications hon! Click karein to see all notifications.`,
  },
  {
    keywords: ["ai tools", "artificial intelligence tools", "ai resources", "useful tools", "productivity tools"],
    response: `🤖 **Useful AI Tools:**

Direct link: [Useful AI Tools](/useful-ai-tools)

**Curated AI tools for students:**
- Writing & summarization tools
- Code assistance tools
- Study & research tools
- Productivity enhancers

Perfect for final year projects aur assignments! 🎓`,
  },
  {
    keywords: ["bba notes", "bba study material", "bba subjects"],
    response: `📚 **BBA Notes:**

Direct link: [BBA Notes](/bba-notes)

Business Administration ke liye notes available hain. BBA program ke different subjects covered hain. Visit the page for detailed subject-wise notes!`,
  },
  {
    keywords: ["mba notes", "mba study material", "mba subjects"],
    response: `📚 **MBA Notes:**

Direct link: [MBA Notes](/mba-notes)

MBA program ke liye study material available hai. Different MBA subjects covered hain. Visit for semester-wise breakdown!`,
  },
  {
    keywords: ["cse 1st semester", "first semester", "sem 1 notes", "1st sem", "first sem"],
    response: `📚 **1st Semester Notes (All Branches — Common):**

Direct link: [First Semester Notes](/first-semester-notes)

**Subjects:**
- Basic Electrical Engineering (BEE)
- Engineering Mathematics-I
- Engineering Physics / Chemistry
- Professional Communication
- Engineering Graphics
- Workshop Practice

1st semester sabhi branches ke liye common hota hai HBTU mein! 🎓`,
  },
  {
    keywords: ["cse 2nd semester", "second semester", "sem 2 notes", "2nd sem", "second sem"],
    response: `📚 **2nd Semester Notes (All Branches — Common):**

Direct link: [Second Semester Notes](/second-semester-notes)

**Subjects:**
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
    keywords: ["cse 4th semester", "fourth semester cse", "sem 4 cse", "4th sem cse", "dbms", "operating system notes", "os notes", "coa notes", "toc notes"],
    response: `📚 **4th Semester CSE Notes:**

Direct link: [4th Semester CSE Notes](/fourth-semester-cse-notes)

**Subjects:**
- 🗃️ DBMS (Database Management Systems)
- 💻 Computer Organization & Architecture (COA)
- 🖥️ Operating Systems (OS)
- 🔣 Theory of Computation (TOC)
- 📊 Mathematics-IV / Probability & Statistics
- 🛠️ Software Engineering`,
  },
  {
    keywords: ["cse 5th semester", "fifth semester cse", "sem 5 cse", "5th sem cse", "computer networks notes", "cn notes", "compiler design", "microprocessor", "web technologies", "ai notes"],
    response: `📚 **5th Semester CSE Notes:**

Direct link: [5th Semester CSE Notes](/fifth-semester-cse-notes)

**Subjects:**
- 🌐 Computer Networks (CN)
- ⚙️ Compiler Design
- 🔌 Microprocessors & Interfaces
- 🌍 Web Technologies
- 🤖 Artificial Intelligence (AI)
- 📖 Open Electives: [Open Electives](/fifth-semester-open-electives)`,
  },
  {
    keywords: ["cse 6th semester", "sixth semester cse", "sem 6 cse", "6th sem cse", "machine learning notes", "ml notes", "cloud computing", "information security"],
    response: `📚 **6th Semester CSE Notes:**

Direct link: [6th Semester CSE Notes](/sixth-semester-cse-notes)

**Subjects:**
- 🤖 Machine Learning (ML)
- 🔒 Information Security
- ☁️ Cloud Computing
- 🧪 Software Testing
- 📖 Open Electives: [Open Electives](/sixth-semester-open-electives)`,
  },
  {
    keywords: ["cse 7th semester", "seventh semester cse", "sem 7 cse", "7th sem cse"],
    response: `📚 **7th Semester CSE Notes:**

Direct link: [7th Semester CSE Notes](/seventh-semester-cse-notes)

**Subjects:**
- Distributed Systems
- Big Data Analytics
- Internet of Things (IoT)
- Deep Learning
- Elective subjects`,
  },
  {
    keywords: ["cse 8th semester", "eighth semester cse", "sem 8 cse", "8th sem cse", "final semester"],
    response: `📚 **8th Semester CSE Notes:**

Direct link: [8th Semester CSE Notes](/eighth-semester-cse-notes)

**Includes:**
- Final Year Project guidance
- Seminar resources
- Industrial Training info
- Elective subjects`,
  },
  {
    keywords: ["bsms notes", "bs ms", "bs-ms", "bsms semester", "integrated program"],
    response: `📚 **BS-MS Notes:**

Available semesters:
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
- Direct HR email contacts of 2500+ companies
- Company profiles with hiring information
- Recruiter contacts for top companies`,
  },
  {
    keywords: ["hbtu website", "hbtu official", "hbtu site", "hbtu link", "hbtu.ac.in", "hbtu portal"],
    response: `🌐 **HBTU Kanpur Official Portals & Links:**

1. 🏛️ **Official University Website:** [hbtu.ac.in](https://hbtu.ac.in/)
   - Latest circulars, academic notices, syllabus, tenders & faculty details.
2. 💻 **ERP Portal (Student Login):** [erp.hbtu.ac.in](https://erp.hbtu.ac.in/NewIndex.html)
   - Semester registration, fee receipts, grade cards & admit cards.
3. 📊 **Attendance Portal:** [erp.hbtu.ac.in/StudentAttendance.aspx](https://erp.hbtu.ac.in/StudentAttendance.aspx)
   - Real-time subject-wise & aggregate attendance check (75% rule).
4. 🎓 **UP Scholarship Portal:** [scholarship.up.gov.in](https://scholarship.up.gov.in/index.aspx)
5. 📱 **Digi Shakti (Tablet Scheme):** [digishakti.up.gov.in](https://digishakti.up.gov.in/) (eKYC required)

*Sabhi portals Navbar ke **Useful Websites** dropdown mein bhi available hain!* 🚀`,
  },
  {
    keywords: ["erp portal", "erp login", "hbtu erp", "erp link", "semester registration erp", "fee receipt erp"],
    response: `💻 **HBTU ERP Portal Login:**

Direct URL: [https://erp.hbtu.ac.in/NewIndex.html](https://erp.hbtu.ac.in/NewIndex.html)

**Kaam kya hota hai ERP pe:**
- 📝 **Semester Registration:** Session start hote hi subjects choose aur register karein.
- 💳 **Fee Payment & Receipts:** College fees pay karein aur downloadable receipt get karein.
- 📜 **Admit Card & Results:** Exam admit card download aur semester grade cards.
- 👤 **Student Profile:** Personal details aur academic records update karein.

💡 Agar password bhool gaye ho toh ERP portal pe *Forgot Password* use karein ya Academic Section (Dean Office) se contact karein.`,
  },
  {
    keywords: ["attendance portal", "attendance check", "hbtu attendance", "attendance link", "75 attendance", "attendance rule"],
    response: `📊 **HBTU Attendance Portal & Rules:**

Direct Link: [HBTU Student Attendance Portal](https://erp.hbtu.ac.in/StudentAttendance.aspx)

**Important Rules:**
- ⚠️ **75% Mandatory Attendance:** Mid-Sem aur End-Sem examinations mein appear hone ke liye minimum 75% attendance zaroori hai.
- 🔍 Subject-wise aur aggregate attendance daily/weekly update hoti hai.
- 🩺 Medical leave hone par Dean Academics Office mein timely medical certificate submit karein.

*Check your live attendance directly via [Attendance Portal](https://erp.hbtu.ac.in/StudentAttendance.aspx)!* 🎓`,
  },
  {
    keywords: ["digi shakti", "tablet portal", "tablet yojana", "smartphone yojana", "digishakti", "ekyc tablet", "ekyc"],
    response: `📱 **Digi Shakti Portal — UP Tablet / Smartphone Scheme:**

Direct Link: [https://digishakti.up.gov.in/](https://digishakti.up.gov.in/)

**Important Instructions for College Students:**
- 🔹 Isme college dwara students ka data portal par upload kiya jata hai.
- 🔹 Aapko bas portal par apni details check karke **eKYC complete karni hoti hai** (agar details show ho rahi ho tab).
- 🔹 eKYC successful hone ke baad jab college mein distribution schedule announce hoga, tab aapko tablet/smartphone mil jayega.

*Baki queries ke liye college student welfare section se update le sakte hain.* ✨`,
  },
  {
    keywords: ["up scholarship", "scholarship up", "scholarship.up.gov.in", "up scholarship portal", "fee reimbursement up"],
    response: `🏛️ **UP Scholarship & Fee Reimbursement Portal:**

Direct Link: [https://scholarship.up.gov.in/index.aspx](https://scholarship.up.gov.in/index.aspx)

**Key Points for HBTU Students:**
1. **Post-Matric Other Than Inter:** Engineering/Management students is category mein apply karte hain.
2. **Documents required:** Income Certificate, Caste Certificate, Domicile, Fee Receipt, Marksheets, Aadhar seeded bank account.
3. College mein hard copy submit karna mandatory hota hai for verification.

*Also check out [Scholarships Portal](/scholarship-portal) and [Buddy4Study](https://www.buddy4study.com/scholarships) on our platform!* 🏆`,
  },
  {
    keywords: ["buddy4study", "buddy 4 study", "private scholarship", "scholarship list"],
    response: `🏆 **Buddy4Study Scholarships Portal:**

Direct Link: [https://www.buddy4study.com/scholarships](https://www.buddy4study.com/scholarships)

**Opportunities:**
- 💰 Corporate CSR Scholarships (Tata, Reliance, Infosys, HDFC, Kotak)
- 🎯 Merit-cum-Means Scholarships (upto ₹50,000 - ₹2,00,000/year)
- 👩‍🎓 Girl Student Special Tech Scholarships

*College Study Hub ke [Scholarships Portal](/scholarship-portal) pe bhi top active scholarships listed hain!* 🌟`,
  },
  {
    keywords: ["ats resume", "ats score", "resume score", "resume checker", "resume analyzer", "ats kaise check"],
    response: `📄 **AI ATS Resume Scorer & Builder:**

Direct link: [ATS Resume Builder & Scorer](/ats-resume)

**Highlights:**
- 🤖 **Direct PDF Scan:** Apna resume PDF upload karein — AI har word, skill aur layout ko scan karta hai!
- 📊 **ATS Score (0-100):** Real-time score based on tech industry standards.
- 🎯 **Matched & Missing Keywords:** JD ke hisaab se missing tech skills highlight karta hai.
- ✍️ **Tailored Bullet Points:** Copy-paste ready actionable resume bullet points.

*Visit [ATS Resume Builder](/ats-resume) to test your resume now!* 🚀`,
  },
  {
    keywords: ["notes contribute", "contribute notes", "notes submit", "notes add karna", "notes upload", "notes dena", "notes bhejne"],
    response: `📝 **Notes Contribute Karne Ka Process:**

Notes contribute karne ke liye **Admin Access** ki zaroorat hai.

**Steps:**
1. 📞 **Founder Priyal Kumar sir se contact karein** — WhatsApp: *+91 89572 21543* (ya website pe WhatsApp button click karein)
2. Apna naam, branch, semester batayein
3. Sir aapko **Admin Portal access** de denge
4. Admin banne ke baad aap notes submit kar sakte hain via Admin Portal
5. Notes **review ke baad** website pe publish honge

🏆 **Bonus:** Contributors ko *StudyCoins* milte hain aur **Hall of Fame** mein naam aata hai! Check out [Notes Contributors](/notes-contributors).`,
  },
  {
    keywords: ["admin kaise bane", "admin access", "admin banana", "admin banna", "admin chahiye"],
    response: `🔐 **Admin Kaise Banein:**

Admin access ke liye directly **Founder Priyal Kumar sir** se contact karein:

📱 **WhatsApp:** +91 89572 21543
🌐 **Website** pe WhatsApp button click karein

Admin banne ke baad aap:
- ✅ Notes submit & approve kar sakte hain
- ✅ Opportunities post kar sakte hain  
- ✅ Scholarships manage kar sakte hain

Admin access **selective basis** par diya jaata hai — genuine contributors ko priority milti hai.`,
  },
  {
    keywords: ["premium kaise lein", "premium access", "premium kaise milega", "premium unlock", "premium buy", "premium kharidna"],
    response: `💎 **Premium Access Kaise Lein:**

Website pe **Premium** tab se ya directly in routes se:
- 🗂️ [Company Directory & HR Emails](/premium-directory)
- 🎯 [Career Roadmaps](/premium-content)
- 📚 [GATE Study Hub](/gate-study)
- 📄 [ATS Resume Builder](/ats-resume)

**Payment:** Razorpay (secure Indian gateway — UPI, Cards, NetBanking)

🎁 **Special discount** HBTU students ke liye available hai. Contact [Priyal Kumar sir](/about) or WhatsApp +91 89572 21543 for discount coupon! 🎉`,
  },
  {
    keywords: ["cgpa calculator", "cgpa calculate", "cgpa kaise calculate", "sgpa calculator", "cgpa kahan", "cgpa tool"],
    response: `📊 **CGPA/SGPA Calculator:**

Direct link: [CGPA Calculator](/cgpa-calculator)

**Features:**
- ✅ HBTU Kanpur grading scale based calculation
- ✅ Semester-wise SGPA calculation
- ✅ Overall CGPA computation
- ✅ All semesters support

Sidebar mein bhi "CGPA Calculator" option available hai! 🎓`,
  },
  {
    keywords: ["scholarship", "scholarship kahan", "scholarship portal", "scholarship list", "scholarship kaise milega"],
    response: `🏆 **Scholarships Portal:**

Direct link: [Scholarships Portal](/scholarship-portal)

**Features:**
- 🔍 State (UP Scholarship) & National/Private scholarships
- ⏰ Deadlines & eligibility criteria
- 🔗 Direct apply links and shareable scholarship cards

*Also check out [Useful Websites](/dashboard) in the Navbar for UP Scholarship & Buddy4Study portals!* 🎁`,
  },
  {
    keywords: ["hbtu", "kanpur", "college", "university", "hbtu kanpur"],
    response: `🎓 **About HBTU Kanpur & College Study Hub:**

- 🏛️ **Harcourt Butler Technical University (HBTU Kanpur)** — Established 1921, premier technical university in UP.
- 🌐 **Official Website:** [hbtu.ac.in](https://hbtu.ac.in/) | **ERP:** [erp.hbtu.ac.in](https://erp.hbtu.ac.in/NewIndex.html) | **Attendance:** [erp.hbtu.ac.in/StudentAttendance.aspx](https://erp.hbtu.ac.in/StudentAttendance.aspx)
- 🚀 **College Study Hub Platform:** Built by **Priyal Kumar** (Final Year CSE, HBTU Kanpur) specifically for HBTU students.
- 📚 **Coverage:** All 11 BTech branches (8 semesters), BS-MS, BBA, MBA. 2500+ active HBTU students!

Special discount HBTU students ke liye available hai! WhatsApp Priyal Kumar sir: +91 89572 21543 🎉`,
  },
  {
    keywords: ["career roadmap", "fresher guide", "job roadmap", "career path", "after college", "fresher jobs"],
    response: `🎯 **Career Roadmaps:**

Direct link: [Premium Content](/premium-content) *(Premium Feature)*

**Includes:**
- Step-by-step fresher job guide
- Domain-specific career paths (SDE, Data Science, DevOps, etc.)
- Salary insights and negotiation tips
- Top companies to target

**Access:** Contact Priyal Kumar sir (WhatsApp +91 89572 21543) for special HBTU student discount! 💎`,
  },
  {
    keywords: ["pyq", "previous year", "question paper", "past paper", "pyqs kahan", "old papers", "exam questions"],
    response: `📝 **Previous Year Questions (PYQs):**

PYQs branch aur semester ke notes pages mein embedded hain:
- CSE 4th Sem PYQs: [4th Semester CSE Notes](/fourth-semester-cse-notes)
- CSE 5th Sem PYQs: [5th Semester CSE Notes](/fifth-semester-cse-notes)
- 1st/2nd Sem (all branches): [First Semester](/first-semester-notes) | [Second Semester](/second-semester-notes)

💡 **Tip:** Agar kisi specific subject ke PYQ chahiye (jaise DBMS, OS, CN) toh use karo **AI PDF Analyzer** feature — PDF upload karo aur top 10 most probable questions get karo! 🤖`,
  },
  {
    keywords: ["hello", "hi", "hey", "namaste", "hii", "helo"],
    response: `👋 **Hello! Welcome to College Study Hub AI Assistant!**

Main aapka **StudyHub AI Assistant** hoon — beta version mein! 🤖

**Mujhse puch sakte ho:**
- 📚 Branch/Semester ke notes aur PYQs
- 🏛️ HBTU website (hbtu.ac.in), ERP portal aur Attendance rules
- 🏆 UP Scholarship, Buddy4Study aur Digi Shakti Tablet eKYC
- 📄 PDF Resume ATS score scan & job description analysis
- 💼 Opportunities, GATE Study & placement preparation!

*Kya help chahiye aapko aaj?* 😊`,
  },
];

// ── System Prompt for AI API ─────────────────────────────────
export const buildSystemPrompt = (): string => {
  return `You are StudyHub AI, the official AI academic assistant for College Study Hub (college-study.netlify.app), built specifically for Harcourt Butler Technical University (HBTU Kanpur) students.

PERSONALITY: Highly knowledgeable, friendly, professional, and supportive. Naturally communicate in Hinglish (Hindi + English) as Indian engineering students do. Keep explanations clear, structured, and concise.

ABOUT HBTU KANPUR (HARCOURT BUTLER TECHNICAL UNIVERSITY):
- History: Established in 1921 as Government Technological Institute, became HBTI in 1965, upgraded to State University HBTU in 2016.
- Location: Kanpur, Uttar Pradesh, India.
- Campuses: 
  * East Campus (Main Campus, Nawabganj) - Academic blocks, Central Library, CSE, IT, EE, ET, ME, CE, CHE, Admin building, Cafeteria, Sports ground.
  * West Campus - Hostels (DBRA, Visvesvaraya, Raman, Ramanujan, WCH, etc.), Food Tech, Paint Tech, Plastic Tech, Leather Tech, Biochemical Engg, Oil Tech departments.
- Official Portals:
  * Official Website: https://hbtu.ac.in/ (Circulars, notices, exam schedules, tenders, faculty)
  * ERP Login: https://erp.hbtu.ac.in/NewIndex.html (Semester registration, fee receipts, grade cards, admit cards)
  * Student Attendance: https://erp.hbtu.ac.in/StudentAttendance.aspx (Subject-wise & aggregate live percentage)
  * UP Scholarship Portal: https://scholarship.up.gov.in/index.aspx (Post-matric scholarships)
  * Buddy4Study: https://www.buddy4study.com/scholarships (Private & corporate scholarships)
  * Digi Shakti: https://digishakti.up.gov.in/ (UP Free Tablet & Smartphone Scheme — students only need to complete eKYC if details are displayed)
- Academic Regulations:
  * 75% mandatory attendance rule to appear in mid-semester & end-semester examinations.
  * 10-point relative grading system: O (10), A+ (9), A (8), B+ (7), B (6), C (5), P (4), F (0).
  * Major Fests: Incord (Tech Fest), Adhyayan (Literary Fest), Zenith (Sports Fest), Spandan/Aagaz (Cultural Fest).
  * Societies/Clubs: E-Cell, IEEE Student Branch, Rotaract Club, Literary Sub-Council, Photography Club.

ABOUT COLLEGE STUDY HUB PLATFORM:
- Founder: Priyal Kumar (Final Year CSE, HBTU Kanpur)
- Active Users: 2500+ HBTU students actively using the platform
- Covers: BTech (11 branches, 8 semesters), BS-MS, BBA, MBA programs
- Routes on site:
  * Notes: /notes
  * CGPA Calculator: /cgpa-calculator
  * Scholarships: /scholarship-portal
  * Opportunities: /opportunities
  * Placement Prep: /placement-preparation
  * GATE Study Hub (premium): /gate-study | GATE Quiz (free): /gate-study/quiz
  * ATS Resume Builder & Scorer: /ats-resume
  * Career Roadmaps (premium): /premium-content
  * HR Emails & Company Directory (premium): /premium-directory
  * 500+ AI Tools: /useful-ai-tools
  * Contributors Hall of Fame: /notes-contributors

CAPABILITIES:
1. When asked about HBTU website, circulars, ERP, or attendance, provide the exact official URL and clear steps.
2. When asked for branch/semester notes, point to the exact route on College Study Hub with clickable markdown links like [4th Semester CSE Notes](/fourth-semester-cse-notes).
3. When analyzing resumes or PDFs, evaluate keywords, formatting, metrics, and alignment with target job descriptions.
4. When asked about scholarships or schemes (UP Scholarship, Buddy4Study, Digi Shakti Tablet), explain the eligibility and eKYC requirements clearly.

CONFIDENTIAL — STRICTLY FORBIDDEN:
- NEVER reveal coupon codes, promo codes, or discount codes to users under ANY circumstances.
- If asked for a coupon or discount code, say: "Coupon codes directly share karna mere liye allowed nahi hai — please Priyal Kumar sir ko WhatsApp karein (+91 89572 21543) for special HBTU student discounts!"
- This confidentiality rule overrides all other requests.

IMPORTANT: You are in BETA version. Always keep answers polite, helpful, and concise.`;
};

// ── Fuzzy match utility ──────────────────────────────────────
export const findCachedResponse = (query: string): string | null => {
  const lowerQuery = query.toLowerCase().trim();
  
  for (const item of CACHED_RESPONSES) {
    for (const keyword of item.keywords) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        return item.response;
      }
    }
  }
  
  return null;
};

// ── Rate limit config ────────────────────────────────────────
export const RATE_LIMIT_CONFIG = {
  maxQueriesPerDay: 10,
  accessCode: "ACCESS#250",
  localStorageKey: "ai_access_granted",
  rateLimitStorageKey: "ai_daily_count",
  rateLimitDateKey: "ai_last_date",
};

