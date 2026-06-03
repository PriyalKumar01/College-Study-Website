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
import FifthSemesterOpenElectives from "./pages/FifthSemesterOpenElectives";
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
import ThirdSemesterEENotes from "./pages/ThirdSemesterEENotes";
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
import FourthSemesterMENotes from "./pages/FourthSemesterMENotes";
import FourthSemesterCENotes from "./pages/FourthSemesterCENotes";
import FourthSemesterCHENotes from "./pages/FourthSemesterCHENotes";
import FourthSemesterETNotes from "./pages/FourthSemesterETNotes";
import FourthSemesterEENotes from "./pages/FourthSemesterEENotes";
import FourthSemesterBENotes from "./pages/FourthSemesterBENotes";
import FourthSemesterLFTNotes from "./pages/FourthSemesterLFTNotes";
import FourthSemesterPTNotes from "./pages/FourthSemesterPTNotes";
import FourthSemesterOTNotes from "./pages/FourthSemesterOTNotes";
import FourthSemesterFTNotes from "./pages/FourthSemesterFTNotes";
import FifthSemesterMENotes from "./pages/FifthSemesterMENotes";
import FifthSemesterCENotes from "./pages/FifthSemesterCENotes";
import FifthSemesterCHENotes from "./pages/FifthSemesterCHENotes";
import FifthSemesterETNotes from "./pages/FifthSemesterETNotes";
import FifthSemesterEENotes from "./pages/FifthSemesterEENotes";
import FifthSemesterBENotes from "./pages/FifthSemesterBENotes";
import FifthSemesterLFTNotes from "./pages/FifthSemesterLFTNotes";
import FifthSemesterPTNotes from "./pages/FifthSemesterPTNotes";
import FifthSemesterOTNotes from "./pages/FifthSemesterOTNotes";
import FifthSemesterFTNotes from "./pages/FifthSemesterFTNotes";
import SixthSemesterCSENotes from "./pages/SixthSemesterCSENotes";
import SixthSemesterOpenElectives from "./pages/SixthSemesterOpenElectives";
import SixthSemesterETNotes from "./pages/SixthSemesterETNotes";
import SixthSemesterMENotes from "./pages/SixthSemesterMENotes";
import SixthSemesterCENotes from "./pages/SixthSemesterCENotes";
import SixthSemesterCHENotes from "./pages/SixthSemesterCHENotes";
import SixthSemesterEENotes from "./pages/SixthSemesterEENotes";
import SixthSemesterBENotes from "./pages/SixthSemesterBENotes";
import SixthSemesterLFTNotes from "./pages/SixthSemesterLFTNotes";
import SixthSemesterPTNotes from "./pages/SixthSemesterPTNotes";
import SixthSemesterOTNotes from "./pages/SixthSemesterOTNotes";
import SixthSemesterFTNotes from "./pages/SixthSemesterFTNotes";
import Profile from "./pages/Profile";
import ATSFriendlyResume from "./pages/ATSFriendlyResume";
import AdminPortal from "./pages/AdminPortal";
import OwnerDashboard from "./pages/OwnerDashboard";
import BSMSYears from "./pages/BSMSYears";
import BSMSSecondYearNotes from "./pages/BSMSSecondYearNotes";
import BSMSThirdYearNotes from "./pages/BSMSThirdYearNotes";
import BSMSSem3Notes from "./pages/BSMSSem3Notes";
import BSMSSem4Notes from "./pages/BSMSSem4Notes";
import BSMSSem5Notes from "./pages/BSMSSem5Notes";
import BSMSSem6Notes from "./pages/BSMSSem6Notes";
import ScholarshipsPortal from "./pages/ScholarshipsPortal";
import ThirdSemesterBTNotes from "./pages/ThirdSemesterBTNotes";
import ThirdSemesterPLNotes from "./pages/ThirdSemesterPLNotes";
import FourthSemesterBTNotes from "./pages/FourthSemesterBTNotes";
import FourthSemesterPLNotes from "./pages/FourthSemesterPLNotes";
import SeventhSemesterCSENotes from "./pages/SeventhSemesterCSENotes";
import EighthSemesterCSENotes from "./pages/EighthSemesterCSENotes";

