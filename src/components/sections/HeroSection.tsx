'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles, Users, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { heroStaggerContainer, fadeUp, fadeIn } from '@/variants'

const chips = [
  { icon: Globe,    label: 'Original universes' },
  { icon: Users,    label: 'Community-driven' },
  { icon: Sparkles, label: 'Games · Comics · Music' },
]

export function HeroSection() {
  const prefersReduced = useReducedMotion()

  const container = prefersReduced ? {} : heroStaggerContainer
  const item      = prefersReduced ? {} : fadeUp
  const fade      = prefersReduced ? {} : fadeIn

  return (
    <section
      className="relative min-h-[100svh] flex flex-col overflow-hidden bg-base-950"
      aria-label="Hero"
    >
      {/* ── Ambient glows — strong enough to actually show ──────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Large brand glow centred above text */}
        <div
          className="absolute rounded-full blur-[140px]"
          style={{
            width: '800px',
            height: '600px',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse, rgba(108,99,255,0.22) 0%, transparent 70%)',
          }}
        />
        {/* Accent glow bottom-right */}
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: '500px',
            height: '400px',
            bottom: '5%',
            right: '-5%',
            background: 'radial-gradient(ellipse, rgba(255,107,53,0.14) 0%, transparent 70%)',
          }}
        />
        {/* Brand glow bottom-left */}
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: '400px',
            height: '400px',
            bottom: '10%',
            left: '-5%',
            background: 'radial-gradient(ellipse, rgba(108,99,255,0.10) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Dot grid texture ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Top accent line ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.7) 50%, transparent)',
        }}
      />

      {/* ── Content — fills the viewport, centred ───────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 md:px-10 xl:px-20 pt-24 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full max-w-6xl mx-auto text-center"
        >

          {/* ── Chip row ──────────────────────────────────────────── */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            {chips.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-4 py-1.5 rounded-full',
                  'text-label font-body font-medium',
                  'border border-brand-500/30 bg-brand-500/8 text-brand-300',
                  'backdrop-blur-sm',
                )}
              >
                <Icon size={13} aria-hidden="true" className="shrink-0" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* ── Main headline ─────────────────────────────────────── */}
          <motion.h1
            variants={item}
            className={cn(
              'font-display font-extrabold text-base-50 mb-7',
              'leading-[1.08] tracking-tighter',
              // Fits comfortably on 2 lines: ~2.2rem mobile → ~3.75rem desktop
              'text-[clamp(2.2rem,4.5vw,3.75rem)]',
            )}
          >
            Building immersive{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #A9A4FF 0%, #FF8A5C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              worlds,
            </span>{' '}
            together.
          </motion.h1>

          {/* ── Lead copy ─────────────────────────────────────────── */}
          <motion.p
            variants={item}
            className="text-body-lg text-base-100/60 max-w-2xl mx-auto mb-11 leading-relaxed"
          >
            Eonrisia is the organization behind community-driven fictional universes —
            and the games, comics, software, and infrastructure that brings them to life.
          </motion.p>

          {/* ── CTA row ───────────────────────────────────────────── */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          >
            {/* Primary — brand pill */}
            <Link
              href="/volunteer"
              className={cn(
                'inline-flex items-center gap-2',
                'px-8 py-4 rounded-full',
                'text-body font-body font-semibold text-white',
                'bg-brand-500 hover:bg-brand-400',
                'active:scale-[0.97] hover:scale-[1.02]',
                'transition-all duration-fast',
                'shadow-[0_0_32px_0_rgba(108,99,255,0.45)]',
                'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2',
              )}
            >
              Get Involved
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            {/* Secondary — outlined ghost pill */}
            <Link
              href="/projects"
              className={cn(
                'inline-flex items-center gap-2',
                'px-8 py-4 rounded-full',
                'text-body font-body font-semibold',
                'border border-base-600 text-base-100/75',
                'hover:border-base-400 hover:text-base-100 hover:bg-base-800/50',
                'active:scale-[0.97]',
                'transition-all duration-fast',
                'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2',
              )}
            >
              See Our Work
            </Link>
          </motion.div>

          {/* ── Disciplines line ──────────────────────────────────── */}
          <motion.p
            variants={item}
            className="text-label text-base-100/25 font-body tracking-widest uppercase"
          >
            Writers &nbsp;·&nbsp; Artists &nbsp;·&nbsp; Developers &nbsp;·&nbsp; Composers &nbsp;·&nbsp; Community builders
          </motion.p>

        </motion.div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────── */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <div
          className="w-px h-12"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)',
          }}
        />
        <span className="text-label-xs text-base-100/20 uppercase tracking-[0.2em] font-body">
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
