// /src/app/[locale]/(site)/page.tsx
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { Hero } from '@/components/sections/Hero'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { WorkSection } from '@/components/sections/WorkSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { CTASection } from '@/components/sections/CTASection'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'metadata.home' })
    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [{ url: `/api/og?locale=${locale}&page=home`, width: 1200, height: 630 }],
            locale: locale === 'pt-BR' ? 'pt_BR' : 'en_US',
            alternateLocale: locale === 'pt-BR' ? ['en_US'] : ['pt_BR'],
        },
        alternates: {
            canonical: `${SITE.url}/${locale}`,
            languages: {
                'pt-BR': `${SITE.url}/pt-BR`,
                'en': `${SITE.url}/en`,
            },
        },
    }
}

export default async function HomePage({ params }: PageProps) {
    const { locale } = await params
    return (
        <main id="main-content">
            {/*
              COREOGRAFIA:
              1. Hero       — impacto imediato
              2. Services   — o que entrego
              3. Work       — prova com métricas
              4. About      — quem está por trás
              5. CTA        — conversão pré-footer
            */}
            <Hero locale={locale} />
            <ServicesSection locale={locale} />
            <WorkSection locale={locale} />
            <AboutSection locale={locale} />
            <CTASection locale={locale} />
        </main>
    )
}