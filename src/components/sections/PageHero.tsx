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
    <section
      className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 border-b border-glass bg-base-950 overflow-hidden"
      aria-label="Page header"
    >
      {/* ── Ambient glow top-right ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[350px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(108,99,255,0.14) 0%, transparent 70%)',
        }}
      />

      {/* ── Precision dot grid ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Top hairline accent line ────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(108,99,255,0.6) 40%, rgba(255,107,53,0.3) 70%, transparent 100%)',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {eyebrow && (
            <motion.p variants={item} className="eyebrow mb-2 sm:mb-3.5">
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            variants={item}
            className="font-display font-extrabold text-h2 sm:text-h1 md:text-[3.5rem] text-base-100 tracking-tight leading-[1.06] mb-4 sm:mb-6"
          >
            {headline}
          </motion.h1>

          {lead && (
            <motion.p
              variants={item}
              className="text-body sm:text-body-lg text-base-100/65 leading-relaxed max-w-2xl"
            >
              {lead}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
