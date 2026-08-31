# Page Templates — Eonrisia

## Overview

Every page on the site is built from one of five page templates. Templates define the structural pattern — which section types appear and in what order. Content within those sections is CMS-driven.

---

## Template 1: Home (Landing)

Used by: `/`

```
┌─────────────────────────────────┐
│           HEADER                │  sticky, transparent → opaque
├─────────────────────────────────┤
│           HERO                  │  full-viewport, dual CTA
│  headline + subheadline + CTAs  │
├─────────────────────────────────┤
│        MISSION SNAPSHOT         │  3-column value props
├─────────────────────────────────┤
│        PROJECTS TEASER          │  featured projects grid
├─────────────────────────────────┤
│         TEAM PREVIEW            │  4-6 team members
├─────────────────────────────────┤
│          STATS ROW              │  3-4 key org numbers
├─────────────────────────────────┤
│           CTA BAND              │  full-width CTA block
├─────────────────────────────────┤
│           FOOTER                │
└─────────────────────────────────┘
```

**Notes:**
- Hero uses `min-h-screen` with a dark gradient overlay on a background image/video
- All sections animate in on scroll with staggered `fadeUp` variants
- CTA Band at bottom has a brand gradient background

---

## Template 2: Interior (Standard)

Used by: About, Mission & Vision, Governance, Partnerships, Press, Donate

```
┌─────────────────────────────────┐
│           HEADER                │
├─────────────────────────────────┤
│          PAGE HERO              │  eyebrow + headline + lead text
│     (no full-screen height)     │  py-32 max
├─────────────────────────────────┤
│       FLEXIBLE BLOCKS           │  CMS-assembled content blocks
│  (RichText, Image, Stats, CTA)  │  any order, any number
├─────────────────────────────────┤
│           CTA BAND              │  optional, CMS-toggled
├─────────────────────────────────┤
│           FOOTER                │
└─────────────────────────────────┘
```

**Notes:**
- Page hero is shorter than the home hero — `py-32` not full viewport
- Flexible blocks allow the CMS editor to assemble the page without code changes
- The CTA band at the bottom is optional — toggled per page in CMS

---

## Template 3: Collection Index

Used by: Team, Projects, Volunteer (opportunities), Updates (blog)

```
┌─────────────────────────────────┐
│           HEADER                │
├─────────────────────────────────┤
│          PAGE HERO              │  eyebrow + headline + description
├─────────────────────────────────┤
│   FILTER BAR (if applicable)    │  tags, department, status filters
├─────────────────────────────────┤
│         ITEMS GRID              │  cards pulled from CMS collection
│   (responsive: 3→2→1 columns)   │
├─────────────────────────────────┤
│    PAGINATION (if needed)       │  page-based or load-more
├─────────────────────────────────┤
│           CTA BAND              │
├─────────────────────────────────┤
│           FOOTER                │
└─────────────────────────────────┘
```

**Notes:**
- Filter state is stored in URL params (`?filter=design`) for shareability
- Empty state is handled gracefully with a custom empty state component
- Cards use `scaleUp` Framer Motion variant with stagger

---

## Template 4: Detail Page

Used by: `/projects/[slug]`, `/updates/[slug]`

```
┌─────────────────────────────────┐
│           HEADER                │
├─────────────────────────────────┤
│       BREADCRUMB NAV            │  Projects → Project Name
├─────────────────────────────────┤
│       ARTICLE HERO              │  cover image + title + meta
├─────────────────────────────────┤
│       ARTICLE BODY              │  rich text content from CMS
├─────────────────────────────────┤
│    RELATED ITEMS (optional)     │  3 related projects or posts
├─────────────────────────────────┤
│           CTA BAND              │
├─────────────────────────────────┤
│           FOOTER                │
└─────────────────────────────────┘
```

---

## Template 5: Contact / Form

Used by: Contact, Work With Us, Volunteer application

```
┌─────────────────────────────────┐
│           HEADER                │
├─────────────────────────────────┤
│          PAGE HERO              │  headline + supportive subtext
├─────────────────────────────────┤
│     TWO-COLUMN LAYOUT           │
│  Left: context / reasons        │
│  Right: the form                │
├─────────────────────────────────┤
│           FOOTER                │
└─────────────────────────────────┘
```

**Notes:**
- On mobile, context collapses above the form (stacked)
- Form success state replaces the form with a confirmation message
- No page reload on submit — handled via server action + state

---

## Template Selection in CMS

Pages in Payload have a `template` select field. Choosing a template determines which section slots and block types are available for that page.
