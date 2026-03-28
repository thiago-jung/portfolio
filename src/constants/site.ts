// /src/constants/site.ts
export const SITE = {
  name: 'Thiago',
  title: 'Thiago — Engenheiro Full-Stack & Designer de Produto',
  description: 'Transformo empresas com presença digital medíocre em marcas digitais de alto impacto. Next.js · Data Science · Game Dev.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thiago.dev',
  locale: {
    default: 'pt-BR',
    supported: ['pt-BR', 'en'] as const,
  },
  author: {
    name: 'Thiago',
    role: 'Full-Stack Engineer & Product Designer',
    company: 'Freelance',
    email: 'contato@thiago.dev',
    phone: '+55 51 99999-9999',
    location: 'Porto Alegre, RS — Brasil',
    coordinates: { lat: -29.9, lng: -51.1 },
    linkedin: 'https://linkedin.com/in/thiago',
    github: 'https://github.com/thiago',
  },
  social: {
    github: 'https://github.com/thiago',
    linkedin: 'https://linkedin.com/in/thiago',
  },
} as const

export type SupportedLocale = typeof SITE.locale.supported[number]

// /src/constants/navigation.ts
export const NAV_KEYS = ['home', 'about', 'services', 'work', 'contact'] as const
export type NavKey = typeof NAV_KEYS[number]

export const NAV_HREFS: Record<NavKey, string> = {
  home:     '/',
  about:    '/sobre',
  services: '/servicos',
  work:     '/trabalhos',
  contact:  '/contato',
}

// Preview content para o hover panel da nav (referenciado na coreografia)
export const NAV_PREVIEWS: Record<string, { type: 'metric' | 'chart' | 'video'; label: string }> = {
  services: { type: 'metric', label: 'Web · Data · Games' },
  work:     { type: 'chart',  label: 'Cases & Métricas'   },
  contact:  { type: 'metric', label: 'STATUS: AVAILABLE'  },
}
