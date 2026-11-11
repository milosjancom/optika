import { BookingForm } from '@/components/BookingForm'
import { Logo } from '@/components/Logo'

export const metadata = { title: 'Zakažite pregled vida' }

/* Booking page after visionottica.it ("Prenota appuntamento").
   In Payload: the template's Form Builder plugin (form + submissions). */
export default function BookingPage() {
  return (
    <section className="container-wide grid gap-10 pt-10 md:grid-cols-2 md:gap-16">
      <div>
        <p className="label text-ink-2">Dođi i vidi</p>
        <h1 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.02]">Zakažite besplatan pregled vida</h1>
        <p className="mt-5 max-w-md text-base text-ink-2">
          Pregled traje oko 30 minuta. Proverimo vid, izmerimo razmak zenica i prilagodimo okvir vašem licu. Besplatno uz svaki par naočara.
        </p>
        <div className="mt-10 grid place-items-center bg-brand px-8 py-12">
          <Logo className="w-[min(14rem,55vw)]" />
        </div>
        <dl className="mt-8 grid grid-cols-[7rem_1fr] gap-y-2 text-sm">
          <dt className="text-ink-2">Adresa</dt><dd>Bulevar primer 00, Beograd</dd>
          <dt className="text-ink-2">Radno vreme</dt><dd>Pon–Pet 9–20 · Sub 9–15</dd>
          <dt className="text-ink-2">Telefon</dt><dd>+381 11 000 0000</dd>
        </dl>
      </div>
      <BookingForm />
    </section>
  )
}
