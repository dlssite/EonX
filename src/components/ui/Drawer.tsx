'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { backdropVariant, drawerSlide } from '@/variants'
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
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-3xl',
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-modal flex justify-end" role="dialog" aria-modal="true" aria-label={title}>
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

          {/* Slide-over panel */}
          <motion.div
            ref={drawerRef}
            variants={drawerSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'relative z-10 w-full h-full bg-base-900 border-l border-glass shadow-2xl flex flex-col overflow-hidden',
              'noise-overlay',
              maxWidthMap[maxWidth],
              className,
            )}
          >
            {/* Drawer Header */}
            <div className="flex items-start justify-between p-6 sm:p-8 border-b border-glass bg-base-950/40">
              <div className="pr-4">
                <h2 className="font-display font-bold text-h3 text-base-100 tracking-tight">
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
                className="shrink-0 p-2 rounded-full text-base-100/60 hover:text-base-100 hover:bg-base-800 transition-colors focus-visible:outline-brand-500"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
