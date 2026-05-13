'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: '01',
    title: 'Diagnose',
    body: 'We map every touchpoint in your current funnel — ads, email, landing pages, onboarding — and find exactly where revenue is leaking.',
  },
  {
    number: '02',
    title: 'Build',
    body: 'We design and build the acquisition system: paid channels, conversion-optimised pages, email sequences, and retention flows.',
  },
  {
    number: '03',
    title: 'Scale',
    body: 'With the system live and data flowing, we optimise for CAC reduction and LTV growth — then hand you a playbook your team owns.',
  },
];

export function Solution() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray('.pillar-card').forEach((card, i) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: 'top 80%',
            once: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-32 px-4 md:px-8 bg-axiom-charcoal"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-axiom-gold mb-6">
          The axiom method
        </p>
        <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold text-white mb-16 leading-tight">
          A full-stack acquisition system. Built in 90 days.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="pillar-card bg-white/5 border border-white/10 rounded-xl p-8"
            >
              <div className="font-display text-5xl font-bold text-axiom-gold/30 leading-none mb-2">
                {pillar.number}
              </div>
              <h3 className="text-xl font-medium text-white mt-2 mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
