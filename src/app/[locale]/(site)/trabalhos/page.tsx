// /src/app/[locale]/(site)/trabalhos/page.tsx
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { WorkSection } from '@/components/sections/WorkSection'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'metadata.work' })
    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [{ url: `/api/og?locale=${locale}&page=work`, width: 1200, height: 630 }],
        },
        alternates: {
            canonical: `${SITE.url}/${locale}/trabalhos`,
            languages: {
                'pt-BR': `${SITE.url}/pt-BR/trabalhos`,
                'en': `${SITE.url}/en/trabalhos`,
            },
        },
    }
}

export default async function TrabalhosPage({ params }: PageProps) {
    const { locale } = await params
    return (
        <main id="main-content" style={{ paddingTop: '80px' }}>
            <WorkSection locale={locale} />
        </main>
    )
}