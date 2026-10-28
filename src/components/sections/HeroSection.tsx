'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const disciplines = ['Writing', 'Art', 'Technology', 'Community']

export function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="atlas-hero relative overflow-hidden" aria-labelledby="home-heading">
      <Container className="relative z-10 grid min-h-[min(880px,100svh)] items-center gap-12 py-32 sm:py-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p className="atlas-kicker mb-6">
            <span className="atlas-kicker__mark" aria-hidden="true" />
            Independent creative organization · Community-built
          </p>
          <h1
            id="home-heading"
            className="max-w-3xl font-display text-[clamp(3.75rem,8vw,7.75rem)] font-medium leading-[0.88] tracking-[-0.065em] text-base-100"
          >
            Big worlds.
            <br />
            <span className="atlas-hero__italic">Many hands.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-base-100/70 sm:text-lg">
            Eonrisia brings writers, artists, developers, and communities together to create
            original fictional universes—and the tools, games, and stories that let people shape
            them.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/volunteer" className="atlas-button atlas-button--primary">
              Join the collective
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/projects" className="atlas-button atlas-button--secondary">
              Explore our work
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-glass pt-5">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-base-100/45">
              Made across
            </span>
            {disciplines.map((discipline) => (
              <span key={discipline} className="atlas-discipline">
                {discipline}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="atlas-poster"
          role="img"
          aria-label="An abstract map connecting stories, tools, and the people who make them"
        >
          <div className="atlas-poster__header">
            <span>Field notes</span>
            <span>001 — Eonrisia</span>
          </div>
          <div className="atlas-poster__art" aria-hidden="true">
            <svg viewBox="0 0 640 420" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="atlas-poster__route" d="M92 310C165 265 198 124 302 173s131 153 240 65" />
              <path className="atlas-poster__route atlas-poster__route--secondary" d="M118 105c95 67 156 203 261 177s107-117 169-164" />
              <circle cx="92" cy="310" r="13" className="atlas-poster__node atlas-poster__node--coral" />
              <circle cx="118" cy="105" r="9" className="atlas-poster__node atlas-poster__node--lime" />
              <circle cx="302" cy="173" r="18" className="atlas-poster__node atlas-poster__node--lime" />
              <circle cx="379" cy="282" r="11" className="atlas-poster__node atlas-poster__node--coral" />
              <circle cx="542" cy="238" r="14" className="atlas-poster__node atlas-poster__node--lime" />
              <circle cx="548" cy="118" r="8" className="atlas-poster__node atlas-poster__node--coral" />
              <path d="M303 74v44m-22-22h44" className="atlas-poster__cross" />
              <path d="M444 345v28m-14-14h28" className="atlas-poster__cross atlas-poster__cross--small" />
            </svg>
            <span className="atlas-poster__annotation atlas-poster__annotation--one">Ideas</span>
            <span className="atlas-poster__annotation atlas-poster__annotation--two">People</span>
            <span className="atlas-poster__annotation atlas-poster__annotation--three">Worlds</span>
          </div>
          <div className="atlas-poster__caption">
            <p>One shared universe.<br /><em>Endless ways in.</em></p>
            <span>Story / Software / Community</span>
          </div>
        </motion.div>
      </Container>
      <div className="atlas-hero__index" aria-hidden="true">01</div>
    </section>
  )
}
