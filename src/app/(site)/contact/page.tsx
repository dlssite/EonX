import { Suspense } from 'react'
import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { PageHero } from '@/components/sections/PageHero'
import { ContactForms } from '@/components/sections/ContactForms'
import { Container } from '@/components/ui/Container'

export const revalidate = false

export const metadata: Metadata = generateMetadata({
  title: 'Contact Eonrisia — Partnership, Press, and General Inquiries',
  description:
    'Get in touch with Eonrisia. For partnerships, donations, press inquiries, or general questions — we\'d love to hear from you.',
  canonical: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Contact', url: absoluteUrl('/contact') },
        ])}
      />

      <PageHero
        eyebrow="Contact Stewards"
        headline="Let's build something lasting together."
        lead="Whether you are an aspiring contributor, strategic partner, donor, or member of the press — we look forward to hearing from you."
      />

      <section className="py-16 md:py-24 bg-base-950">
        <Container>
          <Suspense fallback={<div className="text-center py-20 text-base-100/50">Loading contact system…</div>}>
            <ContactForms />
          </Suspense>
        </Container>
      </section>
    </>
  )
}
