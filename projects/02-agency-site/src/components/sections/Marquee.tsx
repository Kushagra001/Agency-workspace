"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const TICKER = "Web Development · Automation Systems · Lead Generation · Conversion Design · CMS Integration · API Development ·";

export function Marquee() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const half = track.scrollWidth / 2;
    gsap.set(track, { x: 0 });
    gsap.to(track, {
      x: -half,
      duration: 18,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (v) => `${parseFloat(v) % -half}px`,
      },
    });
  }, { scope: rootRef });

  return (
    <section ref={rootRef} className="py-6 bg-ink overflow-hidden">
      <div ref={trackRef} className="flex w-max whitespace-nowrap">
        {[0, 1, 2].map((i) => (
          <p key={i} className="px-8 font-display italic text-[20px] text-paper">
            {TICKER}
          </p>
        ))}
      </div>
    </section>
  );
}
