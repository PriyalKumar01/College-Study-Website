import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Crown } from 'lucide-react';

export type PremiumPlan = 'companies' | 'hr_emails' | 'resume';

interface LockedSectionProps {
  plan: PremiumPlan;
  onUnlock: () => void;
  hasAccess: boolean;
}

export function LockedSection({ plan, onUnlock, hasAccess }: LockedSectionProps) {
  const config = {
    companies: {
      title: '90+ Company Career Pages',
      price: 149,
      icon: '🏢',
      color: 'from-violet-500 to-indigo-600',
      desc: 'Direct links to official career portals of top MNCs, PSUs, Unicorns & Indian conglomerates',
    },
    hr_emails: {
      title: '1800+ HR Email Directory',
      price: 999,
      icon: '📧',
      color: 'from-emerald-500 to-teal-600',
      desc: 'Direct HR contact emails — send genuine applications directly to the right people',
    },
    resume: {
      title: 'ATS Friendly Resume Guide',
      price: 167,
      icon: '📄',
      color: 'from-orange-500 to-amber-600',
      desc: 'Unlock the complete step-by-step Overleaf resume template and ATS optimization guide.',
    },
  }[plan];

  if (hasAccess) return null;

  return (
    <div className="relative w-full">
      {/* Blurred preview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4 pointer-events-none select-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4"
            style={{
              filter: `blur(${i < 2 ? '0px' : i < 4 ? '3px' : '8px'}px)`,
              opacity: 1 - i * 0.08,
            }}
          >
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4" />
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded mb-1 w-1/2" />
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
          </div>
        ))}
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-gray-50 dark:from-gray-950 via-gray-50/80 dark:via-gray-950/80 to-transparent rounded-2xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-6 py-8 max-w-sm mx-auto"
        >
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center mx-auto mb-4 shadow-xl`}>
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
            {config.icon} {config.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            {config.desc}
          </p>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="text-center">
              <div className="text-2xl font-black text-gray-900 dark:text-white">₹{config.price}</div>
              <div className="text-xs text-gray-400 font-medium">One-time · Lifetime</div>
            </div>
          </div>
          <button
            onClick={onUnlock}
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r ${config.color} text-white font-bold text-sm hover:opacity-90 transition-all hover:scale-105 shadow-lg`}
          >
            <Crown className="w-4 h-4" /> Unlock Now
          </button>
          <p className="text-xs text-gray-400 mt-3">Use coupon for discount · 100% secure payment</p>
        </motion.div>
      </div>
    </div>
  );
}
