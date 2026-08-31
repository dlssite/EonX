import Link from 'next/link'
import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateMetadata({
  title: 'Page Not Found',
  noIndex: true,
})

export default function NotFound() {
  return (
    <main className="min-h-screen bg-base-950 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="eyebrow mb-6">404</p>
        <h1 className="font-display text-h1 text-base-100 mb-4">
          Page not found
        </h1>
        <p className="text-body text-base-100/60 mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-500 text-white font-body font-medium text-body hover:bg-brand-400 transition-colors duration-fast"
          >
            Go home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-base-800 text-base-100/70 font-body font-medium text-body hover:border-brand-500 hover:text-base-100 transition-colors duration-fast"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  )
}
