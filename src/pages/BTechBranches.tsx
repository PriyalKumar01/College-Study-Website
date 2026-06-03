import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import cseItImg from "@/assets/cse-it-thumbnail-new.png";
import meImg from "@/assets/me-thumbnail-new.png";
import ceImg from "@/assets/ce-thumbnail-new.png";
import cheImg from "@/assets/che-thumbnail-new.png";
import etImg from "@/assets/et-thumbnail-new.png";
import eeImg from "@/assets/ee-thumbnail-new.png";
import beImg from "@/assets/be-thumbnail-new.png";
import lftImg from "@/assets/lft-thumbnail-new.png";
import ptImg from "@/assets/pt-thumbnail-new.png";
import plImg from "@/assets/pl-thumbnail-new.png";
import ftImg from "@/assets/ft-thumbnail-new.png";
import otImg from "@/assets/ot-thumbnail-new.png";
import btImg from "@/assets/bt-thumbnail-new.png";

const BTechBranches = () => {
  const navigate = useNavigate();
  const { year, semester } = useParams<{ year: string; semester: string }>();

  const getRoute = (branchKey: string) => {
    const routes: Record<string, Record<string, string>> = {
      'CSE/IT': {
        'semester-3': '/third-semester-cse',
        'semester-4': '/fourth-semester-cse',
        'semester-5': '/fifth-semester-cse',
        'semester-6': '/sixth-semester-cse',
        'semester-7': '/seventh-semester-cse',
        'semester-8': '/eighth-semester-cse',
      },
      'CHE': {
        'semester-3': '/third-semester-che',
        'semester-4': '/fourth-semester-che',
        'semester-5': '/fifth-semester-che',
        'semester-6': '/sixth-semester-che',
      },
      'ME': {
        'semester-3': '/third-semester-me',
        'semester-4': '/fourth-semester-me',
        'semester-5': '/fifth-semester-me',
        'semester-6': '/sixth-semester-me',
      },
      'CE': {
        'semester-3': '/third-semester-ce',
        'semester-4': '/fourth-semester-ce',
        'semester-5': '/fifth-semester-ce',
        'semester-6': '/sixth-semester-ce',
      },
      'ET': {
        'semester-3': '/third-semester-et',
        'semester-4': '/fourth-semester-et',
        'semester-5': '/fifth-semester-et',
        'semester-6': '/sixth-semester-et',
      },
      'EE': {
        'semester-3': '/third-semester-ee',
        'semester-4': '/fourth-semester-ee',
        'semester-5': '/fifth-semester-ee',
        'semester-6': '/sixth-semester-ee',
      },
      'BE': {
        'semester-3': '/third-semester-be',
        'semester-4': '/fourth-semester-be',
        'semester-5': '/fifth-semester-be',
        'semester-6': '/sixth-semester-be',
      },
      'LFT': {
        'semester-3': '/third-semester-lft',
        'semester-4': '/fourth-semester-lft',
        'semester-5': '/fifth-semester-lft',
        'semester-6': '/sixth-semester-lft',
      },
      'PT': { 
        'semester-3': '/third-semester-pt', 
        'semester-4': '/fourth-semester-pt', 
        'semester-5': '/fifth-semester-pt', 
        'semester-6': '/sixth-semester-pt' 
      },
      'FT': { 
        'semester-3': '/third-semester-ft', 
        'semester-4': '/fourth-semester-ft', 
        'semester-5': '/fifth-semester-ft', 
        'semester-6': '/sixth-semester-ft' 
      },
      'OT': { 
        'semester-3': '/third-semester-ot', 
        'semester-4': '/fourth-semester-ot', 
        'semester-5': '/fifth-semester-ot', 
        'semester-6': '/sixth-semester-ot' 
      },
      'BT': { 
        'semester-3': '/third-semester-bt', 
        'semester-4': '/fourth-semester-bt',
        'semester-5': '/fifth-semester-bt'
      },
      'PL': { 
        'semester-3': '/third-semester-pl', 
        'semester-4': '/fourth-semester-pl',
        'semester-5': '/fifth-semester-pl'
      },
    };
    return routes[branchKey]?.[semester || ''] || '#';
  };

  const isAvailable = (branchKey: string) => getRoute(branchKey) !== '#';

  const branches = [
    { name: "CSE/IT", fullName: "Computer Science & Information Technology", description: "Software development, algorithms, and computing systems", thumbnail: cseItImg },
    { name: "CHE", fullName: "Chemical Engineering", description: "Chemical processes, reaction engineering, and material transformation", thumbnail: cheImg },
    { name: "ME", fullName: "Mechanical Engineering", description: "Machines, thermodynamics, fluid mechanics, and manufacturing", thumbnail: meImg },
    { name: "CE", fullName: "Civil Engineering", description: "Infrastructure, construction, and structural design", thumbnail: ceImg },
    { name: "ET", fullName: "Electronics Engineering", description: "Electronic circuits, embedded systems, and communication devices", thumbnail: etImg },
    { name: "EE", fullName: "Electrical Engineering", description: "Power systems, control engineering, and electrical networks", thumbnail: eeImg },
    { name: "BE", fullName: "Biochemical Engineering", description: "Bioprocesses, fermentation, and biochemical system design", thumbnail: beImg },
    { name: "LFT", fullName: "Leather & Fashion Technology", description: "Leather processing, footwear design, and fashion manufacturing", thumbnail: lftImg },
    { name: "PT", fullName: "Paint Technology", description: "Paint formulation, coatings, and polymer surface science", thumbnail: ptImg },
    { name: "PL", fullName: "Plastic Technology", description: "Plastic processing, polymer science, and materials engineering", thumbnail: plImg },
    { name: "FT", fullName: "Food Technology", description: "Food processing, preservation, and quality management", thumbnail: ftImg },
    { name: "OT", fullName: "Oil Technology", description: "Edible oil processing, refining, and surface-active agents", thumbnail: otImg },
    { name: "BT", fullName: "BioTechnology", description: "Genetic engineering, cell culture, and biotechnology applications", thumbnail: btImg },
  ];

  const semesterNum = semester?.replace("semester-", "");

  const handleBranchClick = (branch: typeof branches[0]) => {
    const route = getRoute(branch.name);
    if (route !== '#') navigate(route);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Page header */}
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-14 pb-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(`/btech-notes/${year}`)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Semesters
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">B.Tech Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-2">
            Semester {semesterNum} Branches
          </h1>
          <p className="opacity-60 text-sm max-w-xl">Select your engineering branch to access notes, syllabus, and playlists.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full mb-12">
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-6">Engineering Branches</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch, index) => {
            const available = isAvailable(branch.name);
            return (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <div
                  className={`group border border-border rounded-xl overflow-hidden bg-card transition-all duration-300 ${
                    available
                      ? 'cursor-pointer hover:border-foreground/30 hover:shadow-lg'
                      : 'opacity-55 cursor-default'
                  }`}
                  onClick={() => available && handleBranchClick(branch)}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-44 overflow-hidden bg-muted">
                    <img
                      src={branch.thumbnail}
                      alt={branch.fullName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Availability badge top-right */}
                    <div className="absolute top-3 right-3">
                      {available
                        ? <span className="text-[9px] font-bold tracking-wider uppercase bg-emerald-500/90 text-white px-2 py-0.5 rounded-full">Available</span>
                        : <span className="text-[9px] font-bold tracking-wider uppercase bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">Coming Soon</span>
                      }
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                        {branch.fullName}
                      </h3>
                      {available && (
                        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{branch.description}</p>
                    
                    <div className="pt-2">
                      {available ? (
                        <button
                          className="w-full text-[10px] font-bold tracking-wider uppercase py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-85 transition-opacity"
                          onClick={(e) => { e.stopPropagation(); handleBranchClick(branch); }}
                        >
                          View Notes
                        </button>
                      ) : (
                        <button disabled className="w-full text-[10px] font-bold tracking-wider uppercase py-2 px-3 rounded-lg border border-border text-muted-foreground cursor-default">
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BTechBranches;
