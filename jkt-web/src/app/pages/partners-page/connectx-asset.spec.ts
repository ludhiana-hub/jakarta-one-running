import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

describe('ConnectX sponsor asset', () => {
  it('defines intrinsic dimensions so an auto-width image does not collapse', () => {
    const svg = readFileSync(resolve(process.cwd(), 'public/assets/sponsors/connectx.svg'), 'utf8');
    const rootTag = svg.match(/<svg\b[^>]*>/)?.[0] ?? '';

    expect(rootTag).toContain('width="345.24"');
    expect(rootTag).toContain('height="131.8"');
  });
});
