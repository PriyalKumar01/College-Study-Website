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
      'PT': { 'semester-3': '/third-semester-pt', 'semester-4': '/fourth-semester-pt', 'semester-5': '/fifth-semester-pt', 'semester-6': '/sixth-semester-pt' },
      'FT': { 'semester-3': '/third-semester-ft', 'semester-4': '/fourth-semester-ft', 'semester-5': '/fifth-semester-ft', 'semester-6': '/sixth-semester-ft' },
      'OT': { 'semester-3': '/third-semester-ot', 'semester-4': '/fourth-semester-ot', 'semester-5': '/fifth-semester-ot', 'semester-6': '/sixth-semester-ot' },
      'BT': { 'semester-3': '/third-semester-bt', 'semester-4': '/fourth-semester-bt' },
      'PL': { 'semester-3': '/third-semester-pl', 'semester-4': '/fourth-semester-pl' },
    };
    return routes[branchKey]?.[semester || ''] || '#';
  };

  const isAvailable = (branchKey: string) => {
    const route = getRoute(branchKey);
    return route !== '#';
  };

  const branches = [
    { name: "CSE/IT", fullName: "Computer Science & Information Technology", description: "Software development, algorithms, and computing systems", thumbnail: cseItImg },
    { name: "CHE", fullName: "Chemical Engineering", description: "Chemical processes and material transformation", thumbnail: cheImg },
    { name: "ME", fullName: "Mechanical Engineering", description: "Machines, thermodynamics, and manufacturing", thumbnail: meImg },
    { name: "CE", fullName: "Civil Engineering", description: "Infrastructure, construction, and structural design", thumbnail: ceImg },
    { name: "ET", fullName: "Electronics Technology", description: "Electronic circuits, devices, and communication", thumbnail: etImg },
    { name: "EE", fullName: "Electrical Engineering", description: "Power systems, motors, and electrical networks", thumbnail: eeImg },
    { name: "BE", fullName: "Biomedical Engineering", description: "Medical devices and healthcare technology", thumbnail: beImg },
    { name: "LFT", fullName: "Leather & Fashion Technology", description: "Leather processing and footwear manufacturing", thumbnail: lftImg },
    { name: "PT", fullName: "Paint Technology", description: "Paint processing and polymer engineering", thumbnail: lftImg },
    { name: "PL", fullName: "Plastic Technology", description: "Plastic processing and polymer engineering", thumbnail: lftImg },
    { name: "FT", fullName: "Food Technology", description: "Food processing and preservation", thumbnail: lftImg },
    { name: "OT", fullName: "Oil Technology", description: "Oil processing and refining", thumbnail: lftImg },
    { name: "BT", fullName: "BioTechnology", description: "Biochemical and genetic engineering", thumbnail: lftImg },
  ];

  const semesterName = semester?.replace("semester-", "");

  const handleBranchClick = (branch: any) => {
    const route = getRoute(branch.name);
    if (route !== '#') navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="outline" onClick={() => navigate(`/btech-notes/${year}`)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Semesters
        </Button>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{semesterName} Semester - Select Branch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose your engineering branch to access specialized study materials</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {branches.map((branch, index) => {
            const available = isAvailable(branch.name);
            return (
              <motion.div key={branch.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
                <Card className={`feature-card h-full ${available ? "cursor-pointer" : "opacity-60"} transition-all duration-300`} onClick={() => handleBranchClick(branch)}>
                  <CardHeader>
                    <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                      <img src={branch.thumbnail} alt={branch.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={available ? "default" : "secondary"}>{available ? "Available" : "Coming Soon"}</Badge>
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-1">{branch.name}</CardTitle>
                    <p className="text-sm font-medium text-muted-foreground mb-2">{branch.fullName}</p>
                    <CardDescription className="text-sm">{branch.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {available ? <Button className="w-full btn-hero">View Notes</Button> : <Button className="w-full" variant="secondary" disabled>Coming Soon</Button>}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BTechBranches;
