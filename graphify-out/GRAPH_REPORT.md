# Graph Report - project-bms  (2026-08-11)

## Corpus Check
- 119 files · ~567,056 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2641 nodes · 3065 edges · 196 communities (179 shown, 17 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `319e9605`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Angular Table Component
- Angular TreeTable Component
- DynamicPageComponent
- devDependencies
- Angular Slider Component
- dependencies
- dynamic-page.component.ts
- Angular Tree Component
- Angular Listbox Component
- Styled Mode
- app.ts
- Angular DatePicker Component
- Angular Button Component
- Angular ContextMenu Component
- Angular InputNumber Component
- Angular MultiSelect Component
- CONCEPT.md — Platform CMS Multi-Event Lari
- Angular Select Component
- Angular TreeSelect Component
- Angular InputMask Component
- home-page.component.ts
- Angular AutoComplete Component
- Edition
- Angular InputTags Component
- Angular Dialog Component
- Angular InputPassword Component
- Angular Rating Component
- Angular CascadeSelect Component
- Angular Otp Input Component
- Angular Textarea Component
- Angular Knob Component
- Angular Checkbox Component
- Angular RadioButton Component
- Angular Icon Library - PrimeNG
- dev-blocks.component.ts
- Angular InputText Component
- Angular ToggleSwitch Component
- Angular Menu Component
- Angular SelectButton Component
- Angular Speed Dial Component
- Angular ToggleButton Component
- tr.pipe.ts
- Angular FileUpload Component
- Angular Accordion Component
- Angular Avatar Component
- Angular Splitter Component
- Angular Tabs Component
- Angular Chart Component
- jkt-web — Frontend Angular SSR
- Angular InputColor Component
- Angular MeterGroup Component
- Angular Button Component
- Angular Timeline Component
- Angular Virtual Scroller Component
- development
- schematics
- Angular Editor Component
- Angular Gallery Component
- Angular OrderList Component
- Angular PickList Component
- Angular Drawer Component
- Angular Carousel Component
- Angular ColorPicker Component
- Angular Fieldset Component
- Angular InputGroup Component
- Angular Menubar Component
- Angular Panel Component
- Angular PanelMenu Component
- Angular Scroll Area Component
- Angular Sidebar Component
- Angular Skeleton Component
- Angular SplitButton Component
- Angular Breadcrumb Component
- Angular TieredMenu Component
- Angular Tooltip Component
- Configuration - PrimeNG
- Angular Chip Component
- Angular CommandMenu Component
- Angular Compare Component
- Angular ConfirmPopup Component
- Angular DataView Component
- Angular IconField Component
- Angular Gallery Component
- Angular Organization Chart Component
- Angular ProgressBar Component
- Angular Tag Component
- Glassmorphism Landing Page Design Spec (Jakarta One Running)
- DESIGN.md — Arah Visual Clean Frost (Light Glassmorphism)
- Angular ConfirmDialog Component
- Angular Image Component
- Angular MegaMenu Component
- Angular Message Component
- Angular Paginator Component
- Angular Badge Component
- Angular Divider Component
- Angular Label Component
- Angular Popover Component
- Angular Toast Component
- Overlay API - PrimeNG
- Angular Card Component
- Plugin - PrimeNG
- Angular Dock Component
- Angular Float Label Component
- Angular ProgressSpinner Component
- Angular Scroll Panel Component
- Angular Toolbar Component
- angular.json
- options
- llmfull-primeng.md
- Angular ImageCompare Component
- Angular Scroll Top Component
- Angular Terminal Component
- BlockRendererComponent
- Angular Ifta Label Component
- Tailwind CSS - PrimeNG
- ASSETS-MANIFEST.md — Prototype Landing Page Images
- Angular Fluid Component
- Angular KeyFilter Component
- Angular Ripple Component
- MCP Server - PrimeNG
- Getting Started - PrimeNG
- PrimeNG - Pass Through
- Clean Frost — White Base Light Theme
- block-renderer.component.ts
- JktWeb
- TranslatedString
- Accessibility - PrimeNG
- Animations - PrimeNG
- Angular Dynamic Dialog Component
- Angular StyleClass Component
- ExternalLinkDialogComponent
- Angular Animate On Scroll Directive
- Migration - PrimeNG v20
- Global Constraints
- Global Constraints
- Mobile Responsive (Scope A) — Design Spec
- allowedHosts
- ThemeService
- server.ts
- Angular Drag and Drop Component
- Unstyled Mode
- app.config.ts
- Migration - PrimeNG
- Custom Icons - PrimeNG
- Select
- Message
- Deploy on Dokploy (Compose)
- Angular AutoFocus Directive
- Angular Bind Directive
- Angular ClassNames Directive
- Angular Focus Trap Component
- Auto Complete
- Button
- Date Picker
- schedule-page.component.ts
- Split Button
- Table
- Toast
- Overlay
- TrackingService
- stats-counter.block.ts
- require
- Theming
- Theming
- Theming
- Theming
- Theming
- Theming
- Theming
- Theming
- navbar.component.ts
- edition-cards-block.component.ts
- RevealDirective
- legal-document-block.component.ts
- FilterService - PrimeNG
- production
- jkt-web
- Theming
- package.json
- index.ts
- jakarta-one/landing.config.ts
- jakarta-one/README.md
- _template/landing.config.ts
- _template/README.md
- environment.prod.ts
- Migration - PrimeNG v21
- @angular/compiler
- @angular/platform-browser
- express
- @fontsource/jetbrains-mono
- @fontsource-variable/plus-jakarta-sans
- leaflet
- @primeuix/themes
- rxjs
- vitest

## God Nodes (most connected - your core abstractions)
1. `Angular Table Component` - 60 edges
2. `TranslatedString` - 50 edges
3. `Angular TreeTable Component` - 43 edges
4. `Angular DatePicker Component` - 38 edges
5. `Angular Select Component` - 34 edges
6. `Styled Mode` - 31 edges
7. `Angular AutoComplete Component` - 28 edges
8. `Angular Tree Component` - 26 edges
9. `Angular Listbox Component` - 25 edges
10. `Angular InputNumber Component` - 24 edges

## Surprising Connections (you probably didn't know these)
- `StatsCounterItem` --references--> `TranslatedString`  [EXTRACTED]
  jkt-web/src/app/core/models/blocks/stats-counter.block.ts → jkt-web/src/app/core/models/translated.ts
- `FixtureBlockRepository` --inherits--> `BlockRepository`  [EXTRACTED]
  jkt-web/src/app/core/api/fixture.repository.ts → jkt-web/src/app/core/api/block.repository.ts
- `HttpBlockRepository` --inherits--> `BlockRepository`  [EXTRACTED]
  jkt-web/src/app/core/api/http-block.repository.ts → jkt-web/src/app/core/api/block.repository.ts
- `CtaBannerBlockData` --references--> `TranslatedString`  [EXTRACTED]
  jkt-web/src/app/core/models/blocks/cta-banner.block.ts → jkt-web/src/app/core/models/translated.ts
- `HomePageComponent` --references--> `EditionCardsBlockData`  [EXTRACTED]
  jkt-web/src/app/pages/home-page/home-page.component.ts → jkt-web/src/app/core/models/blocks/edition-cards.block.ts

## Import Cycles
- None detected.

## Communities (196 total, 17 thin omitted)

### Community 0 - "Angular Table Component"
Cohesion: 0.04
Nodes (55): Accessibility, Advanced, Advanced, Angular Table Component, Basic, celledit-doc, celleditselection-doc, checkboxselection-doc (+47 more)

### Community 1 - "Angular TreeTable Component"
Cohesion: 0.04
Nodes (49): Accessibility, Advanced, Angular TreeTable Component, Basic, Basic, Column Group, Column Toggle, columnresizeexpand-doc (+41 more)

### Community 2 - "DynamicPageComponent"
Cohesion: 0.33
Nodes (4): DynamicPageComponent, TRUSTED_PREVIEW_ORIGINS, Component, routes

### Community 3 - "devDependencies"
Cohesion: 0.07
Nodes (27): @angular/build, @angular/cli, @angular/compiler-cli, devDependencies, @angular/build, @angular/cli, @angular/compiler-cli, postcss (+19 more)

### Community 4 - "Angular Slider Component"
Cohesion: 0.05
Nodes (40): Accessibility, Accessibility, Angular Inplace Component, Angular Slider Component, Basic, Basic, Controlled, Controlled (+32 more)

### Community 5 - "dependencies"
Cohesion: 0.09
Nodes (23): @angular/common, @angular/core, @angular/forms, @angular/platform-server, @angular/router, @angular/ssr, @fontsource-variable/bricolage-grotesque, dependencies (+15 more)

### Community 6 - "dynamic-page.component.ts"
Cohesion: 0.18
Nodes (9): BlockRepository, PageResponse, SeoData, SeoService, Inject, Injectable, upsertMeta(), TenantService (+1 more)

### Community 7 - "Angular Tree Component"
Cohesion: 0.06
Nodes (32): Accessibility, Angular Tree Component, Basic, Checkbox, Content, Context Menu, Controlled, CSS Classes (+24 more)

### Community 8 - "Angular Listbox Component"
Cohesion: 0.06
Nodes (31): Accessibility, Angular Listbox Component, Basic, Checkbox, Checkmark, CSS Classes, customgroup-doc, Design Tokens (+23 more)

### Community 9 - "Styled Mode"
Cohesion: 0.06
Nodes (31): Architecture, Basefontsize, Bootstrap, Colors, Colorscheme, Component, Darkmode, Definepreset (+23 more)

### Community 10 - "app.ts"
Cohesion: 0.19
Nodes (7): App, config, serverConfig, serverRoutes, Component, FooterComponent, Component

### Community 11 - "Angular DatePicker Component"
Cohesion: 0.07
Nodes (30): Accessibility, Angular DatePicker Component, Basic, Button Bar, Date Template, Disabled, Filled, Fluid (+22 more)

### Community 12 - "Angular Button Component"
Cohesion: 0.07
Nodes (28): Accessibility, Angular Button Component, Badge, Basic, Button, Button Group, buttonset-doc, CSS Classes (+20 more)

### Community 13 - "Angular ContextMenu Component"
Cohesion: 0.07
Nodes (29): Accessibility, Accessibility, Angular BlockUI Component, Angular ContextMenu Component, Basic, Basic, Block U I, Command (+21 more)

### Community 14 - "Angular InputNumber Component"
Cohesion: 0.07
Nodes (29): Accessibility, Angular InputNumber Component, Basic, Buttons, Clear Icon, CSS Classes, Currency, Design Tokens (+21 more)

### Community 15 - "Angular MultiSelect Component"
Cohesion: 0.07
Nodes (29): Accessibility, Angular MultiSelect Component, Basic, Chips, Clear Icon, CSS Classes, Design Tokens, Disabled (+21 more)

### Community 16 - "CONCEPT.md — Platform CMS Multi-Event Lari"
Cohesion: 0.07
Nodes (27): 10. Referensi kompetitor (dua tujuan berbeda), 11. Yang sengaja TIDAK dibangun, 12. Roadmap, 13. Data seeding dari brief PDF Jakarta One Running, 1. Apa yang dibangun, 2. Model bisnis & batas scope, 3. Arsitektur sistem, 4. Model data (+19 more)

### Community 17 - "Angular Select Component"
Cohesion: 0.07
Nodes (28): Accessibility, Angular Select Component, Basic, checkboxselection-doc, Checkmark, Chips, customfilter-doc, customgroup-doc (+20 more)

### Community 18 - "Angular TreeSelect Component"
Cohesion: 0.07
Nodes (28): Accessibility, Angular TreeSelect Component, Basic, Checkbox, Clear Icon, CSS Classes, Design Tokens, Disabled (+20 more)

### Community 19 - "Angular InputMask Component"
Cohesion: 0.07
Nodes (27): Accessibility, Angular InputMask Component, AutoClear, Basic, clearicon-doc, CSS Classes, Disabled, Emits (+19 more)

### Community 20 - "home-page.component.ts"
Cohesion: 0.12
Nodes (11): CtaBannerBlockComponent, Component, HeroBlockComponent, Component, MilestoneBlockComponent, Component, CtaBannerBlockData, HeroBlockData (+3 more)

### Community 21 - "Angular AutoComplete Component"
Cohesion: 0.09
Nodes (23): Accessibility, Angular AutoComplete Component, Basic, clear-icon-doc, custom-group-doc, custom-option-doc, Disabled, Dropdown (+15 more)

### Community 22 - "Edition"
Cohesion: 0.13
Nodes (9): FixtureBlockRepository, Injectable, HttpBlockRepository, Injectable, Edition, MenuResponse, RegistrationPhase, SiteResponse (+1 more)

### Community 23 - "Angular InputTags Component"
Cohesion: 0.08
Nodes (25): Accessibility, Allow Duplicate, Angular InputTags Component, Basic, CSS Classes, Delimiter, Design Tokens, Disabled (+17 more)

### Community 24 - "Angular Dialog Component"
Cohesion: 0.08
Nodes (24): Accessibility, Angular Dialog Component, Basic, Confirmation, CSS Classes, Design Tokens, Dialog, Draggable (+16 more)

### Community 25 - "Angular InputPassword Component"
Cohesion: 0.08
Nodes (24): Accessibility, Angular InputPassword Component, Basic, Clear Icon, CSS Classes, Disabled, Filled, Float Label (+16 more)

### Community 26 - "Angular Rating Component"
Cohesion: 0.08
Nodes (24): Accessibility, Angular Rating Component, Basic, Controlled, CSS Classes, Design Tokens, Disabled, Emits (+16 more)

### Community 27 - "Angular CascadeSelect Component"
Cohesion: 0.08
Nodes (24): Accessibility, Angular CascadeSelect Component, Basic, Cascade Select, Clear Icon, CSS Classes, Design Tokens, Disabled (+16 more)

### Community 28 - "Angular Otp Input Component"
Cohesion: 0.09
Nodes (23): Accessibility, Angular Otp Input Component, Basic, Controlled, CSS Classes, Design Tokens, Disabled, Emits (+15 more)

### Community 29 - "Angular Textarea Component"
Cohesion: 0.09
Nodes (23): Accessibility, Angular Textarea Component, AutoResize, Basic, CSS Classes, Design Tokens, Disabled, Emits (+15 more)

### Community 30 - "Angular Knob Component"
Cohesion: 0.09
Nodes (23): Accessibility, Angular Knob Component, Basic, Color, CSS Classes, Design Tokens, Disabled, Emits (+15 more)

### Community 31 - "Angular Checkbox Component"
Cohesion: 0.09
Nodes (22): Accessibility, Angular Checkbox Component, Basic, Checkbox, CSS Classes, Design Tokens, Disabled, Dynamic (+14 more)

### Community 32 - "Angular RadioButton Component"
Cohesion: 0.09
Nodes (22): Accessibility, Angular RadioButton Component, Basic, Card, CSS Classes, Design Tokens, Disabled, Dynamic (+14 more)

### Community 33 - "Angular Icon Library - PrimeNG"
Cohesion: 0.09
Nodes (22): Accessibility, Angular Icon Library - PrimeNG, Angular Stepper Component, basic-doc, Color, CSS Classes, Design Tokens, Download (+14 more)

### Community 34 - "dev-blocks.component.ts"
Cohesion: 0.17
Nodes (8): JsonLdService, SportsEventJsonLd, Inject, Injectable, PageBlock, DEV_BLOCKS, DevBlocksComponent, Component

### Community 35 - "Angular InputText Component"
Cohesion: 0.10
Nodes (21): Accessibility, Angular InputText Component, Basic, Clear Icon, Disabled, Filled, Float Label, Fluid (+13 more)

### Community 36 - "Angular ToggleSwitch Component"
Cohesion: 0.10
Nodes (20): Accessibility, Angular ToggleSwitch Component, Basic, CSS Classes, Customization, Design Tokens, Disabled, Emits (+12 more)

### Community 37 - "Angular Menu Component"
Cohesion: 0.10
Nodes (20): Accessibility, Angular Menu Component, Basic, Command, Controlled, CSS Classes, Design Tokens, Emits (+12 more)

### Community 38 - "Angular SelectButton Component"
Cohesion: 0.10
Nodes (20): Accessibility, Angular SelectButton Component, Basic, CSS Classes, Design Tokens, Disabled, Emits, Fluid (+12 more)

### Community 39 - "Angular Speed Dial Component"
Cohesion: 0.10
Nodes (20): Accessibility, Angular Speed Dial Component, Basic, Circle, CSS Classes, Design Tokens, Emits, Linear (+12 more)

### Community 40 - "Angular ToggleButton Component"
Cohesion: 0.10
Nodes (20): Accessibility, Angular ToggleButton Component, Basic, CSS Classes, Customized, Design Tokens, Disabled, Emits (+12 more)

### Community 41 - "tr.pipe.ts"
Cohesion: 0.11
Nodes (16): FaqAccordionBlockComponent, Component, InteractiveMapBlockComponent, Component, RichTextMediaBlockComponent, Component, SeriesTimelineBlockComponent, Component (+8 more)

### Community 42 - "Angular FileUpload Component"
Cohesion: 0.11
Nodes (19): Accessibility, Advanced, Angular FileUpload Component, Auto, Basic, CSS Classes, Custom Upload, Design Tokens (+11 more)

### Community 43 - "Angular Accordion Component"
Cohesion: 0.11
Nodes (19): Accessibility, Accordion, Angular Accordion Component, Basic, Controlled, CSS Classes, Design Tokens, Disabled (+11 more)

### Community 44 - "Angular Avatar Component"
Cohesion: 0.11
Nodes (19): Accessibility, Angular Avatar Component, Avatar, AvatarGroup, avatargroupstyle-doc, avatarstyle-doc, Badge, Basic (+11 more)

### Community 45 - "Angular Splitter Component"
Cohesion: 0.11
Nodes (19): Accessibility, Advanced, Angular Splitter Component, Basic, CSS Classes, Custom, Design Tokens, Emits (+11 more)

### Community 46 - "Angular Tabs Component"
Cohesion: 0.11
Nodes (19): Accessibility, Angular Tabs Component, Basic, Controlled, CSS Classes, customindicator-doc, customtemplate-doc, Design Tokens (+11 more)

### Community 47 - "Angular Chart Component"
Cohesion: 0.11
Nodes (19): Accessibility, Angular Chart Component, Basic, Chart.js, Combo, CSS Classes, Doughnut, Horizontal Bar (+11 more)

### Community 48 - "jkt-web — Frontend Angular SSR"
Cohesion: 0.25
Nodes (7): jkt-web — Frontend Angular SSR, Konfigurasi SSR, Pola kontrak data (frontend-first), Resolusi tenant dari hostname, Setup, Stack, Struktur folder

### Community 49 - "Angular InputColor Component"
Cohesion: 0.11
Nodes (18): Accessibility, Advanced, Angular InputColor Component, Basic, Color Manager, Controlled, CSS Classes, Design Tokens (+10 more)

### Community 50 - "Angular MeterGroup Component"
Cohesion: 0.11
Nodes (18): Accessibility, Angular MeterGroup Component, Basic, Color, CSS Classes, Design Tokens, Icon, Label (+10 more)

### Community 51 - "Angular Button Component"
Cohesion: 0.11
Nodes (18): Accessibility, Angular Button Component, Badge, Basic, Button Group, buttonset-doc, Disabled, iconsonly-doc (+10 more)

### Community 52 - "Angular Timeline Component"
Cohesion: 0.11
Nodes (18): Accessibility, Activity Feed, Alignment, Angular Timeline Component, Basic, CSS Classes, Custom, Design Tokens (+10 more)

### Community 53 - "Angular Virtual Scroller Component"
Cohesion: 0.11
Nodes (18): Accessibility, Angular Virtual Scroller Component, Basic, CSS Classes, Delay, Emits, Grid, Horizontal (+10 more)

### Community 54 - "development"
Cohesion: 0.15
Nodes (14): build, serve, builder, configurations, defaultConfiguration, development, buildTarget, extractLicenses (+6 more)

### Community 55 - "schematics"
Cohesion: 0.11
Nodes (18): schematics, skipTests, skipTests, style, skipTests, skipTests, skipTests, skipTests (+10 more)

### Community 56 - "Angular Editor Component"
Cohesion: 0.12
Nodes (17): Accessibility, Angular Editor Component, Basic, CSS Classes, customtoolbar-doc, Design Tokens, Editor, Emits (+9 more)

### Community 57 - "Angular Gallery Component"
Cohesion: 0.12
Nodes (17): Accessibility, Advanced, Angular Gallery Component, AutoPlay, Basic, Caption, Controlled, CSS Classes (+9 more)

### Community 58 - "Angular OrderList Component"
Cohesion: 0.12
Nodes (17): Accessibility, Angular OrderList Component, Basic, Checkbox, CSS Classes, Design Tokens, dragdrop-doc, Emits (+9 more)

### Community 59 - "Angular PickList Component"
Cohesion: 0.12
Nodes (17): Accessibility, Angular PickList Component, Basic, Checkbox, CSS Classes, Design Tokens, dragdrop-doc, Emits (+9 more)

### Community 60 - "Angular Drawer Component"
Cohesion: 0.12
Nodes (17): Accessibility, Angular Drawer Component, Basic, CSS Classes, Design Tokens, Drawer, Emits, Full Screen (+9 more)

### Community 61 - "Angular Carousel Component"
Cohesion: 0.12
Nodes (17): Accessibility, Alignment, Angular Carousel Component, Basic, Carousel, CSS Classes, Design Tokens, Emits (+9 more)

### Community 62 - "Angular ColorPicker Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular ColorPicker Component, Basic, Color Picker, CSS Classes, Design Tokens, Disabled, Emits (+8 more)

### Community 63 - "Angular Fieldset Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular Fieldset Component, Basic, Controlled, CSS Classes, Design Tokens, Emits, Fieldset (+8 more)

### Community 64 - "Angular InputGroup Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular InputGroup Component, Basic, Button, Checkbox & Radio, CSS Classes, Design Tokens, Float Label (+8 more)

### Community 65 - "Angular Menubar Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular Menubar Component, Basic, Command, CSS Classes, Design Tokens, Emits, Menubar (+8 more)

### Community 66 - "Angular Panel Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular Panel Component, Basic, Controlled, CSS Classes, Design Tokens, Emits, Indicator (+8 more)

### Community 67 - "Angular PanelMenu Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular PanelMenu Component, Basic, Command, Controlled, CSS Classes, Design Tokens, Methods (+8 more)

### Community 68 - "Angular Scroll Area Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular Scroll Area Component, Basic, Both Scrollbars, CSS Classes, Custom, Design Tokens, Horizontal (+8 more)

### Community 69 - "Angular Sidebar Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular Sidebar Component, Chat Application, CSS Classes, Design Tokens, Dual Sidebar, Multi Sidebar, Nested Menu (+8 more)

### Community 70 - "Angular Skeleton Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular Skeleton Component, Basic, Card, Color, CSS Classes, DataTable, Design Tokens (+8 more)

### Community 71 - "Angular SplitButton Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular SplitButton Component, Basic, Disabled, Icons, Nested, Outlined, Pass Through Options (+8 more)

### Community 72 - "Angular Breadcrumb Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular Breadcrumb Component, Basic, Breadcrumb, CSS Classes, Custom Item, Custom Separator, Design Tokens (+8 more)

### Community 73 - "Angular TieredMenu Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular TieredMenu Component, Basic, Command, CSS Classes, Design Tokens, Emits, Methods (+8 more)

### Community 74 - "Angular Tooltip Component"
Cohesion: 0.12
Nodes (16): Accessibility, Angular Tooltip Component, Auto Hide, Basic, CSS Classes, Custom, Delay, Design Tokens (+8 more)

### Community 75 - "Configuration - PrimeNG"
Cohesion: 0.12
Nodes (16): Api, Configuration - PrimeNG, Csp, Dynamic, Filtermode, Inputvariant, License, Overlayappendto (+8 more)

### Community 76 - "Angular Chip Component"
Cohesion: 0.13
Nodes (15): Accessibility, Angular Chip Component, Basic, Chip, CSS Classes, Design Tokens, Emits, Icon (+7 more)

### Community 77 - "Angular CommandMenu Component"
Cohesion: 0.13
Nodes (15): Accessibility, Angular CommandMenu Component, Basic, Command Menu, Controlled, CSS Classes, Custom, Design Tokens (+7 more)

### Community 78 - "Angular Compare Component"
Cohesion: 0.13
Nodes (15): Accessibility, Angular Compare Component, Compare, CSS Classes, Custom Handle, Design Tokens, Emits, Hover (+7 more)

### Community 79 - "Angular ConfirmPopup Component"
Cohesion: 0.13
Nodes (15): Accessibility, Angular ConfirmPopup Component, Basic, Confirm Popup, confirmationapi-doc, CSS Classes, Design Tokens, Headless (+7 more)

### Community 80 - "Angular DataView Component"
Cohesion: 0.13
Nodes (15): Accessibility, Angular DataView Component, Basic, CSS Classes, Data View, Design Tokens, Emits, Layout (+7 more)

### Community 81 - "Angular IconField Component"
Cohesion: 0.13
Nodes (15): Accessibility, Angular IconField Component, Basic, Clickable, CSS Classes, Design Tokens, floatlabel-doc, Icon Field (+7 more)

### Community 82 - "Angular Gallery Component"
Cohesion: 0.13
Nodes (15): Accessibility, Angular Gallery Component, Basic, CSS Classes, Design Tokens, Emits, Gallery, Grid (+7 more)

### Community 83 - "Angular Organization Chart Component"
Cohesion: 0.13
Nodes (15): Accessibility, Angular Organization Chart Component, Basic, Collapsible, Content, Controlled, CSS Classes, Design Tokens (+7 more)

### Community 84 - "Angular ProgressBar Component"
Cohesion: 0.13
Nodes (15): Accessibility, Angular ProgressBar Component, As Steps, Basic, CSS Classes, Design Tokens, Dynamic, Indeterminate (+7 more)

### Community 85 - "Angular Tag Component"
Cohesion: 0.13
Nodes (15): Accessibility, Angular Tag Component, Basic, CSS Classes, Design Tokens, Icon, Pass Through Options, Pill (+7 more)

### Community 86 - "Glassmorphism Landing Page Design Spec (Jakarta One Running)"
Cohesion: 0.13
Nodes (14): Accessibility requirements (non-negotiable), Data contract (fixture-first), Edition accent palette (data-driven per edition), Glass tiers (must be consistent across the site), Glassmorphism Landing Page Design Spec (Jakarta One Running), Non-goals (explicitly out of scope), Open questions, Status (+6 more)

### Community 87 - "DESIGN.md — Arah Visual Clean Frost (Light Glassmorphism)"
Cohesion: 0.14
Nodes (13): 10. Yang tidak boleh terjadi, 1. Kenapa glassmorphism cocok untuk brief ini, 2. Token sistem, 3. Tipografi, 4. Spesifikasi permukaan kaca (Clean Frost), 5. Konsep layout hero, 6. Elemen signature: kartu medali kaca yang reaktif warna, 7. Motion — satu momen terorkestrasi, bukan taburan efek (+5 more)

### Community 88 - "Angular ConfirmDialog Component"
Cohesion: 0.14
Nodes (14): Accessibility, Angular ConfirmDialog Component, Basic, Confirm Dialog, CSS Classes, Design Tokens, Emits, Headless (+6 more)

### Community 89 - "Angular Image Component"
Cohesion: 0.14
Nodes (14): Accessibility, Angular Image Component, Basic, CSS Classes, Design Tokens, Emits, Image, Pass Through Options (+6 more)

### Community 90 - "Angular MegaMenu Component"
Cohesion: 0.14
Nodes (14): Accessibility, Angular MegaMenu Component, Basic, Command, CSS Classes, Design Tokens, Mega Menu, Pass Through Options (+6 more)

### Community 91 - "Angular Message Component"
Cohesion: 0.14
Nodes (14): Accessibility, Angular Message Component, Basic, Closable, Dynamic, Icon, life-doc, outlined-doc (+6 more)

### Community 92 - "Angular Paginator Component"
Cohesion: 0.14
Nodes (14): Accessibility, Angular Paginator Component, Basic, CSS Classes, currentpagereport-doc, Design Tokens, Emits, Images (+6 more)

### Community 93 - "Angular Badge Component"
Cohesion: 0.14
Nodes (14): Accessibility, Angular Badge Component, Badge, Basic, Button, CSS Classes, Design Tokens, Overlay (+6 more)

### Community 94 - "Angular Divider Component"
Cohesion: 0.15
Nodes (13): Accessibility, Angular Divider Component, Basic, Content, CSS Classes, Design Tokens, Divider, Pass Through Options (+5 more)

### Community 95 - "Angular Label Component"
Cohesion: 0.15
Nodes (13): Accessibility, Angular Label Component, Basic, CSS Classes, Design Tokens, Disabled, Label, Pass Through Options (+5 more)

### Community 96 - "Angular Popover Component"
Cohesion: 0.15
Nodes (13): Accessibility, Angular Popover Component, Basic, Controlled, Design Tokens, Emits, Methods, Pass Through Options (+5 more)

### Community 97 - "Angular Toast Component"
Cohesion: 0.15
Nodes (13): Accessibility, Action, Angular Toast Component, Basic, clear-doc, Custom, Expanded Mode, Pass Through Options (+5 more)

### Community 98 - "Overlay API - PrimeNG"
Cohesion: 0.15
Nodes (13): Accessibility, appendto-doc, autozindex-doc, basezindex-doc, Basic, Events, hideonescape-doc, Mode (+5 more)

### Community 99 - "Angular Card Component"
Cohesion: 0.15
Nodes (13): Accessibility, Advanced, Angular Card Component, Basic, Card, CSS Classes, Design Tokens, Pass Through Options (+5 more)

### Community 100 - "Plugin - PrimeNG"
Cohesion: 0.15
Nodes (13): Claudecode, Cli, Codex, Contents, Cursor, Gemini, Introduction, Lifecycle (+5 more)

### Community 101 - "Angular Dock Component"
Cohesion: 0.17
Nodes (12): Accessibility, Advanced, Angular Dock Component, Basic, CSS Classes, Design Tokens, Dock, Emits (+4 more)

### Community 102 - "Angular Float Label Component"
Cohesion: 0.17
Nodes (12): Accessibility, Angular Float Label Component, Basic, CSS Classes, Design Tokens, Float Label, Invalid, Pass Through Options (+4 more)

### Community 103 - "Angular ProgressSpinner Component"
Cohesion: 0.17
Nodes (12): Accessibility, Angular ProgressSpinner Component, CSS Classes, Custom, Design Tokens, Determinate, Indeterminate, Pass Through Options (+4 more)

### Community 104 - "Angular Scroll Panel Component"
Cohesion: 0.17
Nodes (12): Accessibility, Angular Scroll Panel Component, Basic, CSS Classes, Custom, Design Tokens, Methods, Pass Through Options (+4 more)

### Community 105 - "Angular Toolbar Component"
Cohesion: 0.17
Nodes (12): Accessibility, Angular Toolbar Component, Basic, CSS Classes, Custom, Design Tokens, Pass Through Options, preview-doc (+4 more)

### Community 106 - "angular.json"
Cohesion: 0.29
Nodes (6): cli, packageManager, newProjectRoot, projects, $schema, version

### Community 107 - "options"
Cohesion: 0.18
Nodes (11): options, assets, browser, inlineStyleLanguage, outputMode, server, ssr, styles (+3 more)

### Community 108 - "llmfull-primeng.md"
Cohesion: 0.14
Nodes (13): Components, Configuration, Deprecations, Guide Pages, LLMs.txt - PrimeNG, Llmsfulltxt, Llmstxt, Markdownextension (+5 more)

### Community 109 - "Angular ImageCompare Component"
Cohesion: 0.18
Nodes (11): Accessibility, Angular ImageCompare Component, Basic, CSS Classes, Design Tokens, Image Compare, Pass Through Options, Props (+3 more)

### Community 110 - "Angular Scroll Top Component"
Cohesion: 0.18
Nodes (11): Accessibility, Angular Scroll Top Component, Basic, CSS Classes, Pass Through Options, preview-doc, Props, Scroll Top (+3 more)

### Community 111 - "Angular Terminal Component"
Cohesion: 0.18
Nodes (11): Accessibility, Angular Terminal Component, Basic, CSS Classes, Design Tokens, File System, Pass Through Options, preview-doc (+3 more)

### Community 112 - "BlockRendererComponent"
Cohesion: 0.12
Nodes (6): BlockRendererComponent, Component, GalleryGridBlockComponent, Component, FaqAccordionBlockData, GalleryGridBlockData

### Community 113 - "Angular Ifta Label Component"
Cohesion: 0.20
Nodes (10): Accessibility, Angular Ifta Label Component, Basic, CSS Classes, Design Tokens, Ifta Label, Invalid, Pass Through Options (+2 more)

### Community 114 - "Tailwind CSS - PrimeNG"
Cohesion: 0.20
Nodes (10): Animations, Colorpalette, Darkmode, Extensions, form-doc, Headless, Override, Overview (+2 more)

### Community 115 - "ASSETS-MANIFEST.md — Prototype Landing Page Images"
Cohesion: 0.22
Nodes (8): 1) Hero / landing backdrop, 2) Gallery, Apa yang perlu Anda siapkan, ASSETS-MANIFEST.md — Prototype Landing Page Images, Branding / media tambahan (opsional untuk prototype), Daftar aset yang dibutuhkan, Konvensi penamaan, Ringkasan

