"use client";
import { useState } from "react";
import Link from "next/link";

type FooterLinkItem = {
  label: string;
  href?: string;
};

const footerLinks: Record<string, FooterLinkItem[]> = {
  Shop: [
    { label: "Shirts", href: "/shop?category=Shirts" },
    { label: "Trousers", href: "/shop?category=Trousers" },
    { label: "Outerwear", href: "/shop?category=Outerwear" },
    { label: "New Arrivals", href: "/shop" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Stockists", href: "/stockists" },
    { label: "Press" },
    { label: "Careers" },
  ],
  Support: [
    { label: "Sizing guide" },
    { label: "Returns" },
    { label: "Shipping" },
    { label: "Contact" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <footer className="bg-kern-black-2 border-t border-kern-border pt-20 pb-10 px-8 md:px-16 relative overflow-hidden">
      {/* Decorative background wordmark */}
      <div
        className="absolute top-0 left-0 right-0 flex items-start justify-center pointer-events-none select-none overflow-hidden"
        style={{ height: "120px" }}
      >
        <span
          className="font-display font-light text-kern-cream leading-none"
          style={{
            fontSize: "clamp(80px, 12vw, 180px)",
            color: "rgba(245,240,232,0.04)",
            transform: "translateY(-20%)",
          }}
        >
          KERN
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Shop, Company, Support */}
          {Object.entries(footerLinks).map(([category, items]) => (
            <div key={category}>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-kern-cream mb-5">
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="font-sans font-normal text-[11px] text-kern-cream-faint hover:text-kern-cream-dim transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="font-sans font-normal text-[11px] text-kern-cream-faint">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Follow + Newsletter */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-kern-cream mb-5">
              Follow
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {["Instagram", "Pinterest"].map((item) => (
                <li key={item}>
                  <span className="font-sans font-normal text-[11px] text-kern-cream-faint">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-kern-cream mb-3">
              Newsletter
            </p>
            {submitted ? (
              <p className="font-sans text-[11px] text-kern-cream-faint">
                Thank you.
              </p>
            ) : (
              <form onSubmit={handleJoin}>
                <div className="flex border-b border-kern-border">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent font-sans text-xs text-kern-cream placeholder:text-kern-cream-faint py-2 outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="font-sans text-xs tracking-widest uppercase text-kern-cream-faint hover:text-kern-cream transition-colors pl-4"
                  >
                    Join →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-kern-border pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-sans text-[11px] text-kern-cream-faint">
            © 2025 Kern. Made in India.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms"].map((item) => (
              <span
                key={item}
                className="font-sans font-normal text-[11px] text-kern-cream-faint"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
