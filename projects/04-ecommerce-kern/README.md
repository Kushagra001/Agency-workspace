# KERN — Luxury E-Commerce (Project 04)

**KERN** is a premium e-commerce storefront showcasing luxury goods (watches, jewelry, accessories). Built with Next.js, Stripe integration, and a minimalist design aesthetic focused on high-end product presentation.

![KERN Home](./public/home.png)

## Overview

KERN provides a complete luxury e-commerce experience:
- **Luxury Hero** — Cinematic product imagery with season collections
- **Product Catalog** — Collections-based browsing with advanced filtering
- **Product Detail Pages** — High-resolution images, specifications, and styling
- **Shopping Cart** — Persistent cart with quantity management
- **Checkout** — Stripe-powered payment processing
- **Order Management** — Order history and status tracking
- **Wishlist / Saved Items** — User account and preferences

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 3 (with sophisticated color palette)
- **Animation**: Framer Motion + GSAP
- **E-Commerce**: Stripe integration (payments + webhooks)
- **Database**: (Optional) Supabase PostgreSQL for inventory & orders
- **Images**: Cloudinary / Vercel Image Optimization
- **Components**: `@agency/shared` from monorepo
- **Icons**: Lucide React

## Quick Start

### Prerequisites
- Node 18+
- pnpm 10.x
- Stripe account (free tier available)

### Installation & Development

```bash
# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env.local
# Add your Stripe keys and database URL (if using)

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to browse the store.

### Production Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home/storefront
│   ├── layout.tsx                  # Root layout
│   ├── products/
│   │   ├── page.tsx               # All products
│   │   └── [slug]/page.tsx        # Product detail
│   ├── collections/               # Collections browsing
│   ├── cart/                       # Shopping cart
│   ├── checkout/                  # Checkout flow
│   ├── orders/                    # Order history
│   ├── api/
│   │   ├── stripe/               # Stripe webhooks
│   │   ├── products/             # Product API
│   │   └── orders/               # Order management
│   └── globals.css
└── components/
    ├── sections/                 # Page sections
    ├── ui/                       # Reusable components
    ├── product/                  # Product components
    ├── cart/                     # Cart management UI
    └── layout/                   # Header, Footer, Navigation
```

## Key Features

### 1. **Stripe Payment Integration**
- Complete checkout flow with Stripe Elements
- Webhook handling for payment confirmation
- Support for multiple payment methods (card, Apple Pay, Google Pay)
- Test mode and live mode switching

### 2. **Product Management**
- Dynamic product pages with image galleries
- Collection/category filtering
- Product recommendations (you might also like)
- Inventory tracking (optional)

### 3. **Shopping Experience**
- Persistent shopping cart (localStorage + optional DB sync)
- Wishlist functionality
- Quick add to cart from catalog
- Product size/variant selection

### 4. **Luxury Design**
- Minimalist aesthetic with generous whitespace
- High-quality product photography
- Smooth scroll and interaction animations
- Premium typography (Geist font)

### 5. **User Accounts**
- Account registration and login
- Order history and tracking
- Saved payment methods
- Address book

## Customization Guide

### Colors & Branding
1. Update `tailwind.config.ts` with luxury brand colors (typically neutrals + accent)
2. Modify brand logo in `src/components/layout/Header.tsx`
3. Customize collection colors in `src/data/collections.ts`

### Product Data
- **Products**: Update in `src/lib/data/products.ts` or connect to headless CMS
- **Collections**: `src/lib/data/collections.ts`
- **Product images**: Replace with your product photography (Cloudinary recommended)

### Stripe Integration
1. Create Stripe account at stripe.com
2. Add keys to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
   STRIPE_SECRET_KEY=sk_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
3. Webhook endpoint: `POST /api/stripe/webhook`

### Checkout Flow
- Edit `src/components/checkout/CheckoutForm.tsx`
- Customize email receipts in `src/app/api/emails/`
- Adjust shipping cost logic in `src/lib/shipping.ts`

## Environment Variables

Required:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # Stripe public key
STRIPE_SECRET_KEY=                   # Stripe secret key
STRIPE_WEBHOOK_SECRET=               # Webhook signing secret

# Optional (for database):
DATABASE_URL=                        # Supabase or PostgreSQL
RESEND_API_KEY=                      # For order confirmation emails
CLOUDINARY_URL=                      # Image hosting
```

## Dependencies

Key packages:
- `next`: 16.2.x — React framework
- `@stripe/react-stripe-js`: ^3.x — Stripe UI
- `stripe`: ^17.x — Server-side Stripe
- `@agency/shared`: Shared components
- `zustand`: State management (cart)
- `framer-motion`: Animations

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```
Ensure environment variables are configured in Vercel dashboard.

### Other Platforms
1. Build: `pnpm build`
2. Deploy `.next` folder
3. Set environment variables on hosting platform
4. Configure Stripe webhook to point to your deployed URL

## Stripe Setup Checklist

- [ ] Create Stripe account
- [ ] Generate API keys (test + live)
- [ ] Create products/SKUs in Stripe Dashboard
- [ ] Set up webhook endpoint
- [ ] Test checkout flow in test mode
- [ ] Configure email receipts
- [ ] Switch to live keys before going live

## Performance Tips

1. **Image Optimization**:
   - Use Next.js Image component
   - Serve WebP format
   - Lazy-load product images below the fold

2. **Product Catalog**:
   - Paginate product listings
   - Use server-side filtering
   - Cache static product data

3. **Checkout**:
   - Minimize redirect jumps
   - Optimize Stripe loading
   - Implement progress indicator

## Notes

- **Workspace Dependency**: Uses `@agency/shared` from monorepo
- **Database Optional**: Can start with mock data, add Supabase/DB later
- **Stripe Testing**: Use test card 4242 4242 4242 4242 in test mode
- **See Also**: Check `DESIGN.md` for luxury design guidelines

## License

MIT — Premium e-commerce template available for retail, luxury goods, and marketplaces.
