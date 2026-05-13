"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
];

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline();
      const links = linksRef.current ? linksRef.current.querySelectorAll("a") : [];
      tl.from(logoRef.current, { opacity: 0, x: -20, duration: 0.8, ease: "power3.out" });
      tl.from(links, { opacity: 0, y: -8, stagger: 0.07, duration: 0.5, ease: "power3.out" }, "-=0.4");
    });

    ScrollTrigger.create({
      start: "top -80",
      onUpdate(self) {
        gsap.to(navRef.current, {
          backgroundColor: self.direction === 1 ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: self.direction === 1 ? "blur(12px)" : "blur(0px)",
          borderBottomColor: self.direction === 1 ? "#e5e5e5" : "transparent",
          duration: 0.3,
          overwrite: true,
        });
      },
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-[60px] border-b border-transparent"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="h-full px-6 md:px-10 flex items-center justify-between">
        <a ref={logoRef} href="#" className="font-display text-[18px] font-medium tracking-tight text-ink" data-magnetic>
          Arca
        </a>

        <div ref={linksRef} className="flex items-center gap-7">
          <div className="hidden md:flex items-center gap-7">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} data-magnetic className="text-[13px] text-dim hover:text-ink transition-colors duration-200">
                {link.label}
              </a>
            ))}
          </div>
          <a href="#contact" data-magnetic className="text-[13px] text-ink underline underline-offset-4 hover:opacity-70 transition-opacity">
            Start a project {"->"}
          </a>
        </div>
      </div>
    </nav>
  );
}
