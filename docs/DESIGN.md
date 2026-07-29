# DESIGN.md — Arah Visual Clean Frost (Light Glassmorphism)

> Pelengkap `CONCEPT.md`. Dokumen ini menjawab "seperti apa rupanya",
> bukan "bagaimana cara kerjanya". Berlaku untuk landing page publik
> (`jkt-web`), bukan panel admin Filament.
>
> Spec detail: `docs/superpowers/specs/2026-07-29-clean-frost-light-theme-design.md`.

---

## 1. Kenapa glassmorphism cocok untuk brief ini

Brief Jakarta One Running punya bahan baku yang pas: foto dokumentasi lari,
medali fisik yang mengkilap ("etalase kaca"), dan lima warna etape sebagai
lapisan identitas. Arah **Clean Frost** memakai foundation **putih /
off-white** agar terasa clean untuk client, dengan panel kaca putih frosted
yang tetap terbaca di canvas terang.

Glassmorphism tetap bekerja karena **butuh lapisan di baliknya** — di sini
itu atmosphere mesh ringan + foto hero + shadow lembut, bukan flat putih
mati.

**Sanity check terhadap default AI generik:** bukan ungu-on-white, bukan
cream/terracotta editorial, bukan dark neon. (1) aksen = lima warna etape
nyata + merah brand selektif; (2) bahasa visual = kaca putih frosted di atas
base `#F7F8FA`; (3) signature medali (§6) tetap relevan sebagai artefak fisik.

---

## 2. Token sistem

### Warna dasar platform (dipakai di semua situs, terlepas dari edisi)

| Nama | Hex / value | Peran |
|---|---|---|
| `void` | `#F7F8FA` | Latar dasar — off-white dingin (canvas halaman) |
| `chalk` | `#141418` | Teks utama / heading (ink gelap) |
| `mist` | `#5C5C66` | Teks sekunder, caption |
| `glass` | `rgba(255,255,255,0.65)` | Fill dasar permukaan kaca |
| `glass-border` | `rgba(20,20,24,0.10)` | Border tepi kaca (terlihat di putih) |
| `ember` | `#FF525C` | Aksen platform (CTA utama, badge) — merah terang, beda dari merah edisi West |

### Aksen per edisi (tenant override — sudah ditetapkan dari brief)

Ini **bukan** bagian dari 6 warna dasar di atas — ini variabel yang
disuntikkan per tenant lewat CSS custom property, mengikuti pola theming
yang sudah dirancang di `CONCEPT.md`.

| Edisi | Hex | Catatan |
|---|---|---|
| East | `#8C8C8C` | Abu netral |
| West | `#CC0000` | Merah |
| South | `#C4D600` | Lime/chartreuse |
| North | `#4DD0E1` | Cyan |
| Central | `#0072B5` | Biru |

```css
:root {
  --brand-primary: #CC0000;           /* diisi dari data edisi aktif */
  --brand-primary-glow: color-mix(in srgb, var(--brand-primary) 40%, transparent);
}
```

Warna edisi dipakai untuk **border aktif, glow lembut, dan badge**, bukan
untuk teks body panjang (uji kontras di atas base putih / glass putih).

---

## 3. Tipografi

| Peran | Font | Sumber | Alasan |
|---|---|---|---|
| Display (judul besar) | **Bricolage Grotesque** | Google Fonts, variable | Grotesk dengan karakter organik-tegas, terasa dinamis untuk headline besar tanpa jatuh ke default "Space Grotesk" yang sudah terlalu sering dipakai AI |
| Body (paragraf, UI) | **Plus Jakarta Sans** | Google Fonts, variable | Dipilih sengaja karena namanya — cocok dengan identitas Jakarta, geometris hangat, dukungan render Latin+diakritik bagus untuk ID/EN bilingual |
| Data/angka (countdown, stats, race number) | **IBM Plex Mono** | Google Fonts | Tabular figures rapi untuk angka yang berubah (countdown, jarak, harga) — angka tidak "bergeser" saat berganti |

