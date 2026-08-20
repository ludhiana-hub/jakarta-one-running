import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Scroll-reveal: fades/slides content in when it enters the viewport.
 * SSR-safe: no opacity:0 on first paint (avoids shrink/pop glitch on refresh).
 * Tuned for mobile: earlier trigger, no heavy work once visible.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => this.setup());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setup(): void {
    const node = this.el.nativeElement;

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const alreadyInView = this.isInView(node);
    if (alreadyInView) {
      // Above the fold: stay visible — no hide→show flash on refresh
      return;
    }

    node.classList.add('reveal');
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      {
        threshold: isMobile ? 0.06 : 0.1,
        // Start a bit earlier so content is mid-fade when it reaches the thumb zone
        rootMargin: isMobile ? '0px 0px -4% 0px' : '0px 0px -6% 0px',
      },
    );
    this.observer.observe(node);
  }

  private isInView(node: HTMLElement): boolean {
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < vh * 0.94 && rect.bottom > 0;
  }
}
