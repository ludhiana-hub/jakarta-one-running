import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';

/**
 * Home stays eager (it is the LCP route). Everything else is lazy so the first
 * paint on mobile ships as little JavaScript as possible; PreloadAllModules in
 * app.config warms the other chunks in the background, keeping navigation
 * instant.
 */
export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'schedule',
    loadComponent: () =>
      import('./pages/schedule-page/schedule-page.component').then((m) => m.SchedulePageComponent),
  },
  {
    path: 'partners',
    loadComponent: () =>
      import('./pages/partners-page/partners-page.component').then((m) => m.PartnersPageComponent),
  },
  {
    path: 'tentang',
    redirectTo: 'partners',
    pathMatch: 'full',
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./pages/coming-soon-page/coming-soon-page.component').then(
        (m) => m.ComingSoonPageComponent,
      ),
  },
  {
    path: 'faq',
    data: { pageSlug: 'faq' },
    loadChildren: () => import('./pages/dynamic-page/dynamic-page.routes').then((m) => m.routes),
  },
  {
    path: 'event-waiver',
    data: { pageSlug: 'syarat-ketentuan' },
    loadChildren: () => import('./pages/dynamic-page/dynamic-page.routes').then((m) => m.routes),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact-page/contact-page.component').then((m) => m.ContactPageComponent),
  },
  {
    path: 'dev/blocks',
    loadComponent: () =>
      import('./pages/dev-blocks/dev-blocks.component').then((m) => m.DevBlocksComponent),
  },
  {
    path: 'etape/:slug',
    redirectTo: '/schedule',
    pathMatch: 'full',
  },
  {
    path: 'etape',
    redirectTo: '/schedule',
    pathMatch: 'full',
  },
  {
    path: 'galeri',
    redirectTo: '/gallery',
    pathMatch: 'full',
  },
  {
    path: 'syarat-ketentuan',
    redirectTo: '/event-waiver',
    pathMatch: 'full',
  },
  {
    path: 'kontak',
    redirectTo: '/contact',
    pathMatch: 'full',
  },
  // Catch-all for CMS-authored pages. Must stay LAST so it never shadows the
  // static routes above. A page created in Filament (e.g. slug "tentang-kami")
  // goes live at /tentang-kami with no Angular deploy.
  {
    path: ':slug',
    loadChildren: () => import('./pages/dynamic-page/dynamic-page.routes').then((m) => m.routes),
  },
];
