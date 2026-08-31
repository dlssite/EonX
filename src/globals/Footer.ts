import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Settings' },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'Short line displayed below the logo in the footer.' },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      maxRows: 4,
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
            {
              name: 'isExternal',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
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
      name: 'legalText',
      type: 'text',
      admin: { description: 'Copyright/legal notice. Year is appended automatically.' },
      defaultValue: 'Eonrisia. All rights reserved.',
    },
  ],
}
