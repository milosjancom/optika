import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import { rsLatin } from '@payloadcms/translations/languages/rsLatin'
import { en } from '@payloadcms/translations/languages/en'

import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { Brands } from './collections/Brands.ts'
import { Products } from './collections/Products.ts'
import { migrations } from './migrations/index.ts'
import { seed } from './endpoints/seed.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/*
  Env (Vercel → Settings → Environment Variables):
    DATABASE_URL          Neon connection string (pooled)
    PAYLOAD_SECRET        long random string
    BLOB_READ_WRITE_TOKEN added automatically when Vercel Blob is connected
*/
export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · Dođi i vidi admin' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  i18n: { supportedLanguages: { 'rs-latin': rsLatin, en }, fallbackLanguage: 'rs-latin' },
  collections: [Products, Brands, Media, Users],
  endpoints: [{ path: '/seed', method: 'get', handler: seed }],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || process.env.DATABASE_URI || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Runs pending migrations when the server starts in production (Vercel).
    prodMigrations: migrations,
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  sharp,
})
