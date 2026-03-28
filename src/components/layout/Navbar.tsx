'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mobileMenuVariants, mobileMenuItemVariants } from '@/lib/animation-variants'
import { LocaleSwitcher } from './LocaleSwitcher'

const NAV_ITEMS = [
    { key: 'about', href: '/sobre' },
    { key: 'services', href: '/servicos' },
    { key: 'work', href: '/trabalhos' },
    { key: 'contact', href: '/contato' },
] as const

export function Navbar({ locale }: { locale: string }) {
    const t = useTranslations('nav')
    const pathname = usePathname()
    const prefersReducedMotion = useReducedMotion()
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => { setMobileOpen(false) }, [pathname])

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                )}
                style={{
                    background: scrolled ? 'rgba(5,5,8,0.85)' : 'transparent',
                    borderBottom: scrolled
                        ? '1px solid var(--color-border)'
                        : '1px solid transparent',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
                }}
            >
                <div
                    className="mx-auto flex items-center justify-between"
                    style={{
                        maxWidth: '1280px',
                        height: '72px',
                        paddingLeft: 'var(--spacing-gutter)',
                        paddingRight: 'var(--spacing-gutter)',
                    }}
                >
                    {/* ─── Logo ─────────────────────────────────────────── */}
                    <Link
                        href={`/${locale}`}
                        aria-label="Home"
                        className="shrink-0"
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: '1.25rem',
                            letterSpacing: '-0.04em',
                            color: 'var(--color-text-primary)',
                            textDecoration: 'none',
                        }}
                    >
                        T<span style={{ color: 'var(--color-accent)' }}>.</span>
                    </Link>

                    {/* ─── Desktop nav ──────────────────────────────────── */}
                    <nav
                        className="hidden md:flex items-center"
                        style={{ gap: '2rem' }}
                        aria-label="Main navigation"
                    >
                        {NAV_ITEMS.map(({ key, href }) => {
                            const fullHref = `/${locale}${href}`
                            const isActive = pathname === fullHref

                            return (
                                <Link
                                    key={key}
                                    href={fullHref}
                                    className="whitespace-nowrap"
                                    style={{
                                        fontFamily: 'var(--font-accent)',
                                        fontSize: '0.7rem',
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none',
                                        color: isActive
                                            ? 'var(--color-accent)'
                                            : 'var(--color-text-secondary)',
                                        transition: 'color 0.15s',
                                        padding: '0.5rem 0',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive)
                                            e.currentTarget.style.color =
                                                'var(--color-text-primary)'
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive)
                                            e.currentTarget.style.color =
                                                'var(--color-text-secondary)'
                                    }}
                                >
                                    {t(key)}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* ─── Right actions ────────────────────────────────── */}
                    <div className="flex items-center" style={{ gap: '1.25rem' }}>
                        <LocaleSwitcher />

                        <Link
                            href={`/${locale}/contato`}
                            className="hidden md:inline-flex items-center whitespace-nowrap"
                            style={{
                                gap: '0.5rem',
                                fontFamily: 'var(--font-accent)',
                                fontSize: '0.7rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                color: 'var(--color-text-secondary)',
                                padding: '8px 16px',
                                border: '1px solid var(--color-border)',
                                transition: 'border-color 0.15s, color 0.15s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-accent)'
                                e.currentTarget.style.color = 'var(--color-accent)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border)'
                                e.currentTarget.style.color = 'var(--color-text-secondary)'
                            }}
                        >
                            <span
                                className="status-blink"
                                style={{ color: 'var(--color-accent)', fontSize: '0.4rem' }}
                            >
                                ●
                            </span>
                            {t('cta')}
                        </Link>

                        {/* Hamburger — mobile only */}
                        <button
                            className="md:hidden flex items-center justify-center"
                            aria-label="Menu"
                            onClick={() => setMobileOpen((v) => !v)}
                            style={{
                                color: 'var(--color-text-primary)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                width: '40px',
                                height: '40px',
                            }}
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* ─── Mobile menu ──────────────────────────────────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        variants={prefersReducedMotion ? {} : mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 z-40 flex flex-col justify-center"
                        style={{
                            background: 'var(--color-base)',
                            paddingLeft: 'var(--spacing-gutter)',
                            paddingRight: 'var(--spacing-gutter)',
                        }}
                    >
                        <ul className="space-y-10 list-none p-0 m-0">
                            {NAV_ITEMS.map(({ key, href }, i) => (
                                <motion.li
                                    key={key}
                                    variants={
                                        prefersReducedMotion
                                            ? {}
                                            : mobileMenuItemVariants
                                    }
                                    custom={i}
                                >
                                    <Link
                                        href={`/${locale}${href}`}
                                        style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: 'clamp(2rem, 8vw, 3rem)',
                                            fontWeight: 800,
                                            letterSpacing: '-0.03em',
                                            color: 'var(--color-text-primary)',
                                            textDecoration: 'none',
                                            display: 'block',
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: 'var(--color-accent)',
                                                fontFamily: 'var(--font-accent)',
                                                fontSize: '0.6rem',
                                                verticalAlign: 'super',
                                                marginRight: '0.5rem',
                                            }}
                                        >
                                            0{i + 1}
                                        </span>
                                        {t(key)}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}