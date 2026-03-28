// /src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(date)
}

// Gera blur data URL inline (placeholder para imagens sem plaiceholder no build)
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#0D0D14" offset="20%" />
      <stop stop-color="#131320" offset="50%" />
      <stop stop-color="#0D0D14" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#0D0D14" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
</svg>`

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export const blurDataURL = (w = 8, h = 8) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`
