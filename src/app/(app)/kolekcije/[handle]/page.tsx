import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { CollectionView } from '@/components/collection/CollectionView'
import { collections } from '@/lib/site'
import { getProducts, slugify } from '@/lib/data'

export function generateStaticParams() {
  return Object.keys(collections).map((handle) => ({ handle }))
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  return { title: collections[(await params).handle]?.title }
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const c = collections[handle]
  if (!c) notFound()
  const products = getProducts(c.category).filter(
    (p) => (!c.saleOnly || p.compareAtPriceInRSD) && (!c.brand || p.attributes.brand === c.brand),
  )
  const breadcrumb = [
    { label: 'Početna', href: '/' },
    ...(c.brand ? [{ label: 'Brendovi', href: '/brendovi' }] : []),
    { label: c.title },
  ]
  const subLinks = c.brand
    ? [
        { label: 'Sunčane naočare', href: `/kolekcije/suncane-naocare?brend=${slugify(c.brand)}` },
        { label: 'Naočare', href: `/kolekcije/naocare?brend=${slugify(c.brand)}` },
      ]
    : undefined
  return (
    <Suspense>
      <CollectionView title={c.title} intro={c.intro} products={products} breadcrumb={breadcrumb} subLinks={subLinks} empty={c.empty} />
    </Suspense>
  )
}
