import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Share2, Lock, GraduationCap, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const years = [
  {
    name: "1st Year",
    description: "Foundation courses covering basic engineering principles, physics, chemistry, and mathematics",
    available: true,
    route: "/btech-notes/first-year",
    image: "/btech_year1.png",
    semesters: ["1st Semester", "2nd Semester"],
  },
  {
    name: "2nd Year",
    description: "Core branch subjects with practical applications, data structures, and engineering fundamentals",
    available: true,
    route: "/btech-notes/second-year",
    image: "/btech_year2.png",
    semesters: ["3rd Semester", "4th Semester"],
  },
  {
    name: "3rd Year",
    description: "Advanced topics, branch specializations, core labs, and GATE preparation notes",
    available: true,
    route: "/btech-notes/third-year",
    image: "/btech_year3.png",
    semesters: ["5th Semester", "6th Semester"],
  },
  {
    name: "4th Year",
    description: "Final year projects, advanced electives, placement preparation, and industry skills",
    available: true,
    route: "/btech-notes/fourth-year",
    image: "/btech_year4.png",
    semesters: ["7th Semester", "8th Semester"],
  },
];

const BTechYears = () => {
  const navigate = useNavigate();

  const handleWhatsAppShare = (yearName: string, route: string) => {
    const shareUrl = `${window.location.origin}${route}`;
    const message = `Check out ${yearName} B.Tech Notes on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* Hero Banner Header — Responsive */}
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate("/notes")}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider opacity-60 hover:opacity-100 transition-opacity mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Categories
          </button>

          {/* Badges row */}
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <div className="w-10 h-10 rounded-xl bg-background/10 border border-background/20 flex items-center justify-center text-primary shadow-inner">
              <GraduationCap className="h-5 w-5 text-current" />
            </div>
            <span className="bg-blue-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              + OFFICIAL HBTU CURRICULUM
            </span>
            <span className="bg-emerald-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> ALL 4 YEARS ACTIVE
            </span>
          </div>

          {/* Title and description */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3">
            B.Tech Notes by Year
          </h1>
          <p className="opacity-70 text-sm sm:text-base max-w-2xl leading-relaxed">
            Select your academic year to access verified notes, subject playlists, drive folders, and PYQs.
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {years.map((year, index) => (
            <motion.div
              key={year.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className="group"
            >
              <div
                className={`h-full rounded-2xl bg-card border border-border shadow-md hover:shadow-xl overflow-hidden flex flex-col transition-all duration-300 ${
                  year.available ? "cursor-pointer hover:-translate-y-1 hover:border-primary/40" : "opacity-60 cursor-not-allowed"
                }`}
                onClick={() => year.available && navigate(year.route)}
              >
                {/* Image Banner */}
                <div className="relative h-56 overflow-hidden bg-muted">
                  <img
                    src={year.image}
                    alt={year.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${year.available ? "group-hover:scale-105" : ""}`}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Share button */}
                  {year.available && (
                    <button
                      className="absolute top-4 right-4 z-10 w-9 h-9 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:scale-110 transition-all border border-border shadow-md"
                      onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(year.name, year.route); }}
                      title="Share on WhatsApp"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  )}

                  {!year.available && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-background/80 backdrop-blur-sm text-foreground text-xs font-bold px-4 py-2 rounded-full border border-border">
                        🔒 Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Overlay tags */}
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                    <div className="flex gap-2">
                      {year.semesters.map((sem) => (
                        <span key={sem} className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-black/40 text-white border border-white/20 backdrop-blur-sm">
                          {sem}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-6 gap-4">
                  <h2 className="text-2xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {year.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{year.description}</p>

                  {year.available ? (
                    <button
                      onClick={() => navigate(year.route)}
                      className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 border border-slate-700 dark:border-slate-300 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <BookOpen className="h-4 w-4" />
                      View Notes & Materials
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-muted text-muted-foreground cursor-not-allowed border border-border"
                    >
                      <Lock className="h-4 w-4" />
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BTechYears;

