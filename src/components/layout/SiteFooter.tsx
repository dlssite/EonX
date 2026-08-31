import { getPayload } from '@/lib/payload'
import { Footer } from './Footer'

const DEFAULT_COLUMNS = [
  {
    heading: 'Eonrisia',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Mission & Vision', href: '/mission' },
    ],
  },
  {
    heading: 'Get Involved',
    links: [
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Work',
    links: [
      { label: 'Projects', href: '/projects' },
    ],
  },
]

const DEFAULT_SOCIAL: { platform: string; url: string }[] = []

/**
 * Server Component wrapper for the Footer.
 * Falls back to default content if the DB is unavailable.
 */
export async function SiteFooter() {
  let columns = DEFAULT_COLUMNS
  let socialLinks = DEFAULT_SOCIAL
  let tagline: string | undefined = 'Building immersive worlds, together.'
  let legalText: string | undefined = undefined

  try {
    const payload = await getPayload()
    const footer = await payload.findGlobal({ slug: 'footer' })
    if (footer?.columns) {
      const fetchedCols = footer.columns as typeof DEFAULT_COLUMNS
      if (Array.isArray(fetchedCols) && fetchedCols.length > 0) columns = fetchedCols
    }
    if (footer?.socialLinks) {
      const fetchedSocial = footer.socialLinks as typeof DEFAULT_SOCIAL
      if (Array.isArray(fetchedSocial) && fetchedSocial.length > 0) socialLinks = fetchedSocial
    }
    if (footer?.tagline) tagline = footer.tagline as string
    if (footer?.legalText) legalText = footer.legalText as string
  } catch {
    // DB unavailable in dev — use defaults silently
  }

  return (
    <Footer
      tagline={tagline}
      columns={columns}
      socialLinks={socialLinks}
      legalText={legalText}
    />
  )
}
