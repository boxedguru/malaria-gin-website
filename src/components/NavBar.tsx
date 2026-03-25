'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/app/[lang]/dictionaries'

type NavDict = {
  products: string
  story: string
  whereToBuy: string
  press: string
  contact: string
}

export default function NavBar({ lang, dict }: { lang: Locale; dict: NavDict }) {
  const pathname = usePathname()
  const otherLang: Locale = lang === 'es' ? 'en' : 'es'

  // Swap locale prefix in current path
  const otherPath = pathname.replace(new RegExp(`^/${lang}`), `/${otherLang}`)

  const links = [
    { href: `/${lang}/products`, label: dict.products },
    { href: `/${lang}/story`, label: dict.story },
    { href: `/${lang}/where-to-buy`, label: dict.whereToBuy },
    { href: `/${lang}/press`, label: dict.press },
    { href: `/${lang}/contact`, label: dict.contact },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href={`/${lang}`}
          className="font-headline text-white text-lg tracking-widest uppercase hover:text-brand-mauve transition-colors"
        >
          Malaria Gin
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-label text-xs tracking-widest uppercase transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'text-brand-gold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={otherPath}
          className="font-label text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors border border-white/20 hover:border-white/50 px-3 py-1.5"
        >
          {otherLang.toUpperCase()}
        </Link>
      </nav>
    </header>
  )
}
