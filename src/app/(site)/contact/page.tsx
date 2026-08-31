import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/utils'
import { PageHero } from '@/components/sections/PageHero'
import { ContactForms } from '@/components/sections/ContactForms'
import { Container } from '@/components/ui/Container'

export const revalidate = false // Static — form handled server-side

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
        eyebrow="Contact"
        headline="Let's talk."
        lead="Whether you're a potential partner, a member of the press, or just curious — we'd love to hear from you. We typically respond within 2–3 business days."
      />

      <section className="py-16 md:py-20">
        <Container>
          <ContactForms />
        </Container>
      </section>
    </>
  )
}
