"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Card visuals ─────────────────────────────────────── */

function WaveformVisual() {
  const bars = [0.3, 0.6, 1, 0.75, 0.5, 0.9, 0.4, 0.85, 0.6];
  return (
    <div className="w-full h-full flex flex-col justify-between p-6">
      {/* Icon top-left */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
          stroke="var(--color-brand-primary)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"
          stroke="var(--color-brand-primary)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Waveform center */}
      <div className="flex items-end justify-center gap-1.5" style={{ height: "80px" }}>
        {bars.map((h, i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{
              width: "8px",
              height: `${h * 100}%`,
              background: "rgba(234,88,12,0.6)",
              animation: `wave-bar ${0.8 + i * 0.1}s ease-in-out infinite`,
              animationDelay: `${i * 0.09}s`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>

      {/* Text pushed to bottom */}
      <div className="mt-auto">
        <p className="font-medium text-[15px] text-[#1a1612]" style={{ letterSpacing: "-0.01em" }}>
          Voice to priority
        </p>
        <p className="text-[13px] mt-1 leading-relaxed" style={{ color: "#6b6560" }}>
          Speak your mind: Flōw extracts tasks while you&apos;re still talking.
        </p>
      </div>
    </div>
  );
}

function TabsVisual() {
  const tabs = [
    { dot: "#4a90d9", url: "analysis.notion.so" },
    { dot: "#635bff", url: "stripe.com/api/keys" },
    { dot: "#24292e", url: "github.com/vercel/next.js" },
  ];
  return (
    <div className="w-full h-full flex flex-col p-6">
      {/* Icon + heading top */}
      <div className="flex items-center gap-2 mb-auto">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3" width="20" height="18" rx="2" stroke="var(--color-brand-primary)" strokeWidth="1.5" />
          <path d="M2 8h20" stroke="var(--color-brand-primary)" strokeWidth="1.5" />
          <circle cx="6" cy="5.5" r="1" fill="var(--color-brand-primary)" />
          <circle cx="9" cy="5.5" r="1" fill="var(--color-brand-primary)" />
        </svg>
        <p className="font-medium text-[15px] text-[#1a1612]" style={{ letterSpacing: "-0.01em" }}>
          Tab intelligence
        </p>
      </div>

      {/* Tab chips stacking from bottom */}
      <div className="flex flex-col gap-2 mt-6">
        {tabs.map((tab, i) => (
          <div
            key={tab.url}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white text-[12px]"
            style={{
              border: "1px solid rgba(26,22,18,0.1)",
              animation: `fadeIn 0.4s ease-out ${0.2 + i * 0.3}s both`,
              color: "#6b6560",
            }}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: tab.dot }} />
            <span className="truncate">{tab.url}</span>
          </div>
        ))}
      </div>

      <p className="text-[13px] mt-4 leading-relaxed" style={{ color: "#6b6560" }}>
        40 tabs researching? Flōw finds what matters.
      </p>
    </div>
  );
}

function InboxVisual() {
  return (
    <div className="w-full h-full flex p-6 gap-6 items-center">
      {/* Left: text */}
      <div className="flex-1 min-w-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mb-4">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            stroke="var(--color-brand-primary)" strokeWidth="1.5" />
          <polyline points="22,6 12,13 2,6" stroke="var(--color-brand-primary)" strokeWidth="1.5" />
        </svg>
        <p className="font-medium text-[15px] text-[#1a1612] mb-1" style={{ letterSpacing: "-0.01em" }}>
          Zero inbox
        </p>
        <p className="text-[13px] leading-relaxed" style={{ color: "#6b6560" }}>
          Flōw scans Gmail & Slack for action items.
        </p>
      </div>

      {/* Right: big animated check */}
      <div className="shrink-0 flex flex-col items-center gap-2">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "var(--color-brand-muted)" }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M8 18.5L14 24.5L28 10"
              stroke="var(--color-brand-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="40"
              style={{ animation: "stroke-draw 0.8s ease-out 0.3s both" }}
            />
          </svg>
        </div>
        <span
          className="text-[10px] uppercase tracking-widest font-medium"
          style={{ color: "var(--color-brand-primary)" }}
        >
          Zero effort
        </span>
      </div>
    </div>
  );
}

function SyncVisual() {
  const integrations = [
    { name: "Linear", color: "#5e6ad2" },
    { name: "Notion", color: "#000" },
    { name: "GitHub", color: "#24292e" },
  ];
  return (
    <div className="w-full h-full flex flex-col p-6">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mb-4">
        <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"
          stroke="var(--color-brand-primary)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="font-medium text-[15px] text-[#1a1612] mb-1" style={{ letterSpacing: "-0.01em" }}>
        Sync everywhere
      </p>

      <div className="flex flex-col gap-3 mt-4">
        {integrations.map((item, i) => (
          <div key={item.name} className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: item.color }}
            />
            <div
              className="flex-1 h-px"
              style={{
                background: item.color,
                opacity: 0.25,
                animation: `fadeIn 0.5s ease-out ${i * 0.2}s both`,
              }}
            />
            <span
              className="text-[12px] font-medium px-2 py-0.5 rounded-sm"
              style={{ background: "#f7f3ee", color: "#6b6560", border: "1px solid rgba(26,22,18,0.08)" }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[13px] mt-auto leading-relaxed" style={{ color: "#6b6560" }}>
        Routes tasks to the right project automatically.
      </p>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────── */
export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!bentoRef.current) return;

        const card1 = bentoRef.current.querySelector<HTMLElement>(".card-voice");
        const card2 = bentoRef.current.querySelector<HTMLElement>(".card-tabs");
        const card3 = bentoRef.current.querySelector<HTMLElement>(".card-inbox");
        const card4 = bentoRef.current.querySelector<HTMLElement>(".card-sync");

        // Tall cards rise, wide cards slide from their side
        if (card1 && card4) {
          gsap.from([card1, card4], {
            y: 80, opacity: 0, duration: 1.0,
            scrollTrigger: { trigger: bentoRef.current, start: "top 80%" },
          });
        }
        if (card2) {
          gsap.from(card2, {
            x: 40, opacity: 0, duration: 0.9, delay: 0.1,
            scrollTrigger: { trigger: bentoRef.current, start: "top 80%" },
          });
        }
        if (card3) {
          gsap.from(card3, {
            x: -40, opacity: 0, duration: 0.9, delay: 0.15,
            scrollTrigger: { trigger: bentoRef.current, start: "top 80%" },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  const cardBase = "rounded-lg bg-white overflow-hidden transition-all duration-300";
  const cardBorder = "border border-[rgba(26,22,18,0.08)] hover:border-[rgba(26,22,18,0.16)]";

  return (
    <section ref={sectionRef} id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header — two-column journalistic layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-end">
          <div>
            <span
              className="inline-block text-[11px] uppercase tracking-widest font-medium mb-5"
              style={{ color: "var(--color-brand-primary)" }}
            >
              Intelligence
            </span>
            <h2
              className="tracking-[-0.02em] leading-[1.08]"
              style={{ fontSize: "var(--text-title)", fontWeight: 500, color: "#1a1612", fontFamily: "var(--font-display)" }}
            >
              Your context,<br />
              <span style={{ fontStyle: "italic", color: "var(--color-brand-primary)" }}>distilled.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 justify-end">
            <p style={{ color: "#6b6560", fontSize: "var(--text-base)", lineHeight: 1.7 }}>
              Flōw doesn&apos;t just capture, it understands. Every piece of input is
              analysed for context, intent, and urgency before it reaches your dashboard.
            </p>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors"
              style={{ color: "var(--color-brand-primary)" }}
            >
              See how it works →
            </a>
          </div>
        </div>

        {/* Bento grid */}
        <div ref={bentoRef} className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] lg:grid-rows-2 gap-3">
          {/* Card 1 — voice (tall left, row 1) */}
          <div
            className={`card-voice ${cardBase} ${cardBorder} lg:col-start-1 lg:row-start-1`}
            style={{ minHeight: "340px" }}
          >
            <WaveformVisual />
          </div>

          {/* Card 2 — tabs (wide right, row 1) */}
          <div
            className={`card-tabs ${cardBase} ${cardBorder} lg:col-start-2 lg:row-start-1`}
            style={{ minHeight: "260px" }}
          >
            <TabsVisual />
          </div>

          {/* Card 3 — inbox (wide left, row 2) */}
          <div
            className={`card-inbox ${cardBase} ${cardBorder} lg:col-start-1 lg:row-start-2`}
            style={{ minHeight: "260px" }}
          >
            <InboxVisual />
          </div>

          {/* Card 4 — sync (tall right, row 2) */}
          <div
            className={`card-sync ${cardBase} ${cardBorder} lg:col-start-2 lg:row-start-2`}
            style={{ minHeight: "340px" }}
          >
            <SyncVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
