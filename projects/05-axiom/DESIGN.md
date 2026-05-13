# AXIOM STRATEGY — Design System

**Date:** 2026-05-11  
**Status:** Phase 1 (scaffold foundation) — extending for audit

---

## Color Palette (OKLCH)

**Strategy:** Committed + Restrained hybrid. One saturated accent (gold) carries ~15% of the surface. Warm tinted neutrals everywhere else.

### Named Roles

| Role | OKLCH | Hex | Usage |
|---|---|---|---|
| **bg** | oklch(98.1% 0.003 46) | #faf7f2 | Page background, default surface |
| **surface** | oklch(99.8% 0.001 46) | #ffffff | Cards, surfaces, form inputs |
| **gold** | oklch(60.5% 0.187 65) | #b8922a | Primary accent, CTAs, emphasis |
| **gold-light** | oklch(95.2% 0.048 95) | #f5e9cc | Tinted backgrounds, badges |
| **gold-dark** | oklch(42.8% 0.145 68) | #8a6d1e | Hover state for gold |
| **charcoal** | oklch(16.2% 0.006 300) | #1c1a17 | Primary text, headlines |
| **charcoal-2** | oklch(26.3% 0.008 300) | #3d3a35 | Secondary text, body copy |
| **muted** | oklch(50.5% 0.010 300) | #7a766e | Tertiary text, metadata |
| **border** | oklch(90.2% 0.006 100) | #e8e2d9 | Subtle borders, dividers |
| **border-strong** | oklch(84.6% 0.010 110) | #d4ccc0 | Stronger borders, focus rings |

**Dark sections (Solution, BookCall, Footer):**
- bg → #1c1a17 (charcoal)
- text → white/90% (high contrast)
- accents → gold (unchanged)
- subtle borders → white/10%

---

## Typography

**Display Font:** Fraunces (serif, variable, optical sizing)
- Weights: 300 (light), 400 (regular), 700 (bold)
- Styles: normal, italic
- Usage: H1, H2, H3, emphasis, taglines
- Load: `next/font/google`, weights 300/400/700, ital 1

**Body Font:** Inter (sans, system-ui fallback)
- Weights: 400, 500, 600
- Usage: body, UI, labels, small text
- Load: `next/font/google`

**Scale (body = 16px base):**
| Role | Size | Weight | Line Height | Char Limit |
|---|---|---|---|---|
| H1 (hero) | clamp(36px, 5.5vw, 72px) | 700 | 1.05 | 50ch |
| H2 (section) | clamp(32px, 4vw, 56px) | 700 | 1.1 | 60ch |
| H3 (subsection) | 24px | 600 | 1.2 | 65ch |
| Body (long-form) | 16px | 400 | 1.7 | 65ch |
| Body (UI) | 14px | 400 | 1.5 | — |
| Small | 12px | 500 | 1.4 | — |
| Micro | 11px | 500 | 1.3 | — |

---

## Components

### Button Variants

**Gold Fill (Primary):**
- bg: #b8922a, text: white
- hover: #8a6d1e
- padding: 16px 24px (lg), 12px 18px (md), 10px 14px (sm)
- border-radius: 8px
- font: Inter 500, 14–16px
- transition: bg 150ms ease-out

**Ghost (Secondary):**
- bg: transparent, text: #1c1a17
- border: 1px #e8e2d9
- hover: text #b8922a, border #b8922a
- padding: same as gold
- transition: all 150ms ease-out

**Outline (Tertiary):**
- bg: transparent, text: #b8922a
- border: 1px #b8922a
- hover: bg #f5e9cc
- transition: all 150ms ease-out

### Form Inputs

**Text Input / Select:**
- bg: #ffffff
- border: 1px #e8e2d9
- focus: border #b8922a, ring 2px #f5e9cc
- padding: 10px 12px
- font: Inter 14px
- border-radius: 6px
- label: Inter 11px, uppercase, tracking-wide, color #7a766e

**Input Error State:**
- border: 1px #dc2626
- ring: 2px rgba(220, 38, 38, 0.1)

### Cards

**Default Card:**
- bg: #ffffff
- border: 1px #e8e2d9
- border-radius: 16px
- padding: 32px
- No drop shadow (flat aesthetic)
- hover: border #d4ccc0 (optional subtle shift)

