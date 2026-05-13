"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Divider } from "@/components/ui/Divider";
import { useReveal } from "@agency/shared";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function Contact() {
  const sectionRef = useReveal<HTMLElement>({ y: 40, stagger: 0, duration: 0.9 });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLHRElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    let split: SplitText | null = null;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      split = new SplitText(headingRef.current, { type: "words" });
      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Animate divider drawing left-to-right
      gsap.from(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 90%",
        },
      });
    });

    return () => split?.revert();
  }, { scope: sectionRef });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-40 px-8 md:px-16 bg-mist flex flex-col justify-center"
    >
      <div ref={dividerRef} className="mb-16">
        <Divider />
      </div>

      <div className="max-w-3xl">
        <h2
          ref={headingRef}
          className="font-display text-5xl md:text-6xl leading-tight text-ink"
        >
          Ready to build something?
        </h2>

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-10">
          <a
            href="mailto:hello@arca.studio"
            data-magnetic
            className="font-display text-2xl text-ink underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            hello@arca.studio
          </a>

          <span className="hidden md:block h-10 w-px bg-stone" />

          <a
            href="https://calendly.com"
            target="_blank"
            rel="noreferrer"
            data-magnetic
            className="font-display text-2xl text-dim hover:text-ink transition-colors"
          >
            → Schedule 30 min
          </a>
        </div>

        <p className="mt-12 text-xs text-dust">
          Usually respond within 24 hours.
        </p>
      </div>
    </section>
  );
}
