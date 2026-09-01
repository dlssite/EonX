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
 * Media-like payload type containing url, filename, alt.
 */
export type MediaLike =
  | {
      url?: string | null
      filename?: string | null
      alt?: string | null
    }
  | string
  | null
  | undefined

/**
 * Normalise a Payload CMS media URL for use with next/image.
 *
 * Handles:
 * - Direct Media objects with `.url` or `.filename`
 * - String URLs (strips site origin for local Next.js static resolution)
 * - Safely ignores unpopulated relationship IDs
 */
export function payloadImageUrl(media: MediaLike): string | undefined {
  if (!media) return undefined

  let rawUrl: string | undefined

  if (typeof media === 'string') {
    if (media.startsWith('/') || media.startsWith('http')) {
      rawUrl = media
    } else {
      return undefined
    }
  } else {
    rawUrl = media.url || (media.filename ? `/media/${media.filename}` : undefined)
  }

  if (!rawUrl) return undefined

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eonrisia.org'
}
