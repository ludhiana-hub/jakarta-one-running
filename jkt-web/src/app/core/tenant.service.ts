import { Injectable, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Observable } from 'rxjs';

import { BlockRepository } from './api/block.repository';
import { Edition } from './models/edition';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private readonly router = inject(Router);
  private readonly repo = inject(BlockRepository);

  private readonly editionSlugSig = signal<string>('central');

  constructor() {
    this.syncSlugFromUrl();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.syncSlugFromUrl());
  }

  private syncSlugFromUrl(): void {
    const match = this.router.url.match(/\/etape\/([^/?#]+)/);
    this.editionSlugSig.set(match?.[1] ?? 'central');
  }

  editionSlug(): string {
    return this.editionSlugSig();
  }

  edition$(): Observable<Edition> {
    return this.repo.edition(this.editionSlug());
  }
}
