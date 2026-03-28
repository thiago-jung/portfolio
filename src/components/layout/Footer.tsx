'use client'
// /src/components/layout/Footer.tsx
// DECISÃO: 'use client' necessário — onMouseEnter/Leave nos links sociais
// não são permitidos em Server Components.
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { SITE } from '@/constants/site'
import { Github, Linkedin } from 'lucide-react'

interface FooterProps { locale: string }

export function Footer({ locale }: FooterProps) {
    const t = useTranslations('footer')
    const year = new Date().getFullYear()

    return (
        <footer
            role="contentinfo"
            className="border-t py-12"
            style={{ borderColor: 'var(--color-border)' }}
        >
            <div className="max-w-[var(--spacing-container)] mx-auto px-[var(--spacing-gutter)]">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

                    {/* Brand + tagline */}
                    <div className="space-y-2">
                        <div
                            className="font-display font-extrabold text-xl tracking-[-0.04em]"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            T<span style={{ color: 'var(--color-accent)' }}>.</span>
                        </div>
                        <p className="text-label opacity-40">{t('tagline')}</p>
                    </div>

                    {/* Links legais */}
                    <nav aria-label={locale === 'pt-BR' ? 'Links do rodapé' : 'Footer links'}>
                        <ul className="flex flex-wrap gap-6 list-none p-0 m-0">
                            {[
                                { href: `/${locale}/privacidade`, label: t('links.privacy') },
                                { href: `/${locale}/termos`, label: t('links.terms') },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-label opacity-30 hover:opacity-60 transition-opacity"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Social + copyright */}
                    <div className="flex items-center gap-4">
                        <a
                            href={SITE.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            style={{ color: 'var(--color-text-tertiary)' }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)' }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
                        >
                            <Github size={16} aria-hidden="true" />
                        </a>
                        <a
                            href={SITE.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            style={{ color: 'var(--color-text-tertiary)' }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)' }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
                        >
                            <Linkedin size={16} aria-hidden="true" />
                        </a>
                        <span
                            className="text-label opacity-20"
                            style={{ fontSize: '0.6rem' }}
                        >
                            © {year} {t('copyright')}
                        </span>
                    </div>

                </div>
            </div>
        </footer>
    )
}