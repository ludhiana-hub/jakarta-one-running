import { Component, inject } from '@angular/core';

import { PageBlock } from '../../core/models/blocks/page-block';
import { BlockRendererComponent } from '../../blocks/block-renderer/block-renderer.component';
import { JsonLdService } from '../../core/json-ld.service';

const DEV_BLOCKS: PageBlock[] = [
  {
    id: 'dev_hero',
    type: 'hero',
    data: {
      badge: { id: 'Kitchen Sink' },
      title: { id: 'Hero Block' },
      tagline: { id: 'QA visual untuk blok hero.' },
      bg_image: 'https://picsum.photos/seed/jktone-hero/1920/1080',
      cta_label: { id: 'CTA Demo' },
      cta_url: '/etape/central',
    },
  },
  {
    id: 'dev_stats',
    type: 'stats_counter',
    data: {
      items: [
        { id: 's1', label: { id: 'Etape' }, value: '5' },
        { id: 's2', label: { id: 'Pelari' }, value: '25.000' },
        { id: 's3', label: { id: 'Medali' }, value: '5' },
      ],
    },
  },
  {
    id: 'dev_timeline',
    type: 'series_timeline',
    data: {
      items: [
        { id: 't1', title: { id: 'East' }, subtitle: { id: 'Velodrome' } },
        { id: 't2', title: { id: 'West' }, subtitle: { id: 'Puri Kembangan' } },
      ],
    },
  },
  {
    id: 'dev_edition_cards',
    type: 'edition_cards',
    data: {
      items: [
        {
          id: 'ec1',
          slug: 'central',
          name: { id: 'Central' },
          subtitle: { id: 'Lapangan Banteng' },
          cta_url: '/etape/central',
          theme_accent: '#0072B5',
        },
      ],
    },
  },
  {
    id: 'dev_edition_detail',
    type: 'edition_detail',
    data: {
      edition: {
        id: 'central',
        slug: 'central',
        name: { id: 'Central' },
        race_date: '2026-07-05T06:00:00.000Z',
        venue: { id: 'Lapangan Banteng' },
        theme_accent: '#0072B5',
        registration_phases: [
          {
            id: 'p1',
            name: { id: 'Pendaftaran' },
            opens_at: '2026-04-01T00:00:00.000Z',
            closes_at: '2026-06-26T23:59:59.000Z',
            price: 195000,
            registration_url: 'https://example.com/register',
          },
        ],
      },
      medal_image: 'https://picsum.photos/seed/jktone-medal/512/512',
    },
  },
  {
    id: 'dev_rich',
    type: 'rich_text_media',
    data: {
      title: { id: 'Rich Text + Media' },
      body: { id: 'Konten polos void tanpa kaca (DESIGN.md §10).' },
      media_image: 'https://picsum.photos/seed/jktone-rich/1400/900',
    },
  },
  {
    id: 'dev_milestone',
    type: 'milestone',
    data: {
      items: [
        { id: 'm1', year: 'MOVE', title: { id: 'MOVE' }, description: { id: 'Fase awal.' } },
        { id: 'm2', year: 'HABIT', title: { id: 'HABIT' }, description: { id: 'Fase kebiasaan.' } },
      ],
    },
  },
  {
    id: 'dev_gallery',
    type: 'gallery_grid',
    data: {
      images: [
        { id: 'g1', url: 'https://picsum.photos/seed/g1/1200/800', alt: { id: 'Galeri 1' } },
        { id: 'g2', url: 'https://picsum.photos/seed/g2/1200/800', alt: { id: 'Galeri 2' } },
      ],
    },
  },
  {
    id: 'dev_sponsor',
    type: 'sponsor_wall',
    data: {
      tiers: [
        {
          id: 'tier1',
          name: { id: 'Platinum' },
          logos: [
            {
              id: 'l1',
              url: 'https://example.com',
              image_url: 'https://picsum.photos/seed/sp1/240/120',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'dev_faq',
    type: 'faq_accordion',
    data: {
      items: [
        {
          id: 'f1',
          question: { id: 'Pertanyaan demo?' },
          answer: { id: 'Jawaban demo untuk kitchen sink.' },
        },
      ],
    },
  },
  {
    id: 'dev_cta',
    type: 'cta_banner',
    data: {
      title: { id: 'CTA Banner' },
      subtitle: { id: 'Tier 3 glass focal.' },
      cta_label: { id: 'Daftar' },
      cta_url: 'https://example.com/register',
    },
  },
  {
    id: 'dev_legal',
    type: 'legal_document',
    data: {
      title: { id: 'Legal Document' },
      content_html: '<p>Konten legal polos void.</p>',
    },
  },
  {
    id: 'dev_map',
    type: 'interactive_map',
    data: {
      title: { id: 'Interactive Map' },
      center: { lat: -6.1751, lng: 106.865 },
      zoom: 13,
      markers: [
        { id: 'mk1', label: { id: 'Jakarta' }, lat: -6.1751, lng: 106.865 },
      ],
    },
  },
  {
    id: 'dev_transport',
    type: 'transportation_info',
    data: {
      title: { id: 'Transportasi' },
      shuttles: [{ id: 'sh1', title: { id: 'Shuttle A' }, time: { id: '05.00 WIB' } }],
      parking: [{ id: 'pk1', title: { id: 'Parkir A' }, details: { id: 'Dekat gate utama.' } }],
    },
  },
  {
    id: 'dev_embed',
    type: 'embed',
    data: {
      title: { id: 'Embed' },
      url: 'https://www.google.com/maps?q=Jakarta&output=embed',
    },
  },
];

@Component({
  selector: 'app-dev-blocks',
  standalone: true,
  imports: [BlockRendererComponent],
  templateUrl: './dev-blocks.component.html',
})
export class DevBlocksComponent {
  private readonly jsonLd = inject(JsonLdService);

  protected readonly blocks = DEV_BLOCKS;

  constructor() {
    this.jsonLd.setSportsEvent({
      name: 'Jakarta One Running Series',
      startDate: '2026-05-10T06:00:00.000Z',
      locationName: 'Jakarta',
      url: 'https://example.com',
    });
  }
}
