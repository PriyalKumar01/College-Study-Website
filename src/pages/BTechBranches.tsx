import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import cseItImg from "@/assets/cse-it-thumbnail.jpg";
import meImg from "@/assets/me-thumbnail.jpg";
import ceImg from "@/assets/ce-thumbnail.jpg";
import cheImg from "@/assets/che-thumbnail.jpg";
import etImg from "@/assets/et-thumbnail.jpg";
import eeImg from "@/assets/ee-thumbnail.jpg";
import beImg from "@/assets/be-thumbnail.jpg";
import lftImg from "@/assets/lft-thumbnail.jpg";

const BTechBranches = () => {
  const navigate = useNavigate();
  const { year, semester } = useParams<{ year: string; semester: string }>();

  const branches = [
    {
      name: "CSE/IT",
      fullName: "Computer Science & Information Technology",
      description: "Software development, algorithms, and computing systems",
      available: true,
      thumbnail: cseItImg,
      route: semester === "semester-3" ? "/third-semester-cse" : semester === "semester-4" ? "/fourth-semester-cse" : semester === "semester-5" ? "/fifth-semester-cse" : "#",
    },
    {
      name: "CHE",
      fullName: "Chemical Engineering",
      description: "Chemical processes and material transformation",
      available: semester === "semester-3" ? true : false,
      thumbnail: cheImg,
      route: semester === "semester-3" ? "/third-semester-che" : "#",
    },
    {
      name: "ME",
      fullName: "Mechanical Engineering",
      description: "Machines, thermodynamics, and manufacturing",
      available: semester === "semester-3" ? true : false,
      thumbnail: meImg,
      route: semester === "semester-3" ? "/third-semester-me" : "#",
    },
    {
      name: "CE",
      fullName: "Civil Engineering",
      description: "Infrastructure, construction, and structural design",
      available: semester === "semester-3" ? true : false,
      thumbnail: ceImg,
      route: semester === "semester-3" ? "/third-semester-ce" : "#",
    },
 {
      name: "ET",
      fullName: "Electronics Technology",
      description: "Electronic circuits, devices, and communication",
      available: semester === "semester-3" ? true : false,
      thumbnail: etImg,
      route: semester === "semester-3" ? "/third-semester-et" : "#",
    },
    {
      name: "EE",
      fullName: "Electrical Engineering",
      description: "Power systems, motors, and electrical networks",
      available: false,
      thumbnail: eeImg,
      route: "#",
    },
    {
      name: "BE",
      fullName: "Biomedical Engineering",
      description: "Medical devices and healthcare technology",
      available: semester === "semester-3" ? true : false,
      thumbnail: beImg,
      route: semester === "semester-3" ? "/third-semester-be" : "#",
    },
    {
      name: "LFT",
      fullName: "Leather & Fashion Technology",
      description: "Leather processing and footwear manufacturing",
      available: semester === "semester-3" ? true : false,
      thumbnail: lftImg,
      route: semester === "semester-3" ? "/third-semester-lft" : "#",
    },
    {
      name: "PT",
      fullName: "Plastic Technology",
      description: "Plastic processing and polymer engineering",
      available: semester === "semester-3" ? true : false,
      thumbnail: lftImg,
      route: semester === "semester-3" ? "/third-semester-pt" : "#",
    },
    {
      name: "FT",
      fullName: "Food Technology",
      description: "Food processing and preservation",
      available: semester === "semester-3" ? true : false,
      thumbnail: lftImg,
      route: semester === "semester-3" ? "/third-semester-ft" : "#",
    },
    {
      name: "OT",
      fullName: "Oil Technology",
      description: "Oil processing and refining",
      available: semester === "semester-3" ? true : false,
      thumbnail: lftImg,
      route: semester === "semester-3" ? "/third-semester-ot" : "#",
    },
  ];

  const semesterName = semester?.replace("semester-", "");
  const yearName = year?.replace("-", " ");

  const handleBranchClick = (branch: any) => {
    if (branch.available) {
      navigate(branch.route);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="outline"
          onClick={() => navigate(`/btech-notes/${year}`)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Semesters
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {semesterName} Semester - Select Branch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your engineering branch to access specialized study materials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                className={`feature-card h-full ${
                  branch.available ? "cursor-pointer" : "opacity-60"
                } transition-all duration-300`}
                onClick={() => handleBranchClick(branch)}
              >
                <CardHeader>
                  <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                    <img
                      src={branch.thumbnail}
                      alt={branch.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={branch.available ? "default" : "secondary"}>
                      {branch.available ? "Available" : "Coming Soon"}
                    </Badge>
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-1">{branch.name}</CardTitle>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {branch.fullName}
                  </p>
                  <CardDescription className="text-sm">
                    {branch.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {branch.available ? (
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

export default BTechBranches;
