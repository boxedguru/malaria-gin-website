import Link from 'next/link'

export type Product = {
  slug: string
  name: string
  abv: string
  profile: string
  tagline: string
  highlight?: string
}

export const products: Product[] = [
  {
    slug: 'original',
    name: 'Malaria Original',
    abv: '40%',
    profile: 'Floral · Citrus · Color-Change',
    tagline: 'El gin que despierta los sentidos.',
    highlight: 'color-change',
  },
  {
    slug: 'black',
    name: 'Malaria Black',
    abv: '47%',
    profile: 'Red Fruits · Jasmine · Black Pepper',
    tagline: 'The Gin that Awakens Your Senses.',
  },
  {
    slug: 'london-dry',
    name: 'Malaria London Dry',
    abv: '43%',
    profile: 'Classic Botanicals · Clean · Traditional',
    tagline: 'For palates seeking authenticity.',
  },
]

type WhereToBuyCta = string

export default function ProductCard({
  product,
  lang,
  whereToBuyCta,
}: {
  product: Product
  lang: string
  whereToBuyCta: WhereToBuyCta
}) {
  return (
    <article className="border border-white/10 hover:border-brand-plum/50 transition-colors bg-black/40 p-6 flex flex-col gap-4">
      {/* Placeholder product image area */}
      <div className="aspect-[3/4] bg-brand-plum/10 flex items-center justify-center border border-brand-plum/20">
        <span className="font-label text-xs tracking-widest uppercase text-brand-mauve/50">
          {product.slug} · image TBD
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-headline text-lg text-white">{product.name}</h3>
          <span className="font-label text-xs tracking-widest uppercase text-brand-gold shrink-0">
            {product.abv}
          </span>
        </div>

        <p className="text-xs text-white/50 uppercase tracking-wide font-label">
          {product.profile}
        </p>

        <p className="text-sm text-white/70 italic">{product.tagline}</p>

        {product.highlight === 'color-change' && (
          <span className="inline-block font-label text-[10px] tracking-widest uppercase text-black bg-brand-gold px-2 py-0.5 self-start">
            Color Change
          </span>
        )}
      </div>

      <Link
        href={`/${lang}/where-to-buy`}
        className="font-label text-xs tracking-widest uppercase text-center border border-white/30 hover:border-brand-plum hover:bg-brand-plum/10 px-4 py-3 transition-colors text-white/70 hover:text-white"
      >
        {whereToBuyCta}
      </Link>
    </article>
  )
}