### Community 116 - "Angular Fluid Component"
Cohesion: 0.22
Nodes (9): Accessibility, Angular Fluid Component, Basic, Comparison, CSS Classes, Fluid, Pass Through Options, Props (+1 more)

### Community 117 - "Angular KeyFilter Component"
Cohesion: 0.22
Nodes (9): Accessibility, Angular KeyFilter Component, Emits, Key Filter, Presets, preview-doc, Props, Regex (+1 more)

### Community 118 - "Angular Ripple Component"
Cohesion: 0.22
Nodes (9): Accessibility, Angular Ripple Component, CSS Classes, Custom, Default, Design Tokens, Props, Ripple (+1 more)

### Community 119 - "MCP Server - PrimeNG"
Cohesion: 0.22
Nodes (9): Claudecode, Cli, Cursor, Data, Introduction, MCP Server - PrimeNG, Openaicodex, Tools (+1 more)

### Community 120 - "Getting Started - PrimeNG"
Cohesion: 0.22
Nodes (9): Download, Examples, Getting Started - PrimeNG, License, Nextsteps, Provider, Theme, Verify (+1 more)

### Community 121 - "PrimeNG - Pass Through"
Cohesion: 0.25
Nodes (8): Basic, Global, Instance, Introduction, Lifecycle, Pcprefix, PrimeNG - Pass Through, Ptoptions

