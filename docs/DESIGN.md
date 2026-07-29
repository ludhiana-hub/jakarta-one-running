# DESIGN.md — Arah Visual Glassmorphism

> Pelengkap `CONCEPT.md`. Dokumen ini menjawab "seperti apa rupanya",
> bukan "bagaimana cara kerjanya". Berlaku untuk landing page publik
> (`jkt-web`), bukan panel admin Filament.

---

## 1. Kenapa glassmorphism cocok untuk brief ini

Brief Jakarta One Running sudah punya bahan baku yang pas untuk arah ini
tanpa dipaksakan: foto pelari dengan motion blur (sudah dipakai di deck asli
sebagai background hitam), medali fisik yang mengkilap dan berlapis
("etalase kaca"), dan lima warna etape yang perlu tampil sebagai lapisan
identitas, bukan satu warna tunggal.

Glassmorphism bekerja karena **butuh sesuatu yang kaya di baliknya** untuk
diburamkan — di sini itu foto dokumentasi lari dan gradasi warna brand,
bukan latar polos. Ini alasan fungsional, bukan tren untuk tren.

**Sanity check terhadap default AI generik:** ini BUKAN "latar nyaris hitam
dengan satu aksen neon tunggal" (pola AI generik #2) — bedanya ada di tiga
tempat: (1) aksennya bukan satu warna dekoratif, tapi lima warna yang
punya makna data nyata (satu warna = satu wilayah kota); (2) bahasa
visualnya bertumpu pada lapisan kaca tembus pandang + foto, bukan bidang
gelap datar; (3) elemen signature (§6) diturunkan langsung dari artefak
fisik di brief (medali), bukan ditempel belakangan.

---

## 2. Token sistem

### Warna dasar platform (dipakai di semua situs, terlepas dari edisi)

| Nama | Hex | Peran |
|---|---|---|
| `void` | `#0A0A0D` | Latar dasar — nyaris hitam, memberi ruang kaca untuk "mengambang" |
| `chalk` | `#F5F5F2` | Teks utama di atas latar gelap |
| `mist` | `#B8B8C0` | Teks sekunder, caption |
| `glass` | `rgba(255,255,255,0.06)` | Fill dasar permukaan kaca |
| `glass-border` | `rgba(255,255,255,0.14)` | Border tepi permukaan kaca |
| `ember` | `#FF3B4E` | Aksen platform (CTA utama, badge) — merah terang, beda dari merah edisi West |

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

Warna edisi dipakai untuk **glow di balik kaca** dan border aktif, bukan
untuk teks langsung (kontrasnya tidak semuanya aman di atas `void`).

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
400 untuk body — di atas permukaan kaca yang sudah low-contrast, teks tipis
akan sulit dibaca.

---

## 4. Spesifikasi permukaan kaca

Tiga tingkat elevasi, dipakai konsisten di seluruh situs — jangan improvisasi
nilai blur/opacity baru di tiap komponen.

| Elevasi | Dipakai untuk | `backdrop-filter` | `background` | `border` | `box-shadow` |
|---|---|---|---|---|---|
| **Tier 1 — Ambient** | Navbar, footer | `blur(12px)` | `rgba(255,255,255,0.04)` | `1px solid rgba(255,255,255,0.08)` | tidak ada |
| **Tier 2 — Card** | `stats_counter`, `sponsor_wall`, `edition_cards` | `blur(20px)` | `rgba(255,255,255,0.07)` | `1px solid rgba(255,255,255,0.14)` | `0 8px 32px rgba(0,0,0,0.25)` |
| **Tier 3 — Focal** | Kartu medali di hero, modal, `cta_banner` | `blur(28px)` | `rgba(255,255,255,0.10)` + glow warna edisi | `1px solid rgba(255,255,255,0.20)` | `0 16px 48px rgba(0,0,0,0.35), 0 0 60px var(--brand-primary-glow)` |

```css
.glass-card {
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
```

**Wajib:** tambahkan `saturate(140%)` pada tiap `backdrop-filter` — tanpa
ini, blur di atas foto berwarna akan terlihat kusam/abu-abu, bukan
"kaca bening".

**Tekstur noise tipis** (opsional tapi disarankan) di atas layer kaca
mencegah kesan blur yang terlalu digital/plastik:

```css
.glass-card::after {
  content: '';
  position: absolute; inset: 0; border-radius: inherit;
  background-image: url("data:image/svg+xml,..."); /* noise SVG tipis */
  opacity: 0.03; mix-blend-mode: overlay; pointer-events: none;
}
```

---

## 5. Konsep layout hero

```
┌──────────────────────────────────────────────────┐
│  [foto pelari motion-blur, full-bleed, gelap 60%] │
│                                                    │
│   ╭──────────────╮                                │
│   │ EARLY BIRD   │  ← Tier 3 glass, glow edisi     │
│   ╰──────────────╯                                │
│                                                    │
│         JAKARTA ONE RUNNING                       │
│         ─────────────────────                     │
│         One City, One Celebration                 │
│                                                    │
│   ╭────────╮ ╭────────╮ ╭────────╮                │
│   │ 5      │ │ 25.000 │ │ 5      │  ← Tier 2 glass │
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

- **Kontras teks**: teks di atas Tier 2/3 glass WAJIB dites dengan warna
  latar **paling terang** yang mungkin ada di baliknya (foto siang hari),
  bukan cuma warna glass fill-nya. Kalau perlu, tambahkan
  `background: rgba(0,0,0,0.3)` ekstra di belakang teks penting (harga,
  tanggal, CTA) sebelum layer glass.
- **Focus state**: outline solid 2px warna `ember`, BUKAN cuma perubahan
  opacity — blur bisa membuat perubahan opacity tidak terlihat jelas bagi
  pengguna low-vision.
- **`prefers-reduced-motion: reduce`**: matikan semua transform/rotate,
  sisakan fade sederhana.
- **Fallback tanpa `backdrop-filter`**: Safari lama & beberapa Android
  WebView tidak mendukung. Sediakan `background: rgba(15,15,18,0.85)` solid
  sebagai fallback lewat `@supports not (backdrop-filter: blur(1px))`.

---

## 9. Implementasi Tailwind

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      void: '#0A0A0D',
      chalk: '#F5F5F2',
      mist: '#B8B8C0',
      ember: '#FF3B4E',
    },
    fontFamily: {
      display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
      body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
    },
    backdropBlur: { card: '20px', focal: '28px', ambient: '12px' },
    boxShadow: {
      card: '0 8px 32px rgba(0,0,0,0.25)',
      focal: '0 16px 48px rgba(0,0,0,0.35)',
    },
  },
}
```

Utility class siap pakai di komponen blok Angular:

```html
<div class="backdrop-blur-card bg-white/[0.07] border border-white/[0.14]
            rounded-[20px] shadow-card">
  ...
</div>
```

---

## 10. Yang tidak boleh terjadi

- Jangan pakai glass di **semua** elemen — teks panjang (`legal_document`,
  `rich_text_media`) tetap latar solid `void` polos, kaca cuma untuk kartu
  ringkas dan elemen fokus. Glass di teks panjang bikin lelah dibaca.
- Jangan biarkan warna edisi bocor ke teks body — dia cuma boleh muncul di
  glow, border, dan badge kecil.
- Jangan tambah animasi baru tanpa alasan yang bisa dijelaskan dalam satu
  kalimat kenapa itu membantu, bukan sekadar "biar rame".
