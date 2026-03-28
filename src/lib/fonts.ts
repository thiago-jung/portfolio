// /src/lib/fonts.ts
import { Syne, Syne_Mono } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'

export const fontSyne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export const fontSyneMono = Syne_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-syne-mono',
  display: 'swap',
})

// DECISÃO: Pacote npm oficial da Vercel — zero config, woff2 incluído,
// variável CSS automática. Mais simples que localFont.
export const fontGeistMono = GeistMono

// String de variáveis para usar no className do <html>
export const fontVariables = [
  fontSyne.variable,
  fontSyneMono.variable,
  GeistMono.variable, // expõe --font-geist-mono automaticamente
].join(' ')