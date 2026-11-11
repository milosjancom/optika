import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Korisnik', plural: 'Korisnici' },
  admin: { useAsTitle: 'email', group: 'Podešavanja' },
  auth: true,
  fields: [{ name: 'name', label: 'Ime', type: 'text' }],
}
