# jkt-web — Frontend Angular SSR

Frontend publik untuk platform CMS multi-event lari.
**Satu aplikasi ini melayani SEMUA domain event.** Konten datang dari API
Laravel (`jkt-cms`), tidak ada akses database langsung.

> Baca `CONCEPT.md` lebih dulu untuk memahami keputusan produk & arsitektur.

---

## Stack

| Item | Versi / Pilihan |
|---|---|
| Angular | 22 (SSR via `@angular/ssr`) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS |
| Komponen UI | PrimeNG + `tailwindcss-primeui` (tema Aura) |
| State | Signals — **JANGAN pakai NgRx** |
| i18n | Transloco (string UI) + pipe `\| tr` (konten CMS) |
| Peta | Leaflet |
| Gambar | `NgOptimizedImage` |

---

## Setup

```bash
ng new jkt-web --ssr --style=scss
cd jkt-web

npm install primeng @primeuix/themes primeicons
npm install -D tailwindcss @tailwindcss/postcss postcss tailwindcss-primeui
npm install @jsverse/transloco leaflet
```

`.env` / `environment.ts`:

```ts
export const environment = {
  apiUrl: 'https://cms.platform-anda.com/api/v1',
  apiUrlServer: 'http://jkt-cms:8000/api/v1',  // internal, saat SSR
};
```

Kalau origin API saat SSR berbeda dengan saat di browser, **wajib** petakan
lewat `HTTP_TRANSFER_CACHE_ORIGIN_MAP` — kalau tidak, transfer cache tidak
dikenali dan request terjadi dua kali.

---

## Konfigurasi SSR

Semua rute **harus** `RenderMode.Server`. Prerender TIDAK bisa dipakai karena
output-nya di-key berdasarkan path, sehingga `/` milik event A akan bertabrakan
dengan `/` milik event B.

```ts
// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '**', renderMode: RenderMode.Server },
];
```

```ts
// app.config.server.ts
import { provideServerRendering, withRoutes } from '@angular/ssr';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};
```

```ts
// app.config.ts
providers: [
  provideZonelessChangeDetection(),
  provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
  provideHttpClient(withFetch()),
  provideClientHydration(withEventReplay(), withIncrementalHydration()),
  providePrimeNG({
    theme: {
      preset: Aura,
      options: { cssLayer: { name: 'primeng', order: 'tailwind, primeng' } },
    },
  }),
]
```

`cssLayer` di atas **kritis** — mencegah utility Tailwind kalah prioritas dari
style PrimeNG.

---

## Resolusi tenant dari hostname

Dilakukan di Express middleware (bukan di dalam Angular) supaya hasilnya bisa
di-cache di memori proses.

```ts
// server.ts
const angularApp = new AngularNodeAppEngine();
const tenantCache = new Map<string, { data: Tenant; exp: number }>();

async function resolveTenant(host: string): Promise<Tenant | null> {
  const hit = tenantCache.get(host);
  if (hit && hit.exp > Date.now()) return hit.data;

  const res = await fetch(`${API_SERVER}/site?host=${host}`, {
    headers: { 'X-Internal-Key': process.env['INTERNAL_KEY']! },
  });
  if (!res.ok) return null;

  const data = await res.json();
  tenantCache.set(host, { data, exp: Date.now() + 300_000 });
  return data;
}

app.use('/**', async (req, res, next) => {
  const host = req.headers.host!.split(':')[0];
  const tenant = await resolveTenant(host);
  if (!tenant) return res.status(404).send('Domain not registered');

  angularApp
    .handle(req, { tenant })
    .then((r) => (r ? writeResponseToNodeResponse(r, res) : next()))
    .catch(next);
});
```

```ts
// core/tenant.service.ts
import { REQUEST_CONTEXT, TransferState, makeStateKey } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private ctx = inject(REQUEST_CONTEXT, { optional: true }) as { tenant: Tenant } | null;
  private state = inject(TransferState);
  private readonly KEY = makeStateKey<Tenant>('tenant');

  readonly tenant = signal<Tenant>(this.init());

  private init(): Tenant {
    if (this.ctx?.tenant) {
      this.state.set(this.KEY, this.ctx.tenant);
      return this.ctx.tenant;
    }
    return this.state.get(this.KEY, DEFAULT_TENANT);
  }
}
```

