'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-4 md:px-8 bg-axiom-charcoal text-white border-t border-axiom-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-display font-bold mb-2">Axiom Strategy</h3>
            <p className="text-sm text-white/60">
              90-day acquisition systems for D2C brands and SaaS startups.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-axiom-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Back to top
                </a>
              </li>
              <li>
                <a href="#book-call" className="text-white/70 hover:text-white transition-colors">
                  Book a call
                </a>
              </li>
              <li>
                <a href="#lead-magnet" className="text-white/70 hover:text-white transition-colors">
                  Get free framework
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-axiom-gold mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Unsubscribe
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs text-white/50 text-center">
          <p>
            © {currentYear} Axiom Strategy. All rights reserved. No cookies, no tracking. Just results.
          </p>
        </div>
      </div>
    </footer>
  );
}
