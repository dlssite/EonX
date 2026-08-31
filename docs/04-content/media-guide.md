# Media Guide — Eonrisia

## File Formats

| Use Case | Preferred Format | Fallback |
|---|---|---|
| Photos | WebP (auto via next/image) | JPEG |
| Illustrations / flat art | SVG | WebP |
| Logos | SVG | PNG (transparent) |
| Icons | SVG (Lucide React) | — |
| OG images | PNG | JPEG |
| Animated content | WebM | GIF (avoid — large file size) |

---

## Upload Dimensions

Upload originals at these dimensions. `next/image` handles responsive resizing.

| Usage | Upload Width | Upload Height | Ratio |
|---|---|---|---|
| Team member photo | 800px | 800px | 1:1 |
| Project cover | 1600px | 900px | 16:9 |
| Blog post cover | 1600px | 900px | 16:9 |
| OG image | 1200px | 630px | 1.91:1 |
| Section background | 2000px | any | — |
| Logo (raster fallback) | 400px | auto | — |

---

## File Size Limits

| Type | Max Size (before upload) |
|---|---|
| Photos | 2MB |
| Illustrations | 500KB |
| SVG | 100KB |
| OG image | 300KB |

Compress images before uploading using [Squoosh](https://squoosh.app) or similar.

---

## File Naming Convention

- All lowercase
- Hyphen-separated words
- Descriptive of the content
- No spaces, special characters, or dates in the filename

```
✅ Eonrisia-team-portrait-2026.jpg
✅ sanctyria-project-cover.webp
✅ volunteer-banner.png

❌ Team Photo Final FINAL v3.jpg
❌ IMG_4821.jpg
❌ image1.png
```

---

## Alt Text Rules

| Image Type | Alt Text Approach |
|---|---|
| Team member photo | `"[Name], [Role] at Eonrisia"` |
| Project cover | `"[Project Name] — [one-phrase description]"` |
| Decorative section backgrounds | `alt=""` (empty — screen readers skip it) |
| Charts / diagrams | Describe the key insight, not every data point |
| Logo | `"Eonrisia logo"` |

---

## Brand Asset Folder

All official brand assets live in `/public/brand/`. See [`../01-brand/logo-usage.md`](../01-brand/logo-usage.md) for logo usage rules.

```
/public/brand/
├── Eonrisia-wordmark-light.svg
├── Eonrisia-wordmark-dark.svg
├── eonrisia-mark-light.svg
├── eonrisia-mark-dark.svg
├── apple-touch-icon.png        (180×180px)
└── og-default.png              (1200×630px)
```

---

## CMS Media Library Organization

Tag uploaded media in Payload by type to keep the library navigable:
- `team` — team member photos
- `projects` — project cover images
- `brand` — logo and brand assets
- `press` — press kit images
- `blog` — blog post covers (Phase 2)
- `general` — everything else
