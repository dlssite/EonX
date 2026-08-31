import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DeptFilter } from '@/components/sections/DeptFilter'
import { MapPin, Clock } from 'lucide-react'

type Skill = { skill: string }

type Opportunity = {
  id: string
  title: unknown
  department: unknown
  customDepartment: unknown
  timeCommitment: unknown
  isRemote: unknown
  skills: unknown
  applyUrl: unknown
}

export type { Opportunity }

type OpportunitiesListProps = {
  opportunities: Opportunity[]
  activeDept: string
}

const deptBadge: Record<string, 'brand' | 'accent' | 'default'> = {
  engineering: 'accent',
  design: 'brand',
  writing: 'default',
  art: 'default',
  community: 'default',
  other: 'default',
}

export function OpportunitiesList({ opportunities, activeDept }: OpportunitiesListProps) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="mb-8">
          <p className="eyebrow mb-4">Open Roles</p>
          <DeptFilter activeDept={activeDept} />
        </div>

        {opportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 rounded-2xl border border-dashed border-base-700 bg-base-900/40">
            <div className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center bg-base-800 border border-base-700">
              <MapPin size={22} className="text-base-100/30" aria-hidden="true" />
            </div>
            <p className="font-display font-bold text-h4 text-base-100/60 mb-2">
              No open roles right now
            </p>
            <p className="text-body-sm text-base-100/35 max-w-xs leading-relaxed">
              We&apos;re not actively recruiting in this area, but we&apos;re always open to
              hearing from talented people.
            </p>
            <a
              href="/contact"
              className="mt-6 text-body-sm font-body font-medium text-brand-400 hover:text-brand-300 transition-colors duration-fast"
            >
              Reach out anyway →
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {opportunities.map((opp) => {
              const skills = (opp.skills as Skill[]) ?? []
              const dept = opp.department as string
              // Use customDepartment label when department is 'other'
              const deptLabel =
                dept === 'other' && opp.customDepartment
                  ? (opp.customDepartment as string)
                  : dept
              return (
                <div
                  key={opp.id}
                  className="group p-6 rounded-2xl border border-base-700 bg-base-900 hover:border-brand-500/40 hover:bg-base-800/50 transition-all duration-normal"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant={deptBadge[dept] ?? 'default'} size="sm">
                          {deptLabel}
                        </Badge>
                        {Boolean(opp.isRemote) && (
                          <span className="inline-flex items-center gap-1 text-label text-base-100/40">
                            <MapPin size={10} aria-hidden="true" /> Remote
                          </span>
                        )}
                        {opp.timeCommitment ? (
                          <span className="inline-flex items-center gap-1 text-label text-base-100/40">
                            <Clock size={10} aria-hidden="true" />
                            {String(opp.timeCommitment)}
                          </span>
                        ) : null}
                      </div>
                      <h3 className="font-display font-bold text-h4 text-base-100 mb-2">
                        {opp.title as string}
                      </h3>
                      {skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {skills.map(({ skill }) => (
                            <span key={skill} className="px-2 py-0.5 text-label rounded-md bg-base-800 border border-base-700 text-base-100/50">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0">
                      <Button href={(opp.applyUrl as string) || '/contact'} variant="secondary" size="sm">
                        Apply
                      </Button>
                    </div>
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
