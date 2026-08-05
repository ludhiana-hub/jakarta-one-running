import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Edition } from '../models/edition';
import { MenuResponse } from '../models/menu-response';
import { PageResponse } from '../models/page-response';
import { SiteResponse } from '../models/site-response';
import { BlockRepository } from './block.repository';

@Injectable({ providedIn: 'root' })
export class HttpBlockRepository extends BlockRepository {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  private get baseUrl(): string {
    return isPlatformServer(this.platformId) ? environment.apiUrlServer : environment.apiUrl;
  }

  private previewToken(): string | null {
    if (isPlatformServer(this.platformId) || typeof window === 'undefined') {
      return null;
    }
    return new URLSearchParams(window.location.search).get('preview_token');
  }

  site(): Observable<SiteResponse> {
    return this.http.get<SiteResponse>(`${this.baseUrl}/site`);
  }

  page(slug: string): Observable<PageResponse> {
    let params = new HttpParams();
    const token = this.previewToken();
    if (token) {
      params = params.set('preview_token', token);
    }
    return this.http.get<PageResponse>(`${this.baseUrl}/pages/${slug}`, { params });
  }

  editions(): Observable<Edition[]> {
    return this.http.get<Edition[]>(`${this.baseUrl}/editions`);
  }

  edition(slug: string): Observable<Edition> {
    return this.http.get<Edition>(`${this.baseUrl}/editions/${slug}`);
  }

  menu(): Observable<MenuResponse> {
    return this.http.get<MenuResponse>(`${this.baseUrl}/site/menu`);
  }
}
