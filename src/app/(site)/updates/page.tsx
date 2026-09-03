import type { Metadata } from 'next'
import type { Where } from 'payload'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Rss, Calendar, User, Tag } from 'lucide-react'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl, formatDate, payloadImageUrl } from '@/lib/utils'
import { getPayload } from '@/lib/payload'
import { PageHero } from '@/components/sections/PageHero'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { CtaBand } from '@/components/sections/CtaBand'

export const revalidate = 60

export const metadata: Metadata = generateMetadata({
  title: 'Updates & Announcements | Eonrisia',
  description:
    'Stay up to date with the latest organizational announcements, project progress, community spotlights, and thought pieces from Eonrisia.',
  canonical: '/updates',
})

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  category: 'org-updates' | 'community' | 'projects' | 'thoughts'
  coverImage?: { url?: string; alt?: string; width?: number; height?: number } | null
  author?: { name?: string; email?: string } | null
  publishedAt?: string | null
  isFeatured?: boolean
  isPublished?: boolean
}

const CATEGORIES = [
  { label: 'All Updates', value: 'all' },
  { label: 'Org Updates', value: 'org-updates' },
  { label: 'Community', value: 'community' },
  { label: 'Projects', value: 'projects' },
  { label: 'Thoughts', value: 'thoughts' },
]

const categoryLabelMap: Record<string, string> = {
  'org-updates': 'Org Update',
  community: 'Community',
  projects: 'Project',
  thoughts: 'Thought Piece',
}

const categoryBadgeVariant: Record<string, 'brand' | 'success' | 'default' | 'warning'> = {
  'org-updates': 'brand',
  community: 'success',
  projects: 'warning',
  thoughts: 'default',
}

type UpdatesPageProps = {
  searchParams: Promise<{ category?: string }>
}

