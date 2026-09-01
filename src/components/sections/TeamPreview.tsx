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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {members.map((member) => {
            const photoUrl   = payloadImageUrl(member.photo as Parameters<typeof payloadImageUrl>[0])
            const photoAlt   =
              typeof member.photo === 'object' && member.photo !== null
                ? (member.photo as { alt?: string }).alt ?? (member.name as string)
                : (member.name as string)
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
                className="group relative flex flex-col rounded-3xl border border-glass bg-gradient-to-b from-base-900/95 via-base-900/75 to-base-950/90 backdrop-blur-md overflow-hidden hover:border-glass-strong transition-all duration-normal hover:-translate-y-2 hover:shadow-[0_24px_48px_-15px_rgba(108,99,255,0.25)]"
              >
                {/* Portrait Image Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-950 border-b border-glass">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={photoAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-slow"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-900/30 via-base-900 to-base-950">
                      <span className="font-display font-extrabold text-[5rem] text-brand-300/40 select-none">
                        {name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Gradient Fade */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-base-950/90 via-base-950/20 to-transparent"
                  />

                  {/* Pinned Department Badge */}
                  {department && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant={deptBadge[department] ?? 'default'} size="sm" showDot>
                        {deptLabel}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Profile Details */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-display font-bold text-h3 text-base-100 leading-tight mb-1 group-hover:text-brand-300 transition-colors">
                      {name}
                    </h3>

                    <p className="text-body-sm text-brand-400 font-semibold">
                      {role}
                    </p>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </motion.ul>

      </Container>

      <div aria-hidden="true" className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
