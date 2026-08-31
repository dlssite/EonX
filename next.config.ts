import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',

  images: {
    formats: ['image/avif', 'image/webp'],
    // Allow Next.js image optimisation to proxy images served by Payload CMS.
    // Payload stores absolute URLs (prefixed with serverURL) when a serverURL is
    // set in payload.config.ts. Without this entry, next/image returns 400 for
    // any src that starts with https://eonrisia.org/...
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eonrisia.org',
        pathname: '/**',
      },
    ],
  },

  async redirects() {
    return []
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
