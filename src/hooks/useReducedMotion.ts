'use client'

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'
import { reducedVariants } from '@/variants'
import type { Variants } from 'framer-motion'

/**
 * Returns motion variants respecting the user's prefers-reduced-motion setting.
 * Pass the normal variants — this hook returns them as-is or swaps for
 * reducedVariants when the user prefers reduced motion.
 *
 * @example
 * const variants = useReducedMotion(fadeUp)
 * <motion.div variants={variants} initial="hidden" whileInView="visible" />
 */
export function useReducedMotion(normalVariants: Variants): Variants {
  const prefersReduced = useFramerReducedMotion()
  return prefersReduced ? reducedVariants : normalVariants
}
