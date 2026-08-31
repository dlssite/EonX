import type { Metadata } from 'next'
import { Syne, Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { generateMetadata } from '@/lib/metadata'

// ── Fonts ──────────────────────────────────────────────────
const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

// ── Default site metadata ──────────────────────────────────
export const metadata: Metadata = generateMetadata()

/**
 * Root layout — renders the <html> shell shared by all routes.
 *
 * IMPORTANT: This layout must only set <html> attributes and inject
 * global CSS. It must NOT render <body> or any providers, because:
 *  - The (payload) group's RootLayout renders its own <html> + <body>
 *  - The (site) group's layout handles <body>, ThemeProvider, and JsonLd
 *
 * Rendering <body> here would cause nested <html> warnings on admin routes.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      {children}
    </html>
  )
}
