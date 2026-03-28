// /src/app/api/og/route.ts
// PERF: Edge runtime — geração de OG images na borda, latência mínima
export const runtime = 'edge'

import { ImageResponse } from '@vercel/og'
import { type NextRequest } from 'next/server'
import { SITE } from '@/constants/site'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const locale = searchParams.get('locale') ?? 'pt-BR'
  const page   = searchParams.get('page') ?? 'home'

  const labels: Record<string, Record<string, string>> = {
    'pt-BR': {
      home:    'Engenheiro que entrega resultado.',
      contact: 'Inicie seu projeto.',
      card:    'Cartão Digital',
      about:   'Sobre Thiago',
    },
    en: {
      home:    'Engineer who delivers results.',
      contact: 'Start your project.',
      card:    'Digital Card',
      about:   'About Thiago',
    },
  }

  const headline = labels[locale]?.[page] ?? labels['pt-BR']['home']

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: '#050508',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Grid lines decorativas */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,255,148,0.03) 39px, rgba(0,255,148,0.03) 40px)',
          }}
        />

        {/* Status badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00FF94' }} />
          <span style={{ color: '#00FF94', fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {locale === 'pt-BR' ? 'DISPONÍVEL PARA PROJETOS' : 'AVAILABLE FOR PROJECTS'}
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ color: '#E8EDF5', fontSize: 64, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
            {headline}
          </span>
          <span style={{ color: 'rgba(232,237,245,0.5)', fontSize: 20, letterSpacing: '0.02em' }}>
            {SITE.author.name} · Full-Stack · Data Science · Game Dev
          </span>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'rgba(232,237,245,0.3)', fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {SITE.url.replace('https://', '')}
          </span>
          <div style={{
            padding: '8px 16px',
            border: '1px solid rgba(0,255,148,0.3)',
            color: '#00FF94',
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            T.
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}

// ─────────────────────────────────────────────────────────────────────────────

// /src/app/sitemap.ts — arquivo separado na implementação real
// import type { MetadataRoute } from 'next'
// import { SITE } from '@/constants/site'
//
// export default function sitemap(): MetadataRoute.Sitemap {
//   const locales = SITE.locale.supported
//   const routes = ['', '/sobre', '/servicos', '/trabalhos', '/contato', '/cartao']
//
//   return locales.flatMap(locale =>
//     routes.map(route => ({
//       url: `${SITE.url}/${locale}${route}`,
//       lastModified: new Date(),
//       changeFrequency: route === '' ? 'weekly' : 'monthly',
//       priority: route === '' ? 1 : 0.8,
//       alternates: {
//         languages: Object.fromEntries(
//           locales.map(l => [l, `${SITE.url}/${l}${route}`])
//         ),
//       },
//     }))
//   )
// }

// ─────────────────────────────────────────────────────────────────────────────

// /src/app/robots.ts
// import type { MetadataRoute } from 'next'
// import { SITE } from '@/constants/site'
//
// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: { userAgent: '*', allow: '/', disallow: '/api/' },
//     sitemap: `${SITE.url}/sitemap.xml`,
//   }
// }
