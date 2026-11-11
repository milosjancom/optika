import Link from 'next/link'
import { brandNames, getProducts, slugify } from '@/lib/data'

export const metadata = { title: 'Brendovi' }

export default function BrandsPage() {
  return (
    <section className="container-wide pt-6">
      <nav className="label text-ink-2" aria-label="Putanja"><Link href="/" className="link-underline">Početna</Link><span className="mx-2">/</span><span className="text-ink">Brendovi</span></nav>
      <h1 className="display mt-6 text-[clamp(2rem,4vw,3.25rem)] leading-none">Brendovi</h1>
      <ul className="mt-10 grid grid-cols-2 gap-px bg-rule md:grid-cols-4">
        {brandNames.map((b) => {
          const n = getProducts().filter((p) => p.attributes.brand === b).length
          return (
            <li key={b} className="bg-ground">
              <Link href={`/kolekcije/${slugify(b)}`} className="group flex h-36 flex-col justify-between p-5 hover:bg-tile">
                <span className="display text-xl">{b}</span>
                <span className="text-xs text-ink-2">{n} modela <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span></span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
