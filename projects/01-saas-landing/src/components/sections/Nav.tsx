"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "#changelog" },
];

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  // GSAP entrance
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline();

        tl.from(navRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        });

        if (linksRef.current) {
          tl.from(
            linksRef.current.querySelectorAll("li"),
            {
              y: -10,
              opacity: 0,
              duration: 0.45,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from(navRef.current, { opacity: 0, duration: 0.4 });
      });
    },
    { scope: navRef }
  );

  // Scroll state for blur intensification
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300`}
      style={{
        borderBottom: scrolled ? "1px solid rgba(26,22,18,0.08)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
        background: scrolled ? "rgba(247,243,238,0.88)" : "rgba(247,243,238,0.5)",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M4 16 C4 16, 8 4, 12 12 C16 20, 20 8, 20 8"
              stroke="var(--color-brand-hover)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="2" fill="var(--color-brand-primary)" />
          </svg>
          <span className="text-foreground font-semibold text-base tracking-tight font-(--font-display)">
            Flōw
          </span>
        </a>

        {/* Nav links — hidden on mobile */}
        <ul
          ref={linksRef}
          className="hidden md:flex items-center gap-7"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav-link text-sm transition-colors duration-200 ${activeSection === href
                  ? "text-[#1a1612] font-medium"
                  : "text-[#6b6560] hover:text-[#1a1612]"
                  }`}
                style={{ fontWeight: activeSection === href ? 500 : 400 }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button variant="primary" size="sm">
            Get early access
          </Button>
        </div>

        {/* Mobile: just the CTA */}
        <div className="flex md:hidden">
          <Button variant="primary" size="sm">
            Get early access
          </Button>
        </div>
      </div>
    </nav>
  );
}