**Dark Card (on #1c1a17):**
- bg: white/5% = rgba(255,255,255,0.05)
- border: 1px white/10%
- border-radius: 12px
- text: white

### Badge Variants

**Gold Badge:**
- bg: #f5e9cc, text: #8a6d1e
- border: 1px #b8922a/20%
- padding: 6px 12px
- font: Inter 11px, semibold
- border-radius: 20px

**Muted Badge:**
- bg: #e8e2d9, text: #7a766e

---

## Elevation & Depth

- **Flat aesthetic** — no drop shadows, no depth hierarchy via shadow
- **Borders instead** — colored borders signal interactive states
- **Hover states via color shift** — text color, border color, background tint
- **Rarely: 1px border-top** to separate sections (never side-stripe borders)

---

## Spacing System

Base: 8px  
Scale: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96

**Padding standards:**
- Tight (UI): 8–12px
- Normal (card): 24–32px
- Generous (section): 48–64px

**Margin standards:**
- Between elements: 16–24px
- Between sections: 64–80px

**Vary for rhythm** — never uniform spacing throughout.

---

## Motion & Animation

**Principles:**
- Ease-out curves only (exponential: ease-out-quart / quint / expo)
- No bounce, no elastic, no spring physics
- Duration: 150ms (micro), 300–400ms (standard), 600ms (entrance)
- Entrance animations: 40–60ms stagger
- Scroll triggers: start "top 80%" for section reveals

**Animations on page:**
- Hero entrance timeline (badge → h1 → sub → ctas → trust)
- Pain point stagger on scroll
- Pillar cards fade + y offset on scroll
- Result numbers countUp on scroll
- Process timeline row stagger on scroll
- Testimonials fade + stagger on scroll
- Form success state transition (Framer AnimatePresence)

**Marquee (ProofTicker):**
- 25s linear loop
- Masked fade in/out at edges (8% left, 92% right)
- Constant motion = constant proof signal

---

## Mobile Considerations

**Breakpoints:**
- sm: 640px (phone)
- md: 768px (tablet)
- lg: 1024px (desktop)
- xl: 1280px (wide)

**Mobile-first responsive:**
- Single-column by default
- Expand to multi-column on md+
- Hero text: clamp handles 36px → 72px fluidly
- Form: full-width on mobile, narrower on desktop
- Cards: 1 col mobile, 2–3 col desktop
- Nav: sticky, no hamburger (simple gold link on right)

---

## Accessibility Targets

- **Color contrast:** WCAG AA minimum (4.5:1 for body text, 3:1 for UI)
- **Interactive elements:** 44×44px minimum touch target
- **Form labels:** always associated `<label>` elements
- **Images:** alt text on all photos
- **Skip link:** skip to main content (hidden until focused)
- **Focus rings:** visible 2px border or ring on all interactive elements
- **Keyboard navigation:** all CTAs keyboard-accessible

---

## Performance Budgets

- **Fonts:** Fraunces (2 files, ~60KB), Inter (1 file, ~45KB), served via next/font/google
- **Images:** Unsplash/Pexels (~200–400KB per full-width hero, lazy-loaded below fold)
- **CSS:** Tailwind v4, production build ~35KB (tree-shaken)
- **JS:** Next.js 16 + GSAP (~150KB gzipped)
- **Target Lighthouse:**
  - Performance: ≥90
  - Accessibility: ≥95
  - Best Practices: ≥90
  - SEO: ≥95

---

## Theme Tokens (Tailwind Config)

```ts
colors: {
  axiom: {
    bg:           '#faf7f2',
    surface:      '#ffffff',
    gold:         '#b8922a',
    'gold-light': '#f5e9cc',
    'gold-dark':  '#8a6d1e',
    charcoal:     '#1c1a17',
    'charcoal-2': '#3d3a35',
    muted:        '#7a766e',
    border:       '#e8e2d9',
    'border-strong': '#d4ccc0',
  },
},
fontFamily: {
  display: ['Fraunces', 'Georgia', 'serif'],
  sans:    ['Inter', 'system-ui', 'sans-serif'],
},
```

---

## Anti-Patterns to Reject

- ❌ Side-stripe borders (use full borders or nothing)
- ❌ Gradient text (use solid color + weight)
- ❌ Glassmorphism (no blur cards)
- ❌ Hero-metric template (big number + label cliché)
- ❌ Identical card grids (vary sizes, layouts)
- ❌ Modal-first UX (inline / progressive alternatives first)
- ❌ Em dashes (use commas, colons, semicolons, periods, parentheses)

---

## Craft Decisions

- **No em-dashes:** replaced with commas or periods throughout copy
- **Warm off-white bg:** not cool grey, not pure white
- **Serif display font:** Fraunces for premium feel, not Playfair (overused)
- **No drop shadows:** border-based separation instead
- **Gold 15% of surface:** accent-forward but not drenched
- **Single photo (Rohan):** credibility via person, not stock photos
- **Proof ticker constant motion:** scroll-driven proof signal
- **VSL hero copy:** emotional setup before solution (not feature-first)
- **Dark solution section:** visual break, trust via contrast
- **countUp animations:** result numbers animate on scroll (impact + delight)
