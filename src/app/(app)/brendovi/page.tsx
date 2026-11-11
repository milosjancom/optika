import Link from 'next/link'
import { getProducts, slugify } from '@/lib/data'
import { tiers } from '@/lib/brands'
import { BrandMark } from '@/components/BrandMark'

export const metadata = { title: 'Brendovi' }

/* Brand index grouped by tier. In Payload: `brands` collection grouped by `tier`. */
export default function BrandsPage() {
  const all = getProducts()
  return (
    <section className="container-wide pt-6">
      <nav className="label text-ink-2" aria-label="Putanja"><Link href="/" className="link-underline">Početna</Link><span className="mx-2">/</span><span className="text-ink">Brendovi</span></nav>
      <h1 className="display mt-6 text-[clamp(2rem,4vw,3.25rem)] leading-none">Brendovi</h1>
      <p className="mt-3 max-w-xl text-sm text-ink-2">Od luksuznih modnih kuća do inženjerskih okvira od titanijuma. Sve modele možete da probate u radnji.</p>

      {tiers.map((t) => (
        <div key={t.id} id={t.id} className="mt-14">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink pb-3">
            <h2 className="display text-xl">{t.title}</h2>
            <p className="text-xs text-ink-2">{t.intro}</p>
          </div>
          <ul className="grid border-l border-rule sm:grid-cols-2 lg:grid-cols-3">
            {t.brands.map((b) => {
              const n = all.filter((p) => p.attributes.brand === b.name).length
              return (
                <li key={b.name} className="border-b border-r border-rule">
                  <Link href={`/kolekcije/${slugify(b.name)}`} className="group flex h-full min-h-40 flex-col justify-between gap-6 p-6 hover:bg-tile">
                    <BrandMark name={b.name} className="h-8" textClassName="text-2xl" />
                    <div>
                      <p className="text-sm text-ink-2">{b.text}</p>
                      <p className="mt-3 text-xs">{n} {n === 1 ? 'model' : 'modela'} <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span></p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </section>
  )
}
