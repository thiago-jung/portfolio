'use client'
// /src/components/sections/WorkSection.tsx
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

interface CaseMetric {
    label: string
    before: string
    after: string
    unit: string
}

interface Case {
    id: string
    tag: string
    title: string
    description: string
    metrics: CaseMetric[]
    tags: string[]
    status: string
    year: string
}

// ─── Régua de impacto ─────────────────────────────────────────────────────────

function MetricRuler({ metric }: { metric: CaseMetric }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })
    const afterNum = parseFloat(metric.after)
    const beforeNum = parseFloat(metric.before)

    return (
        <div ref={ref} className="space-y-1.5">
            <div className="flex items-baseline justify-between">
                <span className="text-label opacity-50">{metric.label}</span>
                <div className="flex items-baseline gap-1">
                    <span
                        className="font-body text-[0.65rem]"
                        style={{ color: 'var(--color-text-tertiary)' }}
                    >
                        {metric.before}{metric.unit}
                    </span>
                    <span style={{ color: 'var(--color-text-tertiary)', fontSize: '0.55rem' }}>→</span>
                    <span
                        className="font-display font-bold text-sm"
                        style={{ color: 'var(--color-accent)' }}
                    >
                        {inView ? (
                            <>
                                <AnimatedCounter
                                    to={afterNum}
                                    decimals={metric.unit === 's' ? 1 : 0}
                                />
                                {metric.unit}
                            </>
                        ) : `${metric.after}${metric.unit}`}
                    </span>
                </div>
            </div>

            {/* Barra visual */}
            <div
                className="h-px relative overflow-hidden"
                style={{ background: 'var(--color-border)' }}
            >
                <motion.div
                    className="absolute inset-y-0 left-0"
                    style={{ background: 'var(--color-accent)' }}
                    initial={{ width: '0%' }}
                    animate={inView ? { width: `${(afterNum / Math.max(beforeNum, afterNum)) * 100}%` } : {}}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                />
            </div>
        </div>
    )
}

// ─── Case Card ────────────────────────────────────────────────────────────────

function CaseCard({ case: c, index, locale }: { case: Case; index: number; locale: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })
    const prefersReducedMotion = useReducedMotion()

    return (
        <motion.article
            ref={ref}
            initial={prefersReducedMotion ? {} : { clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            animate={inView ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {}}
            transition={{
                duration: 1.1,
                ease: [0.76, 0, 0.24, 1],
                delay: index * 0.1,
            }}
            className="group relative border p-8 transition-all duration-200"
            style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-surface)',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-accent)'
                e.currentTarget.style.boxShadow = '0 0 24px var(--color-accent-glow)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.boxShadow = 'none'
            }}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="text-label mb-2">{c.tag}</div>
                    <h3
                        className="font-display font-extrabold tracking-[-0.03em]"
                        style={{
                            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        {c.title}
                    </h3>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                    <span
                        className="text-label"
                        style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}
                    >
                        ● {c.status}
                    </span>
                    <span
                        className="text-label opacity-30"
                        style={{ fontSize: '0.6rem' }}
                    >
                        {c.year}
                    </span>
                </div>
            </div>

            <p
                className="mb-8 leading-relaxed"
                style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-body)',
                }}
            >
                {c.description}
            </p>

            {/* Régua de impacto */}
            <div className="space-y-4 mb-8">
                {c.metrics.map(metric => (
                    <MetricRuler key={metric.label} metric={metric} />
                ))}
            </div>

            {/* Tags + CTA */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                    {c.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-label px-2 py-1"
                            style={{
                                fontSize: '0.55rem',
                                background: 'var(--color-accent-dim)',
                                color: 'var(--color-accent)',
                                border: '1px solid var(--color-border-accent)',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <Link
                    href={`/${locale}/trabalhos/${c.id}`}
                    data-cursor-label="ABRIR"
                    className="inline-flex items-center gap-1.5 font-accent text-xs tracking-widest uppercase transition-colors"
                    style={{ color: 'var(--color-text-tertiary)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
                >
                    {locale === 'pt-BR' ? 'Ver case' : 'View case'}
                    <ArrowUpRight size={12} aria-hidden="true" />
                </Link>
            </div>
        </motion.article>
    )
}

// ─── Work Section ─────────────────────────────────────────────────────────────

export function WorkSection({ locale }: { locale: string }) {
    const t = useTranslations('work')
    const cases = t.raw('cases') as Case[]

    return (
        <section
            aria-labelledby="work-heading"
            className="py-[var(--spacing-section)]"
            style={{ borderTop: '1px solid var(--color-border)' }}
        >
            <div className="max-w-[var(--spacing-container)] mx-auto px-[var(--spacing-gutter)]">

                {/* Header */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="text-label mb-4">{t('label')}</div>
                        <h2
                            id="work-heading"
                            className="text-display"
                            style={{
                                fontFamily: 'var(--font-display)',
                                color: 'var(--color-text-primary)',
                            }}
                        >
                            {t('headline')}
                        </h2>
                    </div>

                    {/* CTA para /trabalhos — renderizado agora */}
                    <Link
                        href={`/${locale}/trabalhos`}
                        className="inline-flex items-center gap-2 font-accent text-xs tracking-widest uppercase transition-colors shrink-0"
                        style={{ color: 'var(--color-text-tertiary)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
                    >
                        {t('cta')}
                        <ArrowUpRight size={12} aria-hidden="true" />
                    </Link>
                </div>

                {/* Cases */}
                <div className="space-y-4">
                    {cases.map((c, i) => (
                        <CaseCard key={c.id} case={c} index={i} locale={locale} />
                    ))}
                </div>

            </div>
        </section>
    )
}