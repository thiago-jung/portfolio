'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'text' | 'play'

export function CustomCursor() {
  const [state, setState] = useState<CursorState>('default')
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  // Spring com inércia — responsivo mas com peso
  const x = useSpring(rawX, { stiffness: 500, damping: 35, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 500, damping: 35, mass: 0.5 })

  useEffect(() => {
    // Apenas em dispositivos com hover real
    if (!window.matchMedia('(hover: hover)').matches) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const tag = target.tagName.toLowerCase()

      if (target.matches('a, button, [role="button"]')) {
        // Verifica se tem data-cursor-label
        const cursorLabel = target.getAttribute('data-cursor-label')
        setLabel(cursorLabel ?? 'OPEN')
        setState('hover')
      } else if (tag === 'p' || tag === 'span' || tag === 'h1' || tag === 'h2') {
        setState('text')
        setLabel('')
      } else if (target.matches('video, [data-cursor="play"]')) {
        setState('play')
        setLabel('PLAY')
      } else {
        setState('default')
        setLabel('')
      }
    }

    const onLeave = () => {
      setState('default')
      setLabel('')
    }

    const onExit = () => setVisible(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    document.addEventListener('mouseleave', onExit)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      document.removeEventListener('mouseleave', onExit)
    }
  }, [rawX, rawY, visible])

  const sizes: Record<CursorState, number> = {
    default: 20,
    hover:   40,
    text:    2,
    play:    48,
  }

  const size = sizes[state]

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        y,
        width:  size,
        height: state === 'text' ? 20 : size,
        opacity: visible ? 1 : 0,
        translateX: '-50%',
        translateY: '-50%',
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        border: '1px solid var(--color-accent)',
        borderRadius: state === 'text' ? '1px' : '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mixBlendMode: 'difference',
      }}
      animate={{
        width:  size,
        height: state === 'text' ? 20 : size,
        borderRadius: state === 'text' ? '1px' : '50%',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '7px',
            letterSpacing: '0.1em',
            color: 'var(--color-accent)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
    </motion.div>
  )
}
