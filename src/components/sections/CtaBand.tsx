'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Layers, Heart, Zap, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { staggerContainer, fadeUp } from '@/variants'

type CtaBandProps = {
  headline: string
  subtext?: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
  indicators?: IndicatorItem[]
}

type IndicatorItem = {
  icon: React.ComponentType<{ size?: number; 'aria-hidden'?: 'true'; className?: string }>
  label: string
}

const DEFAULT_INDICATORS: IndicatorItem[] = [
  { icon: Globe,  label: 'Independent' },
  { icon: Layers, label: 'Open tools' },
  { icon: Heart,  label: 'Community first' },
  { icon: Zap,    label: 'Transparent' },
]

export function CtaBand({
  headline,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  indicators = DEFAULT_INDICATORS,
}: CtaBandProps) {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? {} : staggerContainer
  const item = prefersReduced ? {} : fadeUp

  return (
    <section
      className="relative overflow-hidden bg-base-950 py-16 sm:py-24 md:py-28"
      aria-label="Call to action"
    >
      <Container className="relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-6xl rounded-3xl border border-glass bg-base-900/70 p-6 text-left shadow-lg sm:p-10 md:p-14"
        >
          <motion.div
            variants={item}
            className="mb-8 flex flex-wrap items-center gap-2 sm:gap-2.5"
          >
            {indicators.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-3 py-1.5 rounded-full',
                  'text-label font-body font-medium',
                  'border border-glass bg-base-950/60 text-base-100/70',
                )}
              >
                <Icon size={12} aria-hidden="true" className="text-brand-400 shrink-0" />
                <span>{label}</span>
              </span>
            ))}
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <motion.p variants={item} className="eyebrow mb-3">
                Make something that lasts
              </motion.p>
              <motion.h2
                variants={item}
                className="max-w-3xl font-display text-h2 font-extrabold leading-tight tracking-tight text-base-100 sm:text-h1"
              >
                {headline}
              </motion.h2>
            </div>
            <div>
              {subtext && (
                <motion.p
                  variants={item}
                  className="mb-7 text-body-sm leading-relaxed text-base-100/65 sm:text-body"
                >
                  {subtext}
                </motion.p>
              )}
              <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={primaryHref}
                  className={cn(
                    'inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full px-6 py-3 sm:w-auto',
                    'text-body font-body font-semibold text-white',
                    'bg-brand-500 hover:bg-brand-400 active:bg-brand-600',
                    'transition-colors duration-fast',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base-950',
                  )}
                >
                  <span>{primaryLabel}</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>

                {secondaryLabel && secondaryHref && (
                  <Link
                    href={secondaryHref}
                    className={cn(
                      'inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full border border-glass bg-base-900/60 px-6 py-3 sm:w-auto',
                      'text-body font-body font-semibold text-base-100',
                      'hover:border-brand-500/50 hover:bg-base-800/80 hover:text-white',
                      'transition-colors duration-fast',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base-950',
                    )}
                  >
                    {secondaryLabel}
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
