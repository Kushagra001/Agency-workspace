'use client'

import { useRef, RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export type SplitType = 'chars' | 'words' | 'lines' | 'words,chars' | 'lines,words'
export type AnimateTrigger = 'mount' | 'scroll'

export interface SplitTextOptions {
  /**
   * What to split the text into. Default: 'chars'
   * 'chars'       → animate each character
   * 'words'       → animate each word
   * 'lines'       → animate each line (depends on rendered layout)
   * 'words,chars' → split to both words and chars (chars are animated)
   */
  type?: SplitType
  /** When to trigger the animation. Default: 'scroll' */
  animateOn?: AnimateTrigger
  /** Stagger delay between each split unit (seconds). Default: 0.03 */
  stagger?: number
  /** Animation duration per unit (seconds). Default: 0.7 */
  duration?: number
  /** GSAP ease. Default: 'power4.out' */
  ease?: string
  /** Y offset to animate from. Default: '110%' (slides up from below) */
  fromY?: string | number
  /** Starting opacity. Default: 1 (SplitText typically clips, not fades) */
  fromOpacity?: number
  /** Rotation to animate from (degrees). Default: 0 */
  fromRotation?: number
  /** ScrollTrigger start. Default: 'top 88%' */
  start?: string
  /** Delay before animation starts (seconds). Default: 0 */
  delay?: number
  /**
   * Wrap each line in an overflow:hidden div to create a clean "wipe up" effect.
   * Recommended for char/word animations. Default: true
   */
  linesClass?: string
}

/**
 * Applies GSAP SplitText animation to a text element.
 * Requires Club GSAP for SplitText plugin.
 *
 * Usage (scroll-triggered char animation):
 *   const headingRef = useSplitText<HTMLHeadingElement>()
 *   return <h1 ref={headingRef}>Hello World</h1>
 *
 * Usage (on-mount word animation):
 *   const ref = useSplitText<HTMLParagraphElement>({
 *     type: 'words',
 *     animateOn: 'mount',
 *     stagger: 0.05,
 *   })
 *
 * IMPORTANT: SplitText is a Club GSAP plugin. Free for localhost/dev.
 * For production client work, add a GSAP Club membership.
 */
export function useSplitText<T extends HTMLElement = HTMLElement>(
  options: SplitTextOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null)

  const {
    type = 'chars',
    animateOn = 'scroll',
    stagger = 0.03,
    duration = 0.7,
    ease = 'power4.out',
    fromY = '110%',
    fromOpacity = 1,
    fromRotation = 0,
    start = 'top 88%',
    delay = 0,
    linesClass = 'overflow-hidden',
  } = options

  useGSAP(
    () => {
      if (!ref.current) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Split the text — linesClass wraps each line for clip effect
        const split = new SplitText(ref.current!, {
          type,
          linesClass,
        })

        // Determine what units to animate
        const animTarget =
          type.includes('chars')
            ? split.chars
            : type.includes('words')
            ? split.words
            : split.lines

        const fromVars: gsap.TweenVars = {
          y: fromY,
          opacity: fromOpacity,
          rotation: fromRotation,
          ease,
          duration,
          delay,
          stagger,
        }

        if (animateOn === 'scroll') {
          fromVars.scrollTrigger = {
            trigger: ref.current!,
            start,
            toggleActions: 'play none none none',
          }
        }

        gsap.from(animTarget, fromVars)

        // Cleanup: revert SplitText on unmount to restore original DOM
        return () => split.revert()
      })

      // Reduced motion: simple fade, no movement
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const fromVars: gsap.TweenVars = {
          opacity: 0,
          duration: 0.4,
        }
        if (animateOn === 'scroll') {
          fromVars.scrollTrigger = {
            trigger: ref.current!,
            start,
            toggleActions: 'play none none none',
          }
        }
        gsap.from(ref.current!, fromVars)
      })
    },
    { scope: ref }
  )

  return ref as RefObject<T>
}
