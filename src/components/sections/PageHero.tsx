'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { heroStaggerContainer, fadeUp } from '@/variants'

type PageHeroProps = {
  eyebrow?: string
  headline: string
  lead?: string
}

/**
 * Animated page hero used on all inner pages.
 * Entry animation mirrors HeroSection's stagger pattern but is
 * lighter — no glows, just text entrance — to keep inner pages fast.
 */
export function PageHero({ eyebrow, headline, lead }: PageHeroProps) {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? {} : heroStaggerContainer
  const item = prefersReduced ? {} : fadeUp

  return (
    <section
      className="relative pt-28 pb-14 md:pt-36 md:pb-16 border-b border-base-800/60 bg-base-950 overflow-hidden"
      aria-label="Page header"
    >
      {/* ── Ambient glow top-right ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[560px] h-[320px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(108,99,255,0.09) 0%, transparent 70%)',
        }}
      />

      {/* ── Subtle dot grid ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Top accent line ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(108,99,255,0.5) 40%, rgba(255,107,53,0.3) 70%, transparent 100%)',
        }}
      />

      <Container className="relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {eyebrow && (
            <motion.p variants={item} className="eyebrow mb-3">
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            variants={item}
            className="font-display font-bold text-h1 text-base-100 tracking-tight mb-5"
          >
            {headline}
          </motion.h1>

          {lead && (
            <motion.p
              variants={item}
              className="text-body-lg text-base-100/60 leading-relaxed max-w-2xl"
            >
              {lead}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
