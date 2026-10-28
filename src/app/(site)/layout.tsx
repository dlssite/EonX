import { DM_Mono, DM_Sans, Fraunces } from 'next/font/google'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema, websiteSchema } from '@/lib/structured-data'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

/**
 * Site shell layout — wraps all public-facing pages.
 *
 * Owns <body>, ThemeProvider, and org-level structured data.
 * These must live here (not in the root layout) because the
 * (payload) admin group uses Payload's own RootLayout which
 * renders its own <body> — putting <body> in the root layout
 * would cause nested <html> errors on admin routes.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <ThemeProvider>
        <JsonLd schema={organizationSchema()} />
        <JsonLd schema={websiteSchema()} />
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </ThemeProvider>
    </body>
  )
}
