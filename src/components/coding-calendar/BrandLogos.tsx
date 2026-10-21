import React from 'react';
import leetcodeOfficialLogo from '@/assets/leetcode-official-avatar.png';
import githubOfficialLogo from '@/assets/github-official-logo.png';
import codechefOfficialLogo from '@/assets/codechef-official-avatar.png';
import atcoderOfficialLogo from '@/assets/atcoder-official-avatar.png';
import code360OfficialLogo from '@/assets/code360-official-logo.png';

// Platform Logos
export const LeetCodeLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <img
    src={leetcodeOfficialLogo}
    alt="LeetCode"
    className={`${className} object-contain rounded-md`}
  />
);

export const GitHubLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`} xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const CodeChefLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <img
    src={codechefOfficialLogo}
    alt="CodeChef"
    className={`${className} object-contain rounded-md`}
  />
);

export const AtCoderLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <img
    src={atcoderOfficialLogo}
    alt="AtCoder"
    className={`${className} object-contain rounded-md`}
  />
);

export const Code360Logo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <img
    src={code360OfficialLogo}
    alt="Code360"
    className={`${className} object-contain rounded-sm`}
  />
);

export const CodeforcesLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="5" height="12" rx="1.5" fill="#FFD400"/>
    <rect x="9.5" y="4" width="5" height="18" rx="1.5" fill="#1874D2"/>
    <rect x="17" y="14" width="5" height="8" rx="1.5" fill="#C92127"/>
  </svg>
);

export const GfgLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.8V14h3v-2h-5v4.8h2zm-2-6.6c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2 1.2.54 1.2 1.2-.54 1.2-1.2 1.2z" fill="#2F8D46"/>
  </svg>
);

export const YouTubeLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
  </svg>
);

// Company Logos
export const GoogleLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export const AmazonLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M13.9 14.8c-1.5.8-3.4 1.2-5.4 1.2-3.8 0-6.7-1.4-8.5-3.9-.2-.3 0-.7.3-.8.2-.1.5 0 .7.2 1.6 2.2 4.3 3.5 7.6 3.5 1.8 0 3.5-.4 4.9-1.1.4-.2.8.2.4.9zm4.2-.6c-.2-.3-.5-.4-.8-.3-.2.1-.3.3-.2.5.3.7.4 1.4.4 2.1 0 .2.2.4.4.4.2 0 .4-.2.4-.4 0-.8-.1-1.6-.2-2.3z" fill="#FF9900"/>
    <path d="M19.1 16.9c-.3-.4-1.8-.4-2.5-.3-.2 0-.3.2-.2.4.7.7 1.7 1.4 2.5 1.3.3 0 .4-.2.2-.4-.1-.1-.3-.6 0-1z" fill="#FF9900"/>
    <path d="M13.8 7.4c0-1.8-1.2-3.1-3.6-3.1-2.2 0-3.6 1.1-3.9 2.7-.1.3.1.5.4.5h1.2c.3 0 .4-.2.5-.4.2-.8.8-1.3 1.8-1.3 1.1 0 1.7.6 1.7 1.6v.7c-2.4.1-4.8.7-4.8 3.1 0 1.5 1 2.5 2.6 2.5 1.5 0 2.3-.7 2.7-1.6.2.6.7 1 1.6 1 .7 0 1.3-.3 1.7-.8.1-.1 0-.3-.1-.4-.2.1-.5.2-.7.2-.6 0-.8-.4-.8-1V7.4zm-1.9 4.3c-.3.7-1 1.2-1.9 1.2-.9 0-1.4-.6-1.4-1.4 0-1.2 1.1-1.6 3.3-1.7v1.9z" fill="#232F3E"/>
  </svg>
);

export const MicrosoftLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022"/>
    <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00"/>
    <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF"/>
    <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900"/>
  </svg>
);

export const MetaLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6.5C8.3 6.5 5.5 9.1 4 12c1.5 2.9 4.3 5.5 8 5.5s6.5-2.6 8-5.5c-1.5-2.9-4.3-5.5-8-5.5zm0 9c-2.8 0-4.8-1.8-5.8-3.5 1-1.7 3-3.5 5.8-3.5s4.8 1.8 5.8 3.5c-1 1.7-3 3.5-5.8 3.5z" fill="#0668E1"/>
  </svg>
);

export const UberLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#000000"/>
    <path d="M6 8h2.5v5.5c0 1.4.9 2 1.8 2s1.8-.6 1.8-2V8h2.5v5.7c0 2.5-1.8 4.3-4.3 4.3s-4.3-1.8-4.3-4.3V8zm10 0h2.5v10H16V8z" fill="#FFFFFF"/>
  </svg>
);

// Overlapping Company Logo Stack Component
export const OverlappingCompanyStack: React.FC<{ companies?: string[]; limit?: number }> = ({
  companies = [],
  limit = 3,
}) => {
  if (!companies || companies.length === 0) return null;

  const renderLogo = (c: string) => {
    const cl = c.toLowerCase();
    if (cl.includes('google')) return <GoogleLogo className="w-3.5 h-3.5" />;
    if (cl.includes('amazon')) return <AmazonLogo className="w-3.5 h-3.5" />;
    if (cl.includes('microsoft')) return <MicrosoftLogo className="w-3.5 h-3.5" />;
    if (cl.includes('meta') || cl.includes('facebook')) return <MetaLogo className="w-3.5 h-3.5" />;
    if (cl.includes('uber')) return <UberLogo className="w-3.5 h-3.5" />;
    return <span className="text-[9px] font-black">{c.slice(0, 1)}</span>;
  };

  return (
    <div className="flex items-center -space-x-1.5 overflow-hidden">
      {companies.slice(0, limit).map((comp, idx) => (
        <div
          key={idx}
          className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs shrink-0"
          title={`Asked in ${comp}`}
        >
          {renderLogo(comp)}
        </div>
      ))}
      {companies.length > limit && (
        <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[9px] font-black text-slate-500 shrink-0">
          +{companies.length - limit}
        </div>
      )}
    </div>
  );
};
