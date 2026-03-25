import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary, hasLocale } from '../dictionaries'
import type { Locale } from '../dictionaries'

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/where-to-buy'>): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'es' ? 'Dónde Encontrarnos' : 'Where to Buy',
  }
}

export default async function WhereToBuyPage({
  params,
}: PageProps<'/[lang]/where-to-buy'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)
  const { whereToBuy, contact } = dict

  return (
    <section className="py-24 px-4 bg-black min-h-screen">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-label text-xs tracking-widest uppercase text-brand-mauve mb-4">
          Argentina
        </p>
        <h1 className="font-headline text-4xl sm:text-5xl text-white mb-6">
          {whereToBuy.title}
        </h1>
        <p className="text-white/60 text-lg mb-16">{whereToBuy.subtitle}</p>

        {/* Placeholder — full list coming from Marketing Manager via MAL-11 */}
        <div className="border border-white/10 bg-white/2 p-12 mb-12">
          <p className="font-label text-xs tracking-widest uppercase text-brand-gold mb-4">
            {lang === 'es' ? 'Próximamente' : 'Coming Soon'}
          </p>
          <p className="text-white/50 leading-relaxed">{whereToBuy.comingSoon}</p>
        </div>

        <Link
          href={`/${lang}/contact`}
          className="font-label text-xs tracking-widest uppercase border border-brand-plum text-brand-mauve px-8 py-4 hover:bg-brand-plum/10 transition-colors"
        >
          {lang === 'es' ? 'Contactanos para distribución →' : 'Contact us for distribution →'}
        </Link>
      </div>
    </section>
  )
}
