import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',

  images: {
    formats: ['image/avif', 'image/webp'],
    // Allow next/image to optimise Payload-served media.
    // Payload v3 always serves uploads via /api/media/file/[filename] (same-origin).
    // localPatterns whitelists those paths so next/image doesn't return 400.
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    // Also allow absolute URLs (e.g. when serverURL is set in payload.config).
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eonrisia.org',
        pathname: '/api/media/file/**',
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
