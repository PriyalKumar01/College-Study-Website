import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import thirdSemImg from "@/assets/sem3-thumbnail-new.png";
import fourthSemImg from "@/assets/sem4-thumbnail-new.png";
import fifthSemImg from "@/assets/5th-sem-thumbnail.jpg";
import sixthSemImg from "@/assets/6th-sem-thumbnail.jpg";
import seventhSemImg from "@/assets/7th-sem-thumbnail-new.png";
import eighthSemImg from "@/assets/8th-sem-thumbnail-new.png";

const BTechSemesters = () => {
  const navigate = useNavigate();
  const { year } = useParams<{ year: string }>();

  const handleWhatsAppShare = (semName: string, route: string) => {
    const shareUrl = `${window.location.origin}${route}`;
    const message = `Check out ${semName} B.Tech Notes on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const semestersByYear: Record<string, any[]> = {
    "second-year": [
      {
        name: "3rd Semester",
        description: "Core branch subjects and practical applications",
        available: true,
        route: "/btech-notes/second-year/semester-3",
        thumbnail: thirdSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT", "PT", "PL", "FT", "OT", "BT"],
      },
      {
        name: "4th Semester",
        description: "Advanced core subjects with lab work",
        available: true,
        route: "/btech-notes/second-year/semester-4",
        thumbnail: fourthSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT", "PT", "PL", "FT", "OT", "BT"],
      },
    ],
    "third-year": [
      {
        name: "5th Semester",
        description: "Specialization courses and electives",
        available: true,
        route: "/btech-notes/third-year/semester-5",
        thumbnail: fifthSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT", "PT", "FT", "OT"],
      },
      {
        name: "6th Semester",
        description: "Advanced specialization and project work",
        available: true,
        route: "/btech-notes/third-year/semester-6",
        thumbnail: sixthSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT", "PT", "FT", "OT"],
      },
    ],
    "fourth-year": [
      {
        name: "7th Semester",
        description: "Final year electives and major project",
        available: true,
        route: "/btech-notes/fourth-year/semester-7",
        thumbnail: seventhSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT"],
      },
      {
        name: "8th Semester",
        description: "Project completion and placement preparation",
        available: true,
        route: "/btech-notes/fourth-year/semester-8",
        thumbnail: eighthSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT"],
      },
    ],
  };

  const semesters = semestersByYear[year || ""] || [];
  const yearName = year?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase());

  const handleSemesterClick = (semester: any) => {
    if (semester.available) {
      navigate(semester.route);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-14 pb-10 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/btech-notes")}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Years
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">B.Tech Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            {yearName} Semesters
          </h1>
          <p className="text-sm opacity-50 mb-8 max-w-xl">Select a semester to access branch-specific study materials and resources.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full mb-12">
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-6">Select Semester</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {semesters.map((semester, index) => (
            <motion.div
              key={semester.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div
                className={`group border border-border bg-card rounded-xl overflow-hidden flex flex-col transition-all duration-300 h-full relative hover:border-foreground/30 hover:shadow-lg`}
                onClick={() => handleSemesterClick(semester)}
                style={{ cursor: 'pointer' }}
              >
                {/* Share button */}
                <button
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-green-600 hover:scale-110 transition-all shadow-sm"
                  onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(semester.name, semester.route); }}
                  title="Share on WhatsApp"
                >
                  <Share2 className="h-4 w-4" />
                </button>

                {/* Thumbnail */}
                <div className="relative w-full h-48 overflow-hidden bg-muted">
                  <img
                    src={semester.thumbnail}
                    alt={semester.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={semester.available ? "default" : "secondary"} className="text-[10px] tracking-wide uppercase">
                        {semester.available ? "Available" : "Coming Soon"}
                      </Badge>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-2">
                      {semester.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {semester.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {semester.branches.slice(0, 6).map((branch: string) => (
                      <Badge key={branch} variant="outline" className="text-[10px] py-0 px-2 font-medium">
                        {branch}
                      </Badge>
                    ))}
                    {semester.branches.length > 6 && (
                      <Badge variant="outline" className="text-[10px] py-0 px-2 font-medium text-muted-foreground">
                        +{semester.branches.length - 6} more
                      </Badge>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
                      onClick={(e) => { e.stopPropagation(); handleSemesterClick(semester); }}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Select Branch
                    </button>
                  </div>
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

export default BTechSemesters;
