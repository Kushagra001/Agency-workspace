'use client';

import { CalendlyEmbed } from '@/components/ui';

export default function BookCall() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/rohan';

  return (
    <section className="py-32 px-4 md:px-8 bg-axiom-bg" id="book-call">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-xs tracking-widest uppercase text-axiom-gold mb-4">
          Book a call
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-axiom-charcoal mb-6">
          Free 30-minute strategy call
        </h2>
        <p className="text-lg text-axiom-charcoal-2">
          Not a sales call. Tell me about your business, revenue goals, and current spend. I will tell
          you exactly where your funnel is leaking.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8 text-sm text-axiom-charcoal-2">
          <p className="mb-4">
            Pick a time that works. This is a no-pressure 30-minute call — I will look at one metric and give you one clear next step. No sales pitch.
          </p>
        </div>
        <CalendlyEmbed url={calendlyUrl} />
      </div>
    </section>
  );
}
