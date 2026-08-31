import { NextRequest, NextResponse } from 'next/server'

/**
 * Inject the current pathname as a request header so Server Components
 * (like SiteHeader) can read it without a client-side hook.
 *
 * The header `x-pathname` is available via `headers()` in any Server Component.
 */
export function middleware(request: NextRequest): NextResponse {
  const response = NextResponse.next()
  response.headers.set('x-pathname', request.nextUrl.pathname)
  return response
}

export const config = {
  /*
   * Apply to all routes except:
   * - Payload admin (handled separately)
   * - API routes
   * - Next.js internals (_next/static, _next/image)
   * - Static files (favicon, robots, sitemap, OG image, brand assets)
   */
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|opengraph-image|brand/).*)',
  ],
}