`TransferState` **wajib** — tanpa itu klien akan request ulang setelah
hidrasi dan sebagian keuntungan SSR hilang.

---

## Struktur folder

```
src/app/
├── core/
│   ├── tenant.service.ts          resolusi tenant + TransferState
│   ├── theme.service.ts           inject CSS var dari tema tenant
│   ├── locale.service.ts          ID/EN dari prefix URL
│   ├── seo.service.ts             Meta, Title, canonical, hreflang, JSON-LD
│   └── api/
│       ├── block.repository.ts    ABSTRACT — kontrak data
│       ├── fixture.repository.ts  Fase 1: baca assets/fixtures/*.json
│       └── http.repository.ts     Fase 2: hit API Laravel
├── blocks/                        15 komponen blok (lihat CONCEPT.md §6)
│   ├── block-renderer.component.ts   switch type → komponen
│   ├── hero/
│   ├── stats-counter/
│   └── ...
├── layout/
│   ├── navbar/                    dukung 3 tipe menu (page/anchor/external)
│   ├── footer/
│   └── external-link-dialog/      dialog "Anda akan meninggalkan situs ini"
├── pages/
│   ├── dynamic-page.component.ts  render blocks[] dari API
│   └── kitchen-sink.component.ts  /dev/blocks — semua blok sekaligus
└── shared/pipes/tr.pipe.ts
```

---

## Pola kontrak data (frontend-first)

Fase 1 bekerja tanpa backend. Fase 2 cukup ganti provider — **komponen tidak
disentuh sama sekali.**

```ts
export abstract class BlockRepository {
  abstract page(slug: string): Observable<PageResponse>;
}

// Fase 1
{ provide: BlockRepository, useClass: FixtureBlockRepository }
// Fase 2
{ provide: BlockRepository, useClass: HttpBlockRepository }
```

---

## Pola komponen blok

Setiap blok: **standalone**, terima `data` lewat `input.required()`,
tidak tahu dari mana datanya datang.

### Blok marketing → Tailwind murni

```ts
@Component({
  selector: 'app-block-hero',
  standalone: true,
  imports: [NgOptimizedImage, TrPipe],
  template: `
    <section class="relative min-h-[520px] flex items-center justify-center text-white">
      <div class="absolute inset-0 bg-cover bg-center"
           [style.backgroundImage]="'url(' + data().bg_image + ')'"></div>
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative text-center px-6">
        @if (data().badge) {
          <span class="inline-block bg-[var(--brand-primary)] text-white
                       text-sm px-4 py-1 rounded-full mb-4">
            {{ data().badge | tr }}
          </span>
        }
        <h1 class="text-4xl md:text-6xl font-bold">{{ data().title | tr }}</h1>
        <p class="mt-4 text-lg">{{ data().tagline | tr }}</p>
      </div>
    </section>
  `,
})
export class HeroBlockComponent {
  data = input.required<HeroBlockData>();
}
```

### Blok fungsional → PrimeNG, dibungkus warna brand

```ts
@Component({
  selector: 'app-block-faq',
  standalone: true,
  imports: [Accordion, AccordionPanel, AccordionHeader, AccordionContent, TrPipe],
  template: `
    <section class="max-w-3xl mx-auto py-16 px-6">
      <p-accordion [multiple]="true">
        @for (faq of data().items; track faq.id) {
          <p-accordion-panel [value]="faq.id">
            <p-accordion-header class="!font-medium">{{ faq.question | tr }}</p-accordion-header>
            <p-accordion-content>{{ faq.answer | tr }}</p-accordion-content>
          </p-accordion-panel>
        }
      </p-accordion>
    </section>
  `,
})
export class FaqBlockComponent {
  data = input.required<FaqBlockData>();
}
```

**Impor PrimeNG per-komponen**, jangan modul penuh — bundle size menentukan
LCP.

```ts
import { Accordion } from 'primeng/accordion';   // ✅
// import { PrimeNGModule } from 'primeng/primeng';  ❌
```

---

## Theming per tenant

Tema datang dari database saat runtime, jadi **tidak bisa** pakai variabel
SCSS. Suntikkan CSS custom properties ke `<head>` saat SSR:

```ts
const style = renderer.createElement('style');
style.textContent = `:root{
  --brand-primary:${t.primary};
  --brand-secondary:${t.secondary};
  --p-primary-color:${t.primary};
  --bs-primary:${t.primary};
}`;
renderer.appendChild(document.head, style);
```

