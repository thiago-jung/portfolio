'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export function LocaleSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const toggle = () => {
        const next = locale === 'pt-BR' ? 'en' : 'pt-BR'
        const newPath = pathname.replace(`/${locale}`, `/${next}`)
        router.push(newPath)
    }

    return (
        <button
            onClick={toggle}
            aria-label={`Switch to ${locale === 'pt-BR' ? 'English' : 'Português'}`}
            className="font-accent text-xs tracking-widest uppercase transition-colors duration-150"
            style={{ color: 'var(--color-text-tertiary)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
        >
            {locale === 'pt-BR' ? 'EN' : 'PT'}
        </button>
    )
}