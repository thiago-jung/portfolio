'use client'
// /src/app/[locale]/error.tsx
import { useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
    const t = useTranslations('error')
    const locale = useLocale()

    useEffect(() => {
        console.error('[Error boundary]', error)
    }, [error])

    return (
        <main className="min-h-[100svh] flex flex-col items-center justify-center text-center px-[var(--spacing-gutter)]">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
            >
                <div className="text-label" style={{ color: '#ff4444' }}>
                    {t('label')}
                </div>

                <div
                    className="font-display font-extrabold"
                    style={{
                        fontSize: 'clamp(5rem, 15vw, 10rem)',
                        color: 'var(--color-surface)',
                        lineHeight: 1,
                        letterSpacing: '-0.05em',
                        textShadow: '0 0 60px rgba(255,68,68,0.2)',
                    }}
                    aria-hidden="true"
                >
                    500
                </div>

                <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                    {t('message')}
                </p>

                {error.digest && (
                    <p
                        className="text-label opacity-20"
                        style={{ fontSize: '0.55rem' }}
                        aria-label="Error ID"
                    >
                        digest: {error.digest}
                    </p>
                )}

                <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-6 py-3 font-accent text-xs tracking-widest uppercase border transition-all duration-150"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--color-accent)'
                        e.currentTarget.style.color = 'var(--color-accent)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--color-border)'
                        e.currentTarget.style.color = 'var(--color-text-secondary)'
                    }}
                >
                    {t('cta')}
                </button>
            </motion.div>
        </main>
    )
}