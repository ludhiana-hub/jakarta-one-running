import { Component, input } from '@angular/core';

import { PageBlock } from '../../core/models/blocks/page-block';
import { HeroBlockData } from '../../core/models/blocks/hero.block';
import { StatsCounterBlockData } from '../../core/models/blocks/stats-counter.block';
import { SeriesTimelineBlockData } from '../../core/models/blocks/series-timeline.block';
import { EditionCardsBlockData } from '../../core/models/blocks/edition-cards.block';
import { EditionDetailBlockData } from '../../core/models/blocks/edition-detail.block';
import { RichTextMediaBlockData } from '../../core/models/blocks/rich-text-media.block';
import { MilestoneBlockData } from '../../core/models/blocks/milestone.block';
import { GalleryGridBlockData } from '../../core/models/blocks/gallery-grid.block';
import { SponsorWallBlockData } from '../../core/models/blocks/sponsor-wall.block';
import { FaqAccordionBlockData } from '../../core/models/blocks/faq-accordion.block';
import { CtaBannerBlockData } from '../../core/models/blocks/cta-banner.block';
import { LegalDocumentBlockData } from '../../core/models/blocks/legal-document.block';
import { InteractiveMapBlockData } from '../../core/models/blocks/interactive-map.block';
import { TransportationInfoBlockData } from '../../core/models/blocks/transportation-info.block';
import { EmbedBlockData } from '../../core/models/blocks/embed.block';

import { HeroBlockComponent } from '../hero/hero-block.component';
import { StatsCounterBlockComponent } from '../stats-counter/stats-counter-block.component';
import { SeriesTimelineBlockComponent } from '../series-timeline/series-timeline-block.component';
import { EditionCardsBlockComponent } from '../edition-cards/edition-cards-block.component';
import { EditionDetailBlockComponent } from '../edition-detail/edition-detail-block.component';
import { CtaBannerBlockComponent } from '../cta-banner/cta-banner-block.component';
import { FaqAccordionBlockComponent } from '../faq-accordion/faq-accordion-block.component';
import { GalleryGridBlockComponent } from '../gallery-grid/gallery-grid-block.component';
import { RichTextMediaBlockComponent } from '../rich-text-media/rich-text-media-block.component';
import { MilestoneBlockComponent } from '../milestone/milestone-block.component';
import { SponsorWallBlockComponent } from '../sponsor-wall/sponsor-wall-block.component';
import { LegalDocumentBlockComponent } from '../legal-document/legal-document-block.component';
import { TransportationInfoBlockComponent } from '../transportation-info/transportation-info-block.component';
import { EmbedBlockComponent } from '../embed/embed-block.component';
import { InteractiveMapBlockComponent } from '../interactive-map/interactive-map-block.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-block-renderer',
  standalone: true,
  imports: [
    HeroBlockComponent,
    StatsCounterBlockComponent,
    SeriesTimelineBlockComponent,
    EditionCardsBlockComponent,
    EditionDetailBlockComponent,
    CtaBannerBlockComponent,
    FaqAccordionBlockComponent,
    GalleryGridBlockComponent,
    RichTextMediaBlockComponent,
    MilestoneBlockComponent,
    SponsorWallBlockComponent,
    LegalDocumentBlockComponent,
    TransportationInfoBlockComponent,
    EmbedBlockComponent,
    InteractiveMapBlockComponent,
    RevealDirective,
  ],
  templateUrl: './block-renderer.component.html',
})
export class BlockRendererComponent {
  block = input.required<PageBlock>();

  heroData(): HeroBlockData | null {
    const b = this.block();
    return b.type === 'hero' ? b.data : null;
  }

  statsCounterData(): StatsCounterBlockData | null {
    const b = this.block();
    return b.type === 'stats_counter' ? b.data : null;
  }

  seriesTimelineData(): SeriesTimelineBlockData | null {
    const b = this.block();
    return b.type === 'series_timeline' ? b.data : null;
  }

  editionCardsData(): EditionCardsBlockData | null {
    const b = this.block();
    return b.type === 'edition_cards' ? b.data : null;
  }

  editionDetailData(): EditionDetailBlockData | null {
    const b = this.block();
    return b.type === 'edition_detail' ? b.data : null;
  }

  ctaBannerData(): CtaBannerBlockData | null {
    const b = this.block();
    return b.type === 'cta_banner' ? b.data : null;
  }

  faqAccordionData(): FaqAccordionBlockData | null {
    const b = this.block();
    return b.type === 'faq_accordion' ? b.data : null;
  }

  galleryGridData(): GalleryGridBlockData | null {
    const b = this.block();
    return b.type === 'gallery_grid' ? b.data : null;
  }

  richTextMediaData(): RichTextMediaBlockData | null {
    const b = this.block();
    return b.type === 'rich_text_media' ? b.data : null;
  }

  milestoneData(): MilestoneBlockData | null {
    const b = this.block();
    return b.type === 'milestone' ? b.data : null;
  }

  sponsorWallData(): SponsorWallBlockData | null {
    const b = this.block();
    return b.type === 'sponsor_wall' ? b.data : null;
  }

  legalDocumentData(): LegalDocumentBlockData | null {
    const b = this.block();
    return b.type === 'legal_document' ? b.data : null;
  }

  transportationInfoData(): TransportationInfoBlockData | null {
    const b = this.block();
    return b.type === 'transportation_info' ? b.data : null;
  }

  embedData(): EmbedBlockData | null {
    const b = this.block();
    return b.type === 'embed' ? b.data : null;
  }

  interactiveMapData(): InteractiveMapBlockData | null {
    const b = this.block();
    return b.type === 'interactive_map' ? b.data : null;
  }
}

