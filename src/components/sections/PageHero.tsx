'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { heroStaggerContainer, fadeUp } from '@/variants'

type PageHeroProps = {
  eyebrow?: string
  headline: string
  lead?: string
}

export function PageHero({ eyebrow, headline, lead }: PageHeroProps) {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? {} : heroStaggerContainer
  const item = prefersReduced ? {} : fadeUp

  return (
    <section className="page-hero relative overflow-hidden border-b border-glass" aria-label="Page header">
      <Container className="relative z-10 py-32 sm:py-36 md:py-40">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="page-hero__content max-w-5xl border-l-2 border-accent-400 pl-6 sm:pl-8"
        >
          {eyebrow && (
            <motion.p variants={item} className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-400" aria-hidden="true" />
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            variants={item}
            className="font-display text-[clamp(2.75rem,6.6vw,6rem)] font-extrabold leading-[0.98] tracking-tight text-base-100"
          >
            {headline}
          </motion.h1>
          {lead && (
            <motion.p
              variants={item}
              className="mt-7 max-w-2xl text-base leading-8 text-base-100/65 sm:text-lg"
            >
              {lead}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
