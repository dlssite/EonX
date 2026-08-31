import type { Metadata } from 'next'
import type { Where } from 'payload'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { getPayload } from '@/lib/payload'
import { PageHero } from '@/components/sections/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { TeamGrid } from '@/components/sections/TeamGrid'
import type { TeamMember } from '@/components/sections/TeamGrid'

export const revalidate = 60

export const metadata: Metadata = generateMetadata({
  title: 'Our Team | Eonrisia',
  description:
    'Meet the Eonrisia core team — the writers, developers, designers, and community builders behind our creative ecosystem.',
  canonical: '/team',
})

type TeamPageProps = {
  searchParams: Promise<{ dept?: string }>
}

export default async function TeamPage({ searchParams }: TeamPageProps) {
  const { dept } = await searchParams
  let teamMembers: TeamMember[] = []

  try {
    const payload = await getPayload()
    const where: Where =
      dept && dept !== 'all'
        ? { and: [{ isPublished: { equals: true } }, { department: { equals: dept } }] }
        : { isPublished: { equals: true } }

    const { docs } = await payload.find({
      collection: 'team',
      where,
      sort: 'order',
      limit: 100,
    })
    teamMembers = docs as unknown as TeamMember[]
  } catch {
    // DB unavailable — render empty state
  }

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Team', url: absoluteUrl('/team') },
        ])}
      />
      <PageHero
        eyebrow="Our Team"
        headline="The people building Eonrisia."
        lead="A lean core team working with a global network of volunteers and contributors across writing, art, engineering, music, and community."
      />
      <TeamGrid members={teamMembers} activeDept={dept ?? 'all'} />
      <CtaBand
        headline="Want to join this team?"
        primaryLabel="See Open Roles"
        primaryHref="/volunteer"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  )
}
