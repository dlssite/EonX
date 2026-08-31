import type { Metadata } from 'next'
import type { Where } from 'payload'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { getPayload } from '@/lib/payload'
import { PageHero } from '@/components/sections/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { OpportunitiesList } from '@/components/sections/OpportunitiesList'
import type { Opportunity } from '@/components/sections/OpportunitiesList'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'

export const revalidate = 60

export const metadata: Metadata = generateMetadata({
  title: 'Volunteer With Eonrisia — Join Our Creative Community',
  description:
    "Find open volunteer roles at Eonrisia. We're looking for writers, developers, artists, and community builders. Flexible, remote, and rewarding.",
  canonical: '/volunteer',
})

type VolunteerPageProps = {
  searchParams: Promise<{ dept?: string }>
}

export default async function VolunteerPage({ searchParams }: VolunteerPageProps) {
  const { dept } = await searchParams
  let opportunities: Opportunity[] = []

  try {
    const payload = await getPayload()
    const where: Where =
      dept && dept !== 'all'
        ? { and: [{ isOpen: { equals: true } }, { department: { equals: dept } }] }
        : { isOpen: { equals: true } }

    const { docs } = await payload.find({
      collection: 'opportunities',
      where,
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
        eyebrow="Volunteer"
        headline="Help build something that lasts."
        lead="Eonrisia runs on the talent and generosity of contributors. Whether you write, design, code, compose, or moderate — there's a place for you here."
      />
      <section className="py-16 md:py-20 bg-base-900/40 border-y border-base-800/60">
        <Container>
          <Heading as="h2" size="h2" eyebrow="Why Volunteer" className="mb-10 text-center">
            What you get out of it.
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {whyVolunteer.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-base-700 bg-base-900 hover:border-brand-500/40 transition-colors duration-normal">
                <h3 className="font-display font-bold text-h4 text-base-100 mb-2">{item.title}</h3>
                <p className="text-body-sm text-base-100/55 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <OpportunitiesList opportunities={opportunities} activeDept={dept ?? 'all'} />
      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-2xl">
            <Heading as="h2" size="h2" eyebrow="Token System" className="mb-5">
              Earn tokens for your contributions.
            </Heading>
            <p className="text-body text-base-100/65 leading-relaxed mb-4">
              Every contribution you make earns tokens that unlock community benefits,
              recognition, and exclusive access within the Eonrisia ecosystem.
            </p>
            <div className="flex items-center gap-3 text-body-sm text-base-100/40 font-body">
              <span>Contribute</span>
              <span className="text-brand-500">→</span>
              <span>Earn Tokens</span>
              <span className="text-brand-500">→</span>
              <span>Unlock Benefits</span>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand
        headline="Don't see a role that fits?"
        primaryLabel="Reach Out Anyway"
        primaryHref="/contact"
      />
    </>
  )
}

const whyVolunteer = [
  {
    title: 'Real work, real impact',
    description: "You'll contribute to active projects — not busy work. Your name goes on what you build.",
  },
  {
    title: 'Flexible and remote',
    description: 'No minimum hours, no office. Contribute when and how you can, from anywhere in the world.',
  },
  {
    title: 'Earn recognition',
    description: 'Contributions earn tokens that unlock benefits, early access, and community status.',
  },
]
