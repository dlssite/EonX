'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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

/**
 * Site header — transparent over hero, frosted glass on scroll.
 * CTA uses a pill shape. Scroll state adds a subtle border, not a heavy background.
 */
export function Header({ links, ctaLabel, ctaHref, currentPath = '' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 48)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-sticky',
          'transition-all duration-normal',
          scrolled
            ? 'bg-base-950/90 backdrop-blur-xl border-b border-base-800/40'
            : 'bg-base-950/60 backdrop-blur-md',
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-[72px]">

            {/* Wordmark */}
            <Link
              href="/"
              aria-label="Eonrisia — go to homepage"
              className="flex items-center shrink-0 group"
            >
              <span className="font-display font-extrabold text-[1.25rem] tracking-tight text-base-100 group-hover:text-brand-300 transition-colors duration-fast">
                Eonrisia
              </span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-0.5">
              <ul className="flex items-center gap-0.5" role="list">
                {links.map((link) => {
                  const isActive =
                    currentPath === link.href ||
                    (link.href !== '/' && currentPath.startsWith(link.href))

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'relative px-4 py-2 rounded-full text-body-sm font-body font-medium',
                          'transition-colors duration-fast',
                          isActive
                            ? 'text-base-100 bg-base-800/60'
                            : 'text-base-100/55 hover:text-base-100 hover:bg-base-800/40',
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Theme toggle + Pill CTA */}
              <div className="ml-3 flex items-center gap-2">
                <ThemeToggle />
                <Link
                  href={ctaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    'px-5 py-2 rounded-full',
                    'text-body-sm font-body font-semibold',
                    'bg-base-100 text-base-950',
                    'hover:bg-brand-300 hover:text-base-950',
                    'active:scale-[0.97]',
                    'transition-all duration-fast',
                    'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2',
                  )}
                >
                  {ctaLabel}
                </Link>
              </div>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 rounded-lg text-base-100/55 hover:text-base-100 hover:bg-base-800/60 transition-colors duration-fast"
            >
              <Menu size={21} aria-hidden="true" />
            </button>

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
