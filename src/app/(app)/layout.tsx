import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { CartProvider } from '@/providers/Cart'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartModal } from '@/components/Cart/CartModal'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Dođi i vidi optika — naočare i pregled vida u Beogradu', template: '%s · Dođi i vidi optika' },
  description: 'Optika u Beogradu od 1987. Dioptrijske i sunčane naočare, kontaktna sočiva i besplatan pregled vida.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sr-Latn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* In the Payload app, swap for next/font/google */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        {/* Payload template: <Providers> */}
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartModal />
        </CartProvider>
      </body>
    </html>
  )
}
