'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useCart } from '@/providers/Cart'
import { Logo } from '@/components/Logo'
import { announcements, mainNav, type NavItem } from '@/lib/site'

/*
  Header after vistaexpert.it: rotating announcement bar, logo + search +
  account/booking/bag row, then the main menu with mega-menus
  (Pol / Tip / Oblik / Brend columns + promo tile).
*/
export function Header() {
  const pathname = usePathname()
  const { totalQuantity, setOpen } = useCart()
  const [open, setOpenMenu] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const [mobileSub, setMobileSub] = useState<string | null>(null)
  const [msg, setMsg] = useState(0)

  useEffect(() => {
    setOpenMenu(null)
    setMobile(false)
  }, [pathname])
  useEffect(() => {
    const t = setInterval(() => setMsg((m) => (m + 1) % announcements.length), 4500)
    return () => clearInterval(t)
  }, [])

  const active = mainNav.find((n) => n.label === open)

  return (
    <>
      <div className="flex h-9 items-center justify-center gap-4 bg-bar text-xs font-medium text-bar-ink">
        <button aria-label="Prethodna poruka" className="opacity-60 hover:opacity-100" onClick={() => setMsg((m) => (m - 1 + announcements.length) % announcements.length)}>‹</button>
        <span key={msg} className="min-w-0 truncate text-center">{announcements[msg]}</span>
        <button aria-label="Sledeća poruka" className="opacity-60 hover:opacity-100" onClick={() => setMsg((m) => (m + 1) % announcements.length)}>›</button>
      </div>

      <header className="sticky top-0 z-40 border-b border-rule bg-ground" onMouseLeave={() => setOpenMenu(null)}>
        {/* Row 1: logo, search, actions */}
        <div className="container-wide grid h-20 grid-cols-[auto_1fr_auto] items-center gap-6 text-xs">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setMobile((m) => !m)} aria-expanded={mobile} aria-label="Otvori meni">
              {mobile ? 'Zatvori' : 'Meni'}
            </button>
            <Link href="/" aria-label="Dođi i vidi optika, početna">
              <Logo className="w-[72px]" />
            </Link>
          </div>

          <form role="search" className="mx-auto hidden w-full max-w-md md:block" onSubmit={(e) => e.preventDefault()}>
            <label className="flex h-11 items-center gap-3 border border-rule bg-paper px-4 focus-within:border-ink">
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden className="shrink-0 text-ink-2"><circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.4" /></svg>
              <input type="search" placeholder="Šta tražite? Brend, model, oblik…" className="h-full w-full bg-transparent text-sm outline-none placeholder:text-ink-3" aria-label="Pretraga" />
            </label>
          </form>

          <div className="flex items-center justify-end gap-5">
            <Link href="/zakazi-pregled" className="link-underline hidden py-1 lg:inline">Zakažite pregled</Link>
            <button className="link-underline hidden py-1 sm:inline">Prijava</button>
            <button className="link-underline hidden py-1 sm:inline">Lista želja</button>
            <button className="link-underline py-1" onClick={() => setOpen(true)}>Korpa ({totalQuantity})</button>
          </div>
        </div>

        {/* Row 2: main menu */}
        <nav className="container-wide hidden h-12 items-center gap-8 border-t border-rule text-[0.84rem] font-medium uppercase tracking-[0.06em] lg:flex" aria-label="Glavni meni">
          {mainNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setOpenMenu(item.columns ? item.label : null)}
              onFocus={() => setOpenMenu(item.columns ? item.label : null)}
              className={clsx('flex h-full items-center border-b-2 transition-colors', open === item.label ? 'border-brand' : 'border-transparent', item.highlight && 'text-brand-dark')}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mega-menu */}
        {active?.columns && <MegaMenu item={active} />}

        {/* Mobile menu */}
        {mobile && (
          <nav className="max-h-[calc(100vh-6rem)] overflow-y-auto border-t border-rule bg-ground lg:hidden" aria-label="Mobilni meni">
            {mainNav.map((item) => (
              <div key={item.label} className="border-b border-rule">
                <div className="container-wide flex items-center justify-between py-4 text-base">
                  <Link href={item.href} className={item.highlight ? 'text-sale' : undefined}>{item.label}</Link>
                  {item.columns && (
                    <button aria-label={`Otvori ${item.label}`} onClick={() => setMobileSub((s) => (s === item.label ? null : item.label))}>
                      {mobileSub === item.label ? '−' : '+'}
                    </button>
                  )}
                </div>
                {mobileSub === item.label && item.columns && (
                  <div className="container-wide grid grid-cols-2 gap-6 pb-5 text-sm">
                    {item.columns.map((col) => (
                      <div key={col.title}>
                        <p className="label text-ink-2">{col.title}</p>
                        <ul className="mt-2 space-y-2">
                          {col.links.map((l) => <li key={l.label}><Link href={l.href}>{l.label}</Link></li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/zakazi-pregled" className="container-wide block py-4 text-base">Zakažite pregled vida</Link>
          </nav>
        )}
      </header>
    </>
  )
}

function MegaMenu({ item }: { item: NavItem }) {
  return (
    <div className="absolute inset-x-0 top-full hidden border-b border-rule bg-ground shadow-[0_24px_40px_-24px_rgba(0,0,0,0.18)] lg:block">
      <div className="container-wide grid grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.3fr)] gap-8 py-8">
        {item.columns!.map((col) => (
          <div key={col.title}>
            <p className="label text-ink-2">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}><Link href={l.href} className="link-underline">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
        {Array.from({ length: 4 - item.columns!.length }).map((_, i) => <div key={i} />)}
        {item.promo ? (
          <Link href={item.promo.href} className="group relative block aspect-[16/10] overflow-hidden bg-tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.promo.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-sm font-medium">{item.promo.title}</p>
              <p className="text-xs text-ink-2">{item.promo.caption}</p>
            </div>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
