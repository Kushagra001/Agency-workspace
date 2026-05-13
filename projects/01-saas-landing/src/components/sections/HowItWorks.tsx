"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG Icons ──────────────────────────────────────────── */
function MicrophoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 11.5v2.5m-3-2a4 4 0 008 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ScreenshotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="3" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6.5" cy="7" r="1" fill="currentColor" />
      <path d="M2 14v2a1.5 1.5 0 001.5 1.5h13a1.5 1.5 0 001.5-1.5v-2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function TabsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="3" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <line x1="2" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 4h6v3H4z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 2v-2H4a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6" cy="9" r="1" fill="currentColor" />
      <circle cx="10" cy="9" r="1" fill="currentColor" />
      <circle cx="14" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

/* ─── Panels ────────────────────────────────────────────── */

function CapturePanel() {
  const sources = [
    { Icon: MicrophoneIcon, label: "Voice note", time: "09:14", tag: "3 tasks found" },
    { Icon: ScreenshotIcon, label: "Screenshot", time: "2 min ago", tag: "1 task found" },
    { Icon: TabsIcon, label: "12 browser tabs", time: "just now", tag: "7 tasks found" },
    { Icon: ChatIcon, label: "Slack thread", time: "4 min ago", tag: "2 tasks found" },
  ];

  return (
    <div className="h-full flex flex-col gap-3 p-8">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full" style={{ background: "#c0392b", animation: "ping-slow 1.8s ease-in-out infinite" }} />
        <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: "#c0392b" }}>
          Listening…
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {sources.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col gap-2 p-4 rounded-lg"
            style={{
              background: "#fdf9f7",
              border: "1px solid rgba(26,22,18,0.08)",
              animation: `fadeIn 0.4s ease-out ${i * 0.1}s both`,
            }}
          >
            <div className="flex items-center justify-between">
              <div style={{ color: "#ea580c", lineHeight: 1 }}>
                <s.Icon />
              </div>
              <span className="text-[10px]" style={{ color: "#6b6560" }}>{s.time}</span>
            </div>
            <p className="text-[13px] font-medium" style={{ color: "#1a1612" }}>{s.label}</p>
            <span
              className="text-[10px] self-start px-2 py-0.5 rounded-full font-medium"
              style={{ background: "#eae3dd", color: "#ea580c" }}
            >
              {s.tag}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[12px] text-center" style={{ color: "#6b6560" }}>
        Drop anything: Flōw figures out the rest.
      </p>
    </div>
  );
}

