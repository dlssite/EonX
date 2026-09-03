'use client'

import Image from 'next/image'
import { Youtube, Instagram, Twitter, Github, Globe, Linkedin } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { DeptFilter } from './DeptFilter'
import { payloadImageUrl } from '@/lib/utils'

type SocialLink = { platform: string; url: string }

type TeamMember = {
  id: string
  name: unknown
  role: unknown
  department: unknown
  customDepartment?: unknown
  bio?: unknown
  photo?: unknown
  socialLinks?: unknown
}

export type { TeamMember }

type TeamGridProps = {
  members: TeamMember[]
  activeDept: string
}

const deptBadge: Record<string, 'brand' | 'accent' | 'success' | 'warning' | 'default'> = {
  engineering: 'brand',
  design:      'accent',
  writing:     'default',
  art:         'accent',
  community:   'success',
  leadership:  'warning',
}

const socialIcons: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: 'true' }>> = {
  youtube:   Youtube,
  instagram: Instagram,
  twitter:   Twitter,
  github:    Github,
  linkedin:  Linkedin,
  website:   Globe,
}

export function TeamGrid({ members, activeDept }: TeamGridProps) {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-base-950">
      <Container>
        <div className="mb-10 sm:mb-14">
          <DeptFilter activeDept={activeDept} basePath="/team" />
        </div>

        {members.length === 0 ? (
          <div className="text-center py-16 sm:py-20 rounded-3xl border border-dashed border-glass bg-base-900/30 max-w-xl mx-auto px-4">
            <p className="text-body text-base-100/50">No team members found in this department.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {members.map((rawMember) => {
              const member = rawMember as {
                id: string
                name: string
                role: string
                department: string
                customDepartment?: string
                bio?: string
                photo?: unknown
                socialLinks?: SocialLink[]
              }
              const deptLabel =
                member.department === 'other' && member.customDepartment
                  ? member.customDepartment
                  : member.department

              const photoUrl = payloadImageUrl(member.photo as Parameters<typeof payloadImageUrl>[0])
              const photoAlt =
                typeof member.photo === 'object' && member.photo !== null
                  ? (member.photo as { alt?: string }).alt ?? member.name
                  : member.name

              const socials = member.socialLinks ?? []

              return (
                <div
                  key={member.id}
                  className="group relative flex flex-col rounded-3xl border border-glass bg-gradient-to-b from-base-900/95 via-base-900/75 to-base-950/90 backdrop-blur-xl overflow-hidden hover:border-glass-strong transition-all duration-normal hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-15px_rgba(108,99,255,0.25)]"
                >
                  {/* Portrait Media Header */}
                  <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-base-950 border-b border-glass">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={photoAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-slow"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-900/30 via-base-900 to-base-950">
                        <span className="font-display font-extrabold text-[5rem] text-brand-300/40 select-none">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Gradient overlay fading image into card body */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-base-950/90 via-base-950/20 to-transparent"
                    />

                    {/* Pinned department badge */}
                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                      <Badge variant={deptBadge[member.department] ?? 'default'} size="sm" showDot>
                        {deptLabel}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6 md:p-7 justify-between space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-h4 sm:text-h3 text-base-100 mb-1 group-hover:text-brand-300 transition-colors">
                        {member.name}
                      </h3>

                      <p className="text-body-sm text-brand-400 font-semibold mb-3">
                        {member.role}
                      </p>

                      {member.bio && (
                        <p className="text-body-sm text-base-100/65 leading-relaxed line-clamp-3">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    {/* Social Link Pill Bar */}
                    {socials.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-glass">
                        {socials.map((s) => {
                          const Icon = socialIcons[s.platform]
                          if (!Icon) return null
                          return (
                            <a
                              key={s.platform}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} on ${s.platform}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-label font-medium bg-base-950/80 border border-glass text-base-100/60 hover:text-white hover:border-brand-400 hover:bg-brand-500/20 transition-all duration-fast min-h-[36px]"
                            >
                              <Icon size={13} aria-hidden="true" />
                              <span className="capitalize">{s.platform}</span>
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
