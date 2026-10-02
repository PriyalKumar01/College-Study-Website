import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Trophy, X, PartyPopper, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { getLeagueUpgradeInfo } from '@/lib/contributorBadgeUtils';

interface MilestoneCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  contributorName: string;
  coins: number;
  tierName?: string;
  isFirstContribution?: boolean;
  isPendingApproval?: boolean;
}

export const MilestoneCelebrationModal: React.FC<MilestoneCelebrationModalProps> = ({
  isOpen,
  onClose,
  contributorName,
  coins,
  tierName,
  isFirstContribution = false,
  isPendingApproval = false,
}) => {
  if (!isOpen) return null;

  const leagueInfo = getLeagueUpgradeInfo(coins);
  const resolvedTier = tierName || leagueInfo.badgeLabel;
  const isFirst = isFirstContribution || coins === 1;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 text-center text-white z-10"
        >
          {/* Top Gold Glowing Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Celebration Icon with Pulse */}
          <div className="relative mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-4xl"
            >
              {isFirst ? '🛡️' : leagueInfo.icon}
            </motion.div>
            <span className="absolute -top-2 -right-2 text-2xl">🎉</span>
            <span className="absolute -bottom-1 -left-2 text-2xl">✨</span>
          </div>

          {/* Badge Pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
            <PartyPopper className="h-3.5 w-3.5" />
            {isFirst ? 'Welcome to Contributor League!' : `${resolvedTier} Unlocked!`}
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-200 to-white mb-2 leading-tight">
            Congratulations, {contributorName}! 🎉
          </h2>

          {/* Subheading / Tier info */}
          <p className="text-sm font-semibold text-amber-300 mb-3">
            {isFirst ? (
              <span>You are now in the <span className="underline decoration-amber-400 font-extrabold text-white">Iron Contributor 🛡️</span> category!</span>
            ) : (
              <span>You are now promoted to the <span className="underline decoration-amber-400 font-extrabold text-white">{resolvedTier}</span> category!</span>
            )}
          </p>

          {/* Supportive Encouragement Card */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4 space-y-2 text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
              <span>Keep Contributing & Inspiring!</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Contributing study materials is an incredible and noble way to support your fellow batchmates and juniors. Your valuable notes help thousands of students learn and excel every single day!
            </p>

            {isPendingApproval ? (
              <div className="mt-2 pt-2 border-t border-white/10 flex items-start gap-2 text-[11px] text-amber-300/90 font-medium">
                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-emerald-400 mt-0.5" />
                <span>
                  As soon as the administrator verifies your submission, your name and updated PDF count will be live on the <strong>Contributor Leaderboard</strong>!
                </span>
              </div>
            ) : (
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">Total Approved Contributions:</span>
                <span className="font-extrabold text-amber-400 text-sm">{coins} PDFs</span>
              </div>
            )}
          </div>

          {/* Next League Target Teaser */}
          {leagueInfo.nextTier && (
            <div className="mb-5 px-3 py-2 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200 flex items-center justify-between">
              <span>Next Goal: <strong>{leagueInfo.nextTier}</strong></span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400">
                {leagueInfo.neededForNext} more {leagueInfo.neededForNext === 1 ? 'PDF' : 'PDFs'} <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          )}

          {/* Action button */}
          <Button
            onClick={onClose}
            className="w-full h-11 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all"
          >
            {isFirst ? 'Let\'s Help More Students! 🚀' : 'Keep Inspiring & Contributing! 🚀'}
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MilestoneCelebrationModal;
