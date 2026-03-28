// /src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { SITE } from '@/constants/site'

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = SITE.locale.supported
    const routes = [
        { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
        { path: '/sobre', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/servicos', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/trabalhos', changeFrequency: 'weekly' as const, priority: 0.9 },
        { path: '/contato', changeFrequency: 'monthly' as const, priority: 0.7 },
        { path: '/cartao', changeFrequency: 'monthly' as const, priority: 0.6 },
    ]

    return locales.flatMap(locale =>
        routes.map(({ path, changeFrequency, priority }) => ({
            url: `${SITE.url}/${locale}${path}`,
            lastModified: new Date(),
            changeFrequency,
            priority,
            alternates: {
                languages: Object.fromEntries(
                    locales.map(l => [l, `${SITE.url}/${l}${path}`])
                ),
            },
        }))
    )
}