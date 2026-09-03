'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Clock, ArrowRight, Eye, Briefcase, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { DeptFilter } from './DeptFilter'

type Skill = {
  skill: string
  id?: string | null
}

type Opportunity = {
  id: string
  title: unknown
  department: unknown
  customDepartment?: unknown
  isRemote?: unknown
  timeCommitment?: unknown
  description?: unknown
  responsibilities?: unknown
  requirements?: unknown
  skills?: unknown
  applyUrl?: unknown
}

export type { Opportunity }

type OpportunitiesListProps = {
  opportunities: Opportunity[]
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

export function OpportunitiesList({ opportunities, activeDept }: OpportunitiesListProps) {
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null)

  return (
    <section className="py-16 bg-base-950">
      <Container>
        <div className="mb-14">
          <DeptFilter activeDept={activeDept} />
        </div>

        {opportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 rounded-3xl border border-dashed border-glass bg-base-900/30">
            <div className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center bg-base-900 border border-glass">
              <MapPin size={22} className="text-base-100/40" aria-hidden="true" />
            </div>
            <p className="font-display font-bold text-h4 text-base-100/70 mb-2">
              No open roles in this department right now
            </p>
            <p className="text-body-sm text-base-100/40 max-w-xs leading-relaxed">
              We&apos;re not actively recruiting in this specific discipline, but we are always eager to hear from dedicated creators.
            </p>
            <Link
              href="/contact"
              className="mt-6 text-body-sm font-body font-semibold text-brand-400 hover:text-brand-300 transition-colors"
            >
              Reach out anyway →
            </Link>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {opportunities.map((opp) => {
              const skills = (opp.skills as Skill[]) ?? []
              const dept = opp.department as string
              const deptLabel =
                dept === 'other' && opp.customDepartment
                  ? (opp.customDepartment as string)
                  : dept

              return (
                <div
                  key={opp.id}
                  className="group relative p-5 sm:p-7 md:p-8 rounded-3xl border border-glass bg-gradient-to-r from-base-900/90 via-base-900/70 to-base-950/80 backdrop-blur-md hover:border-glass-strong transition-all duration-normal shadow-sm hover:shadow-[0_16px_40px_-15px_rgba(108,99,255,0.2)]"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                        <Badge variant={deptBadge[dept] ?? 'default'} size="sm" showDot>
                          {deptLabel}
                        </Badge>
                        {Boolean(opp.isRemote) && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-xs sm:text-label font-body bg-base-950 border border-glass text-base-100/60">
                            <MapPin size={11} aria-hidden="true" className="text-brand-400" /> Remote / Flexible
                          </span>
                        )}
                        {opp.timeCommitment ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-xs sm:text-label font-body bg-base-950 border border-glass text-base-100/60">
                            <Clock size={11} aria-hidden="true" className="text-brand-400" />
                            {String(opp.timeCommitment)}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="font-display font-bold text-h4 sm:text-h3 text-base-100 mb-2 sm:mb-3 group-hover:text-brand-300 transition-colors duration-fast">
                        {opp.title as string}
                      </h3>

                      {skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {skills.map(({ skill }) => (
                            <span
                              key={skill}
                              className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-[0.75rem] sm:text-label font-body font-medium rounded-full bg-base-950 border border-glass text-base-100/70"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-glass">
                      <button
                        onClick={() => setSelectedOpp(opp)}
                        className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-full text-body-sm font-body font-medium text-base-100 border border-glass bg-base-950/60 hover:bg-base-800/80 transition-all duration-fast min-h-[44px]"
                      >
                        <Eye size={14} aria-hidden="true" />
                        <span>Role Details</span>
                      </button>

                      <Link
                        href={(opp.applyUrl as string) || '/contact'}
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-full text-body-sm font-body font-semibold text-white bg-brand-500 hover:bg-brand-400 transition-all duration-fast shadow-[0_0_20px_0_rgba(108,99,255,0.35)] sheen-sweep min-h-[44px]"
                      >
                        <span>Apply</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Container>

      {/* ── Quick-View Application Drawer ─────────────────────── */}
      <Drawer
        isOpen={Boolean(selectedOpp)}
        onClose={() => setSelectedOpp(null)}
        title={String(selectedOpp?.title ?? 'Role Overview')}
        description={`Volunteer Position · ${String(selectedOpp?.department ?? 'General')}`}
      >
        {selectedOpp && (
          <div className="space-y-6">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={deptBadge[String(selectedOpp.department)] ?? 'default'} showDot>
                {String(selectedOpp.department)}
              </Badge>
              {Boolean(selectedOpp.isRemote) && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-label font-body bg-base-950 border border-glass text-base-100/60">
                  <MapPin size={11} /> 100% Remote
                </span>
              )}
              {Boolean(selectedOpp.timeCommitment) && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-label font-body bg-base-950 border border-glass text-base-100/60">
                  <Clock size={11} /> {String(selectedOpp.timeCommitment)}
                </span>
              )}
            </div>

            {/* Role Purpose */}
            <div className="p-6 rounded-2xl border border-glass bg-base-950/60 space-y-3">
              <div className="flex items-center gap-2 text-label font-body font-semibold uppercase tracking-widest text-brand-400">
                <Briefcase size={14} />
                <span>What You Will Do</span>
              </div>
              <p className="text-body-sm text-base-100/75 leading-relaxed">
                As a volunteer in the {String(selectedOpp.department)} division, you will collaborate directly with our core stewards and fellow creators, building real assets, software, or narrative frameworks for active projects.
              </p>
            </div>

            {/* Contributor Benefits */}
            <div className="p-6 rounded-2xl border border-glass bg-base-950/60 space-y-3">
              <div className="flex items-center gap-2 text-label font-body font-semibold uppercase tracking-widest text-emerald-400">
                <CheckCircle2 size={14} />
                <span>What You Receive</span>
              </div>
              <ul className="space-y-2 text-body-sm text-base-100/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Verified contributor credits on official project releases</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Eonrisia contributor tokens unlocking ecosystem benefits</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Direct peer collaboration with international creative leads</span>
                </li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-glass flex flex-col sm:flex-row gap-3">
              <Link
                href={(selectedOpp.applyUrl as string) || `/contact?inquiry=volunteer&role=${encodeURIComponent(String(selectedOpp.title))}`}
                onClick={() => setSelectedOpp(null)}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-body font-body font-semibold text-white bg-brand-500 hover:bg-brand-400 transition-all duration-fast shadow-[0_0_24px_0_rgba(108,99,255,0.4)] sheen-sweep"
              >
                <span>Apply for This Role</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </Drawer>
    </section>
  )
}