### Community 122 - "Clean Frost — White Base Light Theme"
Cohesion: 0.25
Nodes (7): Atmosphere, Clean Frost — White Base Light Theme, Glass tiers, Goal, Out of scope, Principles, Token remap (keep Tailwind class names)

### Community 123 - "block-renderer.component.ts"
Cohesion: 0.19
Nodes (9): EditionDetailBlockComponent, Component, EmbedBlockComponent, Component, SponsorWallBlockComponent, Component, EditionDetailBlockData, EmbedBlockData (+1 more)

### Community 124 - "JktWeb"
Cohesion: 0.25
Nodes (7): Additional Resources, Building, Code scaffolding, Development server, JktWeb, Running end-to-end tests, Running unit tests

### Community 125 - "TranslatedString"
Cohesion: 0.18
Nodes (15): EditionCardsBlockData, FaqItem, GalleryImageItem, InteractiveMapBlockData, MapMarkerItem, MilestoneItem, RichTextMediaBlockData, SeriesTimelineBlockData (+7 more)

### Community 126 - "Accessibility - PrimeNG"
Cohesion: 0.29
Nodes (7): Accessibility - PrimeNG, Colors, Formcontrols, Introduction, Semantichtml, Waiaria, Wcag

### Community 127 - "Animations - PrimeNG"
Cohesion: 0.29
Nodes (7): Anchoredoverlays, Animations - PrimeNG, Collapsibles, Dialog, Disable, Introduction, Reference

