"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "@agency/shared";
import { Tag } from "@/components/ui/Tag";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    duration: "1 week",
    body: "We learn your business, your users, and your goals before writing a single line of code.",
  },
  {
    number: "02",
    title: "Design in code",
    duration: "1-2 weeks",
    body: "We prototype directly in the browser for faster feedback and fewer surprises.",
  },
  {
    number: "03",
    title: "Build & integrate",
    duration: "2-4 weeks",
    body: "Development, CMS setup, automation wiring, and testing. Everything delivered, documented, and yours.",
  },
  {
    number: "04",
    title: "Launch & support",
    duration: "ongoing",
    body: "We do not disappear after launch. We monitor, optimize, and stay one message away.",
  },
];

export function Process() {
  const sectionRef = useReveal<HTMLElement>({ y: 40, stagger: 0, duration: 0.9 });
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gridRef.current?.querySelectorAll("article");
    if (!cards || cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Row 1 cards (Discovery, Design in code)
      gsap.from([cards[0], cards[1]], {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Row 2 cards (Build & integrate, Launch & support)
      gsap.from([cards[2], cards[3]], {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="process" className="py-32 px-8 md:px-16 bg-mist">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-12">
          How we work
        </h2>

        {/* 12-column asymmetric grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-12 gap-3"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
          }}
        >
          {/* Row 1: Discovery (5 cols, narrower) */}
          <article
            className="col-span-12 md:col-span-5 border border-stone/70 bg-paper p-6 md:p-8 flex flex-col"
          >
            <p className="font-display text-8xl text-stone/40 leading-none select-none pointer-events-none">
              {STEPS[0].number}
            </p>
            <h3 className="mt-4 font-display text-2xl text-ink">{STEPS[0].title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim flex-1">{STEPS[0].body}</p>
            <div className="mt-6 pt-4 border-t border-stone">
              <Tag>{STEPS[0].duration}</Tag>
            </div>
          </article>

          {/* Row 1: Design in code (7 cols, wider) */}
          <article
            className="col-span-12 md:col-span-7 border border-stone/70 bg-paper p-6 md:p-8 flex flex-col"
          >
            <p className="font-display text-8xl text-stone/40 leading-none select-none pointer-events-none">
              {STEPS[1].number}
            </p>
            <h3 className="mt-4 font-display text-2xl text-ink">{STEPS[1].title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim flex-1">{STEPS[1].body}</p>
            <div className="mt-6 pt-4 border-t border-stone">
              <Tag>{STEPS[1].duration}</Tag>
            </div>
          </article>

          {/* Row 2: Build & integrate (7 cols, wider) */}
          <article
            className="col-span-12 md:col-span-7 border border-stone/70 bg-paper p-6 md:p-8 flex flex-col"
          >
            <p className="font-display text-8xl text-stone/40 leading-none select-none pointer-events-none">
              {STEPS[2].number}
            </p>
            <h3 className="mt-4 font-display text-2xl text-ink">{STEPS[2].title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim flex-1">{STEPS[2].body}</p>
            <div className="mt-6 pt-4 border-t border-stone">
              <Tag>{STEPS[2].duration}</Tag>
            </div>
          </article>

          {/* Row 2: Launch & support (5 cols, narrower) */}
          <article
            className="col-span-12 md:col-span-5 border border-stone/70 bg-paper p-6 md:p-8 flex flex-col"
          >
            <p className="font-display text-8xl text-stone/40 leading-none select-none pointer-events-none">
              {STEPS[3].number}
            </p>
            <h3 className="mt-4 font-display text-2xl text-ink">{STEPS[3].title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim flex-1">{STEPS[3].body}</p>
            <div className="mt-6 pt-4 border-t border-stone">
              <Tag>{STEPS[3].duration}</Tag>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
