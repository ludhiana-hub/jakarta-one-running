# CONCEPT.md — Platform CMS Multi-Event Lari

> **Dokumen bersama.** Salin file ini ke KEDUA repo (`jkt-cms/` dan `jkt-web/`).
> Ini sumber kebenaran untuk keputusan produk & arsitektur.
> README masing-masing repo membahas "bagaimana"; dokumen ini membahas
> "apa" dan "kenapa". Jangan ubah keputusan di sini tanpa alasan kuat.

---

## 1. Apa yang dibangun

**Bukan** satu landing page dengan CMS.
**Adalah** platform penerbitan yang menghasilkan banyak situs event lari —
tiap situs punya domain sendiri, presentasi sendiri (multi-halaman atau
one-page), tapi lahir dari struktur data dan panel admin yang sama.

Jakarta One Running Series adalah tenant pertama, bukan produk itu sendiri.

**Konsekuensi praktis:** jangan pernah hardcode apa pun yang spesifik ke
Jakarta One (warna, nama etape, jumlah halaman, teks). Semuanya dari
database/API.

---

## 2. Model bisnis & batas scope

| Aspek | Keputusan |
|---|---|
| Vertikal | Satu — event lari. Tidak perlu generalisasi lintas-vertikal dulu |
| Model | Jasa/agency. **Hanya operator** yang membuat event baru |
| Pengisi konten | **Klien** (tim event), lewat CMS — bukan developer |
| SEO & tag tracking | **Klien juga**, self-service di CMS |
| Registrasi & pembayaran | **TIDAK dibangun.** Selalu redirect ke platform eksternal |
| Page builder | Katalog blok tertutup, **bukan** free-canvas ala Elementor |
| Bahasa | Indonesia (default) + English |

### Tidak ada payment gateway

Keputusan final, bukan penundaan. Sejalan dengan praktik industri:

- Chicago Marathon (terbesar di dunia) → redirect ke Haku (`manage.hakuapp.com`)
- gnrjakarta.com → redirect ke TipTip & halaman promo BTN
- Borobudur Marathon → app "My Borobudur Marathon" terpisah

**Konsekuensi yang harus disadari:** data konversi "benar-benar daftar &
bayar" tidak akan pernah ada di sistem kita. GTM di situs kita hanya bisa
mengukur *klik tombol keluar*, bukan pendaftaran nyata. Jangan janjikan
laporan konversi end-to-end ke sponsor.

---

## 3. Arsitektur sistem

```
Pengunjung publik ──┐
Tim event (CMS)  ───┤──▶ Cloudflare (CDN, DNS, cache HTML)
                              │
                              ▼
                   Dokploy / Traefik (SSL otomatis, routing domain)
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
    jkt-web (Angular 22 SSR)      jkt-cms (Laravel 12 + Filament v4)
    Satu app, SEMUA domain        API publik + API admin + panel CMS
              │                               │
              └────── REST API (JSON) ────────┘
                              │
                      MySQL 8 + Redis
```

### Prinsip kunci yang tidak boleh dilanggar

1. **Satu app Angular, satu app Laravel — selamanya.** Berapa pun jumlah
   event. Event baru = domain baru ditambahkan ke app yang sama, BUKAN
   deploy aplikasi baru.
2. **Angular tidak pernah menyentuh database.** Semua data lewat API Laravel.
3. **Resolusi domain → tenant terjadi di Laravel**, bukan di Dokploy, bukan
   di Angular.
4. **Logika bisnis hidup di Action/Service class**, bukan di dalam Filament
   Resource — supaya suatu hari Filament bisa diganti tanpa kehilangan logic.

---

## 4. Model data

