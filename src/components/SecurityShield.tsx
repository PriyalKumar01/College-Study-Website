import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

/**
 * SecurityShield Component
 * - Disables Right-Click (context menu) across study material pages
 * - Disables Ctrl+P (Print) / Ctrl+S (Save) / Ctrl+U (Source) / F12 (Inspect)
 * - Allows text selection and right-click on input/form fields so normal typing is unaffected
 */
export const SecurityShield = () => {
  const { toast } = useToast();

  useEffect(() => {
    // 1. Right-Click Context Menu Guard
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Allow right-click inside form fields (inputs, textareas, contentEditable)
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.closest('input') ||
          target.closest('textarea'))
      ) {
        return;
      }

      e.preventDefault();
    };

    // 2. Keyboard Shortcuts Guard (Anti-Print / Anti-Save / Anti-Inspect)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Block Ctrl+P / Cmd+P (Print)
      if (isCtrlOrCmd && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        toast({
          title: 'Printing Disabled',
          description: 'Direct printing is restricted to protect academic resources and notes.',
          variant: 'destructive',
        });
        return;
      }

      // Block Ctrl+S / Cmd+S (Save page/file)
      if (isCtrlOrCmd && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return;
      }

      // Block Ctrl+U / Cmd+U (View source)
      if (isCtrlOrCmd && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return;
      }

      // Block F12 (DevTools shortcut)
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }

      // Block Ctrl+Shift+I / Ctrl+Shift+J (DevTools)
      if (isCtrlOrCmd && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return;
      }
    };

    window.addEventListener('contextmenu', handleContextMenu, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [toast]);

  return null;
};

// Shield active
export default SecurityShield;
