import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'role', 'department', 'isPublished'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: { description: 'Job title or role, e.g. "Lead Developer"' },
    },
    {
      name: 'department',
      type: 'select',
      required: true,
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Design', value: 'design' },
        { label: 'Writing', value: 'writing' },
        { label: 'Art', value: 'art' },
        { label: 'Community', value: 'community' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'Short bio. Keep to 200 characters or fewer.',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Square portrait photo (1:1 ratio, min 400×400px)' },
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'X (Twitter)', value: 'twitter' },
            { label: 'GitHub', value: 'github' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Website', value: 'website' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: { description: 'Full URL including https://' },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first. Use to control display order.' },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      required: true,
      admin: {
        description: 'Only published members appear on the site.',
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from name. URL-safe.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return (data.name as string)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
  ],
}
