'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

interface HeroProps { locale: string }

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
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(3rem, 8vw, 6.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0 }}>
            {displayed.map((text, i) => (
                <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                    {text}
                    {i === lineIdx && !done && (
                        <span style={{ color: 'var(--color-accent)', opacity: cursor ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
                    )}
                </span>
            ))}
        </h1>
    )
}

export function Hero({ locale }: HeroProps) {
    const t = useTranslations('hero')
    const prefersReducedMotion = useReducedMotion()
    const [phase, setPhase] = useState<'boot' | 'typing' | 'complete'>('boot')
    const headlines = t.raw('headline') as string[]
    const metrics = t.raw('metrics') as Array<{ value: string; unit: string; label: string }>

    useEffect(() => {
        if (prefersReducedMotion) { setPhase('complete'); return }
        const t = setTimeout(() => setPhase('typing'), 200)
        return () => clearTimeout(t)
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
                paddingTop: '80px',
            }}
        >
            {/* Grid background */}
            <div className="bg-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            {/* Radial fade */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 100%, transparent 40%, var(--color-base) 100%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 6rem', width: '100%' }}>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase !== 'boot' ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}
                >
                    <span className="status-blink" style={{ color: 'var(--color-accent)', fontSize: '0.5rem' }}>●</span>
                    <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                        {t('badge')}
                    </span>
                </motion.div>

                {/* Headline */}
                <div style={{ marginBottom: '2rem', color: 'var(--color-text-primary)' }}>
                    {(phase === 'typing' || phase === 'complete') && !prefersReducedMotion ? (
                        <TypewriterHeadline lines={headlines} onComplete={() => setPhase('complete')} />
                    ) : (
                        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(3rem, 8vw, 6.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0 }}>
                            {headlines.map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
                        </h1>
                    )}
                </div>

                {/* Subheadline + CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 12 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ maxWidth: '560px' }}
                >
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                        {t('subheadline')}
                    </p>

                    {/* CTAs — flex row, não column */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '3rem' }}>
                        <Link href={`/${locale}/trabalhos`}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'var(--color-accent)', color: 'var(--color-base)', fontFamily: 'var(--font-accent)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity 0.15s', whiteSpace: 'nowrap' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            {t('cta.primary')} <ArrowRight size={12} />
                        </Link>
                        <Link href={`/${locale}/contato`}
                            style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-accent)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'border-color 0.15s, color 0.15s', whiteSpace: 'nowrap' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
                        >
                            {t('cta.secondary')}
                        </Link>
                    </div>

                    {/* Metrics */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                        {metrics.map(({ value, unit, label }) => (
                            <div key={label}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-accent)' }}>
                                        <AnimatedCounter to={Number(value)} />
                                    </span>
                                    <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.75rem', color: 'var(--color-accent)' }}>{unit}</span>
                                </div>
                                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }} aria-hidden="true">
                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', opacity: 0.4 }}>{t('scroll')}</span>
                <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }} />
            </div>
        </section>
    )
}