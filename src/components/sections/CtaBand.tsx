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
  { icon: Globe,  label: 'Global Community' },
  { icon: Layers, label: 'Living Universes' },
  { icon: Heart,  label: 'Community-Owned' },
  { icon: Zap,    label: 'Open Standards' },
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
      className="relative overflow-hidden bg-base-950 py-28 md:py-36 border-t border-white/[0.08]"
      aria-label="Call to action"
    >
      {/* ── Background glows ──────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full blur-[140px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-25"
          style={{
            background: 'radial-gradient(ellipse, rgba(108,99,255,0.3) 0%, rgba(255,107,53,0.12) 50%, transparent 75%)',
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-4xl mx-auto text-center"
        >

          {/* ── Trust indicator badge row ──────────────────────── */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-2.5 mb-10"
          >
            {indicators.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-4 py-1.5 rounded-full',
                  'text-label font-body font-medium',
                  'border border-white/[0.08] bg-base-900/80 text-base-100/70',
                  'backdrop-blur-md shadow-sm',
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
            className="font-display font-extrabold text-h1 md:text-[3.25rem] text-base-100 tracking-tight leading-[1.08] mb-6"
          >
            {headline}
          </motion.h2>

          {/* ── Subtext ───────────────────────────────────────────── */}
          {subtext && (
            <motion.p
              variants={item}
              className="text-body-lg text-base-100/65 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {subtext}
            </motion.p>
          )}

          {/* ── CTA buttons ───────────────────────────────────────── */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={primaryHref}
              className={cn(
                'inline-flex items-center justify-center gap-2.5',
                'px-9 py-4 rounded-full',
                'text-body font-body font-semibold text-white',
                'bg-brand-500 hover:bg-brand-400 active:bg-brand-600',
                'shadow-[0_0_32px_0_rgba(108,99,255,0.45)] sheen-sweep',
                'active:scale-[0.97] hover:scale-[1.02]',
                'transition-all duration-fast',
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
                  'inline-flex items-center justify-center gap-2.5',
                  'px-9 py-4 rounded-full',
                  'text-body font-body font-semibold text-base-100',
                  'border border-white/15 bg-base-900/60 hover:bg-base-800/80 hover:border-brand-500/50 hover:text-white',
                  'backdrop-blur-md active:scale-[0.97]',
                  'transition-all duration-fast',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base-950',
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
