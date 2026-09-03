import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Opportunities: CollectionConfig = {
  slug: 'opportunities',
  access: {
    read: () => true,
    create: ({ req }) => req.user !== null,
    update: ({ req }) => req.user !== null,
    delete: ({ req }) => req.user !== null,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'department', 'isOpen'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Role title, e.g. "Community Moderator"' },
    },
    {
      name: 'department',
      type: 'select',
      required: true,
      options: [
        { label: 'Engineering', value: 'engineering' },
        { label: 'Design', value: 'design' },
        { label: 'Writing', value: 'writing' },
        { label: 'Art', value: 'art' },
        { label: 'Community', value: 'community' },
        { label: 'Other (custom)', value: 'other' },
      ],
    },
    {
      name: 'customDepartment',
      type: 'text',
      admin: {
        description: 'Required when department is "Other (custom)". This label is shown on the site.',
        condition: (_data, siblingData) => siblingData?.department === 'other',
      },
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
      admin: { description: 'What the role involves, what you\'ll work on, what you\'ll gain.' },
    },
    {
      name: 'skills',
      type: 'array',
      fields: [{ name: 'skill', type: 'text', required: true }],
      admin: { description: 'Skills needed for this role.' },
    },
    {
      name: 'timeCommitment',
      type: 'text',
      admin: { description: 'e.g. "4–6 hours/week", "Flexible"' },
    },
    {
      name: 'applyUrl',
      type: 'text',
      admin: { description: 'Link to application form or mailto:. Leave blank to use the contact form.' },
    },
    {
      name: 'isRemote',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Is this role remote-friendly?' },
    },
    {
      name: 'isOpen',
      type: 'checkbox',
      defaultValue: true,
      required: true,
      admin: {
        description: 'Only open roles are visible on the Volunteer page.',
        position: 'sidebar',
      },
    },
  ],
}
