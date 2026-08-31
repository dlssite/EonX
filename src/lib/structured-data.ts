import { absoluteUrl } from './utils'

/**
 * JSON-LD schema builders.
 * Use with the <JsonLd> component in src/components/seo/JsonLd.tsx
 */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Eonrisia',
    url: absoluteUrl('/'),
    logo: absoluteUrl('/brand/eonrisia-mark-light.svg'),
    description:
      'Eonrisia is a community-driven creative organization that builds immersive fictional universes and the software, games, comics, and community infrastructure that brings them to life.',
    foundingDate: '2024',
    sameAs: [
      // Populated from CMS site-settings in production; these are placeholders
      'https://twitter.com/eonrisia',
      'https://instagram.com/eonrisia',
      'https://youtube.com/@eonrisia',
      'https://discord.gg/eonrisia',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'general',
      email: 'hello@eonrisia.org',
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Eonrisia',
    url: absoluteUrl('/'),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function articleSchema(post: {
  title: string
  description: string
  image?: string
  authorName?: string
  authorUrl?: string
  publishedAt: string
  updatedAt: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    ...(post.image ? { image: post.image } : {}),
    ...(post.authorName
      ? {
          author: {
            '@type': 'Person',
            name: post.authorName,
            ...(post.authorUrl ? { url: post.authorUrl } : {}),
          },
        }
      : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Eonrisia',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/brand/eonrisia-mark-light.svg'),
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
  }
}
