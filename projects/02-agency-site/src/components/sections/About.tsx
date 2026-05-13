"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Divider } from "@/components/ui/Divider";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    let split: SplitText | null = null;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      split = new SplitText(textRef.current, { type: "lines" });
      gsap.from(split.lines, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.to(imageRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      });
    });

    return () => split?.revert();
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="py-40 px-8 md:px-16">
      <Divider className="mb-16" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-12">
        <div>
          <p
            ref={textRef}
            className="font-display text-3xl md:text-4xl leading-snug text-ink max-w-md"
          >
            We are a small studio that believes the best digital products come
            from obsessive attention to craft, in code, in design, and in the
            details no one notices until they are missing.
          </p>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden border border-stone">
            <div
              ref={imageRef}
              className="w-full aspect-[4/3] bg-mist relative"
              style={{ background: '#f5f5f5', borderColor: '#e5e5e5' }}
            >
              {[25, 50, 75].map(pct => (
                <div key={pct} className="absolute left-0 right-0" style={{ top: `${pct}%`, borderTop: '1px solid rgba(0,0,0,0.06)' }} />
              ))}
              {[33, 66].map(pct => (
                <div key={pct} className="absolute top-0 bottom-0" style={{ left: `${pct}%`, borderLeft: '1px solid rgba(0,0,0,0.06)' }} />
              ))}

              <span
                className="absolute font-display leading-none select-none pointer-events-none"
                style={{
                  fontSize: 'clamp(140px, 20vw, 260px)',
                  color: 'rgba(0,0,0,0.06)',
                  bottom: '-1rem',
                  right: '-0.5rem',
                }}
              >
                A
              </span>

              <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase" style={{ color: '#a3a3a3' }}>
                Arca Studio · Est. 2024
              </span>

              <span className="absolute bottom-4 right-4 text-[10px] tracking-wider" style={{ color: 'rgba(0,0,0,0.25)', fontFamily: 'var(--font-mono)' }}>
                26.9124° N, 75.7873° E
              </span>
            </div>
          </div>
          <div className="text-sm text-dim space-y-3">
            <p>Based in India. Working globally.</p>
            <a
              href="mailto:hello@arca.studio"
              data-magnetic
              className="inline-block text-ink underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              → hello@arca.studio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
