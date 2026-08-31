import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { getPayload } from '@/lib/payload'
import { PageHero } from '@/components/sections/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { TeamPreview } from '@/components/sections/TeamPreview'
import type { TeamMember } from '@/components/sections/TeamPreview'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'

export const revalidate = 300

export const metadata: Metadata = generateMetadata({
  title: 'About Eonrisia',
  description:
    'Learn about Eonrisia — the community-driven organization building immersive fictional universes. Our mission, story, team, and values.',
  canonical: '/about',
})

export default async function AboutPage() {
  let teamMembers: TeamMember[] = []

  try {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'team',
      where: { isPublished: { equals: true } },
      sort: 'order',
      limit: 6,
    })
    teamMembers = docs as unknown as TeamMember[]
  } catch {
    // DB unavailable — render page without team members
  }

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'About', url: absoluteUrl('/about') },
        ])}
      />

      <PageHero
        eyebrow="About Eonrisia"
        headline="We build worlds together."
        lead="Eonrisia is a community-driven creative organization. We build immersive fictional universes — and the games, comics, software, and community infrastructure that brings them to life."
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-2xl">
            <Heading as="h2" size="h2" eyebrow="Our Story" className="mb-7">
              Built by a community, for a community.
            </Heading>
            <div className="space-y-4 text-body text-base-100/65 leading-relaxed">
              <p>
                Eonrisia started with a single question: what if a fictional universe could be truly
                built by the people who love it? Not a single author&apos;s vision handed down —
                but a living, growing world shaped by writers, artists, developers, and fans working
                together.
              </p>
              <p>
                Our core team is lean by design. We recruit and empower volunteers across every
                discipline — writing, illustration, game development, music, community management —
                and give them the tools, structure, and freedom to contribute meaningfully.
              </p>
              <p>
                The result is an ecosystem that belongs to its contributors as much as its founders.
                Every project we ship, every universe we build, is a collective achievement.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-base-900/40 border-y border-base-800/60">
        <Container>
          <Heading as="h2" size="h2" eyebrow="Our Values" className="mb-10 text-center">
            What guides every decision we make.
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value) => (
              <div key={value.title} className="p-6 rounded-2xl border border-base-700 bg-base-900 hover:border-brand-500/40 transition-colors duration-normal">
                <h3 className="font-display font-bold text-h4 text-base-100 mb-2">
                  {value.title}
                </h3>
                <p className="text-body-sm text-base-100/55 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {teamMembers.length > 0 && <TeamPreview members={teamMembers} />}

      <CtaBand
        headline="Want to be part of this?"
        primaryLabel="Volunteer"
        primaryHref="/volunteer"
        secondaryLabel="Contact"
        secondaryHref="/contact"
      />
    </>
  )
}

const values = [
  {
    title: 'Community First',
    description:
      'The ecosystem exists because of the people who build it. No decision benefits the organization at the expense of the community.',
  },
  {
    title: 'Transparency',
    description:
      'We operate openly. How we make decisions, how we use resources, and who is accountable — none of this is hidden.',
  },
  {
    title: 'Quality Over Speed',
    description:
      'We ship things when they are ready. Standards are maintained even when it is inconvenient.',
  },
  {
    title: 'Ownership',
    description:
      'We own our tools, our data, and our decisions. We do not build on platforms that can pull the rug.',
  },
  {
    title: 'Originality',
    description:
      'Eonrisia and its universes are original. The brand, design, and work must feel like nothing else.',
  },
  {
    title: 'Collaboration',
    description:
      'The best work happens when diverse people bring their full skills to a shared goal.',
  },
]
