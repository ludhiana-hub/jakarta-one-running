# Mobile Responsive (Scope A) — Design Spec

**Date:** 2026-07-29  
**Status:** Approved  
**Scope:** Navbar, Footer, Home, Schedule, Partners only (no CMS blocks beyond those used on Home).

## Goal

Usable, no horizontal overflow on ~375px viewports. Primary nav always reachable on mobile.

## Approach

Tailwind breakpoint polish + native glass hamburger drawer (no PrimeNG Menu).

## Requirements

1. **Navbar:** Mobile brand (may shorten), Register, hamburger. Drawer from right with Home / Schedule / Partners + Register. Close on link, Escape, backdrop. `aria-expanded` on toggle.
2. **Home:** Hero type/CTA stack without overflow; medal card constrained; stats 2×2; Jaro/stages/CTA single-column friendly padding.
3. **Schedule:** Full-width cards; spine desktop-only; Season Pass CTA stack; reduced header/section spacing on small screens.
4. **Partners:** Tabs wrap or horizontal scroll; logo carousel swipe; title sponsor + CTA padding tightened.
5. **Footer:** Keep stacked layout; adequate tap targets.

## Out of scope

Edition detail, kontak, legal, FAQ, other CMS blocks, bottom tab bar.
