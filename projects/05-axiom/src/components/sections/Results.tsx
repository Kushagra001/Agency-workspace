'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ResultCard {
  client: string;
  metric: string;
  label: string;
  period: string;
  detail: string;
  tags: string[];
  isHighlight?: boolean;
}

const results: ResultCard[] = [
  {
    client: 'Derm.co',
    metric: '340%',
    label: 'ROAS',
    period: 'in 60 days',
    detail: 'D2C skincare brand. We systemized their paid funnel across Meta + Google, cut CAC by 42%, and locked in repeatable 340% ROAS on incremental spend.',
    tags: ['D2C', 'Paid', 'CAC Reduction'],
  },
  {
    client: 'Karta HR',
    metric: '₹2.4Cr',
    label: 'Pipeline',
    period: 'Q3 2025',
    detail: 'B2B SaaS in HR tech. Built enterprise sales funnel from zero: landing pages, email sequences, retargeting. Pipeline now predictable. 12 enterprise demos booked month one.',
    tags: ['B2B', 'Sales Funnel', 'Enterprise'],
    isHighlight: true,
  },
  {
    client: 'Learnfast',
    metric: '3.2×',
    label: 'Conversion',
    period: 'same traffic',
    detail: 'EdTech platform. Redesigned signup flow + onboarding email sequence. No new traffic. Same 8K/week, now converts 3.2× better. Retention improved 35%.',
    tags: ['EdTech', 'Conversion Optimization', 'Retention'],
  },
];

interface ParsedMetric {
  value: number;
  suffix: string;
}

const parsedMetrics = results.map(r => {
  const text = r.metric;
  let value = 0;
  let suffix = '';

  if (text.includes('%')) {
    value = parseInt(text);
    suffix = '%';
  } else if (text.includes('×')) {
    value = parseFloat(text);
    suffix = '×';
  } else if (text.includes('Cr')) {
    value = parseFloat(text);
    suffix = 'Cr';
  }

  return { value, suffix };
}) as ParsedMetric[];

export default function Results() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const countersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const triggers: any[] = [];

    // Animate cards on scroll
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const scrollTrigger = gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          once: true,
        },
        delay: i * 0.15,
      }).scrollTrigger as any;
      if (scrollTrigger) triggers.push(scrollTrigger);
    });

    // CountUp animation on scroll
    parsedMetrics.forEach((metric, i) => {
      const counter = countersRef.current[i];
      if (!counter || metric.value === 0) return;

      const card = cardsRef.current[i];
      if (!card) return;

      const obj = { value: 0 };
      const scrollTrigger = gsap.to(obj, {
        value: metric.value,
        duration: 2,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          once: true,
        },
        onUpdate() {
          const currentValue = Number(obj.value);
          if (!Number.isFinite(currentValue)) return;

          if (metric.suffix === 'Cr') {
            counter.textContent = `${currentValue.toFixed(1)}Cr`;
          } else if (metric.suffix === '×') {
            counter.textContent = `${currentValue.toFixed(1)}×`;
          } else {
            counter.textContent = `${Math.round(currentValue)}%`;
          }
        },
      }).scrollTrigger as any;
      if (scrollTrigger) triggers.push(scrollTrigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-8 bg-axiom-bg">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-axiom-gold mb-6">
          Proof in results
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-axiom-charcoal mb-20">
          Three clients. Three different problems. Same system.
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className={`p-8 border border-axiom-border rounded-lg transition-all duration-300 ${
                result.isHighlight
                  ? 'lg:col-span-1 lg:row-span-1 md:col-span-2 bg-axiom-surface'
                  : 'bg-white'
              }`}
            >
              {/* Metric */}
              <div className="mb-6">
                <div className="text-6xl font-display font-bold text-axiom-gold mb-2">
                  <span ref={(el) => {
                    if (el) countersRef.current[i] = el;
                  }}>
                    {result.metric}
                  </span>
                </div>
                <p className="text-sm text-axiom-gold font-semibold uppercase tracking-wider">
                  {result.label}
                </p>
                <p className="text-xs text-axiom-muted mt-1">{result.period}</p>
              </div>

              {/* Client & Detail */}
              <div className="mb-6">
                <p className="text-lg font-display font-semibold text-axiom-charcoal mb-3">
                  {result.client}
                </p>
                <p className="text-sm text-axiom-charcoal-2 leading-relaxed">
                  {result.detail}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-axiom-border">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-axiom-gold/10 text-axiom-gold px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
