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
  coupon: "HBTU@1843 — gives 100% discount for HBTU students (limited time)",
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

🎁 **Special Coupon for HBTU Students:** \`HBTU@1843\` — **100% FREE access!**

Bas coupon apply karein checkout pe aur instant access milega! 🎉`,
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

**Access:** Premium plan required. Use coupon \`HBTU@1843\` for 100% free access! 🎁`,
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

*Premium feature — use coupon \`HBTU@1843\` for free access!*`,
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
- Recruiter contacts for top companies

**Access:** Premium plan required. Coupon \`HBTU@1843\` = 100% FREE for HBTU students! 🎁`,
  },
  {
    keywords: ["hbtu", "kanpur", "college", "university", "hbtu kanpur"],
    response: `🎓 **About College Study Hub:**

College Study Hub is built **specifically for HBTU Kanpur students** by students!

**Platform built by:** Priyal Kumar (Final Year CSE, HBTU Kanpur)

**Covers:** All BTech branches (11 branches, 8 semesters), BS-MS, BBA, MBA programs

**Live Users:** 2500+ HBTU students actively using the platform

Special coupon for HBTU students: \`HBTU@1843\` — 100% free premium access! 🎉`,
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

**Access:** Use coupon \`HBTU@1843\` for 100% free access! 💎`,
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
    keywords: ["normalization", "dbms normalization", "normal forms", "1nf 2nf 3nf", "bcnf"],
    response: `📚 **Normalization (DBMS):**

Normalization DBMS ka part hai — notes available hain:
📂 [4th Semester CSE Notes](/fourth-semester-cse-notes) (DBMS section)

**Normalization covers:**
- 1NF (First Normal Form)
- 2NF (Second Normal Form)  
- 3NF (Third Normal Form)
- BCNF (Boyce-Codd Normal Form)
- 4NF, 5NF

💡 PYQ analyze karne ke liye AI PDF Analyzer use karein — DBMS PYQ PDF upload karein aur probable questions get karein! 🤖`,
  },
  {
    keywords: ["hello", "hi", "hey", "namaste", "hii", "helo"],
    response: `👋 **Hello! Welcome to College Study Hub AI Assistant!**

Main aapka **StudyHub AI Assistant** hoon — beta version mein! 🤖

**Mujhse puch sakte ho:**
- 📚 Notes kahan hain (branch + semester specific)
- 🏆 Scholarship information
- 💼 Opportunities & placement resources  
- 🎓 Premium features & access
- 📝 Notes contribute karne ka process
- 📄 PDF analyze (PYQs, notes)
- 💡 Kuch bhi website ke baare mein!

*Kya help chahiye aapko?* 😊`,
  },
  {
    keywords: ["what can you do", "kya kar sakte ho", "help kya karoge", "features kya hain", "capabilities"],
    response: `🤖 **StudyHub AI Assistant — What I Can Do:**

**1. 📚 Notes Search**
- Branch + Semester specific notes dhundna
- Subject-wise resources batana
- Direct links dena

**2. 🧭 Website Navigation**
- Kisi bhi feature ka location batana
- Premium features explain karna

**3. 📄 PDF Analyzer** *(Upload button se)*
- PYQ PDF upload karein
- Top 10 most probable questions generate
- Notes summary create

**4. 📝 ATS Resume Scorer** *(Resume page pe)*
- Resume + Job Description → ATS Score
- Missing keywords highlight
- Improvement suggestions

**5. 💬 General Academic Help**
- HBTU specific queries
- Scholarship, opportunities guidance

*Puchho jo bhi chahiye!* 🎓`,
  },
];

// ── System Prompt for AI API ─────────────────────────────────
export const buildSystemPrompt = (): string => {
  return `You are StudyHub AI, the official AI assistant for College Study Hub (college-study.netlify.app), an academic platform built specifically for HBTU Kanpur students.

PERSONALITY: Professional, friendly, helpful. Use a mix of Hindi and English (Hinglish) naturally since users are Indian students. Always be concise but complete.

ABOUT THE PLATFORM:
- Built by Priyal Kumar (Founder, Final Year CSE, HBTU Kanpur)
- Serves 2500+ HBTU Kanpur students
- Covers: BTech (11 branches, 8 semesters), BS-MS, BBA, MBA programs
- Tech: React, TypeScript, Supabase, Tailwind CSS

AVAILABLE NOTES:
- BTech 1st Sem: /first-semester-notes (all branches, common)
- BTech 2nd Sem: /second-semester-notes (all branches, common)
- BTech 3rd Sem CSE: /third-semester-cse-notes (Data Structures, Digital Electronics, Discrete Math, OOP, Math-III)
- BTech 4th Sem CSE: /fourth-semester-cse-notes (DBMS, COA, OS, TOC, Probability, Software Engg)
- BTech 5th Sem CSE: /fifth-semester-cse-notes (CN, Compiler Design, Microprocessors, Web Tech, AI)
- BTech 6th Sem CSE: /sixth-semester-cse-notes (ML, Info Security, Cloud Computing, Software Testing)
- BTech 7th Sem CSE: /seventh-semester-cse-notes
- BTech 8th Sem CSE: /eighth-semester-cse-notes
- Other branches (ME, CE, CH, EE, ET, BE, FT, LFT, OT, PT, PL): Available for 3rd-6th semesters
- DSA Notes: /dsa-notes | Web Dev: /web-dev-notes | Coding: /coding-study-material
- BBA: /bba-notes | MBA: /mba-notes | BS-MS: /bsms-sem3-notes, /bsms-sem4-notes, /bsms-sem5-notes, /bsms-sem6-notes

KEY FEATURES & PATHS:
- CGPA Calculator: /cgpa-calculator
- Scholarships: /scholarship-portal
- Opportunities (jobs/internships): /opportunities
- Placement Prep: /placement-preparation
- GATE Study (premium): /gate-study | GATE Quiz (free): /gate-study/quiz
- ATS Resume Builder (premium): /ats-resume
- Career Roadmaps (premium): /premium-content
- HR Emails & Company Directory (premium): /premium-directory
- AI Tools: /useful-ai-tools
- Contributors Hall of Fame: /notes-contributors

PREMIUM ACCESS:
- Coupon HBTU@1843 = 100% FREE for HBTU students
- Payment via Razorpay (UPI, Cards, NetBanking)

NOTES CONTRIBUTION:
- Must become admin first
- Contact Priyal Kumar sir: WhatsApp +91 89572 21543
- Admin portal → submit notes → review → publish

FORMATTING RULES:
- Always format responses in Markdown
- Use bullet points for lists
- Include direct clickable paths like [Notes](/path) when relevant
- Keep responses concise (under 200 words unless it's a complex question)
- Use emojis appropriately for a friendly tone
- If unsure, say "Main is baare mein sure nahi hoon, please WhatsApp karo Priyal Kumar sir ko: +91 89572 21543"

IMPORTANT: You are in BETA mode. If asked about beta status, say "Haan, main abhi beta version mein hoon — limited users ke liye available. Full rollout jald hi aayega! 🚀"`;
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
