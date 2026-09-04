import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react'
import { generateMetadata as genMeta } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, articleSchema } from '@/lib/structured-data'
import { absoluteUrl, formatDate, payloadImageUrl } from '@/lib/utils'
import { getPayload } from '@/lib/payload'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { RichText } from '@/components/ui/RichText'
import { CtaBand } from '@/components/sections/CtaBand'
import type { Post } from '../page'

export const revalidate = 60

type PostPageProps = {
  params: Promise<{ slug: string }>
}

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

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'posts',
      where: { and: [{ slug: { equals: slug } }, { isPublished: { equals: true } }] },
      limit: 1,
    })
    const post = docs[0] as unknown as Post | undefined
    if (!post) return {}

    return genMeta({
      title: `${post.title} | Eonrisia Updates`,
      description: post.excerpt || '',
      canonical: `/updates/${slug}`,
    })
  } catch {
    return {}
  }
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params
  let post: Post | null = null
  let relatedPosts: Post[] = []

  try {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'posts',
      where: { and: [{ slug: { equals: slug } }, { isPublished: { equals: true } }] },
      limit: 1,
    })
    post = (docs[0] as unknown as Post) ?? null

    if (post) {
      const { docs: related } = await payload.find({
        collection: 'posts',
        where: {
          and: [
            { isPublished: { equals: true } },
            { category: { equals: post.category } },
            { slug: { not_equals: slug } },
          ],
        },
        sort: '-publishedAt',
        limit: 3,
      })
      relatedPosts = related as unknown as Post[]
    }
  } catch {
    // Database fallback
  }

  if (!post) {
    notFound()
  }

  const coverImageUrl = payloadImageUrl(post.coverImage?.url)

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Updates', url: absoluteUrl('/updates') },
          { name: post.title, url: absoluteUrl(`/updates/${slug}`) },
        ])}
      />
      <JsonLd
        schema={articleSchema({
          title: post.title,
          description: post.excerpt,
          image: coverImageUrl,
          authorName: post.author?.name ?? 'Eonrisia Team',
          publishedAt: post.publishedAt ?? new Date().toISOString(),
          updatedAt: post.publishedAt ?? new Date().toISOString(),
        })}
      />

      {/* Breadcrumb Bar */}
      <div className="pt-24 pb-4 sm:pt-32 sm:pb-6 border-b border-glass bg-base-950">
        <Container>
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 py-2 text-body-sm text-base-100/60 hover:text-base-100 transition-colors duration-fast min-h-[44px]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Back to Updates</span>
          </Link>
        </Container>
      </div>

      {/* Article Hero */}
      <article className="py-8 sm:py-12 md:py-16 bg-base-950">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Badge variant={categoryBadgeVariant[post.category] ?? 'default'} showDot>
                {categoryLabelMap[post.category] ?? post.category}
              </Badge>
              {post.publishedAt && (
                <span className="text-label text-base-100/50 flex items-center gap-1">
                  <Calendar size={13} />
                  {formatDate(post.publishedAt)}
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold text-h2 sm:text-h1 md:text-[3.25rem] text-base-100 tracking-tight leading-[1.08] mb-4 sm:mb-6">
              {post.title}
            </h1>

            <p className="text-body sm:text-body-lg text-base-100/70 leading-relaxed mb-6 sm:mb-8 border-l-2 border-brand-500 pl-3 sm:pl-4 py-1">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-glass text-body-sm text-base-100/60 mb-8 sm:mb-10">
              <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 font-bold">
                <User size={16} />
              </div>
              <div>
                <span className="font-medium text-base-100">{post.author?.name ?? 'Eonrisia Team'}</span>
                <span className="block text-label text-base-100/40">Author & Steward</span>
              </div>
            </div>

            {/* Featured Image */}
            {coverImageUrl && (
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-glass bg-base-950 shadow-2xl relative aspect-[16/9] mb-8 sm:mb-12">
                <Image
                  src={coverImageUrl}
                  alt={post.coverImage?.alt ?? post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <div className="glass-panel p-5 sm:p-8 md:p-12 border border-glass">
              {post.content ? (
                <RichText content={post.content} />
              ) : (
                <p className="text-base-100/75 text-body-sm sm:text-body leading-relaxed">{post.excerpt}</p>
              )}
            </div>
          </div>
        </Container>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-base-950 border-t border-glass">
          <Container>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="eyebrow mb-1">More Updates</p>
                <h2 className="font-display font-bold text-h3 text-base-100">
                  Related Posts
                </h2>
              </div>
              <Link
                href="/updates"
                className="inline-flex items-center gap-1 text-body-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/updates/${rel.slug}`}
                  className="group glass-panel p-6 border border-glass hover:border-glass-strong transition-all flex flex-col justify-between"
                >
                  <div>
                    <Badge variant={categoryBadgeVariant[rel.category] ?? 'default'} className="mb-3">
                      {categoryLabelMap[rel.category] ?? rel.category}
                    </Badge>
                    <h3 className="font-display font-bold text-h4 text-base-100 group-hover:text-brand-400 transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h3>
                    <p className="text-body-sm text-base-100/60 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-glass text-label text-base-100/40">
                    {rel.publishedAt ? formatDate(rel.publishedAt) : 'Recent'}
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        headline="Stay involved with Eonrisia"
        subtext="Join our community of creators, engineers, and world-builders."
        primaryLabel="Get Involved"
        primaryHref="/volunteer"
        secondaryLabel="Read More Updates"
        secondaryHref="/updates"
      />
    </>
  )
}

