'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Shield, Users, ArrowRight, Layers, Compass } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { fadeUp, tabContentVariant } from '@/variants'

const ecosystemLayers = [
  {
    id: 'org',
    number: '01',
    name: 'Organization',
    subtitle: 'The Foundation & Governance',
    description:
      'Eonrisia operates as the central non-profit steward. We direct resources, organize legal and community governance, build developer tooling, recruit volunteers, and protect the integrity of the creative commons.',
    icon: Shield,
    accentGlow: 'rgba(108,99,255,0.18)',
    badge: 'Stewardship',
    responsibilities: [
      'Resource management & transparent allocation',
      'Open-source software & infrastructure development',
      'Community governance & contributor token economy',
      'Brand stewardship & external partnerships',
    ],
    ctaText: 'Learn About Governance',
    ctaHref: '/governance',
  },
  {
    id: 'universe',
    number: '02',
    name: 'Universe',
    subtitle: 'Living Worlds & Creative IP',
    description:
      'The creative universes we build together — starting with Sanctyria. Fictional lore, original game engines, interactive web apps, comic series, and orchestral scores all root in deep, community-owned narrative worlds.',
    icon: Compass,
    accentGlow: 'rgba(255,107,53,0.18)',
    badge: 'Flagship IP',
    responsibilities: [
      'Original fictional lore & narrative continuity',
      'Cross-media games, comics, and musical compositions',
      'Independent project sites & dedicated fan portals',
      'Community creative toolkits & world-building wikis',
    ],
    ctaText: 'Explore Projects',
    ctaHref: '/projects',
  },
  {
    id: 'community',
    number: '03',
    name: 'Community',
    subtitle: 'The Creators & Contributors',
    description:
      'The lifeblood of the entire ecosystem. Writers, digital artists, software engineers, composers, and moderators collaborate across disciplines, earning recognition and rewards for shaping worlds.',
    icon: Users,
    accentGlow: 'rgba(52,211,153,0.18)',
    badge: 'Collective Power',
    responsibilities: [
      'Global remote volunteer collaboration',
      'Peer mentorship & creative skill-building',
      'Transparent contributor token distribution',
      'Community-led events, game jams, and workshops',
    ],
    ctaText: 'Join the Community',
    ctaHref: '/volunteer',
  },
]

export function MissionSnapshot() {
  const [activeTab, setActiveTab] = useState(0)
  const prefersReduced = useReducedMotion()
  const activeLayer = ecosystemLayers[activeTab]

  return (
    <section
      className="relative py-16 sm:py-24 md:py-36 overflow-hidden bg-base-950"
      aria-labelledby="mission-heading"
    >
      {/* Top divider */}
      <div aria-hidden="true" className="section-divider absolute top-0 left-0 right-0" />

      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none rounded-full blur-[160px] opacity-25"
        style={{ background: activeLayer.accentGlow }}
      />

      <Container className="relative z-10">

        {/* Section Header */}
        <motion.div
          variants={prefersReduced ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16 md:mb-20"
        >
          <div>
            <p className="eyebrow mb-2 sm:mb-3.5">Ecosystem Architecture</p>
            <h2
              id="mission-heading"
              className="font-display font-extrabold text-h2 sm:text-h1 text-base-100 tracking-tight"
            >
              Three connected layers.{' '}
              <span className="gradient-text">One living mission.</span>
            </h2>
          </div>
          <p className="text-body-sm sm:text-body text-base-100/60 max-w-md leading-relaxed">
            Eonrisia separates organizational stewardship from creative worlds, ensuring both thrive sustainably without compromising either.
          </p>
        </motion.div>

        {/* ── Interactive 3-Layer Tab Switcher ─────────────────── */}
        <div className="flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-full bg-base-900/80 border border-glass backdrop-blur-md max-w-xl mx-auto mb-8 sm:mb-12 shadow-md">
          {ecosystemLayers.map((layer, index) => {
            const isSelected = activeTab === index
            return (
              <button
                key={layer.id}
                onClick={() => setActiveTab(index)}
                aria-selected={isSelected}
                role="tab"
                className={cn(
                  'relative flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-full text-label sm:text-body-sm font-body font-medium transition-all duration-fast text-center select-none min-h-[44px]',
                  isSelected
                    ? 'text-base-100 font-semibold'
                    : 'text-base-100/60 hover:text-base-100 hover:bg-base-800/40',
                )}
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                  <span className="text-label-xs font-mono opacity-60">{layer.number}</span>
                  <span className="truncate">{layer.name}</span>
                </span>
                {isSelected && (
                  <motion.div
                    layoutId="activeEcosystemLayer"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-base-800/80 border border-glass-subtle rounded-full z-0 pointer-events-none"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* ── Interactive Layer Stage ───────────────────────────── */}
        <div className="glass-panel p-5 sm:p-8 md:p-14 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.id}
              variants={prefersReduced ? {} : tabContentVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Left Column: Headline, Subtitle, Description */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="px-3.5 py-1 rounded-full text-label font-body font-semibold uppercase tracking-widest bg-brand-500/10 text-brand-400 dark:text-brand-300 border border-brand-500/30">
                    Layer {activeLayer.number} · {activeLayer.badge}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-h3 sm:text-h2 text-base-100 tracking-tight mb-2 sm:mb-3">
                  {activeLayer.name}
                </h3>
                <p className="text-body sm:text-body-lg text-brand-400 font-medium mb-4 sm:mb-6">
                  {activeLayer.subtitle}
                </p>
                <p className="text-body-sm sm:text-body text-base-100/70 leading-relaxed mb-6 sm:mb-8 max-w-xl">
                  {activeLayer.description}
                </p>

                <Link
                  href={activeLayer.ctaHref}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-fit px-6 py-3.5 sm:py-3 rounded-full text-body-sm font-body font-semibold text-white bg-brand-500 hover:bg-brand-400 active:scale-[0.97] transition-all duration-fast shadow-[0_0_24px_0_rgba(108,99,255,0.35)] sheen-sweep min-h-[44px]"
                >
                  <span>{activeLayer.ctaText}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>

              {/* Right Column: Key Focus Areas Glass Box */}
              <div className="lg:col-span-5 p-5 sm:p-7 md:p-8 rounded-2xl border border-glass bg-base-950/60 backdrop-blur-md">
                <div className="flex items-center gap-2.5 mb-5 pb-3 sm:mb-6 sm:pb-4 border-b border-glass">
                  <Layers size={18} className="text-brand-400 shrink-0" aria-hidden="true" />
                  <h4 className="font-display font-bold text-body-lg sm:text-h4 text-base-100">
                    Key Operations & Outputs
                  </h4>
                </div>

                <ul className="space-y-3 sm:space-y-4" role="list">
                  {activeLayer.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-body-sm text-base-100/75 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0 shadow-[0_0_6px_0_rgba(108,99,255,0.8)]" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </Container>

      {/* Bottom divider */}
      <div aria-hidden="true" className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
