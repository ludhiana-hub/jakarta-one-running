import { Observable } from 'rxjs';

import { Edition } from '../models/edition';
import { MenuResponse } from '../models/menu-response';
import { PageResponse } from '../models/page-response';
import { SiteResponse } from '../models/site-response';

/**
 * Contract for retrieving public site pages + tenant data.
 * Fixture-first: early prototype reads from JSON assets.
 * Later: swap to HttpBlockRepository (Laravel API).
 */
export abstract class BlockRepository {
  abstract site(): Observable<SiteResponse>;
  abstract page(slug: string): Observable<PageResponse>;
  abstract editions(): Observable<Edition[]>;
  abstract edition(slug: string): Observable<Edition>;
  abstract menu(): Observable<MenuResponse>;
}

