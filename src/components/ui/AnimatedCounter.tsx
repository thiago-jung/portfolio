'use client'

// /src/components/ui/AnimatedCounter.tsx
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  to: number
  duration?: number
  decimals?: number
}

export function AnimatedCounter({ to, duration = 1.5, decimals = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      setValue(parseFloat((easeOut(progress) * to).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [inView, to, duration, decimals])

  return <span ref={ref}>{value.toFixed(decimals)}</span>
}
