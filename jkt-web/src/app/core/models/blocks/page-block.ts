import { HeroBlockData } from './hero.block';
import { StatsCounterBlockData } from './stats-counter.block';
import { SeriesTimelineBlockData } from './series-timeline.block';
import { EditionCardsBlockData } from './edition-cards.block';
import { EditionDetailBlockData } from './edition-detail.block';
import { RichTextMediaBlockData } from './rich-text-media.block';
import { MilestoneBlockData } from './milestone.block';
import { GalleryGridBlockData } from './gallery-grid.block';
import { SponsorWallBlockData } from './sponsor-wall.block';
import { FaqAccordionBlockData } from './faq-accordion.block';
import { CtaBannerBlockData } from './cta-banner.block';
import { LegalDocumentBlockData } from './legal-document.block';
import { InteractiveMapBlockData } from './interactive-map.block';
import { TransportationInfoBlockData } from './transportation-info.block';
import { EmbedBlockData } from './embed.block';

export type PageBlock =
  | { id: string; type: 'hero'; data: HeroBlockData }
  | { id: string; type: 'stats_counter'; data: StatsCounterBlockData }
  | { id: string; type: 'series_timeline'; data: SeriesTimelineBlockData }
  | { id: string; type: 'edition_cards'; data: EditionCardsBlockData }
  | { id: string; type: 'edition_detail'; data: EditionDetailBlockData }
  | { id: string; type: 'rich_text_media'; data: RichTextMediaBlockData }
  | { id: string; type: 'milestone'; data: MilestoneBlockData }
  | { id: string; type: 'gallery_grid'; data: GalleryGridBlockData }
  | { id: string; type: 'sponsor_wall'; data: SponsorWallBlockData }
  | { id: string; type: 'faq_accordion'; data: FaqAccordionBlockData }
  | { id: string; type: 'cta_banner'; data: CtaBannerBlockData }
  | { id: string; type: 'legal_document'; data: LegalDocumentBlockData }
  | { id: string; type: 'interactive_map'; data: InteractiveMapBlockData }
  | { id: string; type: 'transportation_info'; data: TransportationInfoBlockData }
  | { id: string; type: 'embed'; data: EmbedBlockData };
