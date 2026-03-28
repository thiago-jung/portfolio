// /src/app/[locale]/(site)/servicos/page.tsx
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SITE } from '@/constants/site'

interface PageProps { params: Promise<{ locale: string }> }

interface ServiceItem {
    id: string
    tag: string
    title: string
    description: string
    metrics: string[]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'metadata.services' })
    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [{ url: `/api/og?locale=${locale}&page=services`, width: 1200, height: 630 }],
        },
        alternates: {
            canonical: `${SITE.url}/${locale}/servicos`,
            languages: {
                'pt-BR': `${SITE.url}/pt-BR/servicos`,
                'en': `${SITE.url}/en/servicos`,
            },
        },
    }
}

export default async function ServicosPage({ params }: PageProps) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'services' })
    const items = t.raw('items') as ServiceItem[]

    return (
        <main id="main-content" className="py-[var(--spacing-section)]">
            <div
                className="max-w-[var(--spacing-container)] mx-auto px-[var(--spacing-gutter)]"
                style={{ paddingTop: '80px' }}
            >

                {/* Header */}
                <div className="mb-20 max-w-2xl">
                    <div className="text-label mb-6">{t('label')}</div>
                    <h1
                        className="text-display mb-6"
                        style={{
                            fontFamily: 'var(--font-display)',
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        {t('headline')}
                    </h1>
                    <p
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.7,
                        }}
                    >
                        {t('subheadline')}
                    </p>
                </div>

                {/* Services grid — gap de 1px para efeito de grade */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-px"
                    style={{ background: 'var(--color-border)' }}
                >
                    {items.map((item, i) => (
                        <div
                            key={item.id}
                            className="service-card group p-10"
                        >
                            {/* Index + tag */}
                            <div className="flex items-center justify-between mb-8">
                                <span
                                    className="text-label"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    {item.tag}
                                </span>
                                <span
                                    className="text-label opacity-20"
                                    style={{ fontSize: '0.6rem' }}
                                >
                                    0{i + 1}
                                </span>
                            </div>

                            {/* Title */}
                            <h2
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 800,
                                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                                    letterSpacing: '-0.03em',
                                    color: 'var(--color-text-primary)',
                                    marginBottom: '1rem',
                                }}
                            >
                                {item.title}
                            </h2>

                            {/* Description */}
                            <p
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.875rem',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 1.7,
                                    marginBottom: '2rem',
                                }}
                            >
                                {item.description}
                            </p>

                            {/* Metrics */}
                            <ul className="space-y-2 list-none p-0 m-0">
                                {item.metrics.map(metric => (
                                    <li
                                        key={metric}
                                        className="flex items-center gap-2"
                                        style={{
                                            fontFamily: 'var(--font-accent)',
                                            fontSize: '0.65rem',
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
                    ))}
                </div>

                {/* Schema.org */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'ItemList',
                            itemListElement: items.map((item, i) => ({
                                '@type': 'ListItem',
                                position: i + 1,
                                name: item.title,
                                description: item.description,
                            })),
                        }),
                    }}
                />
            </div>
        </main>
    )
}