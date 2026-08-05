# Graph Report - jkt-web\src  (2026-07-30)

## Corpus Check
- 68 files · ~11,550 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 252 nodes · 567 edges · 10 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `79893c9e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- block-renderer.component.ts
- partners-page.component.ts
- dynamic-page.component.ts
- app.routes.ts
- home-page.component.ts
- BlockRendererComponent
- dev-blocks.component.ts
- fixture.repository.spec.ts
- InteractiveMapBlockComponent
- server.ts

## God Nodes (most connected - your core abstractions)
1. `TranslatedString` - 43 edges
2. `BlockRendererComponent` - 17 edges
3. `TrPipe` - 15 edges
4. `Edition` - 13 edges
5. `RevealDirective` - 11 edges
6. `ExternalLinkDialogComponent` - 10 edges
7. `FixtureBlockRepository` - 9 edges
8. `PageResponse` - 9 edges
9. `HomePageComponent` - 9 edges
10. `EditionCardsBlockComponent` - 8 edges

## Surprising Connections (you probably didn't know these)
- `GalleryImageItem` --references--> `TranslatedString`  [EXTRACTED]
  jkt-web/src/app/core/models/blocks/gallery-grid.block.ts → jkt-web/src/app/core/models/translated.ts
- `CtaBannerBlockData` --references--> `TranslatedString`  [EXTRACTED]
  jkt-web/src/app/core/models/blocks/cta-banner.block.ts → jkt-web/src/app/core/models/translated.ts
- `EditionCardItem` --references--> `TranslatedString`  [EXTRACTED]
  jkt-web/src/app/core/models/blocks/edition-cards.block.ts → jkt-web/src/app/core/models/translated.ts
- `FaqItem` --references--> `TranslatedString`  [EXTRACTED]
  jkt-web/src/app/core/models/blocks/faq-accordion.block.ts → jkt-web/src/app/core/models/translated.ts
- `HomePageComponent` --references--> `HeroBlockData`  [EXTRACTED]
  jkt-web/src/app/pages/home-page/home-page.component.ts → jkt-web/src/app/core/models/blocks/hero.block.ts

## Import Cycles
- None detected.

## Communities (10 total, 0 thin omitted)

### Community 0 - "block-renderer.component.ts"
Cohesion: 0.10
Nodes (33): EmbedBlockComponent, Component, FaqAccordionBlockComponent, Component, LegalDocumentBlockComponent, Component, MilestoneBlockComponent, Component (+25 more)

### Community 1 - "partners-page.component.ts"
Cohesion: 0.06
Nodes (19): ContactFormComponent, Component, SeoService, Inject, Injectable, upsertMeta(), ExternalLinkDialogComponent, Component (+11 more)

### Community 2 - "dynamic-page.component.ts"
Cohesion: 0.12
Nodes (16): BlockRepository, FixtureBlockRepository, Injectable, PageBlock, Edition, PageResponse, RegistrationPhase, SeoData (+8 more)

### Community 3 - "app.routes.ts"
Cohesion: 0.08
Nodes (13): App, appConfig, config, serverConfig, routes, serverRoutes, Component, FooterComponent (+5 more)

### Community 4 - "home-page.component.ts"
Cohesion: 0.09
Nodes (15): CtaBannerBlockComponent, Component, EditionCardsBlockComponent, Component, HeroBlockComponent, Component, RichTextMediaBlockComponent, Component (+7 more)

### Community 5 - "BlockRendererComponent"
Cohesion: 0.11
Nodes (6): BlockRendererComponent, Component, GalleryGridBlockComponent, Component, GalleryGridBlockData, GalleryImageItem

### Community 6 - "dev-blocks.component.ts"
Cohesion: 0.18
Nodes (7): JsonLdService, SportsEventJsonLd, Inject, Injectable, DEV_BLOCKS, DevBlocksComponent, Component

### Community 7 - "fixture.repository.spec.ts"
Cohesion: 0.25
Nodes (4): AppLocale, LocaleService, Injectable, pickTranslated()

### Community 8 - "InteractiveMapBlockComponent"
Cohesion: 0.40
Nodes (3): InteractiveMapBlockComponent, Component, ViewChild

### Community 9 - "server.ts"
Cohesion: 0.33
Nodes (4): angularApp, app, browserDistFolder, reqHandler

## Knowledge Gaps
- **11 isolated node(s):** `serverConfig`, `SportsEventJsonLd`, `DEV_BLOCKS`, `PartnerLogo`, `PartnerTabId` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TranslatedString` connect `block-renderer.component.ts` to `dynamic-page.component.ts`, `home-page.component.ts`, `BlockRendererComponent`, `fixture.repository.spec.ts`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `RevealDirective` connect `partners-page.component.ts` to `block-renderer.component.ts`, `home-page.component.ts`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **What connects `serverConfig`, `SportsEventJsonLd`, `DEV_BLOCKS` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `block-renderer.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10102843315184513 - nodes in this community are weakly interconnected._
- **Should `partners-page.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06463414634146342 - nodes in this community are weakly interconnected._
- **Should `dynamic-page.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11746031746031746 - nodes in this community are weakly interconnected._
- **Should `app.routes.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08143939393939394 - nodes in this community are weakly interconnected._