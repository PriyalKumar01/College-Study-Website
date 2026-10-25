import React from 'react';
import { Share2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { shareContent, buildSubjectShareUrl } from '@/utils/shareUtils';
import { cn } from '@/lib/utils';

export interface SubjectShareButtonProps {
  subjectName: string;
  subjectId?: string;
  semesterName?: string;
  route?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'icon' | 'badge' | 'button';
  label?: string;
  title?: string;
}

export const SubjectShareButton: React.FC<SubjectShareButtonProps> = ({
  subjectName,
  subjectId,
  semesterName,
  route,
  className,
  size = 'sm',
  variant = 'icon',
  label,
  title,
}) => {
  const location = useLocation();
  const { toast } = useToast();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const targetPath = route || location.pathname;
    const shareUrl = buildSubjectShareUrl(targetPath, subjectId, subjectName);
    const displaySemester = semesterName ? ` for ${semesterName}` : '';
    const shareTitle = `${subjectName} Notes${displaySemester}`;
    const shareText = `Check out ${subjectName} notes${displaySemester} on College Study Hub:`;

    await shareContent({
      title: shareTitle,
      text: shareText,
      url: shareUrl,
      toast,
    });
  };

  const iconSizes = {
    xs: 'h-3 w-3',
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
  };

  const defaultTitle = title || `Share ${subjectName} Notes`;

  if (variant === 'badge') {
    return (
      <button
        type="button"
        onClick={handleShare}
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30 transition-all cursor-pointer shadow-2xs active:scale-95',
          className
        )}
        title={defaultTitle}
        aria-label={defaultTitle}
      >
        <Share2 className={iconSizes[size]} />
        <span>{label || 'Share'}</span>
      </button>
    );
  }

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleShare}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all cursor-pointer active:scale-95',
          className
        )}
        title={defaultTitle}
        aria-label={defaultTitle}
      >
        <Share2 className={iconSizes[size]} />
        <span>{label || 'Share Notes'}</span>
      </button>
    );
  }

  // Default 'icon' variant - ALWAYS visible, clearly styled with emerald tint & border
  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        'p-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 dark:border-emerald-500/40 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-slate-950 transition-all duration-200 cursor-pointer shrink-0 flex items-center justify-center shadow-2xs active:scale-95',
        className
      )}
      title={defaultTitle}
      aria-label={defaultTitle}
    >
      <Share2 className={iconSizes[size]} />
    </button>
  );
};

export default SubjectShareButton;
