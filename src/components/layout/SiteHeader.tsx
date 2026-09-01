import { headers } from 'next/headers'
import { getPayload } from '@/lib/payload'
import { Header } from './Header'

const DEFAULT_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Updates', href: '/updates' },
  { label: 'Team', href: '/team' },
  { label: 'Volunteer', href: '/volunteer' },
]

/**
 * Server Component wrapper for the Header.
 * Fetches navigation data from the Payload `navigation` global.
 * Falls back to default links if the DB is unavailable (dev safety).
 * Reads the current pathname from the Next.js `headers()` API so the
 * active nav link highlight works correctly without a client-side hook.
 */
export async function SiteHeader() {
  let links = DEFAULT_LINKS
  let ctaLabel = 'Get Involved'
  let ctaHref = '/volunteer'

  // Read current path from request headers — set by Next.js middleware
  const headersList = await headers()
  const currentPath = headersList.get('x-pathname') ?? ''

  try {
    const payload = await getPayload()
    const navigation = await payload.findGlobal({ slug: 'navigation' })
    const fetchedLinks = navigation?.links as typeof DEFAULT_LINKS | undefined
    // Only use CMS links if the array is actually populated
    if (fetchedLinks && Array.isArray(fetchedLinks) && fetchedLinks.length > 0) {
      links = fetchedLinks
    }
    if (navigation?.ctaLabel) ctaLabel = navigation.ctaLabel as string
    if (navigation?.ctaHref) ctaHref = navigation.ctaHref as string
  } catch {
    // DB unavailable in dev — use defaults silently
  }

  return (
    <Header
      links={links}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      currentPath={currentPath}
    />
  )
}
