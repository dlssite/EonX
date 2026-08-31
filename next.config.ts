import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',

  images: {
    formats: ['image/avif', 'image/webp'],
    // Payload v3 serves all uploads through /api/media/file/[filename].
    // Next.js image optimisation cannot proxy same-origin API routes without
    // an explicit allowlist. Since this app self-hosts both Next.js and Payload
    // on the same origin, we disable the built-in proxy and serve Payload images
    // directly — they are already optimised by Payload's sharp pipeline on upload.
    unoptimized: true,
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
