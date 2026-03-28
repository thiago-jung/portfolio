// ANIMATION VARIANTS — Portfólio Thiago
// Todos os variants do Framer Motion declarados aqui.
// REGRA: Nunca declarar variants inline em componentes JSX.
// Importar deste arquivo. Evita re-criação a cada render.

import type { Variants } from 'framer-motion'
import { tokens } from './design-tokens'

const { animation } = tokens

// ─── Primitivos ──────────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: animation.reveal.duration, ease: animation.reveal.ease },
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: animation.reveal.duration, ease: animation.reveal.ease },
  },
}

// ─── Reveal por clip-path (headline, cards) ───────────────────────────────────

export const clipRevealLeft: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: animation.dramatic.duration, ease: animation.dramatic.ease },
  },
}

export const clipRevealDown: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: animation.reveal.duration, ease: animation.reveal.ease },
  },
}

// ─── Stagger container ────────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * (animation.bootSequence.navStagger / 1000),
      duration: animation.reveal.duration,
      ease: animation.reveal.ease,
    },
  }),
}

// ─── Nav hover preview panel ──────────────────────────────────────────────────

export const navPreviewPanel: Variants = {
  hidden: {
    opacity: 0,
    scaleY: 0.92,
    transformOrigin: 'top',
    transition: { duration: 0.08 },
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] },
  },
}

// ─── Case cards ───────────────────────────────────────────────────────────────

export const caseCardVariants: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: animation.dramatic.duration, ease: animation.dramatic.ease },
  },
}

export const caseMetricsVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: animation.spring,
  },
}

// ─── Mobile menu ─────────────────────────────────────────────────────────────

export const mobileMenuVariants: Variants = {
  hidden: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
  },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const mobileMenuItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + i * 0.07,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

// ─── Scan line de boot ────────────────────────────────────────────────────────

export const scanlineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 1 },
  visible: {
    scaleX: 1,
    opacity: 0,
    transition: {
      scaleX: { duration: 0.08, ease: 'linear' },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
}

// ─── Warp page transition ─────────────────────────────────────────────────────

export const warpExit: Variants = {
  initial: { scale: 1, opacity: 1 },
  exit: {
    scale: 1.06,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
  },
}

// ─── Business card flip ───────────────────────────────────────────────────────

export const cardFront: Variants = {
  front: { rotateY: 0, transition: animation.springGentle },
  back:  { rotateY: 180, transition: animation.springGentle },
}

export const cardBack: Variants = {
  front: { rotateY: -180, transition: animation.springGentle },
  back:  { rotateY: 0, transition: animation.springGentle },
}
