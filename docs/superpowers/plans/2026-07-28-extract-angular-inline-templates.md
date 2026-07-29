# Extract Angular Inline Templates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move every inline Angular component template under `jkt-web/src/app` into sibling HTML files while preserving behavior and applying the requested stats and edition-card layouts.

**Architecture:** Extract the existing template text mechanically, update each component decorator to reference a sibling `templateUrl`, and move the substantial hero, stats, edition-detail, and embed styles into sibling SCSS files. Apply only the specified class/layout changes in the extracted HTML.

**Tech Stack:** Angular 22 standalone components, external HTML templates, component SCSS, Tailwind CSS, npm build.

## Global Constraints

- Create sibling `*.component.html` files for every component with an inline `template`; use `app.html` for `app.ts`.
- Preserve imports, inputs, methods, and runtime behavior except for the required layout changes.
- Remove unused imports after extraction.
- Keep stagger animation delay at 80ms for stats cards.
- Run `npm run build` from `jkt-web` and fix all errors before completion.

---

### Task 1: Extract templates and substantial styles

**Files:**
- Modify every `*.component.ts` and `app.ts` currently containing `template: \`...\`` under `jkt-web/src/app`.
- Create sibling HTML files for all extracted templates.
- Create SCSS files for hero, stats-counter, edition-detail, and embed styles.

- [ ] Extract each template without changing bindings or control flow.
- [ ] Replace inline `template` metadata with relative `templateUrl`.
- [ ] Move substantial inline styles to `styleUrl` and preserve CSS behavior.
- [ ] Remove imports made unused by extraction.

### Task 2: Apply required layouts

**Files:**
- `jkt-web/src/app/blocks/stats-counter/stats-counter-block.component.html`
- `jkt-web/src/app/blocks/edition-cards/edition-cards-block.component.html`

- [ ] Remove stats translate bindings and `floating-card`; use stretched equal-height cards and retain 80ms delay.
- [ ] Change edition cards to a six-column large-screen grid with first two items spanning three columns and last three spanning two columns.
- [ ] Add `h-full` to edition card links and remove vertical offsets.

### Task 3: Verify Angular compilation

- [ ] Search `src/app` to confirm no inline `template: \`...\`` remains.
- [ ] Run `npm run build` from `jkt-web`.
- [ ] Fix any compiler or template errors and rerun the build.
- [ ] Review the final diff and report all created/changed files.