### Community 128 - "Angular Dynamic Dialog Component"
Cohesion: 0.29
Nodes (7): Angular Dynamic Dialog Component, Closing a Dialog, Customization, Example, Opening a Dialog, Passing Data, style-doc

### Community 129 - "Angular StyleClass Component"
Cohesion: 0.29
Nodes (7): Angular StyleClass Component, Animation, Basic, Hide On Resize, preview-doc, Selector, Toggle Class

### Community 130 - "ExternalLinkDialogComponent"
Cohesion: 0.13
Nodes (8): Input, ExternalLinkDialogComponent, Component, Inject, PartnerLogo, PartnersPageComponent, Component, Output

### Community 131 - "Angular Animate On Scroll Directive"
Cohesion: 0.33
Nodes (6): Accessibility, Angular Animate On Scroll Directive, Animate On Scroll, basic-doc, preview-doc, Props

### Community 132 - "Migration - PrimeNG v20"
Cohesion: 0.33
Nodes (6): Backwardcompatible, Breaking, Deprecations, Migration - PrimeNG v20, Overview, Removals

### Community 133 - "Global Constraints"
Cohesion: 0.33
Nodes (5): Extract Angular Inline Templates Implementation Plan, Global Constraints, Task 1: Extract templates and substantial styles, Task 2: Apply required layouts, Task 3: Verify Angular compilation

