import { useEffect } from 'react';

export default function SecurityShield() {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'u' || e.key === 's')) { e.preventDefault(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  return null;
}
