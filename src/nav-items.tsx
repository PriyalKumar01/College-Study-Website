import Index from "./pages/Index";
import About from "./pages/About";
import BTechYears from "./pages/BTechYears";
import FirstYearNotes from "./pages/FirstYearNotes";
import BTechSemesters from "./pages/BTechSemesters";
import BTechBranches from "./pages/BTechBranches";
import NotesCategories from "./pages/NotesCategories";
import CGPACalculator from "./pages/CGPACalculator";
import CodingStudyMaterial from "./pages/CodingStudyMaterial";
import DSANotes from "./pages/DSANotes";
import Dashboard from "./pages/Dashboard";
import FirstSemesterNotes from "./pages/FirstSemesterNotes";
import SecondSemesterNotes from "./pages/SecondSemesterNotes";
import ThirdSemesterCSENotes from "./pages/ThirdSemesterCSENotes";
import FourthSemesterCSENotes from "./pages/FourthSemesterCSENotes";
import FifthSemesterCSENotes from "./pages/FifthSemesterCSENotes";
import FifthSemesterCSEOpenElectives from "./pages/FifthSemesterCSEOpenElectives";
import ThirdSemesterMENotes from "./pages/ThirdSemesterMENotes";
import ThirdSemesterCHENotes from "./pages/ThirdSemesterCHENotes";
import ThirdSemesterCENotes from "./pages/ThirdSemesterCENotes";
import MBANotes from "./pages/MBANotes";      
import BBANotes from "./pages/BBANotes";
import ThirdSemesterLFTNotes from "./pages/ThirdSemesterLFTNotes";
import ThirdSemesterETNotes from "./pages/ThirdSemesterETNotes";
import ThirdSemesterPTNotes from "./pages/ThirdSemesterPTNotes";
import ThirdSemesterBENotes from "./pages/ThirdSemesterBENotes";
import ThirdSemesterFTNotes from "./pages/ThirdSemesterFTNotes";
import ThirdSemesterOTNotes from "./pages/ThirdSemesterOTNotes";
import LearningPlatforms from "./pages/LearningPlatforms";
import NotFound from "./pages/NotFound";
import Opportunities from "./pages/Opportunities";
import OpportunityUpload from "./pages/OpportunityUpload";
import PlacementPreparation from "./pages/PlacementPreparation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import UsefulAITools from "./pages/UsefulAITools";
import ViewNotes from "./pages/ViewNotes";
import WebDevelopmentNotes from "./pages/WebDevelopmentNotes";
import NotesContributors from "./pages/NotesContributors";

export const navItems = [
  {
    to: "/",
    page: <Index />,
  },
  {
    to: "/about",
    page: <About />,
  },
  {
    to: "/btech-notes",
    page: <BTechYears />,
  },
  {
    to: "/btech-notes/first-year",
    page: <FirstYearNotes />,
  },
  {
    to: "/btech-notes/:year",
    page: <BTechSemesters />,
  },
  {
    to: "/btech-notes/:year/:semester",
    page: <BTechBranches />,
  },
  {
    to: "/notes",
    page: <NotesCategories />,
  },
  {
    to: "/cgpa-calculator",
    page: <CGPACalculator />,
  },
  {
    to: "/coding-study-material",
    page: <CodingStudyMaterial />,
  },
  {
    to: "/dsa-notes",
    page: <DSANotes />,
  },
  {
    to: "/dashboard",
    page: <Dashboard />,
  },
  {
    to: "/first-semester",
    page: <FirstSemesterNotes />,
  },
  {
    to: "/second-semester",
    page: <SecondSemesterNotes />,
  },
  {
    to: "/third-semester-cse",
    page: <ThirdSemesterCSENotes />,
  },
  {
    to: "/fourth-semester-cse",
    page: <FourthSemesterCSENotes />,
  },
  {
    to: "/fifth-semester-cse",
    page: <FifthSemesterCSENotes />,
  },
  {
    to: "/third-semester-me",
    page: <ThirdSemesterMENotes />,
  },
  {
    to: "/third-semester-che",
    page: <ThirdSemesterCHENotes />,
  },
  {
    to: "/third-semester-lft",
    page: <ThirdSemesterLFTNotes />,
  },
  {
    to: "/third-semester-et",
    page: <ThirdSemesterETNotes />,
  },
  {
    to: "/third-semester-pt",
    page: <ThirdSemesterPTNotes />,
  },
  {
    to: "/third-semester-be",
    page: <ThirdSemesterBENotes />,
  },
  {
    to: "/third-semester-ft",
    page: <ThirdSemesterFTNotes />,
  },
  {
    to: "/third-semester-ot",
    page: <ThirdSemesterOTNotes />,
  },
  {
    to: "/third-semester-ce",
    page: <ThirdSemesterCENotes />,
  },
  {
    to: "/learning-platforms",
    page: <LearningPlatforms />,
  },
  {
    to: "/opportunities",
    page: <Opportunities />,
  },
  {
    to: "/opportunity-upload",
    page: <OpportunityUpload />,
  },
  {
    to: "/placement-preparation",
    page: <PlacementPreparation />,
  },
  {
    to: "/privacy-policy",
    page: <PrivacyPolicy />,
  },
  {
    to: "/terms-of-service",
    page: <TermsOfService />,
  },
  {
    to: "/useful-ai-tools",
    page: <UsefulAITools />,
  },
  {
    to: "/view-notes/:noteType",
    page: <ViewNotes />,
  },
  {
    to: "/web-development-notes",
    page: <WebDevelopmentNotes />,
  },
  {
    to: "/notes-contributors",
    page: <NotesContributors />,
  },
  {
    to: "/bba-notes",  
    page: <BBANotes />,
  },
  {
    to: "/mba-notes",  
    page: <MBANotes />,
  },
  {
    to: "*",
    page: <NotFound />,
  },
];
