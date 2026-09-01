import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { PageHero } from '@/components/sections/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { Container } from '@/components/ui/Container'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = generateMetadata({
  title: 'Donate & Support | Eonrisia',
  description:
    'Support Eonrisia directly. 100% transparent funding model empowering open world-building and indie creative tools.',
  canonical: '/donate',
})

const donationTiers = [
  {
    name: 'Supporter',
    amount: '$10 / mo',
    description: 'Back our continuous open-source maintenance and community initiatives.',
    benefits: [
      'Supporter badge on community discord',
      'Early access to serialized story releases',
      'Name in project supporter credits',
    ],
  },
  {
    name: 'Patron',
    amount: '$50 / mo',
    featured: true,
    description: 'Directly fund monthly creator micro-grants for artists and developers.',
    benefits: [
      'All Supporter benefits',
      'Monthly behind-the-scenes production debriefs',
      'Governance proposal feedback channels',
      'Physical print edition of annual anthology',
    ],
  },
  {
    name: 'Benefactor',
    amount: '$250 / mo',
    description: 'Underwrite whole software engines, major comic chapters, or world lore bibles.',
    benefits: [
      'All Patron benefits',
      'Quarterly 1-on-1 calls with core stewards',
      'Permanent Executive Benefactor credit on major releases',
      'Custom framed artwork print signed by lead artist',
    ],
  },
]

export default function DonatePage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Donate', url: absoluteUrl('/donate') },
        ])}
      />
      <PageHero
        eyebrow="Direct Patronage"
        headline="Fund independent creativity."
        lead="Eonrisia operates without advertising trackers or speculative crypto schemes. Your donations directly sponsor open tools, creator stipends, and accessible fictional worlds."
      />

      {/* ── Donation Allocations & Tiers ─────────────────────────── */}
      <section className="py-24 md:py-32 bg-base-950">
        <Container>
          {/* Transparency Statement */}
          <div className="max-w-4xl mx-auto mb-20">
            <p className="eyebrow mb-3">Our Stewardship Pledge</p>
            <h2 className="font-display font-extrabold text-h2 md:text-[2.75rem] text-base-100 tracking-tight leading-tight mb-8">
              Where your donation actually goes.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="p-7 rounded-2xl border border-glass bg-base-900/60 backdrop-blur-md text-center">
                <div className="font-display font-extrabold text-h2 text-brand-400 mb-1">70%</div>
                <div className="text-body-sm font-display font-bold text-base-100 mb-1">Creator Grants</div>
                <p className="text-label-xs text-base-100/50">Direct compensation to writers, artists, and developers</p>
              </div>

              <div className="p-7 rounded-2xl border border-glass bg-base-900/60 backdrop-blur-md text-center">
                <div className="font-display font-extrabold text-h2 text-accent-400 mb-1">20%</div>
                <div className="text-body-sm font-display font-bold text-base-100 mb-1">Infrastructure</div>
                <p className="text-label-xs text-base-100/50">Servers, domain assets, open developer tool licenses</p>
              </div>

              <div className="p-7 rounded-2xl border border-glass bg-base-900/60 backdrop-blur-md text-center">
                <div className="font-display font-extrabold text-h2 text-emerald-400 mb-1">10%</div>
                <div className="text-body-sm font-display font-bold text-base-100 mb-1">Legal & Reserve</div>
                <p className="text-label-xs text-base-100/50">Copyright protections and operational contingency</p>
              </div>
            </div>
          </div>

          {/* Patron Tiers */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="eyebrow mb-3">Patronage Tiers</p>
              <h3 className="font-display font-extrabold text-h2 text-base-100 tracking-tight">
                Support at any level.
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {donationTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`p-8 md:p-10 rounded-3xl border flex flex-col justify-between transition-all duration-normal ${
                    tier.featured
                      ? 'border-brand-500/50 bg-base-900 shadow-[0_0_40px_0_rgba(108,99,255,0.15)] relative scale-105 z-10'
                      : 'border-glass bg-base-900/60 backdrop-blur-md hover:border-glass-hover'
                  }`}
                >
                  <div>
                    {tier.featured && (
                      <span className="inline-block px-3 py-1 rounded-full text-label-xs font-mono font-bold uppercase tracking-widest bg-brand-500 text-white mb-6">
                        Most Popular
                      </span>
                    )}

                    <h4 className="font-display font-bold text-h3 text-base-100 mb-2">
                      {tier.name}
                    </h4>
                    <div className="font-display font-extrabold text-h2 text-base-100 mb-4">
                      {tier.amount}
                    </div>
                    <p className="text-body-sm text-base-100/60 mb-8 leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="space-y-3 mb-10">
                      {tier.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-body-sm text-base-100/75 leading-relaxed">
                          <CheckCircle2 size={16} className="text-brand-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/contact?inquiry=partner&tier=${encodeURIComponent(tier.name)}`}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-body-sm font-body font-semibold transition-all duration-fast ${
                      tier.featured
                        ? 'bg-brand-500 text-white hover:bg-brand-400 shadow-[0_0_24px_0_rgba(108,99,255,0.4)] sheen-sweep'
                        : 'border border-glass bg-base-950/60 text-base-100 hover:bg-base-800'
                    }`}
                  >
                    <span>Become a {tier.name}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        headline="Prefer custom or corporate sponsorship?"
        subtext="We offer tax-deductible institutional partnerships and custom matching grant opportunities."
        primaryLabel="Inquire About Sponsorships"
        primaryHref="/contact?inquiry=partner"
        secondaryLabel="Explore Partnerships"
        secondaryHref="/partnerships"
      />
    </>
  )
}
