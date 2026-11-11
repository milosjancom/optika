import type { PayloadHandler } from 'payload'

/*
  GET /api/seed?potvrdi=da — fills an empty database with the preview
  catalog (brands + products, no photos). Only for a logged-in admin.
  Safe to run twice: existing slugs are skipped.
*/
export const seed: PayloadHandler = async (req) => {
  const { payload, user } = req
  // Loaded lazily so the Payload CLI never has to parse the frontend data files.
  const { MODELS, FRAME_COLORS, slugify } = await import('../lib/data')
  const { tiers } = await import('../lib/brands')
  if (!user) return Response.json({ error: 'Prijavite se u /admin pa otvorite ovaj link ponovo.' }, { status: 401 })
  const url = new URL(req.url || '', 'http://x')
  if (url.searchParams.get('potvrdi') !== 'da') {
    return Response.json({ info: 'Dodajte ?potvrdi=da da biste uvezli probni katalog.' })
  }

  const brandIds: Record<string, number | string> = {}
  let order = 0
  for (const tier of tiers) {
    for (const b of tier.brands) {
      const slug = slugify(b.name)
      const existing = await payload.find({ collection: 'brands', where: { slug: { equals: slug } }, limit: 1, req })
      const doc =
        existing.docs[0] ??
        (await payload.create({
          collection: 'brands',
          data: { name: b.name, slug, tier: tier.id as 'luksuz', description: b.text, order: order++ },
          req,
        }))
      brandIds[b.name] = doc.id
    }
  }

  let created = 0
  let skipped = 0
  for (const [mi, m] of MODELS.entries()) {
    for (const [ci, color] of m.colors.entries()) {
      const c = FRAME_COLORS[color]
      const slug = slugify(`${m.brand} ${m.model} ${c.label}`)
      const exists = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1, req })
      if (exists.docs.length) { skipped++; continue }
      await payload.create({
        collection: 'products',
        data: {
          title: `${m.brand} ${m.model}`,
          slug,
          brand: brandIds[m.brand] as number,
          model: m.model,
          colorCode: `C0${ci + 1}`,
          description: m.description,
          priceInRSD: m.price,
          compareAtPriceInRSD: m.sale,
          inStock: (mi + ci) % 4 !== 3,
          badge: ci === 0 ? m.badge : m.badge === 'Akcija' ? 'Akcija' : undefined,
          lensOptions:
            m.type === 'optical'
              ? [
                  { label: 'Samo okvir', priceInRSD: 0 },
                  { label: 'Antirefleksna stakla bez dioptrije', priceInRSD: 2500 },
                  { label: 'Zaštita od plavog svetla, bez dioptrije', priceInRSD: 4500 },
                ]
              : [],
          productType: m.type,
          gender: m.gender,
          shape: m.shape,
          frameColor: color as 'crna',
          material: m.material,
          lensColor: m.type === 'sun' ? (color === 'medena' || color === 'kornjaca' ? 'braon' : 'siva') : 'providna',
          polarized: !!m.polarized,
          rxSuitable: m.type === 'optical' || m.material !== 'metal',
          lensWidth: m.size[0],
          bridge: m.size[1],
          temple: m.size[2],
          popularity: (mi * 37 + ci * 11) % 100,
          _status: 'published',
        },
        req,
      })
      created++
    }
  }
  return Response.json({ ok: true, brands: Object.keys(brandIds).length, created, skipped })
}
