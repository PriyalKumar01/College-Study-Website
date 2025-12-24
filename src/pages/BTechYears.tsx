import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import firstYearImg from "@/assets/1st-year-thumbnail.jpg";
import secondYearImg from "@/assets/2nd-year-thumbnail.jpg";
import thirdYearImg from "@/assets/3rd-year-thumbnail.jpg";
import fourthYearImg from "@/assets/4th-year-thumbnail.jpg";

const BTechYears = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleWhatsAppShare = (yearName: string, route: string) => {
    const shareUrl = `${window.location.origin}${route}`;
    const message = `Check out ${yearName} B.Tech Notes on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const years = [
    {
      name: "1st Year",
      description: "Foundation courses covering basic engineering principles",
      available: true,
      route: "/btech-notes/first-year",
      thumbnail: firstYearImg,
      semesters: ["1st Semester", "2nd Semester"],
    },
    {
      name: "2nd Year",
      description: "Core branch subjects with practical applications",
      available: true,
      route: "/btech-notes/second-year",
      thumbnail: secondYearImg,
      semesters: ["3rd Semester", "4th Semester"],
    },
    {
      name: "3rd Year",
      description: "Advanced topics and specialization courses",
      available: true,
      route: "/btech-notes/third-year",
      thumbnail: thirdYearImg,
      semesters: ["5th Semester", "6th Semester"],
    },
    {
      name: "4th Year",
      description: "Final year projects and elective subjects",
      available: false,
      route: "/btech-notes/fourth-year",
      thumbnail: fourthYearImg,
      semesters: ["7th Semester", "8th Semester"],
    },
  ];

  const handleYearClick = (year: typeof years[0]) => {
    if (year.available) {
      navigate(year.route);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="outline"
          onClick={() => navigate("/notes")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Notes
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            B.Tech Notes by Year
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your academic year to access comprehensive study materials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {years.map((year, index) => (
            <motion.div
              key={year.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                className={`feature-card h-full relative ${
                  year.available ? "cursor-pointer" : "opacity-60"
                } transition-all duration-300`}
                onClick={() => handleYearClick(year)}
              >
                {year.available && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(year.name, year.route); }}
                    title="Share on WhatsApp"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                )}
                <CardHeader>
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={year.thumbnail}
                      alt={year.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={year.available ? "default" : "secondary"}>
                      {year.available ? "Available" : "Coming Soon"}
                    </Badge>
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{year.name}</CardTitle>
                  <CardDescription className="text-base mb-4">
                    {year.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {year.semesters.map((sem) => (
                      <Badge key={sem} variant="outline" className="text-xs">
                        {sem}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {year.available ? (
                    <Button className="w-full btn-hero">
                      View Notes
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

export default BTechYears;
