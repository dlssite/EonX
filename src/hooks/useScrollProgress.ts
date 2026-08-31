'use client'

import { useScroll, type MotionValue } from 'framer-motion'

/**
 * Returns a Framer Motion MotionValue representing vertical scroll progress (0–1).
 * Useful for parallax effects and header opacity transitions.
 *
 * @example
 * const scrollProgress = useScrollProgress()
 * const opacity = useTransform(scrollProgress, [0, 0.1], [0, 1])
 */
export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll()
  return scrollYProgress
}

/**
 * Returns a boolean MotionValue indicating whether the page has been scrolled
 * past a given threshold (in pixels). Used for the header background transition.
 *
 * @example
 * const isPastThreshold = useScrolledPast(80)
 */
export function useScrolledPast(threshold = 80): boolean {
  // This is a simplified hook for SSR compatibility.
  // Client component usage handles the reactive version.
  if (typeof window === 'undefined') return false
  return window.scrollY > threshold
}
