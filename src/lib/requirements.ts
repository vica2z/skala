import type { L } from "./i18n";

export type Req = { title: L; need: L; how: L; ref: string };

// What each prototype feature does for SKALA's stated needs (RFT032 TOR and Addendum No. 1).
export const reqs = {
  bilingual: {
    title: { en: "Bilingual site (Bahasa Indonesia / English)", id: "Situs dwibahasa (Indonesia / Inggris)" },
    need: { en: "All content in Bahasa Indonesia and English, with a language switch and a translation workflow.", id: "Seluruh konten dalam bahasa Indonesia dan Inggris, dengan pengalih bahasa dan alur kerja terjemahan." },
    how: { en: "Every page has its own /id/ and /en/ address. The switch keeps you on the same page and keeps your filters.", id: "Setiap halaman punya alamat /id/ dan /en/ sendiri. Pengalih tetap di halaman yang sama dan mempertahankan filter Anda." },
    ref: "TOR – Bilingual content management",
  },
  textSize: {
    title: { en: "Adjustable text size", id: "Ukuran teks dapat diatur" },
    need: { en: "WCAG 2.2 AA accessibility, including adjustable text for low-vision users.", id: "Aksesibilitas WCAG 2.2 AA, termasuk teks yang dapat diperbesar untuk pengguna low vision." },
    how: { en: "A-/A+ resizes the whole site and remembers the choice. Built into the site, not a third-party widget.", id: "A-/A+ mengubah ukuran seluruh situs dan mengingat pilihan. Bawaan situs, bukan widget pihak ketiga." },
    ref: "TOR – Accessibility (WCAG 2.2 AA)",
  },
  siteSearch: {
    title: { en: "Site-wide search", id: "Pencarian seluruh situs" },
    need: { en: "Full-text search across the website, ready for AI-enabled search later.", id: "Pencarian teks lengkap di seluruh situs, siap untuk pencarian berbasis AI di kemudian hari." },
    how: { en: "One search box covers publications, news and the glossary, with results grouped by type.", id: "Satu kotak pencarian mencakup publikasi, berita, dan glosarium, dengan hasil dikelompokkan per jenis." },
    ref: "TOR – Search; Addendum No. 1 (AI-ready, not built now)",
  },
  navigation: {
    title: { en: "Same structure as today, new design", id: "Struktur sama, desain baru" },
    need: { en: "Keep the current pages and information, with a new look and feel that follows SKALA branding.", id: "Mempertahankan halaman dan informasi saat ini, dengan tampilan baru sesuai identitas SKALA." },
    how: { en: "The menu mirrors skala.or.id (Home, Activities, Publications, Glossary, Opportunities). Menus work with keyboard and on mobile.", id: "Menu mengikuti skala.or.id (Beranda, Kegiatan, Publikasi, Glosarium, Peluang). Menu dapat dipakai dengan keyboard dan di ponsel." },
    ref: "Addendum No. 1 – design mock-up; TOR – Information architecture",
  },
  responsive: {
    title: { en: "Fully responsive", id: "Sepenuhnya responsif" },
    need: { en: "Layout, images and navigation adapt to desktop, tablet and mobile.", id: "Tata letak, gambar, dan navigasi menyesuaikan desktop, tablet, dan ponsel." },
    how: { en: "Mobile-first layout with a compact menu; fast loading for Core Web Vitals 'good' on mobile.", id: "Tata letak mobile-first dengan menu ringkas; pemuatan cepat untuk Core Web Vitals 'baik' di ponsel." },
    ref: "TOR – Responsive design; performance targets",
  },
  repository: {
    title: { en: "Publication repository", id: "Repositori publikasi" },
    need: { en: "Faceted filters, full-text search, document previews, download tracking and SKALA One taxonomy.", id: "Filter bertingkat, pencarian teks lengkap, pratinjau dokumen, pelacakan unduhan, dan taksonomi SKALA One." },
    how: { en: "Filter by type, theme, province and year, plus search. Filters are kept in the web address, so a filtered list can be shared.", id: "Saring berdasarkan jenis, tema, provinsi, dan tahun, ditambah pencarian. Filter tersimpan di alamat web sehingga daftar dapat dibagikan." },
    ref: "TOR – Publication repository",
  },
  pubTypes: {
    title: { en: "All 8 publication types", id: "Semua 8 jenis publikasi" },
    need: { en: "Migrate every existing publication category without losing content.", id: "Memigrasikan semua kategori publikasi tanpa kehilangan konten." },
    how: { en: "Briefs, Infographics, Lessons Learned, Newsletter, Provincial Profiles, Reports, Strategies and Stories each keep their own page.", id: "Ringkasan, Infografis, Pembelajaran, Buletin, Profil Provinsi, Laporan, Strategi, dan Cerita masing-masing punya halaman sendiri." },
    ref: "TOR – Content migration",
  },
  preview: {
    title: { en: "Preview before download", id: "Pratinjau sebelum mengunduh" },
    need: { en: "Document previews in the publication repository.", id: "Pratinjau dokumen di repositori publikasi." },
    how: { en: "The PDF opens in the page, so readers check it before downloading. The current site has no preview.", id: "PDF terbuka di halaman sehingga pembaca dapat memeriksa sebelum mengunduh. Situs saat ini tidak punya pratinjau." },
    ref: "TOR – Publication repository",
  },
  downloads: {
    title: { en: "Download tracking", id: "Pelacakan unduhan" },
    need: { en: "Track downloads for reporting.", id: "Melacak unduhan untuk pelaporan." },
    how: { en: "PDF and Word buttons with a counter per document, reported monthly.", id: "Tombol PDF dan Word dengan penghitung per dokumen, dilaporkan setiap bulan." },
    ref: "TOR – Publication repository; monthly reports",
  },
  metadata: {
    title: { en: "SKALA One metadata", id: "Metadata SKALA One" },
    need: { en: "Import taxonomy and publication metadata from SKALA One and keep SKALA One IDs.", id: "Mengimpor taksonomi dan metadata publikasi dari SKALA One serta mempertahankan ID SKALA One." },
    how: { en: "Every item carries its SKALA One ID and schema.org data, so search engines and future AI tools understand it.", id: "Setiap item membawa ID SKALA One dan data schema.org, sehingga mesin pencari dan alat AI dapat memahaminya." },
    ref: "Addendum No. 1 – SKALA One integration",
  },
  share: {
    title: { en: "Social sharing", id: "Berbagi ke media sosial" },
    need: { en: "Social share buttons and sharing metadata.", id: "Tombol berbagi dan metadata untuk media sosial." },
    how: { en: "WhatsApp, Facebook, X and email, with titles set for each language.", id: "WhatsApp, Facebook, X, dan email, dengan judul sesuai bahasa." },
    ref: "TOR – Social media integration",
  },
  related: {
    title: { en: "Related content", id: "Konten terkait" },
    need: { en: "Help users find more relevant knowledge products.", id: "Membantu pengguna menemukan produk pengetahuan yang relevan." },
    how: { en: "Related items are suggested by theme and type. The current site shows none.", id: "Item terkait disarankan berdasarkan tema dan jenis. Situs saat ini tidak menampilkannya." },
    ref: "TOR – User experience",
  },
  news: {
    title: { en: "Activity updates and announcements", id: "Kabar kegiatan dan pengumuman" },
    need: { en: "News and activity listings, updated by SKALA's team without taking the site offline.", id: "Daftar berita dan kegiatan, diperbarui tim SKALA tanpa mematikan situs." },
    how: { en: "Listing and article pages with date, theme, photo gallery and sharing.", id: "Halaman daftar dan artikel dengan tanggal, tema, galeri foto, dan berbagi." },
    ref: "TOR – Content features",
  },
  map: {
    title: { en: "Where We Work map", id: "Peta wilayah kerja" },
    need: { en: "Show SKALA's partner provinces and link to provincial profiles.", id: "Menampilkan provinsi mitra dan menautkan ke profil provinsi." },
    how: { en: "Select a province to open its profile with indicators, publications and news.", id: "Pilih provinsi untuk membuka profilnya berisi indikator, publikasi, dan berita." },
    ref: "TOR – Provincial profile pages",
  },
  provinces: {
    title: { en: "Provincial profile pages", id: "Halaman profil provinsi" },
    need: { en: "Provincial profile pages, with data visualisations embedded at launch.", id: "Halaman profil provinsi, dengan visualisasi data tersemat sejak peluncuran." },
    how: { en: "Each province shows key indicators as charts, plus its publications and activities.", id: "Setiap provinsi menampilkan indikator utama sebagai grafik, serta publikasi dan kegiatannya." },
    ref: "TOR – Provincial profiles; Addendum No. 1 – data visualisation",
  },
  outcomes: {
    title: { en: "Programme goal and outcomes", id: "Tujuan dan capaian program" },
    need: { en: "Explain SKALA's goal and End of Program Outcomes clearly.", id: "Menjelaskan tujuan dan capaian akhir program SKALA dengan jelas." },
    how: { en: "Outcomes open and close in place, so the page stays short and readable.", id: "Capaian dapat dibuka-tutup di tempat, sehingga halaman tetap ringkas." },
    ref: "TOR – Existing content",
  },
  dataSystems: {
    title: { en: "Government data systems", id: "Sistem data pemerintah" },
    need: { en: "Show the GoI data and analytics systems SKALA supports.", id: "Menampilkan sistem data dan analitik pemerintah yang didukung SKALA." },
    how: { en: "Kept from the current homepage; each item can link to the system or a story about it.", id: "Dipertahankan dari beranda saat ini; setiap item dapat ditautkan ke sistem atau ceritanya." },
    ref: "TOR – Existing content",
  },
  podcast: {
    title: { en: "Podcast gallery", id: "Galeri podcast" },
    need: { en: "Podcast gallery with an accessible player.", id: "Galeri podcast dengan pemutar yang aksesibel." },
    how: { en: "Episode pages with guests, length, an embedded player and a transcript for deaf and hard-of-hearing users.", id: "Halaman episode dengan narasumber, durasi, pemutar tersemat, dan transkrip untuk pengguna Tuli." },
    ref: "TOR – Podcast and video galleries; accessibility",
  },
  video: {
    title: { en: "Video gallery", id: "Galeri video" },
    need: { en: "Video gallery; videos stay on SKALA's YouTube with captions.", id: "Galeri video; video tetap di YouTube SKALA dengan teks." },
    how: { en: "Videos are embedded from YouTube and filtered by category. No re-hosting, so no extra storage cost.", id: "Video disematkan dari YouTube dan disaring per kategori. Tanpa hosting ulang, tanpa biaya penyimpanan." },
    ref: "TOR – Video gallery; Addendum No. 1",
  },
  testimonials: {
    title: { en: "Partner voices", id: "Suara mitra" },
    need: { en: "Keep testimonials from government partners.", id: "Mempertahankan testimoni dari mitra pemerintah." },
    how: { en: "Managed in the CMS like any other content, in both languages.", id: "Dikelola di CMS seperti konten lain, dalam dua bahasa." },
    ref: "TOR – Existing content",
  },
  whatsapp: {
    title: { en: "WhatsApp channel and newsletter", id: "Saluran WhatsApp dan buletin" },
    need: { en: "Newsletter and WhatsApp channel integration.", id: "Integrasi buletin dan saluran WhatsApp." },
    how: { en: "A clear call to join the WhatsApp channel on every key page.", id: "Ajakan jelas untuk bergabung ke saluran WhatsApp di setiap halaman utama." },
    ref: "TOR – Newsletter and WhatsApp integration",
  },
  glossary: {
    title: { en: "Glossary with instant search", id: "Glosarium dengan pencarian instan" },
    need: { en: "Migrate the glossary (about 900 acronyms) and keep it easy to use.", id: "Memigrasikan glosarium (sekitar 900 singkatan) dan memudahkan penggunaannya." },
    how: { en: "A–Z plus instant search. The current glossary has no search box. Each term shows the Indonesian term and its English meaning.", id: "A–Z ditambah pencarian instan. Glosarium saat ini tidak punya kotak pencarian. Setiap istilah menampilkan istilah Indonesia dan artinya dalam bahasa Inggris." },
    ref: "TOR – Glossary",
  },
  suggest: {
    title: { en: "Suggest and revise terms", id: "Usulkan dan revisi istilah" },
    need: { en: "Keep the Suggest & Revise feature for the glossary.", id: "Mempertahankan fitur Usulkan & Revisi glosarium." },
    how: { en: "Suggestions go to the KM team's review queue in the CMS before publishing.", id: "Usulan masuk ke antrean tinjauan tim KM di CMS sebelum terbit." },
    ref: "TOR – Glossary; editorial workflow",
  },
  procurement: {
    title: { en: "Procurement module", id: "Modul pengadaan" },
    need: { en: "Procurement announcements with live and past tenders.", id: "Pengumuman pengadaan dengan tender aktif dan selesai." },
    how: { en: "Live and Past tabs, closing dates, and a tender page with documents. Past tenders move automatically after closing.", id: "Tab Aktif dan Selesai, batas waktu, dan halaman tender dengan dokumen. Tender pindah otomatis setelah ditutup." },
    ref: "TOR – Procurement and career modules",
  },
  vacancies: {
    title: { en: "Vacancies via DT Global", id: "Lowongan melalui DT Global" },
    need: { en: "Careers and procurement are text pages that link out to DT Global (Taleo); no files uploaded to our server.", id: "Karier dan pengadaan berupa halaman teks yang menaut ke DT Global (Taleo); tidak ada berkas diunggah ke server kami." },
    how: { en: "Vacancies link straight to DT Global's careers portal.", id: "Lowongan langsung menaut ke portal karier DT Global." },
    ref: "Addendum No. 1",
  },
  contactForm: {
    title: { en: "Contact form with consent", id: "Formulir kontak dengan persetujuan" },
    need: { en: "Contact forms with validation, anti-spam and UU PDP No. 27/2022 compliance.", id: "Formulir kontak dengan validasi, anti-spam, dan kepatuhan UU PDP No. 27/2022." },
    how: { en: "Required fields, an explicit privacy consent box, and anti-spam on submission.", id: "Kolom wajib, kotak persetujuan privasi yang jelas, dan anti-spam saat kirim." },
    ref: "TOR – Security and data protection",
  },
  governance: {
    title: { en: "Interactive governance cycle", id: "Siklus tata kelola interaktif" },
    need: { en: "Rebuild the interactive Governance Strengthening page without losing function.", id: "Membangun ulang halaman Penguatan Tata Kelola yang interaktif tanpa kehilangan fungsi." },
    how: { en: "Eight clickable steps, each opening its explanation and video. Works with keyboard and screen readers.", id: "Delapan langkah yang dapat diklik, masing-masing membuka penjelasan dan video. Dapat dipakai dengan keyboard dan pembaca layar." },
    ref: "TOR – Existing features rebuilt",
  },
  cms: {
    title: { en: "Editorial workflow (CMS)", id: "Alur kerja editorial (CMS)" },
    need: { en: "Roles for admin, editor, author and reviewer/translator; draft, review, publish; scheduling, revision history, audit log.", id: "Peran admin, editor, penulis, dan peninjau/penerjemah; draf, tinjau, terbit; penjadwalan, riwayat revisi, log audit." },
    how: { en: "A headless CMS (not WordPress) with status, translation status per language, roles and a full audit log.", id: "CMS headless (bukan WordPress) dengan status, status terjemahan per bahasa, peran, dan log audit lengkap." },
    ref: "TOR – Editorial workflow; Addendum No. 1 (no WordPress)",
  },
  api: {
    title: { en: "Open data API and RSS", id: "API data terbuka dan RSS" },
    need: { en: "A documented, versioned, read-only API and RSS for the Knowledge Management Centre (Bappenas); AI-ready.", id: "API baca-saja yang terdokumentasi dan berversi serta RSS untuk Pusat Manajemen Pengetahuan (Bappenas); siap AI." },
    how: { en: "/api/v1/publications returns JSON in either language with SKALA One IDs. Try it live from this page.", id: "/api/v1/publications mengembalikan JSON dalam salah satu bahasa dengan ID SKALA One. Coba langsung dari halaman ini." },
    ref: "TOR – APIs and AI-readiness; Addendum No. 1 (KMC)",
  },
  privacy: {
    title: { en: "Privacy and data protection", id: "Privasi dan perlindungan data" },
    need: { en: "Privacy policy and cookie consent under UU PDP No. 27/2022 and DT Global/DFAT rules.", id: "Kebijakan privasi dan persetujuan cookie sesuai UU PDP No. 27/2022 serta aturan DT Global/DFAT." },
    how: { en: "A plain-language policy in both languages, linked from every page.", id: "Kebijakan dengan bahasa sederhana dalam dua bahasa, ditautkan dari setiap halaman." },
    ref: "TOR – Data protection",
  },
  accessibility: {
    title: { en: "Accessibility statement", id: "Pernyataan aksesibilitas" },
    need: { en: "WCAG 2.2 AA and DFAT universal design; testing with persons with disabilities.", id: "WCAG 2.2 AA dan desain universal DFAT; pengujian bersama penyandang disabilitas." },
    how: { en: "Skip link, keyboard menus, labels, strong contrast and a public statement with a feedback contact.", id: "Tautan lompat, menu keyboard, label, kontras kuat, dan pernyataan publik dengan kontak masukan." },
    ref: "TOR – Accessibility",
  },
  internship: {
    title: { en: "Internship programme page", id: "Halaman program magang" },
    need: { en: "Keep the Internship Program content from the current site.", id: "Mempertahankan konten Program Magang dari situs saat ini." },
    how: { en: "Key facts, eligibility and the selection steps on one clear page.", id: "Fakta utama, persyaratan, dan tahapan seleksi dalam satu halaman yang jelas." },
    ref: "TOR – Existing content",
  },
} satisfies Record<string, Req>;

export type ReqKey = keyof typeof reqs;
