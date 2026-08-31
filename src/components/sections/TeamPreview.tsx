'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn, payloadImageUrl } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { staggerContainer, fadeUp } from '@/variants'

type TeamMember = {
  id: string
  name: unknown
  role: unknown
  department: unknown
  customDepartment: unknown
  photo: unknown
}

export type { TeamMember }

type TeamPreviewProps = {
  members: TeamMember[]
}

/**
 * Maps department strings to a subtle tinted chip colour.
 * Falls back to the default neutral chip if no match.
 */
function departmentChipClass(department: string): string {
  const map: Record<string, string> = {
    leadership:  'bg-brand-500/10 text-brand-300 border-brand-500/20',
    engineering: 'bg-info/10 text-info border-info/20',
    writing:     'bg-accent-500/10 text-accent-400 border-accent-500/20',
    art:         'bg-success/10 text-success border-success/20',
    music:       'bg-warning/10 text-warning border-warning/20',
    community:   'bg-brand-400/10 text-brand-300 border-brand-400/20',
  }
  return map[department?.toLowerCase()] ?? 'bg-base-800 text-base-100/50 border-base-700'
}

export function TeamPreview({ members }: TeamPreviewProps) {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? {} : staggerContainer
  const item = prefersReduced ? {} : fadeUp

  if (!members.length) return null

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="team-heading"
    >
      {/* Subtle section background */}
      <div aria-hidden="true" className="absolute inset-0 bg-base-900/25 pointer-events-none" />
      <div aria-hidden="true" className="section-divider absolute top-0 left-0 right-0" />

      <Container className="relative z-10">

        {/* Section header */}
        <motion.div
          variants={prefersReduced ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 md:mb-16"
        >
          <div>
            <p className="eyebrow mb-3">The People Behind It</p>
            <h2
              id="team-heading"
              className="font-display font-extrabold text-h1 text-base-100 tracking-tight"
            >
              Our{' '}
              <span className="gradient-text">core team.</span>
            </h2>
          </div>
          <Link
            href="/team"
            className={cn(
              'hidden sm:inline-flex items-center gap-1.5 shrink-0',
              'text-body-sm font-body font-medium',
              'text-base-100/40 hover:text-brand-300',
              'transition-colors duration-fast',
            )}
          >
            Meet everyone
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Member grid */}
        <motion.ul
          role="list"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10"
        >
          {members.map((member) => {
            const rawPhoto   = member.photo as { url?: string; alt?: string } | null
            const photo      = rawPhoto
              ? { ...rawPhoto, url: payloadImageUrl(rawPhoto.url) }
              : rawPhoto
            const name       = member.name as string
            const role       = member.role as string
            const department = member.department as string
            // Use customDepartment label when department is 'other'
            const deptLabel  =
              department === 'other' && member.customDepartment
                ? (member.customDepartment as string)
                : department

            return (
              <motion.li key={member.id} variants={item} className="group flex flex-col items-center text-center">

                {/* Circular avatar */}
                <div
                  className={cn(
                    'relative mb-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0',
                    'border-2 border-base-800 bg-base-800',
                    'ring-2 ring-transparent group-hover:ring-brand-500/40',
                    'transition-all duration-normal',
                  )}
                >
                  {photo?.url ? (
                    <Image
                      src={photo.url}
                      alt={photo.alt ?? name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-slow"
                      sizes="(max-width: 640px) 80px, 96px"
                    />
                  ) : (
                    /* Initials fallback */
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-600/30 to-base-800">
                      <span className="font-display font-bold text-h3 text-brand-300 select-none">
                        {name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <p className="font-body font-semibold text-body-sm text-base-100 leading-tight mb-1.5">
                  {name}
                </p>

                {/* Role */}
                <p className="text-label text-base-100/45 leading-snug mb-2.5">
                  {role}
                </p>

                {/* Department chip */}
                {department && (
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full',
                      'text-label-xs font-body font-medium border',
                      departmentChipClass(department),
                    )}
                  >
                    {deptLabel}
                  </span>
                )}

              </motion.li>
            )
          })}
        </motion.ul>

        {/* Mobile see-all */}
        <div className="mt-10 sm:hidden">
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-body-sm font-body font-medium text-brand-400 hover:text-brand-300 transition-colors duration-fast"
          >
            Meet everyone
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

      </Container>

      <div aria-hidden="true" className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