```
tenants                     organizer (mis. PT Sasana Jiwa)
└── events                  ← TENANT MODEL di Filament
    ├── event_user          pivot many-to-many (multi-user per event)
    ├── event_domains       hostname, is_primary, type(preview|production)
    ├── editions            etape: East/West/South/North/Central, dst
    │   ├── registration_phases   name, opens_at, closes_at, price,
    │   │                         registration_url  ← BEDA per tahap!
    │   └── media                 medali, jersey, dokumentasi
    ├── pages               slug, title(json), seo{}, content_status
    │   └── blocks          type + data(json) + sort_order
    ├── menus
    │   └── menu_items      nested set, linkable polymorphic
    ├── sponsors            tier, logo, url, sort_order
    ├── faqs
    ├── posts               berita/pengumuman
    ├── leads               submission form partnership & kontak
    └── settings            GTM ID, Meta Pixel, GA4, custom head script

themes                      design token → CSS variable di Angular
```

### Dua status yang BERBEDA LEVEL — jangan dicampur

**`events.status`** — siklus hidup situs:

```
draft  ──▶  published  ──▶  archived
(domain     (domain asli,   (event lewat, TETAP LIVE PERMANEN,
 preview,    live, boleh     tombol registrasi jadi "Event telah
 noindex)    diindeks)       selesai", konten tetap terindeks)
```

**`pages.content_status`** — `draft` / `published`. Independen dari status
event. Dipakai berulang sepanjang umur situs: klien simpan draft → cek
preview → publish kapan pun.

### Kenapa `registration_phases` terpisah dari `editions`

Pola nyata industri: pendaftaran bertahap dengan harga DAN **platform
berbeda** per tahap.

- JAKIM: Program Rp1 → Presale → Fast Runners → General Sale
- Borobudur: Fast Track → Ballot → partner bank → travel agent
- gnrjakarta: Fan Club presale (gunsnroses.com) → BTN presale (btn.co.id)
  → General Sale (tiptip.id) — **tiga URL berbeda**

Karena itu `registration_url` ada di level *phase*, bukan *edition*.
Untuk Jakarta One yang harganya flat (Rp195.000), cukup buat satu phase.

---

## 5. Kontrak API

Prefix `/api/v1`. Tenant di-resolve dari header `Host` (atau query param
`?host=` untuk internal call dari SSR).

### Endpoint publik (tanpa auth, rate-limited, CORS ke domain terdaftar)

```
GET  /api/v1/site                  identitas situs, tema, tag tracking, status
GET  /api/v1/site/menu             struktur navigasi
GET  /api/v1/pages/{slug}          satu halaman: blocks[] + seo{}
GET  /api/v1/editions              daftar etape
GET  /api/v1/editions/{slug}       detail etape + registration_phases
GET  /api/v1/posts                 berita (paginated)
GET  /api/v1/posts/{slug}
POST /api/v1/leads                 submit form kontak/partnership
```

### Bentuk respons halaman (kontrak paling penting)

```json
{
  "page": {
    "slug": "home",
    "title": { "id": "Beranda", "en": "Home" },
    "seo": {
      "meta_title": { "id": "...", "en": "..." },
      "meta_description": { "id": "...", "en": "..." },
      "og_image": "https://.../og.jpg",
      "noindex": false
    }
  },
  "blocks": [
    {
      "id": "blk_01",
      "type": "hero",
      "data": {
        "badge": { "id": "Early Bird", "en": "Early Bird" },
        "title": { "id": "...", "en": "..." },
        "tagline": { "id": "...", "en": "..." },
        "bg_image": "https://.../hero.jpg",
        "cta_label": { "id": "Daftar", "en": "Register" },
        "cta_url": "https://external-platform.com/..."
      }
    }
  ]
}
```

Semua teks yang terlihat pengguna berbentuk `{ "id": "...", "en": "..." }`.

### Endpoint admin (auth Sanctum) — dibangun sejak awal

Meski Filament belum membutuhkannya, endpoint admin tetap dibangun dari awal.
Ini yang membuat suatu hari modul page builder bisa diganti ke Angular tanpa
refactor backend.

---

## 6. Katalog blok (15 blok — daftar tertutup)

