'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Eye, FolderOpen, Layers, Tag as TagIcon } from 'lucide-react'
import type { SerializedEditorState } from 'lexical'
import { cn, payloadImageUrl } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { RichText } from '@/components/ui/RichText'

type Project = {
  id: string
  name: unknown
  slug: unknown
  tagline: unknown
  description?: unknown
  coverImage: unknown
  status: unknown
  tags?: unknown
  isFeatured?: unknown
}

export type { Project }

type ProjectsGridProps = {
  featured: Project | null
  projects: Project[]
  activeStatus?: string
  activeTag?: string
}

const STATUS_OPTIONS = [
  { value: 'all',       label: 'All Initiatives' },
  { value: 'active',    label: 'Active' },
  { value: 'upcoming',  label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
  { value: 'paused',    label: 'Paused' },
]

const statusVariant: Record<string, 'brand' | 'success' | 'default' | 'warning'> = {
  active:    'brand',
  completed: 'success',
  upcoming:  'default',
  paused:    'warning',
}

export function ProjectsGrid({ featured, projects, activeStatus = 'all' }: ProjectsGridProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  function handleStatusFilter(value: string) {
    const params = new URLSearchParams()
    if (value !== 'all') params.set('status', value)
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  const isEmpty = !featured && projects.length === 0

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-base-950">
      <Container>

        {/* ── Status index ──────────────────────────────────────────────────── */}
        <nav aria-label="Filter projects by status" className="mb-10 sm:mb-14">
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 edge-fade-x">
            <div className="atlas-selector">
              {STATUS_OPTIONS.map(({ value, label }) => {
                const isSelected = activeStatus === value
                return (
                  <button
                    key={value}
                    onClick={() => handleStatusFilter(value)}
                    aria-pressed={isSelected}
                    className="atlas-selector__item"
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </nav>

        {/* ── Featured Showcase Billboard ────────────────────────────── */}
        {featured && (
          <div className="mb-14 sm:mb-20">
            <p className="eyebrow mb-3 sm:mb-4">Flagship Initiative</p>
            <div
              className={cn(
                'atlas-card atlas-card--featured group relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-5 sm:p-8 md:p-10',
              )}
            >
              {/* Media preview */}
              <div className="atlas-card__media lg:col-span-7 aspect-[16/10]">
                {(featured.coverImage as { url?: string })?.url ? (
                  <Image
                    src={payloadImageUrl((featured.coverImage as { url: string }).url)!}
                    alt={
                      (featured.coverImage as { alt?: string }).alt ??
                      (featured.name as string)
                    }
                    fill
                    className="atlas-card__image"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display font-extrabold text-[4.5rem] text-base-800">
                      {(featured.name as string).charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info Column */}
              <div className="lg:col-span-5 flex flex-col justify-between py-1 sm:py-2 z-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Badge
                      variant={statusVariant[featured.status as string] ?? 'default'}
                      showDot
                    >
                      {featured.status as string}
                    </Badge>
                    {Array.isArray(featured.tags) && featured.tags.length > 0 && (
                      <span className="px-3 py-1 rounded-full text-label font-medium bg-base-950/80 border border-glass text-base-100/65">
                        {String((featured.tags[0] as { tag?: string })?.tag ?? '')}
                      </span>
                    )}
                  </div>
                  <h2 className="font-display font-extrabold text-h3 sm:text-h2 md:text-[2.25rem] text-base-100 tracking-tight leading-tight mb-3 sm:mb-4 group-hover:text-brand-300 transition-colors">
                    {featured.name as string}
                  </h2>
                  <p className="text-body-sm sm:text-body text-base-100/70 leading-relaxed mb-6 sm:mb-8">
                    {featured.tagline as string}
                  </p>
                </div>

                <div className="atlas-card__footer flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-5 sm:pt-6">
                  <Link
                    href={`/projects/${featured.slug as string}`}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-sm text-body-sm font-body font-semibold text-white bg-brand-500 hover:bg-brand-400 transition-colors duration-fast shadow-sm min-h-[44px]"
                  >
                    <span>Explore Project</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  <button
                    onClick={() => setSelectedProject(featured)}
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-3.5 sm:py-3 rounded-full text-body-sm font-body font-medium text-base-100 border border-glass bg-base-950/60 hover:bg-base-800/80 transition-all duration-fast min-h-[44px]"
                  >
                    <Eye size={14} aria-hidden="true" />
                    <span>Quick View</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Empty State ─────────────────────────────────────────── */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center text-center py-16 sm:py-20 rounded-3xl border border-dashed border-glass bg-base-900/30 px-4">
            <div className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center bg-base-900 border border-glass">
              <FolderOpen size={24} className="text-base-100/40" aria-hidden="true" />
            </div>
            <p className="font-display font-bold text-h4 text-base-100/70 mb-2">
              No projects found
            </p>
            <p className="text-body-sm text-base-100/40 max-w-xs">
              {activeStatus !== 'all'
                ? `No ${activeStatus} projects found. Try a different filter.`
                : 'No published projects yet. Check back soon.'}
            </p>
            {activeStatus !== 'all' && (
              <button
                onClick={() => handleStatusFilter('all')}
                className="mt-6 text-body-sm font-body font-semibold text-brand-400 hover:text-brand-300 transition-colors min-h-[44px] px-4"
              >
                Show all projects
              </button>
            )}
          </div>
        )}

        {/* ── Projects Showcase Grid ────────────────────────────────── */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => {
              const cover = project.coverImage as { url?: string; alt?: string } | null
              const coverUrl = payloadImageUrl(cover?.url)
              const tags = (project.tags as { tag: string }[]) ?? []

              return (
                <div
                  key={project.id}
                  className="atlas-card atlas-card--project group relative flex flex-col"
                >
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

                    {/* Status badge top-left */}
                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                      <Badge
                        variant={statusVariant[project.status as string] ?? 'default'}
                        size="sm"
                        showDot
                      >
                        {project.status as string}
                      </Badge>
                    </div>

                    {/* Quick view button: visible on mobile touch screens, hover reveal on desktop */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      aria-label={`Quick view ${project.name as string}`}
                      className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-2 text-label font-body font-semibold text-base-100 bg-base-950 border border-glass hover:border-brand-400 transition-colors min-h-[36px]"
                    >
                      <Eye size={13} aria-hidden="true" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="atlas-card__body">
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
                        href={`/projects/${project.slug as string}`}
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

                      <p className="text-body-sm text-base-100/65 leading-relaxed line-clamp-2 mb-4">
                        {project.tagline as string}
                      </p>
                    </div>

                    <div className="atlas-card__footer mt-4 pt-4 flex items-center justify-between text-label text-base-100/50">
                      <span className="flex items-center gap-1">
                        <TagIcon size={12} className="text-brand-400" />
                        <span>Explore details</span>
                      </span>
                      <span className="text-brand-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        View Project <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

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

            <div className="flex items-center gap-3">
              <Badge
                variant={statusVariant[String(selectedProject.status)] ?? 'default'}
                showDot
              >
                {String(selectedProject.status)}
              </Badge>
            </div>

            <div className="p-6 rounded-2xl border border-glass bg-base-950/50 space-y-3">
              <div className="flex items-center gap-2 text-label font-body font-semibold uppercase tracking-widest text-brand-400">
                <Layers size={14} aria-hidden="true" />
                <span>Overview</span>
              </div>
              {selectedProject.description ? (
                <RichText
                  content={selectedProject.description as SerializedEditorState}
                />
              ) : (
                <p className="text-body-sm text-base-100/70 leading-relaxed">
                  {String(selectedProject.tagline)}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-glass">
              <Link
                href={`/projects/${String(selectedProject.slug)}`}
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-body-sm font-body font-semibold text-white bg-brand-500 hover:bg-brand-400 transition-colors duration-fast shadow-sm"
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
