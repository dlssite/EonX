import type { Metadata } from 'next'
import { absoluteUrl } from './utils'

const SITE_NAME = 'Eonrisia'
const DEFAULT_DESCRIPTION =
  'Eonrisia is a community-driven creative organization that builds immersive fictional universes and the software, games, comics, and community infrastructure that brings them to life.'

type MetadataProps = {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  canonical?: string
}

/**
 * Generate consistent Metadata for any page.
 * Pass only the values specific to the page — everything else falls back to site defaults.
 *
 * @example
 * export const metadata = generateMetadata({
 *   title: 'About Eonrisia',
 *   description: 'Learn about the organization...',
 *   canonical: '/about',
 * })
 */
export function generateMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  noIndex = false,
  canonical,
}: MetadataProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Community-Driven Creative Organization`
  const ogImage = image ?? absoluteUrl('/brand/og-default.png')
  const ogImage = image ?? absoluteUrl('/brand/eon.png')
  const canonicalUrl = canonical ? absoluteUrl(canonical) : undefined

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eonrisia.org'),
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: {
      icon: '/brand/eonrisia-mark-light.svg',
      // apple-touch-icon: add /brand/apple-touch-icon.png when the asset is ready
    },
  }
}
