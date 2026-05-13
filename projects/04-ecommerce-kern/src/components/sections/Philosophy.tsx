"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split quote words and animate them in
      const words = sectionRef.current?.querySelectorAll(".quote-word");
      if (words && words.length > 0) {
        gsap.from(words, {
          opacity: 0,
          y: 30,
          stagger: 0.04,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }

      gsap.from(".philosophy-meta", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const quoteText =
    '"We make things that get better with age. Clothes that fit into your life quietly, and stay there for decades."';

  const words = quoteText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="bg-kern-black py-40 px-8"
    >
      <div className="max-w-2xl mx-auto text-center">
        <p
          className="font-display font-light leading-relaxed text-kern-cream tracking-tight"
          style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
        >
          {words.map((word, i) => (
            <span key={i} className="quote-word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </p>
        <div className="philosophy-meta">
          <div className="mt-10 w-8 h-px bg-kern-cream-faint mx-auto" />
          <p className="mt-6 font-sans text-[11px] tracking-[0.2em] uppercase text-kern-cream-faint">
            Founded 2021 · Made in India · Shipped worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
