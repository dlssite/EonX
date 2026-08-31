import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload'
import { absoluteUrl } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projectRoutes: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload()
    const { docs: projects } = await payload.find({
      collection: 'projects',
      where: { isPublished: { equals: true } },
      select: { slug: true, updatedAt: true },
      limit: 200,
    })
    projectRoutes = projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: project.updatedAt ? new Date(project.updatedAt as string) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {
    // DB unavailable — return static routes only
  }

  // ── Static Phase 1 routes ────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      changeFrequency: 'weekly',
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      url: absoluteUrl('/about'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/mission'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/team'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/projects'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/volunteer'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/contact'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]

  return [...staticRoutes, ...projectRoutes]
}
