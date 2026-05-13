'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  week: string;
  title: string;
  items: string[];
  deliverable: string;
}

const steps: ProcessStep[] = [
  {
    week: 'Week 1-2',
    title: 'Audit and Strategy',
    items: [
      'Full funnel audit: current ads, landing pages, email, analytics',
      'Revenue mapping: which channels actually drive revenue vs. vanity metrics',
      'Competitive analysis: how your best competitors structure their funnel',
      'Opportunity audit: where the biggest wins are hiding',
    ],
    deliverable: 'Strategy document with 12-week roadmap',
  },
  {
    week: 'Week 3-6',
    title: 'Build and Implement',
    items: [
      'Redesign conversion pages (landing, checkout, onboarding)',
      'Set up email automation (welcome, nurture, re-engagement, win-back)',
      'Configure tracking and attribution (Segment, GTM, or native)',
      'Build paid campaign structure (Meta, Google, audience targeting)',
    ],
    deliverable: 'Live system + training docs',
  },
  {
    week: 'Week 7-10',
    title: 'Launch and Optimize',
    items: [
      'Launch paid campaigns at scale',
      'Monitor daily: CAC, ROAS, email open rates, conversion funnels',
      'Weekly optimization cycles: pause losers, scale winners',
      'A/B testing: headlines, audiences, messaging, timing',
    ],
    deliverable: 'Weekly optimization reports',
  },
  {
    week: 'Week 11-12',
    title: 'Handover and Playbook',
    items: [
      'Train your team on the system (operations, ads, email)',
      'Document every decision: why channels were chosen, what targets are',
      'Hand off all access and credentials (with security audit)',
      'Final optimization + team Q&A',
    ],
    deliverable: 'Operations playbook your team owns',
  },
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!containerRef.current) return;

    stepsRef.current.forEach((step, i) => {
      if (!step) return;
      gsap.from(step, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          once: true,
        },
        delay: i * 0.12,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-axiom-gold mb-6">
          How it works
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-axiom-charcoal mb-20">
          Twelve weeks. Four phases. Predictable growth.
        </h2>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => {
                stepsRef.current[i] = el;
              }}
              className="py-8 border-b border-axiom-border last:border-b-0 hover:bg-axiom-bg/30 transition-colors duration-300"
            >
              {/* Week Label */}
              <div className="flex items-start gap-6 mb-4">
                <p className="text-xl font-display font-bold text-axiom-gold uppercase tracking-wider min-w-fit">
                  {step.week}
                </p>
                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-2xl font-display font-bold text-axiom-charcoal mb-4 hover:text-axiom-gold transition-colors">
                    {step.title}
                  </h3>

                  {/* Items */}
                  <ul className="space-y-2 mb-6">
                    {/* Show top leverage item by default */}
                    <li className="text-sm text-axiom-charcoal-2 flex items-start gap-3">
                      <span className="text-axiom-gold mt-0.5 font-bold">•</span>
                      <span>{step.items[0]}</span>
                    </li>
                    {/* Reveal remaining details on demand */}
                    {expanded[i] && step.items.slice(1).map((item, j) => (
                      <li key={j} className="text-sm text-axiom-charcoal-2 flex items-start gap-3 pl-4">
                        <span className="text-axiom-gold mt-0.5 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    <li>
                      <button
                        type="button"
                        onClick={() => setExpanded((s) => ({ ...s, [i]: !s[i] }))}
                        className="text-sm text-axiom-gold underline"
                      >
                        {expanded[i] ? 'Hide details' : 'Show details'}
                      </button>
                    </li>
                  </ul>

                  {/* Deliverable */}
                  <p className="text-sm font-display font-semibold text-axiom-gold italic">
                    Deliverable: {step.deliverable}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-axiom-border">
          <p className="text-sm text-axiom-charcoal-2 mb-4">
            Every week is documented. Every decision is yours to keep.
          </p>
          <p className="text-lg font-display font-semibold text-axiom-charcoal">
            After 12 weeks: your team runs the system. I move on to the next client.
          </p>
        </div>
      </div>
    </section>
  );
}
