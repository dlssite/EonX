# Logo Usage — Eonrisia

## Logo Variants

| Variant | File | Usage |
|---|---|---|
| Primary Wordmark (light) | `Eonrisia-wordmark-light.svg` | On dark backgrounds (default) |
| Primary Wordmark (dark) | `Eonrisia-wordmark-dark.svg` | On light backgrounds |
| Symbol / Mark (light) | `eonrisia-mark-light.svg` | Favicon, small UI, social avatars |
| Symbol / Mark (dark) | `eonrisia-mark-dark.svg` | Small UI on light backgrounds |

All logo files live in `/public/brand/`.

---

## Clear Space

The logo must always have minimum clear space equal to the height of the "E" in the wordmark on all sides. No other visual elements, text, or edges of the screen may enter this space.

---

## Minimum Size

| Variant | Minimum Width |
|---|---|
| Wordmark | `120px` |
| Symbol / Mark | `24px` |

Never display the wordmark below 120px wide. Use the symbol mark at small sizes.

---

## Permitted Uses

- Wordmark on dark backgrounds with full clear space
- Wordmark on light backgrounds with full clear space
- Symbol mark as favicon at `16px`, `32px`, `48px`, `192px`, `512px`
- Symbol mark as social media avatar (square crop, no padding needed)

---

## Prohibited Uses

- **Never stretch or distort** the logo proportions
- **Never recolor** the logo outside of the two approved color variants
- **Never add drop shadows, glows, or effects** to the logo
- **Never place the logo** on a visually busy background without a solid background container
- **Never animate the logo** except for the approved fade-in entrance on page load (opacity 0 → 1, 300ms)
- **Never use the wordmark as a heading** — it is a brand mark, not a typographic element

---

## Logo in the Navigation Header

- The logo in the site header is the **wordmark**
- It links to the homepage (`href="/"`)
- On dark backgrounds: use light variant
- On scroll, if the header transitions to a light background: swap to dark variant
- Size: `height: 32px` on desktop, `height: 28px` on mobile (width scales proportionally)

---

## Favicon Configuration

```html
<!-- In Next.js app/layout.tsx via metadata -->
icons: {
  icon: '/brand/eonrisia-mark-light.svg',
  apple: '/brand/apple-touch-icon.png', // 180x180px
}
```

---

## Brand Asset Location

```
/public/
└── brand/
    ├── Eonrisia-wordmark-light.svg
    ├── Eonrisia-wordmark-dark.svg
    ├── eonrisia-mark-light.svg
    ├── eonrisia-mark-dark.svg
    ├── apple-touch-icon.png
    └── og-default.png          ← Default Open Graph image (1200x630px)
```
