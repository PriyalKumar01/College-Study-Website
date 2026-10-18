import { useEffect } from 'react';

export default function SecurityShield() {
  useEffect(() => {
    const onContext = (e: MouseEvent) => { e.preventDefault(); };
    window.addEventListener('contextmenu', onContext);
    return () => window.removeEventListener('contextmenu', onContext);
  }, []);
  return null;
}
