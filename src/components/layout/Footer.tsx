import Link from 'next/link'
import { Youtube, Instagram, Twitter, Github } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'

type FooterLink = { label: string; href: string; isExternal?: boolean }
type FooterColumn = { heading: string; links: FooterLink[] }
type SocialLink = { platform: string; url: string }

type FooterProps = {
  tagline?: string
  columns: FooterColumn[]
  socialLinks: SocialLink[]
  legalText?: string
}

const socialIcons: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: 'true' }>> =
  {
    youtube:   Youtube,
    instagram: Instagram,
    twitter:   Twitter,
    github:    Github,
  }

/**
 * Inline SVG icons for platforms not in Lucide (TikTok, Discord).
 * These match the 16px icon size used for all other social icons.
 */
function TikTokIcon({ size = 16, 'aria-hidden': ariaHidden }: { size?: number; 'aria-hidden'?: 'true' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  )
}

function DiscordIcon({ size = 16, 'aria-hidden': ariaHidden }: { size?: number; 'aria-hidden'?: 'true' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden}
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

const customIcons: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: 'true' }>> = {
  tiktok:  TikTokIcon,
  discord: DiscordIcon,
}

const socialLabels: Record<string, string> = {
  youtube:   'YouTube',
  instagram: 'Instagram',
  tiktok:    'TikTok',
  twitter:   'X (Twitter)',
  discord:   'Discord',
  github:    'GitHub',
}

export function Footer({ tagline, columns, socialLinks, legalText }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-base-950 border-t border-glass relative overflow-hidden"
      role="contentinfo"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(108,99,255,0.18) 0%, transparent 70%)',
        }}
      />

      <Container className="py-12 sm:py-16 md:py-20 relative z-10">

        {/* ── Main grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-12 sm:mb-14">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link
              href="/"
              aria-label="Eonrisia homepage"
              className="inline-flex items-center gap-2 group w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-brand-400 group-hover:scale-125 transition-transform duration-fast shadow-[0_0_8px_0_rgba(108,99,255,0.8)]" />
              <span className="font-display font-extrabold text-[1.3rem] tracking-tight text-base-100 group-hover:text-brand-400 transition-colors duration-fast">
                Eonrisia
              </span>
            </Link>

            {tagline && (
              <p className="text-body-sm text-base-100/55 max-w-sm leading-relaxed">
                {tagline}
              </p>
            )}

            <p className="text-label-xs text-base-100/40 max-w-xs leading-relaxed">
              Official organization portal. Fictional universe lore and media live exclusively on dedicated project sites.
            </p>

            {/* Social icons with 44px touch targets */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {socialLinks.map((social) => {
                  const Icon  = socialIcons[social.platform] ?? customIcons[social.platform]
                  const label = socialLabels[social.platform] ?? social.platform
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Eonrisia on ${label}`}
                      className={cn(
                        'min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-glass bg-base-900/60',
                        'text-base-100/60 hover:text-base-100 hover:border-glass-hover hover:bg-base-800',
                        'transition-all duration-fast',
                      )}
                    >
                      {Icon ? (
                        <Icon size={16} aria-hidden="true" />
                      ) : (
                        <span className="text-label font-body font-medium">{label.charAt(0).toUpperCase()}</span>
                      )}
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Nav columns (span 4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {columns.map((col) => (
              <nav key={col.heading} aria-label={`${col.heading} links`}>
                <h3 className="text-label-xs font-body font-semibold text-base-100/40 uppercase tracking-widest mb-3.5">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-2.5" role="list">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        className={cn(
                          'inline-block py-1 text-body-sm font-body text-base-100/60',
                          'hover:text-base-100 transition-colors duration-fast',
                          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500 rounded-sm',
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div className="pt-8 border-t border-glass flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-safe">
          <p className="text-label text-base-100/40 font-body">
            © {year} {legalText ?? 'Eonrisia. All rights reserved.'}
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/governance"
              className="text-label text-base-100/40 hover:text-base-100/80 transition-colors duration-fast py-1"
            >
              Governance & Constitution
            </Link>
            <Link
              href="/contact"
              className="text-label text-base-100/40 hover:text-base-100/80 transition-colors duration-fast py-1"
            >
              Contact
            </Link>
          </div>
        </div>

      </Container>
    </footer>
  )
}
