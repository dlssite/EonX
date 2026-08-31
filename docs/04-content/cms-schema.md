# CMS Schema — Eonrisia (Payload CMS v3)

## Overview

All content is managed through Payload CMS. The schema is defined in TypeScript files in `src/collections/` and `src/globals/`. This document is the canonical reference for every collection and global — their fields, types, and purpose.

---

## Collections

### `team`
**File:** `src/collections/Team.ts`
**Purpose:** Stores all team member profiles displayed on the Team page and Team Preview section.

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | text | Yes | Full name |
| `role` | text | Yes | Job title / role |
| `department` | select | Yes | `leadership`, `engineering`, `design`, `writing`, `art`, `community`, `other` |
| `bio` | textarea | No | Short bio, max 200 chars |
| `photo` | upload (Media) | No | Displayed as card image |
| `socialLinks` | array | No | Items: `{ platform: select, url: text }` |
| `order` | number | No | Manual sort order |
| `isPublished` | checkbox | Yes | Default: false. Only published members appear on site |
| `slug` | text (auto) | Yes | Auto-generated from name, URL-safe |

---

### `projects`
**File:** `src/collections/Projects.ts`
**Purpose:** Showcase of Eonrisia's active and completed projects (internal and commissioned).

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | text | Yes | Project name |
| `slug` | text (auto) | Yes | URL-safe, unique |
| `tagline` | text | Yes | One-line description, max 120 chars |
| `description` | richText | Yes | Full project description |
| `coverImage` | upload (Media) | Yes | Used in cards and detail page hero |
| `status` | select | Yes | `active`, `completed`, `upcoming`, `paused` |
| `tags` | array | No | Items: `{ tag: text }` — used for filtering |
| `projectUrl` | text | No | External URL (if applicable) |
| `isFeatured` | checkbox | Yes | Default: false. Featured projects appear in homepage teaser |
| `isPublished` | checkbox | Yes | Default: false |
| `publishedAt` | date | No | — |
| `order` | number | No | Manual sort order within status |

---

### `opportunities`
**File:** `src/collections/Opportunities.ts`
**Purpose:** Volunteer and contributor roles listed on the Volunteer page.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | text | Yes | Role title |
| `department` | select | Yes | Same options as team.department |
| `description` | richText | Yes | What the role involves |
| `skills` | array | No | Items: `{ skill: text }` — skills needed |
| `timeCommitment` | text | No | e.g. "4–6 hours/week" |
| `applyUrl` | text | No | External form URL or mailto |
| `isRemote` | checkbox | Yes | Default: true |
| `isOpen` | checkbox | Yes | Default: true. Closed roles are hidden |
| `publishedAt` | date | No | — |

---

### `inquiries`
**File:** `src/collections/Inquiries.ts`
**Purpose:** Stores all form submissions (contact, partner, press, commission).

| Field | Type | Required | Notes |
|---|---|---|---|
| `type` | select | Yes | `contact`, `partner`, `press`, `commission` |
| `name` | text | Yes | Sender's name |
| `email` | email | Yes | Sender's email |
| `organization` | text | No | Sender's org (for partner/press types) |
| `message` | textarea | Yes | Message body |
| `status` | select | Yes | `new`, `read`, `replied`, `archived` — default: `new` |
| `submittedAt` | date (auto) | Yes | Auto-set on create |
| `ipAddress` | text | No | Stored for spam detection, not displayed |

**Access control:** Only admin users can read inquiries. Create is public (forms).

---

### `posts` (Phase 2)
**File:** `src/collections/Posts.ts`
**Purpose:** Blog posts and updates published at `/updates`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | text | Yes | — |
| `slug` | text (auto) | Yes | — |
| `excerpt` | textarea | Yes | Used in index cards and meta description |
| `content` | richText | Yes | Lexical editor — full post body |
| `coverImage` | upload (Media) | No | — |
| `author` | relationship (Team) | No | Links to a team member |
| `categories` | array | No | Items: `{ category: text }` |
| `seo` | group | No | `{ metaTitle, metaDescription, ogImage }` |
| `status` | select | Yes | `draft`, `published` |
| `publishedAt` | date | No | Must be set to appear on site |

---

### `media`
**File:** `src/collections/Media.ts`
**Purpose:** Central media library. All uploaded images and files.

| Field | Type | Notes |
|---|---|---|
| `alt` | text | Required. Accessibility and SEO. |
| `caption` | text | Optional. Displayed below images when used in rich text. |

Payload auto-generates: `url`, `width`, `height`, `mimeType`, `filesize`, `filename`.

---

## Globals

### `siteSettings`
**File:** `src/globals/SiteSettings.ts`
**Purpose:** Site-wide default values used for SEO, metadata, and branding.

| Field | Type | Notes |
|---|---|---|
| `siteName` | text | "Eonrisia" |
| `tagline` | text | Short org tagline |
| `defaultMetaDescription` | textarea | Fallback meta description |
| `defaultOgImage` | upload (Media) | Fallback OG image |
| `socialLinks` | array | `{ platform, url }` — used in footer and JSON-LD |

---

### `navigation`
**File:** `src/globals/Navigation.ts`
**Purpose:** Header navigation structure.

| Field | Type | Notes |
|---|---|---|
| `links` | array | `{ label: text, href: text, isExternal: checkbox }` |
| `ctaLabel` | text | Primary CTA button label in nav |
| `ctaHref` | text | Primary CTA button destination |

---

### `footer`
**File:** `src/globals/Footer.ts`
**Purpose:** Footer content.

| Field | Type | Notes |
|---|---|---|
| `tagline` | text | Short line below logo |
| `columns` | array | `{ heading: text, links: [{ label, href }] }` |
| `legalText` | text | Copyright / legal notice |
| `socialLinks` | array | `{ platform: select, url: text }` |
