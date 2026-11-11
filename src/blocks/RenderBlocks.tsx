import Link from 'next/link'
import { Media } from '@/components/Media'
import { ProductCard } from '@/components/ProductCard'
import type { Media as MediaType, Product } from '@/lib/types'

/*
  Block components for the Pages collection `layout` field.
  blockType names follow the template where a block exists there
  (content, carousel, threeItemGrid, banner, callToAction).
*/

export type Block =
  | { blockType: 'content'; eyebrow?: string; text: string; tone?: 'plain' | 'accent' }
  | { blockType: 'carousel'; title: string; link?: { label: string; url: string }; products: Product[] }
  | {
      blockType: 'threeItemGrid'
      items: { title: string; caption: string; url: string; media: MediaType }[]
    }
  | { blockType: 'banner'; items: { title: string; text: string }[] }
  | {
      blockType: 'callToAction'
      id?: string
      eyebrow: string
      title: string
      text: string
      link: { label: string; url: string }
      media: MediaType
    }

function ContentBlock({ eyebrow, text, tone = 'plain' }: Extract<Block, { blockType: 'content' }>) {
  if (tone === 'accent') {
    return (
      <section className="my-8 bg-accent py-16 text-cta-ink md:py-24">
        <div className="container-wide">
          {eyebrow && <p className="label opacity-70">{eyebrow}</p>}
          <p className="display mt-5 max-w-5xl text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.9]">{text}</p>
        </div>
      </section>
    )
  }
  return (
    <section className="container-wide py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow && <p className="label text-ink-2">{eyebrow}</p>}
        <p className="display mt-5 text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.2]">{text}</p>
      </div>
    </section>
  )
}

function CarouselBlock({ title, link, products }: Extract<Block, { blockType: 'carousel' }>) {
  return (
    <section className="py-8">
      <div className="container-wide mb-4 flex items-baseline justify-between text-xs">
        <h2 className="display text-sm">{title}</h2>
        {link && <Link href={link.url} className="link-underline">{link.label}</Link>}
      </div>
      <div className="container-wide flex snap-x snap-mandatory scroll-pl-(--spacing-gutter) gap-px overflow-x-auto [scrollbar-width:none]">
        {products.map((p) => (
          <div key={p.id} className="w-[72vw] shrink-0 snap-start sm:w-[42vw] md:w-[calc((100%-3px)/4)]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}

function ThreeItemGridBlock({ items }: Extract<Block, { blockType: 'threeItemGrid' }>) {
  const [big, ...rest] = items
  return (
    <section className="container-wide grid gap-px py-8 md:grid-cols-2">
      <Tile item={big} className="aspect-[4/5] md:aspect-auto md:row-span-2" />
      {rest.map((it) => (
        <Tile key={it.title} item={it} className="aspect-[16/11]" />
      ))}
    </section>
  )
}

function Tile({ item, className }: { item: { title: string; caption: string; url: string; media: MediaType }; className: string }) {
  return (
    <Link href={item.url} className={`group relative block overflow-hidden ${className}`}>
      <Media resource={item.media} className="absolute inset-0" imgClassName="transition-transform duration-[1.6s] ease-(--ease-calm) group-hover:scale-[1.03]" />
      <div className="absolute bottom-0 left-0 p-5">
        <p className="display text-base">{item.title}</p>
        <p className="mt-0.5 text-xs text-ink-2">{item.caption}</p>
      </div>
    </Link>
  )
}

function BannerBlock({ items }: Extract<Block, { blockType: 'banner' }>) {
  return (
    <section className="container-wide py-12">
      <div className="grid grid-cols-2 border-y border-rule md:grid-cols-4">
        {items.map((it, i) => (
          <div key={it.title} className={`px-1 py-6 md:px-5 ${i > 0 ? 'md:border-l md:border-rule' : ''}`}>
            <p className="display text-sm">{it.title}</p>
            <p className="mt-1 text-xs text-ink-2">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CallToActionBlock({ id, eyebrow, title, text, link, media }: Extract<Block, { blockType: 'callToAction' }>) {
  return (
    <section id={id} className="container-wide grid items-center gap-8 py-12 md:grid-cols-2 md:gap-16">
      <Media resource={media} className="aspect-[4/5]" />
      <div className="max-w-md">
        <p className="label text-ink-2">{eyebrow}</p>
        <h2 className="mt-4 display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05]">{title}</h2>
        <p className="mt-5 text-base text-ink-2">{text}</p>
        <Link href={link.url} className="mt-8 inline-flex h-11 items-center border border-ink px-6 text-xs transition-colors hover:bg-cta hover:border-cta hover:text-cta-ink">
          {link.label}
        </Link>
      </div>
    </section>
  )
}

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'content':
            return <ContentBlock key={i} {...block} />
          case 'carousel':
            return <CarouselBlock key={i} {...block} />
          case 'threeItemGrid':
            return <ThreeItemGridBlock key={i} {...block} />
          case 'banner':
            return <BannerBlock key={i} {...block} />
          case 'callToAction':
            return <CallToActionBlock key={i} {...block} />
        }
      })}
    </>
  )
}
