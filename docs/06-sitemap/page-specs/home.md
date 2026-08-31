# Page Spec: Home

**URL:** `/`
**Phase:** 1
**Template:** Home (Landing)
**SEO Priority:** 1.0

---

## Purpose

The home page is Eonrisia's most important page. It must accomplish three things within 5 seconds of a visitor arriving:

1. Tell them exactly what Eonrisia is
2. Make them feel the ambition and credibility of the organization
3. Give them a clear next action based on who they are

---

## Primary Audiences on This Page

| Audience | What They Need | CTA |
|---|---|---|
| Partners / Donors | Understand the org's scope and credibility | "Partner With Us" → /contact |
| Volunteers | Feel inspired to contribute | "Get Involved" → /volunteer |
| Commission Clients | See capability and output | "See Our Work" → /projects |

---

## Sections

### 1. Hero
- Full-viewport height
- Dark background with subtle texture or ambient animation (particle/gradient)
- Eyebrow: "Community-driven creativity"
- Headline: Big, bold, declarative — communicates the core mission
- Subheadline: One sentence expanding the headline
- Two CTAs: Primary ("Get Involved") + Secondary ("See Our Work")
- Subtle scroll indicator at bottom

### 2. Mission Snapshot
- Three-column layout (single column on mobile)
- Each column: icon + heading + 1–2 sentence description
- Represents the three pillars: Build Together / Grow Community / Create Universe
- Eyebrow above section: "What We Do"

### 3. Featured Projects
- Eyebrow: "What We're Building"
- Section headline: "From universe to experience"
- Grid of 3 featured projects from the CMS (flagged `isFeatured: true`)
- Each card: cover image, project name, one-line description, status badge, link
- "See All Projects →" link below grid

### 4. Team Preview
- Eyebrow: "The People Behind It"
- 4–6 team member cards (ordered by `order` field in CMS)
- Each card: photo, name, role
- "Meet the Full Team →" link below grid

### 5. Stats Row
- 3–4 key numbers (e.g. contributors, projects, years active, community members)
- Bold number + label
- Animated count-up on scroll into view

### 6. CTA Band
- Full-width, brand gradient background
- Headline: "Ready to build something that lasts?"
- Two buttons: "Volunteer" + "Contact Us"

---

## SEO

- **Title:** `Eonrisia — Community-Driven Creative Organization`
- **Meta Description:** `Eonrisia builds immersive fictional universes with a global community of writers, artists, and developers. Join us, partner with us, or commission our team.`
- **H1:** Matches hero headline (set in CMS)
- **Structured Data:** Organization + WebSite schemas
- **OG Image:** Default brand OG image (`/brand/og-default.png`)
