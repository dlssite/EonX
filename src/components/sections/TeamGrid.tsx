'use client'

import Image from 'next/image'
import { Youtube, Instagram, Twitter, Github, Globe, Linkedin } from 'lucide-react'
import { Container } from '@/components/ui/Container'
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
            {members.map((rawMember, index) => {
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
                  className="atlas-card atlas-card--person atlas-person-card group relative flex flex-col"
                >
                  <div className="atlas-card__media w-full">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={photoAlt}
                        fill
                        className="atlas-card__image"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display font-extrabold text-[5rem] text-brand-300/40 select-none">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    <span className="atlas-person-card__department">
                      <span className="atlas-person-card__mark" aria-hidden="true" />
                      {deptLabel}
                    </span>
                    <span className="atlas-person-card__index">
                      TEAM / {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="atlas-person-card__portrait-label" aria-hidden="true">
                      EONRISIA
                    </span>
                  </div>

                  <div className="atlas-card__body space-y-4">
                    <div>
                      <p className="atlas-person-card__role">{member.role}</p>
                      <h3 className="atlas-person-card__name">
                        {member.name}
                      </h3>
                      {member.bio && (
                        <p className="atlas-person-card__bio line-clamp-3">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    {/* Social Link Pill Bar */}
                    {socials.length > 0 && (
                      <div className="atlas-card__footer flex flex-wrap items-center gap-2 pt-4">
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
                              className="atlas-person-card__social"
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
