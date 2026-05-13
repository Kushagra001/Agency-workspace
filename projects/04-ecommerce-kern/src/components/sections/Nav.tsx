"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const scrollDotRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<"search" | "cart" | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [badgePulse, setBadgePulse] = useState(false);

  useEffect(() => {
    // Listen for cart additions
    const handleCartAdd = () => {
      setCartCount((prev) => prev + 1);
      setBadgePulse(true);
      window.setTimeout(() => setBadgePulse(false), 220);
    };
    window.addEventListener("cart-add", handleCartAdd);

    // Scroll-triggered background change
    ScrollTrigger.create({
      start: "top+=60",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.6,
        ease: "power3.out",
      });
    });

    return () => {
      ctx.revert();
      window.removeEventListener("cart-add", handleCartAdd);
    };
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-10 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(15,13,10,0.90)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(245,240,232,0.08)"
            : "1px solid transparent",
        }}
      >
        {/* Left: Wordmark */}
        <div className="flex-1">
          <Link
            href="/"
            className="font-sans font-normal text-sm tracking-[0.2em] text-kern-cream"
            style={!scrolled ? { letterSpacing: "0.2em", textShadow: "0 1px 6px rgba(0,0,0,0.9)" } : { letterSpacing: "0.2em" }}
          >
            KERN
          </Link>
        </div>

        {/* Center: Nav links (desktop only) */}
        <nav className="hidden md:flex items-center gap-8">
          {["Shop", "Collections", "About", "Stockists"].map((item) => (
            <Link
              key={item}
              href={item === "Shop" ? "/shop" : `/${item.toLowerCase()}`}
              className="font-sans font-normal text-[11px] tracking-widest uppercase text-kern-cream-faint hover:text-kern-cream transition-colors duration-200"
              style={!scrolled ? { textShadow: "0 1px 4px rgba(0,0,0,0.8)" } : undefined}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right: Icons */}
        <div className="flex-1 flex items-center justify-end gap-5">
          <button
            type="button"
            aria-label="Search"
            aria-expanded={activePanel === "search"}
            aria-controls="nav-search-panel"
            onClick={() => setActivePanel((current) => (current === "search" ? null : "search"))}
            className="text-kern-cream-faint hover:text-kern-cream transition-colors duration-200"
            style={!scrolled ? { filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.9))" } : undefined}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="5" />
              <path d="m11 11 3 3" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Open cart"
            aria-expanded={activePanel === "cart"}
            aria-controls="nav-cart-panel"
            onClick={() => setActivePanel((current) => (current === "cart" ? null : "cart"))}
            className="font-sans font-normal text-[11px] tracking-widest uppercase text-kern-cream-faint hover:text-kern-cream transition-colors duration-200"
            style={!scrolled ? { textShadow: "0 1px 4px rgba(0,0,0,0.8)" } : undefined}
          >
            <span className="inline-flex items-center gap-2">
              <span>Cart</span>
              <span
                className={`min-w-5 rounded-full border border-kern-border px-1.5 py-0.5 text-[9px] leading-none text-kern-cream transition-transform duration-200 ${
                  badgePulse ? "scale-110" : "scale-100"
                }`}
              >
                {cartCount}
              </span>
            </span>
          </button>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-kern-cream-faint hover:text-kern-cream transition-colors"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            style={!scrolled ? { filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.9))" } : undefined}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="0" y1="1" x2="20" y2="1" />
              <line x1="0" y1="7" x2="20" y2="7" />
              <line x1="0" y1="13" x2="20" y2="13" />
            </svg>
          </button>
        </div>
      </header>

      {activePanel && (
        <div className="fixed top-16 right-6 md:right-10 z-[55] w-[min(90vw,22rem)] border border-kern-border bg-kern-black-2 px-5 py-4 shadow-[0_16px_60px_rgba(0,0,0,0.35)]">
          {activePanel === "search" ? (
            <div id="nav-search-panel" className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-kern-cream-faint">Search</p>
                  <p className="mt-2 font-sans text-sm text-kern-cream-dim leading-relaxed">
                    Search is not wired yet. Browse the collection or jump to a section.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePanel(null)}
                  className="font-sans text-[10px] tracking-widest uppercase text-kern-cream-faint hover:text-kern-cream transition-colors"
                >
                  Close
                </button>
              </div>
              <div className="grid gap-2">
                <Link href="/shop" className="font-sans text-xs tracking-widest uppercase text-kern-cream hover:text-kern-cream-dim transition-colors">
                  Shop
                </Link>
                <Link href="/collections" className="font-sans text-xs tracking-widest uppercase text-kern-cream hover:text-kern-cream-dim transition-colors">
                  Collections
                </Link>
                <Link href="/about" className="font-sans text-xs tracking-widest uppercase text-kern-cream hover:text-kern-cream-dim transition-colors">
                  About
                </Link>
                <Link href="/stockists" className="font-sans text-xs tracking-widest uppercase text-kern-cream hover:text-kern-cream-dim transition-colors">
                  Stockists
                </Link>
              </div>
            </div>
          ) : (
            <div id="nav-cart-panel" className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-kern-cream-faint">Cart</p>
                  {cartCount > 0 ? (
                    <p className="mt-2 font-sans text-sm text-kern-cream-dim leading-relaxed">
                      {cartCount} item{cartCount === 1 ? "" : "s"} in local cart state.
                    </p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      <p className="font-display text-2xl font-light text-kern-cream leading-tight">
                        Your cart awaits its first piece.
                      </p>
                      <p className="font-sans text-sm text-kern-cream-dim leading-relaxed">
                        Browse the collection, then return here when you are ready.
                      </p>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActivePanel(null)}
                  className="font-sans text-[10px] tracking-widest uppercase text-kern-cream-faint hover:text-kern-cream transition-colors"
                >
                  Close
                </button>
              </div>
              <p className="font-sans text-xs text-kern-cream-faint leading-relaxed">
                Checkout stays with Shopify. Add products from product pages, then wire cart persistence next.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center border border-kern-border px-4 py-2 font-sans text-[10px] tracking-widest uppercase text-kern-cream hover:border-kern-cream/40 transition-colors"
              >
                Continue shopping
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-kern-black/80 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-kern-black-2 border-l border-kern-border flex flex-col p-8">
            <button
              onClick={() => setDrawerOpen(false)}
              className="self-end text-kern-cream-faint hover:text-kern-cream mb-12"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="1" y1="1" x2="19" y2="19" />
                <line x1="19" y1="1" x2="1" y2="19" />
              </svg>
            </button>
            <nav className="flex flex-col gap-6">
              {["Shop", "Collections", "About", "Stockists"].map((item) => (
                <Link
                  key={item}
                  href={item === "Shop" ? "/shop" : `/${item.toLowerCase()}`}
                  className="font-display text-2xl font-light text-kern-cream hover:text-kern-cream-dim transition-colors"
                  onClick={() => setDrawerOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
