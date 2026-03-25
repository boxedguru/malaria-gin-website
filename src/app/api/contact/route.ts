import { NextResponse } from 'next/server'

// Contact form handler — uses Resend for email delivery.
// Requires RESEND_API_KEY and CONTACT_TO_EMAIL env vars (set in Vercel dashboard).

const RESEND_API_URL = 'https://api.resend.com/emails'

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'contacto@malariagin.com'

  if (!apiKey) {
    // Graceful degradation: log the submission server-side, return success to user
    const body = await request.json()
    console.error('[contact] RESEND_API_KEY not set — form submission received but not forwarded:', body)
    return NextResponse.json({ ok: true })
  }

  let body: { name?: string; email?: string; message?: string; reason?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, message, reason } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
  }

  const html = `
    <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    <p><strong>Reason:</strong> ${escapeHtml(reason ?? 'general')}</p>
    <hr />
    <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
  `

  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Malaria Gin Website <noreply@malariagin.com>',
      to: [toEmail],
      reply_to: email,
      subject: `[Web] ${reason ?? 'Consulta'} — ${name}`,
      html,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('[contact] Resend error:', res.status, text)
    return NextResponse.json({ error: 'Failed to send' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
