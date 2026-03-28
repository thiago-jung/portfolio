// /src/app/[locale]/(site)/page.tsx
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { Hero } from '@/components/sections/Hero'
import { WorkSection } from '@/components/sections/WorkSection'
import { CustomCursor } from '@/components/ui/CustomCursor'

interface PageProps { params: Promise<{ locale: string }> }


export async function generateMetadata({ params }: PageProps) {
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
        'en':    `${SITE.url}/en`,
      },
    },
  }
}

export default async function HomePage({ params }: PageProps) {
    const { locale } = await params
    return (
        <main id="main-content">
        <CustomCursor />
      <Hero locale={locale} />
      <WorkSection locale={locale} />
    </main>
  )
}
