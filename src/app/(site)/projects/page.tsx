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
      <section className="py-16 bg-base-900/50">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 px-8 rounded-2xl border border-base-800">
            <div>
              <p className="font-display font-bold text-h4 text-base-100 mb-1">
                Have a project in mind?
              </p>
              <p className="text-body-sm text-base-100/60">We build for clients who share our values.</p>
            </div>
            <Button href="/work-with-us" variant="secondary" size="md">Work With Us</Button>
          </div>
        </Container>
      </section>
    </>
  )
}