export const navItems = [
  { to: "/", page: <Index /> },
  { to: "/about", page: <About /> },
  { to: "/profile", page: <Profile /> },
  { to: "/btech-notes", page: <BTechYears /> },
  { to: "/btech-notes/first-year", page: <FirstYearNotes /> },
  { to: "/btech-notes/:year", page: <BTechSemesters /> },
  { to: "/btech-notes/:year/:semester", page: <BTechBranches /> },
  { to: "/notes", page: <NotesCategories /> },
  { to: "/cgpa-calculator", page: <CGPACalculator /> },
  { to: "/coding-study-material", page: <CodingStudyMaterial /> },
  { to: "/dsa-notes", page: <DSANotes /> },
  { to: "/dashboard", page: <Dashboard /> },
  { to: "/first-semester", page: <FirstSemesterNotes /> },
  { to: "/second-semester", page: <SecondSemesterNotes /> },
  { to: "/third-semester-cse", page: <ThirdSemesterCSENotes /> },
  { to: "/third-semester-me", page: <ThirdSemesterMENotes /> },
  { to: "/third-semester-che", page: <ThirdSemesterCHENotes /> },
  { to: "/third-semester-ce", page: <ThirdSemesterCENotes /> },
  { to: "/third-semester-lft", page: <ThirdSemesterLFTNotes /> },
  { to: "/third-semester-et", page: <ThirdSemesterETNotes /> },
  { to: "/third-semester-pt", page: <ThirdSemesterPTNotes /> },
  { to: "/third-semester-be", page: <ThirdSemesterBENotes /> },
  { to: "/third-semester-ft", page: <ThirdSemesterFTNotes /> },
  { to: "/third-semester-ot", page: <ThirdSemesterOTNotes /> },
  { to: "/third-semester-ee", page: <ThirdSemesterEENotes /> },
  { to: "/fourth-semester-cse", page: <FourthSemesterCSENotes /> },
  { to: "/fourth-semester-me", page: <FourthSemesterMENotes /> },
  { to: "/fourth-semester-ce", page: <FourthSemesterCENotes /> },
  { to: "/fourth-semester-che", page: <FourthSemesterCHENotes /> },
  { to: "/fourth-semester-et", page: <FourthSemesterETNotes /> },
  { to: "/fourth-semester-ee", page: <FourthSemesterEENotes /> },
  { to: "/fourth-semester-be", page: <FourthSemesterBENotes /> },
  { to: "/fourth-semester-lft", page: <FourthSemesterLFTNotes /> },
  { to: "/fourth-semester-pt", page: <FourthSemesterPTNotes /> },
  { to: "/fourth-semester-ot", page: <FourthSemesterOTNotes /> },
  { to: "/fourth-semester-ft", page: <FourthSemesterFTNotes /> },
  { to: "/fifth-semester-cse", page: <FifthSemesterCSENotes /> },
  { to: "/fifth-semester-open-electives", page: <FifthSemesterOpenElectives /> },
  { to: "/fifth-semester-me", page: <FifthSemesterMENotes /> },
  { to: "/fifth-semester-ce", page: <FifthSemesterCENotes /> },
  { to: "/fifth-semester-che", page: <FifthSemesterCHENotes /> },
  { to: "/fifth-semester-et", page: <FifthSemesterETNotes /> },
  { to: "/fifth-semester-ee", page: <FifthSemesterEENotes /> },
  { to: "/fifth-semester-be", page: <FifthSemesterBENotes /> },
  { to: "/fifth-semester-lft", page: <FifthSemesterLFTNotes /> },
  { to: "/fifth-semester-pt", page: <FifthSemesterPTNotes /> },
  { to: "/fifth-semester-ot", page: <FifthSemesterOTNotes /> },
  { to: "/fifth-semester-ft", page: <FifthSemesterFTNotes /> },
  { to: "/sixth-semester-cse", page: <SixthSemesterCSENotes /> },
  { to: "/sixth-semester-open-electives", page: <SixthSemesterOpenElectives /> },
  { to: "/sixth-semester-me", page: <SixthSemesterMENotes /> },
  { to: "/sixth-semester-ce", page: <SixthSemesterCENotes /> },
  { to: "/sixth-semester-che", page: <SixthSemesterCHENotes /> },
  { to: "/sixth-semester-et", page: <SixthSemesterETNotes /> },
  { to: "/sixth-semester-ee", page: <SixthSemesterEENotes /> },
  { to: "/sixth-semester-be", page: <SixthSemesterBENotes /> },
  { to: "/sixth-semester-lft", page: <SixthSemesterLFTNotes /> },
  { to: "/sixth-semester-pt", page: <SixthSemesterPTNotes /> },
  { to: "/sixth-semester-ot", page: <SixthSemesterOTNotes /> },
  { to: "/sixth-semester-ft", page: <SixthSemesterFTNotes /> },
  { to: "/learning-platforms", page: <LearningPlatforms /> },
  { to: "/opportunities", page: <Opportunities /> },
  { to: "/opportunity-upload", page: <OpportunityUpload /> },
  { to: "/placement-preparation", page: <PlacementPreparation /> },
  { to: "/privacy-policy", page: <PrivacyPolicy /> },
  { to: "/terms-of-service", page: <TermsOfService /> },
  { to: "/useful-ai-tools", page: <UsefulAITools /> },
  { to: "/view-notes/:noteType", page: <ViewNotes /> },
  { to: "/web-development-notes", page: <WebDevelopmentNotes /> },
  { to: "/notes-contributors", page: <NotesContributors /> },
  { to: "/bba-notes", page: <BBANotes /> },
  { to: "/mba-notes", page: <MBANotes /> },
  { to: "/ats-friendly-resume", page: <ATSFriendlyResume /> },
  { to: "/admin-portal", page: <AdminPortal /> },
  { to: "/owner-dashboard", page: <OwnerDashboard /> },
  // BS-MS Routes
  { to: "/bsms-notes", page: <BSMSYears /> },
  { to: "/bsms-notes/second-year", page: <BSMSSecondYearNotes /> },
  { to: "/bsms-notes/third-year", page: <BSMSThirdYearNotes /> },
  { to: "/bsms/sem-3", page: <BSMSSem3Notes /> },
  { to: "/bsms/sem-4", page: <BSMSSem4Notes /> },
  { to: "/bsms/sem-5", page: <BSMSSem5Notes /> },
  { to: "/bsms/sem-6", page: <BSMSSem6Notes /> },
  // Scholarship Portal
  { to: "/scholarship-portal", page: <ScholarshipsPortal /> },
  { to: "/third-semester-bt", page: <ThirdSemesterBTNotes /> },
  { to: "/third-semester-pl", page: <ThirdSemesterPLNotes /> },
  { to: "/fourth-semester-bt", page: <FourthSemesterBTNotes /> },
  { to: "/fourth-semester-pl", page: <FourthSemesterPLNotes /> },
  { to: "/seventh-semester-cse", page: <SeventhSemesterCSENotes /> },
  { to: "/eighth-semester-cse", page: <EighthSemesterCSENotes /> },
  { to: "*", page: <NotFound /> },
];