| # | Blok | Isi | Implementasi Angular |
|---|---|---|---|
| 1 | `hero` | Cover halaman, badge, CTA | Tailwind custom |
| 2 | `stats_counter` | Angka ringkas (5 rute, 25rb pelari) | Tailwind custom |
| 3 | `series_timeline` | Jadwal antar-etape | Tailwind custom |
| 4 | `edition_cards` | Grid kartu etape | Tailwind custom |
| 5 | `edition_detail` | Detail etape: rute, RPC, waktu, medali | Tailwind custom |
| 6 | `rich_text_media` | Overview, sambutan, brand values | Tailwind custom |
| 7 | `milestone` | Roadmap tahunan (2026–2030) | Tailwind custom |
| 8 | `gallery_grid` | Dokumentasi foto | PrimeNG `p-galleria` |
| 9 | `sponsor_wall` | Logo partner per tier | Tailwind custom |
| 10 | `faq_accordion` | FAQ | PrimeNG `p-accordion` |
| 11 | `cta_banner` | Penutup halaman | Tailwind custom |
| 12 | `legal_document` | S&K, Privacy Policy (rich text panjang) | Tailwind custom |
| 13 | `interactive_map` | Peta rute / road closure (zoom & pan) | Leaflet |
| 14 | `transportation_info` | Shuttle, parkir, akses transportasi | Tailwind custom |
| 15 | `embed` | iframe generik (YouTube, Spotify, dll) | Wrapper responsif |

**Aturan wajib:** field di form Filament harus PERSIS sama dengan prop yang
diterima komponen Angular. Tidak lebih, tidak kurang.

### Pembagian PrimeNG vs Tailwind

- **PrimeNG** → hanya elemen *fungsional* yang butuh perilaku teruji:
  accordion, galeri, form, toast, dropdown bahasa.
- **Tailwind custom** → semua elemen *marketing/persuasi*: hero, badge promo,
  stats, sponsor wall, kartu etape. PrimeNG tidak menyediakan ini, dan
  memang bukan tujuannya.

---

## 7. Menu — tiga tipe target

Satu item menu bisa menunjuk ke salah satu dari:

1. **Halaman lain** → situs multi-halaman (`/tentang`)
2. **Anchor ke blok** → situs one-page (`#tickets`, scroll halus)
3. **Link eksternal** → registrasi, sosmed

Ini yang membuat satu sistem melayani situs multi-halaman DAN one-page tanpa
cabang logic terpisah. Komponen navbar harus mendukung dua mode klik
(navigate vs scroll-to) sejak awal.

---

## 8. Domain & deployment

### Alur menambah domain baru

```
1. Situs baru otomatis dapat domain PREVIEW
   (wildcard subdomain, noindex, basic-auth) — tanpa registrasi manual

2. Saat go-live:
   a. Klien arahkan A record ke IP VPS   ← MANUAL, di registrar mereka
   b. Admin simpan domain di Filament
   c. Laravel otomatis panggil Dokploy API (domain.create)
   d. Traefik terbitkan SSL Let's Encrypt & mulai routing
```

### Kenapa domain harus terdaftar di DUA tempat

| Sistem | Menjawab pertanyaan |
|---|---|
| **Dokploy** | "Domain ini boleh dapat SSL & diarahkan ke kontainer mana?" |
| **`event_domains`** | "Domain ini isinya konten event yang mana?" |

Lupa salah satu = situs mati. Di Filament saja → tidak ada SSL, request tidak
sampai. Di Dokploy saja → SSL jalan tapi 404.

### Catatan Dokploy

Traefik dari Dokploy memegang port 80/443, jadi **Nginx custom tidak bisa
dipasang sejajar**. Cache HTML SSR ditangani **Cloudflare Cache Rules**,
bukan Nginx `proxy_cache`.

Dokploy idle ~600MB RAM di luar kebutuhan aplikasi — hitung saat sizing VPS.

---

## 9. Role & akses

| Role | Kemampuan |
|---|---|
| **Superadmin (operator)** | Lintas-tenant. Satu-satunya yang bisa buat event baru & mengundang anggota tim |
| **Anggota tim event** | Terikat ke satu/beberapa event lewat `event_user`. Resource otomatis di-scope oleh Filament Tenancy |

