import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '../dictionaries'
import type { Locale } from '../dictionaries'

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/story'>): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'es' ? 'Historia' : 'Story',
  }
}

const storyChapters = [
  {
    key: 'chapter1' as const,
    titleKey: 'chapter1Title' as const,
    es: 'En 1840, los soldados británicos en las Indias Orientales descubrieron que la quinina — el antimalario — era más tolerable mezclada con agua tónica. Le agregaron ginebra. Nació el gin & tonic. Nació una obsesión. Nació Malaria Gin.',
    en: 'In 1840, British soldiers in the East Indies discovered that quinine — the antimalarial — was more palatable mixed with tonic water. They added gin. The gin and tonic was born. An obsession was born. Malaria Gin was born.',
  },
  {
    key: 'chapter2' as const,
    titleKey: 'chapter2Title' as const,
    es: 'Raven Clan Distillery, Mar del Plata. Aquí destilamos Malaria Gin con 17 botánicos — incluyendo 7 infusiones de flores — que le dan al Malaria Original su color azul profundo y su transformación a magenta al mezclar con tónica. Un destilado que no pide permiso.',
    en: 'Raven Clan Distillery, Mar del Plata. Here we distil Malaria Gin with 17 botanicals — including 7 flower infusions — that give Malaria Original its deep blue colour and its transformation to magenta when mixed with tonic. A spirit that asks no permission.',
  },
  {
    key: 'chapter3' as const,
    titleKey: 'chapter3Title' as const,
    es: 'Azul en el vaso. Rosa al conocer la tónica. El cambio de color de Malaria Original no es un truco — es química. El pH de la tónica reacciona con las 7 flores infusionadas y revela el magenta. Es el momento más poderoso de la marca, y ocurre en cada vaso.',
    en: 'Blue in the glass. Pink with tonic. The colour change of Malaria Original is not a trick — it is chemistry. The pH of tonic water reacts with the 7 infused flowers and reveals the magenta. It is the most powerful brand moment, and it happens in every glass.',
  },
]

export default async function StoryPage({ params }: PageProps<'/[lang]/story'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)
  const { story } = dict

  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-label text-xs tracking-widest uppercase text-brand-mauve mb-4">
            Malaria Gin
          </p>
          <h1 className="font-headline text-4xl sm:text-5xl text-white">
            {story.title}
          </h1>
        </div>

        <div className="flex flex-col gap-20">
          {storyChapters.map((chapter) => (
            <article key={chapter.key} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-brand-plum/30" />
                <h2 className="font-label text-xs tracking-widest uppercase text-brand-gold whitespace-nowrap">
                  {story[chapter.titleKey]}
                </h2>
                <div className="h-px flex-1 bg-brand-plum/30" />
              </div>
              <p className="text-white/70 leading-relaxed text-lg">
                {lang === 'es' ? chapter.es : chapter.en}
              </p>
            </article>
          ))}
        </div>

        {/* Studio Sinner callout */}
        <div className="mt-20 border-l-2 border-brand-plum pl-6">
          <p className="font-label text-[10px] tracking-widest uppercase text-brand-mauve mb-2">
            {lang === 'es' ? 'Diseño de packaging' : 'Packaging design'}
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            {lang === 'es'
              ? 'Las etiquetas de Malaria Gin fueron diseñadas por Studio Sinner, Mendoza — Art Director: Emmanuel Emmens. Ilustraciones consideradas arte coleccionable.'
              : 'Malaria Gin labels were designed by Studio Sinner, Mendoza — Art Director: Emmanuel Emmens. Illustrations considered collectable artwork.'}
          </p>
        </div>
      </div>
    </section>
  )
}
