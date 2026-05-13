"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const scrollDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Image fades in slowly: the hero breathes in
      tl.from(imgRef.current, {
        opacity: prefersReducedMotion ? 1 : 0,
        scale: prefersReducedMotion ? 1 : 1.04,
        duration: prefersReducedMotion ? 0 : 2.0,
        ease: "power2.out",
      })
        .from(
          ".hero-label",
          { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 10, duration: prefersReducedMotion ? 0 : 0.6 },
          "-=0.8"
        )
        .from(
          ".hero-h1",
          { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30, duration: prefersReducedMotion ? 0 : 0.8 },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 8, duration: prefersReducedMotion ? 0 : 0.5 },
          "-=0.3"
        )
        .from(
          ".hero-scroll",
          { opacity: prefersReducedMotion ? 1 : 0, duration: prefersReducedMotion ? 0 : 0.4 },
          "-=0.2"
        );

      // Scroll dot loop: starts after 2.5s (skip if reduced motion)
      if (!prefersReducedMotion) {
        gsap.to(scrollDotRef.current, {
          y: 32,
          duration: 1.4,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2.5,
        });
      }

      // Parallax on scroll (skip if reduced motion)
      if (!prefersReducedMotion) {
        gsap.to(imgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden bg-kern-black"
      style={{ height: "100svh" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=1800&q=85"
          alt="Kern: Autumn Winter 2025"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.45)" }}
        />
        {/* Gradient vignette: darkens bottom for text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,13,10,0.2) 0%, rgba(15,13,10,0) 40%, rgba(15,13,10,0.85) 100%)",
          }}
        />
      </div>

      {/* Text: bottom-left aligned */}
      <div className="absolute bottom-16 left-8 md:left-20 z-10 max-w-xl">
        {/* Collection label */}
        <p className="hero-label font-sans text-[11px] tracking-[0.25em] uppercase text-kern-cream-faint mb-4">
          Autumn Winter 2025
        </p>

        {/* Main headline */}
        <h1
          className="hero-h1 font-display font-light leading-[1.0] tracking-tight text-kern-cream mb-6"
          style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
        >
          Crafted for
          <br />
          the considered.
        </h1>

        {/* CTA: text link only */}
        <a
          href="/shop"
          className="hero-cta inline-flex items-center gap-3 font-sans text-sm tracking-widest uppercase text-kern-cream group"
        >
          <span className="border-b border-kern-cream-faint pb-0.5 group-hover:border-kern-cream transition-colors duration-300">
            Shop the collection
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      {/* Scroll indicator: bottom right */}
      <div className="hero-scroll absolute bottom-8 right-10 flex flex-col items-center gap-2">
        <div className="relative h-12 w-px bg-kern-border-strong">
          <div
            ref={scrollDotRef}
            className="absolute w-px h-4 bg-kern-cream-dim top-0"
          />
        </div>
        <span
          className="font-sans text-[9px] tracking-[0.2em] uppercase text-kern-cream-dim"
          style={{ writingMode: "vertical-rl", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
        >
          Scroll
        </span>
      </div>
    </div>
  );
}
