# Hybrid landing folder

This folder is scaffolded when an Event is created in Filament CMS.

- **Runtime content** still comes from the Laravel CMS API (`/api/v1/pages/...`).
- Use this folder for **per-event overrides**: theme CSS, local fixtures, notes.
- Do not add a separate Angular app/deploy per event.

Slug: see `landing.config.ts`.
