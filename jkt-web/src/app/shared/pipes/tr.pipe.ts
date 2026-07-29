import { Pipe, PipeTransform, inject } from '@angular/core';

import { AppLocale, LocaleService } from '../../core/locale.service';
import { TranslatedString } from '../../core/models/translated';

export function pickTranslated(value: TranslatedString, locale: AppLocale): string {
  if (locale === 'en') return value.en ?? value.id;
  return value.id;
}

@Pipe({
  name: 'tr',
  standalone: true,
  pure: true,
})
export class TrPipe implements PipeTransform {
  private readonly locale = inject(LocaleService);

  transform(value: TranslatedString | null | undefined): string {
    if (!value) return '';
    return pickTranslated(value, this.locale.current());
  }
}

