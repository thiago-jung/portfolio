// DESIGN TOKENS — Portfólio Thiago
// Single source of truth. Nenhuma cor ou timing hardcoded fora deste arquivo.
// Todos os valores CSS custom properties em globals.css derivam deste arquivo.

export const tokens = {
  color: {
    base: '#050508',
    surface: '#0D0D14',
    surfaceHover: '#131320',
    border: 'rgba(232,237,245,0.08)',
    borderAccent: 'rgba(0,255,148,0.3)',
    text: {
      primary: '#E8EDF5',
      secondary: 'rgba(232,237,245,0.55)',
      tertiary: 'rgba(232,237,245,0.3)',
      accent: '#00FF94',
    },
    accent: {
      DEFAULT: '#00FF94',
      dim: 'rgba(0,255,148,0.15)',
      glow: 'rgba(0,255,148,0.25)',
      glowStrong: 'rgba(0,255,148,0.4)',
    },
    grid: 'rgba(0,255,148,0.03)',
  },

  typography: {
    display: 'var(--font-syne)',
    body: 'var(--font-geist-mono)',
    accent: 'var(--font-syne-mono)',
    scale: {
      // Escala modular — razão 1.25 (Major Third) com clamp fluid
      xs:   'clamp(0.64rem,  1.5vw, 0.75rem)',
      sm:   'clamp(0.75rem,  1.8vw, 0.875rem)',
      base: 'clamp(0.875rem, 2vw,   1rem)',
      lg:   'clamp(1rem,     2.5vw, 1.125rem)',
      xl:   'clamp(1.25rem,  3vw,   1.5rem)',
      '2xl':'clamp(1.5rem,   4vw,   2rem)',
      '3xl':'clamp(2rem,     5vw,   3rem)',
      '4xl':'clamp(2.5rem,   6vw,   4rem)',
      hero: 'clamp(3rem,     8vw,   6.5rem)',
    },
  },

  // DECISÃO: Nomeados semanticamente — a coreografia referencia estes nomes,
  // não valores numéricos. Mudança central não quebra a coreografia.
  animation: {
    microInteraction: { duration: 0.12, ease: [0.4, 0, 0.2, 1] as const },
    reveal:           { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    dramatic:         { duration: 1.1,  ease: [0.76, 0, 0.24, 1] as const },
    spring:           { type: 'spring' as const, stiffness: 500, damping: 35 },
    springGentle:     { type: 'spring' as const, stiffness: 150, damping: 22 },
    springSlug:       { type: 'spring' as const, stiffness: 80,  damping: 18 },
    bootSequence: {
      scanline:   80,    // ms
      initialize: 200,   // ms até "INITIALIZING" sumir
      navStagger: 60,    // ms entre cada nav item
      typewriter: 45,    // ms entre cada letra da headline
      cursorBlink:500,   // ms ciclo do cursor
    },
  },

  spacing: {
    section: 'clamp(5rem, 12vw, 10rem)',
    container: '1280px',
    gutter: 'clamp(1rem, 4vw, 2rem)',
  },
} as const

export type Tokens = typeof tokens
