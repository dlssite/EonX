'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Compass, Sparkles, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { heroStaggerContainer, fadeUp, fadeIn } from '@/variants'

const disciplineChips = [
  { icon: Compass,  label: 'Original Universes' },
  { icon: Users,    label: 'Community Ecosystem' },
  { icon: Sparkles, label: 'Games · Comics · Software' },
]

export function HeroSection() {
  const prefersReduced = useReducedMotion()

  const container = prefersReduced ? {} : heroStaggerContainer
  const item      = prefersReduced ? {} : fadeUp
  const fade      = prefersReduced ? {} : fadeIn

  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-base-950"
      aria-label="Hero"
    >
      {/* ── Ambient Mesh Lighting ─────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central luminous brand bloom */}
        <div
          className="absolute rounded-full blur-[150px]"
          style={{
            width: '900px',
            height: '600px',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse, rgba(108,99,255,0.24) 0%, rgba(108,99,255,0.05) 50%, transparent 75%)',
          }}
        />
        {/* Accent warm ember glow */}
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            width: '600px',
            height: '450px',
            bottom: '0%',
            right: '-10%',
            background: 'radial-gradient(ellipse, rgba(255,107,53,0.14) 0%, transparent 70%)',
          }}
        />
        {/* Soft cyan-purple counter-balance */}
        <div
          className="absolute rounded-full blur-[130px]"
          style={{
            width: '500px',
            height: '450px',
            bottom: '5%',
            left: '-10%',
            background: 'radial-gradient(ellipse, rgba(81,72,212,0.12) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Precision dot grid texture ───────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── Top hairline accent ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.8) 50%, transparent)',
        }}
      />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 sm:px-6 md:px-10 xl:px-20 pt-28 pb-16 sm:pt-36 sm:pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full max-w-5xl mx-auto text-center"
        >

          {/* ── Eyebrow Pill Row ─────────────────────────────────── */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6 sm:mb-8 md:mb-10"
          >
            {disciplineChips.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className={cn(
                  'inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full',
                  'text-label font-body font-medium',
                  'border border-glass bg-base-900/80 text-base-100/80',
                  'backdrop-blur-md shadow-sm',
                )}
              >
                <Icon size={13} aria-hidden="true" className="shrink-0 text-brand-400" />
                <span>{label}</span>
              </span>
            ))}
          </motion.div>

          {/* ── Main Headline ────────────────────────────────────── */}
          <motion.h1
            variants={item}
            className={cn(
              'font-display font-extrabold text-base-100 mb-6 sm:mb-8',
              'leading-[1.06] tracking-tightest',
              'text-[clamp(2.125rem,6vw,4.5rem)]',
            )}
          >
            Building immersive{' '}
            <span className="gradient-text">
              worlds,
            </span>{' '}
            together.
          </motion.h1>

          {/* ── Lead Paragraph ───────────────────────────────────── */}
          <motion.p
            variants={item}
            className="text-body sm:text-body-lg md:text-[1.25rem] text-base-100/65 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2 sm:px-0"
          >
            Eonrisia is the community-driven organization building living fictional universes —
            and the software, games, comics, and collective tools that bring them to life.
          </motion.p>

          {/* ── Dual Pill CTA Group ──────────────────────────────── */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto"
          >
            <Link
              href="/volunteer"
              className={cn(
                'inline-flex items-center justify-center gap-2.5 w-full sm:w-auto',
                'px-8 sm:px-9 py-3.5 sm:py-4 rounded-full min-h-[48px]',
                'text-body font-body font-semibold text-white',
                'bg-brand-500 hover:bg-brand-400 active:bg-brand-600',
                'shadow-[0_0_32px_0_rgba(108,99,255,0.45)] sheen-sweep',
                'active:scale-[0.97] hover:scale-[1.02]',
                'transition-all duration-fast',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base-950',
              )}
            >
              <span>Get Involved</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            <Link
              href="/projects"
              className={cn(
                'inline-flex items-center justify-center gap-2.5 w-full sm:w-auto',
                'px-8 sm:px-9 py-3.5 sm:py-4 rounded-full min-h-[48px]',
                'text-body font-body font-semibold text-base-100',
                'border border-glass bg-base-900/60 hover:bg-base-800/80 hover:border-glass-hover hover:text-base-100',
                'backdrop-blur-md active:scale-[0.97]',
                'transition-all duration-fast',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base-950',
              )}
            >
              <span>See Our Work</span>
            </Link>
          </motion.div>

          {/* ── Disciplines Marquee Ribbon ────────────────────────── */}
          <motion.div
            variants={item}
            className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-2xl sm:rounded-full border border-glass-subtle bg-base-900/40 backdrop-blur-sm max-w-full"
          >
            <span className="text-label-xs sm:text-label text-base-100/50 font-body tracking-widest uppercase">
              Writers
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-500/50" />
            <span className="text-label-xs sm:text-label text-base-100/50 font-body tracking-widest uppercase">
              Artists
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-500/50" />
            <span className="text-label-xs sm:text-label text-base-100/50 font-body tracking-widest uppercase">
              Developers
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-500/50" />
            <span className="text-label-xs sm:text-label text-base-100/50 font-body tracking-widest uppercase">
              Composers
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-500/50" />
            <span className="text-label-xs sm:text-label text-base-100/50 font-body tracking-widest uppercase">
              Community
            </span>
          </motion.div>

        </motion.div>
      </div>

      {/* ── Scroll Indicator ────────────────────────────────────── */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)',
          }}
        />
        <span className="text-label-xs text-base-100/30 uppercase tracking-[0.25em] font-body">
          Explore
        </span>
      </motion.div>
    </section>
  )
}
