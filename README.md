# FITCHECK — Personal Fashion Analyzer & Digital Wardrobe

> **"Discover Your Style. Define Your Look."**

FITCHECK adalah aplikasi web **Fashion Technology** inklusif untuk laki-laki (*Men*) dan perempuan (*Women* — mendukung penuh *Hijab*, *Non-Hijab*, dan *Flexible*) yang dirancang dengan estetika **Editorial Luxury Fashion Magazine** (`#F7F5F0` Ivory, `#E8E0D5` Warm Beige, `#252525` Charcoal, `#A58E79` Taupe, serta tipografi **Playfair Display** & **Inter**).

Proyek ini dibangun sebagai produk digital *full-stack* yang siap digunakan dan dipresentasikan untuk **Proyek Akhir TKJ**.

---

## Fitur Utama (15 Spesifikasi Lengkap)

1. **Personalization Setup (Tanpa Login Email/Password)**:
   - Pemilihan profil *Laki-laki (Men)* atau *Perempuan (Women)* dengan kartu visual editorial seimbang.
   - Pemilihan umur **13–50 tahun** (dilengkapi slider, dropdown, dan matriks angka).
   - Pemilihan *multi-style* dari katalog 49+ gaya fashion.
   - Preferensi tambahan (*Hijab*, *Non-Hijab*, *Flexible / No Preference*) untuk perempuan dan kebebasan lintas-kategori penuh untuk semua gender.
   - Persistensi otomatis berbasis **Anonymous User ID** (`localStorage` + sinkronisasi **Supabase PostgreSQL RLS**), lengkap dengan fitur **Edit Fashion Profile** dan **Reset Profile**.
2. **Fashion Analyzer (Men & Women)**:
   - Unggah foto outfit dari kamera atau galeri, atau uji cepat dengan preset editorial *Men* & *Women* (termasuk *Hijab*).
   - Ekstraksi warna piksel nyata menggunakan HTML5 Canvas & deteksi kategori pakaian lengkap (*T-shirt, Shirt, Polo, Hoodie, Sweater, Jacket, Blazer, Suit, Dress, Skirt, Jeans, Trousers, Hijab, Loafers, Heels, Sneakers, Watches, Bags, Jewelry, Accessories*).
   - Penilaian terukur **0–100** dengan bobot:
     - **Color Harmony**: 30%
     - **Outfit Combination**: 30%
     - **Style Consistency**: 25%
     - **Accessories Match**: 15%
   - Mendukung **AI Vision API** (`/api/analyze-outfit` dengan Google Gemini Vision / OpenAI Vision) serta **Rule-Based Sartorial & Pixel Engine** yang jujur apabila API key belum dikonfigurasi.
3. **Complete Fashion Style Library**:
   - **14 Kelompok Gaya** (*Classic & Elegant, Minimalist, Casual, Streetwear, Feminine, Masculine, Vintage, Alternative, Artistic, Modern, Korean & Japanese, Sporty, Formal, Modest Fashion*) dengan referensi visual pria & wanita serta fitur **Create Custom Style**.
4. **Personal Color Analysis**:
   - **Personal Color Quiz** & **Photo-Based Color Assessment** (dengan penjelasan transparansi pencahayaan kamera).
   - Menentukan **Warm, Cool, atau Neutral Undertone** beserta **12 Seasonal Color Palettes** (*Light/Warm/Bright Spring, Light/Cool/Soft Summer, Soft/Warm/Deep Autumn, Bright/Cool/Deep Winter*), saran warna pakaian, dan saran warna hijab.
5. **Complete Color Library**:
   - **11 Keluarga Warna** (*Neutral, Brown, Red, Pink, Orange, Yellow, Green, Blue, Purple, Grey, Monochrome*), *Interactive Color Picker*, pencarian HEX, filter undertone, *Favorite Colors*, dan pembuatan *Custom Color*.
