import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPayload } from '@/lib/payload'
import { generateMetadata as genMeta } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { CtaBand } from '@/components/sections/CtaBand'

export const revalidate = 120
// Allow slugs not returned by generateStaticParams to be rendered at runtime
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // PAYLOAD_SECRET is not available at Docker build time — skip pre-rendering.
  // Pages are generated on first request and cached by ISR (revalidate = 120).
  if (!process.env.PAYLOAD_SECRET) return []

  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'projects',
    where: { isPublished: { equals: true } },
    select: { slug: true },
    limit: 200,
  })
  return docs.map((doc) => ({ slug: doc.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!process.env.PAYLOAD_SECRET) return {}

  const { slug } = await params
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const project = docs[0]
  if (!project) return {}

  const seo = project.seo as { metaTitle?: string; metaDescription?: string } | null

  return genMeta({
    title: seo?.metaTitle ?? (project.name as string),
    description: seo?.metaDescription ?? (project.tagline as string),
    canonical: `/projects/${slug}`,
  })
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: 'projects',
    where: { and: [{ slug: { equals: slug } }, { isPublished: { equals: true } }] },
    limit: 1,
  })

  const project = docs[0]
  if (!project) notFound()

  const coverImage = project.coverImage as { url?: string; alt?: string; width?: number; height?: number } | null
  const tags = project.tags as Array<{ tag: string }> | null

  const statusVariant: Record<string, 'brand' | 'success' | 'default' | 'warning'> = {
    active: 'brand',
    completed: 'success',
    upcoming: 'default',
    paused: 'warning',
  }

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Projects', url: absoluteUrl('/projects') },
          { name: project.name as string, url: absoluteUrl(`/projects/${slug}`) },
        ])}
      />

      {/* Breadcrumb */}
      <div className="pt-28 pb-8 border-b border-base-800">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-body-sm text-base-100/50 hover:text-base-100 transition-colors duration-fast"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            All Projects
          </Link>
        </Container>
      </div>

      {/* Hero */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant={statusVariant[project.status as string] ?? 'default'}>
                {project.status as string}
              </Badge>
              {tags?.map(({ tag }) => (
                <Badge key={tag} variant="default">{tag}</Badge>
              ))}
            </div>
            <h1 className="font-display font-bold text-h1 text-base-100 tracking-tight mb-4">
              {project.name as string}
            </h1>
            <p className="text-body-lg text-base-100/70 mb-10">
              {project.tagline as string}
            </p>
          </div>
          {coverImage?.url && (
            <div className="rounded-2xl overflow-hidden border border-base-800 mt-4">
              <Image
                src={coverImage.url}
                alt={coverImage.alt ?? (project.name as string)}
                width={coverImage.width ?? 1200}
                height={coverImage.height ?? 675}
                className="w-full h-auto"
                priority
              />
            </div>
          )}
        </Container>
      </section>

      {/* Body */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl">
            {/* Description — shown until a full RichTextRenderer is wired up */}
            <p className="text-base-100/70 text-body leading-relaxed">
              {project.description
                ? String(project.description)
                : project.tagline as string}
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        headline="Want to contribute to this project?"
        primaryLabel="Volunteer"
        primaryHref="/volunteer"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  )
}
