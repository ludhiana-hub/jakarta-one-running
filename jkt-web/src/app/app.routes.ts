import { Routes } from '@angular/router';

import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { DevBlocksComponent } from './pages/dev-blocks/dev-blocks.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { PartnersPageComponent } from './pages/partners-page/partners-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'schedule',
    component: SchedulePageComponent,
  },
  {
    path: 'partners',
    component: PartnersPageComponent,
  },
  {
    path: 'tentang',
    redirectTo: 'partners',
    pathMatch: 'full',
  },
  {
    path: 'galeri',
    component: DynamicPageComponent,
    data: { pageSlug: 'galeri' },
  },
  {
    path: 'faq',
    component: DynamicPageComponent,
    data: { pageSlug: 'faq' },
  },
  {
    path: 'syarat-ketentuan',
    component: DynamicPageComponent,
    data: { pageSlug: 'syarat-ketentuan' },
  },
  {
    path: 'kontak',
    component: DynamicPageComponent,
    data: { pageSlug: 'kontak' },
  },
  {
    path: 'dev/blocks',
    component: DevBlocksComponent,
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
  // Catch-all for CMS-authored pages — must stay LAST so it never shadows
  // the static routes above. Lets a page created in Filament (e.g. slug
  // "tentang-kami") go live at /tentang-kami with no Angular deploy.
  {
    path: ':slug',
    component: DynamicPageComponent,
  },
];
