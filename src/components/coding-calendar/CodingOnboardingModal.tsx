import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import collegeLogo from '@/assets/college-study-hub-logo.png';
import onboardingCalendarImg from '@/assets/csh_onboarding_calendar.jpg';
import onboardingSheetsImg from '@/assets/csh_onboarding_sheets.jpg';
import onboardingKitsImg from '@/assets/csh_onboarding_kits.jpg';
import onboardingSecurityImg from '@/assets/csh_onboarding_security.jpg';

export interface CodingOnboardingCardProps {
  onCompleteAccessRequest: () => void;
  isSubmitting?: boolean;
  isHbtuOrAdmin?: boolean;
  onSkipOrClose?: () => void;
}

export const CodingOnboardingCard: React.FC<CodingOnboardingCardProps> = ({
  onCompleteAccessRequest,
  isSubmitting = false,
  isHbtuOrAdmin = false,
  onSkipOrClose,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 'calendar',
      tag: '01 • REAL-TIME CALENDAR',
      title: 'Competitive Contest Calendar',
      subtitle: 'Real-time contest countdowns across LeetCode, Codeforces, CodeChef, and AtCoder with 1-click Google Calendar sync.',
      image: onboardingCalendarImg,
      highlights: [
        'Live Codeforces official rounds integration',
        'Mathematical weekly LeetCode & CodeChef schedules',
        'Direct 1-click Participate & Google Calendar reminders',
      ],
    },
    {
      id: 'sheets',
      tag: '02 • STRUCTURED ROADMAPS',
      title: 'NeetCode 150 & Striver A2Z (455 Problems)',
      subtitle: 'The two most respected engineering curricula with step-by-step lecture tracking and video solutions.',
      image: onboardingSheetsImg,
      highlights: [
        'Complete 150 NeetCode problems across all 18 topics',
        'Complete 455 Striver A2Z problems across all 18 steps',
        'Green completion indicators with video explanations',
      ],
    },
    {
      id: 'kits',
      tag: '03 • INTERVIEW PREPARATION',
      title: 'Unlocked FAANG Kits & Engineering Notes',
      subtitle: 'Curated high-frequency question kits from Google, Amazon, Microsoft, and Meta with verified handwritten notes.',
      image: onboardingKitsImg,
      highlights: [
        'Frequency tags (e.g. Asked 35x in Google SDE rounds)',
        'System Design Primer & core CS interview notes',
        '26 curated high-star open-source GitHub repositories',
      ],
    },
    {
      id: 'security',
      tag: '04 • ACCESS & FAIR USE',
      title: 'Student Verification & Academic License',
      subtitle: 'Free for student learning. Official @hbtu.ac.in IDs are automatically unlocked. External accounts undergo admin verification.',
      image: onboardingSecurityImg,
      highlights: [
        'Strictly for individual non-commercial educational prep',
        'Automated instant unlock for @hbtu.ac.in student accounts',
        'Single-click owner dashboard review for external accounts',
      ],
    },
  ];

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      onCompleteAccessRequest();
    }
  };

  const handlePrev = () => {
    if (activeSlide > 0) setActiveSlide(activeSlide - 1);
  };

  const current = slides[activeSlide];
  const isLastSlide = activeSlide === slides.length - 1;

  return (
    <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-md shadow-2xl overflow-hidden flex flex-col text-white my-auto select-none">
      {/* Top Header */}
      <div className="px-4 py-2.5 sm:py-3 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={collegeLogo}
            alt="College Study"
            className="w-5 h-5 rounded-sm object-contain bg-white/5 p-0.5 border border-white/10"
          />
          <span className="text-xs sm:text-sm font-black tracking-tight text-white">
            College Study • Coding Space
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-sm border border-slate-700">
            Slide {activeSlide + 1} of {slides.length}
          </span>
          {onSkipOrClose && (
            <button
              onClick={onSkipOrClose}
              className="p-1 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Leave / Exit"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Responsive Body: Left Half Pic, Right Half Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:p-5 items-center">
        {/* Left Column: Visual Poster Card */}
        <div className="md:col-span-5 flex flex-col">
          <div className="relative w-full h-44 sm:h-56 md:h-64 rounded-md overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-slate-950/90 backdrop-blur-sm px-2 py-0.5 rounded-sm border border-emerald-500/30 inline-flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                {current.tag}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Subtitle, Highlights & Dots */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3">
          {/* Title & Description */}
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-white leading-tight">
              {current.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {current.subtitle}
            </p>
          </div>

          {/* Highlights checklist */}
          <div className="p-3 rounded-md bg-slate-950/80 border border-slate-800 space-y-2">
            {current.highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-start gap-1.5 pt-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-1.5 rounded-sm transition-all ${
                  activeSlide === i ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation: STRICT NEUTRAL/EMERALD HOVER (NO VIOLET!) */}
      <div className="px-4 py-2.5 sm:py-3 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-medium">Academic Student Access</span>
        </div>

        <div className="flex items-center gap-2">
          {activeSlide > 0 && (
            <button
              onClick={handlePrev}
              disabled={isSubmitting}
              className="h-8 px-3 rounded-sm text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 hover:text-white transition-colors flex items-center"
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-0.5" /> Back
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="h-8 px-4 rounded-sm text-xs font-black bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white transition-colors shadow-sm flex items-center gap-1"
          >
            {isSubmitting ? (
              'Processing...'
            ) : isLastSlide ? (
              isHbtuOrAdmin ? 'Agree & Enter Coding Space ➔' : 'Agree & Request Access ➔'
            ) : (
              <>
                Next <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
