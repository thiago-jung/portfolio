'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

interface HeroProps { locale: string }

/* ─── Typewriter ────────────────────────────────────────────────────────── */

function TypewriterHeadline({ lines, onComplete }: { lines: string[]; onComplete: () => void }) {
    const [displayed, setDisplayed] = useState(['', ''])
    const [lineIdx, setLineIdx] = useState(0)
    const [charIdx, setCharIdx] = useState(0)
    const [done, setDone] = useState(false)
    const [cursor, setCursor] = useState(true)

    useEffect(() => {
        if (done) return
        const line = lines[lineIdx]
        if (!line) return
        if (charIdx < line.length) {
            const t = setTimeout(() => {
                setDisplayed(prev => { const n = [...prev]; n[lineIdx] = line.slice(0, charIdx + 1); return n })
                setCharIdx(c => c + 1)
            }, 45)
            return () => clearTimeout(t)
        } else if (lineIdx < lines.length - 1) {
            const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0) }, 100)
            return () => clearTimeout(t)
        } else {
            setDone(true)
            onComplete()
        }
    }, [charIdx, lineIdx, done, lines, onComplete])

    useEffect(() => {
        const i = setInterval(() => setCursor(v => !v), 500)
        return () => clearInterval(i)
    }, [])

    return (
        <h1
            style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2.75rem, 7vw, 6rem)',
                letterSpacing: '-0.04em',
                lineHeight: 1.08,
                margin: 0,
            }}
        >
            {displayed.map((text, i) => (
                <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                    {text}
                    {i === lineIdx && !done && (
                        <span
                            style={{
                                color: 'var(--color-accent)',
                                opacity: cursor ? 1 : 0,
                                transition: 'opacity 0.1s',
                            }}
                        >
                            |
                        </span>
                    )}
                </span>
            ))}
        </h1>
    )
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */

export function Hero({ locale }: HeroProps) {
    const t = useTranslations('hero')
    const prefersReducedMotion = useReducedMotion()
    const [phase, setPhase] = useState<'boot' | 'typing' | 'complete'>('boot')
    const headlines = t.raw('headline') as string[]
    const metrics = t.raw('metrics') as Array<{ value: string; unit: string; label: string }>

    useEffect(() => {
        if (prefersReducedMotion) { setPhase('complete'); return }
        const timer = setTimeout(() => setPhase('typing'), 200)
        return () => clearTimeout(timer)
    }, [prefersReducedMotion])

    const showContent = phase === 'complete' || prefersReducedMotion

    return (
        <section
            id="main-content"
            style={{
                minHeight: '100svh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* ─── Grid background ─────────────────────────────── */}
            <div
                className="bg-grid"
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            />

            {/* ─── Radial fade ─────────────────────────────────── */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(ellipse 80% 60% at 50% 100%, transparent 40%, var(--color-base) 100%)',
                    pointerEvents: 'none',
                }}
            />

            {/* ─── Content ─────────────────────────────────────── */}
            <div
                style={{
                    position: 'relative',
                    maxWidth: '1280px',
                    margin: '0 auto',
                    width: '100%',
                    /* FIX: Padding top accounts for fixed navbar (72px)
                       plus breathing room. Bottom padding for scroll indicator. */
                    paddingTop: 'calc(72px + 4rem)',
                    paddingBottom: '7rem',
                    paddingLeft: 'var(--spacing-gutter)',
                    paddingRight: 'var(--spacing-gutter)',
                }}
            >
                {/* ─── Badge ───────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase !== 'boot' ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        /* FIX: Generous margin-bottom to separate from headline */
                        marginBottom: '2.5rem',
                    }}
                >
                    <span
                        className="status-blink"
                        style={{ color: 'var(--color-accent)', fontSize: '0.5rem' }}
                    >
                        ●
                    </span>
                    <span
                        style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.65rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'var(--color-accent)',
                        }}
                    >
                        {t('badge')}
                    </span>
                </motion.div>

                {/* ─── Headline ─────────────────────────────────── */}
                {/* FIX: line-height changed from 0.95 → 1.08
                    This is the #1 cause of text collision.
                    0.95 on a 6rem font = lines overlap by ~3px per line.
                    1.08 keeps the tight editorial feel without collision. */}
                <div
                    style={{
                        marginBottom: '2.5rem',
                        color: 'var(--color-text-primary)',
                    }}
                >
                    {(phase === 'typing' || phase === 'complete') && !prefersReducedMotion ? (
                        <TypewriterHeadline lines={headlines} onComplete={() => setPhase('complete')} />
                    ) : (
                        <h1
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: 'clamp(2.75rem, 7vw, 6rem)',
                                letterSpacing: '-0.04em',
                                lineHeight: 1.08,
                                margin: 0,
                            }}
                        >
                            {headlines.map((line, i) => (
                                <span key={i} style={{ display: 'block' }}>{line}</span>
                            ))}
                        </h1>
                    )}
                </div>

                {/* ─── Subheadline + CTAs ───────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 12 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ maxWidth: '560px' }}
                >
                    <p
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.7,
                            /* FIX: More bottom margin before CTAs */
                            marginBottom: '3rem',
                            marginTop: 0,
                        }}
                    >
                        {t('subheadline')}
                    </p>

                    {/* ─── CTAs ────────────────────────────────── */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '12px',
                            /* FIX: More space before metrics */
                            marginBottom: '3.5rem',
                        }}
                    >
                        <Link
                            href={`/${locale}/trabalhos`}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '14px 28px',
                                background: 'var(--color-accent)',
                                color: 'var(--color-base)',
                                fontFamily: 'var(--font-accent)',
                                fontSize: '0.7rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                transition: 'opacity 0.15s',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                        >
                            {t('cta.primary')} <ArrowRight size={12} />
                        </Link>
                        <Link
                            href={`/${locale}/contato`}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '14px 28px',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-text-secondary)',
                                fontFamily: 'var(--font-accent)',
                                fontSize: '0.7rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                transition: 'border-color 0.15s, color 0.15s',
                                whiteSpace: 'nowrap',
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
                            {t('cta.secondary')}
                        </Link>
                    </div>

                    {/* ─── Metrics ─────────────────────────────── */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '3rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid var(--color-border)',
                        }}
                    >
                        {metrics.map(({ value, unit, label }) => (
                            <div key={label}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        gap: '2px',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-display)',
                                            fontWeight: 800,
                                            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                            color: 'var(--color-accent)',
                                        }}
                                    >
                                        <AnimatedCounter to={Number(value)} />
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-accent)',
                                            fontSize: '0.75rem',
                                            color: 'var(--color-accent)',
                                        }}
                                    >
                                        {unit}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        fontFamily: 'var(--font-accent)',
                                        fontSize: '0.6rem',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        color: 'var(--color-text-tertiary)',
                                        marginTop: '6px',
                                    }}
                                >
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* ─── Scroll indicator ────────────────────────────── */}
            <div
                className="scroll-indicator"
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                }}
                aria-hidden="true"
            >
                <span
                    style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.5rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-tertiary)',
                        opacity: 0.4,
                    }}
                >
                    {t('scroll')}
                </span>
                <div
                    style={{
                        width: '1px',
                        height: '48px',
                        background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
                    }}
                />
            </div>
        </section>
    )
}