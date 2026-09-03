'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

type StickyBottomBarProps = {
  label?: string
  href?: string
  sublabel?: string
}

export function StickyBottomBar({
  label = 'Apply for an Opening',
  href = '#opportunities',
  sublabel = 'Open contributor roles',
}: StickyBottomBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight

      if (scrollY > 280 && scrollY + winHeight < docHeight - 350) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-sticky block md:hidden p-3 pb-safe bg-base-950/90 backdrop-blur-xl border-t border-glass shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 text-label-xs font-mono font-semibold uppercase tracking-wider text-brand-400">
                <Sparkles size={11} aria-hidden="true" />
                <span>Join Eonrisia</span>
              </div>
              <p className="text-body-sm text-base-100/70 truncate font-medium">
                {sublabel}
              </p>
            </div>

            <Link
              href={href}
              className={cn(
                'inline-flex items-center justify-center gap-1.5 shrink-0 min-h-[44px]',
                'px-5 py-2.5 rounded-full',
                'text-body-sm font-body font-semibold text-white',
                'bg-brand-500 hover:bg-brand-400 active:scale-[0.97]',
                'shadow-[0_0_20px_0_rgba(108,99,255,0.4)] sheen-sweep',
                'transition-all duration-fast',
              )}
            >
              <span>{label}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
