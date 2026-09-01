import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { PageHero } from '@/components/sections/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { Container } from '@/components/ui/Container'
import { FileText, Download, MessageSquare } from 'lucide-react'

export const metadata: Metadata = generateMetadata({
  title: 'Press & Media Kit | Eonrisia',
  description:
    'Official Eonrisia press kit, brand guidelines, downloadable media assets, and executive interview contacts.',
  canonical: '/press',
})

const pressResources = [
  {
    icon: Download,
    title: 'Brand Assets & Vectors',
    description:
      'Download high-resolution SVG and PNG logos, lockups, color palettes, and typography guidance for publication use.',
  },
  {
    icon: FileText,
    title: 'Fact Sheet & Backgrounder',
    description:
      'Key organizational milestones, leadership biographies, contributor statistics, and mission overview documents.',
  },
  {
    icon: MessageSquare,
    title: 'Interview & Commentary',
    description:
      'Request interviews with our lead world-builders, constitutional stewards, and open-source engineers.',
  },
]

export default function PressPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Press', url: absoluteUrl('/press') },
        ])}
      />
      <PageHero
        eyebrow="Media Relations"
        headline="Press & Brand Kit"
        lead="Access official Eonrisia media kits, brand assets, organizational backgrounders, and interview coordination desks."
      />

      {/* ── Press Resources Grid ─────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-base-950">
        <Container>
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <p className="eyebrow mb-3">Press Room</p>
            <h2 className="font-display font-extrabold text-h2 md:text-[2.75rem] text-base-100 tracking-tight">
              Official assets & materials.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
            {pressResources.map((res) => {
              const Icon = res.icon
              return (
                <div
                  key={res.title}
                  className="p-8 rounded-3xl border border-glass bg-base-900/70 backdrop-blur-md hover:border-glass-hover transition-all duration-normal group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-base-950 border border-glass-subtle flex items-center justify-center mb-6 group-hover:border-brand-500/50 transition-colors">
                      <Icon size={22} className="text-brand-400" />
                    </div>
                    <h3 className="font-display font-bold text-h3 text-base-100 mb-3 group-hover:text-brand-300 transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-body-sm text-base-100/65 leading-relaxed">
                      {res.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Media Contact Box */}
          <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto text-center border border-brand-500/30">
            <h3 className="font-display font-bold text-h3 text-base-100 mb-3">
              Press Contact & Inquiries
            </h3>
            <p className="text-body text-base-100/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              For interview requests, podcast appearances, quote verifications, or embargo inquiries, contact our media relations desk directly.
            </p>
            <Link
              href="/contact?inquiry=press"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-body font-body font-semibold text-white bg-brand-500 hover:bg-brand-400 transition-all duration-fast shadow-[0_0_24px_0_rgba(108,99,255,0.4)] sheen-sweep"
            >
              <span>Contact Press Desk</span>
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand
        headline="Looking for stories about the creative commons?"
        subtext="Our stewards are available for keynote addresses, podcasts, panels, and in-depth profiles."
        primaryLabel="Inquire for Speaking"
        primaryHref="/contact?inquiry=press"
        secondaryLabel="About Eonrisia"
        secondaryHref="/about"
      />
    </>
  )
}
