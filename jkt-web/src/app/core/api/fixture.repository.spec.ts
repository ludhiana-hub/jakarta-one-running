import { describe, expect, it } from 'vitest';
import { firstValueFrom } from 'rxjs';

import { FixtureBlockRepository } from './fixture.repository';
import { pickTranslated } from '../../shared/pipes/tr.pipe';

describe('FixtureBlockRepository', () => {
  it('returns site + 5 editions', async () => {
    const repo = new FixtureBlockRepository();
    const site = await firstValueFrom(repo.site());

    expect(site.id).toBe('jakarta-one-running-series');
    expect(site.editions.length).toBe(5);
  });

  it('returns home page shell (UI lives in HomePageComponent)', async () => {
    const repo = new FixtureBlockRepository();
    const page = await firstValueFrom(repo.page('home'));

    expect(page.page.slug).toBe('home');
    expect(page.page.seo.meta_title.id).toContain('Jakarta One');
  });

  it('edition() returns correct accent', async () => {
    const repo = new FixtureBlockRepository();
    const ed = await firstValueFrom(repo.edition('west'));

    expect(ed.theme.accent).toBe('#CC0000');
  });
});

describe('TrPipe', () => {
  it('pickTranslated() returns id value for prototype locale', () => {
    const result = pickTranslated({ id: 'Halo', en: 'Hello' }, 'id');
    expect(result).toBe('Halo');
  });
});

