import { Injectable, signal } from '@angular/core';

/** App-wide fullscreen image viewer (click a stage/medal image to zoom). */
@Injectable({ providedIn: 'root' })
export class ImageLightboxService {
  readonly visible = signal(false);
  readonly imageUrl = signal<string | null>(null);
  readonly alt = signal('');

  open(imageUrl: string, alt = ''): void {
    if (!imageUrl) return;
    this.imageUrl.set(imageUrl);
    this.alt.set(alt);
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
    this.imageUrl.set(null);
    this.alt.set('');
  }
}
