// /src/app/[locale]/not-found.tsx
'use client'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function NotFound() {
  const t = useTranslations('404')
  const locale = useLocale()

  return (
    <main className="min-h-[100svh] flex flex-col items-center justify-center bg-grid text-center px-[var(--spacing-gutter)]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <div className="text-label" style={{ color: 'var(--color-accent)' }}>
          {t('label')}
        </div>

        <div
          className="font-display font-extrabold"
          style={{
            fontSize: 'clamp(6rem, 20vw, 14rem)',
            color: 'var(--color-surface)',
            lineHeight: 1,
            textShadow: `0 0 80px var(--color-accent-glow)`,
            letterSpacing: '-0.05em',
          }}
          aria-hidden="true"
        >
          {t('code')}
        </div>

        <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {t('message')}
        </p>

        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-6 py-3 font-accent text-xs tracking-widest uppercase border transition-all duration-150 hover:border-accent"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
        >
          {t('cta')}
        </Link>
      </motion.div>
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

// /src/app/[locale]/error.tsx — em arquivo separado na implementação real
// 'use client'
// import { useEffect } from 'react'
// import { useTranslations } from 'next-intl'
// export default function Error({ error, reset }: { error: Error; reset: () => void }) {
//   const t = useTranslations('error')
//   useEffect(() => { console.error(error) }, [error])
//   return (
//     <main className="min-h-[100svh] flex flex-col items-center justify-center text-center px-[var(--spacing-gutter)]">
//       <div className="text-label mb-4" style={{ color: '#ff4444' }}>{t('label')}</div>
//       <p style={{ color: 'var(--color-text-secondary)' }}>{t('message')}</p>
//       <button onClick={reset} className="mt-8 px-6 py-3 font-accent text-xs tracking-widest uppercase border"
//         style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
//         {t('cta')}
//       </button>
//     </main>
//   )
// }

// ─────────────────────────────────────────────────────────────────────────────

// /src/app/[locale]/loading.tsx — skeleton elegante
// export default function Loading() {
//   return (
//     <div className="min-h-[100svh] flex items-center justify-center">
//       <div className="space-y-2 w-full max-w-md px-8">
//         {/* Simula headline */}
//         {[80, 60, 40].map((w, i) => (
//           <div key={i} className="h-12 animate-pulse rounded-none"
//             style={{ width: `${w}%`, background: 'var(--color-surface)' }} />
//         ))}
//         <div className="pt-4 space-y-2">
//           {[100, 90].map((w, i) => (
//             <div key={i} className="h-4 animate-pulse"
//               style={{ width: `${w}%`, background: 'var(--color-surface)' }} />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
