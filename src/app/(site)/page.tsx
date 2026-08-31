import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { getPayload } from '@/lib/payload'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { HeroSection } from '@/components/sections/HeroSection'
import { MissionSnapshot } from '@/components/sections/MissionSnapshot'
import { ProjectsTeaser } from '@/components/sections/ProjectsTeaser'
import type { Project } from '@/components/sections/ProjectsTeaser'
import { TeamPreview } from '@/components/sections/TeamPreview'
import type { TeamMember } from '@/components/sections/TeamPreview'
import { CtaBand } from '@/components/sections/CtaBand'

export const revalidate = 60

export const metadata: Metadata = generateMetadata({
  title: 'Eonrisia — Community-Driven Creative Organization',
  description:
    'Eonrisia builds immersive fictional universes with a global community of writers, artists, and developers. Join us, partner with us, or commission our team.',
  canonical: '/',
})

export default async function HomePage() {
  let featuredProjects: Project[] = []
  let teamMembers: TeamMember[] = []

  try {
    const payload = await getPayload()

    const { docs: projects } = await payload.find({
      collection: 'projects',
      where: { and: [{ isPublished: { equals: true } }, { isFeatured: { equals: true } }] },
      sort: 'order',
      limit: 3,
    })
    featuredProjects = projects as unknown as Project[]

    const { docs: members } = await payload.find({
      collection: 'team',
      where: { isPublished: { equals: true } },
      sort: 'order',
      limit: 6,
    })
    teamMembers = members as unknown as TeamMember[]
  } catch {
    // DB unavailable — render page without CMS data
  }

  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', url: 'https://eonrisia.org' }])} />
      <HeroSection />
      <MissionSnapshot />
      {featuredProjects.length > 0 && <ProjectsTeaser projects={featuredProjects} />}
      {teamMembers.length > 0 && <TeamPreview members={teamMembers} />}
      <CtaBand
        headline="Ready to build something that lasts?"
        primaryLabel="Volunteer"
        primaryHref="/volunteer"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  )
}
