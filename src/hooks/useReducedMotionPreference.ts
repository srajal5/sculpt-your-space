import { useState, useEffect } from 'react';

/**
 * Accurately determines if the user prefers reduced motion using the standards-compliant
 * `(prefers-reduced-motion: reduce)` media query.
 *
 * In development mode (`!import.meta.env.PROD`), defaults to `false` (full animation mode)
 * so developers can preview and verify interactive effects regardless of local OS/browser settings.
 * In production (`import.meta.env.PROD`), strictly evaluates and respects the user's accessibility setting.
 */
export function useReducedMotionPreference(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (!import.meta.env.PROD) return false;
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!import.meta.env.PROD) {
      setPrefersReducedMotion(false);
      return;
    }

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
