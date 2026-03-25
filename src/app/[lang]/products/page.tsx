import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '../dictionaries'
import type { Locale } from '../dictionaries'
import ProductCard, { products } from '@/components/ProductCard'
import AwardsStrip from '@/components/AwardsStrip'

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/products'>): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'es' ? 'Productos' : 'Products',
  }
}

export default async function ProductsPage({ params }: PageProps<'/[lang]/products'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-label text-xs tracking-widest uppercase text-brand-mauve mb-3">
              Raven Clan Distillery
            </p>
            <h1 className="font-headline text-4xl sm:text-5xl text-white mb-4">
              {dict.products.title}
            </h1>
            <p className="text-white/50 text-lg">{dict.products.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                lang={lang}
                whereToBuyCta={dict.products.whereToBuyCta}
              />
            ))}
          </div>

          {/* Color-change callout */}
          <div className="mt-20 border border-brand-plum/30 bg-brand-plum/5 p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <p className="font-label text-xs tracking-widest uppercase text-brand-gold mb-3">
              Malaria Original
            </p>
            <p className="font-headline text-2xl sm:text-3xl text-white mb-4">
              {lang === 'es'
                ? 'Azul en el vaso. Rosa al conocer la tónica.'
                : 'Blue in the glass. Pink with tonic.'}
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              {lang === 'es'
                ? 'Un cambio de color provocado por 7 infusiones de flores y el pH de la tónica. El gin más fotogénico de Argentina.'
                : 'A colour change triggered by 7 flower infusions and the pH of tonic water. The most photogenic gin in Argentina.'}
            </p>
          </div>
        </div>
      </section>

      <AwardsStrip title={dict.home.awardsTitle} />
    </>
  )
}
