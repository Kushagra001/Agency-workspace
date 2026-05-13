"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger, SplitText);

function HeroCard() {
  const tasks = [
    { id: 1, done: true, label: "Research competitor pricing models", priority: "high" },
    { id: 2, done: false, label: "Write launch email draft for beta users", priority: "high" },
    { id: 3, done: false, label: "Schedule onboarding call with Stripe team", priority: "med" },
    { id: 4, done: false, label: "Review pull request: auth refactor", priority: "low" },
  ];

  const priorityColor: Record<string, string> = {
    high: "#ea580c",
    med: "#e67e22",
    low: "#6b6560",
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden bg-white"
      style={{ border: "1px solid rgba(26,22,18,0.1)" }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(26,22,18,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M4 16 C4 16, 8 4, 12 12 C16 20, 20 8, 20 8"
              stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2" fill="#ea580c" />
          </svg>
          <span className="text-xs font-medium" style={{ color: "#ea580c", letterSpacing: "0.01em" }}>
            Flōw: Today&apos;s tasks
          </span>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px]"
          style={{ border: "1px solid rgba(234,88,12,0.25)", background: "#fff4e6", color: "#ea580c" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#ea580c", animation: "ping-slow 1.8s ease-in-out infinite" }}
          />
          Processing 3 items…
        </span>
      </div>

      {/* Source chips */}
      <div
        className="flex items-center gap-2 px-5 py-2.5"
        style={{ borderBottom: "1px solid rgba(26,22,18,0.06)" }}
      >
        <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#6b6560" }}>
          Captured from
        </span>
        {["Voice note 09:14", "12 browser tabs", "Slack thread"].map((src) => (
          <span
            key={src}
            className="text-[10px] px-2 py-0.5 rounded-sm"
            style={{ background: "var(--color-brand-muted)", color: "#6b6560", border: "1px solid rgba(26,22,18,0.08)" }}
          >
            {src}
          </span>
        ))}
      </div>

      {/* Task list */}
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="task-row flex items-center gap-3 px-5 py-3.5"
            style={{ borderBottom: "1px solid rgba(26,22,18,0.05)" }}
          >
            <div
              className="w-4 h-4 rounded-sm flex items-center justify-center shrink-0"
              style={{
                background: task.done ? "var(--color-brand-primary)" : "transparent",
                border: task.done ? "1px solid var(--color-brand-primary)" : "1px solid rgba(26,22,18,0.2)",
              }}
            >
              {task.done && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className="flex-1 text-sm leading-snug"
              style={{
                textDecoration: task.done ? "line-through" : "none",
                color: task.done ? "#6b6560" : "#1a1612",
              }}
            >
              {task.label}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: priorityColor[task.priority] }}
            />
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-[11px]" style={{ color: "#6b6560" }}>4 tasks · 1 completed</span>
        <button className="text-[11px] font-medium transition-colors" style={{ color: "var(--color-brand-primary)" }}>
          Push to Linear →
        </button>
      </div>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardBgRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // 3-D cursor tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!rightColRef.current || !cardRef.current) return;
    const { left, top, width, height } = rightColRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 6;
    const y = ((e.clientY - top) / height - 0.5) * -6;
    gsap.to(cardRef.current, {
      rotateY: x, rotateX: y, duration: 0.6,
      ease: "power2.out", transformPerspective: 1000,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0, rotateX: 0, rotate: 1.5,
      duration: 0.6, ease: "power2.out",
    });
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(badgeRef.current, { opacity: 0, y: 12, duration: 0.5 })
          .from(line1Ref.current, { opacity: 0, y: 40, duration: 0.7 }, "-=0.2")
          .from(line2Ref.current, { opacity: 0, y: 40, duration: 0.7 }, "-=0.5")
          .from(subRef.current, { opacity: 0, y: 24, duration: 0.6 }, "-=0.4")
          .from(ctaRef.current, { opacity: 0, y: 16, duration: 0.5 }, "-=0.3")
          .from(cardBgRef.current, { opacity: 0, rotate: 8, scale: 0.90, duration: 1.0 }, "-=0.6")
          .from(cardRef.current, { opacity: 0, rotate: 6, scale: 0.93, duration: 1.2 }, "-=0.9");

        // Task rows stagger after hero timeline
        gsap.from(".task-row", {
          opacity: 0, x: -8, stagger: 0.12, duration: 0.4,
          ease: "power2.out", delay: 1.8,
        });

        // Parallax on scroll
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(cardRef.current, { y: self.progress * 60 });
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from(
          [badgeRef.current, line1Ref.current, line2Ref.current,
          subRef.current, ctaRef.current, cardRef.current],
          { opacity: 0, duration: 0.5, stagger: 0.1 }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ paddingTop: "120px", paddingBottom: "80px" }}
    >
      {/* Tinted glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute top-0 right-0 opacity-30"
          style={{
            width: "clamp(22rem, 60vw, 43.75rem)",
            height: "clamp(22rem, 60vw, 43.75rem)",
            background: "radial-gradient(ellipse 60% 60% at 80% -10%, var(--color-brand-muted) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* ── Asymmetric two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* LEFT: copy */}
          <div className="flex flex-col items-start gap-7">
            {/* Badge — minimal dot + text */}
            <div ref={badgeRef} className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-brand-primary)" }}
              />
              <span
                className="text-[11px] uppercase tracking-widest font-medium"
                style={{ color: "#6b6560" }}
              >
                Now in public beta · 2,400 teams
              </span>
            </div>

            {/* H1 — two lines, second italic + accent */}
            <h1
              className="tracking-[-0.02em] leading-[1.05]"
              style={{ fontSize: "var(--text-display)", fontWeight: 500, fontFamily: "var(--font-display)" }}
            >
              <span ref={line1Ref} className="block" style={{ fontStyle: "normal", color: "#1a1612" }}>
                Your second brain,
              </span>
              <span ref={line2Ref} className="block" style={{ fontStyle: "italic", color: "var(--color-brand-primary)" }}>
                actually works.
              </span>
            </h1>

            {/* Sub */}
            <p
              ref={subRef}
              className="leading-relaxed"
              style={{ fontSize: "var(--text-xl)", color: "#6b6560", fontWeight: 400, maxWidth: "460px" }}
            >
              Flōw captures everything: voice notes, browser tabs, and screenshots,
              then transforms raw chaos into a structured, prioritized task list.
              Without you lifting a finger.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="lg">
                  Start for free
                </Button>
                <Button variant="ghost" size="lg" className="group">
                  See how it works
                  <ArrowRight
                    size={15}
                    className="cta-arrow transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Button>
              </div>
              <p className="text-[12px] tracking-wide" style={{ color: "#6b6560", letterSpacing: "0.04em" }}>
                Free forever plan · Zero card required · Works where you do
              </p>
            </div>
          </div>

          {/* RIGHT: card stack */}
          <div
            ref={rightColRef}
            className="relative flex items-center justify-center"
            style={{ perspective: "1000px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Inner wrapper — sized to card contents */}
            <div className="relative w-full">
              {/* Depth layer — offset ghost card behind */}
              <div
                ref={cardBgRef}
                className="absolute rounded-lg"
                style={{
                  inset: 0,
                  background: "#ede8e2",
                  transform: "translate(10px, 10px) rotate(2.5deg)",
                  border: "1px solid rgba(26,22,18,0.07)",
                  zIndex: 0,
                }}
              />
              {/* Main card */}
              <div
                ref={cardRef}
                className="relative"
                style={{ transform: "rotate(1.5deg)", transformStyle: "preserve-3d", zIndex: 1 }}
              >
                <HeroCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
