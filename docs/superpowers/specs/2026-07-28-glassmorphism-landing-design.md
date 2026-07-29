# Glassmorphism Landing Page Design Spec (Jakarta One Running)

## Status
Proposed design for prototype landing page (frontend only), to be implemented with Angular 22 SSR.

## What we are building
Not a generic CMS/landing site. We build a **multi-event event platform** prototype where:

- One Angular SSR app renders pages for different event domains (multi-page prototype).
- Content is delivered via a **closed block catalog** (15 block types) driven by JSON fixtures first.
- UI follows a **strict glassmorphism system** with deterministic token values from `docs/DESIGN.md`.

Tenant #1 reference data is **Jakarta One Running Series**.

## Tenant scope for prototype

- 5 editions: East, West, South, North, Central.
- Edition UI color is data-driven (glow/border/badge only).
- Registration behavior remains **redirect-only** (no in-system payment gateway).

## Non-goals (explicitly out of scope)

- Backend Laravel / Filament / database integration (prototype is fixture-first).
- Tenant domain resolution via Express/host header middleware (postponed to Fase 3).
- English content filling (structure only; fixtures populated in Indonesian for now).

## Structure & routing

Prototype uses **multi-page full structure**:

- `/` home
- `/etape/:slug` (5 editions) renders the edition detail layout
- `/tentang`, `/galeri`, `/faq`, `/syarat-ketentuan`, `/kontak` render content pages
- `/dev/blocks` kitchen sink to QA all 15 blocks

## Data contract (fixture-first)

The frontend renders a page response that includes:

- `page.slug`, `page.title` (id/en structure)
- `page.seo` (id/en meta title/description + OG image + `noindex`)
- `blocks[]` where each block has:
  - `type`
  - `data` payload shaped exactly for its Angular component

All user-visible strings are `{ id, en? }` to support `pipe | tr` and later full bilingual support.

## UI system: tokens and glassmorphism

All values are sourced from `docs/DESIGN.md` and must not be “rebalanced” ad-hoc.

### System palette

- Base platform background: `void` = `#0A0A0D`
- Main text: `chalk` = `#F5F5F2`
- Secondary text: `mist` = `#B8B8C0`
- Base glass fill: `glass` = `rgba(255,255,255,0.06)`
- Base glass border: `glass-border` = `rgba(255,255,255,0.14)`
- Platform accent (CTA): `ember` = `#FF3B4E`

### Edition accent palette (data-driven per edition)

- East: `#8C8C8C`
- West: `#CC0000`
- South: `#C4D600`
- North: `#4DD0E1`
- Central: `#0072B5`

Edition colors are used only for glow/border/badges, not for large text surfaces.

### Glass tiers (must be consistent across the site)

- Tier 1 (Navbar/footer): `backdrop-filter: blur(12px)`, ambient fill/border
- Tier 2 (cards): `blur(20px)` + stronger shadow
- Tier 3 (focal): `blur(28px)` + glow back to edition color

Every backdrop-filter must include `saturate(140%)` and there must be a fallback:

- `@supports not (backdrop-filter: blur(1px))` => solid background `rgba(15,15,18,0.85)`

### Accessibility requirements (non-negotiable)

- Contrast must be readable over real photo backdrops.
- Solid focus outline: 2px `ember`.
- Respect `prefers-reduced-motion: reduce` (disable transforms/rotations).

## Technology constraints

- Angular 22 SSR with `RenderMode.Server` for all routes.
- Tailwind CSS configured for v4 `@theme` token approach.
- PrimeNG with Aura theme; only functional components use PrimeNG.
- Bilingual infrastructure uses Transloco + `TrPipe`, but fixtures are ID-only for now.

## Open questions

1. Asset source: user will provide photos from deck PDF; we need file list + exact dimensions once available.
2. Timeline date discrepancy exists in deck; for prototype we will use 2026 values as they are declared in `editions.race_date` mapping.

