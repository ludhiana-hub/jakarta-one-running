import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import siteFixture from '../../../assets/fixtures/site.json';
import homeFixture from '../../../assets/fixtures/home.json';
import tentangFixture from '../../../assets/fixtures/tentang.json';
import galeriFixture from '../../../assets/fixtures/galeri.json';
import faqFixture from '../../../assets/fixtures/faq.json';
import syaratKetentuanFixture from '../../../assets/fixtures/syarat-ketentuan.json';
import kontakFixture from '../../../assets/fixtures/kontak.json';

import { BlockRepository } from './block.repository';
import { Edition } from '../models/edition';
import { PageResponse } from '../models/page-response';
import { SiteResponse } from '../models/site-response';

@Injectable({ providedIn: 'root' })
export class FixtureBlockRepository extends BlockRepository {
  site(): Observable<SiteResponse> {
    return of(siteFixture as SiteResponse);
  }

  page(slug: string): Observable<PageResponse> {
    if (slug === 'home') return of(homeFixture as PageResponse);
    if (slug === 'tentang') return of(tentangFixture as PageResponse);
    if (slug === 'galeri') return of(galeriFixture as PageResponse);
    if (slug === 'faq') return of(faqFixture as PageResponse);
    if (slug === 'syarat-ketentuan') return of(syaratKetentuanFixture as PageResponse);
    if (slug === 'kontak') return of(kontakFixture as PageResponse);

    return throwError(() => new Error(`Fixture page not found: ${slug}`));
  }

  editions(): Observable<Edition[]> {
    const s = siteFixture as SiteResponse;
    return of(s.editions);
  }

  edition(slug: string): Observable<Edition> {
    const s = siteFixture as SiteResponse;
    const found = s.editions.find((e) => e.slug === slug);
    if (!found) return throwError(() => new Error(`Fixture edition not found: ${slug}`));
    return of(found);
  }
}

