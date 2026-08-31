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
  /** Override the default trust indicators */
  indicators?: IndicatorItem[]
}

type IndicatorItem = {
  icon: React.ComponentType<{ size?: number; 'aria-hidden'?: 'true'; className?: string }>
  label: string
}

const DEFAULT_INDICATORS: IndicatorItem[] = [
  { icon: Globe,  label: 'Global community' },
  { icon: Layers, label: 'Multiple universes' },
  { icon: Heart,  label: 'Community-owned' },
  { icon: Zap,    label: 'Always open' },
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
      className="relative overflow-hidden bg-base-950 py-24 md:py-32"
      aria-label="Call to action"
    >
      {/* ── Background glows ──────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="glow-blob w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500/12" />
        <div className="glow-blob w-[300px] h-[300px] top-0 right-[15%] bg-accent-500/8" />
      </div>

      {/* Top divider */}
      <div aria-hidden="true" className="section-divider absolute top-0 left-0 right-0" />

      {/* ── Subtle dot-grid texture ────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mx-auto text-center"
        >

          {/* ── Trust indicator badge row ──────────────────────── */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            {indicators.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-4 py-1.5 rounded-full',
                  'text-label font-body font-medium',
                  'border border-base-700/80 bg-base-900/60 text-base-100/60',
                  'backdrop-blur-sm',
                )}
              >
                <Icon size={12} aria-hidden="true" className="text-brand-400 shrink-0" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* ── Headline ──────────────────────────────────────────── */}
          <motion.h2
            variants={item}
            className="font-display font-extrabold text-h1 text-base-100 tracking-tight mb-4"
          >
            {headline}
          </motion.h2>

          {/* ── Subtext ───────────────────────────────────────────── */}
          {subtext && (
            <motion.p
              variants={item}
              className="text-body-lg text-base-100/50 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              {subtext}
            </motion.p>
          )}

          {/* ── CTA buttons ───────────────────────────────────────── */}
          <motion.div
            variants={item}
            className={cn(
              'flex flex-col sm:flex-row items-center justify-center gap-3',
              !subtext && 'mt-8',
            )}
          >
            {/* Primary — white pill */}
            <Link
              href={primaryHref}
              className={cn(
                'inline-flex items-center gap-2',
                'px-7 py-3.5 rounded-full',
                'text-body font-body font-semibold',
                'bg-base-100 text-base-950',
                'hover:bg-brand-300 hover:text-base-950',
                'active:scale-[0.97]',
                'transition-all duration-fast',
                'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2',
              )}
            >
              {primaryLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            {/* Secondary — ghost pill */}
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-7 py-3.5 rounded-full',
                  'text-body font-body font-semibold',
                  'border border-base-700 text-base-100/65',
                  'hover:border-base-500 hover:text-base-100 hover:bg-base-800/40',
                  'active:scale-[0.97]',
                  'transition-all duration-fast',
                  'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2',
                )}
              >
                {secondaryLabel}
              </Link>
            )}
          </motion.div>

        </motion.div>
      </Container>
    </section>
  )
}