Klien **tidak bisa** mendaftar sendiri. Operator yang membuat event lalu
mengundang orang tim klien.

---

## 10. Referensi kompetitor (dua tujuan berbeda)

### A. Untuk struktur konten & taksonomi CMS

**chicagomarathon.com**
- Arsitektur informasi multi-halaman skala besar: Runners / Spectators /
  Get Involved / Apply
- **Pola yang WAJIB diadopsi:** dialog konfirmasi *"You are now leaving the
  … website"* sebelum redirect ke platform registrasi eksternal
- Registrasi lewat pihak ketiga (Haku) — validasi keputusan no-payment-gateway

**jakim.id** (BTN Jakarta International Marathon)
- Kompetitor paling dekat (Jakarta, event lari, skala besar)
- Nav: Expo / Race (Pre-Race, Race, After-Race: Prizes, Winners, Results) /
  Partnership (Hotel, Media, Community, Volunteer, Cheering Point) /
  Charity / Gallery per tahun / Contact
- FAQ 18 poin, T&C berjenjang panjang, peta road closure zoomable,
  info shuttle MRT/HI, newsletter signup
- → sumber blok `legal_document`, `interactive_map`, `transportation_info`

**borobudurmarathon.com**
- Registrasi bertahap (Fast Track, Ballot, partner bank, travel agent)
- Storytelling budaya yang kuat

### B. Untuk slicing Angular — pola ONE-PAGE

**gnrjakarta.com** ← referensi utama untuk situs tipe kedua

- Hero full-bleed dengan dua CTA anchor (`#about`, `#tickets`) — bukan menu
  halaman terpisah. **Contoh nyata menu tipe "anchor ke blok".**
- Kartu tiket bertingkat: tiap tahap punya tanggal buka & **URL redirect
  berbeda** → sumber desain `registration_phases`
- Spotify iframe embed → sumber blok `embed`
- Beberapa section masih *"more information to come"* padahal situs sudah
  live → **konfirmasi bahwa publish tidak harus 100% lengkap**

---

## 11. Yang sengaja TIDAK dibangun

- Payment gateway / sistem registrasi sendiri
- Tracking konversi end-to-end (mustahil karena redirect keluar)
- Free-canvas page builder
- Multi-vertikal di luar event lari
- Admin panel Angular (Filament dulu — migrasi hanya untuk modul page
  builder jika terbukti perlu, lewat API admin yang sudah disiapkan)

---

## 12. Roadmap

| Fase | Durasi | Output |
|---|---|---|
| 0 | 3 hari | Skema blok final + design token + struktur folder |
| 1 | 2–3 minggu | Frontend Angular dari fixture JSON + kitchen sink page |
| 2 | 2 minggu | CMS Filament: resource, tenancy, block builder, iframe preview |
| 3 | 1 minggu | Multi-tenant: domain resolver, integrasi Dokploy API, tema per event |
| 4 | 1 minggu | Live preview, polish, SEO, cache |

Event kedua dan seterusnya: **input konten, bukan development.**

---

## 13. Data seeding dari brief PDF Jakarta One Running

- 5 etape × 5K, masing-masing 5.000 pelari, Rp195.000, COT 60 menit
- Race village 04.30–11.00, start 06.30, finish 07.30
- East (Velodrome), West (Puri Kembangan), South (Prapanca),
  North (Ancol), Central (Lapangan Banteng)
- Warna brand per etape: East=abu, West=merah, South=lime, North=cyan,
  Central=biru
- Maskot buaya + brand values: Loyal, Resilient, Strong, Patient, Adaptive
- Roadmap 5 tahun 2026–2030: MOVE → HABIT → CONNECT → EMPOWER → LEGACY
- Tagline: "One City, One Celebration"

**⚠️ Inkonsistensi di deck yang harus diklarifikasi ke klien sebelum seeding:**
slide timeline menulis West/South/North/Central di **2027**, tapi slide detail
masing-masing menulis **2026**. Beda satu tahun penuh.

Semua tanggal dibaca dari `editions.race_date` — jangan pernah hardcode di
copy mana pun.
