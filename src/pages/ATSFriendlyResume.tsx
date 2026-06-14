import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Calculator,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  FileCheck,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { LockedSection } from "@/components/LockedSection";
import { PremiumModal } from "@/components/PremiumModal";

const ATSFriendlyResume = () => {
  const navigate = useNavigate();
  const { user, isOwner } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [premiumModal, setPremiumModal] = useState<{ open: boolean; plan: 'companies' | 'hr_emails' | 'resume' }>({ open: false, plan: 'resume' });
  const [showAllDos, setShowAllDos] = useState(false);
  const [showAllDonts, setShowAllDonts] = useState(false);
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth >= 768 : true);

  const checkPurchase = useCallback(async () => {
    if (!user) return;
    const { data } = await (supabase as any)
      .from('premium_purchases')
      .select('plan')
      .eq('user_id', user.id)
      .in('payment_status', ['completed', 'free']);
    
    const unlockedPlans = data ? data.map((p: any) => p.plan) : [];
    setHasAccess(isOwner || unlockedPlans.includes('resume'));
  }, [user, isOwner]);

  useEffect(() => {
    checkPurchase();
  }, [checkPurchase]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dosList = [
    "Always use ATS-friendly formats (prefer Overleaf templates).",
    "Customize your resume for every company and role — avoid one-size-fits-all resumes.",
    "Mention 10th & 12th percentages only if they are strong.",
    "Include your current CGPA and ensure it is accurate.",
    <span key="1">Use clear section headings such as <strong>Education, Projects, Skills, Achievements</strong>.</span>,
    <span key="2">Keep your resume within <strong>one page</strong> (especially for freshers).</span>,
    <span key="3">Use <strong>bullet points</strong> instead of paragraphs for better readability.</span>,
    <span key="4">Start each bullet point with <strong>action verbs</strong> (e.g., Developed, Built, Implemented).</span>,
    "Quantify your work wherever possible (e.g., 'improved performance by 30%').",
    <span key="5">For technical roles, include only <strong>relevant technical achievements</strong>.</span>,
    <span key="6">CSE/IT or related field students should include:<ul className="list-disc pl-5 mt-1 space-y-1"><li>JEE Mains / GATE scores (if relevant)</li><li>Coding platform ratings with profile links</li></ul></span>,
    <span key="7">As a fresher, prioritize <strong>projects over experience</strong>.</span>,
    <span key="8">Focus on <strong>2–3 strong projects</strong> that you can confidently explain in interviews.</span>,
    "Ensure all links (GitHub, LinkedIn, portfolios) are working and publicly accessible.",
    "Maintain consistent formatting (font, spacing, alignment) throughout the resume.",
    "Tailor your resume based on job requirements and aim for a strong ATS score (70–90+ is considered good)."
  ];

  const dontsList = [
    "Avoid using Canva, MS Word, or Internshala resume builders.",
    "Do not use the same resume for every application.",
    "Avoid adding roles like 'Associate Head' without meaningful contribution.",
    <span key="1">Do not include unverified or approximate CGPA — use a <strong>CGPA Calculator</strong> if needed.</span>,
    "Avoid skill bars, stars, or graphical indicators for skills.",
    "Do not list too many skills — only mention those you are confident in.",
    "Avoid spelling or grammatical mistakes — always proofread.",
    "Do not include unnecessary personal details such as photos or full addresses.",
    "Avoid irrelevant hobbies (e.g., badminton, dancing) in technical resumes unless they add value.",
    "Do not include activities like volunteering or event participation unless they demonstrate impact or skills.",
    "Avoid adding generic achievements — align them with the company and role.",
    "Do not exaggerate or provide false information."
  ];

  const visibleDos = (isDesktop || showAllDos) ? dosList : dosList.slice(0, 6);
  const visibleDonts = (isDesktop || showAllDonts) ? dontsList : dontsList.slice(0, 6);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">

      {/* Animated Background Elements (Fixed position behind everything) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10"></div>
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] opacity-70"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] opacity-70"
        />
      </div>

      {/* Floating Sketch Stickers for Eye-Catchy Header */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [-10, 5, -10] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-20 left-4 md:left-[10%] text-blue-500/20 dark:text-blue-400/20 z-0 pointer-events-none"
      >
        <GraduationCap size={100} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], rotate: [15, -5, 15] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
        className="absolute top-32 right-4 md:right-[15%] text-purple-500/20 dark:text-purple-400/20 z-0 pointer-events-none"
      >
        <FileText size={80} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-48 left-1/4 text-yellow-500/30 dark:text-yellow-400/20 z-0 pointer-events-none hidden md:block"
      >
        <Sparkles size={50} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-20, -10, -20] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2 }}
        className="absolute top-12 right-[30%] text-green-500/20 dark:text-green-400/20 z-0 pointer-events-none hidden lg:block"
      >
        <Briefcase size={60} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [10, -10, 10] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-64 right-[5%] text-orange-500/20 dark:text-orange-400/20 z-0 pointer-events-none hidden md:block"
      >
        <Layers size={90} strokeWidth={1} />
      </motion.div>

      <div className="relative z-20 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12 mb-10">

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground tracking-tight">
              ATS Friendly Resume Guide
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto font-medium">
              Build professional, ATS-optimized resumes using Overleaf to fast-track your job applications.
            </p>
          </motion.div>

          {!hasAccess ? (
            <div className="mt-8">
              <LockedSection
                plan="resume"
                onUnlock={() => setPremiumModal({ open: true, plan: 'resume' })}
                hasAccess={hasAccess}
              />
            </div>
          ) : (
            <>
              {/* Instructions Section */}
              <div className="grid md:grid-cols-2 gap-6 items-start">

                {/* Column 1: Do's */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card className="border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors shadow-sm relative overflow-hidden">
                    <div className="p-5 sm:p-6 space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/10 pb-3">
                        <FileCheck className="w-5 h-5 flex-shrink-0" />
                        Recommended Practices:-
                      </h3>

                      <ul className="space-y-3">
                        <AnimatePresence>
                          {visibleDos.map((item, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-start gap-2.5 group overflow-hidden"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                              <div className="text-muted-foreground group-hover:text-foreground transition-colors text-sm">{item}</div>
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </ul>

                      {!isDesktop && dosList.length > 6 && (
                        <Button
                          variant="ghost"
                          className="w-full mt-4 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
                          onClick={() => setShowAllDos(!showAllDos)}
                        >
                          {showAllDos ? "Show Less" : `View all ${dosList.length} practices`}
                          <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${showAllDos ? "rotate-180" : ""}`} />
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>

                {/* Column 2: Don'ts & Non-Technical stacked */}
                <div className="space-y-6">
                  {/* Don'ts */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Card className="border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition-colors shadow-sm relative overflow-hidden">
                      <div className="p-5 sm:p-6 space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-rose-600 dark:text-rose-400 border-b border-rose-500/10 pb-3">
                          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                          Things to Avoid :-
                        </h3>

                        <ul className="space-y-3">
                          <AnimatePresence>
                            {visibleDonts.map((item, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-start gap-2.5 group overflow-hidden"
                              >
                                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-1" />
                                <div className="text-muted-foreground group-hover:text-foreground transition-colors text-sm">{item}</div>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </ul>

                        {!isDesktop && dontsList.length > 6 && (
                          <Button
                            variant="ghost"
                            className="w-full mt-4 text-rose-600 hover:text-rose-700 hover:bg-rose-500/10"
                            onClick={() => setShowAllDonts(!showAllDonts)}
                          >
                            {showAllDonts ? "Show Less" : `View all ${dontsList.length} warnings`}
                            <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${showAllDonts ? "rotate-180" : ""}`} />
                          </Button>
                        )}
                      </div>
                    </Card>
                  </motion.div>

                  {/* Non-Technical Students */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Card className="border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors shadow-sm">
                      <div className="p-5 sm:p-6 space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-600 dark:text-blue-400 border-b border-blue-500/10 pb-3">
                          <GraduationCap className="w-5 h-5 flex-shrink-0" />
                          For Non-Tech Students:-
                        </h3>

                        <ul className="space-y-3">
                          {[
                            "Follow the same guidelines.",
                            <span key="1">Focus on <strong>core projects, research work, or domain-specific experience</strong>.</span>,
                            "Customize your resume according to the company and role requirements."
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 group">
                              <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                              <div className="text-muted-foreground group-hover:text-foreground transition-colors text-sm">{item}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </motion.div>
                </div>

              </div>

              {/* Unified Procedure & CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-6 md:pt-10"
              >
                <Card className="relative overflow-hidden bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-300 w-full rounded-2xl md:rounded-3xl">
                  {/* Gradient Top Border Bar */}
                  <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600"></div>

                  <div className="p-5 sm:p-8 md:p-12 space-y-7 md:space-y-10">
                    {/* Procedure Title */}
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        Build ATS Friendly Resume
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-base font-medium">Follow these straightforward steps to generate your ATS resume</p>
                    </div>

                    {/* Stepper Timeline inside Card */}
                    <div className="relative max-w-2xl mx-auto">
                      {/* Vertical Line */}
                      <div className="absolute left-[20px] md:left-8 top-4 bottom-4 w-0.5 bg-border rounded-full"></div>

                      <div className="space-y-3.5 md:space-y-6">
                        {[
                          { title: "Open the Template", desc: "Click on the \"Open Resume Template\" button below to access the standard resume format." },
                          { title: "Create an Overleaf Account", desc: "Sign up or log in on Overleaf to start editing the document." },
                          { title: "Make Your Own Copy", desc: "Once the template opens, go to the menu and create a copy so you can edit it." },
                          { title: "Fill in Your Details", desc: "Replace all sample content with your actual information — education, projects, skills, and achievements." },
                          { title: "Customize for Each Role", desc: "Do not use the same resume everywhere. Modify your skills, keywords, and projects based on the job you are applying for." },
                          { title: "Download Your Resume", desc: "After reviewing everything, compile the document and download it as a PDF." },
                        ].map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                            className="relative flex items-center gap-3 md:gap-6 group"
                          >
                            <div className="w-10 h-10 md:w-16 md:h-16 shrink-0 bg-card dark:bg-zinc-950 border-2 border-primary/20 group-hover:border-primary/50 group-hover:scale-105 transition-all rounded-full flex items-center justify-center text-primary font-bold text-sm md:text-lg shadow-sm z-10 relative">
                              {index + 1}
                            </div>
                            <div className="bg-background border border-border/50 p-3.5 md:p-5 rounded-xl shadow-sm group-hover:shadow-md transition-all flex-1 group-hover:border-primary/30">
                              <p className="font-semibold text-foreground text-sm md:text-base mb-1">
                                {step.title}
                              </p>
                              <p className="text-muted-foreground text-xs md:text-sm">
                                {step.desc}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-primary/5 border-l-4 border-primary p-3 md:p-4 rounded-r-xl mt-6 md:mt-8 max-w-2xl mx-auto text-sm md:text-base text-card-foreground">
                      <strong>Note:</strong> A strong resume is clear, relevant, and honest. Focus on quality over quantity. Every point you write should be something you can confidently justify in an interview.
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-border/50 my-6 md:my-8"></div>

                    {/* CTA Buttons integrated securely inside the card */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                      <Button
                        className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg shadow-primary/20 h-14 px-8 text-base font-semibold group rounded-xl transition-all"
                        onClick={() => window.open("https://www.overleaf.com/7316131321jhgdcwzgjhxj#7e4204", "_blank")}
                      >
                        <FileText className="mr-3 h-5 w-5" />
                        Open Resume Template
                        <ExternalLink className="ml-3 h-4 w-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-2 border-border hover:bg-secondary rounded-xl group transition-all"
                        onClick={() => navigate("/cgpa-calculator")}
                      >
                        <Calculator className="mr-3 h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                        CGPA Calculator
                        <ChevronRight className="ml-3 h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Button>
                    </div>

                  </div>
                </Card>
              </motion.div>

              {/* Footer Text */}
              <div className="text-center pb-6 pt-2">
                <p className="text-muted-foreground text-xs font-medium">
                  Designed to help you land your dream job &bull; Best regards, <span className="font-semibold text-foreground">Priyal Kumar (CSE'27, HBTU)</span>
                </p>
              </div>
            </>
          )}

        </main>
      </div>

      <PremiumModal
        open={premiumModal.open}
        onClose={() => setPremiumModal(prev => ({ ...prev, open: false }))}
        plan={premiumModal.plan}
        onSuccess={checkPurchase}
      />
    </div>
  );
};

export default ATSFriendlyResume;
