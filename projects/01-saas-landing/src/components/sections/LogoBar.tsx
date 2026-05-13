"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin();

const LOGOS = [
  { name: "Notion", font: "serif" },
  { name: "Linear", font: "sans" },
  { name: "Figma", font: "display" },
  { name: "Vercel", font: "sans" },
  { name: "Stripe", font: "sans" },
  { name: "GitHub", font: "display" },
];
const LOGOS_DOUBLED = [...LOGOS, ...LOGOS];

export function LogoBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // Double rAF: wait two frames so fonts are rendered and scrollWidth is correct
    let rafId: number;
    let tween: gsap.core.Tween | null = null;

    const start = () => {
      const trackWidth = track.scrollWidth;
      if (trackWidth === 0) return;

      // Kill any previous tween
      tween?.kill();

      // Reset position then animate
      gsap.set(track, { x: 0 });
      tween = gsap.to(track, {
        x: -(trackWidth / 2),
        duration: trackWidth / 60, // ~60px/s, scales with content width
        ease: "none",
        repeat: -1,
      });
    };

    rafId = requestAnimationFrame(() => {
      requestAnimationFrame(start);
    });

    return () => {
      cancelAnimationFrame(rafId);
      tween?.kill();
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="py-24 border-b border-surface-border/40 overflow-hidden bg-surface-base">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col gap-3">
          <h3
            className="text-[11px] uppercase font-medium"
            style={{ letterSpacing: "0.1em", color: "#c0392b" }}
          >
            Used at
          </h3>
          <p
            className="text-[22px] font-(--font-display)"
            style={{ fontWeight: 400, color: "#6b6560", letterSpacing: "-0.01em" }}
          >
            The operating system for teams that ship.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden marquee-container">
        <div
          ref={trackRef}
          className="flex w-max items-center select-none cursor-default"
          style={{ gap: "120px" }}
        >
          {LOGOS_DOUBLED.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="px-4 py-2 group/logo flex flex-col items-center gap-2"
            >
              <span
                className={`text-3xl md:text-4xl tracking-tighter transition-all duration-700 block
                  ${logo.font === "serif" ? "font-serif" : logo.font === "display" ? "font-(--font-display)" : "font-sans"}
                `}
                style={{ fontWeight: 500, color: "#b8b4b0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1a1612"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#b8b4b0"; }}
              >
                {logo.name}
              </span>
              <div className="h-0.5 w-0 group-hover/logo:w-full transition-all duration-500 ease-in-out"
                style={{ background: "rgba(192,57,43,0.4)" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
