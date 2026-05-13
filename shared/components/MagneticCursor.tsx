'use client'

import React, {
  useEffect,
  useRef,
  createContext,
  useContext,
  useState,
} from 'react'
import { gsap } from 'gsap'

// ─────────────────────────────────────────────────────────────
// Context — lets child components change cursor state/label
// ─────────────────────────────────────────────────────────────

interface CursorContextValue {
  setCursorState: (state: CursorState) => void
  setCursorLabel: (label: string) => void
}

const CursorContext = createContext<CursorContextValue>({
  setCursorState: () => {},
  setCursorLabel: () => {},
})

export const useCursor = () => useContext(CursorContext)

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type CursorState = 'default' | 'hover' | 'magnetic' | 'hidden' | 'text' | 'drag'

interface MagneticCursorProps {
  /**
   * Selector for magnetic elements.
   * Elements with [data-magnetic] will attract the cursor on hover.
   * Default: '[data-magnetic]'
   */
  magneticSelector?: string
  /**
   * Magnetic pull strength (0–1). Higher = cursor moves more toward element.
   * Default: 0.35
   */
  magneticStrength?: number
  /**
   * GSAP quickTo speed for cursor dot. Lower = snappier. Default: 0.15
   */
  dotSpeed?: number
  /**
   * GSAP quickTo speed for cursor outline/ring. Lower = snappier. Default: 0.5
   */
  ringSpeed?: number
  /**
   * Cursor dot size in px. Default: 8
   */
  dotSize?: number
  /**
   * Cursor ring size in px. Default: 40
   */
  ringSize?: number
  /**
   * Accent color for cursor. Default: '#ffffff' (white works on dark sites)
   */
  color?: string
  /**
   * Mix blend mode. 'difference' inverts color on light backgrounds.
   * Default: 'difference'
   */
  blendMode?: 'difference' | 'normal' | 'exclusion' | 'multiply'
  children?: React.ReactNode
}

// ─────────────────────────────────────────────────────────────
// Magnetic element wrapper — add data-magnetic to any element
// ─────────────────────────────────────────────────────────────

interface MagneticProps {
  children: React.ReactElement
  /** Strength of the magnetic pull (0–1). Default: 0.4 */
  strength?: number
  /** Label shown in cursor when hovering */
  label?: string
}

/**
 * Wrap any element to make it magnetic.
 * The element itself moves toward the cursor — premium feel.
 *
 * Usage:
 *   <Magnetic>
 *     <button>Click me</button>
 *   </Magnetic>
 */
export function Magnetic({ children, strength = 0.4, label }: MagneticProps) {
  const ref = useRef<HTMLElement>(null)
  const { setCursorState, setCursorLabel } = useCursor()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let bounds: DOMRect

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      if (!bounds) return
      const cx = bounds.left + bounds.width / 2
      const cy = bounds.top + bounds.height / 2
      xTo((e.clientX - cx) * strength)
      yTo((e.clientY - cy) * strength)
    }

    const handleMouseEnter = () => {
      bounds = el.getBoundingClientRect()
      setCursorState('magnetic')
      if (label) setCursorLabel(label)
      window.addEventListener('mousemove', handleMouseMove)
    }

    const handleMouseLeave = () => {
      setCursorState('default')
      setCursorLabel('')
      xTo(0)
      yTo(0)
      window.removeEventListener('mousemove', handleMouseMove)
    }

    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousemove', handleMouseMove)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [strength, label, setCursorState, setCursorLabel])

  return React.cloneElement(children, { ref } as any)
}

// ─────────────────────────────────────────────────────────────
// Main MagneticCursor component
// ─────────────────────────────────────────────────────────────

/**
 * Custom magnetic cursor. Add to your root layout.
 *
 * Usage in layout.tsx:
 *   <MagneticCursor color="#ffffff" blendMode="difference">
 *     {children}
 *   </MagneticCursor>
 *
 * Make any element magnetic:
 *   <button data-magnetic>Hover me</button>
 *   — or —
 *   <Magnetic><button>Hover me</button></Magnetic>
 *
 * Change cursor state from child components:
 *   const { setCursorState } = useCursor()
 *   setCursorState('drag')
 *
 * Cursor states:
 *   'default'  → normal dot + ring
 *   'hover'    → ring expands, dot hides
 *   'magnetic' → ring scales to element size, dot hides
 *   'text'     → thin I-beam style
 *   'drag'     → expanded ring with "drag" label
 *   'hidden'   → both hidden (for modals etc.)
 */
