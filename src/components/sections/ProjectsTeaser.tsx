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
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={item}>
              <ProjectCard
                project={project}
                index={index}
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
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-sm text-body-sm font-body font-semibold text-white bg-brand-500 hover:bg-brand-400 transition-colors duration-fast shadow-sm min-h-[44px]"
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
  index: number
  onQuickView: () => void
}

function ProjectCard({ project, index, onQuickView }: ProjectCardProps) {
  const cover  = project.coverImage as { url?: string; alt?: string } | null
  const coverUrl = payloadImageUrl(cover?.url)
  const slug   = project.slug as string
  const status = project.status as string
  const tags   = (project.tags as { tag: string }[]) ?? []

  return (
    <div
      className={cn(
        'atlas-card atlas-card--project atlas-project-card group relative flex flex-col',
      )}
    >
      {/* Cover image */}
      <div className="atlas-card__media">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={cover?.alt ?? (project.name as string)}
            fill
            className="atlas-card__image"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-extrabold text-[4rem] text-base-800 select-none">
              {(project.name as string).charAt(0)}
            </span>
          </div>
        )}

        <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
          <Badge
            variant={statusVariant[status] ?? 'default'}
            size="sm"
            showDot
          >
            {status}
          </Badge>
        </div>
        <span className="atlas-project-card__index">
          FIELD NOTE / {String(index + 1).padStart(2, '0')}
        </span>

        <button
          onClick={onQuickView}
          aria-label={`Quick view ${project.name as string}`}
          className="atlas-project-card__quick-view"
        >
          <Eye size={13} aria-hidden="true" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Text block */}
      <div className="atlas-card__body atlas-project-card__body">
        <div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
              {tags.slice(0, 2).map(({ tag }) => (
                <span
                  key={tag}
                  className="atlas-project-card__tag"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/projects/${slug}`}
            className="atlas-project-card__title group/link flex items-start justify-between gap-2 mb-2"
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
          <p className="atlas-project-card__tagline line-clamp-2">
            {project.tagline as string}
          </p>
        </div>
      </div>
    </div>
  )
}
