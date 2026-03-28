// /src/app/[locale]/(site)/cartao/page.tsx
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { BusinessCard } from '@/components/business-card/BusinessCard'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'metadata.card' })
    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [{ url: `/api/og?locale=${locale}&page=card`, width: 1200, height: 630 }],
        },
        alternates: {
            canonical: `${SITE.url}/${locale}/cartao`,
            languages: {
                'pt-BR': `${SITE.url}/pt-BR/cartao`,
                'en': `${SITE.url}/en/card`,
            },
        },
    }
}

export default async function CartaoPage({ params }: PageProps) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'card' })

    return (
        <main id="main-content" className="py-[var(--spacing-section)]">
            <div className="max-w-[var(--spacing-container)] mx-auto px-[var(--spacing-gutter)]">

                <div className="mb-16 text-center">
                    <div className="text-label mb-4">{t('label')}</div>
                    <h1
                        className="text-display"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                    >
                        {t('headline')}
                    </h1>
                </div>

                <BusinessCard locale={locale} />

                {/* Schema.org para NFC e buscas */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Person',
                            name: SITE.author.name,
                            jobTitle: SITE.author.role,
                            email: SITE.author.email,
                            telephone: SITE.author.phone,
                            url: SITE.url,
                            sameAs: [SITE.author.linkedin, SITE.author.github],
                        }),
                    }}
                />
            </div>
        </main>
    )
}