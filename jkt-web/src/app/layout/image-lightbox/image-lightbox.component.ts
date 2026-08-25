import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  Inject,
  PLATFORM_ID,
  effect,
  inject,
  signal,
} from '@angular/core';

import { ImageLightboxService } from '../../core/image-lightbox.service';

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

@Component({
  selector: 'app-image-lightbox',
  standalone: true,
  imports: [],
  templateUrl: './image-lightbox.component.html',
  styleUrl: './image-lightbox.component.scss',
})
export class ImageLightboxComponent {
  private readonly lightbox = inject(ImageLightboxService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly visible = this.lightbox.visible;
  protected readonly imageUrl = this.lightbox.imageUrl;
  protected readonly alt = this.lightbox.alt;

  protected readonly zoom = signal(1);
  protected readonly panX = signal(0);
  protected readonly panY = signal(0);

  private dragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private panStartX = 0;
  private panStartY = 0;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    effect(() => {
      const open = this.visible();
      if (open) this.resetView();
      if (!isPlatformBrowser(this.platformId)) return;
      this.document.body.style.overflow = open ? 'hidden' : '';
    });

    this.destroyRef.onDestroy(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.document.body.style.overflow = '';
      }
    });
  }

  private resetView(): void {
    this.zoom.set(1);
    this.panX.set(0);
    this.panY.set(0);
  }

  close(): void {
    this.lightbox.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.close();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.close();
    if (event.key === '+' || event.key === '=') this.zoomIn();
    if (event.key === '-') this.zoomOut();
  }

  zoomIn(): void {
    this.zoom.update((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
  }

  zoomOut(): void {
    this.zoom.update((z) => {
      const next = Math.max(MIN_ZOOM, z - ZOOM_STEP);
      if (next === MIN_ZOOM) {
        this.panX.set(0);
        this.panY.set(0);
      }
      return next;
    });
  }

  toggleZoom(): void {
    if (this.zoom() > MIN_ZOOM) {
      this.resetView();
    } else {
      this.zoom.set(2);
    }
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    if (event.deltaY < 0) this.zoomIn();
    else this.zoomOut();
  }

  onPointerDown(event: PointerEvent): void {
    if (this.zoom() <= MIN_ZOOM) return;
    this.dragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.panStartX = this.panX();
    this.panStartY = this.panY();
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) return;
    this.panX.set(this.panStartX + (event.clientX - this.dragStartX));
    this.panY.set(this.panStartY + (event.clientY - this.dragStartY));
  }

  onPointerUp(): void {
    this.dragging = false;
  }
}
