'use client'
// /src/components/sections/AboutSection.tsx
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

// DECISÃO: Seção "estranha" do design — layout invertido onde o texto
// principal fica à direita e o lado esquerdo tem a citação/filosofia
// em grande. Quebra o ritmo das seções acima.
export function AboutSection({ locale }: { locale: string }) {
    const t = useTranslations('about')
    const prefersReducedMotion = useReducedMotion()
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-8%' })

    return (
        <section
            ref={ref}
            aria-labelledby="about-heading"
            className="py-[var(--spacing-section)]"
            style={{ borderTop: '1px solid var(--color-border)' }}
        >
            <div className="max-w-[var(--spacing-container)] mx-auto px-[var(--spacing-gutter)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Esquerda: filosofia em destaque */}
                    <motion.div
                        initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="text-label mb-6">{t('label')}</div>

                        {/* Citação — elemento de assinatura visual */}
                        <blockquote
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                                letterSpacing: '-0.03em',
                                lineHeight: 1.1,
                                color: 'var(--color-text-primary)',
                                margin: 0,
                                padding: 0,
                                border: 'none',
                            }}
                        >
                            <span
                                style={{
                                    display: 'block',
                                    fontFamily: 'var(--font-accent)',
                                    fontSize: '2rem',
                                    color: 'var(--color-accent)',
                                    lineHeight: 1,
                                    marginBottom: '0.25rem',
                                }}
                                aria-hidden="true"
                            >
                                "
                            </span>
                            {t('philosophy')}
                        </blockquote>
                    </motion.div>

                    {/* Direita: bio + link */}
                    <motion.div
                        initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        className="flex flex-col gap-10"
                    >
                        <h2
                            id="about-heading"
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                                letterSpacing: '-0.03em',
                                color: 'var(--color-text-primary)',
                                margin: 0,
                            }}
                        >
                            {t('headline')}
                        </h2>

                        <p
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
                                color: 'var(--color-text-secondary)',
                                lineHeight: 1.8,
                                margin: 0,
                            }}
                        >
                            {t('bio')}
                        </p>

                        <Link
                            href={`/${locale}/sobre`}
                            className="inline-flex items-center gap-2 font-accent text-xs tracking-widest uppercase transition-colors self-start"
                            style={{ color: 'var(--color-text-tertiary)' }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)' }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
                        >
                            {locale === 'pt-BR' ? 'Sobre mim' : 'About me'}
                            <ArrowUpRight size={12} aria-hidden="true" />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}