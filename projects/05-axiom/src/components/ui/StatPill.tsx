import React from 'react';

interface StatPillProps {
  value: string | React.ReactNode;
  label: string;
  color?: 'gold' | 'charcoal' | 'white';
  className?: string;
}

export function StatPill({ value, label, color = 'gold', className = '' }: StatPillProps) {
  const colorClasses = {
    gold: 'bg-axiom-gold-light text-axiom-gold-dark',
    charcoal: 'bg-axiom-charcoal text-white',
    white: 'bg-white text-axiom-charcoal border border-axiom-border',
  };

  return (
    <div className={`inline-block px-4 py-3 rounded-full ${colorClasses[color]} ${className}`}>
      <div className="text-base font-semibold leading-none">{value}</div>
      <div className="text-xs mt-1 opacity-80">{label}</div>
    </div>
  );
}
