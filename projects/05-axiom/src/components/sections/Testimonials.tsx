'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TestimonialCard } from '@/components/ui';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  result: string;
  avatar: string;
  color: string;
}

const avatarColors = {
  gold: '#b8922a',
  blue: '#3b82f6',
  green: '#10b981',
} as const;

const testimonials: Testimonial[] = [
  {
    quote:
      'Rohan did not just build a funnel. He built a machine. Within 45 days, our CAC dropped 62%, and our ROAS hit 340%. But the real thing? He handed us the playbook. We now run it ourselves.',
    name: 'Aditya Sharma',
    role: 'Founder, Derm.co',
    result: '340% ROAS',
    avatar: 'AS',
    color: avatarColors.gold,
  },
  {
    quote:
      'Every consultant promised enterprise deals. Nobody delivered. Rohan actually built the funnel, the sequences, the retargeting. 12 demos month one. Pipeline is now ₹2.4Cr and predictable.',
    name: 'Priya Menon',
    role: 'CEO, Karta HR',
    result: '₹2.4Cr Pipeline',
    avatar: 'PM',
    color: avatarColors.blue,
  },
  {
    quote:
      'We spent 6 months on conversion optimization and got 8% improvement. Rohan redesigned our signup flow + email sequence. Same traffic. 3.2× better conversion. Retention up 35%.',
    name: 'Vikram Nair',
    role: 'Head of Growth, Learnfast',
    result: '3.2× Conversion',
    avatar: 'VN',
    color: avatarColors.green,
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
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
    <section ref={containerRef} className="py-32 px-4 md:px-8 bg-axiom-bg">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-axiom-gold mb-6 text-center">
          What clients say
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-axiom-charcoal mb-20 text-center">
          Real results. Real builders.
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
            >
              <TestimonialCard
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                result={testimonial.result}
                avatar={testimonial.avatar}
                color={testimonial.color}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
