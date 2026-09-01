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
          <div className="text-center py-20 rounded-3xl border border-dashed border-glass-subtle bg-base-900/30">
            <p className="text-body text-base-100/50">No team members found in this department.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="group flex flex-col p-7 rounded-3xl border border-glass bg-base-900/70 backdrop-blur-md hover:border-glass-hover transition-all duration-normal hover:-translate-y-1.5 shadow-sm hover:shadow-card-hover"
                >
                  {/* Photo container */}
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-base-950 mb-5 border border-glass-subtle group-hover:border-brand-500/50 transition-colors">
                    {photo?.url ? (
                      <Image
                        src={photo.url}
                        alt={photo.alt ?? member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-slow"
                        sizes="80px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-base-900 to-base-950">
                        <span className="font-display font-bold text-h3 text-brand-300">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <Badge variant={deptBadge[member.department] ?? 'default'} size="sm" showDot className="mb-3.5 self-start">
                    {deptLabel}
                  </Badge>

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

                  {/* Social links */}
                  {socials.length > 0 && (
                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-glass-subtle">
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
