import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely — combines clsx and tailwind-merge.
 * Use this for all conditional className logic in components.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format a date to "Month D, YYYY" — e.g. "August 28, 2026"
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Truncate a string to a max length, appending "..." if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '...'
}

/**
 * Convert a string to a URL-safe slug.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Absolute URL builder — prepends NEXT_PUBLIC_SITE_URL.
 */
export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eonrisia.org'
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Normalise a Payload CMS media URL for use with next/image.
 *
 * Payload v3 can return either:
 *   - An object with { url, filename } populated
 *   - A plain string (the URL itself)
 *   - An unpopulated relationship ID string (which we must ignore)
 *
 * Always returns a root-relative path, stripping the absolute same-origin
 * prefix so Next.js can serve it directly without re-proxying.
 */
export function payloadImageUrl(
  media: { url?: string | null; filename?: string | null } | string | null | undefined,
): string | undefined {
  if (!media) return undefined

  if (typeof media === 'string') {
    // Unpopulated relationship IDs don't start with / or http
    if (!media.startsWith('/') && !media.startsWith('http')) return undefined
    return media.replace(/^https?:\/\/[^/]+/, '')
  }

  const raw =
    media.url ?? (media.filename ? `/api/media/file/${media.filename}` : undefined)

  if (!raw) return undefined
  return raw.replace(/^https?:\/\/[^/]+/, '')
}
