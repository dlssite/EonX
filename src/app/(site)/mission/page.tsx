import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { PageHero } from '@/components/sections/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'

export const revalidate = 300

export const metadata: Metadata = generateMetadata({
  title: 'Mission & Vision | Eonrisia',
  description:
    "Eonrisia's mission is to build one of the most ambitious community-driven fictional universes. Read our vision, values, and long-term goals.",
  canonical: '/mission',
})

export default function MissionPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Mission & Vision', url: absoluteUrl('/mission') },
        ])}
      />

      <PageHero
        eyebrow="Our Mission"
        headline="Build a universe that outlasts any single creator."
        lead="Eonrisia exists to create community-driven fictional universes — living, self-sustaining worlds that grow through the collective effort of writers, artists, developers, musicians, and fans."
      />

      {/* The Vision */}
      <section className="py-24">
        <Container>
          <div className="max-w-3xl">
            <Heading as="h2" size="h2" eyebrow="The Vision" className="mb-8">
              In ten years, we want people to say:
            </Heading>
            <blockquote className="border-l-4 border-brand-500 pl-6 mb-8">
              <p className="text-h3 font-display font-bold text-base-100 leading-snug italic">
                &ldquo;They&apos;re the community that built one of the most ambitious free fictional
                universes together.&rdquo;
              </p>
            </blockquote>
            <p className="text-body-lg text-base-100/70 leading-relaxed">
              That vision is larger than any individual product. The books, games, apps, and comics
              are not the destination — they are the ways people experience and help build the same world.
            </p>
          </div>
        </Container>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-base-900/50">
        <Container>
          <Heading as="h2" size="h2" eyebrow="How We Work" className="mb-12 text-center">
            Three layers. One ecosystem.
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {layers.map((layer) => (
              <div key={layer.title} className="p-8 rounded-xl border border-base-800 bg-base-900">
                <div className="text-display font-display font-extrabold text-brand-500/20 mb-4">
                  {layer.number}
                </div>
                <h3 className="font-display font-bold text-h3 text-base-100 mb-3">{layer.title}</h3>
                <p className="text-body-sm text-base-100/60 leading-relaxed">{layer.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Growth Phases */}
      <section className="py-24">
        <Container>
          <Heading as="h2" size="h2" eyebrow="Growth Strategy" className="mb-12">
            How we get there.
          </Heading>
          <div className="space-y-6 max-w-2xl">
            {phases.map((phase, i) => (
              <div key={phase.title} className="flex gap-6">
                <div className="shrink-0 w-10 h-10 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                  <span className="text-label font-body font-bold text-brand-500">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-h4 text-base-100 mb-1">{phase.title}</h3>
                  <p className="text-body-sm text-base-100/60">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Token System */}
      <section className="py-24 bg-base-900/50">
        <Container>
          <div className="max-w-2xl">
            <Heading as="h2" size="h2" eyebrow="The Token System" className="mb-6">
              Contribution has value.
            </Heading>
            <p className="text-body text-base-100/70 leading-relaxed mb-8">
              We reward participation rather than spending. Contributors earn tokens by contributing
              to the ecosystem — writing, building, creating, moderating. Those tokens unlock access
              to benefits, recognition, and exclusive experiences within the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-center">
              {tokenSteps.map((step, i) => (
                <div key={step} className="flex-1 p-6 rounded-xl border border-base-800 bg-base-900">
                  <div className="text-h2 font-display font-extrabold text-brand-500/30 mb-2">{i + 1}</div>
                  <p className="text-body-sm font-body font-medium text-base-100/70">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        headline="Want to help build this?"
        primaryLabel="Volunteer"
        primaryHref="/volunteer"
        secondaryLabel="Partner With Us"
        secondaryHref="/contact"
      />
    </>
  )
}

const layers = [
  {
    number: '01',
    title: 'Organization',
    description:
      'Eonrisia manages the community, recruits volunteers, handles donations, builds partnerships, maintains governance, and oversees all projects.',
  },
  {
    number: '02',
    title: 'Universe',
    description:
      'The fictional worlds we build together — starting with Sanctyria. Games, books, comics, music, lore, and community projects all live here.',
  },
  {
    number: '03',
    title: 'Community',
    description:
      'The people who make it real. Writers, artists, developers, musicians, moderators, and fans — contributors at every level of engagement.',
  },
]

const phases = [
  { title: 'Phase 1 — Build visibility', description: 'Post lore, characters, development, software, and community content to grow an audience.' },
  { title: 'Phase 2 — Recruit', description: 'Invite writers, artists, programmers, musicians, and moderators to grow the team.' },
  { title: 'Phase 3 — Release', description: 'Launch books, comics, games, and apps. Deliver real value to the community.' },
  { title: 'Phase 4 — Sustain', description: 'Generate revenue through donations, merchandise, and partnerships that align with our mission.' },
]

const tokenSteps = ['Contribute', 'Earn Tokens', 'Unlock Benefits']
