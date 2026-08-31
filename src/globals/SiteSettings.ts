import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Eonrisia',
    },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'Short tagline used in the footer and meta fallbacks.' },
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Fallback meta description for pages that don\'t set their own. 120–155 chars.',
      },
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Fallback OG image (1200×630px). Used when a page has no custom OG image.' },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'YouTube', value: 'youtube' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'X (Twitter)', value: 'twitter' },
            { label: 'Discord', value: 'discord' },
            { label: 'GitHub', value: 'github' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'contactEmail',
      type: 'email',
      admin: { description: 'General contact email shown in the footer.' },
    },
  ],
}
