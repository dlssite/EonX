import Image from 'next/image'
import { Linkedin, Twitter, Github, Globe } from 'lucide-react'
import { payloadImageUrl } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { DeptFilter } from '@/components/sections/DeptFilter'

type SocialLink = { platform: string; url: string }

type TeamMember = {
  id: string
  name: unknown
  role: unknown
  department: unknown
  customDepartment: unknown
  bio: unknown
  photo: unknown
  socialLinks: unknown
}

export type { TeamMember }

type TeamGridProps = {
  members: TeamMember[]
  activeDept: string
}

const deptBadge: Record<string, 'brand' | 'accent' | 'default'> = {
  leadership: 'brand',
  engineering: 'accent',
  design: 'default',
  writing: 'default',
  art: 'default',
  community: 'default',
  other: 'default',
}

const socialIcons: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: 'true' }>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  website: Globe,
}

export function TeamGrid({ members, activeDept }: TeamGridProps) {
  return (
    <section className="py-24">
      <Container>
        <DeptFilter activeDept={activeDept} basePath="/team" />

        {members.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-body text-base-100/50">No team members found in this department.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
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
              // Use customDepartment label when department is 'other'
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
                  className="group p-6 rounded-2xl border border-base-800 bg-base-900 hover:border-brand-500/30 transition-all duration-normal hover:-translate-y-1"
                >
                  {/* Photo */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-base-800 mb-4 border border-base-700">
                    {photo?.url ? (
                      <Image
                        src={photo.url}
                        alt={photo.alt ?? member.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display font-bold text-h3 text-base-700">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <Badge variant={deptBadge[member.department] ?? 'default'} size="sm" className="mb-3">
                    {deptLabel}
                  </Badge>
                  <h3 className="font-display font-bold text-h4 text-base-100 mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-body-sm text-base-100/50 mb-3">{member.role}</p>
                  {member.bio && (
                    <p className="text-body-sm text-base-100/60 leading-relaxed mb-4 line-clamp-3">
                      {member.bio}
                    </p>
                  )}

                  {/* Social links */}
                  {socials.length > 0 && (
                    <div className="flex items-center gap-2">
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
                            className="p-1.5 rounded-md text-base-100/40 hover:text-base-100 hover:bg-base-800 transition-colors duration-fast"
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
