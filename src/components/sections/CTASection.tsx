'use client'
// /src/components/sections/CTASection.tsx
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// DECISÃO: Background não é gradiente purple — é a própria paleta do site
// com uma variação de densidade da grade. Mesmo visual, mais impacto.
export function CTASection({ locale }: { locale: string }) {
    const t = useTranslations('cta')
    const prefersReducedMotion = useReducedMotion()
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-5%' })

    return (
        <section
            ref={ref}
            aria-labelledby="cta-heading"
            className="py-[var(--spacing-section)] relative overflow-hidden"
            style={{ borderTop: '1px solid var(--color-border)' }}
        >
            {/* Glow de fundo — accent radial no centro */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,255,148,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
                aria-hidden="true"
            />

            <div className="max-w-[var(--spacing-container)] mx-auto px-[var(--spacing-gutter)] relative">
                <div className="max-w-3xl mx-auto text-center">

                    {/* Badge */}
                    <motion.div
                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center justify-center gap-2 mb-10"
                    >
                        <span
                            className="status-blink"
                            style={{ color: 'var(--color-accent)', fontSize: '0.4rem' }}
                        >
                            ●
                        </span>
                        <span className="text-label">{t('badge')}</span>
                    </motion.div>

                    {/* Headline — a frase mais memorável do site */}
                    <motion.h2
                        id="cta-heading"
                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            letterSpacing: '-0.04em',
                            lineHeight: 0.95,
                            color: 'var(--color-text-primary)',
                            marginBottom: '1.5rem',
                        }}
                    >
                        {t('headline')}
                    </motion.h2>

                    {/* Subheadline */}
                    <motion.p
                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.7,
                            marginBottom: '3rem',
                        }}
                    >
                        {t('subheadline')}
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <Link
                            href={`/${locale}/contato`}
                            data-cursor-label="OK"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '16px 36px',
                                background: 'var(--color-accent)',
                                color: 'var(--color-base)',
                                fontFamily: 'var(--font-accent)',
                                fontSize: '0.75rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                transition: 'opacity 0.15s, transform 0.15s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.opacity = '0.88'
                                e.currentTarget.style.transform = 'translateY(-1px)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.opacity = '1'
                                e.currentTarget.style.transform = 'translateY(0)'
                            }}
                        >
                            {t('cta')}
                            <ArrowRight size={14} aria-hidden="true" />
                        </Link>

                        {/* Micro-copy — resolve objeção */}
                        <p
                            className="text-label opacity-30"
                            style={{ fontSize: '0.6rem' }}
                        >
                            {t('microcopy')}
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}