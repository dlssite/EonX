import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { PageHero } from '@/components/sections/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { Container } from '@/components/ui/Container'
import { Scale, CheckCircle2, Terminal } from 'lucide-react'

export const metadata: Metadata = generateMetadata({
  title: 'Governance & Constitution | Eonrisia',
  description:
    'Eonrisia official governance charters, constitutional bylaws, and organizational transparency documents.',
  canonical: '/governance',
})

const articles = [
  {
    code: 'ART-01',
    title: 'Separation of Organization and Lore',
    description:
      'Eonrisia strictly isolates real-world institutional operations and legal entities from in-universe fictional canons. Fictional media lives exclusively on dedicated project domains.',
  },
  {
    code: 'ART-02',
    title: 'Decentralized Creative Ownership',
    description:
      'Creators retain full personal ownership and copyright of their original works, granting Eonrisia perpetual distribution licenses under open-access covenants.',
  },
  {
    code: 'ART-03',
    title: 'Constitutional Amendment Supermajority',
    description:
      'Core bylaws and governance procedures require a two-thirds supermajority vote from active core stewards to enact amendments or structural changes.',
  },
  {
    code: 'ART-04',
    title: 'Anti-Speculation Standard',
    description:
      'Eonrisia explicitly rejects speculative financial engineering, token sales, and pay-to-win mechanics in all official tools, lore frameworks, and games.',
  },
  {
    code: 'ART-05',
    title: 'Open Source and Data Portability',
    description:
      'All internal tooling, web foundations, and software utilities built using collective treasury funds must be published under permissive open-source licenses.',
  },
  {
    code: 'ART-06',
    title: 'Contributor Credits & Recognition',
    description:
      'Every accepted contributor is entitled to immutable public recognition on project credits pages, release notes, and digital documentation.',
  },
  {
    code: 'ART-07',
    title: 'Transparent Fund Stewardship',
    description:
      'All donations, grant disbursements, and project revenues are audited annually and published in public governance transparency ledgers.',
  },
  {
    code: 'ART-08',
    title: 'Community Code of Conduct',
    description:
      'All participants, stewards, and contributors agree to maintain respectful, inclusive, and harassment-free creative spaces across all channels.',
  },
  {
    code: 'ART-09',
    title: 'Perpetual Archive Guarantee',
    description:
      'In the event of dissolution or restructuring, all published lore bibles and commons code must be transferred to public decentralized web archives.',
  },
]

export default function GovernancePage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Governance', url: absoluteUrl('/governance') },
        ])}
      />
      <PageHero
        eyebrow="Institutional Transparency"
        headline="Constitution & Bylaws"
        lead="Eonrisia is built on transparent constitutional rules designed to protect our creative commons and community contributors for decades to come."
      />

      {/* ── Governance Principles & Articles ─────────────────────── */}
      <section className="py-24 md:py-32 bg-base-950">
        <Container>
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <p className="eyebrow mb-3">Founding Pillars</p>
            <h2 className="font-display font-extrabold text-h2 md:text-[2.75rem] text-base-100 tracking-tight mb-4">
              Rules codified for generational durability.
            </h2>
            <p className="text-body-lg text-base-100/70 leading-relaxed">
              Unlike traditional studios that centralize power or Web3 DAOs plagued by speculation, Eonrisia pairs benevolent open stewardship with strict constitutional bylaws. Every member, lead, and founder is bound by these operational charters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
            <div className="p-8 rounded-3xl border border-glass bg-base-900/60 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-base-950 border border-glass-subtle flex items-center justify-center mb-6">
                <Scale size={22} className="text-brand-400" />
              </div>
              <h3 className="font-display font-bold text-h3 text-base-100 mb-2">
                Open Commons
              </h3>
              <p className="text-body-sm text-base-100/60 leading-relaxed">
                Creative assets and lore frameworks are protected against private enclosure and speculative dilution.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-glass bg-base-900/60 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-base-950 border border-glass-subtle flex items-center justify-center mb-6">
                <CheckCircle2 size={22} className="text-emerald-400" />
              </div>
              <h3 className="font-display font-bold text-h3 text-base-100 mb-2">
                Fair Attribution
              </h3>
              <p className="text-body-sm text-base-100/60 leading-relaxed">
                Every volunteer and creator receives immutable public credit and non-speculative contributor tokens.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-glass bg-base-900/60 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-base-950 border border-glass-subtle flex items-center justify-center mb-6">
                <Terminal size={22} className="text-accent-400" />
              </div>
              <h3 className="font-display font-bold text-h3 text-base-100 mb-2">
                Technical Rigor
              </h3>
              <p className="text-body-sm text-base-100/60 leading-relaxed">
                All production tools, web infrastructure, and software engines adhere to strict performance, accessibility, and security laws.
              </p>
            </div>
          </div>

          {/* ── Articles Grid ────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto">
            <h3 className="font-display font-bold text-h3 text-base-100 mb-8">
              Constitutional Articles
            </h3>

            <div className="space-y-4">
              {articles.map((art) => (
                <div
                  key={art.code}
                  className="p-6 md:p-7 rounded-2xl border border-glass bg-base-900/40 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-glass-hover transition-colors"
                >
                  <div>
                    <div className="text-label-xs font-mono text-brand-400 uppercase tracking-wider mb-1">
                      {art.code}
                    </div>
                    <h4 className="font-display font-bold text-body-lg text-base-100 mb-1">
                      {art.title}
                    </h4>
                    <p className="text-body-sm text-base-100/60">
                      {art.description}
                    </p>
                  </div>
                  <span className="shrink-0 px-3 py-1 rounded-full text-label-xs font-mono bg-base-950 text-base-100/50 border border-glass-subtle">
                    Active Law
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        headline="Have governance questions or proposals?"
        primaryLabel="Contact Legal & Governance"
        primaryHref="/contact?inquiry=general"
        secondaryLabel="About the Collective"
        secondaryHref="/about"
      />
    </>
  )
}