---

## SEO

Set meta di **route resolver**, bukan `ngOnInit` — supaya terisi saat HTML
dirender server.

```ts
export const pageResolver: ResolveFn<PageResponse> = async (route) => {
  const page = await inject(BlockRepository).page(route.paramMap.get('slug') ?? 'home');
  inject(SeoService).apply(page.page.seo);
  return page;
};
```

**JSON-LD** — sanitizer Angular membuang `<script>` dari `innerHTML`.
Suntikkan lewat `Renderer2`:

```ts
const script = renderer.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: edition.name,
  startDate: edition.race_date,
  location: { '@type': 'Place', name: edition.venue },
  offers: {
    '@type': 'Offer',
    price: phase.price,
    priceCurrency: 'IDR',
    url: phase.registration_url,
  },
});
renderer.appendChild(document.head, script);
```

`sitemap.xml`, `robots.txt`, dan OG image dinamis **digenerate dari Laravel**,
bukan Angular.

Canonical + `hreflang` dua arah + `x-default` juga lewat `Renderer2`.

---

## Bilingual

Transloco untuk string UI. Konten CMS pakai pipe sederhana:

```ts
@Pipe({ name: 'tr', standalone: true, pure: true })
export class TrPipe implements PipeTransform {
  private locale = inject(LocaleService);
  transform(value: Record<string, string> | null | undefined): string {
    if (!value) return '';
    return value[this.locale.current()] ?? value['id'] ?? '';
  }
}
```

Routing: `/` untuk Indonesia, `/en/` untuk English.
**Jangan pakai `@angular/localize`** — build-time i18n tidak nyambung dengan
konten yang datang dari database.

---

## Dialog "Anda akan meninggalkan situs ini"

Pola dari Chicago Marathon — wajib dipakai untuk semua link registrasi
eksternal.

```ts
openExternal(url: string) {
  this.pendingUrl.set(url);
  this.dialogVisible.set(true);
}
confirm() {
  window.open(this.pendingUrl()!, '_blank', 'noopener');
  this.dialogVisible.set(false);
}
```

---

## Tiga jebakan yang PASTI ditemui

**1. Akses `window` / `document` meledak saat SSR.**
Bungkus dengan `afterNextRender()` atau `isPlatformBrowser`. Berlaku juga
untuk GTM, Meta Pixel, dan library pihak ketiga — semuanya masuk
`afterNextRender`.

**2. Hydration mismatch (NG0500).**
Penyebab tersering: HTML tidak valid dari CMS (mis. `<div>` di dalam `<p>`),
dan konten bergantung waktu seperti countdown. Untuk countdown: render
placeholder di server, mulai hitung di `afterNextRender`.

**3. Gambar berat.**
Deck ini sangat berat gambar. Pakai `NgOptimizedImage` untuk semua `<img>`
dan tandai gambar hero dengan `priority`. Tanpa ini, ongkos SSR jadi sia-sia.

---

## Incremental hydration untuk blok berat

```html
@defer (hydrate on viewport) {
  <app-block-gallery [data]="block.data" />
} @placeholder {
  <div class="min-h-[400px] animate-pulse bg-neutral-100"></div>
}
```

Cocok untuk `gallery_grid`, `sponsor_wall`, `interactive_map`.

---

## Deploy (Dokploy)

- Satu aplikasi di Dokploy: `jkt-web`
- **Semua domain event ditambahkan ke aplikasi ini** — jangan pernah buat
  aplikasi baru per event
- Container port: `4000`
- Healthcheck: `/health`
- PM2 / Docker: batasi memori (`max_memory_restart: 512M`) — memory leak SSR
  itu umum
- Cache HTML ditangani Cloudflare Cache Rules (bukan Nginx — Traefik pegang
  port 80/443)

---

## Konvensi untuk AI-assisted coding

- Standalone components saja, tidak ada NgModule
- Signals untuk state, `input()` / `output()` untuk komunikasi komponen
- Control flow baru (`@if`, `@for`, `@defer`), bukan `*ngIf` / `*ngFor`
- Semua teks pengguna lewat pipe `| tr`, tidak ada string hardcoded
- Warna selalu `var(--brand-*)`, tidak pernah hex literal
- Satu blok = satu folder di `blocks/`, nama folder = nilai `type` di API
