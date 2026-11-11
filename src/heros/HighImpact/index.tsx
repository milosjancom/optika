import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/lib/types'

/*
  Split hero: one panel per segment. Maps to the template's `hero` field
  (type: 'highImpact') extended with an array of panels.
*/
export type HighImpactHeroProps = {
  panels: { eyebrow: string; title: string; link: { label: string; url: string }; media: MediaType }[]
}

export function HighImpactHero({ panels }: HighImpactHeroProps) {
  return (
    <section className="grid gap-px bg-rule md:grid-cols-2">
      {panels.map((p, i) => (
        <Link key={p.title} href={p.link.url} className="group relative block h-[72vh] min-h-[28rem] overflow-hidden bg-ground">
          <Media
            resource={p.media}
            priority={i === 0}
            className="absolute inset-0"
            imgClassName="transition-transform duration-[1.6s] ease-(--ease-calm) group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-7">
            <div>
              <p className="label text-ink-2">{p.eyebrow}</p>
              <h2 className="mt-2 display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-none">{p.title}</h2>
            </div>
            <span className="link-underline text-xs" aria-hidden>{p.link.label}</span>
          </div>
        </Link>
      ))}
    </section>
  )
}
