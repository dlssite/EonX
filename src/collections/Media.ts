import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req }) => req.user !== null,
    update: ({ req }) => req.user !== null,
    delete: ({ req }) => req.user !== null,
  },
  admin: {
    group: 'Content',
  },
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card',      width: 800, height: 450, position: 'centre' },
      { name: 'hero',      width: 1600, height: 900, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe this image for screen readers and SEO. Required.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption displayed below the image in rich text.',
      },
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Team', value: 'team' },
        { label: 'Projects', value: 'projects' },
        { label: 'Brand', value: 'brand' },
        { label: 'Press', value: 'press' },
        { label: 'Blog', value: 'blog' },
        { label: 'General', value: 'general' },
      ],
    },
  ],
}
