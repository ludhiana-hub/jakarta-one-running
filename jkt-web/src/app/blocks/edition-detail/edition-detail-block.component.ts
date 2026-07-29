import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { TrPipe } from '../../shared/pipes/tr.pipe';
import { ExternalLinkDialogComponent } from '../../layout/external-link-dialog/external-link-dialog.component';
import { EditionDetailBlockData } from '../../core/models/blocks/edition-detail.block';

@Component({
  selector: 'app-block-edition-detail',
  standalone: true,
  imports: [NgOptimizedImage, TrPipe, ExternalLinkDialogComponent],
  templateUrl: './edition-detail-block.component.html',
  styleUrl: './edition-detail-block.component.scss',
})
export class EditionDetailBlockComponent {
  data = input.required<EditionDetailBlockData>();

  protected dialogVisible = false;
  protected pendingUrl: string | null = null;

  glow(accentHex: string): string {
    return `color-mix(in srgb, ${accentHex} 40%, transparent)`;
  }

  primaryPhase() {
    return this.data().edition.registration_phases[0];
  }

  medalSrc(): string {
    return this.data().medal_image ?? '/assets/prototype/hero-medal.png';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID').format(price);
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: '2-digit' });
  }

  openRegister(url: string): void {
    this.pendingUrl = url;
    this.dialogVisible = true;
  }

  onMedalMove(ev: MouseEvent): void {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;

    const el = ev.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    el.style.setProperty('--mouse-x', String(x));
  }

  onMedalLeave(ev: MouseEvent): void {
    if (typeof window === 'undefined') return;
    const el = ev.currentTarget as HTMLElement;
    el.style.setProperty('--mouse-x', '0');
  }
}

