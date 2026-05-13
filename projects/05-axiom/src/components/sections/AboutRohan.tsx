'use client';

import { useRef } from 'react';

interface Credential {
  label: string;
  value: string;
}

const credentials: Credential[] = [
  { label: 'Clients', value: '47+' },
  { label: 'Avg ROAS', value: '3.8×' },
  { label: 'Revenue Attributed', value: '₹28Cr+' },
  { label: 'Avg Timeline', value: '90 days' },
  { label: 'Repeat Rate', value: '67%' },
  { label: 'Years in Growth', value: '9' },
];

export default function AboutRohan() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="py-32 px-4 md:px-8 bg-white"
      id="about"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image Placeholder */}
          <div className="relative aspect-square bg-axiom-bg rounded-lg overflow-hidden flex items-center justify-center">
            {/* Placeholder for founder image */}
            <div className="text-center">
              <div className="text-8xl text-axiom-gold/20 font-display font-bold mb-4">
                R
              </div>
              <p className="text-axiom-charcoal-2 text-sm">
                [Founder image placeholder]
              </p>
            </div>

            {/* Floating Credentials Badge */}
            <div className="absolute bottom-6 left-6 bg-white border border-axiom-border rounded-lg p-4 shadow-lg max-w-xs">
              <p className="text-xs text-axiom-gold font-semibold uppercase tracking-wider mb-3">
                By the numbers
              </p>
              <div className="space-y-2">
                {credentials.slice(0, 3).map((cred) => (
                  <div
                    key={cred.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-axiom-charcoal-2">
                      {cred.label}
                    </span>
                    <span className="text-sm font-semibold text-axiom-gold">
                      {cred.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Text + Credentials Grid */}
          <div>
            <p className="text-xs tracking-widest uppercase text-axiom-gold mb-4">
              About Rohan
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-axiom-charcoal mb-8">
              I only solve one problem: turning ad spend into revenue.
            </h2>
            <div className="prose prose-sm text-axiom-charcoal-2 space-y-4 mb-12 max-w-none">
              <p>
                Nine years ago, I worked inside early-stage startups. Watched them burn ₹50L on
                Google + Meta ads with nothing to show. No tracking. No funnel. No system.
              </p>
              <p>
                So I built one. A repeatable system for D2C brands and SaaS startups to diagnose their
                funnel, build a scalable acquisition engine, and hand it off in 90 days.
              </p>
              <p>
                Since then: 47 clients. ₹28Cr+ in attributed revenue. 3.8× average ROAS. 67%
                return for follow-on work.
              </p>
              <p>
                I do not build agencies. I do not do retainers. I take on 4 clients per year. Each
                one pays ₹50-100L for the system. Then I move on.
              </p>
            </div>

            {/* Full Credentials Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-axiom-border">
              {credentials.map((cred) => (
                <div key={cred.label}>
                  <p className="text-2xl md:text-3xl font-display font-bold text-axiom-gold mb-1">
                    {cred.value}
                  </p>
                  <p className="text-xs text-axiom-charcoal-2 uppercase tracking-widest">
                    {cred.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
