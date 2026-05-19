import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Share2, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const years = [
  {
    name: "1st Year",
    description: "Foundation courses covering basic engineering principles",
    available: true,
    route: "/btech-notes/first-year",
    image: "/btech_year1.png",
    semesters: ["1st Semester", "2nd Semester"],
  },
  {
    name: "2nd Year",
    description: "Core branch subjects with practical applications",
    available: true,
    route: "/btech-notes/second-year",
    image: "/btech_year2.png",
    semesters: ["3rd Semester", "4th Semester"],
  },
  {
    name: "3rd Year",
    description: "Advanced topics and specialization courses",
    available: true,
    route: "/btech-notes/third-year",
    image: "/btech_year3.png",
    semesters: ["5th Semester", "6th Semester"],
  },
  {
    name: "4th Year",
    description: "Final year projects and elective subjects",
    available: false,
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
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #eef2ff 0%, #e8f0fe 40%, #f0f4ff 100%)" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button
            onClick={() => navigate("/notes")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Notes
          </button>

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              B.Tech Notes by Year
            </h1>
            <p className="text-base text-gray-500 max-w-xl mx-auto">
              Select your academic year to access comprehensive study materials
            </p>
          </div>
        </motion.div>

        {/* Year Cards — 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 max-w-4xl mx-auto">
          {years.map((year, index) => (
            <motion.div
              key={year.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={year.available ? { y: -6, scale: 1.02 } : {}}
              className="group"
            >
              <div
                className={`h-full rounded-2xl bg-white shadow-md overflow-hidden flex flex-col transition-all duration-300 ${
                  year.available ? "cursor-pointer hover:shadow-2xl" : "opacity-60 cursor-not-allowed"
                }`}
                onClick={() => year.available && navigate(year.route)}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={year.image}
                    alt={year.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${year.available ? "group-hover:scale-105" : ""}`}
                    onError={(e) => {
                      // Fall back to existing asset thumbnail
                      e.currentTarget.src = year.fallbackImg;
                    }}
                  />

                  {/* Share button */}
                  {year.available && (
                    <button
                      className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-green-600 hover:bg-white hover:scale-110 transition-all shadow-md"
                      onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(year.name, year.route); }}
                      title="Share on WhatsApp"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  )}

                  {!year.available && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                        🔒 Coming Soon
                      </span>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-xl font-bold ${year.available ? "text-gray-900 group-hover:text-blue-600" : "text-gray-400"} transition-colors`}>
                      {year.name}
                    </h3>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      {year.semesters.map((sem) => (
                        <span key={sem} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {sem}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{year.description}</p>

                  {year.available ? (
                    <button
                      onClick={() => navigate(year.route)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                      style={{ background: "linear-gradient(135deg, #4f46e5, #2563eb)" }}
                    >
                      <BookOpen className="h-4 w-4" />
                      View Notes
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
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
    </div>
  );
};

export default BTechYears;
