"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const emergencyRef = React.useRef<HTMLDivElement>(null);
  const navRef = React.useRef<HTMLElement>(null);
  const linksRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Emergency strip slides down
    if (emergencyRef.current) {
      tl.from(emergencyRef.current, {
        y: -36,
        opacity: 0,
        duration: 0.4,
      });
    }

    // Nav fades in
    if (navRef.current) {
      tl.from(
        navRef.current,
        {
          y: -10,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.1"
      );
    }

    // Links stagger
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll("a");
      tl.from(
        links,
        {
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
        },
        "-=0.2"
      );
    }
  }, []);

  const navLinks = [
    { label: "Departments", href: "#services" },
    { label: "Doctors", href: "#doctors" },
    { label: "About Us", href: "#about" },
    { label: "Patient Info", href: "#booking" },
  ];

  return (
    <>
      {/* Emergency strip */}
      <div
        ref={emergencyRef}
        className="bg-clinical-blue text-white text-center py-2 text-xs will-change-transform"
      >
        <span className="font-medium">
          For emergencies, call{" "}
          <a href="tel:+919876543210" className="font-bold underline">
            +91 98765 43210
          </a>{" "}
          — available 24/7
        </span>
      </div>

      {/* Main nav */}
      <nav
        ref={navRef}
        className="sticky top-0 z-50 h-[68px] bg-clinical-white border-b border-clinical-border shadow-sm will-change-transform"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="w-8 h-8 rounded-md bg-clinical-blue flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <span className="font-semibold text-ink text-lg">Medica</span>
            </a>

            {/* Desktop nav links */}
            <div ref={linksRef} className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-ink-muted hover:text-clinical-blue transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <a
                href="tel:+919876543210"
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-clinical-blue"
              >
                <Phone size={14} />
                +91 98765 43210
              </a>
              <Button size="sm" className="hidden sm:inline-flex" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                Book appointment
              </Button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-3 text-ink min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-clinical-white border-t border-clinical-border">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-ink-muted hover:text-clinical-blue transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-clinical-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-ink-muted">Theme</span>
                  <ThemeToggle />
                </div>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-1.5 text-sm font-medium text-clinical-blue py-2"
                >
                  <Phone size={14} />
                  +91 98765 43210
                </a>
                <Button className="w-full" onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}>Book appointment</Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
