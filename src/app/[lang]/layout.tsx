import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'
import { anticva, roboto, satoshi } from '@/lib/fonts'
import { getDictionary, hasLocale, locales } from './dictionaries'
import type { Locale } from './dictionaries'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://malariagin.com'

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  const isEs = lang === 'es'
  const description = isEs
    ? 'Super Premium Gin Argentino. Destilado en rebeldía desde Mar del Plata. Ganador IWSC 2021 y 2023.'
    : 'Super Premium Argentine Gin. Distilled in defiance from Mar del Plata. IWSC winner 2021 & 2023.'

  return {
    title: {
      default: 'Malaria Gin',
      template: '%s — Malaria Gin',
    },
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'es-AR': '/es',
        'en-US': '/en',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Malaria Gin',
      locale: isEs ? 'es_AR' : 'en_US',
      description,
      images: [
        {
          url: '/og-default.jpg', // placeholder — real OG image TBD with assets from MAL-11
          width: 1200,
          height: 630,
          alt: 'Malaria Gin — Super Premium Argentine Gin',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@malaria_gin',
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)

  return (
    <html
      lang={lang}
      className={`${anticva.variable} ${roboto.variable} ${satoshi.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-black text-white">
        <NavBar lang={lang as Locale} dict={dict.nav} />
        <main className="flex-1 pt-16">{children}</main>
        <Footer lang={lang as Locale} dict={dict.footer} />
      </body>
    </html>
  )
}
