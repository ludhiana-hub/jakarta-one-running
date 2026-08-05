import { Routes } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { DynamicPageComponent } from './dynamic-page.component';

/**
 * CMS-authored pages are the only place PrimeNG components appear (FAQ
 * accordion, gallery). Configuring the theme here instead of in app.config
 * keeps the Aura preset out of the initial bundle.
 */
export const routes: Routes = [
  {
    path: '',
    component: DynamicPageComponent,
    providers: [
      providePrimeNG({
        theme: {
          preset: Aura,
          options: { cssLayer: { name: 'primeng', order: 'tailwind, primeng' } },
        },
      }),
    ],
  },
];
