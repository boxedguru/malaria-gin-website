import 'server-only'

const dictionaries = {
  es: () => import('./dictionaries/es.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
}

export type Locale = keyof typeof dictionaries

export const locales = Object.keys(dictionaries) as Locale[]

export function hasLocale(lang: string): lang is Locale {
  return lang in dictionaries
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}
