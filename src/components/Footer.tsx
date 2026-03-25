import Link from 'next/link'
import type { Locale } from '@/app/[lang]/dictionaries'

type FooterDict = {
  tagline: string
  legal: string
  drinkResponsibly: string
}

export default function Footer({ lang, dict }: { lang: Locale; dict: FooterDict }) {
  return (
    <footer className="bg-black border-t border-white/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <p className="font-headline text-xl text-white mb-1">Malaria Gin</p>
            <p className="font-label text-xs tracking-widest uppercase text-brand-mauve">
              {dict.tagline}
            </p>
          </div>

          <div className="flex gap-6">
            {[
              { href: 'https://instagram.com/malaria_gin', label: 'Instagram' },
              { href: 'https://tiktok.com/@malariagin', label: 'TikTok' },
              { href: 'https://facebook.com/malariagin', label: 'Facebook' },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col gap-2">
          <p className="text-xs text-white/40">{dict.legal}</p>
          <p className="text-xs text-white/30">{dict.drinkResponsibly}</p>
        </div>
      </div>
    </footer>
  )
}
