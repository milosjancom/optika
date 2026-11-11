/*
  Mock catalog for the preview. Brands, model codes and prices are
  placeholders. In Payload each product is one model in one colour
  (as on VistaExpert); colour siblings share the same `model`.
  Every exported function names its Payload equivalent.
*/
import type { Category, EyewearAttributes, Gender, Product, ProductType, Shape, Variant, VariantType } from './types'

export const categories: Category[] = [
  { id: 'cat-sun', title: 'Sunčane naočare', slug: 'suncane-naocare' },
  { id: 'cat-optical', title: 'Naočare', slug: 'naocare' },
]

const SHAPE_FILE: Record<Shape, string> = {
  okrugli: 'round',
  kvadratni: 'square',
  panto: 'panto',
  'cat-eye': 'cateye',
  pilot: 'aviator',
}

export const FRAME_COLORS: Record<string, { label: string; file: string; swatch: string }> = {
  crna: { label: 'Crna', file: 'black', swatch: '#1a1a1a' },
  kornjaca: { label: 'Kornjača', file: 'tortoise', swatch: '#6b4220' },
  providna: { label: 'Providna', file: 'crystal', swatch: '#e9e7e2' },
  medena: { label: 'Medena', file: 'honey', swatch: '#a8733a' },
  zelena: { label: 'Maslinasta', file: 'olive', swatch: '#4b5240' },
  srebrna: { label: 'Srebrna', file: 'silver', swatch: '#a9aaa6' },
}

type Model = {
  brand: string
  model: string
  type: ProductType
  shape: Shape
  gender: Gender
  material: EyewearAttributes['material']
  colors: string[]
  price: number
  sale?: number
  size: [number, number, number]
  polarized?: boolean
  badge?: Product['badge']
  description: string
}

