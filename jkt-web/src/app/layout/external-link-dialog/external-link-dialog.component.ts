import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-external-link-dialog',
  standalone: true,
  imports: [],
  templateUrl: './external-link-dialog.component.html',
})
export class ExternalLinkDialogComponent {
  @Input() visible = false;
  @Input() pendingUrl: string | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {}

  cancel(): void {
    this.visibleChange.emit(false);
  }

  confirm(): void {
    if (!this.pendingUrl) {
      this.visibleChange.emit(false);
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      window.open(this.pendingUrl, '_blank', 'noopener');
    }

    this.visibleChange.emit(false);
  }
}

