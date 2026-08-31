# Performance — Eonrisia

## Targets

| Metric | Target | Tool |
|---|---|---|
| Lighthouse Performance | 90+ (mobile) | Lighthouse CI |
| Lighthouse SEO | 100 | Lighthouse CI |
| Lighthouse Accessibility | 95+ | Lighthouse CI |
| Lighthouse Best Practices | 100 | Lighthouse CI |
| LCP | < 2.5s | Google CrUX, Search Console |
| INP | < 200ms | Google CrUX |
| CLS | < 0.1 | Google CrUX |
| Time to First Byte | < 600ms | WebPageTest |
| Total bundle size (JS) | < 200KB gzipped | next build output |

---

## Performance Strategies

### 1. Server Components First
React Server Components render on the server and send HTML to the browser. No hydration overhead, no bundle size cost. Use Server Components for all data-fetching and static rendering. Only use Client Components where interactivity is required.

### 2. Image Optimization
All images go through `next/image`:
- Automatic WebP/AVIF conversion
- Responsive `srcset` generated per image
- `loading="lazy"` by default (above-fold images get `priority` prop)
- Explicit `width` and `height` prevent Cumulative Layout Shift

```tsx
// Above-fold hero image — load eagerly
<Image src={hero.url} alt={hero.alt} width={1920} height={1080} priority />

// Below-fold images — lazy load (default)
<Image src={card.image.url} alt={card.image.alt} width={600} height={400} />
```

### 3. Font Optimization
Fonts loaded via `next/font` — they are downloaded once, self-hosted, and inlined in the initial HTML. Zero layout shift from font loading. Zero external font requests.

```ts
// app/layout.tsx
import { Syne, Inter } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' })
```

### 4. Code Splitting
Next.js automatically code-splits by route. Each page only loads the JavaScript it needs. Heavy third-party libraries (Framer Motion) are only loaded on pages that use them.

### 5. ISR + Edge Caching
All dynamic pages are cached at the Vercel edge network. First visitor after a cache miss triggers regeneration in the background. All subsequent visitors get the cached version instantly.

### 6. Preloading Critical Resources
Hero images and above-fold assets get `<link rel="preload">` via Next.js `priority` prop.

---

## Bundle Size Rules

- Audit `next build` output before every release
- No single page should add more than 50KB of JS (gzipped)
- Heavy libraries (chart libraries, rich text editors) are dynamically imported with `next/dynamic`
- Payload CMS admin bundle is completely separate from the public site bundle

```ts
// Dynamic import for heavy components
const RichTextRenderer = dynamic(() => import('@/components/blocks/RichTextBlock'), {
  loading: () => <Skeleton />,
})
```

---

## Lighthouse CI

Run Lighthouse CI on all Phase 1 pages on every PR:

```yaml
# .github/workflows/lighthouse.yml
- name: Run Lighthouse CI
  run: npx lhci autorun
```

Configured in `lighthouserc.json`:
```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 1.0 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 1.0 }]
      }
    }
  }
}
```
