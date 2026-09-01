import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { generateMetadata as genMeta } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, projectSchema } from '@/lib/structured-data'
import { absoluteUrl, payloadImageUrl } from '@/lib/utils'
import { getPayload } from '@/lib/payload'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/sections/CtaBand'

export const revalidate = 60

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

const statusVariant: Record<string, 'brand' | 'success' | 'default' | 'warning'> = {
  active:    'brand',
  completed: 'success',
  upcoming:  'default',
  paused:    'warning',
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'projects',
      where: { and: [{ slug: { equals: slug } }, { isPublished: { equals: true } }] },
      limit: 1,
    })
    const project = docs[0]
    if (!project) return {}

    return genMeta({
      title: `${project.name as string} | Eonrisia Projects`,
      description: (project.tagline as string) ?? '',
      canonical: `/projects/${slug}`,
    })
  } catch {
    return {}
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  let project: Record<string, unknown> | null = null

  try {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'projects',
      where: { and: [{ slug: { equals: slug } }, { isPublished: { equals: true } }] },
      limit: 1,
    })
    project = (docs[0] as unknown as Record<string, unknown>) ?? null
  } catch {
    // DB unavailable
  }

  if (!project) {
    notFound()
  }

  const coverImage = project.coverImage as { url?: string; alt?: string; width?: number; height?: number } | null
  const coverImageUrl = payloadImageUrl(coverImage?.url)
  const tags = (project.tags as { tag: string }[]) ?? []

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Projects', url: absoluteUrl('/projects') },
          { name: project.name as string, url: absoluteUrl(`/projects/${slug}`) },
        ])}
      />
      <JsonLd
        schema={projectSchema({
          name: project.name as string,
          description: (project.tagline as string) ?? '',
          url: absoluteUrl(`/projects/${slug}`),
          image: coverImageUrl ?? undefined,
        })}
      />

      {/* Breadcrumb Navigation */}
      <div className="pt-32 pb-8 border-b border-glass bg-base-950">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-body-sm text-base-100/50 hover:text-base-100 transition-colors duration-fast"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>All Projects & Universes</span>
          </Link>
        </Container>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-base-950">
        <Container>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant={statusVariant[project.status as string] ?? 'default'} showDot>
                {project.status as string}
              </Badge>
              {tags?.map(({ tag }) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-label font-body font-medium bg-base-900 border border-glass text-base-100/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display font-extrabold text-h1 md:text-[3.5rem] text-base-100 tracking-tight leading-[1.06] mb-6">
              {project.name as string}
            </h1>
            <p className="text-body-lg text-base-100/70 max-w-2xl leading-relaxed mb-10">
              {project.tagline as string}
            </p>
          </div>

          {coverImageUrl && (
            <div className="rounded-3xl overflow-hidden border border-glass bg-base-950 mt-6 shadow-2xl relative">
              <Image
                src={coverImageUrl}
                alt={coverImage?.alt ?? (project.name as string)}
                width={coverImage?.width ?? 1200}
                height={coverImage?.height ?? 675}
                className="w-full h-auto"
                priority
              />
            </div>
          )}
        </Container>
      </section>

      {/* Overview & Content */}
      <section className="py-16 md:py-20 bg-base-950 border-t border-glass">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">Project Scope</p>
            <h2 className="font-display font-bold text-h2 text-base-100 mb-6">
              Overview & Objectives
            </h2>
            <div className="glass-panel p-8 md:p-10 space-y-4 text-base-100/75 text-body leading-relaxed">
              <p>
                {project.description
                  ? String(project.description)
                  : String(project.tagline)}
              </p>
            </div>

            {Boolean(project.externalUrl) && (
              <div className="mt-8 flex items-center gap-4">
                <Button
                  href={String(project.externalUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                >
                  <span>Visit Project Portal</span>
                  <ExternalLink size={15} aria-hidden="true" />
                </Button>
              </div>
            )}
          </div>
        </Container>
      </section>

      <CtaBand
        headline="Interested in contributing to this project?"
        subtext="Explore open volunteer positions across writing, engineering, and creative direction."
        primaryLabel="Explore Volunteer Roles"
        primaryHref="/volunteer"
        secondaryLabel="Contact Stewards"
        secondaryHref="/contact"
      />
    </>
  )
}
