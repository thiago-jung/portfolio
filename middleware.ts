import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { routing } from './src/i18n/routing'

const i18nMiddleware = createMiddleware(routing)

//const i18nMiddleware = createMiddleware({
//  locales: ['pt-BR', 'en'],
//  defaultLocale: 'pt-BR',
//  localePrefix: 'always',
//  // Rotas localizadas: /sobre em pt-BR, /about em en
//  pathnames: {
//    '/':          '/',
//    '/sobre':     { 'pt-BR': '/sobre',    'en': '/about'    },
//    '/servicos':  { 'pt-BR': '/servicos', 'en': '/services' },
//    '/trabalhos': { 'pt-BR': '/trabalhos','en': '/work'     },
//    '/contato':   { 'pt-BR': '/contato',  'en': '/contact'  },
//    '/cartao':    { 'pt-BR': '/cartao',   'en': '/card'     },
//  },
//})

//const i18nMiddleware = createMiddleware({
//    locales: ['pt-BR', 'en'],
//    defaultLocale: 'pt-BR',
//    localePrefix: 'always',
//})

const SECURITY_HEADERS = {
  'X-Frame-Options':           'DENY',
  'X-Content-Type-Options':    'nosniff',
  'Referrer-Policy':           'strict-origin-when-cross-origin',
  'Permissions-Policy':        'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-DNS-Prefetch-Control':    'on',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-insights.com va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' *.vercel-insights.com",
    "frame-ancestors 'none'",
  ].join('; '),
} as const

export function middleware(request: NextRequest) {
  const response = i18nMiddleware(request)

  if (!response) return NextResponse.next()

  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
