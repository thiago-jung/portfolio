// /src/app/api/og/route.tsx
// IMPORTANTE: extensão .tsx — este arquivo contém JSX (ImageResponse).
// Renomear para .ts quebra o compilador.
// PERF: Edge runtime — geração de OG images na borda, latência mínima.
export const runtime = 'edge'

import { ImageResponse } from '@vercel/og'
import { type NextRequest } from 'next/server'
import { SITE } from '@/constants/site'

const labels: Record<string, Record<string, string>> = {
    'pt-BR': {
        home:     'Engenheiro que entrega resultado.',
        contact:  'Inicie seu projeto.',
        card:     'Cartão Digital',
        about:    'Sobre Thiago',
        services: 'Três especialidades. Um padrão.',
        work:     'Cada projeto, um delta mensurável.',
    },
    en: {
        home:     'Engineer who delivers results.',
        contact:  'Start your project.',
        card:     'Digital Card',
        about:    'About Thiago',
        services: 'Three specialties. One standard.',
        work:     'Every project, a measurable delta.',
    },
}

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl
    const locale   = searchParams.get('locale') ?? 'pt-BR'
    const page     = searchParams.get('page') ?? 'home'
    const headline = labels[locale]?.[page] ?? labels['pt-BR']!['home']!
    const badge    = locale === 'pt-BR'
        ? 'DISPONÍVEL PARA PROJETOS'
        : 'AVAILABLE FOR PROJECTS'

    const element = (
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
                position: 'relative',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,255,148,0.03) 39px, rgba(0,255,148,0.03) 40px)',
                }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#00FF94',
                    }}
                />
                <span
                    style={{
                        color: '#00FF94',
                        fontSize: 13,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                    }}
                >
                    {badge}
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span
                    style={{
                        color: '#E8EDF5',
                        fontSize: 64,
                        fontWeight: 800,
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                    }}
                >
                    {headline}
                </span>
                <span
                    style={{
                        color: 'rgba(232,237,245,0.5)',
                        fontSize: 20,
                        letterSpacing: '0.02em',
                    }}
                >
                    {SITE.author.name} · Full-Stack · Data Science · Game Dev
                </span>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <span
                    style={{
                        color: 'rgba(232,237,245,0.3)',
                        fontSize: 14,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}
                >
                    {SITE.url.replace('https://', '')}
                </span>
                <div
                    style={{
                        padding: '8px 16px',
                        border: '1px solid rgba(0,255,148,0.3)',
                        color: '#00FF94',
                        fontSize: 12,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}
                >
                    T.
                </div>
            </div>
        </div>
    )

    return new ImageResponse(element, { width: 1200, height: 630 })
}