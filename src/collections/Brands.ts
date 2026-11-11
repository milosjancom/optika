import type { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  labels: { singular: 'Brend', plural: 'Brendovi' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'tier', 'updatedAt'], group: 'Katalog' },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Naziv', type: 'text', required: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, unique: true, index: true, admin: { position: 'sidebar' } },
    {
      name: 'tier',
      label: 'Grupa',
      type: 'select',
      required: true,
      options: [
        { label: 'Vrhunski luksuzni i dizajnerski', value: 'luksuz' },
        { label: 'Izdržljivost i inženjering', value: 'inzenjering' },
        { label: 'Svakodnevni i sportski', value: 'svakodnevni' },
        { label: 'Naša linija', value: 'kuca' },
      ],
    },
    { name: 'description', label: 'Kratak opis', type: 'textarea' },
    { name: 'logo', label: 'Logo (SVG ili PNG)', type: 'upload', relationTo: 'media' },
    { name: 'order', label: 'Redosled', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
