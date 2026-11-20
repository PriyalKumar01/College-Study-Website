/** Professional compact badge component for recommended study materials */
import React from 'react';
import { FileText } from 'lucide-react';

interface PdfCardBadgeProps {
  className?: string;
  showText?: boolean;
}

export const PdfCardBadge: React.FC<PdfCardBadgeProps> = ({ className = '', showText = true }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-900 dark:bg-slate-800 text-white border border-slate-700/60 dark:border-slate-700 shadow-xs shrink-0 select-none ${className}`}
      title="Verified PDF Document"
    >
      <div className="w-3.5 h-3.5 rounded bg-red-600 flex items-center justify-center shrink-0 shadow-xs">
        <FileText className="h-2 w-2 text-white" />
      </div>
      {showText && (
        <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-100">
          PDF
        </span>
      )}
    </div>
  );
};

export default PdfCardBadge;
