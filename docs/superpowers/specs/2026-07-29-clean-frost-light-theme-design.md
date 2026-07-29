# Clean Frost — White Base Light Theme

**Date:** 2026-07-29  
**Status:** Approved for implementation  
**App:** `jkt-web` public landing

## Goal

Replace the dark-first glass system with a **Clean Frost** light theme: off-white page base, white frosted glass panels, dark ink typography, selective red accents (`#CC0000` / ember). Client request: cleaner, white-dominant styling.

## Token remap (keep Tailwind class names)

| Token | Clean Frost value | Role |
|-------|-------------------|------|
| `void` | `#E6E8EE` | Cool-gray page canvas (panels sit brighter on top) |
| `chalk` | `#141418` | Primary text / headings |
| `mist` | `#5C5C66` | Secondary text |
| `glass` | `rgba(255,255,255,0.65)` | Default glass fill utility |
| `glass-border` | `rgba(20,20,24,0.10)` | Visible edge on light |
| `surface` | `#FFFFFF` | Elevated solid panels |
| west-red / ember / brand | unchanged | CTA, badges, highlights only |

Semantic names stay (`bg-void`, `text-chalk`, …) so templates mostly auto-flip.

## Glass tiers

| Tier | Fill | Border | Shadow |
|------|------|--------|--------|
| 1 Ambient | white 55% | charcoal 8% | none / very soft |
| 2 Card | white 68% | charcoal 10% | `0 8px 28px rgba(20,20,24,0.08)` |
| 3 Focal | white 78% | charcoal 12% | soft depth + gentle brand glow |

- Noise opacity ~0.015 (not “dirty”).
- Fallback without backdrop-filter: solid `rgba(255,255,255,0.92)`.

## Atmosphere

Light mesh on `#F7F8FA`; red/blue orbs at very low opacity; grid `rgba(0,0,0,0.04)`; no dark vignette.

## Principles

1. White-dominant canvas; panels slightly brighter than page.
2. Red sparingly — Register, CTA, live badges, stage focus.
3. Hero overlays fade to void (light), not black/void-dark.
4. No purple gradients, cream/terracotta editorial, or neon dark hobbyist look.
5. No dual dark/light toggle in this pass.

## Out of scope

- `stitch-export/` prototypes
- Copy/content changes
- Dark mode toggle