### Community 134 - "Global Constraints"
Cohesion: 0.33
Nodes (5): Global Constraints, Mobile Responsive (Scope A) Implementation Plan, Task 1: Mobile navbar drawer, Task 2: Home mobile polish, Task 3: Schedule + Partners + Footer

### Community 135 - "Mobile Responsive (Scope A) — Design Spec"
Cohesion: 0.33
Nodes (5): Approach, Goal, Mobile Responsive (Scope A) — Design Spec, Out of scope, Requirements

### Community 136 - "allowedHosts"
Cohesion: 0.29
Nodes (7): security, allowedHosts, 103.55.37.253, 127.0.0.1, jakartaonerunningseries.com, localhost, *.sslip.io

### Community 137 - "ThemeService"
Cohesion: 0.33
Nodes (3): ThemeService, Inject, Injectable

### Community 138 - "server.ts"
Cohesion: 0.33
Nodes (4): angularApp, app, browserDistFolder, reqHandler

### Community 139 - "Angular Drag and Drop Component"
Cohesion: 0.40
Nodes (5): Angular Drag and Drop Component, Basic, DataTable, Drag Handle, Drop Indicator

### Community 140 - "Unstyled Mode"
Cohesion: 0.40
Nodes (5): Architecture, Example, Global, Setup, Unstyled Mode

