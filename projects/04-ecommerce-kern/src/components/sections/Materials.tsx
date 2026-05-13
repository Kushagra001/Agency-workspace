"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    origin: "Japan",
    name: "Brushed Cotton Twill",
    description: "Woven in Okayama. Dense, warm, softens over time.",
    used: "Overshirt 01, Trouser 03",
  },
  {
    origin: "Portugal",
    name: "Oxford Cotton",
    description: "Traditional 2×1 basket weave. Gets better with every wash.",
    used: "Oxford Shirt 01",
  },
  {
    origin: "Italy",
    name: "Double-Faced Wool",
    description: "Milled in Biella. Reversible. Structured without lining.",
    used: "Overcoat 01",
  },
];

export function Materials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left text reveal
      gsap.from(".materials-left", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Cards stagger in from right
      gsap.from(".material-card", {
        opacity: 0,
        x: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-8 md:px-16 bg-kern-black-2">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left: editorial text */}
        <div className="materials-left max-w-xs">
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-kern-cream-faint mb-6">
            Materials
          </p>
          <h2
            className="font-display font-light text-kern-cream leading-tight mb-6"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Fabric first.
            <br />
            Always.
          </h2>
          <p className="font-sans text-sm text-kern-cream-dim leading-relaxed">
            Every Kern piece starts with the fabric. We work with mills in
            Japan, Portugal, and Italy. Sourcing materials that improve with
            every wash, every wear, every year.
          </p>
        </div>

        {/* Right: 3 material cards */}
        <div className="flex flex-col gap-4">
          {materials.map((mat) => (
            <div
              key={mat.name}
              className="material-card group bg-kern-black border border-kern-border p-6 transition-all duration-200 hover:border-kern-border-strong"
            >
              <p className="font-sans text-[9px] tracking-widest uppercase text-kern-cream-faint mb-2">
                {mat.origin}
              </p>
              <h3 className="font-display text-lg font-light text-kern-cream mb-2">
                {mat.name}
              </h3>
              <p className="font-sans text-[13px] text-kern-cream-dim leading-relaxed mb-4">
                {mat.description}
              </p>
              <p className="font-sans text-[11px] text-kern-cream-faint italic">
                Used in: {mat.used}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
