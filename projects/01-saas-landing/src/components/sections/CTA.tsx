"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger, SplitText);

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});
type FormData = z.infer<typeof schema>;

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // GSAP: heading SplitText on scroll
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!headingRef.current) return;
        const split = new SplitText(headingRef.current, {
          type: "words",
          linesClass: "overflow-hidden",
        });
        gsap.from(split.words, {
          y: "110%",
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  // Shake animation for error
  const shakeInput = () => {
    if (!inputRef.current) return;
    gsap.fromTo(
      inputRef.current,
      { x: 0 },
      {
        duration: 0.45,
        ease: "power2.out",
        keyframes: { x: [0, -8, 8, -6, 6, -3, 3, 0] },
      }
    );
  };

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const url = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      if (url && url !== "https://hook.make.com/your-webhook-id-here") {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            source: "saas-landing-cta",
            timestamp: new Date().toISOString(),
          }),
        });
        if (!res.ok) throw new Error("Submission failed");
      }
      // In portfolio mode (no real webhook), simulate success
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Try again.");
      setStatus("error");
      shakeInput();
    }
  };

  // Show validation shake when form error fires
  const onInvalid = () => {
    shakeInput();
  };

  return (
    <section ref={sectionRef} id="cta" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Glow behind card */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in oklch, var(--color-brand-primary) 20%, transparent) 0%, transparent 70%)",
              filter: "blur(32px)",
              transform: "translateY(20px)",
            }}
            aria-hidden
          />

          <div className="relative rounded-2xl border border-surface-border bg-surface-raised p-10 md:p-14 flex flex-col items-center text-center gap-6">
            <h2
              ref={headingRef}
              className="tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontFamily: "var(--font-display)" }}
            >
              Your brain called.
              <br />
              It wants help.
            </h2>

            <p className="text-surface-muted text-sm max-w-sm">
              Join 2,400+ teams already using Flōw. Free forever plan available.
            </p>

            {/* Form / success */}
            <div className="w-full max-w-md mt-2">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-2 rounded-xl border border-surface-border bg-[rgba(234,88,12,0.06)] px-6 py-5"
                    aria-live="polite"
                  >
                    <div className="text-2xl">✓</div>
                    <p className="text-sm font-medium text-foreground">
                      You&apos;re on the list. Check your inbox.
                    </p>
                    <p className="text-xs text-surface-muted">
                      Early access details land there first.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit(onSubmit, onInvalid)}
                    className="flex flex-col sm:flex-row gap-2.5"
                  >
                    <div className="flex-1">
                      <label htmlFor="cta-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        {...register("email")}
                        ref={(el) => {
                          register("email").ref(el);
                          (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
                        }}
                        id="cta-email"
                        type="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email || status === "error")}
                        aria-describedby="cta-email-help cta-email-error"
                        className="w-full px-4 py-3 text-sm rounded-lg bg-surface-overlay border border-surface-border text-foreground placeholder:text-surface-muted outline-none transition-all duration-200 focus:border-brand-primary/60 focus:[box-shadow:0_0_0_3px_color-mix(in_oklch,var(--color-brand-primary)_18%,transparent)]"
                      />
                      <p id="cta-email-help" className="sr-only">
                        Enter email address to join waitlist.
                      </p>
                      {(errors.email || status === "error") && (
                        <p id="cta-email-error" className="text-xs text-red-400 mt-1.5 text-left" aria-live="polite">
                          {errors.email?.message || errorMsg}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={status === "loading"}
                      className="shrink-0"
                    >
                      {status === "loading" ? "Joining…" : "Get early access"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
