---
name: Flōw
description: Think less. Build more.
colors:
  brand-primary: "#ea580c"
  brand-hover: "#f97316"
  brand-muted: "#fff4e6"
  surface-base: "#f7f3ee"
  surface-raised: "#ffffff"
  surface-overlay: "#f0ebe4"
  surface-border: "#1a161214"
  text-primary: "#1a1612"
  text-muted: "#6b6560"
  success-tint: "#ea580c0f"
  nav-glass: "#f7f3eee0"
typography:
  display:
    fontFamily: "var(--font-display), system-ui, sans-serif"
    fontSize: "clamp(52px, 7vw, 88px)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "var(--font-display), system-ui, sans-serif"
    fontSize: "clamp(36px, 4.5vw, 56px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-display), system-ui, sans-serif"
    fontSize: "clamp(20px, 2.5vw, 28px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "var(--font-sans), system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
  label:
    fontFamily: "var(--font-sans), system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "128px"
components:
  button-primary:
    backgroundColor: "{colors.brand-primary}"
    textColor: "{colors.surface-raised}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.brand-hover}"
    textColor: "{colors.surface-raised}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    typography: "{typography.body}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    typography: "{typography.body}"
  badge-accent:
    backgroundColor: "{colors.success-tint}"
    textColor: "{colors.brand-primary}"
    rounded: "999px"
    padding: "4px 12px"
    typography: "{typography.label}"
  input-email:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    typography: "{typography.body}"
  card-raised:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "40px"
---

# Design System: Flōw

## Overview

**Creative North Star: "Sunlit Control Room"**

Flōw feels like focused clarity in a warm studio, not a cold software dashboard. The system is airy, editorial in pacing, and precise in interaction feedback. Visual density stays low, but hierarchy is assertive through scale and contrast.

This system rejects dark mode clones, purple gradient AI motifs, and generic bordered card grids. The voice is optimistic and intentional, with one strong vermilion accent carrying brand identity while warm neutrals do the structural work.

**Key Characteristics:**
- Warm cream surfaces with charcoal text
- Committed vermilion accent used for action and status
- Tight typographic hierarchy with large display cuts
- Motion that confirms interaction, never decorates aimlessly
- Section rhythm driven by whitespace and rule lines

## Colors

The palette is committed: one warm vermilion accent on top of creamy neutrals.

### Primary
- **Vermilion Signal** (`#ea580c`): Primary CTAs, active indicators, key metrics, and directional emphasis.
- **Vermilion Lift** (`#f97316`): Hover lift for primary action states.

### Secondary
- **Warm Tint Field** (`#fff4e6`): Subtle accent backgrounds for tags, savings badges, and supporting highlights.

### Neutral
- **Studio Cream** (`#f7f3ee`): Default page background.
- **Raised Paper** (`#ffffff`): Elevated surfaces such as pricing cards and CTA panel.
- **Muted Canvas** (`#f0ebe4`): Input fields and soft interactive surfaces.
- **Rule Line** (`#1a161214`): Dividers and low-emphasis borders.
- **Charcoal Ink** (`#1a1612`): Primary text.
- **Muted Ink** (`#6b6560`): Secondary text and supporting labels.

**The One Voice Rule.** Vermilion is reserved for intent: action, progress, active state, or meaningful status. It is not used as decorative filler.

## Typography

**Display Font:** `var(--font-display), system-ui, sans-serif`  
**Body Font:** `var(--font-sans), system-ui, sans-serif`  
**Label/Mono Font:** `var(--font-mono), Menlo, monospace` (utility only)

**Character:** Large display cuts establish confidence. Body text remains readable and calm with generous leading and restrained tracking.

### Hierarchy
- **Display** (500, `clamp(52px, 7vw, 88px)`, 1.02): Hero statements and the strongest narrative line.
- **Headline** (500, `clamp(36px, 4.5vw, 56px)`, 1.1): Section anchors and major transitions.
- **Title** (500, `clamp(20px, 2.5vw, 28px)`, 1.2): Card and panel titles.
- **Body** (400, `16px`, 1.65): Main copy with readable line lengths near 65 to 75 characters.
- **Label** (500, `12px`, `0.08em`): Metadata, micro labels, and compact UI affordances.

**The Contrast Rule.** Hierarchy is created by scale and weight, not by color noise or decorative effects.

## Elevation

The system is mostly flat by default, with depth communicated by tonal layering, fine borders, and selective blur. Heavy drop shadows are avoided. Perceived depth comes from background contrast, panel radius, and motion.

### Shadow Vocabulary
- **Ambient Glow** (`radial-gradient(... var(--color-brand-primary) 20% ...) + blur(32px)`): Used once behind the CTA panel to create warm focus.
- **Glass Backdrop** (`backdrop-filter: blur(8px to 20px)`): Nav bar increases blur after scroll to signal sticky context.

**The Flat By Default Rule.** Surfaces stay flat at rest. Depth is introduced only where state or focus requires it.

## Components

### Buttons
- **Shape:** Tight rounded corners (`6px`) for confident, less bubbly controls.
- **Primary:** Vermilion fill, light text, medium density padding (`8px 16px`).
- **Hover / Focus:** Hover lifts to `#f97316`; focus uses visible ring via `focus-visible:ring-2`.
- **Ghost:** Transparent fill with charcoal text and subtle neutral border.

### Chips
- **Style:** Rounded full-pill, accent tint background, vermilion text.
- **State:** Dot pulse optional for live status contexts.

### Cards / Containers
- **Corner Style:** `8px` to `16px` based on surface importance.
- **Background:** Raised paper (`#ffffff`) for high-priority blocks.
- **Border:** Fine neutral stroke (`rgba(26,22,18,0.08)` range).
- **Internal Padding:** 24 to 40 px on main panels.

### Inputs / Fields
- **Style:** Muted canvas fill, neutral border, rounded `8px`, 12 by 16 padding.
- **Focus:** Brand-tinted 3px focus halo using color-mix with brand primary.
- **Error:** Inline left-aligned helper text in error color, paired with shake feedback.

### Navigation
- **Style:** Fixed, translucent cream shell with dynamic blur and subtle bottom border on scroll.
- **Type:** Charcoal active link with muted inactive links.
- **State:** Hover underline animation and section-active link weight shift.

### Signature Component
- **How It Works Step Stage:** Sticky narrative stage with snapped progress states (Capture, Process, Act) driven by ScrollTrigger progress bands.

## Do's and Don'ts

### Do:
- **Do** use `#ea580c` for primary action, active step state, and key status signals.
- **Do** keep section spacing generous (`py-32` equivalent rhythm) to preserve the airy brand tone.
- **Do** use warm neutrals (`#f7f3ee`, `#f0ebe4`, `#6b6560`) before introducing new colors.
- **Do** keep motion easing exponential (`cubic-bezier(0.16, 1, 0.3, 1)` or close equivalent).
- **Do** maintain visible focus indicators on all interactive elements.

### Don't:
- **Don't** ship a dark mode Vercel or Linear clone aesthetic.
- **Don't** make the UI feel like Notion document chrome.
- **Don't** use gradient text headings, purple glow effects, or generic AI robot motifs.
- **Don't** default to indistinguishable gray card grids with no visual hierarchy.
- **Don't** replace warm cream surfaces with cold grayscale or pure black shells.
