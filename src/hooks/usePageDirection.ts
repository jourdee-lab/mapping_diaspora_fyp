import { createContext, useContext } from 'react';

/**
 * Provided by AppRoutes (stable lifecycle). +1 = forward, -1 = backward.
 * PageTransition reads this instead of tracking refs locally — local refs
 * reset on every remount (AnimatePresence gives each page a new key).
 */
export const PageDirectionContext = createContext<number>(1);

export function usePageDirection(): number {
  return useContext(PageDirectionContext);
}