const MODELS: Model[] = [
  // House line
  { brand: 'Dođi i vidi', model: 'DV 1001 Mira', type: 'optical', shape: 'okrugli', gender: 'unisex', material: 'acetat', colors: ['crna', 'kornjaca', 'providna'], price: 11900, size: [47, 21, 145], badge: 'Novo', description: 'Okrugli okvir od bio-acetata, ručno poliran. Naša kuća linija, rađena za svakodnevno nošenje.' },
  { brand: 'Dođi i vidi', model: 'DV 1002 Lena', type: 'optical', shape: 'panto', gender: 'zene', material: 'acetat', colors: ['kornjaca', 'providna', 'crna'], price: 11900, size: [49, 20, 145], description: 'Mekan panto oblik: ravan gore, zaobljen dole. Okvir sa kojim se teško pogreši.' },
  { brand: 'Dođi i vidi', model: 'DV 1003 Novak', type: 'optical', shape: 'kvadratni', gender: 'muskarci', material: 'acetat', colors: ['crna', 'medena', 'zelena'], price: 12900, size: [52, 19, 145], description: 'Širi kvadratni okvir sa izraženijom linijom obrva.' },
  { brand: 'Dođi i vidi', model: 'DV 2001 Sava', type: 'sun', shape: 'pilot', gender: 'unisex', material: 'titanijum', colors: ['srebrna', 'crna'], price: 15900, size: [54, 17, 145], polarized: true, description: 'Tanak titanijumski pilot sa polarizovanim staklima. 11 grama.' },
  { brand: 'Dođi i vidi', model: 'DV 2002 Vera', type: 'sun', shape: 'cat-eye', gender: 'zene', material: 'acetat', colors: ['crna', 'kornjaca'], price: 13900, badge: 'Najprodavanije', size: [51, 18, 140], description: 'Umeren cat-eye, dovoljno diskretan za svaki dan.' },
  { brand: 'Dođi i vidi', model: 'DV 0501 Mali', type: 'optical', shape: 'okrugli', gender: 'deca', material: 'acetat', colors: ['zelena', 'providna'], price: 8900, size: [42, 17, 125], description: 'Lagan dečji okvir sa fleksibilnim šarkama.' },
  // Ray-Ban
  { brand: 'Ray-Ban', model: 'RB 3025 Aviator', type: 'sun', shape: 'pilot', gender: 'unisex', material: 'metal', colors: ['srebrna', 'crna'], price: 21900, badge: 'Najprodavanije', size: [58, 14, 135], description: 'Klasičan metalni pilot.' },
  { brand: 'Ray-Ban', model: 'RB 2140 Wayfarer', type: 'sun', shape: 'kvadratni', gender: 'unisex', material: 'acetat', colors: ['crna', 'kornjaca'], price: 19900, size: [50, 22, 150], description: 'Acetatni okvir prepoznatljivog oblika.' },
  { brand: 'Ray-Ban', model: 'RB 5154 Clubmaster', type: 'optical', shape: 'panto', gender: 'muskarci', material: 'acetat', colors: ['crna', 'kornjaca'], price: 18900, sale: 22900, badge: 'Akcija', size: [49, 21, 140], description: 'Okvir sa izraženom gornjom linijom i metalnim donjim delom.' },
  { brand: 'Ray-Ban', model: 'RB 5228', type: 'optical', shape: 'kvadratni', gender: 'unisex', material: 'acetat', colors: ['crna', 'kornjaca', 'providna'], price: 16900, size: [50, 17, 140], description: 'Jednostavan pravougaoni okvir za svaki dan.' },
  { brand: 'Ray-Ban', model: 'RB 3447 Round', type: 'sun', shape: 'okrugli', gender: 'unisex', material: 'metal', colors: ['srebrna', 'medena'], price: 20900, polarized: true, size: [50, 21, 145], description: 'Okrugli metalni okvir.' },
  // Persol
  { brand: 'Persol', model: 'PO 3007V', type: 'optical', shape: 'panto', gender: 'muskarci', material: 'acetat', colors: ['kornjaca', 'crna'], price: 29900, size: [52, 19, 145], description: 'Italijanski acetat, šarka u obliku strele.' },
  { brand: 'Persol', model: 'PO 0649', type: 'sun', shape: 'pilot', gender: 'muskarci', material: 'acetat', colors: ['kornjaca', 'crna'], price: 32900, polarized: true, size: [54, 20, 140], description: 'Acetatni pilot sa polarizovanim kristalnim staklima.' },
  // Prada
  { brand: 'Prada', model: 'PR 17WS', type: 'sun', shape: 'cat-eye', gender: 'zene', material: 'acetat', colors: ['crna', 'kornjaca'], price: 38900, badge: 'Novo', size: [49, 20, 140], description: 'Debeo acetatni okvir sa trouglastim logom na bočici.' },
  { brand: 'Prada', model: 'PR 16MV', type: 'optical', shape: 'kvadratni', gender: 'zene', material: 'acetat', colors: ['crna', 'providna'], price: 34900, sale: 41900, badge: 'Akcija', size: [52, 18, 140], description: 'Elegantan pravougaoni okvir.' },
  // Oakley
  { brand: 'Oakley', model: 'OO 9208 Radar', type: 'sun', shape: 'pilot', gender: 'muskarci', material: 'metal', colors: ['crna', 'srebrna'], price: 24900, polarized: true, size: [55, 18, 135], description: 'Sportski okvir sa polarizovanim staklima.' },
  { brand: 'Oakley', model: 'OX 8156 Holbrook', type: 'optical', shape: 'kvadratni', gender: 'muskarci', material: 'acetat', colors: ['crna', 'zelena'], price: 19900, size: [54, 18, 137], description: 'Lagan O-Matter okvir.' },
  // Tom Ford
  { brand: 'Tom Ford', model: 'FT 5401', type: 'optical', shape: 'kvadratni', gender: 'muskarci', material: 'acetat', colors: ['crna', 'kornjaca'], price: 42900, size: [52, 18, 145], description: 'Debeo acetat sa metalnim T detaljem.' },
  { brand: 'Tom Ford', model: 'FT 0820 Cat', type: 'sun', shape: 'cat-eye', gender: 'zene', material: 'acetat', colors: ['crna', 'medena'], price: 45900, badge: 'Novo', size: [55, 16, 140], description: 'Naglašen cat-eye.' },
  // Vogue
  { brand: 'Vogue Eyewear', model: 'VO 5286', type: 'optical', shape: 'cat-eye', gender: 'zene', material: 'acetat', colors: ['crna', 'kornjaca', 'providna'], price: 12900, size: [50, 17, 135], description: 'Lagan cat-eye okvir.' },
  { brand: 'Vogue Eyewear', model: 'VO 4185', type: 'optical', shape: 'okrugli', gender: 'zene', material: 'metal', colors: ['medena', 'srebrna'], price: 13900, sale: 16900, badge: 'Akcija', size: [50, 20, 140], description: 'Tanak metalni okrugli okvir.' },
]

