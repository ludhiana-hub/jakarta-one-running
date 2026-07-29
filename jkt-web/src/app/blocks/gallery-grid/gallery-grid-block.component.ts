import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';

import { GalleryGridBlockData } from '../../core/models/blocks/gallery-grid.block';

@Component({
  selector: 'app-block-gallery-grid',
  standalone: true,
  imports: [GalleriaModule, NgOptimizedImage],
  templateUrl: './gallery-grid-block.component.html',
})
export class GalleryGridBlockComponent {
  data = input.required<GalleryGridBlockData>();

  galleriaItems(): Array<{
    itemImageSrc: string;
    thumbnailImageSrc: string;
    alt?: string;
  }> {
    return this.data().images.map((img) => ({
      itemImageSrc: img.url,
      thumbnailImageSrc: img.url,
      alt: img.alt ? img.alt.id : undefined,
    }));
  }
}

