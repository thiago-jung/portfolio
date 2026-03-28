// /src/app/[locale]/(site)/termos/page.tsx
import type { Metadata } from 'next'
import { SITE } from '@/constants/site'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params
    return {
        title: locale === 'pt-BR'
            ? 'Termos de Uso · Thiago'
            : 'Terms of Use · Thiago',
        robots: { index: false },
    }
}

export default async function TermosPage({ params }: PageProps) {
    const { locale } = await params
    const isPT = locale === 'pt-BR'

    const sections = isPT ? [
        {
            title: 'Uso do Site',
            content: 'Este site é de natureza informativa e profissional. O conteúdo destina-se a apresentar os serviços e o portfólio de Thiago.',
        },
        {
            title: 'Propriedade Intelectual',
            content: `Todo o conteúdo deste site — incluindo textos, código, design e assets — é propriedade de ${SITE.author.name}. Reprodução sem autorização é proibida.`,
        },
        {
            title: 'Projetos de Clientes',
            content: 'Casos de portfólio são exibidos com autorização dos respectivos clientes. Métricas e informações confidenciais são apresentadas de forma agregada e anonimizada quando necessário.',
        },
        {
            title: 'Formulário de Contato',
            content: 'O envio de mensagens pelo formulário não constitui contrato ou compromisso de qualquer natureza. Propostas formais são enviadas separadamente por email.',
        },
        {
            title: 'Modificações',
            content: 'Estes termos podem ser atualizados a qualquer momento. O uso continuado do site implica aceite dos termos vigentes.',
        },
    ] : [
        {
            title: 'Site Usage',
            content: 'This website is informational and professional in nature. Content is intended to present the services and portfolio of Thiago.',
        },
        {
            title: 'Intellectual Property',
            content: `All content on this site — including text, code, design, and assets — is property of ${SITE.author.name}. Reproduction without authorization is prohibited.`,
        },
        {
            title: 'Client Projects',
            content: 'Portfolio cases are displayed with permission from respective clients. Metrics and confidential information are presented in aggregate and anonymized form when necessary.',
        },
        {
            title: 'Contact Form',
            content: 'Sending messages through the contact form does not constitute a contract or commitment of any kind. Formal proposals are sent separately by email.',
        },
        {
            title: 'Modifications',
            content: 'These terms may be updated at any time. Continued use of the site implies acceptance of the current terms.',
        },
    ]

    return (
        <main id="main-content" className="py-[var(--spacing-section)]">
            <div
                className="max-w-[var(--spacing-container)] mx-auto px-[var(--spacing-gutter)]"
                style={{ paddingTop: '80px', maxWidth: '720px' }}
            >
                <div className="text-label mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
                    LEGAL
                </div>
                <h1
                    className="text-display mb-4"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                    {isPT ? 'Termos de Uso' : 'Terms of Use'}
                </h1>
                <p className="mb-16 text-label opacity-30" style={{ fontSize: '0.65rem' }}>
                    {isPT ? 'Última atualização: Março 2026' : 'Last updated: March 2026'}
                </p>

                <div className="space-y-12">
                    {sections.map(section => (
                        <div
                            key={section.title}
                            className="border-t pt-8"
                            style={{ borderColor: 'var(--color-border)' }}
                        >
                            <h2 className="text-label mb-4" style={{ color: 'var(--color-accent)' }}>
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