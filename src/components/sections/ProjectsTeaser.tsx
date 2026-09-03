'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Eye, Layers } from 'lucide-react'
import { cn, payloadImageUrl } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { staggerContainer, fadeUp } from '@/variants'

type Project = {
  id: string
  name: unknown
  slug: unknown
  tagline: unknown
  description?: unknown
  coverImage: unknown
  status: unknown
  tags?: unknown
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? {} : staggerContainer
  const item = prefersReduced ? {} : fadeUp

  if (!projects.length) return null

  return (
    <section className="py-16 sm:py-24 md:py-36 bg-base-950" aria-labelledby="projects-heading">
      <Container>

        {/* Section header */}
        <motion.div
          variants={prefersReduced ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 md:mb-16"
        >
          <div>
            <p className="eyebrow mb-2 sm:mb-3">Flagship Projects & Universes</p>
            <h2
              id="projects-heading"
              className="font-display font-extrabold text-h2 sm:text-h1 text-base-100 tracking-tight"
            >
              From universe{' '}
              <span className="gradient-text">to experience.</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className={cn(
              'inline-flex items-center gap-2 shrink-0 py-1.5',
              'text-body-sm font-body font-semibold',
              'text-base-100/70 hover:text-brand-300',
              'transition-colors duration-fast',
            )}
          >
            <span>See all projects</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </motion.div>

        {/* ── Desktop & Tablet Grid ────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <ProjectCard
                project={project}
                onQuickView={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>

      </Container>

      {/* ── Quick-View Drawer ─────────────────────────────────── */}
      <Drawer
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={String(selectedProject?.name ?? 'Project Details')}
        description={String(selectedProject?.tagline ?? '')}
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Media preview */}
            {Boolean(selectedProject.coverImage) && (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-glass bg-base-950">
                <Image
                  src={payloadImageUrl((selectedProject.coverImage as { url: string }).url)!}
                  alt={String(selectedProject.name)}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Status & Category */}
            <div className="flex items-center gap-3">
              <Badge
                variant={statusVariant[String(selectedProject.status)] ?? 'default'}
                showDot
              >
                {String(selectedProject.status)}
              </Badge>
            </div>

            {/* Content summary */}
            <div className="p-5 sm:p-6 rounded-2xl border border-glass bg-base-950/50 space-y-3">
              <div className="flex items-center gap-2 text-label font-body font-semibold uppercase tracking-widest text-brand-400">
                <Layers size={14} aria-hidden="true" />
                <span>Overview</span>
              </div>
              <p className="text-body-sm text-base-100/70 leading-relaxed">
                {String(selectedProject.tagline)}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-glass">
              <Link
                href={`/projects/${String(selectedProject.slug)}`}
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-full text-body-sm font-body font-semibold text-white bg-brand-500 hover:bg-brand-400 transition-all duration-fast shadow-[0_0_24px_0_rgba(108,99,255,0.35)] sheen-sweep min-h-[44px]"
              >
                <span>View Full Project Page</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </Drawer>
    </section>
  )
}

/* ── Individual project card ──────────────────────────────────────────── */

type ProjectCardProps = {
  project: Project
  onQuickView: () => void
}

function ProjectCard({ project, onQuickView }: ProjectCardProps) {
  const cover  = project.coverImage as { url?: string; alt?: string } | null
  const coverUrl = payloadImageUrl(cover?.url)
  const slug   = project.slug as string
  const status = project.status as string
  const tags   = (project.tags as { tag: string }[]) ?? []

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-3xl overflow-hidden',
        'border border-glass bg-gradient-to-b from-base-900/90 via-base-900/60 to-base-950/80 backdrop-blur-md',
        'hover:border-glass-strong transition-all duration-normal hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(108,99,255,0.2)]',
      )}
    >
      {/* Cover image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-base-950 border-b border-glass">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={cover?.alt ?? (project.name as string)}
            fill
            className="object-cover group-hover:scale-[1.06] transition-transform duration-slow"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-900/20 to-base-950">
            <span className="font-display font-extrabold text-[4rem] text-base-800 select-none">
              {(project.name as string).charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-base-950/90 via-base-950/30 to-transparent"
        />

        {/* Status badge pinned top-left */}
        <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
          <Badge
            variant={statusVariant[status] ?? 'default'}
            size="sm"
            showDot
          >
            {status}
          </Badge>
        </div>

        {/* Quick-view button: immediately visible on mobile touch devices, hover reveal on desktop */}
        <button
          onClick={onQuickView}
          aria-label={`Quick view ${project.name as string}`}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-full text-label font-body font-semibold text-white bg-base-950/90 border border-glass backdrop-blur-md opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-brand-500 hover:border-brand-400 transition-all duration-fast shadow-md min-h-[36px]"
        >
          <Eye size={13} aria-hidden="true" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Text block */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 md:p-7 justify-between">
        <div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
              {tags.slice(0, 2).map(({ tag }) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[0.7rem] font-medium bg-base-950 border border-glass text-base-100/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/projects/${slug}`}
            className="group/link flex items-start justify-between gap-2 mb-2"
          >
            <h3 className="font-display font-bold text-h4 sm:text-h4 text-base-100 group-hover/link:text-brand-300 transition-colors duration-fast leading-snug">
              {project.name as string}
            </h3>
            <ArrowUpRight
              size={18}
              className="text-base-100/40 group-hover/link:text-brand-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0 transition-all"
              aria-hidden="true"
            />
          </Link>
          <p className="text-body-sm text-base-100/65 leading-relaxed line-clamp-2">
            {project.tagline as string}
          </p>
        </div>
      </div>
    </div>
  )
}
