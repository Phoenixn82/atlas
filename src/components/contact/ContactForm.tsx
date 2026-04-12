'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { contactSchema, type ContactFormData } from '@/lib/contactSchema'

const SERVICE_OPTIONS = [
  { value: 'web-design', label: 'Web Design' },
  { value: 'seo', label: 'SEO' },
  { value: 'bundle', label: 'Web Design + SEO Bundle' },
  { value: 'not-sure', label: "Not sure yet" },
]

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col justify-center min-h-[400px]">
        <div className="w-6 h-[4px] mb-8" style={{ backgroundColor: 'var(--atlas-black)' }} />
        <p className="font-bold uppercase tracking-tight mb-4" style={{ fontSize: '1.75rem', color: 'var(--atlas-black)' }}>
          MESSAGE RECEIVED.
        </p>
        <p className="text-base font-mono leading-relaxed" style={{ color: 'var(--atlas-gray-500)' }}>
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">
      <Input
        label="Name"
        placeholder="Your full name"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Company / Website"
        placeholder="acme.com"
        {...register('company')}
        error={errors.company?.message}
      />
      <Select
        label="Service"
        options={SERVICE_OPTIONS}
        {...register('service')}
        error={errors.service?.message}
      />
      <Textarea
        label="Message"
        placeholder="Tell us about your project..."
        {...register('message')}
        error={errors.message?.message}
      />

      {status === 'error' && (
        <p className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--atlas-red)' }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
      </Button>
    </form>
  )
}