function ProcessPanel() {
  const tasks = [
    { label: "Draft Q2 launch email", group: "Marketing", done: true },
    { label: "Review auth PR from Stripe integration", group: "Engineering", done: true },
    { label: "Schedule onboarding call", group: "Partnerships", done: false },
    { label: "Update pricing deck", group: "Marketing", done: false },
    { label: "Fix mobile nav regression", group: "Engineering", done: false },
  ];
  const groupColors: Record<string, { text: string; bg: string }> = {
    Marketing: { text: "#ea580c", bg: "#ea580c" },
    Engineering: { text: "#6b5959", bg: "#6b5959" },
    Partnerships: { text: "#a88b73", bg: "#a88b73" },
  };
  return (
    <div className="h-full flex flex-col gap-4 p-8">
      <div className="flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-[11px] font-medium"
        style={{ background: "#f5e8e1", color: "#ea580c", border: "1px solid rgba(234,88,12,0.2)" }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#ea580c", animation: "ping-slow 1.8s ease-in-out infinite" }} />
        AI processing 19 items…
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(26,22,18,0.07)" }}>
        <div className="h-full rounded-full" style={{ width: "62%", background: "#ea580c" }} />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {tasks.map((task, i) => (
          <div key={task.label} className="flex items-center gap-3 p-2.5 rounded-md"
            style={{
              background: task.done ? "rgba(26,22,18,0.02)" : "#fff",
              border: "1px solid rgba(26,22,18,0.07)",
              animation: `fadeIn 0.3s ease-out ${i * 0.1}s both`,
            }}>
            <div className="w-4 h-4 rounded-sm flex items-center justify-center shrink-0"
              style={{ background: task.done ? groupColors[task.group].bg : "transparent", border: task.done ? `1px solid ${groupColors[task.group].bg}` : "1px solid rgba(26,22,18,0.2)" }}>
              {task.done && (
                <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <span className="flex-1 text-[12px]"
              style={{ color: task.done ? "#9b9693" : "#1a1612", textDecoration: task.done ? "line-through" : "none" }}>
              {task.label}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-sm font-medium"
              style={{ background: `${groupColors[task.group].bg}15`, color: groupColors[task.group].text }}>
              {task.group}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActPanel() {
  const tasks = [
    { label: "Draft Q2 launch email", group: "Marketing", dueTag: "Today" },
    { label: "Review auth PR", group: "Engineering", dueTag: "Today" },
    { label: "Schedule onboarding call", group: "Partnerships", dueTag: "Tomorrow" },
    { label: "Update pricing deck", group: "Marketing", dueTag: "Fri" },
  ];
  const groupColors: Record<string, { text: string; bg: string }> = {
    Marketing: { text: "#ea580c", bg: "#ea580c" },
    Engineering: { text: "#6b5959", bg: "#6b5959" },
    Partnerships: { text: "#a88b73", bg: "#a88b73" },
  };
  return (
    <div className="h-full flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-[13px] font-medium" style={{ color: "#1a1612" }}>Today&apos;s list</p>
          <p className="text-[11px]" style={{ color: "#6b6560" }}>4 tasks · 2 high priority</p>
        </div>
        <span className="text-[11px] font-medium px-2.5 py-1 rounded-sm"
          style={{ background: "#eae3dd", color: "#ea580c" }}>
          → Push all to Linear
        </span>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {tasks.map((task, i) => (
          <div key={task.label} className="flex items-center gap-3 px-4 py-3 rounded-md"
            style={{
              background: "#fff", border: "1px solid rgba(26,22,18,0.08)",
              animation: `fadeIn 0.35s ease-out ${i * 0.1}s both`,
            }}>
            <div className="w-4 h-4 rounded-sm shrink-0" style={{ border: "1px solid rgba(26,22,18,0.2)" }} />
            <span className="flex-1 text-[13px]" style={{ color: "#1a1612" }}>{task.label}</span>
            <span className="text-[10px]" style={{ color: "#6b6560" }}>{task.dueTag}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-sm font-medium"
              style={{ background: `${groupColors[task.group].bg}15`, color: groupColors[task.group].text }}>
              {task.group}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01", title: "Capture",
    description: "Voice notes, screenshots, browser tabs, and Slack threads. Flōw ingests it all. No formatting required. No thinking required.",
    Panel: CapturePanel,
  },
  {
    number: "02", title: "Process",
    description: "Our model reads context, extracts every implied action item, groups by project, and assigns urgency in under a second.",
    Panel: ProcessPanel,
  },
  {
    number: "03", title: "Act",
    description: "A clean, prioritized task list lands in your dashboard. Push to Linear, Notion, or GitHub, or let Flōw schedule them for you.",
    Panel: ActPanel,
  },
];

/* ─── Main ───────────────────────────────────────────────── */
export function HowItWorks() {
  /* Render state — drives UI only */
  const [active, setActive] = useState(0);

  /* Hot ref — read inside GSAP callbacks without stale closure */
  const activeRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  const goTo = (i: number) => {
    activeRef.current = i;
    setActive(i);
  };

  /* ── Scroll-driven step progression ────────────────────── */
  useGSAP(
    () => {
      /* ⚠️  NO dependencies array here — this must run exactly once.
         We use activeRef (not activeStep state) in the callback so
         there is no stale closure and no need to re-register. */
      const stepTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=96",
        end: () => `+=${window.innerHeight * 2.2}`,
        scrub: true,
        snap: {
          snapTo: [0, 0.5, 1],
          duration: { min: 0.08, max: 0.18 },
          ease: "power1.out",
        },
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;
          const next = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
          if (next !== activeRef.current) goTo(next);
        },
      });

      /* Entrance fade only */
      gsap.from(sectionRef.current, {
        opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          once: true,
        },
      });

      return () => {
        stepTrigger.kill();
      };
    },
    { scope: sectionRef } // ← no dependencies, intentional
  );

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative px-6"
      style={{ paddingTop: "80px", paddingBottom: "120px", minHeight: "360svh" }}
    >
      <div className="sticky" style={{ top: "96px" }}>
        <div className="max-w-6xl mx-auto w-full">

        {/* Section label */}
        <p className="text-[11px] uppercase tracking-widest font-medium mb-6"
          style={{ color: "#ea580c" }}>
          How it works
        </p>

        {/* Tab row */}
        <div className="flex gap-0 mb-14" style={{ borderBottom: "1px solid rgba(26,22,18,0.08)" }}>
          {STEPS.map((step, i) => (
            <button
              key={step.number}
              onClick={() => goTo(i)}
              className="relative flex flex-col gap-1 py-4 pr-16 focus-visible:outline-none cursor-pointer"
              style={{ opacity: active === i ? 1 : 0.38, transition: "opacity 0.4s ease" }}
            >
              <span className="text-[11px] font-medium" style={{ color: active === i ? "#ea580c" : "#6b6560", letterSpacing: "0.06em" }}>
                {step.number}
              </span>
              <span
                style={{ fontSize: "var(--text-xl)", color: "#1a1612", letterSpacing: "-0.01em", fontFamily: "var(--font-display)" }}>
                {step.title}
              </span>

              {/* Animated underline */}
              {active === i && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute -bottom-px left-0 right-0 h-0.5"
                  style={{ background: "#ea580c" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Body: description left, panel right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`desc-${active}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 pt-2"
            >
              <p
                className="leading-[1.12]"
                style={{ fontSize: "var(--text-title)", fontWeight: 500, color: "#1a1612", letterSpacing: "-0.02em", fontFamily: "var(--font-display)" }}>
                From raw chaos<br />
                <span style={{ fontStyle: "italic", color: "#ea580c" }}>to action in seconds.</span>
              </p>

              <p className="text-[15px] leading-relaxed" style={{ color: "#6b6560", maxWidth: "380px" }}>
                {STEPS[active].description}
              </p>

              {/* Scroll progress indicator */}
              <div className="flex items-center gap-3 mt-2">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="rounded-full focus-visible:outline-none transition-all duration-500"
                    style={{
                      width: active === i ? "28px" : "6px",
                      height: "6px",
                      background: active === i ? "#ea580c" : "rgba(26,22,18,0.18)",
                    }}
                  />
                ))}
                <span className="text-[11px] ml-1" style={{ color: "#6b6560" }}>
                  scroll to continue
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`panel-${active}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl overflow-hidden"
              style={{
                background: "#fff",
                border: "1px solid rgba(26,22,18,0.09)",
                minHeight: "340px",
              }}
            >
              {(() => {
                const { Panel } = STEPS[active];
                return <Panel />;
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
        </div>
      </div>
    </section>
  );
}