### Community 141 - "app.config.ts"
Cohesion: 0.28
Nodes (5): appConfig, routes, cmsHostInterceptor(), resolveTenantHost(), environment

### Community 142 - "Migration - PrimeNG"
Cohesion: 0.40
Nodes (5): Breakingchanges, Deprecatedcomponents, Migration - PrimeNG, Migrationoverview, Renamedcomponents

### Community 143 - "Custom Icons - PrimeNG"
Cohesion: 0.40
Nodes (5): Custom Icons - PrimeNG, Fontawesome, Image, Material, Svg

### Community 144 - "Select"
Cohesion: 0.40
Nodes (5): Emits, methods-doc, Props, Select, Templates

### Community 145 - "Message"
Cohesion: 0.40
Nodes (5): Emits, Message, Methods, Props, Templates

### Community 146 - "Deploy on Dokploy (Compose)"
Cohesion: 0.33
Nodes (5): Alternative: Dockerfile-only app, Deploy on Dokploy (Compose), Domains, If build fails (OOM), Recommended settings

### Community 147 - "Angular AutoFocus Directive"
Cohesion: 0.50
Nodes (4): Angular AutoFocus Directive, Auto Focus, Basic, Props

### Community 148 - "Angular Bind Directive"
Cohesion: 0.50
Nodes (4): Angular Bind Directive, Bind, Examples, Props

