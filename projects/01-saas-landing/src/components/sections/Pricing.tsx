"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Plan {
  name: string;
  price: { monthly: string; annual: string };
  note?: { monthly?: string; annual?: string };
  features: string[];
  cta: string;
  ctaVariant: "primary" | "ghost";
  tier: "free" | "pro" | "team";
  badge?: string;
}

const PLANS: Plan[] = [
  {
    name: "Free",
    price: { monthly: "$0", annual: "$0" },
    features: ["100 captures per month", "1 workspace", "Basic AI extraction", "7-day history"],
    cta: "Get started free",
    ctaVariant: "ghost",
    tier: "free",
  },
  {
    name: "Pro",
    price: { monthly: "$12", annual: "$9.60" },
    note: { annual: "billed annually" },
    features: ["Unlimited captures", "5 workspaces", "Full AI suite", "Unlimited history", "Priority support", "Notion, Linear, GitHub"],
    cta: "Start free trial",
    ctaVariant: "primary",
    tier: "pro",
    badge: "Most popular",
  },
  {
    name: "Team",
    price: { monthly: "$29", annual: "$23" },
    note: { monthly: "per user / month", annual: "per user / month" },
    features: ["Everything in Pro", "Admin controls", "SSO", "Audit logs", "99.9% SLA"],
    cta: "Contact sales",
    ctaVariant: "ghost",
    tier: "team",
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardsRef.current) return;
      const cards = Array.from(cardsRef.current.children) as HTMLElement[];

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: { each: 0.1, from: "center" },
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="pricing" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-14">
          <span
            className="text-[11px] uppercase tracking-widest font-medium"
            style={{ color: "#ea580c" }}
          >
            Pricing
          </span>
          <h2
            className="tracking-[-0.02em]"
            style={{ fontSize: "var(--text-title)", fontWeight: 500, color: "#1a1612", fontFamily: "var(--font-display)" }}
          >
            Simple pricing.<br />No surprises.
          </h2>

          {/* Toggle */}
          <div className="flex items-center gap-4 mt-2">
            <span
              className="text-[14px] transition-colors"
              style={{ color: !annual ? "#1a1612" : "#6b6560", fontWeight: !annual ? 500 : 400 }}
            >
              Monthly
            </span>

            <button
              onClick={() => setAnnual(!annual)}
              role="switch"
              aria-checked={annual}
              aria-label="Annual billing"
              className="relative w-12 h-6 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: annual ? "#ea580c" : "rgba(26,22,18,0.1)",
                border: "none",
              }}
            >
              <div
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300"
                style={{ transform: annual ? "translateX(24px)" : "translateX(0)" }}
              />
            </button>

            <div className="flex items-center gap-2">
              <span
                className="text-[14px] transition-colors"
                style={{ color: annual ? "#1a1612" : "#6b6560", fontWeight: annual ? 500 : 400 }}
              >
                Annual
              </span>
              <span
                className="text-[11px] font-medium px-2 py-0.5 rounded-full transition-all duration-300 origin-left"
                style={{
                  background: "#fff4e6",
                  color: "#ea580c",
                  border: "1px solid rgba(234,88,12,0.2)",
                  transform: annual ? "scale(1)" : "scale(0)",
                  opacity: annual ? 1 : 0,
                }}
              >
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Plan cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {PLANS.map((plan) => {
            const isFree = plan.tier === "free";
            const isPro = plan.tier === "pro";
            const isTeam = plan.tier === "team";

            return (
              <div
                key={plan.name}
                data-plan=""
                className="relative flex flex-col p-8 rounded-lg transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: isFree
                    ? "#ffffff"
                    : isPro
                      ? "#ea580c"
                      : "#1a1612",
                  border: isFree
                    ? "1px solid rgba(26,22,18,0.1)"
                    : isPro
                      ? "none"
                      : "none",
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <p
                  className="text-[11px] font-medium uppercase tracking-[0.08em] mb-4"
                  style={{ color: isFree ? "#6b6560" : "rgba(255,255,255,0.65)" }}
                >
                  {plan.name}
                </p>

                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className="text-4xl tracking-[-0.02em]"
                    style={{ color: isFree ? "#1a1612" : "#fff", fontFamily: "var(--font-display)" }}
                  >
                    {annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-[13px]" style={{ color: isFree ? "#6b6560" : "rgba(255,255,255,0.6)" }}>
                    /mo
                  </span>
                </div>

                {plan.note && (
                  <p className="text-[11px] mb-6" style={{ color: isFree ? "#6b6560" : "rgba(255,255,255,0.5)" }}>
                    {annual ? plan.note.annual : plan.note.monthly}
                  </p>
                )}

                {!plan.note && <div className="mb-6" />}

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        size={13}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: isFree ? "var(--color-brand-primary)" : "rgba(255,255,255,0.8)" }}
                      />
                      <span
                        className="text-[13px]"
                        style={{ color: isFree ? "#6b6560" : "rgba(255,255,255,0.8)" }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {isFree && (
                  <button
                    className="w-full py-2.5 rounded-md text-[14px] font-medium transition-colors"
                    style={{ background: "transparent", color: "#1a1612", border: "1px solid rgba(26,22,18,0.2)" }}
                  >
                    {plan.cta}
                  </button>
                )}
                {isPro && (
                  <button
                    className="w-full py-2.5 rounded-md text-[14px] font-medium transition-all"
                    style={{ background: "rgba(255,255,255,0.18)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.28)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
                  >
                    {plan.cta}
                  </button>
                )}
                {isTeam && (
                  <button
                    className="w-full py-2.5 rounded-md text-[14px] font-medium transition-colors"
                    style={{ background: "rgba(255,255,255,0.07)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
