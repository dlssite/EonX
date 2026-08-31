# Component Library — Eonrisia

## Overview

All UI components live in `src/components/`. They are organized into four categories:

| Category | Path | Purpose |
|---|---|---|
| `ui/` | `src/components/ui/` | Primitive, headless-style building blocks |
| `layout/` | `src/components/layout/` | Structural shell components |
| `sections/` | `src/components/sections/` | Full page sections (used in page files) |
| `blocks/` | `src/components/blocks/` | Payload-driven flexible content blocks |
| `seo/` | `src/components/seo/` | SEO-only components (no visual output) |

---

## UI Primitives

### Button

**File:** `src/components/ui/Button.tsx`

| Prop | Type | Default | Options |
|---|---|---|---|
| `variant` | string | `'primary'` | `'primary'`, `'secondary'`, `'ghost'`, `'destructive'` |
| `size` | string | `'md'` | `'sm'`, `'md'`, `'lg'` |
| `asChild` | boolean | `false` | Renders as child element (for `<Link>` wrapping) |
| `isLoading` | boolean | `false` | Shows spinner, disables interaction |
| `disabled` | boolean | `false` | — |

```tsx
<Button variant="primary" size="lg">Get Involved</Button>
<Button variant="secondary" asChild><Link href="/about">Learn More</Link></Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

**Variants:**
- `primary`: Brand-500 background, white text, hover scale 1.02
- `secondary`: Transparent background, brand-500 border and text, hover fill
- `ghost`: No border, text-secondary color, hover text-primary
- `destructive`: Error-color background, white text

---

### Badge

**File:** `src/components/ui/Badge.tsx`

| Prop | Type | Default | Options |
|---|---|---|---|
| `variant` | string | `'default'` | `'default'`, `'brand'`, `'accent'`, `'success'`, `'warning'` |
| `size` | string | `'md'` | `'sm'`, `'md'` |

```tsx
<Badge variant="brand">Open Source</Badge>
<Badge variant="accent">Phase 2</Badge>
<Badge variant="success">Active</Badge>
```

---

### Input

**File:** `src/components/ui/Input.tsx`

Standard text input. Always used inside a `<FormField>` wrapper. Supports error state with red border and error message below.

---

### Textarea

**File:** `src/components/ui/Textarea.tsx`

Multi-line text input. Same error state behavior as Input.

---

### Heading

**File:** `src/components/ui/Heading.tsx`

Renders semantic heading elements with consistent typography tokens.

| Prop | Type | Default |
|---|---|---|
| `as` | string | `'h2'` |
| `size` | string | Matches `as` prop by default |
| `eyebrow` | string | — |

```tsx
<Heading as="h1" size="display" eyebrow="Our Organization">
  Building worlds, together.
</Heading>
```

When `eyebrow` is provided, a small uppercase label renders above the heading.

---

### Divider

**File:** `src/components/ui/Divider.tsx`

Horizontal rule with consistent color token. Optional label in the center.

---

### Container

**File:** `src/components/ui/Container.tsx`

The standard max-width centered wrapper used on all pages.

```tsx
<Container>
  {/* max-w-[1280px] mx-auto px-6 md:px-10 xl:px-20 */}
</Container>
```

---

## Layout Components

### Header

**File:** `src/components/layout/Header.tsx`

- Fetches navigation data from Payload `navigation` global
- Transparent on hero, transitions to opaque `bg-base-900/95 backdrop-blur` on scroll
- Desktop: wordmark + nav links + CTA button
- Mobile: wordmark + hamburger → Framer Motion slide-in drawer
- Sticky positioned (`position: sticky; top: 0; z-index: var(--z-sticky)`)

---

### Footer

**File:** `src/components/layout/Footer.tsx`

- Fetches footer data from Payload `footer` global
- Four columns: Brand (logo + tagline), Navigation, Connect (social links), Legal
- Collapses to stacked layout on mobile
- Copyright year auto-updates via `new Date().getFullYear()`

---

### MobileMenu

**File:** `src/components/layout/MobileMenu.tsx`

- Controlled by `isOpen` state in Header
- Framer Motion: slides in from right, backdrop fades in
- Traps focus while open (accessibility)
- Closes on route change

---

## Section Components

Each section component accepts typed props that map to Payload field shapes.

| Component | File | Used On |
|---|---|---|
| `HeroSection` | `sections/HeroSection.tsx` | Home |
| `MissionSnapshot` | `sections/MissionSnapshot.tsx` | Home |
| `ProjectsTeaser` | `sections/ProjectsTeaser.tsx` | Home |
| `TeamPreview` | `sections/TeamPreview.tsx` | Home |
| `CtaBand` | `sections/CtaBand.tsx` | Home, multiple pages |
| `PageHero` | `sections/PageHero.tsx` | All interior pages |
| `TeamGrid` | `sections/TeamGrid.tsx` | Team page |
| `ProjectsGrid` | `sections/ProjectsGrid.tsx` | Projects page |
| `OpportunitiesList` | `sections/OpportunitiesList.tsx` | Volunteer page |
| `RichTextSection` | `sections/RichTextSection.tsx` | Any CMS rich text block |
| `StatsRow` | `sections/StatsRow.tsx` | About, Home |
| `TestimonialRow` | `sections/TestimonialRow.tsx` | Partners, Work With Us |

---

## Block Components (Payload-driven)

These components render content from the Payload `blocks` field, allowing page layouts to be assembled in the CMS.

| Block | Payload Block Slug | Description |
|---|---|---|
| `RichTextBlock` | `richText` | Full rich text (Lexical editor output) |
| `CtaBlock` | `cta` | Headline + subtext + 1-2 buttons |
| `ImageBlock` | `image` | Single full-width or contained image |
| `StatsBlock` | `stats` | 3-4 stat figures with labels |
| `TeamBlock` | `team` | Team member grid (pulls from Team collection) |
| `ProjectsBlock` | `projects` | Projects grid (pulls from Projects collection) |
| `FormBlock` | `form` | Embeds a form (contact, volunteer inquiry) |
| `DividerBlock` | `divider` | Visual section break |

---

## SEO Components

### JsonLd

**File:** `src/components/seo/JsonLd.tsx`

Renders a `<script type="application/ld+json">` tag with the provided schema object.

```tsx
<JsonLd schema={organizationSchema} />
```

### OgImage

**File:** `src/components/seo/OgImage.tsx` (generated via `app/opengraph-image.tsx`)

Dynamic OG images generated with `next/og`. Accepts title and optional subtitle.
