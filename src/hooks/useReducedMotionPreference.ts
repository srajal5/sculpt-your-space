import { useState, useEffect } from 'react';

/**
 * Accurately determines if the user prefers reduced motion using the standards-compliant
 * `(prefers-reduced-motion: reduce)` media query.
 */
export function useReducedMotionPreference(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePreference);
      return () => mediaQuery.removeEventListener('change', updatePreference);
    } else {
      mediaQuery.addListener(updatePreference);
      return () => mediaQuery.removeListener(updatePreference);
    }
  }, []);

  return prefersReducedMotion;
}
