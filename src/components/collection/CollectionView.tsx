'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import type { Product } from '@/lib/types'
import { FRAME_COLORS, slugify } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'

/*
  Collection page after vistaexpert.it/collections: breadcrumb, title,
  faceted filters with counts, active-filter chips, sort ("Redosled"),
  numbered pagination. Filtering runs client-side here; in Payload the
  same groups map to `where` clauses on product fields.
*/

type GroupKey = 'tip' | 'dostupnost' | 'pol' | 'brend' | 'oblik' | 'boja' | 'materijal' | 'polarizovane' | 'staklo' | 'dioptrija' | 'sirina' | 'most'
type Filters = Partial<Record<GroupKey, string[]>> & { min?: number; max?: number }

const LABELS: Record<string, string> = {
  sun: 'Sunčane naočare', optical: 'Naočare',
  'na-stanju': 'Na stanju', 'za-narucivanje': 'Dostupno za naručivanje',
  muskarci: 'Muškarci', zene: 'Žene', unisex: 'Unisex', deca: 'Deca',
  okrugli: 'Okrugli', kvadratni: 'Kvadratni', panto: 'Panto', 'cat-eye': 'Cat-eye', pilot: 'Pilot',
  acetat: 'Acetat', metal: 'Metal', titanijum: 'Titanijum',
  da: 'Da', ne: 'Ne', siva: 'Siva', braon: 'Braon', providna: 'Providna',
  'do-48': 'do 48 mm', '49-51': '49–51 mm', '52-54': '52–54 mm', '55+': '55 mm i više',
}

const lensBucket = (w: number) => (w <= 48 ? 'do-48' : w <= 51 ? '49-51' : w <= 54 ? '52-54' : '55+')

const VALUE: Record<GroupKey, (p: Product) => string> = {
  tip: (p) => p.attributes.productType,
  dostupnost: (p) => (p.attributes.inStock ? 'na-stanju' : 'za-narucivanje'),
  pol: (p) => p.attributes.gender,
  brend: (p) => slugify(p.attributes.brand),
  oblik: (p) => p.attributes.shape,
  boja: (p) => p.attributes.frameColor,
  materijal: (p) => p.attributes.material,
  polarizovane: (p) => (p.attributes.polarized ? 'da' : 'ne'),
  staklo: (p) => p.attributes.lensColor,
  dioptrija: (p) => (p.attributes.rxSuitable ? 'da' : 'ne'),
  sirina: (p) => lensBucket(p.attributes.lensWidth),
  most: (p) => String(p.attributes.bridge),
}

const GROUPS: { key: GroupKey; title: string; sunOnly?: boolean }[] = [
  { key: 'tip', title: 'Vrsta proizvoda' },
  { key: 'dostupnost', title: 'Dostupnost' },
  { key: 'pol', title: 'Pol' },
  { key: 'brend', title: 'Brend' },
  { key: 'oblik', title: 'Oblik okvira' },
  { key: 'boja', title: 'Boja okvira' },
  { key: 'materijal', title: 'Materijal okvira' },
  { key: 'polarizovane', title: 'Polarizovana stakla', sunOnly: true },
  { key: 'staklo', title: 'Boja stakla', sunOnly: true },
  { key: 'dioptrija', title: 'Pogodno za dioptrijska stakla' },
  { key: 'sirina', title: 'Širina stakla' },
  { key: 'most', title: 'Širina mosta' },
]

const SORTS = [
  ['istaknuto', 'Istaknuto'],
  ['najprodavanije', 'Najprodavanije'],
  ['a-z', 'Abecedno, A–Ž'],
  ['z-a', 'Abecedno, Ž–A'],
  ['cena-rastuce', 'Cena, od najniže'],
  ['cena-opadajuce', 'Cena, od najviše'],
  ['najnovije', 'Najnovije'],
  ['najstarije', 'Najstarije'],
] as const

const PER_PAGE = 12

