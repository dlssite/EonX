import type { Variants } from 'framer-motion'

/**
 * Shared Framer Motion animation variants.
 * Import from here — never define inline animation objects in components.
 *
 * All variants respect useReducedMotion() via the hooks/useReducedMotion.ts hook.
 * Pass `reducedVariants` instead when the user prefers reduced motion.
 */

// ── Fade up — standard scroll reveal ────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// ── Fade in — simple opacity ─────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

// ── Scale up — cards and modals ──────────────────────────────
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

// ── Slide in from right — mobile menu ────────────────────────
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: '100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  },
}

// ── Backdrop ─────────────────────────────────────────────────
export const backdropVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
}

// ── Stagger container — wraps staggered children ─────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// ── Hero stagger container — slower stagger ──────────────────
export const heroStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

// ── Drawer slide from right ──────────────────────────────────
export const drawerSlide: Variants = {
  hidden: { x: '100%', opacity: 0.8 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    x: '100%',
    opacity: 0.8,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  },
}

// ── Tab content transition ───────────────────────────────────
export const tabContentVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 1, 1],
    },
  },
}

// ── Reduced motion fallback — instant, no movement ───────────
export const reducedVariants: Variants = {
  hidden: {},
  visible: {},
  exit: {},
}
