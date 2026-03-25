/**
 * Font setup for Malaria Gin website.
 *
 * AnticvaRegular — brand headline serif (sourced from malariagin.com)
 *   Placeholder: Playfair Display (Google Fonts). Replace with the actual
 *   AnticvaRegular.woff2 file in /public/fonts/ once assets are delivered.
 *
 * Roboto — body text (Google Fonts ✓)
 *
 * Satoshi — uppercase label/CTA font (from Fontshare, not Google Fonts)
 *   Placeholder: Space Grotesk (Google Fonts). Replace with Satoshi.woff2
 *   once assets are delivered.
 */
import { Roboto, Playfair_Display, Space_Grotesk } from 'next/font/google'

// Headline: AnticvaRegular placeholder — Playfair Display
export const anticva = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anticva',
  display: 'swap',
})

// Body: Roboto 400 + 600
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-roboto',
  display: 'swap',
})

// Label/CTA: Satoshi placeholder — Space Grotesk 700
export const satoshi = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-satoshi',
  display: 'swap',
})
