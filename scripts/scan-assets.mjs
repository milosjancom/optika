// Scans public/products/<product-slug>/ and public/brands/ for real images
// and writes src/lib/assets.json. Runs before dev and build.
// Product photos: public/products/<slug>/1.jpg, 2.jpg, ... (jpg, png, webp, avif)
// Brand logos:    public/brands/<brand-slug>.svg (or .png)
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs'

const root = new URL('../public/', import.meta.url)
const img = /\.(jpe?g|png|webp|avif|svg)$/i
const out = { products: {}, brands: {} }

const pDir = new URL('products/', root)
if (existsSync(pDir)) {
  for (const slug of readdirSync(pDir)) {
    if (slug.startsWith('.') || !statSync(new URL(slug, pDir)).isDirectory()) continue
    const files = readdirSync(new URL(`${slug}/`, pDir)).filter((f) => img.test(f)).sort()
    if (files.length) out.products[slug] = files.map((f) => `/products/${slug}/${f}`)
  }
}
const bDir = new URL('brands/', root)
if (existsSync(bDir)) {
  for (const f of readdirSync(bDir)) if (img.test(f)) out.brands[f.replace(img, '')] = `/brands/${f}`
}
writeFileSync(new URL('../src/lib/assets.json', import.meta.url), JSON.stringify(out, null, 2) + '\n')
console.log(`assets: ${Object.keys(out.products).length} products, ${Object.keys(out.brands).length} brand logos`)
