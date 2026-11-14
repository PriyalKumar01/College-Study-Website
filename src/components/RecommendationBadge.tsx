// Recommendation Badge & Owner Star Toggle Component
import React from 'react';
import { Star } from 'lucide-react';
import { useRecommendations } from '@/hooks/useRecommendations';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface RecommendationBadgeProps {
  note: {
    id?: string;
    url?: string;
    title?: string;
    recommended?: boolean;
    fileName?: string;
  };
  isOwner?: boolean;
  className?: string;
}

export const RecommendationBadge: React.FC<RecommendationBadgeProps> = ({
  note,
  isOwner: propIsOwner,
  className = '',
}) => {
  const { isOwner: authIsOwner } = useAuth();
  const isOwner = propIsOwner ?? authIsOwner ?? false;
  const { isRecommended, toggleRecommendation, removeRecommendation } = useRecommendations();
  const { toast } = useToast();
  const recommended = isRecommended(note);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const newState = await toggleRecommendation(note);
    toast({
      title: newState ? '⭐ Marked as Recommended' : 'Removed from Recommended',
      description: newState
        ? `"${note.title || 'Note'}" is now recommended for all students.`
        : `"${note.title || 'Note'}" removed from recommendations.`,
    });
  };

  const handleDoubleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    await removeRecommendation(note);
    toast({
      title: 'Recommendation Removed',
      description: `"${note.title || 'Note'}" is no longer marked as recommended.`,
    });
  };

  // For regular students: show static badge only if recommended
  if (!isOwner) {
    if (!recommended) return null;
    return (
      <div className={`absolute top-3 right-3 z-10 pointer-events-none ${className}`}>
        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase bg-amber-500 text-white dark:bg-amber-500/90 shadow-xs px-2.5 py-0.5 rounded-full">
          ⭐ Recommended
        </span>
      </div>
    );
  }

  // For Owner: show interactive star toggle + recommended badge
  return (
    <div className={`absolute top-3 right-3 z-20 flex items-center gap-1.5 ${className}`}>
      {recommended && (
        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase bg-amber-500 text-white dark:bg-amber-500/90 shadow-xs px-2 py-0.5 rounded-full">
          ⭐ Recommended
        </span>
      )}
      <button
        type="button"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        title={
          recommended
            ? 'Recommended (Click to toggle · Double-click to remove)'
            : 'Click to mark this note as Recommended for all students'
        }
        className={`p-1 rounded-md transition-all duration-150 cursor-pointer ${
          recommended
            ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 hover:scale-110 shadow-xs'
            : 'bg-muted/80 text-muted-foreground/60 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:scale-105'
        }`}
      >
        <Star
          className={`h-3.5 w-3.5 ${
            recommended ? 'fill-amber-500 text-amber-500' : 'text-current'
          }`}
        />
      </button>
    </div>
  );
};

export default RecommendationBadge;
