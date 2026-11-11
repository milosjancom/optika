import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/product/ProductDetail'
import { ProductCard } from '@/components/ProductCard'
import { getProductBySlug, products } from '@/lib/data'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProductBySlug((await params).slug)
  return { title: p?.title, description: p?.description[0] }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProductBySlug((await params).slug)
  if (!product) notFound()
  const a = product.attributes
  const related = products
    .filter((p) => p.attributes.model !== a.model && p.attributes.productType === a.productType && (p.attributes.shape === a.shape || p.attributes.gender === a.gender))
    .slice(0, 4)
  return (
    <>
      <ProductDetail product={product} />
      <section className="mt-20">
        <h2 className="container-wide display mb-4 text-sm">Možda vam se dopadne</h2>
        <div className="container-wide grid grid-cols-2 gap-px md:grid-cols-4">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  )
}
