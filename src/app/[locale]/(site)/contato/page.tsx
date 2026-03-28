// /src/app/[locale]/(site)/contato/page.tsx
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { ContactForm } from './ContactForm'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'metadata.contact' })
    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [{ url: `/api/og?locale=${locale}&page=contact`, width: 1200, height: 630 }],
        },
        alternates: {
            canonical: `${SITE.url}/${locale}/contato`,
            languages: {
                'pt-BR': `${SITE.url}/pt-BR/contato`,
                'en': `${SITE.url}/en/contact`,
            },
        },
    }
}

export default async function ContactPage({ params }: PageProps) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'contact' })

    return (
        <main id="main-content" className="py-[var(--spacing-section)]">
            <div className="max-w-[var(--spacing-container)] mx-auto px-[var(--spacing-gutter)]">

                {/* Header */}
                <div className="mb-16 max-w-2xl">
                    <div className="text-label mb-4">
                        <span className="status-blink mr-2" style={{ color: 'var(--color-accent)' }}>●</span>
                        {t('availability')}
                    </div>
                    <h1
                        className="text-display mb-6"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                    >
                        {t('headline')}
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
                        {t('subheadline')}
                    </p>
                </div>

                {/* Form */}
                <div className="max-w-3xl">
                    <ContactForm locale={locale} />
                </div>

                {/* Schema.org Person */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Person',
                            name: SITE.author.name,
                            jobTitle: SITE.author.role,
                            email: SITE.author.email,
                            url: SITE.url,
                            address: { '@type': 'PostalAddress', addressLocality: 'Porto Alegre', addressCountry: 'BR' },
                        }),
                    }}
                />
            </div>
        </main>
    )
}