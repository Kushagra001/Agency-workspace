'use client';

import React from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  result: string;
}

export function TestimonialCard({
  quote,
  name,
  role,
  avatar,
  color,
  result,
}: TestimonialCardProps) {
  return (
    <div className="bg-axiom-surface border border-axiom-border rounded-2xl p-8">
      <div className="text-6xl text-axiom-gold/20 leading-none font-display mb-2">&quot;</div>
      <p className="font-display text-lg font-light italic text-axiom-charcoal leading-relaxed mb-4">
        {quote}
      </p>
      <div className="inline-block bg-axiom-gold-light text-axiom-gold px-3 py-1 rounded-full text-xs mb-5">
        {result}
      </div>

      <div className="border-t border-axiom-border pt-4 my-5" />

      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-medium"
          style={{ backgroundColor: color }}
          role="img"
          aria-label={`${name} avatar`}
        >
          {avatar}
        </div>
        <div>
          <div className="font-medium text-sm text-axiom-charcoal">{name}</div>
          <div className="text-xs text-axiom-muted">{role}</div>
        </div>
      </div>
    </div>
  );
}
