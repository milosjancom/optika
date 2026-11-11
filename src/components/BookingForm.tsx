'use client'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

const SERVICES = ['Pregled vida', 'Izbor okvira i stakala', 'Kontaktna sočiva', 'Servis i podešavanje']
const SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']

function nextDays(n: number) {
  const out: Date[] = []
  const d = new Date()
  while (out.length < n) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0) out.push(new Date(d))
  }
  return out
}

export function BookingForm() {
  const [days, setDays] = useState<Date[]>([])
  useEffect(() => setDays(nextDays(10)), [])
  const [service, setService] = useState(SERVICES[0])
  const [day, setDay] = useState(0)
  const [slot, setSlot] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const fmt = new Intl.DateTimeFormat('sr-Latn', { weekday: 'short', day: 'numeric', month: 'short' })

  if (done) {
    return (
      <div className="self-start border border-rule bg-paper p-8">
        <p className="display text-2xl">Hvala, vidimo se.</p>
        <p className="mt-3 text-sm text-ink-2">{service}, {days[day] && fmt.format(days[day])} u {slot}. Potvrdu šaljemo SMS-om. (Pregled dizajna: ništa nije poslato.)</p>
      </div>
    )
  }

  return (
    <form className="self-start border border-rule bg-paper p-6 md:p-8" onSubmit={(e) => { e.preventDefault(); if (slot) setDone(true) }}>
      <fieldset>
        <legend className="text-xs">Usluga</legend>
        <div className="mt-3 grid grid-cols-2 gap-px">
          {SERVICES.map((s) => (
            <button type="button" key={s} onClick={() => setService(s)} aria-pressed={service === s} className={clsx('h-11 border px-3 text-left text-xs', service === s ? 'border-ink bg-ink text-ground' : 'border-rule hover:border-ink')}>{s}</button>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-7">
        <legend className="text-xs">Datum</legend>
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
          {days.map((d, i) => (
            <button type="button" key={i} onClick={() => { setDay(i); setSlot(null) }} aria-pressed={day === i} className={clsx('flex h-14 w-16 shrink-0 flex-col items-center justify-center border text-xs capitalize leading-tight', day === i ? 'border-ink bg-ink text-ground' : 'border-rule hover:border-ink')}>
              <span className="opacity-70">{new Intl.DateTimeFormat('sr-Latn', { weekday: 'short' }).format(d)}</span>
              <span>{new Intl.DateTimeFormat('sr-Latn', { day: 'numeric', month: 'short' }).format(d)}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-7">
        <legend className="text-xs">Vreme</legend>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {SLOTS.map((t, i) => {
            const taken = (i + day) % 4 === 1
            return (
              <button type="button" key={t} disabled={taken} onClick={() => setSlot(t)} aria-pressed={slot === t} className={clsx('h-10 border text-xs tabular-nums', slot === t ? 'border-ink bg-ink text-ground' : 'border-rule hover:border-ink', taken && 'cursor-not-allowed text-ink-3 line-through hover:border-rule')}>{t}</button>
            )
          })}
        </div>
      </fieldset>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <input required placeholder="Ime i prezime" aria-label="Ime i prezime" className="h-11 border border-rule bg-ground px-3 text-sm outline-none focus:border-ink" />
        <input required type="tel" placeholder="Telefon" aria-label="Telefon" className="h-11 border border-rule bg-ground px-3 text-sm outline-none focus:border-ink" />
      </div>
      <button className="mt-7 flex h-12 w-full items-center justify-center bg-cta text-xs tracking-wide text-cta-ink disabled:opacity-40" disabled={!slot}>
        {slot && days[day] ? `Zakaži: ${fmt.format(days[day])} u ${slot}` : 'Izaberite termin'}
      </button>
    </form>
  )
}
