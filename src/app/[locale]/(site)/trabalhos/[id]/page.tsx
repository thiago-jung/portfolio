// /src/app/[locale]/(site)/trabalhos/[id]/page.tsx
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SITE } from '@/constants/site'
import ptBR from '@/messages/pt-BR.json'

interface CaseMetric { label: string; before: string; after: string; unit: string }
interface Case {
    id: string; tag: string; title: string; description: string
    metrics: CaseMetric[]; tags: string[]; status: string; year: string
}

interface PageProps { params: Promise<{ locale: string; id: string }> }

// PERF: Gera apenas as rotas que existem — sem 404 em build
export function generateStaticParams() {
    const caseIds = (ptBR.work.cases as Case[]).map(c => c.id)
    return SITE.locale.supported.flatMap(locale =>
        caseIds.map(id => ({ locale, id }))
    )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, id } = await params
    const t = await getTranslations({ locale, namespace: 'work' })
    const cases = t.raw('cases') as Case[]
    const currentCase = cases.find(c => c.id === id)
    if (!currentCase) return {}
    return {
        title: `${currentCase.title} · Thiago`,
        description: currentCase.description,
        openGraph: {
            title: currentCase.title,
            description: currentCase.description,
            images: [{ url: `/api/og?locale=${locale}&page=work`, width: 1200, height: 630 }],
        },
        alternates: {
            canonical: `${SITE.url}/${locale}/trabalhos/${id}`,
        },
    }
}

export default async function CaseDetailPage({ params }: PageProps) {
    const { locale, id } = await params
    const t = await getTranslations({ locale, namespace: 'work' })
    const cases = t.raw('cases') as Case[]
    const c = cases.find(case_ => case_.id === id)

    if (!c) notFound()

    return (
        <main id="main-content" className="py-[var(--spacing-section)]">
            <div
                className="max-w-[var(--spacing-container)] mx-auto px-[var(--spacing-gutter)]"
                style={{ paddingTop: '80px' }}
            >

                {/* Back link */}
                <a
                    href={`/${locale}/trabalhos`}
                    className="back-link inline-flex items-center gap-2 text-label mb-12"
                >
                    ← {locale === 'pt-BR' ? 'Todos os trabalhos' : 'All work'}
                </a>

                {/* Header */}
                <div className="mb-16 max-w-3xl">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-label" style={{ color: 'var(--color-accent)' }}>
                            {c.tag}
                        </span>
                        <span className="text-label opacity-30" style={{ fontSize: '0.6rem' }}>
                            {c.year}
                        </span>
                        <span className="text-label" style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>
                            ● {c.status}
                        </span>
                    </div>
                    <h1
                        className="text-display mb-8"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                    >
                        {c.title}
                    </h1>
                    <p
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.8,
                        }}
                    >
                        {c.description}
                    </p>
                </div>

                {/* Metrics — destaque visual */}
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-px mb-16"
                    style={{ background: 'var(--color-border)' }}
                >
                    {c.metrics.map(metric => (
                        <div
                            key={metric.label}
                            className="p-8"
                            style={{ background: 'var(--color-surface)' }}
                        >
                            <div
                                className="text-label mb-4"
                                style={{ color: 'var(--color-text-tertiary)' }}
                            >
                                {metric.label}
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span
                                    style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-tertiary)',
                                        textDecoration: 'line-through',
                                    }}
                                >
                                    {metric.before}{metric.unit}
                                </span>
                                <span style={{ color: 'var(--color-text-tertiary)', fontSize: '0.75rem' }}>→</span>
                                <span
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontWeight: 800,
                                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                                        color: 'var(--color-accent)',
                                        letterSpacing: '-0.03em',
                                    }}
                                >
                                    {metric.after}{metric.unit}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {c.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-label px-3 py-1.5"
                            style={{
                                fontSize: '0.6rem',
                                background: 'var(--color-accent-dim)',
                                color: 'var(--color-accent)',
                                border: '1px solid var(--color-border-accent)',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

            </div>
        </main>
    )
}