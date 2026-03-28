'use client'
// /src/components/sections/ServicesSection.tsx
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface ServiceItem {
    id: string
    tag: string
    title: string
    description: string
    metrics: string[]
}

// DECISÃO: Grid assimétrico 1+3 — o primeiro item ocupa coluna dupla no desktop,
// quebra o ritmo de cards iguais e cria hierarquia visual sem precisar de ícone.
export function ServicesSection({ locale }: { locale: string }) {
    const t = useTranslations('services')
    const items = t.raw('items') as ServiceItem[]
    const prefersReducedMotion = useReducedMotion()
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-8%' })

    return (
        <section
            ref={ref}
            aria-labelledby="services-heading"
            className="py-[var(--spacing-section)]"
            style={{ borderTop: '1px solid var(--color-border)' }}
        >
            <div className="max-w-[var(--spacing-container)] mx-auto px-[var(--spacing-gutter)]">

                {/* Header */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="text-label mb-4">{t('label')}</div>
                        <h2
                            id="services-heading"
                            className="text-display"
                            style={{
                                fontFamily: 'var(--font-display)',
                                color: 'var(--color-text-primary)',
                            }}
                        >
                            {t('headline')}
                        </h2>
                    </div>
                    <Link
                        href={`/${locale}/servicos`}
                        className="inline-flex items-center gap-2 font-accent text-xs tracking-widest uppercase transition-colors shrink-0"
                        style={{ color: 'var(--color-text-tertiary)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
                    >
                        {locale === 'pt-BR' ? 'Ver todos' : 'View all'}
                        <ArrowUpRight size={12} aria-hidden="true" />
                    </Link>
                </div>

                {/* Grid assimétrico — item 0 ocupa 2 colunas no desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'var(--color-border)' }}>
                    {items.map((item, i) => {
                        const isFirst = i === 0
                        return (
                            <motion.div
                                key={item.id}
                                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: i * 0.08,
                                }}
                                className={`group p-10 transition-colors duration-150 ${isFirst ? 'md:col-span-2' : ''}`}
                                style={{ background: 'var(--color-base)' }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLDivElement).style.background = 'var(--color-surface)'
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLDivElement).style.background = 'var(--color-base)'
                                }}
                            >
                                <div className={`${isFirst ? 'max-w-2xl' : ''}`}>
                                    {/* Tag + index */}
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-label" style={{ color: 'var(--color-accent)' }}>
                                            {item.tag}
                                        </span>
                                        <span className="text-label opacity-20" style={{ fontSize: '0.6rem' }}>
                                            0{i + 1}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        style={{
                                            fontFamily: 'var(--font-display)',
                                            fontWeight: 800,
                                            fontSize: isFirst
                                                ? 'clamp(1.5rem, 3vw, 2.25rem)'
                                                : 'clamp(1.2rem, 2.5vw, 1.75rem)',
                                            letterSpacing: '-0.03em',
                                            color: 'var(--color-text-primary)',
                                            marginBottom: '1rem',
                                        }}
                                    >
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        style={{
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '0.875rem',
                                            color: 'var(--color-text-secondary)',
                                            lineHeight: 1.7,
                                            marginBottom: '1.5rem',
                                        }}
                                    >
                                        {item.description}
                                    </p>

                                    {/* Metrics */}
                                    <ul className="flex flex-wrap gap-x-6 gap-y-1 list-none p-0 m-0">
                                        {item.metrics.map(metric => (
                                            <li
                                                key={metric}
                                                className="flex items-center gap-1.5"
                                                style={{
                                                    fontFamily: 'var(--font-accent)',
                                                    fontSize: '0.6rem',
                                                    letterSpacing: '0.05em',
                                                    color: 'var(--color-text-tertiary)',
                                                }}
                                            >
                                                <span style={{ color: 'var(--color-accent)' }}>—</span>
                                                {metric}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}