export function MagneticCursor({
  magneticSelector = '[data-magnetic]',
  magneticStrength = 0.35,
  dotSpeed = 0.15,
  ringSpeed = 0.5,
  dotSize = 8,
  ringSize = 40,
  color = '#111827',
  blendMode = 'normal',
  children,
}: MagneticCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [cursorLabel, setCursorLabel] = useState('')

  const isTouch = useRef(false)

  // Detect touch device — hide custom cursor entirely
  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches
  }, [])

  useEffect(() => {
    if (isTouch.current) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Track if first mousemove has occurred to avoid ghost cursor on load
    let hasFirstMove = false

    // quickTo for ultra-smooth cursor tracking
    const dotX = gsap.quickTo(dot, 'x', { duration: dotSpeed, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: dotSpeed, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: ringSpeed, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: ringSpeed, ease: 'power3.out' })

    // Ensure cursor is visible on mount — place at screen center
    const centerX = Math.round(window.innerWidth / 2)
    const centerY = Math.round(window.innerHeight / 2)
    gsap.set([dot, ring], { opacity: 1, x: centerX, y: centerY, xPercent: -50, yPercent: -50 })

    const handleMouseMove = (e: MouseEvent) => {
      // On first mousemove, show the cursor and fade it in
      if (!hasFirstMove) {
        hasFirstMove = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3, overwrite: false })
      }

      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    // Auto-detect interactive elements for hover state
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      const isMagnetic = target.closest(magneticSelector)

      if (isMagnetic) {
        setCursorState('magnetic')
      } else if (isInteractive) {
        setCursorState('hover')
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setCursorState('default')
    }

    const handleMouseLeave = () => setCursorState('hidden')
    const handleMouseEnter = () => setCursorState('default')

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // [data-magnetic] auto-pull (without Magnetic wrapper component)
    const magneticEls = document.querySelectorAll<HTMLElement>(magneticSelector)
    const cleanups: (() => void)[] = []

    magneticEls.forEach((el) => {
      let bounds: DOMRect
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

      const onMove = (e: MouseEvent) => {
        if (!bounds) return
        const cx = bounds.left + bounds.width / 2
        const cy = bounds.top + bounds.height / 2
        xTo((e.clientX - cx) * magneticStrength)
        yTo((e.clientY - cy) * magneticStrength)
      }
      const onEnter = () => {
        bounds = el.getBoundingClientRect()
        window.addEventListener('mousemove', onMove)
      }
      const onLeave = () => {
        xTo(0); yTo(0)
        window.removeEventListener('mousemove', onMove)
      }

      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        window.removeEventListener('mousemove', onMove)
        gsap.set(el, { x: 0, y: 0 })
      })
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cleanups.forEach((fn) => fn())
    }
  }, [dotSpeed, ringSpeed, dotSize, ringSize, magneticSelector, magneticStrength])

  // ── React to cursor state changes ──
  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring) return

    const states: Record<CursorState, () => void> = {
      default: () => {
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 })
        gsap.to(ring, { scale: 1, opacity: 1, width: ringSize, height: ringSize, borderWidth: 1.5, duration: 0.3 })
        if (label) gsap.to(label, { opacity: 0, duration: 0.2 })
      },
      hover: () => {
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.3 })
        gsap.to(ring, { scale: 1, opacity: 1, borderWidth: 1.5, duration: 0.3 })
        if (label) gsap.to(label, { opacity: 0, duration: 0.2 })
      },
      magnetic: () => {
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.3 })
        gsap.to(ring, { scale: 1.08, opacity: 0.92, borderWidth: 1.5, duration: 0.3 })
        if (label && cursorLabel) gsap.to(label, { opacity: 1, duration: 0.2 })
      },
      text: () => {
        gsap.to(dot, { scaleX: 0.15, scaleY: 2, opacity: 1, duration: 0.3 })
        gsap.to(ring, { scale: 0, opacity: 0, duration: 0.2 })
      },
      drag: () => {
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.3 })
        gsap.to(ring, { scale: 2, opacity: 0.7, duration: 0.4 })
        if (label) gsap.to(label, { opacity: 1, duration: 0.2 })
      },
      hidden: () => {
        gsap.to(dot, { opacity: 0, duration: 0.2 })
        gsap.to(ring, { opacity: 0, duration: 0.2 })
      },
    }

    states[cursorState]?.()
  }, [cursorState, cursorLabel, ringSize])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return <>{children}</>
  }

  const contextValue: CursorContextValue = {
    setCursorState,
    setCursorLabel,
  }

  return (
    <CursorContext.Provider value={contextValue}>
      {/* Hide default system cursor */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }
        @media (hover: none) { *, *::before, *::after { cursor: auto !important; } }
      `}</style>

      {/* Cursor dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}`,
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: blendMode,
          willChange: 'transform',
        }}
      />

      {/* Cursor ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          boxShadow: `0 0 10px ${color}33`,
          pointerEvents: 'none',
          zIndex: 99998,
          mixBlendMode: blendMode,
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Cursor label (shown in magnetic/drag state) */}
        <span
          ref={labelRef}
          style={{
            fontSize: 10,
            fontWeight: 500,
            color,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            opacity: 0,
            whiteSpace: 'nowrap',
            userSelect: 'none',
            fontFamily: 'var(--font-sans, sans-serif)',
          }}
        >
          {cursorLabel}
        </span>
      </div>

      {children}
    </CursorContext.Provider>
  )
}
