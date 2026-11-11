'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import clsx from 'clsx'
import type { Product } from '@/lib/types'
import { Media } from '@/components/Media'
import { useCart } from '@/providers/Cart'
import { FRAME_COLORS, formatRSD, getSiblings, slugify } from '@/lib/data'

const SHAPE_LABEL: Record<string, string> = { okrugli: 'Okrugli', kvadratni: 'Kvadratni', panto: 'Panto', 'cat-eye': 'Cat-eye', pilot: 'Pilot' }
const GENDER_LABEL: Record<string, string> = { muskarci: 'Muškarci', zene: 'Žene', unisex: 'Unisex', deca: 'Deca' }
const MATERIAL_LABEL: Record<string, string> = { acetat: 'Acetat', metal: 'Metal', titanijum: 'Titanijum' }

/*
  Product page. Measurements block after firmoo.it, colour siblings and
  breadcrumb after vistaexpert.it. Lens choice is a variant for optical
  frames; the full prescription configurator comes next.
  Template equivalent: product/Gallery + VariantSelector + ProductDescription + AddToCart.
*/
export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const a = product.attributes
  const siblings = getSiblings(product)
  const isSun = a.productType === 'sun'
  const [lens, setLens] = useState(product.variantTypes[0]?.options[0]?.id)
  const [open, setOpen] = useState<string | null>('mere')

  const variant = useMemo(() => product.variants.docs.find((v) => v.options.some((o) => o.id === lens)), [product, lens])
  const price = variant?.priceInRSD ?? product.priceInRSD
  const collection = isSun ? { label: 'Sunčane naočare', href: '/kolekcije/suncane-naocare' } : { label: 'Naočare', href: '/kolekcije/naocare' }

  const sections = [
    {
      id: 'mere',
      title: 'Mere okvira',
      body: (
        <div>
          <div className="flex items-center gap-6 bg-chart px-5 py-5">
            <FrameDiagram />
            <p className="text-2xl font-medium tracking-[0.08em] tabular-nums">
              {a.lensWidth} □ {a.bridge} — {a.temple}
            </p>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {[
              ['Širina stakla', `${a.lensWidth} mm`],
              ['Visina stakla', `${a.lensHeight} mm`],
              ['Širina mosta', `${a.bridge} mm`],
              ['Dužina ručice', `${a.temple} mm`],
              ['Ukupna širina', `${a.lensWidth * 2 + a.bridge + 10} mm`],
              ['Težina', `${a.weight} g`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-rule py-1.5">
                <dt className="text-ink-2">{k}</dt>
                <dd className="tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-ink-2">Uporedite sa merama naočara koje već nosite: piše ih na unutrašnjoj strani ručice.</p>
        </div>
      ),
    },
    {
      id: 'detalji',
      title: 'Detalji',
      body: (
        <dl className="grid grid-cols-[9rem_1fr] gap-y-2">
          {[
            ['Brend', a.brand],
            ['Model', `${a.model} ${a.colorCode}`],
            ['Oblik', SHAPE_LABEL[a.shape]],
            ['Pol', GENDER_LABEL[a.gender]],
            ['Materijal', MATERIAL_LABEL[a.material]],
            ['Boja okvira', FRAME_COLORS[a.frameColor].label],
            ...(isSun ? [['Stakla', `${a.lensColor === 'braon' ? 'Braon' : 'Siva'}${a.polarized ? ', polarizovana' : ''}, UV400`]] : []),
            ['Za dioptrijska stakla', a.rxSuitable ? 'Da' : 'Ne'],
          ].map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-ink-2">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      id: 'dostava',
      title: 'Dostava i povraćaj',
      body: <p className="text-ink-2">Dostava za 1–3 radna dana. Besplatno preko 10.000 RSD. Okvire bez dioptrije možete vratiti u roku od 14 dana. Možete i da ih preuzmete u radnji.</p>,
    },
  ]

  return (
    <>
      <div className="container-wide pt-6">
        <nav className="label text-ink-2" aria-label="Putanja">
          <Link href="/" className="link-underline">Početna</Link>
          <span className="mx-2">/</span>
          <Link href={collection.href} className="link-underline">{collection.label}</Link>
          <span className="mx-2">/</span>
          <Link href={`/kolekcije/${slugify(a.brand)}`} className="link-underline">{a.brand}</Link>
        </nav>
      </div>

      <div className="mt-6 grid md:grid-cols-[1fr_minmax(22rem,30rem)]">
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
          {product.gallery.map((g, i) => (
            <Media key={g.image.id} resource={g.image} priority={i < 2} className={clsx('aspect-[4/5]', i === 0 && 'sm:col-span-2 sm:aspect-[8/7]')} />
          ))}
        </div>

        <div className="relative">
          <div className="sticky top-[8.5rem] px-5 py-8 md:px-10 md:py-4">
            <Link href={`/kolekcije/${slugify(a.brand)}`} className="label link-underline text-ink-2">{a.brand}</Link>
            <h1 className="display mt-2 text-[clamp(1.75rem,2.6vw,2.4rem)] leading-[1.05]">
              {a.model} <span className="text-ink-3">{a.colorCode}</span>
            </h1>
            <div className="mt-3 flex items-baseline gap-3 text-base tabular-nums">
              <span className={product.compareAtPriceInRSD ? 'text-sale' : undefined}>{formatRSD(price)}</span>
              {product.compareAtPriceInRSD && <s className="text-sm text-ink-3">{formatRSD(product.compareAtPriceInRSD + (price - product.priceInRSD))}</s>}
            </div>
            <p className={clsx('mt-2 text-xs', a.inStock ? 'text-[#2c7a3a]' : 'text-ink-2')}>
              {a.inStock ? '● Na stanju, šaljemo za 1–2 dana' : '○ Dostupno za naručivanje, 7–10 dana'}
            </p>

            <div className="mt-6 space-y-3 text-base text-ink-2">
              {product.description.map((p) => <p key={p}>{p}</p>)}
            </div>

            {siblings.length > 1 && (
              <div className="mt-7">
                <p className="text-xs">Boja: <span className="text-ink-2">{FRAME_COLORS[a.frameColor].label}</span></p>
                <div className="mt-3 flex gap-2">
                  {siblings.map((s) => (
                    <Link key={s.id} href={`/proizvodi/${s.slug}`} title={FRAME_COLORS[s.attributes.frameColor].label} aria-current={s.id === product.id ? 'true' : undefined} className={clsx('w-16 border', s.id === product.id ? 'border-ink' : 'border-transparent hover:border-rule')}>
                      <Media resource={s.gallery[0].image} className="aspect-square" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {product.variantTypes.map((type) => (
              <fieldset key={type.id} className="mt-7">
                <legend className="text-xs">{type.label}</legend>
                <div className="mt-3 flex flex-col gap-px">
                  {type.options.map((o) => {
                    const v = product.variants.docs.find((d) => d.options.some((x) => x.id === o.id))
                    const extra = (v?.priceInRSD ?? product.priceInRSD) - product.priceInRSD
                    const active = lens === o.id
                    return (
                      <button
                        key={o.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setLens(o.id)}
                        className={clsx('flex h-11 items-center justify-between border px-4 text-xs transition-colors', active ? 'border-ink bg-ink text-ground' : 'border-rule bg-paper hover:border-ink')}
                      >
                        <span>{o.label}</span>
                        <span className={active ? 'text-ground/70' : 'text-ink-2'}>{extra > 0 ? `+${formatRSD(extra)}` : 'Uključeno'}</span>
                      </button>
                    )
                  })}
                  <div className="flex h-11 items-center justify-between border border-dashed border-rule px-4 text-xs text-ink-2">
                    <span>Dioptrijska stakla</span>
                    <span>Uskoro online · u radnji odmah</span>
                  </div>
                </div>
              </fieldset>
            ))}

            <button
              onClick={() => addItem({ product, variant })}
              className="mt-7 flex h-12 w-full items-center justify-center bg-cta text-xs tracking-wide text-cta-ink transition-opacity hover:opacity-85"
            >
              Dodaj u korpu
            </button>
            <Link href="/zakazi-pregled" className="mt-2 flex h-12 w-full items-center justify-center border border-ink text-xs transition-colors hover:bg-ink hover:text-ground">
              Probajte u radnji · zakažite pregled
            </Link>

            <div className="mt-8 border-t border-rule text-xs">
              {sections.map((s) => (
                <div key={s.id} className="border-b border-rule">
                  <button className="flex w-full items-center justify-between py-4" aria-expanded={open === s.id} onClick={() => setOpen((o) => (o === s.id ? null : s.id))}>
                    <span className="text-sm">{s.title}</span>
                    <span className="text-ink-2">{open === s.id ? '−' : '+'}</span>
                  </button>
                  {open === s.id && <div className="pb-5">{s.body}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* Small line drawing that labels the three numbers on the temple. */
function FrameDiagram() {
  return (
    <svg width="96" height="40" viewBox="0 0 96 40" aria-hidden className="shrink-0 text-ink">
      <rect x="4" y="8" width="36" height="24" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="56" y="8" width="36" height="24" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M40 14 Q48 9 56 14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 37 H40" stroke="currentColor" strokeWidth="0.8" />
      <path d="M40 4 H56" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  )
}
