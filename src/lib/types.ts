/*
  A trimmed mirror of the Payload ecommerce template's generated types
  (src/payload-types.ts), extended with eyewear attributes. In Payload the
  attributes become fields on the Products collection (selects + numbers),
  which also drive the collection filters.
*/

export type Media = {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
}

export type Category = {
  id: string
  title: string
  slug: string
}

export type VariantOption = {
  id: string
  label: string
  value: string
  variantType: string
  swatch?: string
}

export type VariantType = {
  id: string
  name: string
  label: string
  options: VariantOption[]
}

export type Variant = {
  id: string
  title: string
  options: VariantOption[]
  priceInRSD?: number | null
  inventory?: number | null
}

export type ProductType = 'optical' | 'sun'
export type Gender = 'muskarci' | 'zene' | 'unisex' | 'deca'
export type Shape = 'okrugli' | 'kvadratni' | 'panto' | 'cat-eye' | 'pilot'

export type EyewearAttributes = {
  brand: string
  model: string // model code, e.g. "DV 1021"
  colorCode: string // e.g. "C02"
  productType: ProductType
  gender: Gender
  shape: Shape
  frameColor: string // filter value, e.g. "crna"
  material: 'acetat' | 'metal' | 'titanijum'
  lensColor: string // "providna" for optical
  polarized: boolean
  rxSuitable: boolean
  lensWidth: number
  bridge: number
  temple: number
  lensHeight: number
  weight: number
  inStock: boolean
}

export type Product = {
  id: string
  slug: string
  title: string
  description: string[]
  gallery: { image: Media }[]
  priceInRSD: number
  compareAtPriceInRSD?: number
  enableVariants: boolean
  variantTypes: VariantType[]
  variants: { docs: Variant[] }
  categories: Category[]
  badge?: 'Novo' | 'Najprodavanije' | 'Akcija'
  createdAt: string
  popularity: number
  attributes: EyewearAttributes
}

export type CartItem = {
  id: string
  product: Product
  variant?: Variant
  quantity: number
}

export type Cart = {
  items: CartItem[]
}
