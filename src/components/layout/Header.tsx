'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { MobileMenu } from './MobileMenu'

type NavLink = {
  label: string
  href: string
  isExternal?: boolean
}

type HeaderProps = {
  links: NavLink[]
  ctaLabel: string
  ctaHref: string
  currentPath?: string
}

export function Header({ links, ctaLabel, ctaHref, currentPath: propPath = '' }: HeaderProps) {
  const pathname = usePathname()
  const activePath = pathname || propPath || '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-sticky transition-all duration-normal',
          scrolled
            ? 'bg-base-950/85 backdrop-blur-xl border-b border-glass shadow-lg py-2.5 md:py-3.5'
            : 'bg-transparent py-4 md:py-6',
        )}
      >
        <Container>
          <div className="flex items-center justify-between">

            {/* Wordmark Lockup */}
            <Link
              href="/"
              aria-label="Eonrisia — go to homepage"
              className="flex items-center group shrink-0 select-none"
            >
              <span className="font-display font-extrabold text-[1.3rem] tracking-tight text-base-100 group-hover:text-brand-400 transition-colors duration-fast">
                Eonrisia
              </span>
            </Link>

            {/* Desktop Navigation Pill Island */}
            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1 bg-base-900/60 border border-glass px-2 py-1.5 rounded-full backdrop-blur-md">
              <ul className="flex items-center gap-1" role="list">
                {links.map((link) => {
                  const isActive =
                    activePath === link.href ||
                    (link.href !== '/' && activePath.startsWith(link.href))

                  return (
                    <li key={link.href} className="relative">
                      <Link
                        href={link.href}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'relative z-10 block px-4 py-1.5 rounded-full text-body-sm font-body font-medium transition-colors duration-fast',
                          isActive
                            ? 'text-base-100 font-semibold'
                            : 'text-base-100/60 hover:text-base-100 hover:bg-base-800/40',
                        )}
                      >
                        {link.label}
                      </Link>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          className="absolute inset-0 bg-base-800/80 border border-glass-subtle rounded-full z-0 pointer-events-none"
                        />
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link
                href={ctaHref}
                className={cn(
                  'inline-flex items-center justify-center',
                  'px-5 py-2 rounded-full text-body-sm font-body font-semibold',
                  'bg-brand-500 text-white hover:bg-brand-400',
                  'shadow-[0_0_24px_0_rgba(108,99,255,0.4)] sheen-sweep',
                  'active:scale-[0.97] hover:scale-[1.02]',
                  'transition-all duration-fast',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base-950',
                )}
              >
                {ctaLabel}
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-full bg-base-900/80 border border-glass text-base-100/70 hover:text-base-100 hover:bg-base-800 transition-colors"
              >
                <Menu size={20} aria-hidden="true" />
              </button>
            </div>

          </div>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <div id="mobile-menu">
        <MobileMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          links={links}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
        />
      </div>
    </>
  )
}
