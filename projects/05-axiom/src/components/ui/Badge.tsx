import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'success';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-axiom-border text-axiom-charcoal',
    gold: 'bg-axiom-gold-light text-axiom-gold-dark border border-axiom-gold/20',
    success: 'bg-axiom-gold-light text-axiom-gold-dark border border-axiom-gold/20',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
