export interface ContributorBadge {
  tierName: string;
  badgeLabel: string;
  icon: string;
  badgeClass: string;
  bgGradient: string;
  description: string;
}

/**
 * Returns the exact tier badge for a contributor based on rank and PDF coin count.
 */
export function getContributorBadge(rank: number, coins: number): ContributorBadge {
  // Dominator Tier (Strictly Top 3)
  if (rank === 1) {
    return {
      tierName: 'Dominator',
      badgeLabel: 'Dominator #1 👑',
      icon: '👑',
      badgeClass: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-extrabold shadow-sm border border-yellow-300',
      bgGradient: 'from-yellow-500/20 via-amber-500/10 to-transparent',
      description: 'Supreme Rank 1 Contributor of College Study Hub',
    };
  }
  if (rank === 2) {
    return {
      tierName: 'Dominator',
      badgeLabel: 'Dominator #2 🥈',
      icon: '🥈',
      badgeClass: 'bg-gradient-to-r from-slate-400 to-zinc-500 text-white font-extrabold shadow-sm border border-slate-300',
      bgGradient: 'from-slate-400/20 via-zinc-500/10 to-transparent',
      description: 'Elite Rank 2 Dominator on the Podium',
    };
  }
  if (rank === 3) {
    return {
      tierName: 'Dominator',
      badgeLabel: 'Dominator #3 🥉',
      icon: '🥉',
      badgeClass: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-extrabold shadow-sm border border-orange-300',
      bgGradient: 'from-amber-600/20 via-orange-600/10 to-transparent',
      description: 'Bronze Podium Dominator Contributor',
    };
  }

  // Rank 4+ and Milestones
  if (coins >= 50) {
    return {
      tierName: 'Grand Master',
      badgeLabel: 'Grand Master Contributor',
      icon: '🔮',
      badgeClass: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold border border-purple-400 shadow-xs',
      bgGradient: 'from-purple-500/15 to-transparent',
      description: '50+ PDFs Contributed — Legendary Grand Master',
    };
  }

  if (coins >= 25) {
    return {
      tierName: 'Master',
      badgeLabel: 'Master Contributor',
      icon: '💎',
      badgeClass: 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold border border-cyan-400 shadow-xs',
      bgGradient: 'from-cyan-500/15 to-transparent',
      description: '25+ PDFs Contributed — Senior Master Status',
    };
  }

  if (coins >= 15) {
    return {
      tierName: 'Gold',
      badgeLabel: 'Gold Contributor',
      icon: '🥇',
      badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-700/60',
      bgGradient: 'from-amber-500/10 to-transparent',
      description: '15+ PDFs Contributed — Gold Star Contributor',
    };
  }

  if (coins >= 8) {
    return {
      tierName: 'Silver',
      badgeLabel: 'Silver Contributor',
      icon: '🥈',
      badgeClass: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-700',
      bgGradient: 'from-slate-500/10 to-transparent',
      description: '8+ PDFs Contributed — Silver Tier Contributor',
    };
  }

  if (coins >= 3) {
    return {
      tierName: 'Bronze',
      badgeLabel: 'Bronze Contributor',
      icon: '🥉',
      badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300 font-semibold border border-orange-200 dark:border-orange-800',
      bgGradient: 'from-orange-500/10 to-transparent',
      description: '3+ PDFs Contributed — Active Community Contributor',
    };
  }

  // 1 to 2 PDFs
  return {
    tierName: 'Iron',
    badgeLabel: 'Iron Contributor',
    icon: '🛡️',
    badgeClass: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 font-medium border border-zinc-200 dark:border-zinc-700',
    bgGradient: 'from-zinc-500/5 to-transparent',
    description: 'Starting milestone for verified new contributors (1+ PDF)',
  };
}

export interface LeagueInfo {
  tierName: string;
  badgeLabel: string;
  icon: string;
  threshold: number;
  nextTier: string | null;
  neededForNext: number;
  badgeClass: string;
}

export function getLeagueUpgradeInfo(coins: number): LeagueInfo {
  if (coins >= 50) {
    return {
      tierName: 'Grand Master',
      badgeLabel: 'Grand Master Contributor',
      icon: '🔮',
      threshold: 50,
      nextTier: null,
      neededForNext: 0,
      badgeClass: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white',
    };
  }
  if (coins >= 25) {
    return {
      tierName: 'Master',
      badgeLabel: 'Master Contributor',
      icon: '💎',
      threshold: 25,
      nextTier: 'Grand Master',
      neededForNext: 50 - coins,
      badgeClass: 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white',
    };
  }
  if (coins >= 15) {
    return {
      tierName: 'Gold',
      badgeLabel: 'Gold Contributor',
      icon: '🥇',
      threshold: 15,
      nextTier: 'Master',
      neededForNext: 25 - coins,
      badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
    };
  }
  if (coins >= 8) {
    return {
      tierName: 'Silver',
      badgeLabel: 'Silver Contributor',
      icon: '🥈',
      threshold: 8,
      nextTier: 'Gold',
      neededForNext: 15 - coins,
      badgeClass: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
    };
  }
  if (coins >= 3) {
    return {
      tierName: 'Bronze',
      badgeLabel: 'Bronze Contributor',
      icon: '🥉',
      threshold: 3,
      nextTier: 'Silver',
      neededForNext: 8 - coins,
      badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300',
    };
  }
  return {
    tierName: 'Iron',
    badgeLabel: 'Iron Contributor',
    icon: '🛡️',
    threshold: 1,
    nextTier: 'Bronze',
    neededForNext: Math.max(1, 3 - coins),
    badgeClass: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
  };
}

export function isLeagueMilestone(count: number): boolean {
  return [1, 3, 8, 15, 25, 50].includes(count);
}

