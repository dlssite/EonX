'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { backdropVariant, drawerSlide, bottomSheetSlide } from '@/variants'
import { cn } from '@/lib/utils'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

const maxWidthMap = {
  sm: 'md:max-w-md',
  md: 'md:max-w-lg',
  lg: 'md:max-w-2xl',
  xl: 'md:max-w-3xl',
}

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  maxWidth = 'md',
}: DrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Track viewport width for responsive animation variant
  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Escape key handler and body scroll lock
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 50)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, onClose])

  const activeVariant = isMobile ? bottomSheetSlide : drawerSlide

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-modal flex flex-col justify-end md:flex-row md:justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-base-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Adaptive Panel: Bottom Sheet on Mobile / Slide-Over on Desktop */}
          <motion.div
            ref={drawerRef}
            variants={activeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'relative z-10 w-full bg-base-900 shadow-2xl flex flex-col overflow-hidden',
              'rounded-t-3xl border-t border-glass max-h-[90vh] pb-safe',
              'md:rounded-none md:border-t-0 md:border-l md:max-h-none md:h-full md:pb-0',
              'noise-overlay',
              maxWidthMap[maxWidth],
              className,
            )}
          >
            {/* Mobile Drag Indicator Pill */}
            <div
              aria-hidden="true"
              className="w-12 h-1.5 rounded-full bg-base-700/70 mx-auto mt-3 mb-1 shrink-0 md:hidden"
            />

            {/* Drawer Header */}
            <div className="flex items-start justify-between px-5 py-4 sm:px-6 sm:py-5 md:p-8 border-b border-glass bg-base-950/40 shrink-0">
              <div className="pr-4">
                <h2 className="font-display font-bold text-h4 sm:text-h3 text-base-100 tracking-tight">
                  {title}
                </h2>
                {description && (
                  <p className="text-body-sm text-base-100/60 mt-1 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close drawer"
                className="shrink-0 p-2.5 rounded-full text-base-100/60 hover:text-base-100 hover:bg-base-800 transition-colors focus-visible:outline-brand-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:p-6 md:p-8 space-y-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
