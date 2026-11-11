import Link from 'next/link'
import { HighImpactHero } from '@/heros/HighImpact'
import { RenderBlocks, type Block } from '@/blocks/RenderBlocks'
import { Logo } from '@/components/Logo'
import { BrandMark } from '@/components/BrandMark'
import { tiers } from '@/lib/brands'
import { Media } from '@/components/Media'
import { products, slugify } from '@/lib/data'

const m = (file: string, alt: string) => ({ id: file, url: `/media/${file}.svg`, alt, width: 800, height: 1000 })

const SHAPES = [
  { label: 'Okrugli', value: 'okrugli', file: 'eye-round-black-1' },
  { label: 'Kvadratni', value: 'kvadratni', file: 'eye-square-tortoise-1' },
  { label: 'Panto', value: 'panto', file: 'eye-panto-crystal-1' },
  { label: 'Cat-eye', value: 'cat-eye', file: 'eye-cateye-black-1' },
  { label: 'Pilot', value: 'pilot', file: 'eye-aviator-silver-1' },
]

/* Home, sections ordered after vistaexpert.it. In Payload: the `home` page (hero + layout blocks). */
export default function HomePage() {
  const best = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 8)
  const newest = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8)

  const lower: Block[] = [
    { blockType: 'carousel', title: 'Novo', link: { label: 'Prikaži sve', url: '/kolekcije/naocare?sort=najnovije' }, products: newest },
    {
      blockType: 'banner',
      items: [
        { title: 'Besplatan pregled vida', text: 'Uz svaki par, u našoj radnji' },
        { title: 'Stakla za 3–5 dana', text: 'Izrađujemo ih po vašem receptu' },
        { title: 'Povraćaj 14 dana', text: 'Za okvire bez dioptrije' },
        { title: 'Garancija 2 godine', text: 'Na okvire i šarke' },
      ],
    },
    {
      blockType: 'callToAction',
      id: 'pregled',
      eyebrow: 'Dođi i vidi',
      title: 'Zakažite besplatan pregled vida',
      text: 'Proverimo vid, izmerimo razmak zenica i prilagodimo okvir vašem licu. Oko 30 minuta, besplatno uz svaki par.',
      link: { label: 'Zakažite termin', url: '/zakazi-pregled' },
      media: m('eye-round-tortoise-2', 'Detalj okvira od acetata'),
    },
  ]

  return (
    <>
      <HighImpactHero
        panels={[
          { eyebrow: 'Do −25% na odabrane okvire', title: 'Naočare', link: { label: 'Kupite naočare', url: '/kolekcije/naocare' }, media: m('hero-optical', 'Okrugle providne naočare') },
          { eyebrow: 'Polarizovana stakla', title: 'Sunčane naočare', link: { label: 'Kupite sunčane', url: '/kolekcije/suncane-naocare' }, media: m('hero-eyewear', 'Sunčane naočare, kornjača') },
        ]}
      />

      <RenderBlocks blocks={[{ blockType: 'carousel', title: 'Najprodavanije', link: { label: 'Prikaži sve', url: '/kolekcije/naocare?sort=najprodavanije' }, products: best }]} />

      {/* Shop by shape (VistaExpert "Kupovina prema trendovima") */}
      <section className="container-wide py-10">
        <div className="mb-4 flex items-baseline justify-between text-xs">
          <h2 className="display text-sm">Kupujte po obliku</h2>
        </div>
        <div className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5">
          {SHAPES.map((s) => (
            <Link key={s.value} href={`/kolekcije/naocare?oblik=${s.value}`} className="group relative block aspect-square overflow-hidden">
              <Media resource={m(s.file, s.label)} className="absolute inset-0" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
              <span className="absolute bottom-4 left-4 text-sm">{s.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Eye chart + prescription message */}
      <section className="container-wide py-10">
        <div className="grid items-center gap-10 bg-brand px-6 py-16 text-white md:grid-cols-2 md:px-16 md:py-24">
          <Logo className="mx-auto w-[min(20rem,70vw)]" />
          <div className="max-w-md">
            <p className="label text-white/75">Optika od 1987.</p>
            <p className="display mt-4 text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.15]">Okvir koji volite. Sa vašom dioptrijom.</p>
            <p className="mt-4 text-base text-white/85">
              Izaberite okvir online, a stakla izrađujemo u radnji po vašem receptu. Nemate recept? Dođite na besplatan pregled.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/kolekcije/naocare" className="inline-flex h-12 items-center bg-white px-6 text-xs font-medium text-brand-dark hover:bg-white/90">Izaberite okvir</Link>
              <Link href="/zakazi-pregled" className="inline-flex h-12 items-center border border-white px-6 text-xs font-medium text-white hover:bg-white hover:text-brand-dark">Zakažite pregled</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brands by tier */}
      <section className="container-wide py-10">
        <div className="mb-4 flex items-baseline justify-between text-xs">
          <h2 className="display text-sm">Brendovi</h2>
          <Link href="/brendovi" className="link-underline">Svi brendovi</Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.slice(0, 3).map((t) => (
            <div key={t.id}>
              <p className="label border-b border-ink pb-2 text-ink">{t.title}</p>
              <ul className="mt-1">
                {t.brands.map((b) => (
                  <li key={b.name} className="border-b border-rule">
                    <Link href={`/kolekcije/${slugify(b.name)}`} className="group flex h-14 items-center justify-between">
                      <BrandMark name={b.name} className="h-6" textClassName="text-lg" />
                      <span className="text-ink-3 transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <RenderBlocks blocks={lower} />
    </>
  )
}
