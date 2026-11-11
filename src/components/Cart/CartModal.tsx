'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import clsx from 'clsx'
import { useCart } from '@/providers/Cart'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'

/* Right-hand drawer. Replaces the template's Sheet-based CartModal visually;
   the cart logic stays with the plugin's useCart(). */
export function CartModal() {
  const { cart, isOpen, setOpen, incrementItem, decrementItem, removeItem, subtotal, totalQuantity } = useCart()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, setOpen])

  const freeShippingAt = 10000
  const remaining = Math.max(0, freeShippingAt - subtotal)

  return (
    <div className={clsx('fixed inset-0 z-50', isOpen ? 'pointer-events-auto' : 'pointer-events-none')} aria-hidden={!isOpen}>
      <div
        onClick={() => setOpen(false)}
        className={clsx('absolute inset-0 bg-ink/25 transition-opacity duration-300', isOpen ? 'opacity-100' : 'opacity-0')}
      />
      <aside
        role="dialog"
        aria-label="Korpa"
        className={clsx(
          'absolute right-0 top-0 flex h-full w-full max-w-[26rem] flex-col bg-paper transition-transform duration-500 ease-(--ease-calm)',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-(--spacing-header) items-center justify-between border-b border-rule px-5 text-xs">
          <span>Korpa ({totalQuantity})</span>
          <button onClick={() => setOpen(false)} className="link-underline">Zatvori</button>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="text-base">Vaša korpa je prazna.</p>
            <div className="flex gap-3">
              <Link href="/kolekcije/naocare" onClick={() => setOpen(false)} className="border border-ink px-5 py-3 text-xs">Naočare</Link>
              <Link href="/kolekcije/suncane-naocare" onClick={() => setOpen(false)} className="border border-ink px-5 py-3 text-xs">Sunčane naočare</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="border-b border-rule px-5 py-3 text-xs text-ink-2">
              {remaining > 0 ? (
                <>Još <Price as="span" amount={remaining} className="inline text-ink" /> do besplatne dostave.</>
              ) : (
                <>Besplatna dostava.</>
              )}
              <div className="mt-2 h-px bg-rule">
                <div className="h-px bg-ink transition-all duration-500" style={{ width: `${Math.min(100, (subtotal / freeShippingAt) * 100)}%` }} />
              </div>
            </div>
            <ul className="flex-1 overflow-y-auto">
              {cart.items.map((item) => {
                const img = item.product.gallery[0].image
                const price = item.variant?.priceInRSD ?? item.product.priceInRSD
                return (
                  <li key={item.id} className="flex gap-4 border-b border-rule px-5 py-4">
                    <Link href={`/proizvodi/${item.product.slug}`} onClick={() => setOpen(false)} className="w-20 shrink-0">
                      <Media resource={img} className="aspect-[4/5]" />
                    </Link>
                    <div className="flex flex-1 flex-col text-xs">
                      <div className="flex justify-between gap-3">
                        <span className="text-sm">{item.product.title}</span>
                        <Price amount={price * item.quantity} className="text-sm" />
                      </div>
                      {item.variant && <span className="mt-1 text-ink-2">{item.variant.title}</span>}
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center border border-rule">
                          <button className="h-7 w-7" onClick={() => decrementItem(item.id)} aria-label="Manje">−</button>
                          <span className="w-6 text-center tabular-nums">{item.quantity}</span>
                          <button className="h-7 w-7" onClick={() => incrementItem(item.id)} aria-label="Više">+</button>
                        </div>
                        <button className="link-underline text-ink-2" onClick={() => removeItem(item.id)}>Ukloni</button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="border-t border-rule px-5 py-5 text-xs">
              <div className="flex justify-between text-sm">
                <span>Ukupno</span>
                <Price amount={subtotal} />
              </div>
              <p className="mt-1 text-ink-2">Dostava se obračunava u sledećem koraku.</p>
              <Link
                href="/placanje"
                onClick={() => setOpen(false)}
                className="mt-4 flex h-12 items-center justify-center bg-cta text-xs tracking-wide text-cta-ink transition-opacity hover:opacity-85"
              >
                Nastavi na plaćanje
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
