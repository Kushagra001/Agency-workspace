import { Button } from '@/components/ui';
import Link from 'next/link';

export const metadata = {
  title: 'Thank You | Axiom Strategy',
  description: 'Your framework is on its way. Next: book your strategy call.',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8 bg-axiom-bg">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="text-7xl font-display font-bold text-axiom-gold mb-4">
            ✓
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-display font-bold text-axiom-charcoal mb-6">
          Framework is yours.
        </h1>

        {/* Subheading */}
        <p className="text-xl text-axiom-charcoal-2 mb-8 leading-relaxed">
          Check your inbox (and spam folder) for the download link.
        </p>

        {/* Description */}
        <div className="prose prose-lg text-axiom-charcoal-2 space-y-4 mb-12 max-w-none">
          <p>
            You now have the framework I use to audit every client. Revenue attribution model. Funnel
            audit checklist. Competitive analysis. Quick-win opportunities. Full 12-week playbook.
          </p>
          <p>
            Work through it. See where your funnel is leaking. Then decide: do you want to fix it yourself,
            or do you want me to do it in 90 days?
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#book-call" className="inline-block">
            <Button variant="gold" size="md">
              Book your strategy call
            </Button>
          </Link>
          <Link href="/" className="inline-block">
            <Button variant="outline" size="md">
              Back to site
            </Button>
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-axiom-charcoal-2 mt-16 pt-8 border-t border-axiom-border">
          The call is free. 30 minutes. No sales pitch. Just me telling you exactly where your growth is
          being left on the table.
        </p>
      </div>
    </div>
  );
}
