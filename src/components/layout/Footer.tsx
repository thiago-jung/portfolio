// /src/components/layout/Footer.tsx
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

          {/* Links */}
          <nav aria-label={locale === 'pt-BR' ? 'Links do rodapé' : 'Footer links'}>
            <ul className="flex flex-wrap gap-6">
              {[
                { href: `/${locale}/privacidade`, label: t('links.privacy') },
                { href: `/${locale}/termos`,      label: t('links.terms')   },
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
              className="transition-colors"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <Github size={16} />
            </a>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <Linkedin size={16} />
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

// ─────────────────────────────────────────────────────────────────────────────

// /src/components/layout/LocaleSwitcher.tsx — componente separado na prática
// 'use client'
// import { useLocale } from 'next-intl'
// import { useRouter, usePathname } from 'next/navigation'
// import { SITE } from '@/constants/site'
//
// export function LocaleSwitcher() {
//   const locale  = useLocale()
//   const router  = useRouter()
//   const pathname = usePathname()
//
//   const toggle = () => {
//     const next = locale === 'pt-BR' ? 'en' : 'pt-BR'
//     // Substitui o prefixo de locale na URL atual
//     const newPath = pathname.replace(`/${locale}`, `/${next}`)
//     router.push(newPath)
//   }
//
//   return (
//     <button
//       onClick={toggle}
//       aria-label={`Switch to ${locale === 'pt-BR' ? 'English' : 'Português'}`}
//       className="font-accent text-xs tracking-widest uppercase transition-colors"
//       style={{ color: 'var(--color-text-tertiary)' }}
//     >
//       {locale === 'pt-BR' ? 'EN' : 'PT'}
//     </button>
//   )
// }
