'use client'

import { useState } from 'react'

type ContactDict = {
  namePlaceholder: string
  emailPlaceholder: string
  messagePlaceholder: string
  reasonLabel: string
  reasonOptions: {
    general: string
    trade: string
    press: string
    events: string
  }
  submit: string
  successMessage: string
}

export default function ContactForm({ dict, lang }: { dict: ContactDict; lang: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      reason: (form.elements.namedItem('reason') as HTMLSelectElement).value,
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('send_failed')
      setSubmitted(true)
    } catch {
      setError(
        lang === 'es'
          ? 'Algo salió mal. Intentá de nuevo.'
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 border border-brand-plum/30">
        <p className="font-headline text-2xl text-white">{dict.successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="font-label text-[10px] tracking-widest uppercase text-white/40 block mb-1.5">
          {dict.reasonLabel}
        </label>
        <select
          name="reason"
          required
          className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-brand-plum transition-colors"
        >
          <option value="general">{dict.reasonOptions.general}</option>
          <option value="trade">{dict.reasonOptions.trade}</option>
          <option value="press">{dict.reasonOptions.press}</option>
          <option value="events">{dict.reasonOptions.events}</option>
        </select>
      </div>

      <input
        type="text"
        name="name"
        placeholder={dict.namePlaceholder}
        required
        className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 px-4 py-3 text-sm focus:outline-none focus:border-brand-plum transition-colors"
      />

      <input
        type="email"
        name="email"
        placeholder={dict.emailPlaceholder}
        required
        className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 px-4 py-3 text-sm focus:outline-none focus:border-brand-plum transition-colors"
      />

      <textarea
        name="message"
        placeholder={dict.messagePlaceholder}
        required
        rows={5}
        className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 px-4 py-3 text-sm focus:outline-none focus:border-brand-plum transition-colors resize-none"
      />

      {error && (
        <p className="text-brand-red text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="font-label text-xs tracking-widest uppercase bg-brand-plum text-white py-4 hover:bg-brand-plum/80 transition-colors disabled:opacity-50"
      >
        {loading ? '...' : dict.submit}
      </button>
    </form>
  )
}
