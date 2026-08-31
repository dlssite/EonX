'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { staggerContainer, fadeUp } from '@/variants'

const pillars = [
  {
    number: '01',
    title: 'Build Together',
    description:
      'We create original fictional universes through coordinated community effort — not one vision handed down from above.',
    accent: 'from-brand-500/20 to-brand-600/0',
  },
  {
    number: '02',
    title: 'Grow the Community',
    description:
      'Every contributor shapes the ecosystem. We recruit, support, and reward the people who build alongside us.',
    accent: 'from-accent-500/15 to-accent-600/0',
  },
  {
    number: '03',
    title: 'Create Universes',
    description:
      'Our work spans games, books, comics, software, and music — all rooted in original worlds that grow over time.',
    accent: 'from-brand-400/20 to-brand-500/0',
  },
]

export function MissionSnapshot() {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? {} : staggerContainer
  const item = prefersReduced ? {} : fadeUp

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="mission-heading"
    >
      {/* Section divider top */}
      <div aria-hidden="true" className="section-divider absolute top-0 left-0 right-0" />

      {/* Subtle ambient backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-base-900/30 pointer-events-none"
      />

      <Container className="relative z-10">

        {/* Section header */}
        <motion.div
          variants={prefersReduced ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 md:mb-20"
        >
          <p className="eyebrow mb-3">What We Do</p>
          <h2
            id="mission-heading"
            className="font-display font-extrabold text-h1 text-base-100 tracking-tight max-w-lg"
          >
            One organization.{' '}
            <span className="gradient-text">Three layers.</span>
          </h2>
        </motion.div>

        {/* Pillar cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={item}
              className={cn(
                'group relative flex flex-col p-8 rounded-3xl overflow-hidden',
                'border border-base-800 bg-base-900',
                'hover:border-base-700 transition-all duration-normal',
                'hover:-translate-y-1 hover:shadow-card-hover',
                // Stagger the card heights slightly for visual rhythm
                i === 1 && 'md:mt-6',
              )}
            >
              {/* Per-card accent gradient in top-left corner */}
              <div
                aria-hidden="true"
                className={cn(
                  'absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl pointer-events-none',
                  'bg-gradient-radial opacity-0 group-hover:opacity-100 transition-opacity duration-slow',
                  pillar.accent,
                )}
              />

              {/* Large ghost number */}
              <span
                aria-hidden="true"
                className={cn(
                  'font-display font-extrabold select-none pointer-events-none',
                  'text-[5.5rem] leading-none mb-4',
                  'text-base-800 group-hover:text-base-700 transition-colors duration-normal',
                )}
              >
                {pillar.number}
              </span>

              {/* Content */}
              <div className="relative mt-auto">
                <h3 className="font-display font-bold text-h3 text-base-100 mb-3 group-hover:text-brand-300 transition-colors duration-fast">
                  {pillar.title}
                </h3>
                <p className="text-body-sm text-base-100/55 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom accent line that grows on hover */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-brand-500/0 via-brand-500/50 to-brand-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-normal"
              />
            </motion.div>
          ))}
        </motion.div>

      </Container>

      {/* Section divider bottom */}
      <div aria-hidden="true" className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
