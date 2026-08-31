import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = (await request.json()) as {
      collection?: string
      slug?: string
      path?: string
    }

    if (body.path) {
      revalidatePath(body.path)
    }

    // Revalidate by collection
    switch (body.collection) {
      case 'team':
        revalidatePath('/team')
        break
      case 'projects':
        revalidatePath('/projects')
        if (body.slug) revalidatePath(`/projects/${body.slug}`)
        break
      case 'opportunities':
        revalidatePath('/volunteer')
        break
      case 'site-settings':
      case 'navigation':
      case 'footer':
        revalidatePath('/', 'layout')
        break
      default:
        revalidateTag('payload')
    }

    return NextResponse.json({ revalidated: true, timestamp: Date.now() })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
