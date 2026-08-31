# Motion Principles — Eonrisia

## Philosophy

Motion is not decoration. Every animation serves a purpose: it communicates state, guides attention, or confirms an action. The Eonrisia motion system is **purposeful, smooth, and never excessive**. It contributes to the premium feel without overwhelming the content.

---

## Core Principles

### 1. Meaningful
Every animation has a reason. If removing it doesn't change the user's understanding, it should be removed.

### 2. Fast
Animations are snappy. Nothing lingers. Users never wait for an animation to finish before they can act.

### 3. Consistent
The same type of interaction animates the same way everywhere. Users build intuition from consistency.

### 4. Accessible
All animations respect `prefers-reduced-motion`. When this preference is set, animations are disabled or reduced to instant transitions.

---

## Duration Scale

| Token | Value | Usage |
|---|---|---|
| `--duration-instant` | `50ms` | Micro-feedback (button press, checkbox) |
| `--duration-fast` | `150ms` | Hover states, focus rings |
| `--duration-normal` | `250ms` | Standard transitions (fade, slide) |
| `--duration-slow` | `400ms` | Page section reveals, modals |
| `--duration-slower` | `600ms` | Hero entrances, large reveals |

---

## Easing Curves

| Token | Value | Usage |
|---|---|---|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard transitions |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the screen |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful, bouncy micro-interactions |
| `--ease-smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Subtle, premium feel |

### Framer Motion Variants (shared)

```ts
// variants/index.ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  },
}

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }
  },
}
```

---

## Scroll Reveals

All page sections animate in on scroll using Framer Motion's `whileInView` prop with `once: true`.

```tsx
<motion.section
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
```

- Cards in a grid stagger with `staggerContainer` (0.08s between children)
- Hero content staggers more slowly (0.12s between children)
- Always use `once: true` — sections do not re-animate on scroll back

---

## Micro-Interactions

| Element | Interaction | Animation |
|---|---|---|
| Button (primary) | Hover | Scale 1.02, brightness +5%, 150ms ease-out |
| Button (primary) | Press | Scale 0.97, 50ms ease-in |
| Card | Hover | Translate Y -4px, shadow elevation increase, 200ms ease-out |
| Nav link | Hover | Underline slides in from left, brand-500 color, 150ms |
| Input field | Focus | Border transitions to brand-500, subtle glow, 150ms |
| Mobile menu | Open/close | Slide in from right, backdrop fade, 300ms ease-out |
| Page transition | Route change | Fade out 150ms, fade in 200ms |

---

## Reduced Motion

All animations must degrade gracefully:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

In Framer Motion, check `useReducedMotion()` hook and pass static variants when true.

---

## Rules

- **No infinite loops on content.** Loading spinners and skeleton loaders only.
- **No auto-playing video backgrounds** unless user has interacted.
- **No parallax on mobile.** Parallax is desktop-only and subtle (max 20px offset).
- **Duration cap: 600ms.** Nothing takes longer than 600ms to animate in.
- **Never animate layout properties** (width, height, top, left) — use transform instead.
