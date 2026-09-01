'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Eye, FolderOpen, Layers } from 'lucide-react'
import { cn, payloadImageUrl } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'

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
  { value: 'all',       label: 'All' },
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
  const router  = useRouter()
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
    <section className="py-24 bg-base-950">
      <Container>

        {/* ── Status filter pills ─────────────────────────────────── */}
        <nav aria-label="Filter projects by status" className="mb-14">
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-base-900/80 border border-glass backdrop-blur-md w-fit shadow-md">
            {STATUS_OPTIONS.map(({ value, label }) => {
              const isSelected = activeStatus === value
              return (
                <button
                  key={value}
                  onClick={() => handleStatusFilter(value)}
                  aria-pressed={isSelected}
                  className={cn(
                    'px-5 py-2 rounded-full text-body-sm font-body font-medium transition-all duration-fast select-none',
                    isSelected
                      ? 'bg-base-800/80 text-base-100 font-semibold border border-glass-subtle shadow-sm'
                      : 'text-base-100/60 hover:text-base-100 hover:bg-base-800/40',
                  )}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </nav>

        {/* ── Featured Billboard ─────────────────────────────────── */}
        {featured && (
          <div className="mb-20">
            <p className="eyebrow mb-4">Featured Initiative</p>
            <div
              className={cn(
                'group relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8',
                'rounded-3xl border border-glass bg-base-900/70 backdrop-blur-xl',
                'hover:border-glass-hover transition-all duration-normal shadow-2xl overflow-hidden',
              )}
            >
              {/* Media preview */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden aspect-[16/10] bg-base-950 relative border border-glass-subtle">
                {(featured.coverImage as { url?: string })?.url ? (
                  <Image
                    src={payloadImageUrl((featured.coverImage as { url: string }).url)!}
                    alt={
                      (featured.coverImage as { alt?: string }).alt ??
                      (featured.name as string)
                    }
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-slow"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-base-900 to-base-950">
                    <span className="font-display font-extrabold text-[4rem] text-base-800">
                      {(featured.name as string).charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info Column */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    variant={statusVariant[featured.status as string] ?? 'default'}
                    showDot
                  >
                    {featured.status as string}
                  </Badge>
                </div>
                <h2 className="font-display font-extrabold text-h2 text-base-100 tracking-tight mb-3">
                  {featured.name as string}
                </h2>
                <p className="text-body text-base-100/65 leading-relaxed mb-8">
                  {featured.tagline as string}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={`/projects/${featured.slug as string}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-body-sm font-body font-semibold text-white bg-brand-500 hover:bg-brand-400 active:scale-[0.97] transition-all duration-fast shadow-[0_0_24px_0_rgba(108,99,255,0.35)] sheen-sweep"
                  >
                    <span>Explore Project</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  <button
                    onClick={() => setSelectedProject(featured)}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-body-sm font-body font-medium text-base-100 border border-glass bg-base-950/60 hover:bg-base-800/80 transition-all duration-fast"
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
          <div className="flex flex-col items-center justify-center text-center py-20 rounded-3xl border border-dashed border-glass-subtle bg-base-900/30">
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
                className="mt-6 text-body-sm font-body font-semibold text-brand-400 hover:text-brand-300 transition-colors"
              >
                Show all projects
              </button>
            )}
          </div>
        )}

        {/* ── Projects Grid ──────────────────────────────────────── */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const cover = project.coverImage as { url?: string; alt?: string } | null
              const coverUrl = payloadImageUrl(cover?.url)
              return (
                <div
                  key={project.id}
                  className="group relative flex flex-col rounded-3xl border border-glass bg-base-900/80 backdrop-blur-md overflow-hidden hover:border-glass-hover transition-all duration-normal hover:-translate-y-1.5 hover:shadow-card-hover"
                >
                  {/* Media */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-base-950">
                    {coverUrl ? (
                      <Image
                        src={coverUrl}
                        alt={cover?.alt ?? (project.name as string)}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-slow"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-base-900 to-base-950">
                        <span className="font-display font-extrabold text-[3.5rem] text-base-800 select-none">
                          {(project.name as string).charAt(0)}
                        </span>
                      </div>
                    )}

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-base-950/90 via-base-950/20 to-transparent"
                    />

                    <div className="absolute top-4 left-4 z-10">
                      <Badge
                        variant={statusVariant[project.status as string] ?? 'default'}
                        size="sm"
                        showDot
                      >
                        {project.status as string}
                      </Badge>
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      aria-label={`Quick view ${project.name as string}`}
                      className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-label font-body font-semibold text-white bg-base-950/80 border border-glass-strong backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-brand-500 hover:border-brand-400 transition-all duration-fast"
                    >
                      <Eye size={13} aria-hidden="true" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Text block */}
                  <div className="flex flex-col flex-1 p-6 md:p-7">
                    <Link
                      href={`/projects/${project.slug as string}`}
                      className="group/link flex items-start justify-between gap-2 mb-2.5"
                    >
                      <h3 className="font-display font-bold text-h4 text-base-100 group-hover/link:text-brand-300 transition-colors duration-fast leading-snug">
                        {project.name as string}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        className="text-base-100/40 group-hover/link:text-brand-300 shrink-0 transition-colors"
                        aria-hidden="true"
                      />
                    </Link>
                    <p className="text-body-sm text-base-100/60 leading-relaxed line-clamp-2">
                      {project.tagline as string}
                    </p>
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
              <p className="text-body-sm text-base-100/70 leading-relaxed">
                {String(selectedProject.tagline)}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-glass">
              <Link
                href={`/projects/${String(selectedProject.slug)}`}
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-body-sm font-body font-semibold text-white bg-brand-500 hover:bg-brand-400 transition-all duration-fast shadow-[0_0_24px_0_rgba(108,99,255,0.35)] sheen-sweep"
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
