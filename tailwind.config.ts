// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        base:    'var(--color-base)',
        surface: 'var(--color-surface)',
        accent:  'var(--color-accent)',
        primary: 'var(--color-text-primary)',
        secondary:'var(--color-text-secondary)',
        tertiary: 'var(--color-text-tertiary)',
        border:  'var(--color-border)',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-geist-mono)', 'monospace'],
        accent:  ['var(--font-syne-mono)', 'monospace'],
      },
      maxWidth: {
        container: 'var(--spacing-container)',
      },
      spacing: {
        section: 'var(--spacing-section)',
        gutter:  'var(--spacing-gutter)',
      },
      animation: {
        'status-blink': 'statusBlink 1.4s ease-in-out infinite',
        'scroll-pulse': 'scrollPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
