'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Logo } from '@/components/Logo'
import { footerColumns } from '@/lib/site'

/* Footer after vistaexpert.it. In Payload: the `footer` global. */
export function Footer() {
  const [sent, setSent] = useState(false)
  return (
    <footer className="mt-24 border-t border-rule">
      {/* Trust strip */}
      <div className="container-wide grid grid-cols-2 border-b border-rule md:grid-cols-4">
        {[
          ['Besplatan pregled vida', 'Uz svaki par, u našoj radnji'],
          ['Dostava 1–3 dana', 'Besplatno preko 10.000 RSD'],
          ['Povraćaj 14 dana', 'Za okvire bez dioptrije'],
          ['Garancija 2 godine', 'Na okvire i šarke'],
        ].map(([t, d], i) => (
          <div key={t} className={`py-6 md:px-5 ${i > 0 ? 'md:border-l md:border-rule' : ''}`}>
            <p className="text-sm font-medium">{t}</p>
            <p className="mt-1 text-xs text-ink-2">{d}</p>
          </div>
        ))}
      </div>

      <div className="container-wide grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo className="w-28" />
          <p className="mt-6 text-xs text-ink-2">
            Bulevar primer 00, Beograd · Pon–Pet 9–20, Sub 9–15
            <br />+381 11 000 0000
          </p>
          <form className="mt-6" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
            <p className="text-sm font-medium">Newsletter</p>
            <div className="mt-3 flex border-b border-ink">
              <input type="email" required placeholder="Vaša email adresa" aria-label="Email adresa" className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-3" />
              <button className="text-xs">{sent ? 'Hvala' : 'Prijavi se'}</button>
            </div>
          </form>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <p className="label text-ink-2">{col.title}</p>
            <ul className="mt-4 space-y-2 text-xs">
              {col.links.map((l) => (
                <li key={l.label}><Link href={l.href} className="link-underline">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-wide flex flex-wrap items-center justify-between gap-3 border-t border-rule py-5 text-2xs text-ink-2">
        <span>© 2026 Dođi i vidi optika · od 1987.</span>
        <span>Plaćanje: Visa · Mastercard · Dina · pouzećem</span>
        <span>Instagram · Facebook</span>
      </div>
    </footer>
  )
}
