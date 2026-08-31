# Page Spec: Work With Us

**URL:** `/work-with-us`
**Phase:** 2
**Template:** Contact / Form
**SEO Priority:** 0.7

---

## Purpose

Surface Eonrisia's capability as a creative-tech team available for commission work. This page is for organizations or individuals who want to hire Eonrisia to build something for them — a game, an app, a social platform, a creative tool, or a similar project.

---

## Primary Audience

- Individuals or organizations with a creative-tech project they want built
- Startups wanting a community or experience layer built for their product
- Content creators wanting a custom tool, app, or experience

---

## Sections

### 1. Page Hero
- Eyebrow: "Work With Us"
- Headline: "Commission our team"
- Subtext: "We build immersive experiences — games, apps, social platforms, creative tools. If you have a vision, we can help build it."

### 2. What We Build (3-column)
- Games & Interactive Experiences
- Web Apps & Community Platforms
- Creative Tools & Software
- Brief description + example under each

### 3. How It Works (Steps)
- Step 1: "Tell us about your project" — Submit the inquiry form
- Step 2: "We'll get back to you within 48 hours" — Discovery call
- Step 3: "We scope, you approve, we build" — Project begins

### 4. Past Work (Projects Teaser)
- 2–3 relevant commissioned or internal projects as social proof
- "See all our work →" links to /projects

### 5. Inquiry Form
- Fields: Name, email, organization (optional), project type (select), budget range (select), project description (textarea), timeline (text)
- Stored in `inquiries` collection with `type: commission`
- Same spam prevention and rate limiting as contact forms

### 6. FAQ
- "Do you take all projects?" — We review each inquiry carefully and take projects that align with our values and capacity.
- "How are projects priced?" — Scoped individually after the discovery call.
- "Can you sign an NDA?" — Yes.

---

## SEO

- **Title:** `Work With Us — Commission the Eonrisia Team`
- **Meta Description:** `Commission Eonrisia to build your next game, app, or creative platform. We build immersive digital experiences for clients who share our values.`
- **H1:** Set via CMS
- **Structured Data:** BreadcrumbList, FAQPage