```css
--font-display: 'Bricolage Grotesque', system-ui, sans-serif;
--font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
--font-mono: 'IBM Plex Mono', ui-monospace, monospace;
```

**Skala tipe** (rem, base 16px):

```
--text-xs: 0.75rem;    --text-sm: 0.875rem;   --text-base: 1rem;
--text-lg: 1.125rem;   --text-xl: 1.5rem;     --text-2xl: 2rem;
--text-3xl: 2.75rem;   --text-4xl: 3.75rem;   --text-5xl: 5rem;
```

Display pakai weight 600–800, body 400–500. Jangan pakai weight di bawah
400 untuk body — di atas glass putih soft-shadow, teks tipis kurang terbaca.

---

## 4. Spesifikasi permukaan kaca (Clean Frost)

Tiga tingkat elevasi — di atas base terang, fill putih harus **cukup
opaque** agar panel terbaca (bukan 4–8% seperti tema gelap).

| Elevasi | Dipakai untuk | `backdrop-filter` | `background` | `border` | `box-shadow` |
|---|---|---|---|---|---|
| **Tier 1 — Ambient** | Navbar, footer | `blur(12px)` | `rgba(255,255,255,0.55)` | `1px solid rgba(20,20,24,0.08)` | sangat lembut / tidak ada |
| **Tier 2 — Card** | `stats_counter`, `sponsor_wall`, `edition_cards` | `blur(20px)` | `rgba(255,255,255,0.68)` | `1px solid rgba(20,20,24,0.10)` | `0 8px 28px rgba(20,20,24,0.08)` |
| **Tier 3 — Focal** | Modal, `cta_banner` | `blur(28px)` | `rgba(255,255,255,0.78)` + glow brand lembut | `1px solid rgba(20,20,24,0.12)` | `0 12px 36px rgba(20,20,24,0.10), 0 0 40px var(--brand-primary-glow)` |

```css
.glass-card {
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(20, 20, 24, 0.10);
  border-radius: 20px;
  box-shadow: 0 8px 28px rgba(20, 20, 24, 0.08);
}
```

**Wajib:** `saturate(140%)` pada tiap `backdrop-filter`.

**Noise tipis** di atas kaca — opacity ~0.015 agar tidak “kotor” di putih:

```css
.glass-card::after {
  content: '';
  position: absolute; inset: 0; border-radius: inherit;
  background-image: url("data:image/svg+xml,..."); /* noise SVG tipis */
  opacity: 0.015; mix-blend-mode: multiply; pointer-events: none;
}
```

---

## 5. Konsep layout hero

```
┌──────────────────────────────────────────────────┐
│  [foto full-bleed → fade ke void off-white]        │
│                                                    │
│   ╭──────────────╮                                │
│   │ EARLY BIRD   │  ← badge + glass putih frosted   │
│   ╰──────────────╯                                │
│                                                    │
│         JAKARTA ONE RUNNING  (ink chalk)            │
│         ─────────────────────                     │
│         One City, One Celebration                 │
│                                                    │
│   ╭────────╮ ╭────────╮ ╭────────╮                │
│   │ 5      │ │ 25.000 │ │ 5      │  ← Tier 2 frost │
│   │ RUTE   │ │ PELARI │ │ MEDALI │    berjajar     │
│   ╰────────╯ ╰────────╯ ╰────────╯                │
└──────────────────────────────────────────────────┘
```

Kartu stats **tidak menempel rata** — beri variasi tinggi/offset kecil
antar-kartu (translateY 8–16px berselang) supaya terasa "melayang", bukan
grid kaku. Ini satu-satunya tempat bermain dengan asimetri; area lain tetap
grid disiplin.

---

## 6. Elemen signature: kartu medali kaca yang reaktif warna

