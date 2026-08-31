# Navigation Structure — Eonrisia

## Header Navigation

### Phase 1 (Launch)

```
[Eonrisia Logo]    About    Projects    Team    Volunteer    [Get Involved →]
```

- Logo: links to `/`
- "Get Involved" is the primary CTA button (brand-500)
- Sticky header: transparent over hero → `bg-base-900/95 backdrop-blur-md` on scroll
- Active page highlighted with an underline or color change on its nav link

### Phase 2 (Expanded)

```
[Eonrisia Logo]    About    Projects    Team    Volunteer    Updates    [Get Involved →]
```

---

## Mobile Navigation

- Hamburger icon (three lines → X on open) in top right
- Tapping opens a full-height drawer from the right
- Drawer background: `bg-base-900`
- Links stacked vertically with large tap targets (min 44px)
- "Get Involved" CTA button at the bottom of the drawer
- Backdrop overlay on left side, clicking it closes the drawer
- Animation: slide from right, 300ms ease-out

---

## Footer Navigation

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]                                                   │
│  Building immersive worlds, together.                    │
│                                                          │
│  Eonrisia    |  Get Involved  |  Work    |  Connect      │
│  Home        |  Volunteer     |  Projects|  YouTube      │
│  About       |  Work With Us  |  Sanctyria| Instagram    │
│  Mission     |  Donate        |  Press   |  TikTok       │
│  Governance  |  Contact       |  Partners|  X (Twitter)  │
│                                                          │
│  © 2026 Eonrisia. All rights reserved.                  │
└─────────────────────────────────────────────────────────┘
```

- Footer columns collapse to 2 (tablet) and 1 (mobile — accordion expand)
- Copyright year is dynamically updated
- Social links are icon-only on mobile to save space

---

## Breadcrumb Navigation

All interior pages show a breadcrumb below the header:

```
Home > Projects > Sanctyria
```

- Rendered as a `<nav aria-label="Breadcrumb">` with `<ol>` list
- Current page is last item, not linked, `aria-current="page"`
- Structured data: BreadcrumbList JSON-LD on all interior pages

---

## Navigation Rules

- **Maximum 5 primary nav items** (excluding CTA). Beyond this, use a mega-menu or reorganize.
- **Never link to external sites** from the primary header navigation.
- **CTA always links to a form or action page** — never to an informational page.
- **Navigation content is CMS-driven** — managed in Payload `navigation` and `footer` globals, not hardcoded.