export default async function UpdatesPage({ searchParams }: UpdatesPageProps) {
  const { category = 'all' } = await searchParams
  let featuredPost: Post | null = null
  let postsList: Post[] = []

  try {
    const payload = await getPayload()

    // Build where conditions — isPublished is the canonical published flag
    const conditions: Where[] = [{ isPublished: { equals: true } }]

    if (category && category !== 'all') {
      conditions.push({ category: { equals: category } })
    }

    const { docs } = await payload.find({
      collection: 'posts',
      where: { and: conditions },
      sort: '-publishedAt',
      limit: 100,
      depth: 1,
    })

    const typed = docs as unknown as Post[]
    featuredPost = typed.find((p) => p.isFeatured) ?? typed[0] ?? null
    postsList = featuredPost ? typed.filter((p) => p.id !== featuredPost?.id) : typed
  } catch {
  } catch (err) {
    console.error('[UpdatesPage] Failed to load posts:', err)
    // Database fallback — empty list handled gracefully
  }

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Updates', url: absoluteUrl('/updates') },
        ])}
      />

      <PageHero
        eyebrow="Updates"
        headline="What's happening at Eonrisia."
        lead="Discover official announcements, community spotlights, project progress reports, and perspectives from our team."
      />

      {/* Category Filter Bar */}
      <section className="py-6 bg-base-950 border-b border-glass sticky top-16 z-20 backdrop-blur-md">
        <Container>
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <div className="flex items-center gap-2 shrink-0">
              {CATEGORIES.map((cat) => {
                const isActive = category === cat.value
                return (
                  <Link
                    key={cat.value}
                    href={cat.value === 'all' ? '/updates' : `/updates?category=${cat.value}`}
                    className={`px-4 py-2 rounded-full text-body-sm font-medium transition-all duration-fast shrink-0 ${
                      isActive
                        ? 'bg-brand-500 text-white shadow-[0_0_16px_0_rgba(108,99,255,0.4)]'
                        : 'bg-base-900 border border-glass text-base-100/60 hover:text-base-100 hover:border-glass-strong'
                    }`}
                  >
                    {cat.label}
                  </Link>
                )
              })}
            </div>

            {/* RSS Feed Badge */}
            <Link
              href="/feed.xml"
              target="_blank"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-label font-medium bg-base-900 border border-glass text-base-100/60 hover:text-brand-400 hover:border-glass-strong transition-colors shrink-0"
              title="Subscribe via RSS 2.0"
            >
              <Rss size={13} className="text-brand-400" />
              <span>RSS Feed</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-base-950">
        <Container>
          {/* Featured Post Card */}
          {featuredPost && (
            <div className="mb-16">
              <p className="eyebrow mb-4">Featured Highlight</p>
              <Link
                href={`/updates/${featuredPost.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl border border-glass bg-gradient-to-b from-base-900/90 via-base-900/70 to-base-950/90 p-6 sm:p-8 md:p-10 hover:border-glass-strong transition-all duration-normal shadow-2xl overflow-hidden"
              >
                {/* Cover Image */}
                <div className="lg:col-span-7 relative aspect-[16/9] rounded-2xl overflow-hidden bg-base-950 border border-glass">
                  {featuredPost.coverImage?.url ? (
                    <Image
                      src={payloadImageUrl(featuredPost.coverImage.url) ?? ''}
                      alt={featuredPost.coverImage.alt ?? featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-slow"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-900/30 to-base-950 text-base-100/30">
                      <Tag size={48} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-base-950/80 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge
                        variant={categoryBadgeVariant[featuredPost.category] ?? 'default'}
                        showDot
                      >
                        {categoryLabelMap[featuredPost.category] ?? featuredPost.category}
                      </Badge>
                      {featuredPost.publishedAt && (
                        <span className="text-label text-base-100/50 flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(featuredPost.publishedAt)}
                        </span>
                      )}
                    </div>

                    <h2 className="font-display font-bold text-h2 text-base-100 group-hover:text-brand-300 transition-colors leading-tight mb-4">
                      {featuredPost.title}
                    </h2>

                    <p className="text-body text-base-100/70 line-clamp-4 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-glass flex items-center justify-between">
                    <div className="flex items-center gap-2 text-body-sm text-base-100/60">
                      <User size={14} className="text-brand-400" />
                      <span>{featuredPost.author?.name ?? 'Eonrisia Team'}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-body-sm font-semibold text-brand-400 group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Posts Grid */}
          {postsList.length > 0 ? (
            <div>
              {featuredPost && <h3 className="font-display font-bold text-h3 text-base-100 mb-8">All Updates</h3>}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {postsList.map((post) => (
                  <Link
                    key={post.id}
                    href={`/updates/${post.slug}`}
                    className="group flex flex-col rounded-3xl border border-glass bg-gradient-to-b from-base-900/90 via-base-900/60 to-base-950/80 backdrop-blur-md hover:border-glass-strong transition-all duration-normal hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(108,99,255,0.2)] overflow-hidden"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/9] bg-base-950 border-b border-glass overflow-hidden">
                      {post.coverImage?.url ? (
                        <Image
                          src={payloadImageUrl(post.coverImage.url) ?? ''}
                          alt={post.coverImage.alt ?? post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-slow"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-900/20 to-base-950 text-base-100/20">
                          <Tag size={36} strokeWidth={1} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-base-950/70 via-transparent to-transparent" />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <Badge
                            variant={categoryBadgeVariant[post.category] ?? 'default'}
                            showDot
                          >
                            {categoryLabelMap[post.category] ?? post.category}
                          </Badge>
                          {post.publishedAt && (
                            <span className="text-label text-base-100/50">
                              {formatDate(post.publishedAt)}
                            </span>
                          )}
                        </div>

                        <h3 className="font-display font-bold text-h4 text-base-100 group-hover:text-brand-300 transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h3>

                        <p className="text-body-sm text-base-100/60 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-glass flex items-center justify-between text-label text-base-100/50">
                        <span className="flex items-center gap-1">
                          <User size={12} className="text-brand-400" />
                          <span>{post.author?.name ?? 'Eonrisia'}</span>
                        </span>
                        <span className="text-brand-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            !featuredPost && (
              <div className="glass-panel p-12 text-center max-w-xl mx-auto border border-glass">
                <Rss className="w-12 h-12 text-base-100/30 mx-auto mb-4" />
                <h3 className="font-display font-bold text-h3 text-base-100 mb-2">
                  No updates found
                </h3>
                <p className="text-body text-base-100/60 mb-6">
                  {category !== 'all'
                    ? `No posts available in the "${categoryLabelMap[category] ?? category}" category yet.`
                    : 'Check back soon for news, announcements, and updates from the Eonrisia team.'}
                </p>
                {category !== 'all' && (
                  <Link
                    href="/updates"
                    className="inline-flex items-center justify-center px-5 py-2 rounded-full text-body-sm font-semibold bg-brand-500 text-white hover:bg-brand-400 transition-colors"
                  >
                    View All Updates
                  </Link>
                )}
              </div>
            )
          )}
        </Container>
      </section>

      <CtaBand
        headline="Want to stay in the loop?"
        subtext="Follow our project updates or get involved directly as a contributor or partner."
        primaryLabel="Join as a Contributor"
        primaryHref="/volunteer"
        secondaryLabel="Explore Projects"
        secondaryHref="/projects"
      />
    </>
  )
}
