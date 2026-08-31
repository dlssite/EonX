'use server'

import { z } from 'zod'
import { getPayload } from '@/lib/payload'
import { headers } from 'next/headers'

const inquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  organization: z.string().max(200).optional(),
  message: z.string().min(10).max(2000),
  type: z.enum(['contact', 'partner', 'press', 'commission']),
  honeypot: z.string().max(0),
})

type SubmitInquiryInput = z.infer<typeof inquirySchema>

export async function submitInquiry(
  input: SubmitInquiryInput,
): Promise<{ success: boolean; error?: string }> {
  // Server-side validation — never trust client
  const result = inquirySchema.safeParse(input)
  if (!result.success) {
    return { success: false, error: 'Invalid form data.' }
  }

  // Honeypot check
  if (result.data.honeypot) {
    // Silently succeed to not tip off bots
    return { success: true }
  }

  try {
    const payload = await getPayload()
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] ?? ''

    await payload.create({
      collection: 'inquiries',
      data: {
        type: result.data.type,
        status: 'new',
        name: result.data.name,
        email: result.data.email,
        organization: result.data.organization,
        message: result.data.message,
        ipAddress: ip,
      },
    })

    return { success: true }
  } catch (err) {
    console.error('submitInquiry error:', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
