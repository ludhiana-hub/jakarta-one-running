import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BlockRepository } from './api/block.repository';
import { Edition } from './models/edition';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private readonly repo = inject(BlockRepository);

  /** Default edition theme until per-route tenants return. */
  private readonly defaultSlug = 'central';

  editionSlug(): string {
    return this.defaultSlug;
  }

  edition$(): Observable<Edition> {
    return this.repo.edition(this.editionSlug());
  }
}
