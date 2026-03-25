import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale } from './dictionaries'
import type { Locale } from './dictionaries'
import AwardsStrip from '@/components/AwardsStrip'
import ProductCard, { products } from '@/components/ProductCard'

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)
  const { home } = dict

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-black overflow-hidden">
        {/* Placeholder for color-change hero video — assets TBD (MAL-11) */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-plum/20 via-black to-black pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <p className="font-label text-xs tracking-widest uppercase text-brand-gold">
            Malaria Gin · Raven Clan Distillery
          </p>
          <h1 className="font-headline text-4xl sm:text-6xl text-white leading-tight">
            {home.heroTagline}
          </h1>
          <p className="text-xl text-white/60 font-body italic">
            {home.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href={`/${lang}/products`}
              className="font-label text-xs tracking-widest uppercase bg-brand-plum text-white px-8 py-4 hover:bg-brand-plum/80 transition-colors"
            >
              {home.heroCta}
            </Link>
            <Link
              href={`/${lang}/story`}
              className="font-label text-xs tracking-widest uppercase border border-white/30 text-white/70 px-8 py-4 hover:border-white hover:text-white transition-colors"
            >
              {home.storyCta}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-white/20" />
        </div>
      </section>

      {/* ── Story Teaser ─────────────────────────────────────── */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-label text-xs tracking-widest uppercase text-brand-mauve mb-4">
            Mar del Plata, Argentina
          </p>
          <h2 className="font-headline text-3xl sm:text-4xl text-white mb-6">
            {home.storyTeaser}
          </h2>
          <Link
            href={`/${lang}/story`}
            className="font-label text-xs tracking-widest uppercase text-brand-gold hover:text-white transition-colors border-b border-brand-gold/40 hover:border-white pb-0.5"
          >
            {home.storyCta} →
          </Link>
        </div>
      </section>

      {/* ── Awards ───────────────────────────────────────────── */}
      <AwardsStrip title={home.awardsTitle} />

      {/* ── Products ─────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-headline text-3xl sm:text-4xl text-white text-center mb-16">
            {home.productsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                lang={lang}
                whereToBuyCta={dict.products.whereToBuyCta}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram Strip Placeholder ───────────────────────── */}
      <section className="py-16 px-4 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <a
            href="https://instagram.com/malaria_gin"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors"
          >
            @malaria_gin ↗
          </a>
        </div>
      </section>
    </>
  )
}
