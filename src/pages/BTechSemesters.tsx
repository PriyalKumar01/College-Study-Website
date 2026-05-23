import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import thirdSemImg from "@/assets/3rd-sem-thumbnail-new.jpg";
import fourthSemImg from "@/assets/4th-sem-thumbnail-new.jpg";
import fifthSemImg from "@/assets/5th-sem-thumbnail.jpg";
import sixthSemImg from "@/assets/6th-sem-thumbnail.jpg";

const BTechSemesters = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT"],
      },
      {
        name: "4th Semester",
        description: "Advanced core subjects with lab work",
        available: true,
        route: "/btech-notes/second-year/semester-4",
        thumbnail: fourthSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT"],
      },
    ],
    "third-year": [
      {
        name: "5th Semester",
        description: "Specialization courses and electives",
        available: true,
        route: "/btech-notes/third-year/semester-5",
        thumbnail: fifthSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT"],
      },
      {
        name: "6th Semester",
        description: "Advanced specialization and project work",
        available: true,
        route: "/btech-notes/third-year/semester-6",
        thumbnail: sixthSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT"],
      },
    ],
    "fourth-year": [
      {
        name: "7th Semester",
        description: "Final year electives and major project",
        available: true,
        route: "/btech-notes/fourth-year/semester-7",
        thumbnail: thirdSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT"],
      },
      {
        name: "8th Semester",
        description: "Project completion and placement preparation",
        available: true,
        route: "/btech-notes/fourth-year/semester-8",
        thumbnail: fourthSemImg,
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
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="outline"
          onClick={() => navigate("/btech-notes")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Years
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {yearName} B.Tech Notes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your semester to access branch-specific study materials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {semesters.map((semester, index) => (
            <motion.div
              key={semester.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                className={`feature-card h-full relative ${
                  semester.available ? "cursor-pointer" : "opacity-60"
                } transition-all duration-300`}
                onClick={() => handleSemesterClick(semester)}
              >
                {semester.available && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(semester.name, semester.route); }}
                    title="Share on WhatsApp"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                )}
                <CardHeader>
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={semester.thumbnail}
                      alt={semester.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={semester.available ? "default" : "secondary"}>
                      {semester.available ? "Available" : "Coming Soon"}
                    </Badge>
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{semester.name}</CardTitle>
                  <CardDescription className="text-base mb-4">
                    {semester.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {semester.branches.slice(0, 4).map((branch) => (
                      <Badge key={branch} variant="outline" className="text-xs">
                        {branch}
                      </Badge>
                    ))}
                    {semester.branches.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{semester.branches.length - 4} more
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {semester.available ? (
                    <Button className="w-full btn-hero">
                      Select Branch
                    </Button>
                  ) : (
                    <Button className="w-full" variant="secondary" disabled>
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BTechSemesters;
