import type { CollectionConfig } from 'payload'

/*
  One product = one model in one colour (as on VistaExpert).
  Colour siblings share `model` + `brand`. Field names match the
  frontend's EyewearAttributes so the switch from mock data is mechanical.
*/
export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Proizvod', plural: 'Proizvodi' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'brand', 'productType', 'priceInRSD', 'inStock', '_status'],
    group: 'Katalog',
    listSearchableFields: ['title', 'model', 'slug'],
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Osnovno',
          fields: [
            { name: 'title', label: 'Naziv', type: 'text', required: true },
            {
              type: 'row',
              fields: [
                { name: 'brand', label: 'Brend', type: 'relationship', relationTo: 'brands', required: true },
                { name: 'model', label: 'Model', type: 'text', required: true, admin: { description: 'npr. RB3025 Aviator' } },
                { name: 'colorCode', label: 'Šifra boje', type: 'text', admin: { description: 'npr. C01' } },
              ],
            },
            { name: 'description', label: 'Opis', type: 'textarea' },
            {
              name: 'gallery',
              label: 'Fotografije',
              type: 'array',
              labels: { singular: 'Fotografija', plural: 'Fotografije' },
              fields: [{ name: 'image', label: 'Slika', type: 'upload', relationTo: 'media', required: true }],
            },
          ],
        },
        {
          label: 'Cena i zalihe',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'priceInRSD', label: 'Cena (RSD)', type: 'number', required: true, min: 0 },
                { name: 'compareAtPriceInRSD', label: 'Stara cena (RSD)', type: 'number', min: 0, admin: { description: 'Popunite samo kad je na akciji' } },
              ],
            },
            { name: 'inStock', label: 'Na stanju', type: 'checkbox', defaultValue: true },
            {
              name: 'badge',
              label: 'Oznaka',
              type: 'select',
              options: ['Novo', 'Najprodavanije', 'Akcija'].map((v) => ({ label: v, value: v })),
            },
            {
              name: 'lensOptions',
              label: 'Opcije stakala (samo dioptrijski okviri)',
              type: 'array',
              fields: [
                { name: 'label', label: 'Naziv', type: 'text', required: true },
                { name: 'priceInRSD', label: 'Doplata (RSD)', type: 'number', defaultValue: 0 },
              ],
            },
          ],
        },
        {
          label: 'Karakteristike',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'productType',
                  label: 'Vrsta',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Naočare (dioptrijske)', value: 'optical' },
                    { label: 'Sunčane naočare', value: 'sun' },
                  ],
                },
                {
                  name: 'gender',
                  label: 'Pol',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Muškarci', value: 'muskarci' },
                    { label: 'Žene', value: 'zene' },
                    { label: 'Unisex', value: 'unisex' },
                    { label: 'Deca', value: 'deca' },
                  ],
                },
                {
                  name: 'shape',
                  label: 'Oblik',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Okrugli', value: 'okrugli' },
                    { label: 'Kvadratni', value: 'kvadratni' },
                    { label: 'Panto', value: 'panto' },
                    { label: 'Cat-eye', value: 'cat-eye' },
                    { label: 'Pilot', value: 'pilot' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'frameColor',
                  label: 'Boja okvira',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Crna', value: 'crna' },
                    { label: 'Kornjača', value: 'kornjaca' },
                    { label: 'Providna', value: 'providna' },
                    { label: 'Medena', value: 'medena' },
                    { label: 'Maslinasta', value: 'zelena' },
                    { label: 'Srebrna', value: 'srebrna' },
                  ],
                },
                {
                  name: 'material',
                  label: 'Materijal',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Acetat', value: 'acetat' },
                    { label: 'Metal', value: 'metal' },
                    { label: 'Titanijum', value: 'titanijum' },
                  ],
                },
                {
                  name: 'lensColor',
                  label: 'Boja stakla',
                  type: 'select',
                  defaultValue: 'providna',
                  options: [
                    { label: 'Providna', value: 'providna' },
                    { label: 'Siva', value: 'siva' },
                    { label: 'Braon', value: 'braon' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'polarized', label: 'Polarizovana', type: 'checkbox' },
                { name: 'rxSuitable', label: 'Pogodno za dioptrijska stakla', type: 'checkbox', defaultValue: true },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'lensWidth', label: 'Širina stakla (mm)', type: 'number' },
                { name: 'bridge', label: 'Most (mm)', type: 'number' },
                { name: 'temple', label: 'Ručica (mm)', type: 'number' },
                { name: 'lensHeight', label: 'Visina stakla (mm)', type: 'number' },
                { name: 'weight', label: 'Težina (g)', type: 'number' },
              ],
            },
          ],
        },
      ],
    },
    { name: 'slug', label: 'Slug (URL)', type: 'text', required: true, unique: true, index: true, admin: { position: 'sidebar' } },
    { name: 'popularity', label: 'Popularnost', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
