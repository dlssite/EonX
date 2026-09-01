import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { PageHero } from '@/components/sections/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { Container } from '@/components/ui/Container'
import { Building2, Globe, Sparkles } from 'lucide-react'

export const metadata: Metadata = generateMetadata({
  title: 'Partnerships & Alliances | Eonrisia',
  description:
    'Partner with Eonrisia on world-building initiatives, open-source technology, academic research, and cultural co-productions.',
  canonical: '/partnerships',
})

const partnershipTracks = [
  {
    icon: Building2,
    title: 'Publishers & Studios',
    description:
      'Co-develop graphic novels, audio dramas, games, or film concepts within our open fictional universe frameworks.',
  },
  {
    icon: Sparkles,
    title: 'Tool & Infrastructure Sponsors',
    description:
      'Provide hosting, hardware grants, or developer tooling licenses to empower our non-profit collective of creators.',
  },
  {
    icon: Globe,
    title: 'Academic & Cultural Institutions',
    description:
      'Collaborate on digital storytelling research, open narrative archives, and community governance case studies.',
  },
]

export default function PartnershipsPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Partnerships', url: absoluteUrl('/partnerships') },
        ])}
      />
      <PageHero
        eyebrow="Alliances & Collaborations"
        headline="Build with our collective."
        lead="We align with studios, foundations, tool creators, and academic institutions who share our commitment to open fictional worlds and creator sovereignty."
      />

      {/* ── Partnership Tracks Grid ──────────────────────────────── */}
      <section className="py-24 md:py-32 bg-base-950">
        <Container>
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <p className="eyebrow mb-3">Collaboration Tracks</p>
            <h2 className="font-display font-extrabold text-h2 md:text-[2.75rem] text-base-100 tracking-tight">
              How we partner.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
            {partnershipTracks.map((track) => {
              const Icon = track.icon
              return (
                <div
                  key={track.title}
                  className="p-8 rounded-3xl border border-glass bg-base-900/70 backdrop-blur-md hover:border-glass-hover transition-all duration-normal group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-base-950 border border-glass-subtle flex items-center justify-center mb-6 group-hover:border-brand-500/50 transition-colors">
                      <Icon size={22} className="text-brand-400" />
                    </div>
                    <h3 className="font-display font-bold text-h3 text-base-100 mb-3 group-hover:text-brand-300 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-body-sm text-base-100/65 leading-relaxed">
                      {track.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto text-center border border-brand-500/30">
            <h3 className="font-display font-bold text-h3 text-base-100 mb-3">
              Explore a Formal Partnership
            </h3>
            <p className="text-body text-base-100/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              Reach out directly to our partnerships office to discuss co-production, tooling sponsorships, or institutional alliances.
            </p>
            <Link
              href="/contact?inquiry=partner"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-body font-body font-semibold text-white bg-brand-500 hover:bg-brand-400 transition-all duration-fast shadow-[0_0_24px_0_rgba(108,99,255,0.4)] sheen-sweep"
            >
              <span>Initiate Partnership Inquiry</span>
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand
        headline="Ready to explore synergy?"
        subtext="Let's schedule an initial discovery discussion with our partnerships director."
        primaryLabel="Contact Partnerships"
        primaryHref="/contact?inquiry=partner"
        secondaryLabel="About Our Governance"
        secondaryHref="/governance"
      />
    </>
  )
}
