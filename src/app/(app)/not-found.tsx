import Link from 'next/link'
import { Logo } from '@/components/Logo'
export default function NotFound() {
  return (
    <section className="container-wide py-24 text-center">
      <Logo className="mx-auto w-32" />
      <h1 className="mt-10 text-base">Ova stranica ne postoji.</h1>
      <Link href="/" className="link-underline mt-4 inline-block text-xs">Nazad na početnu</Link>
    </section>
  )
}
