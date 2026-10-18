import { useEffect } from 'react';

export default function SecurityShield() {
  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      e.preventDefault();
    };
    window.addEventListener('contextmenu', onContext);
    return () => window.removeEventListener('contextmenu', onContext);
  }, []);
  return null;
}