const slugify = (s: string) =>
  s.toLowerCase().replace(/đ/g, 'dj').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const lensType: VariantType = {
  id: 'vt-lens',
  name: 'lens',
  label: 'Stakla',
  options: [
    { id: 'lens-frame', label: 'Samo okvir', value: 'frame', variantType: 'lens' },
    { id: 'lens-clear', label: 'Antirefleksna stakla bez dioptrije', value: 'clear', variantType: 'lens' },
    { id: 'lens-blue', label: 'Zaštita od plavog svetla, bez dioptrije', value: 'blue', variantType: 'lens' },
  ],
}
const LENS_PRICE: Record<string, number> = { frame: 0, clear: 2500, blue: 4500 }

export const products: Product[] = MODELS.flatMap((m, mi) =>
  m.colors.map((color, ci) => {
    const c = FRAME_COLORS[color]
    const colorCode = `C0${ci + 1}`
    const slug = slugify(`${m.brand} ${m.model} ${c.label}`)
    const id = `prod-${slug}`
    const file = `eye-${SHAPE_FILE[m.shape]}-${c.file}`
    const imgs = m.type === 'sun' ? [`${file}-sun`, `${file}-2`, `${file}-1`] : [`${file}-1`, `${file}-2`, `${file}-sun`]
    const variants: Variant[] =
      m.type === 'optical'
        ? lensType.options.map((o) => ({
            id: `${id}--${o.value}`,
            title: o.label,
            options: [o],
            priceInRSD: m.price + LENS_PRICE[o.value],
            inventory: 10,
          }))
        : []
    const inStock = (mi + ci) % 4 !== 3
    return {
      id,
      slug,
      title: `${m.brand} ${m.model}`,
      description: [m.description],
      gallery: imgs.map((f, i) => ({
        image: { id: f, url: `/media/${f}.svg`, alt: `${m.brand} ${m.model}, ${c.label.toLowerCase()}${i === 0 ? '' : ', detalj'}`, width: 800, height: 1000 },
      })),
      priceInRSD: m.price,
      compareAtPriceInRSD: m.sale,
      enableVariants: m.type === 'optical',
      variantTypes: m.type === 'optical' ? [lensType] : [],
      variants: { docs: variants },
      categories: [m.type === 'sun' ? categories[0] : categories[1]],
      badge: ci === 0 ? m.badge : m.badge === 'Akcija' ? 'Akcija' : undefined,
      createdAt: new Date(2026, (mi * 7 + ci) % 11, 1 + ((mi * 3 + ci) % 27)).toISOString(),
      popularity: (mi * 37 + ci * 11) % 100,
      attributes: {
        brand: m.brand,
        model: m.model,
        colorCode,
        productType: m.type,
        gender: m.gender,
        shape: m.shape,
        frameColor: color,
        material: m.material,
        lensColor: m.type === 'sun' ? (color === 'medena' || color === 'kornjaca' ? 'braon' : 'siva') : 'providna',
        polarized: !!m.polarized,
        rxSuitable: m.type === 'optical' || m.material !== 'metal',
        lensWidth: m.size[0],
        bridge: m.size[1],
        temple: m.size[2],
        lensHeight: Math.round(m.size[0] * (m.shape === 'okrugli' ? 0.92 : m.shape === 'pilot' ? 0.88 : 0.78)),
        weight: m.material === 'titanijum' ? 11 : m.material === 'metal' ? 19 : 24,
        inStock,
      },
    } satisfies Product
  }),
)

export const brandNames = Array.from(new Set(MODELS.map((m) => m.brand)))

/* Payload: payload.find({ collection: 'products', where: {...} }) */
export function getProducts(categorySlug?: string): Product[] {
  if (!categorySlug) return products
  return products.filter((p) => p.categories.some((c) => c.slug === categorySlug))
}

/* Payload: payload.find({ collection: 'products', where: { slug: { equals } }, limit: 1 }) */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

/* Same model in other colours */
export function getSiblings(product: Product): Product[] {
  return products.filter((p) => p.attributes.model === product.attributes.model && p.attributes.brand === product.attributes.brand)
}

export function formatRSD(amount: number): string {
  return `${new Intl.NumberFormat('sr-RS').format(amount)} RSD`
}

export { slugify }
