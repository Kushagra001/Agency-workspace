'use client';

import React, { useEffect, useState } from 'react';

interface CalendlyEmbedProps {
  url: string;
  className?: string;
}

export function CalendlyEmbed({ url, className = '' }: CalendlyEmbedProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reuse existing Calendly script if already present.
    if (document.querySelector('script[src*="calendly"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.defer = true;
    script.onerror = () => setHasError(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (hasError) {
    return (
      <div className={`bg-axiom-border rounded-2xl overflow-hidden p-8 text-center ${className}`}>
        <p className="text-axiom-charcoal-2">Unable to load calendar. Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div
      className={`calendly-inline-widget rounded-2xl overflow-hidden ${className}`}
      data-url={url}
      style={{ minWidth: 320, height: 'clamp(500px, 90vh, 700px)' }}
      role="region"
      aria-label="Calendly booking widget"
    />
  );
}
