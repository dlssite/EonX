'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn, payloadImageUrl } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { staggerContainer, fadeUp } from '@/variants'

type Project = {
  id: string
  name: unknown
  slug: unknown
  tagline: unknown
  coverImage: unknown
  status: unknown
}

export type { Project }

type ProjectsTeaserProps = {
  projects: Project[]
}

const statusVariant: Record<string, 'brand' | 'success' | 'warning' | 'default'> = {
  active:    'success',
  upcoming:  'warning',
  completed: 'default',
}

export function ProjectsTeaser({ projects }: ProjectsTeaserProps) {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? {} : staggerContainer
  const item = prefersReduced ? {} : fadeUp

  if (!projects.length) return null

  return (
    <section className="py-24 md:py-32" aria-labelledby="projects-heading">
      <Container>

        {/* Section header */}
        <motion.div
          variants={prefersReduced ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <p className="eyebrow mb-3">What We&apos;re Building</p>
            <h2
              id="projects-heading"
              className="font-display font-extrabold text-h1 text-base-100 tracking-tight"
            >
              From universe{' '}
              <span className="gradient-text">to experience.</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className={cn(
              'hidden sm:inline-flex items-center gap-1.5 shrink-0',
              'text-body-sm font-body font-medium',
              'text-base-100/40 hover:text-brand-300',
              'transition-colors duration-fast',
            )}
          >
            See all projects
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>

      </Container>

      {/* ── Card rail: contained on md+, full-bleed horizontal scroll on mobile ── */}
      <div className="relative">

        {/* Mobile: full-width horizontal scroll rail */}
        <div className="md:hidden px-6 overflow-x-auto scrollbar-none pb-4">
          <div className="flex gap-4 w-max">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} className="w-[76vw] max-w-sm" />
            ))}
            {/* Peek card — hint there's more */}
            <div className="w-8 shrink-0" aria-hidden="true" />
          </div>
        </div>

        {/* Desktop: contained grid */}
        <Container className="hidden md:block">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={item}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>

      {/* Mobile see-all link */}
      <Container className="mt-8 md:hidden">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-body-sm font-body font-medium text-brand-400 hover:text-brand-300 transition-colors duration-fast"
        >
          See all projects
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </Container>
    </section>
  )
}

/* ── Individual project card ──────────────────────────────────────────── */

type ProjectCardProps = {
  project: Project
  className?: string
}

function ProjectCard({ project, className }: ProjectCardProps) {
  const cover  = project.coverImage as { url?: string; alt?: string } | null
  const coverUrl = payloadImageUrl(cover?.url)
  const slug   = project.slug as string
  const status = project.status as string

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        'group relative flex flex-col rounded-3xl overflow-hidden',
        'border border-base-800 bg-base-900',
        'hover:border-base-700',
        'transition-all duration-normal hover:-translate-y-1 hover:shadow-card-hover',
        'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2',
        className,
      )}
    >
      {/* Cover image — full bleed, tall aspect ratio */}
      <div className="relative aspect-[4/3] overflow-hidden bg-base-800">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={cover?.alt ?? (project.name as string)}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-slow"
            sizes="(max-width: 768px) 76vw, (max-width: 1280px) 33vw, 400px"
          />
        ) : (
          /* Placeholder when no cover image */
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-base-800 to-base-900">
            <span className="font-display font-extrabold text-[4rem] text-base-700 select-none">
              {(project.name as string).charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient overlay for text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-base-900/80 via-base-900/10 to-transparent"
        />

        {/* Status badge pinned top-left */}
        <div className="absolute top-4 left-4">
          <Badge
            variant={statusVariant[status] ?? 'default'}
            size="sm"
          >
            {status}
          </Badge>
        </div>

        {/* Arrow icon pinned top-right — visible on hover */}
        <div
          aria-hidden="true"
          className="absolute top-4 right-4 p-2 rounded-full bg-base-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-fast"
        >
          <ArrowUpRight size={14} className="text-base-100" />
        </div>
      </div>

      {/* Text block */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display font-bold text-h4 text-base-100 mb-2 group-hover:text-brand-300 transition-colors duration-fast leading-snug">
          {project.name as string}
        </h3>
        <p className="text-body-sm text-base-100/55 leading-relaxed line-clamp-2">
          {project.tagline as string}
        </p>
      </div>
    </Link>
  )
}
