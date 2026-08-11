# Graph Report - jkt-web  (2026-08-11)

## Corpus Check
- 107 files · ~251,019 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 482 nodes · 890 edges · 23 communities (15 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `238b79f3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- block-renderer.component.ts
- Edition
- schedule-page.component.ts
- devDependencies
- dependencies
- TrackingService
- options
- schematics
- BlockRendererComponent
- edition-cards-block.component.ts
- JktWeb
- fixture.repository.spec.ts
- server.ts
- Deploy on Dokploy (Compose)
- StatsCounterBlockComponent
- GalleryGridBlockComponent
- index.ts
- jakarta-one/landing.config.ts
- jakarta-one/README.md
- _template/landing.config.ts
- _template/README.md
- environment.prod.ts

## God Nodes (most connected - your core abstractions)
1. `TranslatedString` - 50 edges
2. `Edition` - 21 edges
3. `BlockRendererComponent` - 19 edges
4. `TrPipe` - 17 edges
5. `BlockRepository` - 11 edges
6. `HttpBlockRepository` - 11 edges
7. `RevealDirective` - 11 edges
8. `options` - 10 edges
9. `FixtureBlockRepository` - 10 edges
10. `PageResponse` - 10 edges

## Surprising Connections (you probably didn't know these)
- `EditionCardsBlockData` --references--> `TranslatedString`  [EXTRACTED]
  src/app/core/models/blocks/edition-cards.block.ts → src/app/core/models/translated.ts
- `HomePageComponent` --references--> `EditionCardsBlockData`  [EXTRACTED]
  src/app/pages/home-page/home-page.component.ts → src/app/core/models/blocks/edition-cards.block.ts
- `FaqItem` --references--> `TranslatedString`  [EXTRACTED]
  src/app/core/models/blocks/faq-accordion.block.ts → src/app/core/models/translated.ts
- `GalleryImageItem` --references--> `TranslatedString`  [EXTRACTED]
  src/app/core/models/blocks/gallery-grid.block.ts → src/app/core/models/translated.ts
- `MapMarkerItem` --references--> `TranslatedString`  [EXTRACTED]
  src/app/core/models/blocks/interactive-map.block.ts → src/app/core/models/translated.ts

## Import Cycles
- None detected.

## Communities (23 total, 8 thin omitted)

### Community 0 - "block-renderer.component.ts"
Cohesion: 0.07
Nodes (53): Pipe, CtaBannerBlockComponent, Component, EditionDetailBlockComponent, Component, EmbedBlockComponent, Component, FaqAccordionBlockComponent (+45 more)

### Community 1 - "Edition"
Cohesion: 0.07
Nodes (24): routes, BlockRepository, cmsHostInterceptor(), FixtureBlockRepository, Injectable, HttpBlockRepository, Injectable, PageBlock (+16 more)

### Community 2 - "schedule-page.component.ts"
Cohesion: 0.05
Nodes (32): Directive, Input, Output, ContactFormComponent, Component, formatPriceIdr(), JKTONE_MILESTONES, JKTONE_STAGES (+24 more)

### Community 3 - "devDependencies"
Cohesion: 0.05
Nodes (40): @angular/build, @angular/compiler-cli, devDependencies, @angular/build, @angular/cli, @angular/compiler-cli, postcss, prettier (+32 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (39): @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser, @angular/platform-server, @angular/router, @angular/ssr (+31 more)

### Community 5 - "TrackingService"
Cohesion: 0.08
Nodes (15): App, appConfig, config, serverConfig, serverRoutes, Component, DEFAULT_MENU, MenuItem (+7 more)

### Community 6 - "options"
Cohesion: 0.06
Nodes (36): build, serve, builder, configurations, defaultConfiguration, options, development, production (+28 more)

### Community 7 - "schematics"
Cohesion: 0.07
Nodes (29): packageManager, prefix, projectType, root, schematics, sourceRoot, cli, newProjectRoot (+21 more)

### Community 8 - "BlockRendererComponent"
Cohesion: 0.07
Nodes (9): BlockRendererComponent, Component, JsonLdService, SportsEventJsonLd, Inject, Injectable, DEV_BLOCKS, DevBlocksComponent (+1 more)

### Community 9 - "edition-cards-block.component.ts"
Cohesion: 0.24
Nodes (6): EditionCardsBlockComponent, formatDate(), SHORT_MONTHS_ID, Component, EditionCardItem, EditionCardsBlockData

### Community 10 - "JktWeb"
Cohesion: 0.25
Nodes (7): Additional Resources, Building, Code scaffolding, Development server, JktWeb, Running end-to-end tests, Running unit tests

### Community 11 - "fixture.repository.spec.ts"
Cohesion: 0.25
Nodes (4): AppLocale, LocaleService, Injectable, pickTranslated()

### Community 12 - "server.ts"
Cohesion: 0.33
Nodes (4): angularApp, app, browserDistFolder, reqHandler

### Community 13 - "Deploy on Dokploy (Compose)"
Cohesion: 0.40
Nodes (4): Alternative: Dockerfile-only app, Deploy on Dokploy (Compose), If build fails (OOM), Recommended settings

## Knowledge Gaps
- **111 isolated node(s):** `$schema`, `version`, `packageManager`, `newProjectRoot`, `projectType` (+106 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TranslatedString` connect `block-renderer.component.ts` to `Edition`, `schedule-page.component.ts`, `TrackingService`, `edition-cards-block.component.ts`, `fixture.repository.spec.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `BlockRepository` connect `Edition` to `schedule-page.component.ts`, `TrackingService`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `RevealDirective` connect `schedule-page.component.ts` to `block-renderer.component.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `$schema`, `version`, `packageManager` to the rest of the system?**
  _111 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `block-renderer.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06544566544566545 - nodes in this community are weakly interconnected._
- **Should `Edition` be split into smaller, more focused modules?**
  _Cohesion score 0.07219662058371736 - nodes in this community are weakly interconnected._
- **Should `schedule-page.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05075187969924812 - nodes in this community are weakly interconnected._