// /src/app/[locale]/(site)/privacidade/page.tsx
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SITE } from '@/constants/site'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params
    return {
        title: locale === 'pt-BR'
            ? 'Política de Privacidade · Thiago'
            : 'Privacy Policy · Thiago',
        robots: { index: false }, // Páginas legais não precisam de indexação
    }
}

export default async function PrivacidadePage({ params }: PageProps) {
    const { locale } = await params
    const isPT = locale === 'pt-BR'

    const sections = isPT ? [
        {
            title: 'Coleta de Dados',
            content: 'Este site coleta apenas as informações fornecidas voluntariamente através do formulário de contato: nome, empresa, email e mensagem. Nenhum dado sensível é coletado.',
        },
        {
            title: 'Uso dos Dados',
            content: 'Os dados são utilizados exclusivamente para responder às suas mensagens de contato. Não compartilhamos, vendemos ou repassamos seus dados a terceiros.',
        },
        {
            title: 'Cookies e Analytics',
            content: 'Utilizamos Vercel Analytics para análise de performance de forma anônima. Nenhum cookie de rastreamento pessoal é utilizado.',
        },
        {
            title: 'Seus Direitos (LGPD)',
            content: `Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento através do email ${SITE.author.email}.`,
        },
        {
            title: 'Contato',
            content: `Para questões relacionadas à privacidade, entre em contato: ${SITE.author.email}`,
        },
    ] : [
        {
            title: 'Data Collection',
            content: 'This site only collects information voluntarily provided through the contact form: name, company, email, and message. No sensitive data is collected.',
        },
        {
            title: 'Data Usage',
            content: 'Data is used exclusively to respond to your contact messages. We do not share, sell, or transfer your data to third parties.',
        },
        {
            title: 'Cookies and Analytics',
            content: 'We use Vercel Analytics for anonymous performance analysis. No personal tracking cookies are used.',
        },
        {
            title: 'Your Rights',
            content: `You may request access, correction, or deletion of your data at any time by emailing ${SITE.author.email}.`,
        },
        {
            title: 'Contact',
            content: `For privacy-related questions, contact: ${SITE.author.email}`,
        },
    ]

    return (
        <main id="main-content" className="py-[var(--spacing-section)]">
            <div
                className="max-w-[var(--spacing-container)] mx-auto px-[var(--spacing-gutter)]"
                style={{ paddingTop: '80px', maxWidth: '720px' }}
            >
                <div className="text-label mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
                    {isPT ? 'LEGAL' : 'LEGAL'}
                </div>
                <h1
                    className="text-display mb-4"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                    {isPT ? 'Política de Privacidade' : 'Privacy Policy'}
                </h1>
                <p
                    className="mb-16 text-label opacity-30"
                    style={{ fontSize: '0.65rem' }}
                >
                    {isPT ? 'Última atualização: Março 2026' : 'Last updated: March 2026'}
                </p>

                <div className="space-y-12">
                    {sections.map(section => (
                        <div
                            key={section.title}
                            className="border-t pt-8"
                            style={{ borderColor: 'var(--color-border)' }}
                        >
                            <h2
                                className="text-label mb-4"
                                style={{ color: 'var(--color-accent)' }}
                            >
                                {section.title}
                            </h2>
                            <p
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.875rem',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 1.8,
                                }}
                            >
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}