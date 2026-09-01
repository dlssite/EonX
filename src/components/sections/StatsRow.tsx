'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { fadeUp } from '@/variants'

export type StatItem = {
  value: number
  prefix?: string
  suffix?: string
  label: string
  sublabel?: string
}

const defaultStats: StatItem[] = [
  {
    value: 50,
    suffix: '+',
    label: 'Global Contributors',
    sublabel: 'Writers, artists & developers',
  },
  {
    value: 3,
    suffix: '',
    label: 'Core Disciplines',
    sublabel: 'Narrative, code & illustration',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Open & Transparent',
    sublabel: 'Community-owned ecosystems',
  },
  {
    value: 1,
    suffix: '',
    label: 'Flagship Universe',
    sublabel: 'Sanctyria & expanding worlds',
  },
]

type StatsRowProps = {
  stats?: StatItem[]
  eyebrow?: string
  headline?: string
}

export function StatsRow({
  stats = defaultStats,
  eyebrow = 'By The Numbers',
  headline = 'Scale built on genuine collective participation.',
}: StatsRowProps) {
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="relative py-24 md:py-32 bg-base-950 border-y border-glass overflow-hidden"
      aria-label="Organization statistics"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] pointer-events-none rounded-full blur-[140px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse, rgba(108,99,255,0.22) 0%, transparent 70%)',
        }}
      />

      <Container className="relative z-10">

        {/* Section Header */}
        <motion.div
          variants={prefersReduced ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="font-display font-extrabold text-h2 text-base-100 tracking-tight">
            {headline}
          </h2>
        </motion.div>

        {/* ── Stats Grid ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={prefersReduced ? {} : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08 }}
              className="p-8 rounded-3xl border border-glass bg-base-900/60 backdrop-blur-md relative overflow-hidden group hover:border-glass-hover transition-all duration-normal"
            >
              {/* Top hairline specular accent */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-base-700/60 to-transparent"
              />

              {/* Number */}
              <div className="font-display font-extrabold text-[3.25rem] md:text-[3.75rem] leading-none mb-3 text-base-100 group-hover:text-brand-300 transition-colors duration-fast">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={1.6}
                />
              </div>

              {/* Label */}
              <h3 className="font-display font-bold text-body text-base-100 mb-1">
                {stat.label}
              </h3>

              {/* Sublabel */}
              {stat.sublabel && (
                <p className="text-body-sm text-base-100/50 leading-relaxed">
                  {stat.sublabel}
                </p>
              )}
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  )
}
