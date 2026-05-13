import { GitFork, MessageCircle, Briefcase } from "lucide-react";

const LINKS = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Social: [
    { label: "Twitter / X", icon: MessageCircle, href: "#" },
    { label: "GitHub", icon: GitFork, href: "#" },
    { label: "LinkedIn", icon: Briefcase, href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-surface-border py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 16 C4 16, 8 4, 12 12 C16 20, 20 8, 20 8"
                  stroke="var(--color-brand-hover)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="2" fill="var(--color-brand-primary)" />
              </svg>
              <span className="text-sm font-semibold text-foreground/80" style={{ fontFamily: "var(--font-display)" }}>
                Flōw
              </span>
            </div>
            <p className="text-[13px] text-surface-muted leading-relaxed" style={{ maxWidth: "180px" }}>
              Think less. Build more.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-surface-muted mb-4">
              Product
            </p>
            <ul className="space-y-2.5">
              {LINKS.Product.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-surface-muted hover:text-[oklch(72%_0.01_265)] transition-colors duration-200"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-surface-muted mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              {LINKS.Company.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-surface-muted hover:text-[oklch(72%_0.01_265)] transition-colors duration-200"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-surface-muted mb-4">
              Social
            </p>
            <ul className="space-y-2.5">
              {LINKS.Social.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-2 text-sm text-surface-muted hover:text-[oklch(72%_0.01_265)] transition-colors duration-200"
                  >
                    <Icon size={14} strokeWidth={1.8} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-surface-raised flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-surface-muted">
            &copy; 2025 Flōw Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-surface-muted hover:text-surface-muted transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-surface-muted hover:text-surface-muted transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
