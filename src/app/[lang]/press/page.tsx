import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '../dictionaries'
import type { Locale } from '../dictionaries'

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/press'>): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'es' ? 'Prensa' : 'Press',
  }
}

const awards = [
  {
    name: 'IWSC 2021',
    detail: 'Best Argentinian Flavoured Gin',
    score: '90/100',
    body: 'International Wine & Spirits Competition',
  },
  {
    name: 'IWSC 2023',
    detail: 'Best Argentinian Flavoured Gin',
    score: '90/100',
    body: 'International Wine & Spirits Competition',
  },
  {
    name: 'World Gin Awards',
    detail: 'Winner',
    score: null,
    body: 'World Gin Awards',
  },
  {
    name: 'CWSA',
    detail: 'Recognition',
    score: null,
    body: 'Cathay Pacific Wine & Spirits Awards',
  },
  {
    name: 'Bartender Spirits Awards 2023',
    detail: 'Silver Medal',
    score: '89/100',
    body: 'Bartender Spirits Awards',
  },
]

export default async function PressPage({ params }: PageProps<'/[lang]/press'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)
  const { press } = dict

  return (
    <section className="py-24 px-4 bg-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-label text-xs tracking-widest uppercase text-brand-mauve mb-4">
            Malaria Gin
          </p>
          <h1 className="font-headline text-4xl sm:text-5xl text-white">
            {press.title}
          </h1>
        </div>

        {/* Awards */}
        <div className="mb-20">
          <h2 className="font-label text-xs tracking-widest uppercase text-brand-gold text-center mb-10">
            {press.awardsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((award) => (
              <div
                key={award.name}
                className="border border-brand-gold/20 bg-brand-gold/3 p-6"
              >
                <p className="font-label text-xs tracking-widest uppercase text-brand-gold mb-1">
                  {award.name}
                </p>
                <p className="text-white font-body font-semibold mb-1">{award.detail}</p>
                {award.score && (
                  <p className="text-brand-mauve text-sm">{award.score}</p>
                )}
                <p className="text-white/40 text-xs mt-2">{award.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Press kit — placeholder until assets arrive from MAL-11 */}
        <div className="border border-white/10 p-8 text-center mb-16">
          <p className="font-label text-xs tracking-widest uppercase text-white/40 mb-3">
            Press Kit
          </p>
          <p className="text-white/40 text-sm mb-4">
            {lang === 'es'
              ? 'El press kit estará disponible próximamente. Escribinos a continuación.'
              : 'Press kit coming soon. Reach out below.'}
          </p>
          <span className="font-label text-xs tracking-widest uppercase border border-white/20 text-white/30 px-6 py-3 cursor-not-allowed inline-block">
            {press.downloadKit}
          </span>
        </div>

        {/* Press contact */}
        <div className="text-center">
          <h2 className="font-label text-xs tracking-widest uppercase text-brand-mauve mb-3">
            {press.contactTitle}
          </h2>
          <a
            href={`mailto:${press.contactCta}`}
            className="font-headline text-xl text-white hover:text-brand-gold transition-colors"
          >
            {press.contactCta}
          </a>
        </div>
      </div>
    </section>
  )
}
