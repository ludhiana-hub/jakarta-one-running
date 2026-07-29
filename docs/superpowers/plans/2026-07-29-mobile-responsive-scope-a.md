# Mobile Responsive (Scope A) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or implement task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Navbar, Footer, Home, Schedule, and Partners usable on ~375px without horizontal overflow, with a working mobile nav drawer.

**Architecture:** Native hamburger + glass side drawer in navbar; Tailwind `sm`/`md`/`lg` spacing and stack fixes on page/block templates. No new UI libraries.

**Tech Stack:** Angular 22 standalone components, Tailwind v4, existing glass CSS tokens.

## Global Constraints

- Scope A only (shell + 3 main pages + Home blocks).
- No horizontal page scroll on 375px.
- Respect `prefers-reduced-motion` for drawer animation.
- Do not commit unless user asks.

---

### Task 1: Mobile navbar drawer

**Files:**
- Modify: `jkt-web/src/app/layout/navbar/navbar.component.ts`
- Modify: `jkt-web/src/app/layout/navbar/navbar.component.html`
- Create: `jkt-web/src/app/layout/navbar/navbar.component.scss`

- [ ] Add `menuOpen` signal; toggle / close / Escape / body scroll lock
- [ ] Hamburger visible `< md`; desktop nav unchanged
- [ ] Drawer panel with links + Register; close on navigate
- [ ] Verify build

### Task 2: Home mobile polish

**Files:**
- Modify: `jkt-web/src/app/blocks/hero/hero-block.component.html`
- Modify: `jkt-web/src/app/blocks/stats-counter/stats-counter-block.component.html`
- Modify: `jkt-web/src/app/blocks/rich-text-media/rich-text-media-block.component.html`
- Modify: `jkt-web/src/app/blocks/cta-banner/cta-banner-block.component.html`
- Modify: `jkt-web/src/app/blocks/edition-cards/edition-cards-block.component.html` (light touch)

- [ ] Hero: smaller padding, full-width CTAs on xs, medal max-width
- [ ] Stats/Jaro/CTA/stages: safe padding, no overflow

### Task 3: Schedule + Partners + Footer

**Files:**
- Modify: `jkt-web/src/app/pages/schedule-page/schedule-page.component.html`
- Modify: `jkt-web/src/app/pages/partners-page/partners-page.component.html`
- Modify: `jkt-web/src/app/pages/partners-page/partners-page.component.scss` (if needed)
- Modify: `jkt-web/src/app/layout/footer/footer.component.html`

- [ ] Schedule spacing, card/CTA mobile padding
- [ ] Partners tabs scroll + CTA padding
- [ ] Footer tap targets
- [ ] `ng build` verify
