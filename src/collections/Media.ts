import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Slika', plural: 'Slike' },
  admin: { group: 'Sadržaj' },
  access: { read: () => true },
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumb', width: 400 },
      { name: 'card', width: 900 },
      { name: 'large', width: 1800 },
    ],
  },
  fields: [{ name: 'alt', label: 'Opis slike (alt)', type: 'text', required: true }],
}
