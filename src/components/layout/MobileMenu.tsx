'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { slideInRight, backdropVariant } from '@/variants'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

type NavLink = {
  label: string
  href: string
  isExternal?: boolean
}

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
  ctaLabel: string
  ctaHref: string
}

export function MobileMenu({ isOpen, onClose, links, ctaLabel, ctaHref }: MobileMenuProps) {
  const pathname = usePathname()
  const slideVariants = useReducedMotion(slideInRight)
  const fadeVariants = useReducedMotion(backdropVariant)

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-base-950/80 backdrop-blur-sm z-overlay"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-[min(340px,90vw)] bg-base-900 border-l border-glass z-modal flex flex-col pt-safe pb-safe shadow-2xl"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-glass shrink-0">
              <Link
                href="/"
                onClick={onClose}
                className="font-display font-extrabold text-[1.15rem] tracking-tight text-base-100"
              >
                Eonrisia
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-base-100/60 hover:text-base-100 hover:bg-base-800 transition-colors duration-fast"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Nav links */}
            <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-6">
              <p className="px-4 text-label-xs font-mono font-semibold uppercase tracking-widest text-base-100/40 mb-3">
                Navigation
              </p>
              <ul className="flex flex-col gap-1.5" role="list">
                {links.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== '/' && pathname.startsWith(link.href))

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between px-4 py-3.5 rounded-2xl min-h-[48px]',
                          'text-body font-body font-medium transition-all duration-fast',
                          isActive
                            ? 'bg-base-800 text-brand-400 font-semibold border border-glass'
                            : 'text-base-100/70 hover:text-base-100 hover:bg-base-800/60',
                        )}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_8px_0_rgba(108,99,255,0.8)]" />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Quick Governance Link */}
              <div className="mt-6 pt-6 border-t border-glass px-2">
                <Link
                  href="/governance"
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-body-sm text-base-100/50 hover:text-base-100 hover:bg-base-800/40 transition-colors"
                >
                  <Shield size={15} className="text-brand-400" />
                  <span>Constitution & Governance</span>
                </Link>
              </div>
            </nav>

            {/* Pill CTA and Footer */}
            <div className="px-5 py-5 border-t border-glass shrink-0 bg-base-950/40">
              <Link
                href={ctaHref}
                onClick={onClose}
                className={cn(
                  'flex items-center justify-center gap-2 w-full min-h-[48px]',
                  'px-6 py-3.5 rounded-full',
                  'text-body font-body font-semibold',
                  'bg-brand-500 text-white',
                  'hover:bg-brand-400',
                  'active:scale-[0.97]',
                  'transition-all duration-fast shadow-[0_0_24px_0_rgba(108,99,255,0.35)] sheen-sweep',
                  'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2',
                )}
              >
                <span>{ctaLabel}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
