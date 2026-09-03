'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Mail, Handshake, Newspaper, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { submitInquiry } from '@/app/actions/submitInquiry'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  organization: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Bot detected'),
})

type FormData = z.infer<typeof schema>

const tabs = [
  { value: 'general',   label: 'General',       icon: Mail },
  { value: 'partner',   label: 'Partnerships',  icon: Handshake },
  { value: 'press',     label: 'Press & Media', icon: Newspaper },
  { value: 'volunteer', label: 'Volunteer',     icon: Users },
]

export function ContactForms() {
  const searchParams = useSearchParams()
  const inquiryParam = searchParams.get('inquiry')
  const roleParam = searchParams.get('role')

  const initialType =
    inquiryParam === 'partner' ||
    inquiryParam === 'press' ||
    inquiryParam === 'volunteer'
      ? inquiryParam
      : 'general'

  const [activeType, setActiveType] = useState<string>(initialType)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (roleParam) {
      setValue('message', `Hi Eonrisia team,\n\nI would love to get involved with the "${roleParam}" role. Here is a brief overview of my background: `)
    }
  }, [roleParam, setValue])

  async function onSubmit(data: FormData) {
    const inquiryType = (activeType === 'partner' || activeType === 'press' ? activeType : 'contact') as 'contact' | 'partner' | 'press' | 'commission'
    const result = await submitInquiry({ ...data, type: inquiryType })
    if (result.success) {
      setSuccess(true)
      reset()
    }
  }

  if (success) {
    return (
      <div className="glass-panel p-10 md:p-14 max-w-lg text-center mx-auto my-12 border border-brand-500/30">
        <div className="w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-brand-400" aria-hidden="true" />
        </div>
        <h2 className="font-display font-bold text-h3 text-base-100 mb-3">Message Dispatched</h2>
        <p className="text-body text-base-100/65 leading-relaxed mb-8">
          Thank you for reaching out to Eonrisia. Your message has been routed to our core stewards. We typically respond within 2–3 business days.
        </p>
        <Button
          onClick={() => setSuccess(false)}
          variant="secondary"
          size="md"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 max-w-6xl mx-auto py-8">

      {/* Left Column — Institutional Contact Routing */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div>
          <p className="eyebrow mb-3">Direct Inquiries</p>
          <h2 className="font-display font-extrabold text-h2 text-base-100 tracking-tight mb-4">
            Connect with our stewards.
          </h2>
          <p className="text-body text-base-100/65 leading-relaxed mb-8">
            Select your inquiry category so we can route your message directly to the appropriate coordinators and leadership team.
          </p>

          <div className="space-y-3">
            {[
              { label: 'General Inquiries', email: 'hello@eonrisia.org', desc: 'General questions & feedback' },
              { label: 'Partnerships & Donors', email: 'partners@eonrisia.org', desc: 'Sponsorships & collaborations' },
              { label: 'Press & Media', email: 'press@eonrisia.org', desc: 'Interviews & press assets' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-2xl border border-glass bg-base-900/60 backdrop-blur-md hover:border-glass-hover transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-body-sm font-display font-bold text-base-100">{item.label}</span>
                  <a
                    href={`mailto:${item.email}`}
                    className="text-label-xs font-mono text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    {item.email}
                  </a>
                </div>
                <p className="text-label-xs text-base-100/40 font-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-glass-subtle bg-base-950/40 mt-8">
          <p className="text-label-xs text-base-100/40 leading-relaxed font-body">
            🔒 Eonrisia respects your privacy. Inquiries are stored strictly for communication purposes and never shared with third parties.
          </p>
        </div>
      </div>

      {/* Right Column — Segmented Form */}
      <div className="lg:col-span-7 glass-panel p-5 sm:p-8 md:p-10">

        {/* Category Pill Switcher: 2x2 grid on mobile */}
        <div role="tablist" aria-label="Inquiry type" className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8 p-1 sm:p-1.5 rounded-2xl bg-base-950/60 border border-glass">
          {tabs.map((tab) => {
            const isSelected = activeType === tab.value
            const Icon = tab.icon
            return (
              <button
                key={tab.value}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveType(tab.value)}
                className={cn(
                  'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-xl text-body-sm font-body font-medium transition-all duration-fast select-none justify-center min-h-[44px]',
                  isSelected
                    ? 'bg-base-800 text-brand-300 font-semibold border border-glass shadow-sm'
                    : 'text-base-100/60 hover:text-base-100 hover:bg-base-800/40'
                )}
              >
                <Icon size={14} className={isSelected ? 'text-brand-400' : 'opacity-60'} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 sm:space-y-6">
          <input
            type="text"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
            {...register('honeypot')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <Input
              label="Full Name"
              required
              autoComplete="name"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email Address"
              type="email"
              required
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          {(activeType === 'partner' || activeType === 'press') && (
            <Input
              label="Organization or Publication"
              autoComplete="organization"
              error={errors.organization?.message}
              placeholder="e.g. Acme Media / Creative Studio"
              {...register('organization')}
            />
          )}

          <Textarea
            label="Message"
            required
            error={errors.message?.message}
            placeholder={
              activeType === 'partner'
                ? 'Tell us about your organization and potential partnership ideas…'
                : activeType === 'press'
                ? 'Include your publication name, story angle, and deadline…'
                : activeType === 'volunteer'
                ? 'Share your skills, portfolio or Github links, and available weekly hours…'
                : 'How can we help you?'
            }
            rows={5}
            {...register('message')}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full sm:w-auto min-h-[48px]"
          >
            Send Inquiry
          </Button>
        </form>
      </div>

    </div>
  )
}
