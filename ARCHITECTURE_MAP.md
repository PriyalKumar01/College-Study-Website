# StudyHub Unlocked Nexus - Architecture & Context Map

> **Note for AI Assistants**: Read this file first instead of scanning all repository files. It contains the complete architectural blueprint, route mappings, data models, Supabase tables, and state management flow.

---

## 1. Project Overview & Tech Stack
- **Framework**: React 18 (Vite + TypeScript)
- **UI & Styling**: Tailwind CSS, Lucide React, Framer Motion, Radix UI (shadcn/ui)
- **Backend & Database**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Netlify / Vercel
- **Payments**: Razorpay (Payment buttons & verification)

---

## 2. Key Directories & Structure
\\\
src/
├── components/          # Reusable UI & Modal components
│   ├── admin/           # Admin/Owner upload & management modals
│   ├── ui/              # shadcn/ui base primitives (dialog, button, etc.)
│   ├── AppSidebar.tsx   # Global sidebar with routes, profile, & opp badge
│   ├── AuthModal.tsx    # Sign-in/Sign-up modal (Email OTP & Google)
│   ├── Navbar.tsx       # Top navigation header
│   └── NotificationBell # Global notification dropdown
├── contexts/            # React contexts (AuthContext.tsx, ThemeContext.tsx)
├── hooks/               # Custom React hooks (useCommunityNotes, etc.)
├── integrations/        # Supabase client singleton (@/integrations/supabase/client)
├── lib/                 # Utilities (downloadUtils.ts, utils.ts)
└── pages/               # Route page components
\\\

---

## 3. Database Tables & Buckets (Supabase)

### PostgreSQL Tables
- **notes**: Contains community notes & uploaded PYQs (\id, title, subject, semester, material_type, file_url, file_name, uploaded_at, user_name, description, year, status\).
- **opportunities**: Jobs, Internships, Hackathons (\id, title, company, type, location, link, created_at, ...\).
- **scholarships**: Active scholarship listings (\id, title, amount, provider, link, approval_status, amount_num, ...\).
- **profiles**: User profile data (\id, avatar_url, first_name, last_name, college, branch, year\).
- **admin_roles**: Roles mapped by user ID (\id, user_id, role, created_at\).
- **premium_purchases**: Paid unlocks (\id, user_id, user_email, plan, payment_status, razorpay_payment_id\).
- **notifications**: Broadcast system announcements (\id, title, body, sent_by, created_at, is_active\).
- **user_notification_reads**: Read status per user (\user_id, notification_id\).

### Storage Buckets
- **study-materials**: Public storage for uploaded PDFs. Cache header: \31536000\ (1 year).
- **avatars**: User profile picture uploads.
- **scholarship-images**: Logo/banners for scholarship posts.

---

## 4. Notes & Download Architecture
- **Curated / Core Syllabus Notes (95%)**: Stored as direct Google Drive view/download links in hardcoded semester files (\FirstSemesterNotes.tsx\ to \EighthSemesterCSENotes.tsx\, \BSMSSem*.tsx\).
- **Community Uploads (5%)**: Uploaded to Supabase Storage bucket \study-materials\ and recorded in \
otes\ table.
- **Download Helper (\src/lib/downloadUtils.ts\)**:
  - \iewInBrowser(url)\: Converts Drive links to \/view\ preview URLs or opens links directly.
  - \smartDownload(url, title)\: Converts Drive links to direct \uc?export=download\ to download directly from Google servers with zero backend egress.

---

## 5. Performance & Egress Caching Rules
1. **Client Caching**: \useCommunityNotes\, \Opportunities\, \ScholarshipsPortal\, \NotificationBell\, and \AppSidebar\ maintain 5–15 minute \sessionStorage\ / in-memory cache to prevent repetitive database PostgREST requests.
2. **Selective Columns**: Always query explicit columns (\select('id, title, ...')\) rather than \select('*')\ on large tables.
3. **Storage Headers**: Always specify \cacheControl: '31536000'\ on Supabase storage uploads so client browsers do not re-fetch existing assets.
