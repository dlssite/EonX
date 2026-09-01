'use client'

import Image from 'next/image'
import { Youtube, Instagram, Twitter, Github } from 'lucide-react'
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
}

export function TeamGrid({ members, activeDept }: TeamGridProps) {
  return (
    <section className="py-24 bg-base-950">
      <Container>
        <div className="mb-14">
          <DeptFilter activeDept={activeDept} basePath="/team" />
        </div>

        {members.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-glass bg-base-900/30">
            <p className="text-body text-base-100/50">No team members found in this department.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((rawMember) => {
              const member = rawMember as {
                id: string
                name: string
                role: string
                department: string
                customDepartment?: string
                bio?: string
                photo?: { url?: string; alt?: string }
                socialLinks?: SocialLink[]
              }
              const deptLabel =
                member.department === 'other' && member.customDepartment
                  ? member.customDepartment
                  : member.department
              const rawPhoto = member.photo as { url?: string; alt?: string } | null ?? null
              const photo = rawPhoto
                ? { ...rawPhoto, url: payloadImageUrl(rawPhoto.url) }
                : null
              const socials = member.socialLinks ?? []

              return (
                <div
                  key={member.id}
                  className="group relative flex flex-col p-7 rounded-3xl border border-glass bg-gradient-to-b from-base-900/90 via-base-900/60 to-base-950/80 backdrop-blur-md hover:border-glass-strong transition-all duration-normal hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(108,99,255,0.2)]"
                >
                  {/* Subtle hover accent light */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-brand-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-slow pointer-events-none"
                  />

                  {/* Photo container with glowing specular ring on hover */}
                  <div className="relative w-22 h-22 rounded-2xl overflow-hidden bg-base-950 mb-6 border border-glass group-hover:border-brand-400 group-hover:shadow-[0_0_24px_0_rgba(108,99,255,0.35)] transition-all duration-normal">
                    {photo?.url ? (
                      <Image
                        src={photo.url}
                        alt={photo.alt ?? member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-slow"
                        sizes="88px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-900/30 to-base-950">
                        <span className="font-display font-bold text-h2 text-brand-300">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Department Badge */}
                  <Badge variant={deptBadge[member.department] ?? 'default'} size="sm" showDot className="mb-3.5 self-start">
                    {deptLabel}
                  </Badge>

                  {/* Name & Role */}
                  <h3 className="font-display font-bold text-h4 text-base-100 mb-1 group-hover:text-brand-300 transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-body-sm text-brand-400/90 font-medium mb-3">
                    {member.role}
                  </p>

                  {member.bio && (
                    <p className="text-body-sm text-base-100/60 leading-relaxed mb-6 line-clamp-3">
                      {member.bio}
                    </p>
                  )}

                  {/* Social link buttons */}
                  {socials.length > 0 && (
                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-glass">
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
                            className="p-2 rounded-full bg-base-950 border border-glass text-base-100/60 hover:text-brand-300 hover:border-brand-400 hover:bg-brand-500/10 transition-all"
                          >
                            <Icon size={14} aria-hidden="true" />
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
