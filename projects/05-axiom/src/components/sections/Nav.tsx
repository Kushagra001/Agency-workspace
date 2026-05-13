'use client';

import React, { useState, useEffect } from 'react';

export function Nav() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBookCall = () => {
    const element = document.getElementById('book-call');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`sticky top-0 z-50 h-14 flex items-center justify-between px-6 md:px-8 transition-all duration-300 ${
        hasScrolled
          ? 'bg-axiom-bg/95 border-b border-axiom-border backdrop-blur-sm'
          : 'bg-axiom-bg'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="group flex items-center gap-2.5 font-sans font-medium text-sm text-axiom-charcoal cursor-pointer"
        aria-label="Scroll to top"
      >
        <span
          aria-hidden="true"
          className={`w-5 h-5 rounded-md bg-axiom-charcoal flex items-center justify-center transition-transform duration-500 ${
            hasScrolled ? 'rotate-6 scale-105' : 'rotate-0 scale-100'
          } group-hover:rotate-0 group-hover:scale-110`}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 text-axiom-gold"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 3.5L17.8 20.5H15.4L13.95 16.35H10.05L8.6 20.5H6.2L12 3.5ZM13.25 14.15L12 10.45L10.75 14.15H13.25Z" />
          </svg>
        </span>
        <span>Axiom Strategy</span>
      </button>
      <button
        onClick={scrollToBookCall}
        className="text-sm text-axiom-gold hover:text-axiom-gold-dark hover:underline transition-colors underline-offset-4 font-medium"
      >
        Book a strategy call →
      </button>
    </nav>
  );
}
