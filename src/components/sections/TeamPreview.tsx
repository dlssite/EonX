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

export function TeamPreview({ members }: TeamPreviewProps) {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? {} : staggerContainer
  const item = prefersReduced ? {} : fadeUp

  if (!members.length) return null

  return (
    <section
      className="relative py-16 sm:py-24 md:py-36 overflow-hidden bg-base-950"
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
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16 md:mb-20"
        >
          <div>
            <p className="eyebrow mb-2 sm:mb-3">Core Stewards & Leadership</p>
            <h2
              id="team-heading"
              className="font-display font-extrabold text-h2 sm:text-h1 text-base-100 tracking-tight"
            >
              The people behind{' '}
              <span className="gradient-text">Eonrisia.</span>
            </h2>
          </div>
          <Link
            href="/team"
            className={cn(
              'inline-flex items-center gap-2 shrink-0 py-1.5',
              'text-body-sm font-body font-semibold',
              'text-base-100/70 hover:text-brand-300',
              'transition-colors duration-fast',
            )}
          >
            <span>Meet the entire team</span>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {members.map((member, index) => {
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
                className="atlas-card atlas-card--person atlas-person-card group relative flex flex-col"
              >
                <div className="atlas-card__media w-full">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={photoAlt}
                      fill
                      className="atlas-card__image"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display font-extrabold text-[5rem] text-brand-300/40 select-none">
                        {name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {department && (
                    <span className="atlas-person-card__department">
                      <span className="atlas-person-card__mark" aria-hidden="true" />
                      {deptLabel}
                    </span>
                  )}
                  <span className="atlas-person-card__index">
                    TEAM / {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="atlas-person-card__portrait-label" aria-hidden="true">
                    EONRISIA
                  </span>
                </div>

                <div className="atlas-card__body">
                  <div>
                    <p className="atlas-person-card__role">{role}</p>
                    <h3 className="atlas-person-card__name">
                      {name}
                    </h3>
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
