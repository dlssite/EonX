import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: { group: 'Settings' },
  fields: [
    {
      name: 'links',
      type: 'array',
      label: 'Nav Links',
      admin: { description: 'Primary navigation links shown in the header.' },
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
          admin: { description: 'Relative path (e.g. /about) or full URL for external links.' },
        },
        {
          name: 'isExternal',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Opens in a new tab with rel="noopener noreferrer".' },
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      required: true,
      defaultValue: 'Get Involved',
      admin: { description: 'Primary call-to-action button label in the header.' },
    },
    {
      name: 'ctaHref',
      type: 'text',
      required: true,
      defaultValue: '/volunteer',
      admin: { description: 'Where the header CTA button links to.' },
    },
  ],
}