### Community 149 - "Angular ClassNames Directive"
Cohesion: 0.50
Nodes (4): Angular ClassNames Directive, Class Names, Examples, Props

### Community 150 - "Angular Focus Trap Component"
Cohesion: 0.50
Nodes (4): Angular Focus Trap Component, Basic, Focus Trap, Props

### Community 151 - "Auto Complete"
Cohesion: 0.50
Nodes (4): Auto Complete, Emits, props-doc, templates-doc

### Community 152 - "Button"
Cohesion: 0.50
Nodes (4): Button, Emits, Props, Templates

### Community 153 - "Date Picker"
Cohesion: 0.50
Nodes (4): Date Picker, Emits, Props, Templates

### Community 154 - "schedule-page.component.ts"
Cohesion: 0.18
Nodes (13): formatPriceIdr(), JKTONE_MILESTONES, JKTONE_STAGES, JktoneStage, raceDateUtc(), stagesToEditions(), formatTimeShort(), formatWibDateLabel() (+5 more)

### Community 155 - "Split Button"
Cohesion: 0.50
Nodes (4): Emits, Props, Split Button, Templates

### Community 156 - "Table"
Cohesion: 0.50
Nodes (4): Emits, Methods, Props, Table

### Community 157 - "Toast"
Cohesion: 0.50
Nodes (4): Emits, Props, Templates, Toast

