/*
  Mock catalog for the preview. Brands and model names are real; sizes,
  colours and prices are placeholders. In Payload each product is one model in one colour
  (as on VistaExpert); colour siblings share the same `model`.
  Every exported function names its Payload equivalent.
*/
import assets from './assets.json'
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

export const MODELS: Model[] = [
  // House line
  { brand: 'Dođi i vidi', model: 'DV 1001 Mira', type: 'optical', shape: 'okrugli', gender: 'unisex', material: 'acetat', colors: ['crna', 'kornjaca', 'providna'], price: 11900, size: [47, 21, 145], badge: 'Novo', description: 'Okrugli okvir od bio-acetata, ručno poliran. Naša kuća linija, rađena za svakodnevno nošenje.' },
  { brand: 'Dođi i vidi', model: 'DV 1002 Lena', type: 'optical', shape: 'panto', gender: 'zene', material: 'acetat', colors: ['kornjaca', 'providna', 'crna'], price: 11900, size: [49, 20, 145], description: 'Mekan panto oblik: ravan gore, zaobljen dole. Okvir sa kojim se teško pogreši.' },
  { brand: 'Dođi i vidi', model: 'DV 1003 Novak', type: 'optical', shape: 'kvadratni', gender: 'muskarci', material: 'acetat', colors: ['crna', 'medena', 'zelena'], price: 12900, size: [52, 19, 145], description: 'Širi kvadratni okvir sa izraženijom linijom obrva.' },
  { brand: 'Dođi i vidi', model: 'DV 2001 Sava', type: 'sun', shape: 'pilot', gender: 'unisex', material: 'titanijum', colors: ['srebrna', 'crna'], price: 15900, size: [54, 17, 145], polarized: true, description: 'Tanak titanijumski pilot sa polarizovanim staklima. 11 grama.' },
  { brand: 'Dođi i vidi', model: 'DV 2002 Vera', type: 'sun', shape: 'cat-eye', gender: 'zene', material: 'acetat', colors: ['crna', 'kornjaca'], price: 13900, badge: 'Najprodavanije', size: [51, 18, 140], description: 'Umeren cat-eye, dovoljno diskretan za svaki dan.' },
  { brand: 'Dođi i vidi', model: 'DV 0501 Mali', type: 'optical', shape: 'okrugli', gender: 'deca', material: 'acetat', colors: ['zelena', 'providna'], price: 8900, size: [42, 17, 125], description: 'Lagan dečji okvir sa fleksibilnim šarkama.' },
  // Vrhunski luksuzni i dizajnerski
  { brand: 'Tom Ford', model: 'FT5401 Optical', type: 'optical', shape: 'kvadratni', gender: 'muskarci', material: 'acetat', colors: ['crna', 'kornjaca'], price: 44900, size: [54, 16, 145], badge: 'Najprodavanije', description: 'Debeo acetat sa metalnim „T” na bočicama. Klasičan Tom Ford okvir za svaki dan.' },
  { brand: 'Tom Ford', model: 'FT0237 Snowdon', type: 'sun', shape: 'kvadratni', gender: 'muskarci', material: 'acetat', colors: ['crna', 'kornjaca'], price: 49900, size: [52, 20, 145], description: 'Kvadratne sunčane naočare sa izraženim „T” detaljem.' },
  { brand: 'Tom Ford', model: 'FT0820 Cat', type: 'sun', shape: 'cat-eye', gender: 'zene', material: 'acetat', colors: ['crna', 'medena'], price: 52900, badge: 'Novo', size: [55, 16, 140], description: 'Naglašen cat-eye od debelog acetata.' },
  { brand: 'Oliver Peoples', model: 'OV5186 Gregory Peck', type: 'optical', shape: 'panto', gender: 'unisex', material: 'acetat', colors: ['kornjaca', 'crna', 'providna'], price: 54900, badge: 'Najprodavanije', size: [47, 23, 150], description: 'Retro panto inspirisan filmskom klasikom, sa zakivcima na prednjem delu.' },
  { brand: 'Oliver Peoples', model: 'OV1104S Cary Grant Sun', type: 'sun', shape: 'okrugli', gender: 'muskarci', material: 'titanijum', colors: ['medena', 'srebrna'], price: 64900, polarized: true, size: [50, 22, 145], description: 'Tanak titanijumski okvir sa ručno rađenim detaljima.' },
  { brand: 'Gucci', model: 'GG0061S', type: 'sun', shape: 'okrugli', gender: 'zene', material: 'acetat', colors: ['crna', 'kornjaca'], price: 46900, badge: 'Novo', size: [56, 22, 140], description: 'Veliki okrugli okvir sa italijanskim karakterom.' },
  { brand: 'Gucci', model: 'GG0026O', type: 'optical', shape: 'kvadratni', gender: 'zene', material: 'acetat', colors: ['crna', 'kornjaca'], price: 39900, size: [50, 22, 145], description: 'Pravougaoni acetatni okvir sa prepoznatljivim detaljem na bočici.' },
  { brand: 'Prada', model: 'PR 17WS Symbole', type: 'sun', shape: 'cat-eye', gender: 'zene', material: 'acetat', colors: ['crna', 'kornjaca'], price: 42900, badge: 'Najprodavanije', size: [49, 20, 140], description: 'Debeo acetatni okvir sa trouglastim logom na bočici.' },
  { brand: 'Prada', model: 'PR 16MV', type: 'optical', shape: 'kvadratni', gender: 'zene', material: 'acetat', colors: ['crna', 'providna'], price: 36900, sale: 43900, badge: 'Akcija', size: [52, 18, 140], description: 'Elegantan pravougaoni okvir.' },
  { brand: 'Jacques Marie Mage', model: 'Dealan', type: 'sun', shape: 'kvadratni', gender: 'muskarci', material: 'acetat', colors: ['kornjaca', 'crna'], price: 98900, badge: 'Novo', size: [51, 23, 150], description: 'Ručno rađen okvir iz limitirane serije, numerisan.' },
  { brand: 'Jacques Marie Mage', model: 'Zephirin', type: 'optical', shape: 'panto', gender: 'unisex', material: 'acetat', colors: ['providna', 'kornjaca'], price: 89900, size: [48, 22, 145], description: 'Snažan vizuelni identitet, debeo acetat i ručna obrada.' },
  // Izdržljivost i inženjering
  { brand: 'Lindberg', model: 'Strip Titanium 9704', type: 'optical', shape: 'okrugli', gender: 'unisex', material: 'titanijum', colors: ['srebrna', 'crna'], price: 74900, badge: 'Najprodavanije', size: [48, 21, 140], description: 'Ultra-lak titanijum bez šrafova i varova. Skoro neuništiv.' },
  { brand: 'Lindberg', model: 'Air Titanium Rim Ellis', type: 'optical', shape: 'kvadratni', gender: 'muskarci', material: 'titanijum', colors: ['srebrna', 'medena'], price: 79900, size: [52, 19, 145], description: 'Minimalistički okvir od titanijumske žice, oko 5 grama.' },
  { brand: 'ic! berlin', model: 'Model Lucas', type: 'optical', shape: 'panto', gender: 'muskarci', material: 'metal', colors: ['crna', 'srebrna'], price: 49900, size: [49, 20, 145], description: 'Tanak čelični lim, šarka bez šrafova koja se savija bez lomljenja.' },
  { brand: 'Mykita', model: 'Lessrim Ilma', type: 'optical', shape: 'okrugli', gender: 'zene', material: 'metal', colors: ['medena', 'srebrna'], price: 59900, size: [48, 21, 140], description: 'Lagan okvir od nerđajućeg čelika, ručno sklapan u Berlinu.' },
  { brand: 'Mykita', model: 'Studio 12.6', type: 'sun', shape: 'pilot', gender: 'unisex', material: 'metal', colors: ['crna', 'srebrna'], price: 64900, polarized: true, size: [55, 17, 145], description: 'Fleksibilan čelični pilot bez šrafova.' },
  { brand: 'Persol', model: 'PO0649', type: 'sun', shape: 'pilot', gender: 'muskarci', material: 'acetat', colors: ['kornjaca', 'crna'], price: 32900, polarized: true, size: [54, 20, 140], description: 'Legendarni acetatni pilot sa fleksibilnim Meflecto sistemom na drškama.' },
  { brand: 'Persol', model: 'PO3007V', type: 'optical', shape: 'panto', gender: 'muskarci', material: 'acetat', colors: ['kornjaca', 'crna'], price: 29900, size: [50, 19, 145], description: 'Italijanski acetat, šarka u obliku strele.' },
  // Svakodnevni i sportski
  { brand: 'Ray-Ban', model: 'RB3025 Aviator', type: 'sun', shape: 'pilot', gender: 'unisex', material: 'metal', colors: ['srebrna', 'crna'], price: 21900, badge: 'Najprodavanije', size: [58, 14, 135], description: 'Klasičan metalni pilot.' },
  { brand: 'Ray-Ban', model: 'RB2140 Wayfarer', type: 'sun', shape: 'kvadratni', gender: 'unisex', material: 'acetat', colors: ['crna', 'kornjaca'], price: 19900, size: [50, 22, 150], description: 'Acetatni okvir prepoznatljivog oblika.' },
  { brand: 'Ray-Ban', model: 'RB5154 Clubmaster', type: 'optical', shape: 'panto', gender: 'muskarci', material: 'acetat', colors: ['crna', 'kornjaca'], price: 18900, sale: 22900, badge: 'Akcija', size: [49, 21, 140], description: 'Okvir sa izraženom gornjom linijom i metalnim donjim delom.' },
  { brand: 'Ray-Ban', model: 'RB5228', type: 'optical', shape: 'kvadratni', gender: 'unisex', material: 'acetat', colors: ['crna', 'kornjaca', 'providna'], price: 16900, size: [50, 17, 140], description: 'Jednostavan pravougaoni okvir za svaki dan.' },
  { brand: 'Oakley', model: 'OO9102 Holbrook', type: 'sun', shape: 'kvadratni', gender: 'muskarci', material: 'acetat', colors: ['crna', 'zelena'], price: 22900, polarized: true, size: [55, 18, 137], description: 'Lagan O-Matter okvir sa Prizm staklima.' },
  { brand: 'Oakley', model: 'OO9208 Radar EV Path', type: 'sun', shape: 'pilot', gender: 'muskarci', material: 'metal', colors: ['crna', 'srebrna'], price: 26900, polarized: true, size: [38, 18, 128], description: 'Sportski okvir sa velikim staklom za bicikl i trčanje.' },
  { brand: 'Maui Jim', model: "MJ202 Peahi", type: 'sun', shape: 'pilot', gender: 'muskarci', material: 'metal', colors: ['crna', 'srebrna'], price: 34900, polarized: true, size: [65, 15, 127], description: 'Polarizovana PolarizedPlus2 stakla koja pojačavaju boje i kontrast.' },
  { brand: 'Maui Jim', model: 'Red Sands', type: 'sun', shape: 'kvadratni', gender: 'unisex', material: 'acetat', colors: ['kornjaca', 'crna'], price: 31900, polarized: true, size: [56, 20, 140], description: 'Sunčane naočare za svaki dan sa vrhunskim polarizovanim staklima.' },
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
      gallery: ((assets.products as Record<string, string[]>)[slug]
        ? (assets.products as Record<string, string[]>)[slug].map((url, i) => ({
            image: { id: url, url, alt: `${m.brand} ${m.model}, ${c.label.toLowerCase()}${i === 0 ? '' : ', detalj'}`, width: 1200, height: 1200 },
          }))
        : null) ?? imgs.map((f, i) => ({
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
