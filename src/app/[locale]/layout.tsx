import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { fontVariables } from '@/lib/fonts'
import { SITE } from '@/constants/site'
import '@/styles/globals.css'

interface RootLayoutProps {
  children: React.ReactNode
    params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { template: `%s · ${SITE.name}`, default: SITE.title },
  description: SITE.description,
  authors: [{ name: SITE.author.name }],
  creator: SITE.author.name,
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
  manifest: '/manifest.json',
}

export function generateStaticParams() {
    return SITE.locale.supported.map(locale => ({ locale }))
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
    const { locale } = await params

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* NFC-ready: URL canônica para tags NFC no cartão físico */}
        <link rel="alternate" type="text/vcard" href={`${SITE.url}/api/card/vcf`} />
      </head>
      <body>
        {/* Skip link — acessibilidade */}
        <a href="#main-content" className="skip-link">
          {locale === 'pt-BR' ? 'Ir para o conteúdo principal' : 'Skip to main content'}
        </a>

        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                },
              }}
            />
          </ThemeProvider>
        </NextIntlClientProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
