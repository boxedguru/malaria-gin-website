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

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  const isEs = lang === 'es'
  return {
    title: {
      default: 'Malaria Gin',
      template: '%s — Malaria Gin',
    },
    description: isEs
      ? 'Super Premium Gin Argentino. Destilado en rebeldía desde Mar del Plata.'
      : 'Super Premium Argentine Gin. Distilled in defiance from Mar del Plata.',
    openGraph: {
      siteName: 'Malaria Gin',
      locale: isEs ? 'es_AR' : 'en_US',
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
