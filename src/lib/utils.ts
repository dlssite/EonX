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
 * Payload prefixes every media URL with `serverURL` (e.g. https://eonrisia.org)
 * when that option is set in payload.config.ts.  Passing an absolute same-origin
 * URL to <Image> forces Next.js to proxy it through /_next/image, which requires
 * the hostname to be listed in next.config remotePatterns — and still adds an
 * unnecessary round-trip.
 *
 * This helper strips the origin so the URL becomes a plain path like
 * `/media/file/klarity.png`, which next/image serves directly without proxying.
 *
 * It is safe to call with `undefined` (returns `undefined`) and with URLs from
 * any external origin (leaves them unchanged so remotePatterns still applies).
 */
export function payloadImageUrl(url: string): string
export function payloadImageUrl(url: string | null | undefined): string | undefined
export function payloadImageUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eonrisia.org'
  // Strip the exact site origin so same-origin absolute URLs become root-relative.
  if (url.startsWith(siteUrl)) return url.slice(siteUrl.length) || '/'
  // Fallback: strip any http(s)://host prefix (handles localhost dev too).
  return url.replace(/^https?:\/\/[^/]+/, '')
}
