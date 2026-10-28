import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { PageHero } from '@/components/sections/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { Container } from '@/components/ui/Container'
import { Users, ShieldCheck, Award } from 'lucide-react'

export const metadata: Metadata = generateMetadata({
  title: 'Mission & Vision | Eonrisia',
  description:
    'Discover Eonrisia’s mission, community principles, and roadmap for building original creative worlds together.',
  canonical: '/mission',
})

const phases = [
  {
    title: 'Phase 1: Foundation & Core Tooling',
    description:
      'Launch the official organization portal, open developer SDKs, lore bible architecture, and onboarding infrastructure for early creative contributors.',
  },
  {
    title: 'Phase 2: Universe Expansion (Sanctyria)',
    description:
      'Roll out the Sanctyria sub-sites, serialized web fiction chapters, interactive faction world maps, character bibles, and initial web games.',
  },
  {
    title: 'Phase 3: Contributor Recognition & Participation',
    description:
      'Make clear contributor credits, review practices, and community participation part of how projects are maintained.',
  },
  {
    title: 'Phase 4: Decentralized Collective Governance',
    description:
      'Transition key project roadmaps, grant distributions, and constitutional charter updates to autonomous steward voting circles.',
  },
]

const contributionSteps = [
  {
    icon: Users,
    title: 'Contribute',
    description:
      'Writers, artists, developers, and other contributors bring original work and skills to shared projects.',
  },
  {
    icon: ShieldCheck,
    title: 'Review',
    description:
      'Stewards review submissions against the goals and guidelines of each project.',
  },
  {
    icon: Award,
    title: 'Recognize',
    description:
      'Accepted contributors receive clear credit, with opportunities to take part in the community around the work.',
  },
]

export default function MissionPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Mission', url: absoluteUrl('/mission') },
        ])}
      />
      <PageHero
        eyebrow="Our Mandate"
        headline="Building worlds that outlive us."
        lead="Eonrisia is an open community-driven organization dedicated to crafting deep fictional universes and the open-source creative tools that bring them to life."
      />

      {/* ── Core Mission Statement ──────────────────────────────── */}
      <section className="py-24 md:py-32 bg-base-950">
        <Container>
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow mb-4">The Mandate</p>
            <h2 className="font-display font-extrabold text-h1 md:text-[3.25rem] text-base-100 tracking-tight leading-[1.08] mb-8">
              Open worldbuilding.
              <br />
              <span className="text-accent-400 italic">Built together.</span>
            </h2>
            <div className="space-y-6 text-body-lg text-base-100/75 leading-relaxed">
              <p>
                Creative work can span many forms, but contributors do not always have a meaningful voice in how shared worlds are stewarded. Eonrisia is building a community-centered alternative grounded in original work and transparent governance.
              </p>
              <p>
                Our constitution puts community trust, transparency, and quality ahead of speed. We build with creators and keep the organization distinct from the fictional worlds it supports.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 4-Phase Growth Roadmap ─────────────────────────────── */}
      <section className="py-24 md:py-32 bg-base-900/40 border-y border-glass">
        <Container>
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow mb-3">Roadmap & Execution</p>
            <h2 className="font-display font-extrabold text-h2 md:text-[2.75rem] text-base-100 tracking-tight mb-14">
              How we scale the ecosystem.
            </h2>

            <div className="space-y-6">
              {phases.map((phase, i) => (
                <div
                  key={phase.title}
                  className="flex flex-col sm:flex-row items-start gap-6 p-7 md:p-8 rounded-3xl border border-glass bg-base-900/80 backdrop-blur-md hover:border-glass-hover transition-all duration-normal group"
                >
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center font-mono font-bold text-brand-400 text-body-lg group-hover:scale-105 group-hover:border-brand-400 transition-all">
                    0{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display font-bold text-h3 text-base-100 group-hover:text-brand-300 transition-colors">
                        {phase.title}
                      </h3>
                      {i === 1 && (
                        <span className="px-2.5 py-0.5 rounded-full text-label-xs font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Active Phase
                        </span>
                      )}
                    </div>
                    <p className="text-body text-base-100/65 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Contributor Recognition ──────────────────────────── */}
      <section className="py-24 md:py-32 bg-base-950">
        <Container>
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow mb-3">Contributor Recognition</p>
            <h2 className="font-display font-extrabold text-h2 md:text-[2.75rem] text-base-100 tracking-tight mb-6">
              Contribution has genuine value.
            </h2>
            <p className="text-body-lg text-base-100/70 leading-relaxed mb-12">
              Contributors should understand how their work is reviewed, how it will be credited, and how they can participate in the community around each project.
            </p>

            {/* 3-Step Cyclical Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {contributionSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.title}
                    className="p-8 rounded-3xl border border-glass bg-base-900/60 backdrop-blur-md flex flex-col justify-between group hover:border-glass-hover transition-all"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-base-950 border border-glass-subtle flex items-center justify-center mb-6 group-hover:border-brand-500/50 transition-colors">
                        <Icon size={22} className="text-brand-400" />
                      </div>
                      <div className="text-label-xs font-mono text-base-100/40 uppercase tracking-widest mb-1">
                        Step 0{i + 1}
                      </div>
                      <h3 className="font-display font-bold text-h3 text-base-100 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-body-sm text-base-100/60 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        headline="Make room for more voices."
        subtext="Join our community of artists, writers, and developers crafting open worlds."
        primaryLabel="Explore Volunteer Roles"
        primaryHref="/volunteer"
        secondaryLabel="View Our Projects"
        secondaryHref="/projects"
      />
    </>
  )
}
