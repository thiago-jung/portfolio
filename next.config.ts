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
        // PERF: Evita bundle de toda a lib em imports de subpath
        optimizePackageImports: ['lucide-react', 'framer-motion'],
        // Server Actions — allowedOrigins em produção: trocar pelo domínio real
        serverActions: {
            allowedOrigins: [
                'localhost:3000',
                process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thiago.dev',
            ],
        },
    },
}

export default withNextIntl(config)