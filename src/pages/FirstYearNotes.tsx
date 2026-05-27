import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import firstSemImg from "@/assets/sem1-thumbnail-new.png";
import secondSemImg from "@/assets/sem2-thumbnail-new.png";

const FirstYearNotes = () => {
  const navigate = useNavigate();

  const handleWhatsAppShare = (semName: string, route: string) => {
    const shareUrl = `${window.location.origin}${route}`;
    const message = `Check out ${semName} B.Tech Notes on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const semesters = [
    {
      name: "1st Semester",
      description: "Foundation courses and basic engineering principles",
      available: true,
      route: "/first-semester",
      thumbnail: firstSemImg,
      subjects: ["Mathematics-I", "Physics", "Chemistry", "Engineering Drawing", "BEE"],
      enggLabel: "Engg. Branch - 1st Sem",
      techLabel: "Technology Branch - 2nd Sem",
    },
    {
      name: "2nd Semester",
      description: "Continuation of foundation courses with practical focus",
      available: true,
      route: "/second-semester",
      thumbnail: secondSemImg,
      subjects: ["Mathematics-II", "Physics", "Chemistry", "Programming", "Engineering Mechanics"],
      enggLabel: "Engg. Branch - 2nd Sem",
      techLabel: "Technology Branch - 1st Sem",
    },
  ];

  const handleSemesterClick = (semester: typeof semesters[0]) => {
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
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">B.Tech 1st Year</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            1st Year Notes
          </h1>
          <p className="text-sm opacity-50 mb-8 max-w-xl">Foundation courses covering basic engineering principles for all branches.</p>
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
                    <div className="flex items-center gap-1.5 flex-wrap mb-2">
                      <span className="text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                        {semester.enggLabel}
                      </span>
                      <span className="text-[10px] font-bold tracking-wider uppercase bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 px-2.5 py-0.5 rounded-full">
                        {semester.techLabel}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-2">
                      {semester.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {semester.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {semester.subjects.map((subject) => (
                      <Badge key={subject} variant="outline" className="text-[10px] py-0 px-2 font-medium">
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
                      onClick={(e) => { e.stopPropagation(); handleSemesterClick(semester); }}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      View Notes
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

export default FirstYearNotes;
