"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

gsap.registerPlugin();

interface Testimonial {
  initials: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

const TESTIMONIALS_A: Testimonial[] = [
  {
    initials: "AK",
    name: "Aditya Kumar",
    role: "Founder",
    company: "BuildFast",
    quote:
      "I used to lose 2 hours a day just triaging notes. Flōw got that down to under 10 minutes. It's changed how I start every morning.",
  },
  {
    initials: "SR",
    name: "Sofía Ramírez",
    role: "PM",
    company: "Arc Labs",
    quote:
      "I was skeptical, because I've been burned by AI productivity tools before. But Flōw's task extraction is actually accurate. It gets the priority right more often than I do.",
  },
  {
    initials: "JM",
    name: "James Mercer",
    role: "Indie Hacker",
    company: "side-project.dev",
    quote:
      "Switched from Notion + Todoist + Bear. Flōw replaced all three. My context switching dropped by at least half, and the UI is beautiful.",
  },
  {
    initials: "LN",
    name: "Leila Nasser",
    role: "CTO",
    company: "Volta Systems",
    quote:
      "Rolled it out to the whole team last month. The voice-to-task feature alone saves us a full standup per week. Genuinely impressive product.",
  },
];

const TESTIMONIALS_B: Testimonial[] = [
  {
    initials: "RP",
    name: "Ravi Patel",
    role: "Product Lead",
    company: "Meridian",
    quote:
      "I was skeptical, because I've been burned by AI productivity tools before. But Flōw's task extraction is actually accurate. It gets the priority right more often than I do.",
  },
  {
    initials: "EH",
    name: "Eva Hansen",
    role: "Solo Founder",
    company: "Fryd",
    quote:
      "The Linear integration is seamless. I capture ideas on my phone, and by the time I open my laptop they're already in the right project. Feels like magic.",
  },
  {
    initials: "TW",
    name: "Tom Whitmore",
    role: "Growth",
    company: "Palette HQ",
    quote:
      "Switched from Notion + Todoist + Bear. Flōw replaced all three. My context switching dropped by at least half, and the UI is beautiful.",
  },
  {
    initials: "ML",
    name: "Maya Lee",
    role: "Head of Product",
    company: "Draftbit",
    quote:
      "The Gmail integration is a revelation. I thought I was on top of my inbox. Flōw showed me I was missing 7 action items a day on average. Now I don't miss any.",
  },
];

const ROW_A = [...TESTIMONIALS_A, ...TESTIMONIALS_A];
const ROW_B = [...TESTIMONIALS_B, ...TESTIMONIALS_B];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="w-[340px] md:w-[400px] shrink-0 mx-4 flex flex-col gap-6 p-8 rounded-3xl bg-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-surface-border/20">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={10} className="text-brand-primary fill-brand-primary" />
        ))}
      </div>

      <p className="text-sm md:text-base leading-relaxed text-foreground/80 font-normal italic">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-6 border-t border-surface-border/30 mt-auto">
        <div className="w-9 h-9 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-[11px] font-bold text-brand-primary">
          {t.initials}
        </div>
        <div>
          <p className="text-xs font-bold text-foreground">{t.name}</p>
          <p className="text-[10px] uppercase tracking-wider text-surface-muted font-medium">
            {t.role} @ {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: Testimonial[];
  direction: "left" | "right";
  duration: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const trackWidth = track.scrollWidth;

      // Infinite loop with GSAP
      // Robust GSAP marquee logic
      const tl = gsap.timeline({ repeat: -1 });

      if (direction === "right") {
        gsap.set(track, { x: -(trackWidth / 2) });
        tl.to(track, {
          x: 0,
          duration,
          ease: "none",
        });
      } else {
        tl.to(track, {
          x: -(trackWidth / 2),
          duration,
          ease: "none",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="marquee-container overflow-hidden py-4 select-none"
    >
      <div ref={trackRef} className="flex w-max items-stretch">
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 overflow-hidden bg-white/50">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <Badge>Testimonials</Badge>
        <h2
          className="mt-6 font-(--font-display) font-semibold tracking-tight text-foreground"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Built for the <span className="text-brand-primary">obsessive.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        <MarqueeRow items={TESTIMONIALS_A} direction="left" duration={40} />
        <MarqueeRow items={TESTIMONIALS_B} direction="right" duration={45} />
      </div>
    </section>
  );
}
