"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { WireframeMesh } from "@/components/ui/WireframeMesh";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const availabilityBadgeRef = useRef<HTMLDivElement>(null);
  const scrollDotRef = useRef<HTMLSpanElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    let splitOne: SplitText | null = null;
    let splitTwo: SplitText | null = null;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      splitOne = new SplitText(lineOneRef.current, { type: "words" });
      splitTwo = new SplitText(lineTwoRef.current, { type: "words" });

      const path = underlineRef.current;
      const len = path?.getTotalLength() ?? 120;
      if (path) {
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      }

      const tl = gsap.timeline();
      tl.from(labelRef.current, { opacity: 0, y: 10, duration: 0.5 })
        .from(splitOne.words, { yPercent: 100, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }, 0.2)
        .from(splitTwo.words, { yPercent: 100, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }, 0.5)
        .to(path, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, 1.1)
        .from(descriptionRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, 1.3)
        .from(statsRowRef.current?.children ?? [], { opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: "power3.out" }, 1.5)
        .from(scrollIndicatorRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, 1.6)
        .from(availabilityBadgeRef.current, { opacity: 0, scale: 0.9, duration: 0.6, ease: "power3.out" }, 1.7)
        .to(scrollDotRef.current, { y: 52, yoyo: true, repeat: -1, duration: 1.2, ease: "power1.inOut" }, 1.8);

      gsap.to(headingWrapRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      splitOne?.revert();
      splitTwo?.revert();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-between relative px-8 md:px-16 pt-32 pb-16">
      <WireframeMesh className="pointer-events-none" />
      <div className="relative z-10">
        <div className="max-w-5xl" ref={headingWrapRef}>
        <p ref={labelRef} className="text-[11px] tracking-widest uppercase text-dust mb-10">
          Digital Studio, Est. 2024
        </p>
        <h1 className="font-display text-[52px] md:text-[96px] leading-[0.95] tracking-tight text-ink">
          <span ref={lineOneRef} className="block">We build</span>
          <span ref={lineTwoRef} className="block italic relative">
            what others can&apos;t.
            <svg className="absolute left-0 -bottom-2 w-[210px] md:w-[360px] h-3" viewBox="0 0 360 14" fill="none">
              <path ref={underlineRef} d="M3 8.5C72 3.4 235 3.3 356 7.8" stroke="#0a0a0a" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
        {/* Left column: description + stats */}
        <div className="md:col-span-2">
          <p ref={descriptionRef} className="max-w-xs text-[15px] leading-relaxed text-dim mb-12">
            Arca is a boutique studio of developers and designers. We build digital products that perform.
          </p>

          {/* Stats row */}
          <div ref={statsRowRef} className="flex gap-12">
            <div>
              <p className="font-display text-[36px] text-ink leading-tight">48</p>
              <p className="text-[11px] uppercase tracking-wider text-dust mt-2">Projects delivered</p>
            </div>
            <div>
              <p className="font-display text-[36px] text-ink leading-tight">100%</p>
              <p className="text-[11px] uppercase tracking-wider text-dust mt-2">Client retention</p>
            </div>
            <div>
              <p className="font-display text-[36px] text-ink leading-tight">4</p>
              <p className="text-[11px] uppercase tracking-wider text-dust mt-2">Years building</p>
            </div>
          </div>
        </div>

        {/* Right column: scroll indicator + availability badge */}
        <div className="relative flex flex-col items-start md:items-end gap-8">
          {/* Scroll indicator */}
          <div ref={scrollIndicatorRef} className="flex flex-col items-center gap-2" data-magnetic>
            <div className="relative w-px h-16 bg-stone">
              <span
                ref={scrollDotRef}
                className="absolute w-1.5 h-1.5 rounded-full bg-ink -left-[2px] top-0"
              />
            </div>
            <span className="text-[10px] tracking-widest text-dust uppercase" style={{ writingMode: "vertical-rl" }}>
              Scroll
            </span>
          </div>

          {/* Availability badge */}
          <div
            ref={availabilityBadgeRef}
            className="border border-stone rounded-full px-4 py-2 flex items-center gap-2"
            data-magnetic
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-dim tracking-wide">Available for projects</span>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
