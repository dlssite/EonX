# Design Tokens — Eonrisia

Design tokens are the atomic values that define every visual decision. They are defined once as CSS custom properties in `src/styles/tokens.css` and referenced everywhere else. No raw values in components — ever.

---

## Token File Structure

```
src/styles/
├── tokens.css      ← All raw token values (color, space, type, motion)
└── globals.css     ← Base reset, semantic tokens, component base styles
```

---

## Color Tokens

See [`../01-brand/color-system.md`](../01-brand/color-system.md) for the full color palette rationale.

```css
/* src/styles/tokens.css */
:root {
  /* Base */
  --color-base-950: #0A0A0F;
  --color-base-900: #111118;
  --color-base-800: #1A1A26;
  --color-base-700: #252535;
  --color-base-100: #F4F4F8;
  --color-base-50:  #FAFAFD;

  /* Brand */
  --color-brand-600: #5148D4;
  --color-brand-500: #6C63FF;
  --color-brand-400: #8A83FF;
  --color-brand-300: #A9A4FF;

  /* Accent */
  --color-accent-500: #FF6B35;
  --color-accent-400: #FF8A5C;

  /* Semantic */
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error:   #EF4444;
  --color-info:    #3B82F6;

  /* Text */
  --color-text-primary:   #F4F4F8;
  --color-text-secondary: #9494A8;
  --color-text-tertiary:  #5C5C70;
  --color-text-inverse:   #0A0A0F;
}

[data-theme="light"] {
  --color-base-950: #FAFAFD;
  --color-base-900: #F4F4F8;
  --color-base-800: #E8E8F0;
  --color-base-700: #D0D0E0;
  --color-text-primary:   #0A0A0F;
  --color-text-secondary: #3C3C50;
  --color-text-tertiary:  #6C6C80;
  --color-text-inverse:   #F4F4F8;
}
```

---

## Typography Tokens

See [`../01-brand/typography.md`](../01-brand/typography.md) for typeface rationale.

```css
:root {
  /* Scale */
  --text-display:  clamp(2.5rem, 6vw, 4.5rem);
  --text-h1:       clamp(2rem, 4.5vw, 3rem);
  --text-h2:       clamp(1.5rem, 3.5vw, 2.25rem);
  --text-h3:       1.5rem;
  --text-h4:       1.125rem;
  --text-body-lg:  1.125rem;
  --text-body:     1rem;
  --text-body-sm:  0.875rem;
  --text-label:    0.75rem;

  /* Line Heights */
  --leading-display: 1.05;
  --leading-heading: 1.15;
  --leading-body:    1.7;
  --leading-tight:   1.25;

  /* Letter Spacing */
  --tracking-tight:   -0.02em;
  --tracking-normal:  0em;
  --tracking-wide:    0.05em;
  --tracking-widest:  0.12em;
}
```

---

## Spacing Tokens

```css
:root {
  --space-1:  0.25rem;   /*  4px */
  --space-2:  0.5rem;    /*  8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
}
```

---

## Border Radius Tokens

```css
:root {
  --radius-sm:   0.25rem;  /*  4px */
  --radius-md:   0.5rem;   /*  8px */
  --radius-lg:   0.75rem;  /* 12px */
  --radius-xl:   1rem;     /* 16px */
  --radius-2xl:  1.5rem;   /* 24px */
  --radius-full: 9999px;   /* pill */
}
```

---

## Shadow Tokens

```css
:root {
  --shadow-sm:  0 1px 2px 0 rgba(0,0,0,0.4);
  --shadow-md:  0 4px 12px 0 rgba(0,0,0,0.5);
  --shadow-lg:  0 8px 24px 0 rgba(0,0,0,0.6);
  --shadow-xl:  0 16px 40px 0 rgba(0,0,0,0.7);
  --shadow-brand: 0 0 24px 0 rgba(108,99,255,0.3);
}
```

---

## Motion Tokens

See [`../01-brand/motion-principles.md`](../01-brand/motion-principles.md) for animation philosophy.

```css
:root {
  --duration-instant: 50ms;
  --duration-fast:    150ms;
  --duration-normal:  250ms;
  --duration-slow:    400ms;
  --duration-slower:  600ms;

  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in:      cubic-bezier(0.4, 0, 1, 1);
  --ease-out:     cubic-bezier(0, 0, 0.2, 1);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth:  cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## Z-Index Tokens

```css
:root {
  --z-base:     0;
  --z-raised:   10;
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-overlay:  300;
  --z-modal:    400;
  --z-toast:    500;
}
```

---

## Token Usage Rule

Every value in a component must reference a token:

```tsx
/* ✅ Correct */
<div className="bg-base-900 text-text-primary p-6 rounded-lg">

/* ❌ Wrong */
<div style={{ backgroundColor: '#111118', padding: '24px' }}>
```
