const awards = [
  { label: 'IWSC 2021', detail: 'Best Arg. Flavoured Gin · 90/100' },
  { label: 'IWSC 2023', detail: 'Best Arg. Flavoured Gin · 90/100' },
  { label: 'World Gin Awards', detail: 'Winner' },
  { label: 'CWSA', detail: 'Recognition' },
  { label: 'Bartender Spirits Awards 2023', detail: 'Silver · 89 pts' },
]

export default function AwardsStrip({ title }: { title: string }) {
  return (
    <section className="bg-brand-plum/20 border-y border-brand-plum/30 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-label text-xs tracking-widest uppercase text-brand-gold text-center mb-8">
          {title}
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {awards.map((award) => (
            <div
              key={award.label}
              className="text-center border border-brand-gold/30 px-5 py-3 min-w-[160px]"
            >
              <p className="font-label text-xs tracking-widest uppercase text-brand-gold">
                {award.label}
              </p>
              <p className="text-xs text-white/60 mt-1">{award.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
