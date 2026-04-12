import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/contactSchema'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 }
      )
    }

    const { name, email, company, service, message } = result.data
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: 'ATLAS Contact Form <noreply@atlasagency.com>',
      to: process.env.CONTACT_EMAIL ?? 'hello@atlasagency.com',
      replyTo: email,
      subject: `New inquiry from ${name} — ${service}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company ?? 'Not provided'}`,
        `Service: ${service}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
