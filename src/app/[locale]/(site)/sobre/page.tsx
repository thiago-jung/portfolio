// /src/app/[locale]/(site)/sobre/page.tsx
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SITE } from '@/constants/site'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'metadata.about' })
    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [{ url: `/api/og?locale=${locale}&page=about`, width: 1200, height: 630 }],
        },
        alternates: {
            canonical: `${SITE.url}/${locale}/sobre`,
            languages: {
                'pt-BR': `${SITE.url}/pt-BR/sobre`,
                'en': `${SITE.url}/en/sobre`,
            },
        },
    }
}

type Skills = Record<string, string[]>

export default async function AboutPage({ params }: PageProps) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'about' })
    const skills = t.raw('skills') as Skills

    const skillCategories = Object.entries(skills)

    return (
        <main id="main-content" className="py-[var(--spacing-section)]">
            <div
                className="max-w-[var(--spacing-container)] mx-auto px-[var(--spacing-gutter)]"
                style={{ paddingTop: '80px' }}
            >

                {/* Header */}
                <div className="mb-20 max-w-3xl">
                    <div className="text-label mb-6">{t('label')}</div>
                    <h1
                        className="text-display mb-10"
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
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.8,
                        }}
                    >
                        {t('bio')}
                    </p>
                </div>

                {/* Philosophy — seção de impacto */}
                <div
                    className="mb-20 py-16 border-y"
                    style={{ borderColor: 'var(--color-border)' }}
                >
                    <blockquote
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            color: 'var(--color-text-primary)',
                            maxWidth: '800px',
                        }}
                    >
                        <span style={{ color: 'var(--color-accent)' }}>"</span>
                        {t('philosophy')}
                        <span style={{ color: 'var(--color-accent)' }}>"</span>
                    </blockquote>
                </div>

                {/* Skills */}
                <div>
                    <div className="text-label mb-8" style={{ color: 'var(--color-text-tertiary)' }}>
                        STACK
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
                        style={{ background: 'var(--color-border)' }}
                    >
                        {skillCategories.map(([category, items]) => (
                            <div
                                key={category}
                                className="p-8"
                                style={{ background: 'var(--color-base)' }}
                            >
                                <div
                                    className="text-label mb-6"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    {category.toUpperCase()}
                                </div>
                                <ul className="space-y-2 list-none p-0 m-0">
                                    {items.map((item: string) => (
                                        <li
                                            key={item}
                                            style={{
                                                fontFamily: 'var(--font-body)',
                                                fontSize: '0.85rem',
                                                color: 'var(--color-text-secondary)',
                                            }}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Schema.org */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Person',
                            name: SITE.author.name,
                            jobTitle: SITE.author.role,
                            url: SITE.url,
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Porto Alegre',
                                addressRegion: 'RS',
                                addressCountry: 'BR',
                            },
                            knowsAbout: Object.values(skills).flat(),
                        }),
                    }}
                />
            </div>
        </main>
    )
}