export function CollectionView({
  title,
  intro,
  products,
  breadcrumb,
  subLinks,
  empty,
}: {
  title: string
  intro: string
  products: Product[]
  breadcrumb: { label: string; href?: string }[]
  subLinks?: { label: string; href: string }[]
  empty?: string
}) {
  const params = useSearchParams()
  const [filters, setFilters] = useState<Filters>({})
  const [sort, setSort] = useState<string>('istaknuto')
  const [page, setPage] = useState(1)
  const [drawer, setDrawer] = useState(false)

  // Mega-menu links arrive as ?pol=…&oblik=…&brend=…&polarizovane=da&dioptrija=da&sort=…
  useEffect(() => {
    const f: Filters = {}
    for (const k of ['pol', 'oblik', 'brend', 'polarizovane', 'dioptrija'] as GroupKey[]) {
      const v = params.get(k)
      if (v) f[k] = [v]
    }
    setFilters(f)
    setSort(params.get('sort') ?? 'istaknuto')
    setPage(1)
  }, [params])

  const hasSun = products.some((p) => p.attributes.productType === 'sun')
  const groups = GROUPS.filter((g) => !g.sunOnly || hasSun)
  const priceBounds = useMemo(() => {
    const ps = products.map((p) => p.priceInRSD)
    return [Math.min(...ps, 0), Math.max(...ps, 0)]
  }, [products])

  const matches = (p: Product, f: Filters, skip?: GroupKey) => {
    for (const g of GROUPS) {
      if (g.key === skip) continue
      const sel = f[g.key]
      if (sel?.length && !sel.includes(VALUE[g.key](p))) return false
    }
    if (f.min != null && p.priceInRSD < f.min) return false
    if (f.max != null && p.priceInRSD > f.max) return false
    return true
  }

  const filtered = useMemo(() => {
    const list = products.filter((p) => matches(p, filters))
    const s = [...list]
    switch (sort) {
      case 'najprodavanije': s.sort((a, b) => b.popularity - a.popularity); break
      case 'a-z': s.sort((a, b) => a.title.localeCompare(b.title, 'sr')); break
      case 'z-a': s.sort((a, b) => b.title.localeCompare(a.title, 'sr')); break
      case 'cena-rastuce': s.sort((a, b) => a.priceInRSD - b.priceInRSD); break
      case 'cena-opadajuce': s.sort((a, b) => b.priceInRSD - a.priceInRSD); break
      case 'najnovije': s.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break
      case 'najstarije': s.sort((a, b) => a.createdAt.localeCompare(b.createdAt)); break
    }
    return s
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, filters, sort])

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const toggle = (key: GroupKey, value: string) => {
    setFilters((f) => {
      const cur = f[key] ?? []
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]
      return { ...f, [key]: next }
    })
    setPage(1)
  }

  const chips = groups.flatMap((g) => (filters[g.key] ?? []).map((v) => ({ key: g.key, value: v, label: optionLabel(g.key, v, products) })))
  const priceActive = filters.min != null || filters.max != null

  const panel = (
    <div className="text-sm">
      {groups.map((g, gi) => {
        const counts = new Map<string, number>()
        for (const p of products) if (matches(p, filters, g.key)) counts.set(VALUE[g.key](p), (counts.get(VALUE[g.key](p)) ?? 0) + 1)
        const all = Array.from(new Set(products.map(VALUE[g.key]))).sort((a, b) => (g.key === 'most' ? Number(a) - Number(b) : 0))
        if (all.length < 2 && !(filters[g.key]?.length)) return null
        return (
          <details key={g.key} open={gi < 5 || !!filters[g.key]?.length} className="border-b border-rule py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between py-1 font-medium">
              {g.title}
              <span className="text-ink-3">+</span>
            </summary>
            <ul className={clsx('mt-2', g.key === 'boja' || g.key === 'most' || g.key === 'sirina' ? 'flex flex-wrap gap-1.5' : 'space-y-1.5')}>
              {all.map((v) => {
                const n = counts.get(v) ?? 0
                const on = filters[g.key]?.includes(v) ?? false
                if (g.key === 'boja') {
                  return (
                    <li key={v}>
                      <button
                        onClick={() => toggle(g.key, v)}
                        disabled={!n && !on}
                        className={clsx('flex items-center gap-1.5 border px-2 py-1 text-xs', on ? 'border-ink' : 'border-rule hover:border-ink-3', !n && !on && 'opacity-40')}
                      >
                        <span className="h-3 w-3 rounded-full border border-black/10" style={{ background: FRAME_COLORS[v]?.swatch }} />
                        {FRAME_COLORS[v]?.label} <span className="text-ink-3">({n})</span>
                      </button>
                    </li>
                  )
                }
                if (g.key === 'most' || g.key === 'sirina') {
                  return (
                    <li key={v}>
                      <button
                        onClick={() => toggle(g.key, v)}
                        disabled={!n && !on}
                        className={clsx('border px-2 py-1 text-xs tabular-nums', on ? 'border-ink bg-ink text-ground' : 'border-rule hover:border-ink-3', !n && !on && 'opacity-40')}
                      >
                        {g.key === 'most' ? `${v} mm` : LABELS[v]} <span className={on ? 'opacity-70' : 'text-ink-3'}>({n})</span>
                      </button>
                    </li>
                  )
                }
                return (
                  <li key={v}>
                    <label className={clsx('flex cursor-pointer items-center gap-2.5', !n && !on && 'opacity-40')}>
                      <input type="checkbox" checked={on} disabled={!n && !on} onChange={() => toggle(g.key, v)} className="h-3.5 w-3.5 accent-[var(--t-ink)]" />
                      <span>{optionLabel(g.key, v, products)}</span>
                      <span className="text-ink-3">({n})</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </details>
        )
      })}
      <details open className="border-b border-rule py-3">
        <summary className="flex cursor-pointer list-none items-center justify-between py-1 font-medium">Cena <span className="text-ink-3">+</span></summary>
        <div className="mt-3 flex items-center gap-2 text-xs">
          <input type="number" inputMode="numeric" placeholder={String(priceBounds[0])} value={filters.min ?? ''} onChange={(e) => { setFilters((f) => ({ ...f, min: e.target.value ? Number(e.target.value) : undefined })); setPage(1) }} className="h-9 w-full border border-rule bg-paper px-2 tabular-nums" aria-label="Najniža cena" />
          <span className="text-ink-3">–</span>
          <input type="number" inputMode="numeric" placeholder={String(priceBounds[1])} value={filters.max ?? ''} onChange={(e) => { setFilters((f) => ({ ...f, max: e.target.value ? Number(e.target.value) : undefined })); setPage(1) }} className="h-9 w-full border border-rule bg-paper px-2 tabular-nums" aria-label="Najviša cena" />
          <span className="text-ink-3">RSD</span>
        </div>
      </details>
    </div>
  )

  return (
    <>
      <div className="container-wide pt-6">
        <nav className="label text-ink-2" aria-label="Putanja">
          {breadcrumb.map((b, i) => (
            <span key={b.label}>
              {i > 0 && <span className="mx-2">/</span>}
              {b.href ? <Link href={b.href} className="link-underline">{b.label}</Link> : <span className="text-ink">{b.label}</span>}
            </span>
          ))}
        </nav>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="display text-[clamp(2rem,4vw,3.25rem)] leading-none">{title}</h1>
            {intro && <p className="mt-3 max-w-xl text-sm text-ink-2">{intro}</p>}
          </div>
          {subLinks && (
            <div className="flex gap-2 text-xs">
              {subLinks.map((s) => <Link key={s.label} href={s.href} className="border border-rule px-3 py-2 hover:border-ink">{s.label}</Link>)}
            </div>
          )}
        </div>
      </div>

      {empty ? (
        <div className="container-wide mt-10">
          <div className="grid place-items-center bg-chart px-6 py-24 text-center">
            <p className="max-w-md text-base">{empty}</p>
            <Link href="/zakazi-pregled" className="mt-6 inline-flex h-11 items-center bg-cta px-6 text-xs text-cta-ink">Posetite nas</Link>
          </div>
        </div>
      ) : (
        <div className="container-wide mt-8 grid gap-8 lg:grid-cols-[15rem_1fr]">
          <aside className="hidden lg:block" aria-label="Filteri">
            <div className="sticky top-[calc(8rem+1px)] max-h-[calc(100vh-9rem)] overflow-y-auto pr-2 [scrollbar-width:thin]">{panel}</div>
          </aside>

          <section>
            <div className="flex flex-wrap items-center justify-between gap-3 border-y border-rule py-3 text-xs">
              <div className="flex items-center gap-4">
                <button className="border border-ink px-3 py-1.5 lg:hidden" onClick={() => setDrawer(true)}>Filteri{chips.length ? ` (${chips.length})` : ''}</button>
                <span className="text-ink-2">{filtered.length} {filtered.length === 1 ? 'proizvod' : 'proizvoda'}</span>
              </div>
              <label className="flex items-center gap-2">
                <span className="text-ink-2">Redosled</span>
                <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1) }} className="h-8 border border-rule bg-paper px-2">
                  {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </label>
            </div>

            {(chips.length > 0 || priceActive) && (
              <div className="flex flex-wrap items-center gap-2 py-3 text-xs">
                {chips.map((c) => (
                  <button key={c.key + c.value} onClick={() => toggle(c.key, c.value)} className="flex items-center gap-2 bg-tile px-2.5 py-1 hover:bg-tile-2">
                    {c.label} <span aria-hidden>×</span>
                  </button>
                ))}
                {priceActive && (
                  <button onClick={() => setFilters((f) => ({ ...f, min: undefined, max: undefined }))} className="flex items-center gap-2 bg-tile px-2.5 py-1 hover:bg-tile-2">
                    Cena {filters.min ?? priceBounds[0]}–{filters.max ?? priceBounds[1]} <span aria-hidden>×</span>
                  </button>
                )}
                <button onClick={() => { setFilters({}); setPage(1) }} className="link-underline ml-1 text-ink-2">Obriši sve</button>
              </div>
            )}

            {visible.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-base">Nema proizvoda za izabrane filtere.</p>
                <button onClick={() => setFilters({})} className="link-underline mt-3 text-xs">Obriši filtere</button>
              </div>
            ) : (
              <div className="mt-px grid grid-cols-2 gap-x-px md:grid-cols-3">
                {visible.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 3} />)}
              </div>
            )}

            {pages > 1 && (
              <nav className="mt-6 flex items-center justify-center gap-1 text-xs" aria-label="Stranice">
                <button disabled={page === 1} onClick={() => { setPage(page - 1); window.scrollTo({ top: 0 }) }} className="h-9 px-3 disabled:opacity-30">‹ Prethodna</button>
                {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    aria-current={n === page ? 'page' : undefined}
                    onClick={() => { setPage(n); window.scrollTo({ top: 0 }) }}
                    className={clsx('h-9 w-9 tabular-nums', n === page ? 'bg-ink text-ground' : 'hover:bg-tile')}
                  >
                    {n}
                  </button>
                ))}
                <button disabled={page === pages} onClick={() => { setPage(page + 1); window.scrollTo({ top: 0 }) }} className="h-9 px-3 disabled:opacity-30">Sledeća ›</button>
              </nav>
            )}
          </section>
        </div>
      )}

      {/* Mobile filter drawer */}
      <div className={clsx('fixed inset-0 z-50 lg:hidden', drawer ? 'pointer-events-auto' : 'pointer-events-none')} aria-hidden={!drawer}>
        <div onClick={() => setDrawer(false)} className={clsx('absolute inset-0 bg-ink/25 transition-opacity', drawer ? 'opacity-100' : 'opacity-0')} />
        <div className={clsx('absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-ground transition-transform duration-300', drawer ? 'translate-x-0' : '-translate-x-full')}>
          <div className="flex h-14 items-center justify-between border-b border-rule px-5 text-xs">
            <span className="text-sm font-medium">Filteri</span>
            <button onClick={() => setDrawer(false)}>Zatvori</button>
          </div>
          <div className="flex-1 overflow-y-auto px-5">{panel}</div>
          <div className="flex gap-2 border-t border-rule p-4">
            <button onClick={() => setFilters({})} className="h-11 flex-1 border border-ink text-xs">Obriši</button>
            <button onClick={() => setDrawer(false)} className="h-11 flex-1 bg-cta text-xs text-cta-ink">Prikaži {filtered.length}</button>
          </div>
        </div>
      </div>
    </>
  )
}

function optionLabel(key: GroupKey, v: string, products: Product[]) {
  if (key === 'brend') return products.find((p) => slugify(p.attributes.brand) === v)?.attributes.brand ?? v
  if (key === 'boja') return FRAME_COLORS[v]?.label ?? v
  if (key === 'most') return `Most ${v} mm`
  if (key === 'polarizovane') return v === 'da' ? 'Polarizovane' : 'Nepolarizovane'
  if (key === 'dioptrija') return v === 'da' ? 'Pogodno za dioptriju' : 'Nije pogodno za dioptriju'
  if (key === 'sirina') return `Staklo ${LABELS[v]}`
  return LABELS[v] ?? v
}
