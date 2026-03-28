'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Loader2, CheckCircle } from 'lucide-react'
import { sendContactAction, type ContactFormData } from './actions'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/animation-variants'

const schema = z.object({
  name:    z.string().min(2),
  company: z.string().optional(),
  email:   z.string().email(),
  budget:  z.string().optional(),
  message: z.string().min(20),
})

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contact')
  const tf = useTranslations('contact.form')
  const [formState, setFormState] = useState<FormState>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: ContactFormData) => {
    setFormState('loading')
    const result = await sendContactAction(data)
    if (result.success) {
      setFormState('success')
      toast.success(tf('success'))
      reset()
    } else {
      setFormState('error')
      toast.error(result.error ?? tf('error'))
      setTimeout(() => setFormState('idle'), 3000)
    }
  }

  const inputClass = cn(
    'w-full bg-transparent border-b py-3 font-body text-sm outline-none transition-colors duration-150',
    'placeholder:text-tertiary focus:border-accent',
  )

  const fields = [
    { key: 'name',    type: 'text' },
    { key: 'company', type: 'text' },
    { key: 'email',   type: 'email' },
    { key: 'budget',  type: 'text' },
  ] as const

  if (formState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 py-16 text-center"
      >
        <CheckCircle size={32} style={{ color: 'var(--color-accent)' }} />
        <p className="text-label" style={{ color: 'var(--color-accent)' }}>
          {tf('success')}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fields.map(({ key, type }) => (
          <div key={key} className="space-y-1">
            <label
              htmlFor={key}
              className="text-label opacity-60"
            >
              {tf(`${key}.label`)}
            </label>
            <input
              id={key}
              type={type}
              {...register(key)}
              placeholder={tf(`${key}.placeholder`)}
              className={inputClass}
              style={{
                borderColor: errors[key] ? '#ff4444' : 'var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
              aria-invalid={!!errors[key]}
              aria-describedby={errors[key] ? `${key}-error` : undefined}
            />
            {errors[key] && (
              <span
                id={`${key}-error`}
                role="alert"
                className="text-label"
                style={{ color: '#ff4444', fontSize: '0.6rem' }}
              >
                {errors[key]?.message}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Mensagem */}
      <div className="space-y-1">
        <label htmlFor="message" className="text-label opacity-60">
          {tf('message.label')}
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          placeholder={tf('message.placeholder')}
          className={inputClass}
          style={{
            borderColor: errors.message ? '#ff4444' : 'var(--color-border)',
            color: 'var(--color-text-primary)',
            resize: 'none',
          }}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <span role="alert" className="text-label" style={{ color: '#ff4444', fontSize: '0.6rem' }}>
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-col items-start gap-3">
        <button
          type="submit"
          disabled={formState === 'loading'}
          data-cursor-label="OK"
          className="inline-flex items-center gap-2 px-8 py-3 font-accent text-xs tracking-widest uppercase transition-all duration-150 disabled:opacity-50"
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-base)',
          }}
        >
          {formState === 'loading' ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              {tf('submitting')}
            </>
          ) : (
            tf('submit')
          )}
        </button>
        <p className="text-label opacity-30" style={{ fontSize: '0.6rem' }}>
          {t('microcopy')}
        </p>
      </div>
    </form>
  )
}
