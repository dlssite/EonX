import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { getPayload } from '@/lib/payload'
import { PageHero } from '@/components/sections/PageHero'
import { TeamPreview } from '@/components/sections/TeamPreview'
import type { TeamMember } from '@/components/sections/TeamPreview'
import { CtaBand } from '@/components/sections/CtaBand'
import { Container } from '@/components/ui/Container'
import { Shield, Sparkles, Scale, Heart, Compass, Cpu } from 'lucide-react'

export const revalidate = 60

export const metadata: Metadata = generateMetadata({
  title: 'About Eonrisia | Mission, Team & Values',
  description:
    'Eonrisia is an open community-driven organization dedicated to building fictional universes and open-source creative tools.',
  canonical: '/about',
})

const values = [
  {
    icon: Sparkles,
    title: 'Creative Autonomy',
    description:
      'We empower independent authors, illustrators, and developers with open tools and uncompromised creative ownership.',
  },
  {
    icon: Scale,
    title: 'Constitutional Governance',
    description:
      'Every operation, grant, and project roadmap is governed by transparent constitutional bylaws rather than top-down executive whim.',
  },
  {
    icon: Shield,
    title: 'Perpetual Commons',
    description:
      'Our worlds and tools are designed for generational longevity, protected against speculative privatization or corporate enclosure.',
  },
  {
    icon: Cpu,
    title: 'Technical Rigor',
    description:
      'We treat software craft as an art form — prioritizing lightweight architectures, open protocols, and zero bloat.',
  },
  {
    icon: Heart,
    title: 'Contributor First',
    description:
      'Authentic contributors earn recognized tokens and public credits on all releases, sharing directly in the value they create.',
  },
  {
    icon: Compass,
    title: 'Living Lore',
    description:
      'Worlds that grow organically through collective storytelling, maintaining coherent internal logic across books, games, and web media.',
  },
]

export default async function AboutPage() {
  let teamMembers: TeamMember[] = []

  try {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'team-members',
      where: { isActive: { equals: true } },
      sort: 'order',
      limit: 12,
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
          { name: 'About', url: absoluteUrl('/about') },
        ])}
      />
      <PageHero
        eyebrow="Who We Are"
        headline="An organization built to endure."
        lead="Eonrisia is a non-profit collective bridging imaginative world-building, digital engineering, and open governance."
      />

      {/* ── Our Core Values Grid ───────────────────────────────── */}
      <section className="py-24 md:py-32 bg-base-900/40 border-y border-glass">
        <Container>
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <p className="eyebrow mb-3">Guiding Principles</p>
            <h2 className="font-display font-extrabold text-h2 md:text-[2.75rem] text-base-100 tracking-tight">
              What guides every decision we make.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="p-8 rounded-3xl border border-glass bg-base-900/70 backdrop-blur-md hover:border-glass-hover transition-all duration-normal hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-base-950 border border-glass-subtle flex items-center justify-center mb-6 group-hover:border-brand-500/50 transition-colors">
                    <Icon size={20} className="text-brand-400" />
                  </div>
                  <h3 className="font-display font-bold text-h3 text-base-100 mb-2 group-hover:text-brand-300 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-body-sm text-base-100/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {teamMembers.length > 0 && <TeamPreview members={teamMembers} />}

      <CtaBand
        headline="Want to be part of the story?"
        subtext="Join our team of writers, developers, and artists building the next generation of creative worlds."
        primaryLabel="Explore Open Roles"
        primaryHref="/volunteer"
        secondaryLabel="Read Our Mission"
        secondaryHref="/mission"
      />
    </>
  )
}
