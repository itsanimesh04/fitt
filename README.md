# Fitt. — AI Virtual Try-On for Fashion E-Commerce

> Turn browsers into buyers with photorealistic virtual try-on.

Fitt is a plug-and-play AI platform that lets online shoppers see themselves wearing your catalog clothing before they buy — reducing returns by up to 35% and lifting conversion rates by 2×.

## The Problem

- **30%** of fashion orders are returned because the product looked different than expected
- **1.5%** average fashion e-commerce conversion rate
- **₹45L+** annual revenue lost to return logistics for a ₹10Cr GMV brand

## How It Works

1. **Shopper uploads a photo** — A single selfie or full-body shot. Privacy-first, never stored.
2. **AI generates the try-on** — Photorealistic rendering onto the shopper's body in under 4 seconds.
3. **Shopper buys with confidence** — They see how it fits, drapes, and looks on their body type.

## Key Features

- 🏪 **Plug-and-play widget** — One script tag or Shopify app install. Live in under 3 days.
- 🔒 **Privacy-first** — Photos processed in-memory, never stored. GDPR & DPDP compliant.
- 📊 **Conversion analytics** — Track try-on adoption, conversion lift, and return delta.
- 🎨 **Catalog-aware rendering** — Understands fabric texture, drape, and fit.
- 📱 **Mobile-first** — Optimized for the 78% of shoppers browsing on mobile.
- 🔗 **Multi-platform** — Shopify, WooCommerce, Magento, and custom storefronts via REST API.

## Tech Stack

- **React 18** + TypeScript
- **Vite** for blazing-fast builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations

## Quick Start

```bash
# Clone the repo
git clone https://github.com/your-org/fitt-landing.git
cd fitt-landing

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── App.tsx                  # Main layout — imports & composes sections
├── lib/
│   ├── animations.ts        # Shared animation variants
│   └── helpers.ts           # Utility functions
├── hooks/
│   └── useInViewAnimation.ts
└── components/
    ├── Nav.tsx              # Fixed navbar + mobile menu
    ├── Hero.tsx             # Hero section with CTAs
    ├── LogoBar.tsx          # Scrolling brand marquee
    ├── Problem.tsx          # Problem statement cards
    ├── HowItWorks.tsx       # 3-step process accordion
    ├── Demo.tsx             # Interactive file upload try-on
    ├── Features.tsx         # Feature cards grid
    ├── Testimonials.tsx     # Auto-rotating carousel
    ├── Pricing.tsx          # Monthly/Annual pricing toggle
    ├── FAQ.tsx              # Accordion FAQ
    ├── CTABanner.tsx        # Email capture + CTA
    ├── Footer.tsx           # Footer with nav links
    └── BackToTop.tsx        # Floating scroll-to-top button
```

## Target Customers

- Fashion D2C brands (₹1–100 Cr GMV)
- Online-first apparel brands
- Brands with high return rates (25–40%)
- Brands looking to increase conversion rates

## Positioning

We are not an AR gimmick.
We are a **conversion infrastructure layer** for fashion commerce.

---

Built with ☕ by the Fitt team.
