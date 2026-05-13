---
name: Kern
description: Premium menswear D2C store
colors:
  primary: "#3d2b1f"
  neutral-bg: "#0f0d0a"
  kern-black-2: "#1a1612"
  kern-black-3: "#242018"
  kern-tobacco-light: "#6b4c38"
  kern-cream: "#f5f0e8"
  kern-cream-dim: "#c4bdb3"
  kern-cream-faint: "#7a756e"
typography:
  display:
    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
    fontWeight: 300
    lineHeight: 1.1
  body:
    fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif"
    fontWeight: 400
    letterSpacing: "0.25em"
rounded:
  none: "0px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.kern-cream}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.kern-cream}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
---

# Design System: Kern

## 1. Overview

**Creative North Star: "The Editorial Sanctuary"**

Kern is built on minimal words and absolute confidence. It embodies the high-craft energy of brands like Fear of God and Lemaire. The surface is dark, warm, and cinematic, using scroll-driven storytelling to elevate the product over typical e-commerce noise. We explicitly reject standard SaaS layouts, generic customer review stars, urgency timers, and discounts. The site gets out of its way so the garment can speak. 

**Key Characteristics:**
- Deep, warm-toned dark mode surfaces
- Meticulous font weight discipline (no bold/semibold)
- Scroll-driven cinematic reveals
- Single unmissable conversion action

## 2. Colors

The palette is rooted in dark warmth, anchored by deep blacks and rich tobacco accents, with stark cream used sparingly for contrast.

### Primary
- **Tobacco** (#3d2b1f): Deep warmth. Used for selection states, subtle hover accents, and scrollbar thumbs.
- **Tobacco Light** (#6b4c38): Lighter warmth for nuanced accents.

### Neutral
- **Kern Black** (#0f0d0a): The root background. Dark, but not cold #000.
- **Kern Black 2** (#1a1612): Slightly elevated surface.
- **Kern Black 3** (#242018): Further elevated surface.
- **Kern Cream** (#f5f0e8): Primary text and the single CTA background.
- **Kern Cream Dim** (#c4bdb3): Secondary text and muted UI elements.
- **Kern Cream Faint** (#7a756e): Tertiary text and ultra-subtle borders or labels.

### Named Rules
**The One Filled Button Rule.** The "Add to Cart" button is the ONLY element on the entire site that uses a solid cream background. This establishes absolute conversion hierarchy.

## 3. Typography

**Display Font:** Cormorant Garamond (with Georgia fallback)
**Body Font:** Inter (with system-ui fallback)

**Character:** High-craft editorial elegance meets brutalist restraint.

### Hierarchy
- **Display** (300 weight, large sizes, 1.1 line-height): Used for hero headlines and product names.
- **Headline** (300 weight, mid sizes, 1.2 line-height): Used for section titles.
- **Body** (400 weight, standard sizes, 1.5 line-height): Used for product descriptions and editorial copy.
- **Label** (400 weight, 11px, 0.25em tracking, uppercase): Used for meta-information, navigation links, and small descriptors.

### Named Rules
**The Weight Discipline Rule.** Never use font-bold (700) or font-semibold (600). The character of the site is defined by the fragile elegance of the 300 weight Cormorant and the clinical 400 weight Inter.

## 4. Elevation

Surfaces are flat by default. We do not use drop shadows for elevation. Depth is conveyed entirely through tonal layering (Kern Black 1, 2, and 3) and scroll-driven parallax movements.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Depth is established through scroll sequencing and subtle background color shifts, never shadows.

## 5. Components

### Buttons
- **Shape:** Square edges (0px radius)
- **Primary:** Cream background (#f5f0e8), dark text (#0f0d0a), reserved exclusively for Add to Cart.
- **Secondary / Ghost:** Transparent background, cream text, 1px border on hover or active states. Used for all other interactive actions (size selection, navigation).

### Navigation
- **Style:** Fixed header, transparent at rest, frosted glass (backdrop-blur) on scroll.
- **Typography:** Kern Label (11px, uppercase, wide tracking).

### Product Accordion
- **Style:** Minimal borders separating rows. Smooth Framer Motion height expansion.
- **Typography:** 300 weight display font for the trigger, 400 weight body for the expanded content.

## 6. Do's and Don'ts

### Do:
- **Do** use scroll-driven storytelling to sequentially reveal products.
- **Do** ensure "Add to Cart" is the only filled button.
- **Do** use editorial press quotes (e.g., Vogue, Monocle) instead of 5-star rating widgets.
- **Do** maintain the 300/400 font weight discipline at all times.

### Don't:
- **Don't** use generic SaaS card grids or side-stripe borders.
- **Don't** use any form of drop shadows for depth.
- **Don't** introduce urgency timers, "limited offer" banners, or discount codes.
- **Don't** use heavy font weights (no bold or semibold).