Satu elemen yang bikin situs ini diingat: **medali finisher dirender
sebagai kartu kaca 3D ringan** (CSS 3D transform, bukan library berat) yang
melayang di hero halaman edisi (`edition_detail`), berputar pelan mengikuti
posisi kursor/scroll, dan **glow di baliknya berganti warna sesuai edisi
yang sedang dibuka** — abu di halaman East, merah di West, dst.

Ini bukan dekorasi acak: medali memang objek fisik paling ikonik di brief
(dua slide penuh soal medali & jersey), dan sifat kaca-berlapis medali asli
selaras langsung dengan bahasa material glassmorphism yang dipakai di
seluruh situs — bukan motif terpisah yang ditempel.

```css
.medal-glass {
  transform: perspective(800px) rotateY(calc(var(--mouse-x, 0) * 6deg));
  transition: transform 0.3s ease-out;
  filter: drop-shadow(0 0 40px var(--brand-primary-glow));
}
```

Hormati `prefers-reduced-motion` — matikan rotasi, sisakan glow statis.

---

## 7. Motion — satu momen terorkestrasi, bukan taburan efek

- **Page load**: kartu stats di hero muncul berurutan (stagger 80ms),
  bukan sekaligus. Ini satu-satunya sequence load yang diorkestrasi.
- **Scroll reveal**: blok di bawah lipatan fade + translateY(16px) sekali
  saat masuk viewport — jangan diulang tiap scroll naik-turun.
- **Hover**: kartu kaca naik `translateY(-4px)` + border sedikit lebih
  terang. Tidak ada efek lain.
- **Yang TIDAK dipakai**: parallax berlapis-lapis, cursor-follow blob,
  efek partikel. Brief ini tentang kejelasan jadwal & rute, bukan
  showcase teknis — motion berlebih justru mengaburkan informasi yang
  harus dibaca cepat (jadwal, harga, kuota).

---

## 8. Aksesibilitas — non-negotiable untuk glassmorphism

Glass paling sering gagal di sini, jadi ditulis eksplisit:

- **Kontras teks**: `chalk` ink di atas Tier 2/3 glass WAJIB tetap terbaca
  di atas foto terang; kalau hero foto terlalu ramai, fade scrim ke `void`
  atau zone solid lembut di belakang judul.
- **Focus state**: outline solid 2px warna `ember`, BUKAN cuma perubahan
  opacity.
- **`prefers-reduced-motion: reduce`**: matikan semua transform/rotate,
  sisakan fade sederhana.
- **Fallback tanpa `backdrop-filter`**: `background: rgba(255,255,255,0.92)`
  solid lewat `@supports not (backdrop-filter: blur(1px))`.

---

## 9. Implementasi Tailwind (via `@theme` di `tokens.css`)

Token Live di `jkt-web/src/styles/tokens.css` — utility: `bg-void`,
`text-chalk`, `text-mist`, `bg-glass`, `border-glass-border`, `glass-tier-*`.

```html
<div class="glass-tier-2 rounded-[20px] border border-glass-border shadow-card">
  ...
</div>
```

Hindari `border-white/*` dan `bg-black/*` untuk chrome — gunakan
`border-glass-border` / `hover:bg-black/5` di light theme.

---

## 10. Yang tidak boleh terjadi

- Jangan pakai glass di **semua** elemen — teks panjang (`legal_document`,
  `rich_text_media`) boleh canvas `void` polos; kaca untuk kartu ringkas dan
  elemen fokus.
- Jangan biarkan warna edisi bocor ke teks body — dia cuma boleh muncul di
  glow, border, dan badge kecil.
- Jangan tambah animasi baru tanpa alasan yang bisa dijelaskan dalam satu
  kalimat kenapa itu membantu, bukan sekadar "biar rame".
- Jangan kembalikan base gelap tanpa keputusan produk eksplisit — arah
  canonical sekarang Clean Frost.
