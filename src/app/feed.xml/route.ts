import { getPayload } from '@/lib/payload'
import { absoluteUrl } from '@/lib/utils'

export const revalidate = 3600 // 1 hour RSS cache

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eonrisia.org'
  let posts: Array<{
    title: string
    slug: string
    excerpt: string
    publishedAt?: string
  }> = []

  try {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'posts',
      where: { isPublished: { equals: true } },
      sort: '-publishedAt',
      limit: 50,
    })
    posts = docs as unknown as typeof posts
  } catch {
    // Database fallback — render feed shell
  }

  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${absoluteUrl(`/updates/${post.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/updates/${post.slug}`)}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
    </item>`
    )
    .join('')

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2000/svg">
  <channel>
    <title>Eonrisia — Official Updates</title>
    <link>${siteUrl}</link>
    <description>Official announcements, community news, and development updates from Eonrisia.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}

