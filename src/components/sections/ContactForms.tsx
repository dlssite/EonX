'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'
import { submitInquiry } from '@/app/actions/submitInquiry'

type InquiryType = 'contact' | 'partner' | 'press'

const tabs: { value: InquiryType; label: string }[] = [
  { value: 'contact', label: 'General' },
  { value: 'partner', label: 'Partner & Donor' },
  { value: 'press', label: 'Press' },
]

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  organization: z.string().optional(),
  message: z.string().min(10, 'Please write a brief message'),
  honeypot: z.string().max(0, 'Bot detected'),
})

type FormData = z.infer<typeof schema>

export function ContactForms() {
  const [activeType, setActiveType] = useState<InquiryType>('contact')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    const result = await submitInquiry({ ...data, type: activeType })
    if (result.success) {
      setSuccess(true)
      reset()
    }
  }

  if (success) {
    return (
      <div className="max-w-lg text-center mx-auto py-16">
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-6" aria-hidden="true" />
        <h2 className="font-display font-bold text-h3 text-base-100 mb-3">Message sent.</h2>
        <p className="text-body text-base-100/60">
          Thanks for reaching out. We typically respond within 2–3 business days.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-8 text-body-sm text-brand-400 hover:text-brand-300 transition-colors duration-fast"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
      {/* Left — context */}
      <div>
        <h2 className="font-display font-bold text-h2 text-base-100 tracking-tight mb-4">
          Get in touch.
        </h2>
        <p className="text-body text-base-100/55 leading-relaxed mb-8">
          Choose the type of inquiry so we can route your message to the right people.
        </p>

        <div className="space-y-3">
          {[
            { label: 'General', email: 'hello@eonrisia.org' },
            { label: 'Partnerships', email: 'partners@eonrisia.org' },
            { label: 'Press', email: 'press@eonrisia.org' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between px-4 py-3 rounded-xl border border-base-700 bg-base-900">
              <span className="text-body-sm font-body font-medium text-base-100/50">{item.label}</span>
              <a
                href={`mailto:${item.email}`}
                className="text-body-sm text-brand-400 hover:text-brand-300 transition-colors duration-fast font-body"
              >
                {item.email}
              </a>
            </div>
          ))}
        </div>

        <p className="text-body-sm text-base-100/35 mt-6">
          We typically respond within 2–3 business days.
        </p>
      </div>

      {/* Right — form */}
      <div>
        {/* Type tabs */}
        <div role="tablist" aria-label="Inquiry type" className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeType === tab.value}
              onClick={() => setActiveType(tab.value)}
              className={cn(
                'px-4 py-1.5 rounded-lg text-body-sm font-body font-medium transition-all duration-fast border',
                activeType === tab.value
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'bg-base-900 text-base-100/50 border-base-700 hover:text-base-100 hover:border-brand-500/50 hover:bg-base-800',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Honeypot */}
          <input
            type="text"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
            {...register('honeypot')}
          />

          <Input
            label="Full name"
            required
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Email address"
            type="email"
            required
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />

          {(activeType === 'partner' || activeType === 'press') && (
            <Input
              label="Organization"
              autoComplete="organization"
              error={errors.organization?.message}
              {...register('organization')}
            />
          )}

          <Textarea
            label="Message"
            required
            error={errors.message?.message}
            placeholder="Tell us what's on your mind…"
            {...register('message')}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full"
          >
            Send message
          </Button>
        </form>
      </div>
    </div>
  )
}
