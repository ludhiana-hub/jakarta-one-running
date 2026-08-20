import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { isRegistrationUrl } from '../../core/data/registration-waiver';
import { ExternalLinkService } from '../../core/external-link.service';
import { HeroBlockData } from '../../core/models/blocks/hero.block';
import { TrPipe } from '../../shared/pipes/tr.pipe';

@Component({
  selector: 'app-block-hero',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, TrPipe],
  templateUrl: './hero-block.component.html',
  styleUrl: './hero-block.component.scss',
})
export class HeroBlockComponent {
  private readonly externalLinks = inject(ExternalLinkService);

  data = input.required<HeroBlockData>();

  isInternalUrl(url: string): boolean {
    return url.startsWith('/');
  }

  openExternal(url: string, event: Event): void {
    event.preventDefault();
    if (isRegistrationUrl(url)) {
      this.externalLinks.openRegistration(url);
      return;
    }
    this.externalLinks.open(url);
  }

  onMedalMove(ev: MouseEvent): void {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;
    const container = ev.currentTarget as HTMLElement;
    const inner = container.querySelector('.medal-inner') as HTMLElement | null;
    if (!inner) return;
    const rect = container.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 10;
    const rotateY = (rect.width / 2 - x) / 10;
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  onMedalLeave(ev: MouseEvent): void {
    const container = ev.currentTarget as HTMLElement;
    const inner = container.querySelector('.medal-inner') as HTMLElement | null;
    if (inner) inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }
}
