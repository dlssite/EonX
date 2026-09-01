import type { Metadata } from 'next'
import type { Where } from 'payload'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { getPayload } from '@/lib/payload'
import { PageHero } from '@/components/sections/PageHero'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import type { Project } from '@/components/sections/ProjectsGrid'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export const revalidate = 60

export const metadata: Metadata = generateMetadata({
  title: 'Projects | Eonrisia',
  description:
    "Explore Eonrisia's active and completed projects — from the Sanctyria fictional universe to community tools and commissioned creative work.",
  canonical: '/projects',
})

type ProjectsPageProps = {
  searchParams: Promise<{ status?: string; tag?: string }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { status, tag } = await searchParams
  let featured: Project | null = null
  let rest: Project[] = []

  try {
    const payload = await getPayload()
    const conditions: Where[] = [{ isPublished: { equals: true } }]
    if (status && status !== 'all') conditions.push({ status: { equals: status } })

    const { docs } = await payload.find({
      collection: 'projects',
      where: { and: conditions },
      sort: 'order',
      limit: 100,
    })

    const typed = docs as unknown as Project[]
    featured = typed.find((p) => p.isFeatured) ?? null
    rest = typed.filter((p) => !p.isFeatured)
  } catch {
    // DB unavailable — render empty state
  }

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Projects', url: absoluteUrl('/projects') },
        ])}
      />
      <PageHero
        eyebrow="Our Work"
        headline="What we're building."
        lead="From the Sanctyria universe to community tools and commissioned work — everything Eonrisia creates is driven by the same mission."
      />
      <ProjectsGrid featured={featured} projects={rest} activeStatus={status ?? 'all'} activeTag={tag ?? ''} />
      <section className="py-20 bg-base-950 border-t border-glass">
        <Container>
          <div className="glass-panel p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-glass">
            <div>
              <p className="font-display font-bold text-h3 text-base-100 mb-1">
                Have a creative project or universe idea?
              </p>
              <p className="text-body text-base-100/60">
                We collaborate with partners, studios, and clients who share our dedication to open world-building.
              </p>
            </div>
            <Button href="/work-with-us" variant="secondary" size="md" className="shrink-0">
              Work With Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
