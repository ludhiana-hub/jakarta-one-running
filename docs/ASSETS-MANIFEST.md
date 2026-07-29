# ASSETS-MANIFEST.md — Prototype Landing Page Images

Dokumen ini menginventaris aset gambar yang diperlukan untuk landing page prototype.
Prototype bisa jalan dengan placeholder sampai aset siap, tetapi ketika presentasi ke klien,
mohon ganti placeholder dengan file final sesuai daftar ini.

## Ringkasan

Prototype mengikuti sistem glassmorphism `docs/DESIGN.md`.
Backdrop “kaya” yang diminta adalah foto pelari dengan motion blur, serta elemen medali/jersey.

## Konvensi penamaan

- Semua file taruh di:
  - `jkt-web/src/assets/prototype/`
- Nama file mengikuti key di tabel di bawah (disarankan tetap sama supaya tidak perlu refactor).

## Daftar aset yang dibutuhkan

### 1) Hero / landing backdrop

| Key | Filename (target) | Tipe | Kegunaan | Dimensi target | Catatan |
|---|---|---|---|---|---|
| heroBackdrop | `hero-backdrop.jpg` | JPG | Full-bleed background pada halaman home | TBD | Motion blur / deck asli |
| heroMedal | `hero-medal.png` | PNG (transparent) | Kartu medali kaca 3D (layer) | TBD | Jika tidak ada background transparan, sediakan versi yang sudah crop |
| heroJersey | `hero-jersey.jpg` | JPG | Panel samping / elemen dekoratif opsional | TBD | Opsional untuk prototype awal |

### 2) Gallery

| Key | Filename (target) | Tipe | Kegunaan |
|---|---|---|---|
| gallery-0..n | `gallery-01.jpg`, `gallery-02.jpg`, ... | JPG | Isi blok `gallery_grid` |

## Branding / media tambahan (opsional untuk prototype)

- sponsor logos per tier
- peta/road closure image untuk fallback Leaflet saat offline
- OG image: bisa generate nanti dari HTML/SSR saat konten sudah masuk

## Apa yang perlu Anda siapkan

1. Pastikan file hero backdrop dan medali tersedia.
2. Beri tahu dimensi asli (atau izinkan saya tentukan dengan asumsi yang wajar) supaya pemilihan aspect ratio tidak salah.

