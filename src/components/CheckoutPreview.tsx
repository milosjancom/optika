'use client'
import Link from 'next/link'
import { useCart } from '@/providers/Cart'
import { Price } from '@/components/Price'

/* Placeholder. The real page is the template's CheckoutPage — restyled only.
   */
export function CheckoutPreview() {
  const { cart, subtotal } = useCart()
  return (
    <section className="container-wide mx-auto max-w-2xl py-16">
      <h1 className="display text-[clamp(2rem,4vw,3rem)] leading-none">Plaćanje</h1>
      <p className="mt-4 text-sm text-ink-2">
        Pregled dizajna. U Payload verziji ovde je checkout iz šablona: adresa, plaćanje, potvrda.
      </p>
      <div className="mt-10 border-t border-rule text-sm">
        {cart.items.length === 0 && <p className="py-4 text-ink-2">Vaša korpa je prazna.</p>}
        {cart.items.map((i) => (
          <div key={i.id} className="flex justify-between gap-4 border-b border-rule py-4">
            <Link href={`/proizvodi/${i.product.slug}`} className="link-underline">
              {i.product.title} <span className="text-ink-2">· {i.variant?.title} × {i.quantity}</span>
            </Link>
            <Price amount={(i.variant?.priceInRSD ?? i.product.priceInRSD) * i.quantity} />
          </div>
        ))}
        <div className="flex justify-between py-4"><span>Ukupno</span><Price amount={subtotal} /></div>
      </div>
    </section>
  )
}
