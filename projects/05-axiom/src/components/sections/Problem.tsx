'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Problem() {
  const containerRef = useRef<HTMLElement>(null);

  const pains = [
    'You are spending on Meta and Google but cannot tie spend to revenue',
    'Your agency sends beautiful reports that do not explain why sales are flat',
    'You have hired a content team but organic growth is still unpredictable',
    'You know you need a funnel but every consultant pitches something different',
    'Your best month was a fluke and you do not know how to repeat it',
  ];

  useGSAP(
    () => {
      const triggers: any[] = [];
      gsap.utils.toArray('.pain-item').forEach((item, i) => {
        const scrollTrigger = gsap.from(item as HTMLElement, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: item as HTMLElement,
            start: 'top 80%',
            once: true,
          },
        }).scrollTrigger as any;
        if (scrollTrigger) triggers.push(scrollTrigger);
      });
      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-8 bg-axiom-bg">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-axiom-gold mb-6">Sound familiar?</p>
        <p>
          We help teams launch new offers without burning time on unscalable
          processes. Here&rsquo;s where most teams go wrong: they build the wrong
          thing, test the wrong audience, and keep iterating in the dark.
        </p>
        <div className="space-y-0">
          {pains.map((pain, i) => (
            <div
              key={i}
              className="pain-item flex items-start gap-3 py-4 border-b border-axiom-border"
            >
              <X size={16} className="text-axiom-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p className="text-base text-axiom-charcoal-2">{pain}</p>
            </div>
          ))}
        </div>

        <p className="font-display text-xl md:text-2xl italic text-axiom-charcoal mt-10">
          If two or more of these sound familiar, you don&apos;t have a marketing
          problem. You have a systems problem. That&apos;s what I solve.
        </p>
      </div>
    </section>
  );
}
