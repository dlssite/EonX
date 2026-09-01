import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { getPayload } from '@/lib/payload'
import { PageHero } from '@/components/sections/PageHero'
import { OpportunitiesList } from '@/components/sections/OpportunitiesList'
import type { Opportunity } from '@/components/sections/OpportunitiesList'
import { CtaBand } from '@/components/sections/CtaBand'
import { Container } from '@/components/ui/Container'

export const revalidate = 60

export const metadata: Metadata = generateMetadata({
  title: 'Volunteer & Contribute | Eonrisia',
  description:
    'Join Eonrisia as a volunteer contributor. Open roles across engineering, writing, art, design, and community management.',
  canonical: '/volunteer',
})

const whyVolunteer = [
  {
    title: 'Real Projects, Real Release',
    description:
      'Everything you build ships to a living audience — published fiction, production web engines, interactive games, and community tools.',
  },
  {
    title: 'Transparent Attribution',
    description:
      'Your work is permanently credited. We never obscure contributor names behind corporate masks or lock assets in private repositories.',
  },
  {
    title: 'Collaborative Governance',
    description:
      'Contributors earn non-speculative governance weight. Your voice directly guides project roadmaps, charter amendments, and grant disbursements.',
  },
]

type VolunteerPageProps = {
  searchParams: Promise<{ dept?: string }>
}

export default async function VolunteerPage({ searchParams }: VolunteerPageProps) {
  const { dept } = await searchParams
  let opportunities: Opportunity[] = []

  try {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'opportunities',
      where: {
        and: [
          { isOpen: { equals: true } },
          ...(dept && dept !== 'all' ? [{ department: { equals: dept } }] : []),
        ],
      },
      sort: 'order',
      limit: 100,
    })
    opportunities = docs as unknown as Opportunity[]
  } catch {
    // DB unavailable — render empty state
  }

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Volunteer', url: absoluteUrl('/volunteer') },
        ])}
      />
      <PageHero
        eyebrow="Join the Collective"
        headline="Build worlds with us."
        lead="Eonrisia runs on the talent and dedication of a global contributor collective. Whether you write, illustrate, engineer, compose, or moderate — there is a permanent place for you here."
      />

      {/* ── Why Volunteer ──────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-base-900/40 border-y border-glass">
        <Container>
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <p className="eyebrow mb-3">Contributor Experience</p>
            <h2 className="font-display font-extrabold text-h2 md:text-[2.75rem] text-base-100 tracking-tight">
              Why creators build with Eonrisia.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyVolunteer.map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-3xl border border-glass bg-base-900/70 backdrop-blur-md hover:border-glass-hover transition-all duration-normal hover:-translate-y-1 group"
              >
                <h3 className="font-display font-bold text-h3 text-base-100 mb-3 group-hover:text-brand-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-body-sm text-base-100/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <OpportunitiesList opportunities={opportunities} activeDept={dept ?? 'all'} />

      {/* ── Token System ───────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-base-950 border-t border-glass">
        <Container>
          <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto border border-brand-500/30">
            <p className="eyebrow mb-3">Contributor Rewards</p>
            <h2 className="font-display font-extrabold text-h2 text-base-100 mb-4">
              Earn tokens for your contributions.
            </h2>
            <p className="text-body text-base-100/70 leading-relaxed mb-8 max-w-2xl">
              Every accepted contribution earns non-speculative tokens that unlock ecosystem benefits, official release credits, exclusive merchandise, and community governance voting weight.
            </p>
            <div className="inline-flex flex-wrap items-center gap-3 px-6 py-3 rounded-full bg-base-950 border border-glass text-body-sm text-base-100/70 font-body">
              <span className="font-semibold text-base-100">Contribute</span>
              <span className="text-brand-400">→</span>
              <span className="font-semibold text-base-100">Earn Verified Tokens</span>
              <span className="text-brand-400">→</span>
              <span className="font-semibold text-base-100">Unlock Rewards & Governance</span>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        headline="Ready to make your mark?"
        subtext="Apply for an active opening or submit a general contributor inquiry to join our onboarding pool."
        primaryLabel="Explore Roles Above"
        primaryHref="#opportunities"
        secondaryLabel="General Contact"
        secondaryHref="/contact"
      />
    </>
  )
}
