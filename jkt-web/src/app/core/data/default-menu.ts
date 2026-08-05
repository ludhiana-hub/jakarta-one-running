import { MenuItem } from '../models/menu-response';

/**
 * Shown when the CMS menu endpoint is unreachable or returns nothing.
 * Without this the navbar renders empty in any deploy where the CMS API is
 * not reachable from the browser.
 */
export const DEFAULT_MENU: MenuItem[] = [
  {
    label: { id: 'Beranda', en: 'Home' },
    type: 'page',
    url: '/',
    linkable_type: null,
    linkable_id: null,
    children: [],
  },
  {
    label: { id: 'Jadwal', en: 'Schedule' },
    type: 'page',
    url: '/schedule',
    linkable_type: null,
    linkable_id: null,
    children: [],
  },
  {
    label: { id: 'Mitra', en: 'Partners' },
    type: 'page',
    url: '/partners',
    linkable_type: null,
    linkable_id: null,
    children: [],
  },
  {
    label: { id: 'Kontak', en: 'Contact' },
    type: 'page',
    url: '/kontak',
    linkable_type: null,
    linkable_id: null,
    children: [],
  },
  {
    label: { id: 'Daftar', en: 'Register' },
    type: 'external',
    url: 'https://example.com/jakarta-one/register',
    linkable_type: null,
    linkable_id: null,
    children: [],
  },
];
