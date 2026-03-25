import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '../dictionaries'
import type { Locale } from '../dictionaries'
import ContactForm from './ContactForm'

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/contact'>): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'es' ? 'Contacto' : 'Contact',
  }
}

export default async function ContactPage({ params }: PageProps<'/[lang]/contact'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)
  const { contact } = dict

  return (
    <section className="py-24 px-4 bg-black min-h-screen">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <p className="font-label text-xs tracking-widest uppercase text-brand-mauve mb-4">
            Malaria Gin
          </p>
          <h1 className="font-headline text-4xl sm:text-5xl text-white mb-4">
            {contact.title}
          </h1>
          <p className="text-white/50">{contact.subtitle}</p>
        </div>

        <ContactForm dict={contact} lang={lang} />
      </div>
    </section>
  )
}
