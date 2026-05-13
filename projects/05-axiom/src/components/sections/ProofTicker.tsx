'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function ProofTicker() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const results = [
    '↑ 340% ROAS for a D2C skincare brand in 60 days',
    '₹2.4Cr in revenue attributed in Q3 2025',
    '↓ CAC from ₹1,800 to ₹420 for SaaS client',
    '3× email list growth in 45 days — zero ad spend',
    '₹80L pipeline generated from a single campaign',
    '↑ Conversion rate from 0.8% to 3.2% — same traffic',
    '11 enterprise demos booked in month one',
    '↓ Churn from 8% to 2.1% through retention strategy',
  ];

  useGSAP(
    () => {
      const marquee = marqueeRef.current;
      if (!marquee) return;

      // Clone items for seamless loop
      const items = marquee.querySelectorAll('.ticker-item');
      items.forEach((item: Element) => {
        const clone = item.cloneNode(true);
        marquee.appendChild(clone);
      });

      // Respect reduced motion preferences
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const narrowScreen = window.matchMedia && window.matchMedia('(max-width: 640px)').matches;

      const totalWidth = (marquee as HTMLDivElement).scrollWidth / 2;

      if (prefersReduced) {
        // Do nothing — static content
        return;
      }

      // On narrow screens, slow the animation and avoid continuous loop to save CPU
      const tween = gsap.to(marquee, {
        x: -totalWidth,
        duration: narrowScreen ? 45 : 25,
        ease: 'linear',
        repeat: narrowScreen ? 0 : -1,
      });

      // Pause/resume when the page is hidden to save battery
      const handleVisibility = () => {
        if (document.hidden) tween.pause(); else tween.play();
      };
      document.addEventListener('visibilitychange', handleVisibility);

      // Cleanup: remove listener and kill tween
      return () => {
        document.removeEventListener('visibilitychange', handleVisibility);
        try { tween.kill(); } catch {
          // ignore
        }
      };
    },
    { scope: marqueeRef }
  );

  return (
    <section className="w-full bg-axiom-charcoal py-5 overflow-hidden">
      <div className="relative h-8 flex items-center">
        <div
          ref={marqueeRef}
          className="flex gap-8 items-center whitespace-nowrap"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          {results.map((result, i) => (
            <span
              key={i}
              className="ticker-item text-xs md:text-sm text-white/80 flex items-center gap-3"
            >
              <span>{result}</span>
              <span className="text-axiom-gold text-lg leading-none">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
