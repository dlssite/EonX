import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Team } from '@/collections/Team'
import { Projects } from '@/collections/Projects'
import { Opportunities } from '@/collections/Opportunities'
import { Inquiries } from '@/collections/Inquiries'

// Globals
import { SiteSettings } from '@/globals/SiteSettings'
import { Navigation } from '@/globals/Navigation'
import { Footer } from '@/globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    // Lock the admin to dark mode — matches the Eonrisia brand
    theme: 'dark',
    meta: {
      titleSuffix: '— Eonrisia CMS',
    },
    // Custom branded components
    components: {
      graphics: {
        Logo: '@/components/admin/AdminLogo#AdminLogo',
        Icon: '@/components/admin/AdminIcon#AdminIcon',
      },
    },
  },

  collections: [Users, Media, Team, Projects, Opportunities, Inquiries],

  globals: [SiteSettings, Navigation, Footer],

  editor: lexicalEditor(),

  db: postgresAdapter({
    // push: false — schema already exists in Neon via the initial dev-push.
    // We use versioned migrations for all future schema changes.
    // Setting push=false prevents Payload from re-running pushDevSchema on every
    // hot-reload, which was causing db.query[tableName] to be undefined on reads.
    push: false,
    pool: {
      connectionString: process.env.DATABASE_URI as string,
      ssl: process.env.DATABASE_URI?.includes('sslmode=require')
        ? { rejectUnauthorized: false }
        : false,
      // Keep the pool small — this app runs in a single Node.js process on a
      // 1 vCPU VPS. Neon serverless also wakes faster with a smaller pool.
      max: 5,
      min: 1,
      // Neon cold-start can take ~2–3s; give it headroom.
      idleTimeoutMillis: 60_000,
      connectionTimeoutMillis: 20_000,
      // Allow retrying a failed connection once before throwing.
      allowExitOnIdle: false,
    },
  }),

  typescript: {
    outputFile: path.resolve(dirname, 'types/payload-types.ts'),
  },

  upload: {
    limits: {
      fileSize: 5_000_000, // 5MB
    },
  },

  secret: process.env.PAYLOAD_SECRET as string,

  serverURL: process.env.NEXT_PUBLIC_SITE_URL as string,
})
