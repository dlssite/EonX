'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn, payloadImageUrl } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
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

const deptBadge: Record<string, 'brand' | 'accent' | 'default'> = {
  leadership:  'brand',
  engineering: 'accent',
  design:      'default',
  writing:     'default',
  art:         'default',
  community:   'default',
  other:       'default',
}

export function TeamPreview({ members }: TeamPreviewProps) {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? {} : staggerContainer
  const item = prefersReduced ? {} : fadeUp

  if (!members.length) return null

  return (
    <section
      className="relative py-28 md:py-36 overflow-hidden bg-base-950"
      aria-labelledby="team-heading"
    >
      <div aria-hidden="true" className="section-divider absolute top-0 left-0 right-0" />

      <Container className="relative z-10">

        {/* Section header */}
        <motion.div
          variants={prefersReduced ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 md:mb-20"
        >
          <div>
            <p className="eyebrow mb-3">Core Stewards & Leadership</p>
            <h2
              id="team-heading"
              className="font-display font-extrabold text-h1 text-base-100 tracking-tight"
            >
              The people behind{' '}
              <span className="gradient-text">Eonrisia.</span>
            </h2>
          </div>
          <Link
            href="/team"
            className={cn(
              'inline-flex items-center gap-2 shrink-0',
              'text-body-sm font-body font-semibold',
              'text-base-100/60 hover:text-brand-300',
              'transition-colors duration-fast',
            )}
          >
            Meet the entire team
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Member grid */}
        <motion.ul
          role="list"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {members.map((member) => {
            const rawPhoto   = member.photo as { url?: string; alt?: string } | null
            const photo      = rawPhoto
              ? { ...rawPhoto, url: payloadImageUrl(rawPhoto.url) }
              : rawPhoto
            const name       = member.name as string
            const role       = member.role as string
            const department = member.department as string
            const deptLabel  =
              department === 'other' && member.customDepartment
                ? (member.customDepartment as string)
                : department

            return (
              <motion.li
                key={member.id}
                variants={item}
                className="group flex flex-col items-center text-center p-6 rounded-3xl border border-glass bg-gradient-to-b from-base-900/80 to-base-950/90 backdrop-blur-sm hover:border-glass-strong transition-all duration-normal hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-10px_rgba(108,99,255,0.25)]"
              >
                {/* Avatar */}
                <div
                  className={cn(
                    'relative mb-4 w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shrink-0',
                    'border border-glass bg-base-950',
                    'group-hover:border-brand-400 group-hover:shadow-[0_0_24px_0_rgba(108,99,255,0.35)]',
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
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-900/30 to-base-950">
                      <span className="font-display font-bold text-h3 text-brand-300 select-none">
                        {name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <p className="font-display font-bold text-body-sm text-base-100 leading-tight mb-1 group-hover:text-brand-300 transition-colors">
                  {name}
                </p>

                {/* Role */}
                <p className="text-label text-base-100/50 leading-snug mb-3">
                  {role}
                </p>

                {/* Department badge */}
                {department && (
                  <Badge variant={deptBadge[department] ?? 'default'} size="sm" className="mt-auto">
                    {deptLabel}
                  </Badge>
                )}
              </motion.li>
            )
          })}
        </motion.ul>

      </Container>

      <div aria-hidden="true" className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
