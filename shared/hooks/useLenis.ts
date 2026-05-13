'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface LenisOptions {
  /** Scroll duration multiplier. Higher = slower scroll. Default: 1.2 */
  duration?: number
  /** Easing function for scroll. Default: smooth cubic ease */
  easing?: (t: number) => number
  /** Scroll direction. Default: 'vertical' */
  orientation?: 'vertical' | 'horizontal'
  /** Enable smooth scroll on touch devices. Default: false */
  syncTouch?: boolean
  /** Wheel multiplier. Default: 1 */
  wheelMultiplier?: number
  /** Touch multiplier. Default: 2 */
  touchMultiplier?: number
}

/**
 * Initializes Lenis smooth scroll and syncs it with the GSAP ticker.
 * This ensures ScrollTrigger and Lenis stay perfectly in sync — no jitter.
 *
 * Usage:
 *   const lenis = useLenis()
 *
 * Scroll programmatically:
 *   lenis?.scrollTo('#section', { offset: -80, duration: 1.2 })
 *
 * Put this in your root layout or a <SmoothScroll> wrapper component.
 */
export function useLenis(options: LenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const {
      duration = 1.2,
      easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation = 'vertical',
      syncTouch = false,
      wheelMultiplier = 1,
      touchMultiplier = 2,
    } = options

    const lenis = new Lenis({
      duration,
      easing,
      orientation,
      syncTouch,
      wheelMultiplier,
      touchMultiplier,
    })

    lenisRef.current = lenis

    // Sync Lenis raf with GSAP ticker — this is the critical step.
    // Without this, ScrollTrigger and Lenis will fight each other.
    const rafCallback = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCallback)

    // Prevent GSAP from adding its own lag compensation on top of Lenis
    gsap.ticker.lagSmoothing(0)

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
      lenisRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return lenisRef.current
}
