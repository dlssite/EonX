'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
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
    value: 1,
    label: 'Community first',
    sublabel: 'The people who build the ecosystem come first.',
  },
  {
    value: 2,
    label: 'Transparency',
    sublabel: 'Decisions, resources, and accountability stay visible.',
  },
  {
    value: 3,
    label: 'Quality over speed',
    sublabel: 'We release work when it is ready.',
  },
  {
    value: 4,
    label: 'Shared ownership',
    sublabel: 'We build with open tools and community trust.',
  },
]

type StatsRowProps = {
  stats?: StatItem[]
  eyebrow?: string
  headline?: string
}

export function StatsRow({
  stats = defaultStats,
  eyebrow = 'What Guides Us',
  headline = 'Principles for work that belongs to everyone.',
}: StatsRowProps) {
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="relative border-y border-glass bg-base-950 py-16 sm:py-20 md:py-24"
      aria-label="Organization principles"
    >
      <Container>
        <motion.div
          variants={prefersReduced ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-10 max-w-3xl sm:mb-14"
        >
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="font-display text-h3 font-semibold tracking-tight text-base-100 sm:text-h2">
            {headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 border-t border-glass sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={prefersReduced ? {} : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08 }}
              className="border-b border-glass py-5 sm:border-r sm:px-6 sm:py-7 lg:border-b-0"
            >
              <div className="mb-6 font-mono text-label tracking-widest text-brand-300">
                {stat.prefix}{String(stat.value).padStart(2, '0')}{stat.suffix}
              </div>
              <div>
                <h3 className="mb-1 font-display text-body font-semibold text-base-100">
                  {stat.label}
                </h3>
                {stat.sublabel && (
                  <p className="text-body-sm leading-relaxed text-base-100/60">
                    {stat.sublabel}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  )
}
