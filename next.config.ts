// next.config.ts
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const config: NextConfig = {
  // PERF: Imagens externas permitidas — adicionar domínios conforme necessário
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'pexels.com' },
    ],
  },

  // PERF: Compressão agressiva
  compress: true,

  // Sem trailing slash — URLs canônicas limpas
  trailingSlash: false,

  // DECISÃO: Powered-By header removido por segurança
  poweredByHeader: false,

  experimental: {
    // PERF: Otimização de pacotes — evita bundle de toda a lib
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Server Actions habilitado (Next 15 já é default, mas explícito)
    serverActions: { allowedOrigins: ['localhost:3000'] },
  },
}

export default withNextIntl(config)

/*
─────────────────────────────────────────────────────────────────────────────
i18n.ts
─────────────────────────────────────────────────────────────────────────────
*/
// import { getRequestConfig } from 'next-intl/server'
// import { notFound } from 'next/navigation'
//
// const locales = ['pt-BR', 'en'] as const
// export type Locale = typeof locales[number]
//
// export default getRequestConfig(async ({ locale }) => {
//   if (!locales.includes(locale as Locale)) notFound()
//   return {
//     messages: (await import(`./src/messages/${locale}.json`)).default,
//   }
// })
