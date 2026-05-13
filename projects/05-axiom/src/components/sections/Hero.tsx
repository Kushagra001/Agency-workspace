'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button } from '@/components/ui';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-badge', { opacity: 0, y: 10, duration: 0.5 })
        .from('.hero-h1', { opacity: 0, y: 30, duration: 0.8 }, '-=0.2')
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero-ctas', { opacity: 0, y: 16, duration: 0.5 }, '-=0.3')
        .from('.hero-trust', { opacity: 0, duration: 0.4 }, '-=0.2');
    },
    { scope: containerRef }
  );

  const scrollToLeadMagnet = () => {
    const element = document.getElementById('lead-magnet');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative pt-24 pb-20 px-4 md:px-8 bg-axiom-bg"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Social proof badge */}
        <div className="hero-badge inline-flex items-center gap-2 bg-axiom-gold-light border border-axiom-gold/20 rounded-full px-4 py-1.5 mb-8">
          <div className="flex -space-x-1">
            {['RV', 'AS', 'MK'].map((init, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full bg-axiom-gold flex items-center justify-center text-[8px] text-white font-medium border border-white"
              >
                {init}
              </div>
            ))}
          </div>
          <span className="text-xs text-axiom-charcoal-2">
            Joined by <strong>47 founders</strong> this month
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-h1 font-display text-[clamp(36px,5.5vw,72px)] font-bold leading-[1.05] tracking-tight text-axiom-charcoal mb-6">
          Your ads are running.
          <br />
          <span className="text-axiom-gold italic">Your growth isn&apos;t.</span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub text-base md:text-lg text-axiom-charcoal-2 leading-relaxed max-w-xl mx-auto mb-8">
          Most D2C brands and SaaS startups spend ₹5–50L on marketing and can&apos;t
          tell you which ₹1 is working. I fix that. In 90 days, with a system you
          own.
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button size="lg" onClick={scrollToLeadMagnet}>
            Get the free growth audit framework →
          </Button>
          <button
            onClick={scrollToLeadMagnet}
            className="text-sm text-axiom-muted hover:text-axiom-charcoal transition-colors underline underline-offset-4"
          >
            or book a strategy call directly
          </button>
        </div>

        {/* Trust line */}
        <p className="hero-trust text-xs text-axiom-muted italic">
          No fluff. No upsells. No &apos;hop on a discovery call&apos; to get the thing.
        </p>
      </div>
    </section>
  );
}
