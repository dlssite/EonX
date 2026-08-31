'use client'

import { useEffect } from 'react'
import Link from 'next/link'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-base-950 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="eyebrow mb-6">Something went wrong</p>
        <h1 className="font-display text-h1 text-base-100 mb-4">
          Unexpected error
        </h1>
        <p className="text-body text-base-100/60 mb-10">
          An unexpected error occurred. Try refreshing the page, or get in touch if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-500 text-white font-body font-medium text-body hover:bg-brand-400 transition-colors duration-fast"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-base-800 text-base-100/70 font-body font-medium text-body hover:border-brand-500 hover:text-base-100 transition-colors duration-fast"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
