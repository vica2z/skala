export const langs = ["id", "en"] as const;
export type Lang = (typeof langs)[number];
export type L = { en: string; id: string };

export function isLang(v: string): v is Lang {
  return (langs as readonly string[]).includes(v);
}

export function t(l: L, lang: Lang) {
  return l[lang];
}

const ui = {
  skip: { en: "Skip to main content", id: "Langsung ke konten utama" },
  banner: {
    en: "Prototype for RFT SKALA-JK/032/RFT/2026 – sample content, not the official SKALA website",
    id: "Prototipe untuk RFT SKALA-JK/032/RFT/2026 – konten contoh, bukan situs resmi SKALA",
  },
  home: { en: "Home", id: "Beranda" },
  about: { en: "About Us", id: "Tentang Kami" },
  governance: { en: "Governance Strengthening", id: "Penguatan Tata Kelola" },
  contact: { en: "Contact Us", id: "Hubungi Kami" },
  activities: { en: "Activities", id: "Kegiatan" },
  activityUpdates: { en: "Activity Updates", id: "Kabar Kegiatan" },
  announcements: { en: "Announcements", id: "Pengumuman" },
  media: { en: "Podcasts & Videos", id: "Podcast & Video" },
  publications: { en: "Publications", id: "Publikasi" },
  glossary: { en: "Glossary", id: "Glosarium" },
  opportunities: { en: "Opportunities", id: "Peluang" },
  vacancies: { en: "Vacancies", id: "Lowongan" },
  procurement: { en: "Procurement", id: "Pengadaan" },
  internship: { en: "Internship Program", id: "Program Magang" },
  search: { en: "Search", id: "Cari" },
  searchPlaceholder: { en: "Search publications, news, glossary…", id: "Cari publikasi, berita, glosarium…" },
  readMore: { en: "Read more", id: "Selengkapnya" },
  viewAll: { en: "View all", id: "Lihat semua" },
  latestPubs: { en: "Latest Publications", id: "Publikasi Terbaru" },
  latestNews: { en: "Activity Information", id: "Informasi Kegiatan" },
  whereWeWork: { en: "Where We Work", id: "Wilayah Kerja" },
  goal: { en: "Goal and End of Program Outcomes", id: "Tujuan dan Capaian Akhir Program" },
  dataSystems: { en: "Optimising Use of GoI Data and Analytics Systems", id: "Optimalisasi Sistem Data dan Analitik Pemerintah" },
  ourPodcast: { en: "Our Podcast", id: "Podcast Kami" },
  testimonials: { en: "Voices from Our Partners", id: "Suara Mitra Kami" },
  getInTouch: { en: "Let's Get in Touch", id: "Mari Terhubung" },
  whatsapp: { en: "Join our WhatsApp channel", id: "Gabung saluran WhatsApp kami" },
  filters: { en: "Filters", id: "Filter" },
  type: { en: "Type", id: "Jenis" },
  theme: { en: "Theme", id: "Tema" },
  province: { en: "Province", id: "Provinsi" },
  year: { en: "Year", id: "Tahun" },
  all: { en: "All", id: "Semua" },
  clear: { en: "Clear filters", id: "Hapus filter" },
  results: { en: "results", id: "hasil" },
  noResults: { en: "No results. Try fewer filters.", id: "Tidak ada hasil. Coba kurangi filter." },
  downloadPdf: { en: "Download PDF", id: "Unduh PDF" },
  downloadWord: { en: "Download Word", id: "Unduh Word" },
  downloads: { en: "downloads", id: "unduhan" },
  preview: { en: "Preview", id: "Pratinjau" },
  related: { en: "Related", id: "Terkait" },
  share: { en: "Share", id: "Bagikan" },
  published: { en: "Published", id: "Terbit" },
  textSize: { en: "Text size", id: "Ukuran teks" },
  managedBy: { en: "SKALA is managed by DT Global", id: "SKALA dikelola oleh DT Global" },
  prototypeBy: { en: "Prototype by", id: "Prototipe oleh" },
  partnership: {
    en: "SKALA is an Australia–Indonesia partnership programme supporting basic service delivery in subnational governments.",
    id: "SKALA adalah program kemitraan Australia–Indonesia yang mendukung percepatan layanan dasar di pemerintah daerah.",
  },
  live: { en: "Live", id: "Aktif" },
  past: { en: "Past", id: "Selesai" },
  closing: { en: "Closing", id: "Batas waktu" },
  location: { en: "Location", id: "Lokasi" },
  loadMore: { en: "Load more", id: "Muat lagi" },
  suggest: { en: "Suggest a term", id: "Usulkan istilah" },
  developers: { en: "Open Data API", id: "API Data Terbuka" },
  cms: { en: "CMS preview", id: "Pratinjau CMS" },
} satisfies Record<string, L>;

export function tr(key: keyof typeof ui, lang: Lang) {
  return ui[key][lang];
}

export function fmtDate(iso: string, lang: Lang) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
