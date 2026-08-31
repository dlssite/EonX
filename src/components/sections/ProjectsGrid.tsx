'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { FolderOpen } from 'lucide-react'

type Project = {
  id: string
  name: unknown
  slug: unknown
  tagline: unknown
  coverImage: unknown
  status: unknown
  tags: unknown
  isFeatured: unknown
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

  function handleStatusFilter(value: string) {
    const params = new URLSearchParams()
    if (value !== 'all') params.set('status', value)
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  const isEmpty = !featured && projects.length === 0

  return (
    <section className="py-24">
      <Container>

        {/* ── Status filter ──────────────────────────────────────── */}
        <nav aria-label="Filter projects by status" className="mb-12">
          <ul role="list" className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map(({ value, label }) => (
              <li key={value}>
                <button
                  onClick={() => handleStatusFilter(value)}
                  aria-pressed={activeStatus === value}
                  className={cn(
                    'px-4 py-1.5 rounded-lg text-body-sm font-body font-medium',
                    'transition-all duration-fast border',
                    activeStatus === value
                      ? 'bg-brand-500 text-white border-brand-500 shadow-sm shadow-brand/30'
                      : 'bg-base-900 text-base-100/50 border-base-700 hover:text-base-100 hover:border-brand-500/50 hover:bg-base-800',
                  )}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Featured slot ──────────────────────────────────────── */}
        {featured && (
          <div className="mb-16">
            <p className="eyebrow mb-6">Featured Project</p>
            <Link
              href={`/projects/${featured.slug as string}`}
              className={cn(
                'group grid grid-cols-1 md:grid-cols-2 gap-8 p-6',
                'rounded-2xl border border-base-800 bg-base-900',
                'hover:border-brand-500/40 transition-all duration-normal',
                'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2',
              )}
            >
              {(featured.coverImage as { url?: string })?.url && (
                <div className="rounded-xl overflow-hidden aspect-video bg-base-800">
                  <Image
                    src={(featured.coverImage as { url: string }).url}
                    alt={
                      (featured.coverImage as { alt?: string }).alt ??
                      (featured.name as string)
                    }
                    width={800}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-slow"
                  />
                </div>
              )}
              <div className="flex flex-col justify-center">
                <Badge
                  variant={statusVariant[featured.status as string] ?? 'default'}
                  className="mb-4 self-start"
                >
                  {featured.status as string}
                </Badge>
                <h2 className="font-display font-bold text-h2 text-base-100 tracking-tight mb-3 group-hover:text-brand-300 transition-colors duration-fast">
                  {featured.name as string}
                </h2>
                <p className="text-body text-base-100/60 leading-relaxed mb-6">
                  {featured.tagline as string}
                </p>
                <span className="text-body-sm font-body font-medium text-brand-400 group-hover:text-brand-300 transition-colors duration-fast">
                  Learn more →
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* ── Empty state ─────────────────────────────────────────── */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center text-center py-20 rounded-2xl border border-dashed border-base-700 bg-base-900/40">
            <div
              className={cn(
                'w-14 h-14 rounded-2xl mb-5 flex items-center justify-center',
                'bg-base-800 border border-base-700',
              )}
            >
              <FolderOpen size={24} className="text-base-100/30" aria-hidden="true" />
            </div>
            <p className="font-display font-bold text-h4 text-base-100/60 mb-2">
              No projects found
            </p>
            <p className="text-body-sm text-base-100/35 max-w-xs">
              {activeStatus !== 'all'
                ? `No ${activeStatus} projects right now. Try a different filter.`
                : 'No published projects yet. Check back soon.'}
            </p>
            {activeStatus !== 'all' && (
              <button
                onClick={() => handleStatusFilter('all')}
                className="mt-6 text-body-sm font-body font-medium text-brand-400 hover:text-brand-300 transition-colors duration-fast"
              >
                Show all projects
              </button>
            )}
          </div>
        )}

        {/* ── Project grid ──────────────────────────────────────── */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const cover = project.coverImage as { url?: string; alt?: string } | null
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug as string}`}
                  className={cn(
                    'group block rounded-2xl border border-base-800 bg-base-900 overflow-hidden',
                    'hover:border-brand-500/40 transition-all duration-normal hover:-translate-y-1',
                    'hover:shadow-card-hover',
                    'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2',
                  )}
                >
                  {cover?.url ? (
                    <div className="aspect-video overflow-hidden bg-base-800">
                      <Image
                        src={cover.url}
                        alt={cover.alt ?? (project.name as string)}
                        width={600}
                        height={338}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-slow"
                      />
                    </div>
                  ) : (
                    /* Placeholder gradient when no cover */
                    <div className="aspect-video bg-gradient-to-br from-base-800 to-base-900 flex items-center justify-center">
                      <span className="font-display font-extrabold text-[3rem] text-base-700 select-none">
                        {(project.name as string).charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="p-6">
                    <Badge
                      variant={statusVariant[project.status as string] ?? 'default'}
                      size="sm"
                      className="mb-3"
                    >
                      {project.status as string}
                    </Badge>
                    <h3 className="font-display font-bold text-h4 text-base-100 mb-2 group-hover:text-brand-300 transition-colors duration-fast">
                      {project.name as string}
                    </h3>
                    <p className="text-body-sm text-base-100/60 leading-relaxed line-clamp-2">
                      {project.tagline as string}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
