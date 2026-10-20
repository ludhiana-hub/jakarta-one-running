import { Component, computed, input, signal } from '@angular/core';

import { TrPipe } from '../../shared/pipes/tr.pipe';
import { FaqAccordionBlockData, FaqItem } from '../../core/models/blocks/faq-accordion.block';

interface FaqGroup {
  key: string;
  title: FaqItem['group'];
  items: FaqItem[];
}

interface AnswerSegment {
  text: string;
  href?: string;
}

const URL_PATTERN = /https?:\/\/[^\s]+/g;
const TRAILING_PUNCTUATION = /[.,;:!?)]+$/;

/** Splits plain text into text and link segments so URLs render as anchors without innerHTML. */
function toSegments(text: string): AnswerSegment[] {
  const segments: AnswerSegment[] = [];
  let cursor = 0;
  for (const match of text.matchAll(URL_PATTERN)) {
    const start = match.index ?? 0;
    const url = match[0].replace(TRAILING_PUNCTUATION, '');
    if (start > cursor) segments.push({ text: text.slice(cursor, start) });
    segments.push({ text: url, href: url });
    cursor = start + url.length;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor) });
  return segments;
}

@Component({
  selector: 'app-block-faq-accordion',
  standalone: true,
  imports: [TrPipe],
  templateUrl: './faq-accordion-block.component.html',
  styleUrl: './faq-accordion-block.component.scss',
})
export class FaqAccordionBlockComponent {
  data = input.required<FaqAccordionBlockData>();

  private readonly segmentCache = new Map<string, AnswerSegment[]>();

  protected segments(text: string): AnswerSegment[] {
    let cached = this.segmentCache.get(text);
    if (!cached) {
      cached = toSegments(text);
      this.segmentCache.set(text, cached);
    }
    return cached;
  }

  protected readonly openIds = signal<ReadonlySet<string>>(new Set());

  protected toggle(id: string): void {
    this.openIds.update((open) => {
      const next = new Set(open);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  }

  /** Items bucketed by `group`, in first-seen order; ungrouped items share one untitled bucket. */
  protected readonly groups = computed<FaqGroup[]>(() => {
    const byKey = new Map<string, FaqGroup>();
    for (const item of this.data().items) {
      const key = item.group?.id ?? '';
      let group = byKey.get(key);
      if (!group) {
        group = { key, title: item.group, items: [] };
        byKey.set(key, group);
      }
      group.items.push(item);
    }
    return [...byKey.values()];
  });
}
