"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function StatsStrip() {
    const sectionRef = useRef<HTMLElement>(null);
    const teamCountRef = useRef<HTMLSpanElement>(null);
    const ratingRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // Animate team count
        if (teamCountRef.current) {
            const proxy = { val: 0 };
            gsap.to(proxy, {
                val: 2400,
                duration: 1.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: teamCountRef.current,
                    start: "top 85%",
                    once: true,
                },
                onUpdate() {
                    const v = Math.round(proxy.val).toLocaleString();
                    teamCountRef.current!.textContent = v;
                },
            });
        }

        // Animate rating
        if (ratingRef.current) {
            const proxy = { val: 0 };
            gsap.to(proxy, {
                val: 4.9,
                duration: 1.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ratingRef.current,
                    start: "top 85%",
                    once: true,
                },
                onUpdate() {
                    const v = proxy.val.toFixed(1);
                    ratingRef.current!.textContent = v;
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-label="Trusted by teams worldwide"
            style={{ background: "#1a1612" }}
        >
            <div className="max-w-4xl mx-auto px-6 py-24 space-y-12">
                {/* Main narrative */}
                <div className="space-y-6">
                    <p
                        className="text-[18px] leading-[1.6] font-light"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                        Over{" "}
                        <span
                            ref={teamCountRef}
                            className="text-[24px]"
                            style={{ color: "#ea580c", fontFamily: "var(--font-display)" }}
                        >
                            2,400
                        </span>{" "}
                        teams across 40+ countries use Flōw to cut through noise and stay focused. They process task lists 4× faster than manual methods and report a<br />
                        <span
                            ref={ratingRef}
                            className="text-[24px]"
                            style={{ color: "#ea580c", fontFamily: "var(--font-display)" }}
                        >
                            4.9
                        </span>
                        -star rating from over 1,200 reviews.
                    </p>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

                {/* Bottom context */}
                <p
                    className="text-[12px]"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                >
                    Updated May 2026 · Flōw helps startups, indie makers, and product teams operate without context-switching
                </p>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#ea580c" }} />
                    <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                        Live metrics from our dashboard
                    </span>
                </div>
            </div>
        </section>
    );
}