### Community 158 - "Overlay"
Cohesion: 0.50
Nodes (4): Emits, Overlay, Props, Templates

### Community 159 - "TrackingService"
Cohesion: 0.31
Nodes (3): TrackingService, Inject, Injectable

### Community 160 - "stats-counter.block.ts"
Cohesion: 0.25
Nodes (4): StatsCounterBlockComponent, Component, StatsCounterBlockData, StatsCounterItem

### Community 162 - "Theming"
Cohesion: 0.67
Nodes (3): CSS Classes, Design Tokens, Theming

### Community 163 - "Theming"
Cohesion: 0.67
Nodes (3): CSS Classes, Design Tokens, Theming

### Community 164 - "Theming"
Cohesion: 0.67
Nodes (3): CSS Classes, Design Tokens, Theming

### Community 165 - "Theming"
Cohesion: 0.67
Nodes (3): CSS Classes, Design Tokens, Theming

### Community 166 - "Theming"
Cohesion: 0.67
Nodes (3): CSS Classes, Design Tokens, Theming

### Community 167 - "Theming"
Cohesion: 0.67
Nodes (3): CSS Classes, Design Tokens, Theming

### Community 168 - "Theming"
Cohesion: 0.67
Nodes (3): CSS Classes, Design Tokens, Theming

### Community 171 - "navbar.component.ts"
Cohesion: 0.27
Nodes (4): DEFAULT_MENU, MenuItem, NavbarComponent, Component

### Community 172 - "edition-cards-block.component.ts"
Cohesion: 0.31
Nodes (5): EditionCardsBlockComponent, formatDate(), SHORT_MONTHS_ID, Component, EditionCardItem

### Community 173 - "RevealDirective"
Cohesion: 0.16
Nodes (6): Directive, ContactFormComponent, Component, ContactPageComponent, Component, RevealDirective

### Community 174 - "legal-document-block.component.ts"
Cohesion: 0.40
Nodes (3): LegalDocumentBlockComponent, Component, LegalDocumentBlockData

### Community 175 - "FilterService - PrimeNG"
Cohesion: 0.40
Nodes (5): Built-in Constraints, Custom Constraints, FilterService API, FilterService - PrimeNG, tableintegration-doc

### Community 176 - "production"
Cohesion: 0.40
Nodes (5): production, budgets, buildTarget, fileReplacements, outputHashing

### Community 177 - "jkt-web"
Cohesion: 0.40
Nodes (5): prefix, projectType, root, sourceRoot, jkt-web

### Community 178 - "Theming"
Cohesion: 0.67
Nodes (3): CSS Classes, Design Tokens, Theming

### Community 179 - "package.json"
Cohesion: 0.17
Nodes (11): name, packageManager, private, scripts, build, ng, serve:ssr:jkt-web, start (+3 more)

### Community 186 - "Migration - PrimeNG v21"
Cohesion: 0.40
Nodes (5): Breaking, Deprecations, Migration - PrimeNG v21, Removals, Whatsnew

## Knowledge Gaps
- **1888 isolated node(s):** `laravel/mcp`, `$schema`, `version`, `packageManager`, `newProjectRoot` (+1883 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Angular Table Component` connect `Angular Table Component` to `Angular TreeTable Component`, `Angular Tree Component`, `Theming`, `llmfull-primeng.md`, `Angular MultiSelect Component`, `Table`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `Angular DatePicker Component` connect `Angular DatePicker Component` to `Theming`, `llmfull-primeng.md`, `Select`, `Angular AutoComplete Component`, `Angular InputTags Component`, `Auto Complete`, `Date Picker`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `Angular InputText Component` connect `Angular InputText Component` to `Theming`, `llmfull-primeng.md`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `laravel/mcp`, `$schema`, `version` to the rest of the system?**
  _1888 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Angular Table Component` be split into smaller, more focused modules?**
  _Cohesion score 0.03636363636363636 - nodes in this community are weakly interconnected._
- **Should `Angular TreeTable Component` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._