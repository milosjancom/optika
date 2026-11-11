'use client'
import type { Product } from '@/lib/types'
import Link from 'next/link'
import { useState } from 'react'
import clsx from 'clsx'
import { Media } from '@/components/Media'
import { formatRSD, getSiblings, FRAME_COLORS } from '@/lib/data'

/*
  Card after vistaexpert.it: front image (second on hover), badge,
  brand, model + colour code, price with crossed-out original,
  colour siblings. Template equivalent: ProductGridItem.
*/
export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const [hover, setHover] = useState(false)
  const a = product.attributes
  const siblings = getSiblings(product)
  const href = `/proizvodi/${product.slug}`

  return (
    <div className="group" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Link href={href} className="relative block aspect-[4/5]">
        <Media resource={product.gallery[0].image} priority={priority} className="absolute inset-0" />
        {product.gallery[1] && (
          <div className={clsx('absolute inset-0 transition-opacity duration-500', hover ? 'opacity-100' : 'opacity-0')}>
            <Media resource={product.gallery[1].image} className="h-full w-full" />
          </div>
        )}
        {product.badge && (
          <span className={clsx('label absolute left-3 top-3 px-1.5 py-0.5', product.badge === 'Akcija' ? 'bg-sale text-white' : 'bg-ground text-ink')}>
            {product.badge}
          </span>
        )}
        {!a.inStock && <span className="label absolute bottom-3 left-3 text-ink-2">Dostupno za naručivanje</span>}
      </Link>
      <div className="px-2.5 pt-3 pb-7">
        <p className="label text-ink-2">{a.brand}</p>
        <Link href={href} className="mt-1 block text-sm hover:underline">
          {a.model} <span className="text-ink-2">{a.colorCode}</span>
        </Link>
        <div className="mt-1.5 flex items-baseline gap-2 text-sm tabular-nums">
          <span className={product.compareAtPriceInRSD ? 'text-sale' : undefined}>{formatRSD(product.priceInRSD)}</span>
          {product.compareAtPriceInRSD && <s className="text-xs text-ink-3">{formatRSD(product.compareAtPriceInRSD)}</s>}
        </div>
        {siblings.length > 1 && (
          <div className="mt-2 flex items-center gap-1.5">
            {siblings.map((s) => (
              <Link
                key={s.id}
                href={`/proizvodi/${s.slug}`}
                title={FRAME_COLORS[s.attributes.frameColor].label}
                className={clsx('grid h-4 w-4 place-items-center rounded-full border', s.id === product.id ? 'border-ink' : 'border-transparent')}
              >
                <span className="h-2.5 w-2.5 rounded-full border border-black/10" style={{ background: FRAME_COLORS[s.attributes.frameColor].swatch }} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