6. **Digital Wardrobe**:
   - CRUD penuh (*Add, Upload Photo, Edit, Delete, Search, Filter Category/Color/Style*) untuk 8 kategori: *Tops, Bottoms, Outerwear, Dresses, Shoes, Bags, Accessories, Hijab*.
7. **Outfit Generator (Mix & Match Studio)**:
   - Merakit outfit secara cerdas maupun manual **100% dari pakaian yang dimiliki pengguna di Digital Wardrobe**, difilter berdasarkan aktivitas, acara, style, dan warna, serta menyimpan *Favorite Outfits*.
8. **Style Recommendation Engine**:
   - Rekomendasi dinamis berdasarkan profil gender, umur, gaya favorit, undertone, seasonal palette, warna favorit, preferensi hijab/non-hijab, koleksi *Digital Wardrobe*, acara, dan aktivitas harian.
9. **Outfit Planner**:
   - Kalender interaktif bulanan untuk menjadwalkan outfit berdasarkan tanggal, nama acara, koleksi pakaian, dan catatan styling.
10. **Fashion History**:
    - Menyimpan riwayat lengkap hasil analisis foto outfit, skor 0–100, rincian rekomendasi, lihat detail laporan, dan hapus riwayat.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling & Editorial UI**: Tailwind CSS + Google Fonts (`Playfair Display` & `Inter`) + Lucide React Icons
- **Database & Storage**: Supabase PostgreSQL + Supabase Storage + Hybrid Local Persistence
- **Backend API**: Next.js Route Handlers (`/api/analyze-outfit`)

---

## Cara Instalasi & Menjalankan di Lokal

1. **Clone atau buka direktori proyek**:
   ```bash
   cd kassss
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables (Opsional untuk Cloud Sync & AI Vision)**:
   Salin `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   > **Catatan**: Tanpa mengisi `.env.local`, seluruh fitur aplikasi tetap berjalan 100% menggunakan *Anonymous Device Persistence* dan *Rule-Based Sartorial & Pixel Engine*.

4. **Jalankan server development**:
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browser.

---

## Konfigurasi Database Supabase (PostgreSQL & RLS)

1. Buat project baru di [Supabase](https://supabase.com).
2. Buka menu **SQL Editor** di dashboard Supabase.
3. Salin seluruh isi file [`supabase/schema.sql`](./supabase/schema.sql) dan klik **Run**.
   - Script ini otomatis membuat 11 tabel: `profiles`, `wardrobe_items`, `outfit_analyses`, `saved_outfits`, `outfit_plans`, `style_catalog`, `color_catalog`, `seasonal_palettes`, `user_color_profiles`, `user_style_preferences`, dan `style_recommendations`.
   - Mengaktifkan **Row Level Security (RLS)** menggunakan header `x-anonymous-user-id` sehingga data setiap pengguna anonim terisolasi dengan aman tanpa pernah mengekspos `SUPABASE_SERVICE_ROLE_KEY` di frontend.
4. Salin `Project URL` dan `anon public key` dari **Project Settings > API** ke `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## Konfigurasi AI Vision API (Opsional)

Untuk mengaktifkan analisis berbasis LLM Vision di `/api/analyze-outfit`:
- Isi `GEMINI_API_KEY` (Google AI Studio) atau `OPENAI_API_KEY` pada `.env.local`.
- Jika dikosongkan, FITCHECK secara jujur menampilkan label **`Rule-Based Sartorial & Pixel Engine (Honest Fallback)`** dan tetap mengevaluasi komposisi warna piksel serta harmoni pakaian secara akurat.

---

## Cara Deployment ke Vercel

1. Push repository ini ke **GitHub**.
2. Buka [Vercel](https://vercel.com) dan klik **Add New Project**.
3. Import repository GitHub **FITCHECK**.
4. Pada bagian **Environment Variables**, tambahkan variabel dari `.env.example` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `GEMINI_API_KEY` jika digunakan).
5. Klik **Deploy**. Aplikasi siap diakses secara publik!

