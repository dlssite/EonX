import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { PageHero } from '@/components/sections/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { Container } from '@/components/ui/Container'
import { Sparkles, Code2, BookOpen, Layers } from 'lucide-react'

export const metadata: Metadata = generateMetadata({
  title: 'Work With Us | Eonrisia',
  description:
    'Commission Eonrisia for custom universe design, software engineering, lore bible development, and creative production.',
  canonical: '/work-with-us',
})

const services = [
  {
    icon: Sparkles,
    title: 'Universe Architecture & Lore Bibles',
    description:
      'We design sprawling, mathematically consistent fictional universes with comprehensive factions, timelines, geographies, and narrative rulebooks ready for game, comic, or film adaptations.',
  },
  {
    icon: Code2,
    title: 'Web Engineering & Digital Experiences',
    description:
      'Bespoke production web engines, interactive lore portals, CMS platforms, and custom 3D web experiences engineered with modern web standards and zero bloat.',
  },
  {
    icon: BookOpen,
    title: 'Narrative Design & Scriptwriting',
    description:
      'Multi-format writing services spanning game dialogue trees, graphic novel scripts, serialized fiction, and world compendiums written by experienced prose and comic authors.',
  },
  {
    icon: Layers,
    title: 'Creative Direction & Brand Worldbuilding',
    description:
      'Brand identities that live inside cohesive fictional or thematic worlds — transforming products and organizations into deeply engaging cultural lore.',
  },
]

export default function WorkWithUsPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Work With Us', url: absoluteUrl('/work-with-us') },
        ])}
      />
      <PageHero
        eyebrow="Creative Services & Engineering"
        headline="Commission our collective."
        lead="We partner with studios, publishers, indie creators, and organizations to design living fictional worlds, build performant software, and craft unforgettable interactive stories."
      />

      {/* ── Services Grid ────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-base-950">
        <Container>
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <p className="eyebrow mb-3">Capabilities</p>
            <h2 className="font-display font-extrabold text-h2 md:text-[2.75rem] text-base-100 tracking-tight">
              What we build for partners & clients.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-20">
            {services.map((srv) => {
              const Icon = srv.icon
              return (
                <div
                  key={srv.title}
                  className="p-8 md:p-10 rounded-3xl border border-glass bg-base-900/70 backdrop-blur-md hover:border-glass-hover transition-all duration-normal group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-base-950 border border-glass-subtle flex items-center justify-center mb-6 group-hover:border-brand-500/50 transition-colors">
                      <Icon size={22} className="text-brand-400" />
                    </div>
                    <h3 className="font-display font-bold text-h3 text-base-100 mb-3 group-hover:text-brand-300 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-body text-base-100/65 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Process Banner */}
          <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto text-center border border-brand-500/30">
            <h3 className="font-display font-bold text-h3 text-base-100 mb-3">
              Direct Collaboration with Core Creators
            </h3>
            <p className="text-body text-base-100/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              Every client project helps fund our open-source tools and contributor grants. We do not work on speculative crypto projects or unauthorized derivative work.
            </p>
            <Link
              href="/contact?inquiry=partner"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-body font-body font-semibold text-white bg-brand-500 hover:bg-brand-400 transition-all duration-fast shadow-[0_0_24px_0_rgba(108,99,255,0.4)] sheen-sweep"
            >
              <span>Submit a Project Inquiry</span>
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand
        headline="Have an ambitious world or engine in mind?"
        subtext="Tell us about your timeline, scope, and vision. We will prepare an initial assessment and proposal."
        primaryLabel="Start a Conversation"
        primaryHref="/contact?inquiry=partner"
        secondaryLabel="Explore Our Projects"
        secondaryHref="/projects"
      />
    </>
  )
}
