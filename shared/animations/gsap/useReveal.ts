'use client'

import { useRef, RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface RevealOptions {
  /**
   * Animate children individually with a stagger delay (seconds).
   * Set to 0 to animate the container as one unit.
   * Default: 0.08
   */
  stagger?: number
  /** Animation duration in seconds. Default: 0.9 */
  duration?: number
  /** GSAP ease string. Default: 'power3.out' */
  ease?: string
  /** Y offset to animate from (pixels). Default: 60 */
  y?: number
  /** X offset to animate from (pixels). Default: 0 */
  x?: number
  /** Starting opacity. Default: 0 */
  fromOpacity?: number
  /**
   * ScrollTrigger start position.
   * Default: 'top 85%' (triggers when element top hits 85% down the viewport)
   */
  start?: string
  /** Scrub the animation to scroll position instead of playing once. Default: false */
  scrub?: boolean | number
  /** Play animation once and don't reset on scroll back. Default: true */
  once?: boolean
  /** Delay before animation starts (seconds). Default: 0 */
  delay?: number
  /** Scale to animate from. Default: 1 (no scale) */
  fromScale?: number
}

/**
 * Reveals elements as they scroll into view using GSAP ScrollTrigger.
 * Wraps animations in gsap.matchMedia() to respect prefers-reduced-motion.
 *
 * Usage (animate children with stagger):
 *   const containerRef = useReveal<HTMLDivElement>({ stagger: 0.1 })
 *   return <div ref={containerRef}>...</div>
 *
 * Usage (animate the container itself):
 *   const ref = useReveal<HTMLDivElement>({ stagger: 0 })
 *
 * Animate a specific target, not children:
 *   const ref = useReveal<HTMLDivElement>({ stagger: 0, target: 'self' })
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions & { target?: 'children' | 'self' } = {}
): RefObject<T> {
  const ref = useRef<T>(null)

  const {
    stagger = 0.08,
    duration = 0.9,
    ease = 'power3.out',
    y = 60,
    x = 0,
    fromOpacity = 0,
    start = 'top 85%',
    scrub = false,
    once = true,
    delay = 0,
    fromScale = 1,
    target = stagger > 0 ? 'children' : 'self',
  } = options

  useGSAP(
    () => {
      if (!ref.current) return

      const mm = gsap.matchMedia()

      // Full animation for users with no motion preference
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const animTarget =
          target === 'children'
            ? Array.from(ref.current!.children)
            : ref.current!

        const fromVars: gsap.TweenVars = {
          y,
          x,
          opacity: fromOpacity,
          scale: fromScale,
          ease,
          duration,
          delay,
        }

        const scrollConfig: ScrollTrigger.Vars = {
          trigger: ref.current!,
          start,
          toggleActions: once
            ? 'play none none none'
            : 'play none none reverse',
        }

        if (scrub !== false) {
          scrollConfig.scrub = scrub === true ? 1.5 : scrub
          delete fromVars.ease
          delete fromVars.duration
          delete fromVars.delay
        }

        if (stagger > 0 && target === 'children') {
          gsap.from(animTarget, {
            ...fromVars,
            stagger,
            scrollTrigger: scrollConfig,
          })
        } else {
          gsap.from(animTarget, {
            ...fromVars,
            scrollTrigger: scrollConfig,
          })
        }
      })

      // Reduced motion: just fade in instantly, no movement
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const animTarget =
          target === 'children'
            ? Array.from(ref.current!.children)
            : ref.current!

        gsap.from(animTarget, {
          opacity: fromOpacity,
          duration: 0.3,
          stagger: stagger > 0 ? stagger * 0.5 : 0,
          scrollTrigger: {
            trigger: ref.current!,
            start,
            toggleActions: 'play none none none',
          },
        })
      })
    },
    { scope: ref }
  )

  return ref as RefObject<T>
}
