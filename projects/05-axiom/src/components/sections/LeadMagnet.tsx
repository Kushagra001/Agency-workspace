'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';

const leadMagnetSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  company: z.string().min(2, 'Company is required'),
  budget: z.string().min(1, 'Select a budget'),
});

type LeadMagnetForm = z.infer<typeof leadMagnetSchema>;

export default function LeadMagnet() {
  const containerRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastEmail, setLastEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadMagnetForm>({
    resolver: zodResolver(leadMagnetSchema),
  });

  const onSubmit = async (data: LeadMagnetForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setLastEmail(data.email);
        setIsSuccess(true);
        reset();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-32 px-4 md:px-8 bg-axiom-charcoal text-white"
      id="lead-magnet"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Offer */}
          <div>
            <p className="text-xs tracking-widest uppercase text-axiom-gold mb-4">
              Free framework
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              The 90-Day Growth Audit Framework
            </h2>
            <p className="text-lg text-white/80 mb-12 leading-relaxed">
              Everything I use to audit a business in 90 days. Every channel. Every metric. Every optimization.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                'Revenue attribution model (what actually drives revenue)',
                'Funnel audit template (copy, landing pages, email sequences)',
                'Competitive analysis framework (their full funnel)',
                'Quick-win opportunity audit (where to start)',
                ' 12-week playbook (the exact roadmap I follow)',
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-axiom-gold mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-white/90">{feature}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-white/60 mt-12">
              PDF. Spreadsheet. Ready to use in your business today.
            </p>
          </div>

          {/* Right: Form */}
          <div>
            {isSuccess ? (
              <div className="bg-axiom-gold/10 border border-axiom-gold rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-display font-bold mb-2">
                  Check your inbox
                </h3>
                <p className="text-white/80 mb-3">
                  Download link sent to <strong className="text-white">{lastEmail}</strong>. Check spam if you don&apos;t see it.
                </p>
                <p className="text-sm text-white/70 mb-4">We won&apos;t pressure you — download and decide. If you&apos;d like, book a free 30-minute call.</p>
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="#book-call"
                    className="text-axiom-gold font-semibold hover:text-axiom-gold/80 transition-colors"
                  >
                    Next step: book a call →
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="text-sm text-white/80 underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white/90 mb-2"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Aditya"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    {...register('name')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-axiom-gold focus:ring-2 focus:ring-axiom-gold"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-axiom-gold text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/90 mb-2"
                  >
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="aditya@derma.co"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-axiom-gold focus:ring-2 focus:ring-axiom-gold"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-axiom-gold text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-white/90 mb-2"
                  >
                    Company / brand
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Derm.co"
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? 'company-error' : undefined}
                    {...register('company')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-axiom-gold focus:ring-2 focus:ring-axiom-gold"
                  />
                  {errors.company && (
                    <p id="company-error" className="text-axiom-gold text-xs mt-1">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-white/90 mb-2"
                  >
                    Monthly marketing spend
                  </label>
                  <select
                    id="budget"
                    aria-invalid={!!errors.budget}
                    aria-describedby={errors.budget ? 'budget-error' : undefined}
                    {...register('budget')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-axiom-gold focus:ring-2 focus:ring-axiom-gold"
                  >
                    <option value="" className="text-black">
                      Choose one...
                    </option>
                    <option value="under-5l" className="text-black">
                      Under 5L
                    </option>
                    <option value="5l-20l" className="text-black">
                      5L - 20L
                    </option>
                    <option value="20l-50l" className="text-black">
                      20L - 50L
                    </option>
                    <option value="over-50l" className="text-black">
                      50L+
                    </option>
                  </select>
                  {errors.budget && (
                    <p id="budget-error" className="text-axiom-gold text-xs mt-1">
                      {errors.budget.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Get free framework'}
                </Button>

                <p className="text-xs text-white/50 text-center">
                  No spam. No follow-up call pressure. Download it, use it, decide from there.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
