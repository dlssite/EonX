'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
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
            className="fixed inset-0 bg-base-950/75 backdrop-blur-sm z-overlay"
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
            className="fixed top-0 right-0 h-full w-[min(320px,88vw)] bg-base-900 border-l border-glass z-modal flex flex-col"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-glass">
              <span className="font-display font-extrabold text-[1.125rem] tracking-tight text-base-100">
                Eonrisia
              </span>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-full text-base-100/50 hover:text-base-100 hover:bg-base-800 transition-colors duration-fast"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Nav links */}
            <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="flex flex-col gap-1" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'block px-4 py-3 rounded-xl',
                        'text-body font-body font-medium',
                        'text-base-100/65 hover:text-base-100 hover:bg-base-800/60',
                        'transition-colors duration-fast',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Pill CTA */}
            <div className="px-6 py-6 border-t border-glass">
              <Link
                href={ctaHref}
                onClick={onClose}
                className={cn(
                  'flex items-center justify-center w-full',
                  'px-6 py-3 rounded-full',
                  'text-body font-body font-semibold',
                  'bg-brand-500 text-white',
                  'hover:bg-brand-400',
                  'active:scale-[0.97]',
                  'transition-all duration-fast',
                  'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2',
                )}
              >
                {ctaLabel}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
