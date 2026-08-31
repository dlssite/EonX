import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    group: 'Inbox',
    defaultColumns: ['name', 'email', 'type', 'status', 'createdAt'],
  },
  // Public can create (form submissions). Only admins can read/update.
  access: {
    create: () => true,
    read: ({ req }) => req.user !== null,
    update: ({ req }) => req.user !== null,
    delete: ({ req }) => {
      const user = req.user as { role?: string } | null
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'General Contact', value: 'contact' },
        { label: 'Partner / Donor', value: 'partner' },
        { label: 'Press', value: 'press' },
        { label: 'Commission', value: 'commission' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'organization',
      type: 'text',
      admin: { description: 'Company or organization name (Partner and Press types).' },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    // Commission-specific fields
    {
      name: 'projectType',
      type: 'text',
      admin: {
        condition: (data) => data?.type === 'commission',
        description: 'Type of project requested.',
      },
    },
    {
      name: 'budgetRange',
      type: 'text',
      admin: {
        condition: (data) => data?.type === 'commission',
      },
    },
    {
      name: 'timeline',
      type: 'text',
      admin: {
        condition: (data) => data?.type === 'commission',
      },
    },
    // Spam prevention — not shown in admin
    {
      name: 'ipAddress',
      type: 'text',
      admin: { hidden: true },
    },
  ],
  timestamps: true,
}
