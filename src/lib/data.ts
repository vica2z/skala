import type { L } from "./i18n";

// Sample content for the prototype. Titles follow the style of the current site; texts are illustrative.

export type PubType =
  | "briefs" | "infographics" | "lessons-learned" | "newsletter"
  | "provincial-profiles" | "reports" | "strategies" | "stories";

export const pubTypes: Record<PubType, L> = {
  briefs: { en: "Briefs", id: "Ringkasan" },
  infographics: { en: "Infographics", id: "Infografis" },
  "lessons-learned": { en: "Lessons Learned", id: "Pembelajaran" },
  newsletter: { en: "Newsletter", id: "Buletin" },
  "provincial-profiles": { en: "Provincial Profiles", id: "Profil Provinsi" },
  reports: { en: "Reports", id: "Laporan" },
  strategies: { en: "Strategies", id: "Strategi" },
  stories: { en: "Stories from the Field", id: "Cerita dari Lapangan" },
};

export const themes: Record<string, L> = {
  data: { en: "Data & Analytics", id: "Data & Analitik" },
  pfm: { en: "Public Financial Management", id: "Pengelolaan Keuangan Publik" },
  mss: { en: "Minimum Service Standards", id: "Standar Pelayanan Minimal" },
  gedsi: { en: "GEDSI", id: "GEDSI" },
  grb: { en: "Gender Responsive Budgeting", id: "Anggaran Responsif Gender" },
  djpk: { en: "Fiscal Transfers (DJPK)", id: "Transfer Fiskal (DJPK)" },
};

export type Province = { slug: string; name: L; lat: number; lng: number; districts: number; focus: L };
export const provinces: Province[] = [
  { slug: "aceh", name: { en: "Aceh", id: "Aceh" }, lat: 4.7, lng: 96.7, districts: 23, focus: { en: "Village data governance", id: "Tata kelola data desa" } },
  { slug: "north-kalimantan", name: { en: "North Kalimantan", id: "Kalimantan Utara" }, lat: 3.1, lng: 116.0, districts: 5, focus: { en: "Planning and budgeting", id: "Perencanaan dan penganggaran" } },
  { slug: "gorontalo", name: { en: "Gorontalo", id: "Gorontalo" }, lat: 0.7, lng: 122.4, districts: 6, focus: { en: "Poverty data", id: "Data kemiskinan" } },
  { slug: "south-sulawesi", name: { en: "South Sulawesi", id: "Sulawesi Selatan" }, lat: -3.7, lng: 120.0, districts: 24, focus: { en: "Minimum service standards", id: "Standar pelayanan minimal" } },
  { slug: "ntb", name: { en: "West Nusa Tenggara", id: "Nusa Tenggara Barat" }, lat: -8.65, lng: 117.4, districts: 10, focus: { en: "Executive dashboards", id: "Dasbor eksekutif" } },
  { slug: "ntt", name: { en: "East Nusa Tenggara", id: "Nusa Tenggara Timur" }, lat: -8.7, lng: 121.1, districts: 22, focus: { en: "Gender responsive budgeting", id: "Anggaran responsif gender" } },
  { slug: "maluku", name: { en: "Maluku", id: "Maluku" }, lat: -3.2, lng: 130.1, districts: 11, focus: { en: "Island service delivery", id: "Layanan wilayah kepulauan" } },
  { slug: "north-maluku", name: { en: "North Maluku", id: "Maluku Utara" }, lat: 1.6, lng: 127.8, districts: 10, focus: { en: "Fiscal transfers", id: "Transfer fiskal" } },
  { slug: "papua", name: { en: "Papua", id: "Papua" }, lat: -2.5, lng: 140.7, districts: 9, focus: { en: "Beneficiary data (SIO Papua)", id: "Data penerima manfaat (SIO Papua)" } },
  { slug: "west-papua", name: { en: "West Papua", id: "Papua Barat" }, lat: -1.3, lng: 133.2, districts: 7, focus: { en: "Planning data", id: "Data perencanaan" } },
  { slug: "central-papua", name: { en: "Central Papua", id: "Papua Tengah" }, lat: -3.9, lng: 136.4, districts: 8, focus: { en: "New province set-up", id: "Pembentukan provinsi baru" } },
  { slug: "highland-papua", name: { en: "Highland Papua", id: "Papua Pegunungan" }, lat: -4.1, lng: 138.9, districts: 8, focus: { en: "Basic services access", id: "Akses layanan dasar" } },
];

export type Publication = {
  slug: string; type: PubType; theme: string; province?: string; date: string;
  title: L; summary: L; downloads: number; skalaOneId: string; pages: number;
};

const pubSeed: [PubType, string, string | undefined, string, string, string, string, string][] = [
  ["stories", "data", "aceh", "2026-09-28", "sigap-drives-data-governance-in-aceh", "SIGAP Drives Data Governance in Aceh", "SIGAP Dorong Tata Kelola Data di Aceh", "How Aceh's village data application improves targeting of social assistance."],
  ["stories", "mss", "maluku", "2026-08-30", "navigating-the-waves", "Navigating the Waves, Reaching the Community", "Mengarungi Ombak, Menjangkau Masyarakat", "Delivering basic services across Maluku's islands."],
  ["stories", "data", "papua", "2026-07-21", "sio-papua-beneficiary-data", "SIO Papua Strengthens Beneficiary Data for 14,000 New Homes", "SIO Papua Perkuat Data Penerima Manfaat untuk 14.000 Rumah Baru", "A provincial information system that links housing aid to verified data."],
  ["stories", "data", undefined, "2026-06-12", "campus-data-insight", "Campus Data Insight: Students as Data Trailblazers", "Campus Data Insight: Mahasiswa Pelopor Data", "University students learn to turn public data into policy insight."],
  ["briefs", "pfm", undefined, "2026-10-14", "regional-budget-quality-2026", "Improving the Quality of Regional Budgets", "Meningkatkan Kualitas Anggaran Daerah", "Key findings on regional budget allocation for basic services."],
  ["briefs", "djpk", "north-maluku", "2026-09-02", "responsive-central-funding", "Making Central Funding More Responsive to Geographic Challenges", "Membuat Pendanaan Pusat Lebih Responsif terhadap Tantangan Geografis", "Options for fiscal transfer formulas in archipelagic regions."],
  ["briefs", "grb", "ntt", "2026-05-19", "grb-in-practice-ntt", "Gender Responsive Budgeting in Practice: NTT", "Penganggaran Responsif Gender dalam Praktik: NTT", "What changed when districts tagged budgets for gender outcomes."],
  ["reports", "pfm", undefined, "2026-04-30", "annual-progress-report-2025", "SKALA Annual Progress Report 2025", "Laporan Kemajuan Tahunan SKALA 2025", "Progress against End of Program Outcomes for 2025."],
  ["reports", "mss", "south-sulawesi", "2026-03-11", "mss-implementation-review", "Minimum Service Standards Implementation Review", "Tinjauan Penerapan Standar Pelayanan Minimal", "A review of MSS planning and reporting in five districts."],
  ["reports", "gedsi", undefined, "2025-12-08", "disability-inclusive-planning", "Disability-Inclusive Planning in Subnational Government", "Perencanaan Inklusif Disabilitas di Pemerintah Daerah", "Evidence on including persons with disabilities in planning."],
  ["infographics", "data", "ntb", "2026-11-06", "ntb-executive-dashboard", "NTB Executive Dashboard at a Glance", "Sekilas Dasbor Eksekutif NTB", "One page on how NTB uses its executive dashboard."],
  ["infographics", "pfm", undefined, "2026-02-17", "how-transfers-reach-districts", "How Fiscal Transfers Reach Districts", "Bagaimana Transfer Fiskal Sampai ke Kabupaten", "The flow of central funds to local services, explained."],
  ["provincial-profiles", "data", "gorontalo", "2026-01-22", "at-a-glance-gorontalo", "At a Glance: SKALA in Gorontalo", "Sekilas: SKALA di Gorontalo", "Programme activities and results in Gorontalo."],
  ["provincial-profiles", "pfm", "north-kalimantan", "2026-01-22", "at-a-glance-north-kalimantan", "At a Glance: SKALA in North Kalimantan", "Sekilas: SKALA di Kalimantan Utara", "Programme activities and results in North Kalimantan."],
  ["provincial-profiles", "data", "aceh", "2026-01-22", "at-a-glance-aceh", "At a Glance: SKALA in Aceh", "Sekilas: SKALA di Aceh", "Programme activities and results in Aceh."],
  ["strategies", "gedsi", undefined, "2025-10-01", "gedsi-strategy", "GEDSI Strategy", "Strategi GEDSI", "SKALA's approach to gender equality, disability and social inclusion."],
  ["strategies", "pfm", undefined, "2025-09-15", "pillar-1-engagement-strategy", "Pillar 1 Engagement Strategy", "Strategi Keterlibatan Pilar 1", "How SKALA works with national ministries on fiscal policy."],
  ["lessons-learned", "data", undefined, "2026-06-30", "lessons-data-integration", "Lessons from Integrating Regional Data Systems", "Pembelajaran dari Integrasi Sistem Data Daerah", "What worked and what didn't when linking data systems."],
  ["lessons-learned", "mss", "maluku", "2025-11-20", "lessons-island-services", "Lessons from Island Service Delivery", "Pembelajaran dari Layanan di Wilayah Kepulauan", "Practical lessons for archipelagic districts."],
  ["newsletter", "pfm", undefined, "2025-05-31", "halo-skala-may-2025", "HALO SKALA – May 2025 Edition", "HALO SKALA – Edisi Mei 2025", "News and stories from across the programme."],
];

export const publications: Publication[] = pubSeed.map(([type, theme, province, date, slug, en, id, sum], i) => ({
  slug, type, theme, province, date,
  title: { en, id },
  summary: { en: sum, id: "Ringkasan (contoh): " + id + "." },
  downloads: 120 + ((i * 137) % 900),
  skalaOneId: `S1-${(2026 - i).toString()}-${(1000 + i * 37).toString()}`,
  pages: 4 + ((i * 3) % 30),
})).sort((a, b) => b.date.localeCompare(a.date));

export type Post = { slug: string; kind: "update" | "announcement"; date: string; theme: string; province?: string; title: L; lead: L; body: L[] };

export const posts: Post[] = [
  { slug: "ntb-launches-executive-dashboard", kind: "update", date: "2026-11-06", theme: "data", province: "ntb",
    title: { en: "NTB Launches Executive Dashboard to Strengthen Data-Driven Development", id: "NTB Luncurkan Dasbor Eksekutif untuk Memperkuat Pembangunan Berbasis Data" },
    lead: { en: "The provincial government now tracks key development indicators in one place.", id: "Pemerintah provinsi kini memantau indikator pembangunan utama di satu tempat." },
    body: [
      { en: "The dashboard brings together poverty, health and education data from several provincial systems.", id: "Dasbor ini menggabungkan data kemiskinan, kesehatan, dan pendidikan dari beberapa sistem provinsi." },
      { en: "Officials say it shortens planning meetings and helps target budgets to the districts that need them most.", id: "Para pejabat menyebut dasbor mempersingkat rapat perencanaan dan membantu mengarahkan anggaran ke kabupaten yang paling membutuhkan." },
    ] },
  { slug: "maluku-mss-workshop", kind: "update", date: "2026-10-22", theme: "mss", province: "maluku",
    title: { en: "Maluku Districts Align Plans with Minimum Service Standards", id: "Kabupaten di Maluku Selaraskan Rencana dengan Standar Pelayanan Minimal" },
    lead: { en: "Eleven districts joined a three-day workshop in Ambon.", id: "Sebelas kabupaten mengikuti lokakarya tiga hari di Ambon." },
    body: [{ en: "Planners reviewed service gaps and agreed on priority targets for 2027.", id: "Perencana meninjau kesenjangan layanan dan menyepakati target prioritas 2027." }] },
  { slug: "grb-training-ntt", kind: "update", date: "2026-10-08", theme: "grb", province: "ntt",
    title: { en: "NTT Finance Officers Trained in Gender Budget Tagging", id: "Petugas Keuangan NTT Dilatih Penandaan Anggaran Gender" },
    lead: { en: "Budget tagging makes spending on women and girls visible.", id: "Penandaan anggaran membuat belanja untuk perempuan dan anak perempuan terlihat." },
    body: [{ en: "Participants practised tagging with real budget lines from their own districts.", id: "Peserta berlatih menandai mata anggaran nyata dari kabupaten masing-masing." }] },
  { slug: "papua-data-forum", kind: "update", date: "2026-09-17", theme: "data", province: "papua",
    title: { en: "Papua Data Forum Brings Together Four New Provinces", id: "Forum Data Papua Pertemukan Empat Provinsi Baru" },
    lead: { en: "Data teams shared how they set up statistics units in new provinces.", id: "Tim data berbagi cara membentuk unit statistik di provinsi baru." },
    body: [{ en: "The forum agreed a common format for beneficiary data.", id: "Forum menyepakati format bersama untuk data penerima manfaat." }] },
  { slug: "rft-website-development", kind: "announcement", date: "2026-10-22", theme: "pfm",
    title: { en: "Request for Tender: New SKALA Website and Maintenance", id: "Permintaan Tender: Situs Web SKALA Baru dan Pemeliharaan" },
    lead: { en: "SKALA invites proposals for its new bilingual website.", id: "SKALA mengundang proposal untuk situs web dwibahasa yang baru." },
    body: [{ en: "Proposals close on 22 November 2026.", id: "Proposal ditutup pada 22 November 2026." }] },
  { slug: "internship-round-2", kind: "announcement", date: "2026-08-01", theme: "gedsi",
    title: { en: "Internship Program Round 2 Now Open", id: "Program Magang Putaran 2 Telah Dibuka" },
    lead: { en: "Applications are welcome from recent graduates across Indonesia.", id: "Lulusan baru dari seluruh Indonesia dipersilakan mendaftar." },
    body: [{ en: "Persons with disabilities are strongly encouraged to apply.", id: "Penyandang disabilitas sangat dianjurkan untuk mendaftar." }] },
];

export const glossary: [string, string, string][] = [
  ["APBD", "Anggaran Pendapatan dan Belanja Daerah", "Regional Budget"],
  ["APBN", "Anggaran Pendapatan dan Belanja Negara", "State Budget"],
  ["Bappeda", "Badan Perencanaan Pembangunan Daerah", "Regional Development Planning Agency"],
  ["Bappenas", "Badan Perencanaan Pembangunan Nasional", "Ministry of National Development Planning"],
  ["BPS", "Badan Pusat Statistik", "Statistics Indonesia"],
  ["DAK", "Dana Alokasi Khusus", "Special Allocation Fund"],
  ["DAU", "Dana Alokasi Umum", "General Allocation Fund"],
  ["DBH", "Dana Bagi Hasil", "Revenue Sharing Fund"],
  ["DJPK", "Direktorat Jenderal Perimbangan Keuangan", "Directorate General of Fiscal Balance"],
  ["DTKS", "Data Terpadu Kesejahteraan Sosial", "Integrated Social Welfare Data"],
  ["GEDSI", "Kesetaraan Gender, Disabilitas, dan Inklusi Sosial", "Gender Equality, Disability and Social Inclusion"],
  ["Kemendagri", "Kementerian Dalam Negeri", "Ministry of Home Affairs"],
  ["Kemenkeu", "Kementerian Keuangan", "Ministry of Finance"],
  ["KMC", "Pusat Manajemen Pengetahuan", "Knowledge Management Centre"],
  ["Musrenbang", "Musyawarah Perencanaan Pembangunan", "Development Planning Consultation"],
  ["OPD", "Organisasi Perangkat Daerah", "Regional Government Agency"],
  ["PKH", "Program Keluarga Harapan", "Family Hope Program"],
  ["Regsosek", "Registrasi Sosial Ekonomi", "Socio-Economic Registration"],
  ["RKPD", "Rencana Kerja Pemerintah Daerah", "Regional Government Work Plan"],
  ["RPJMD", "Rencana Pembangunan Jangka Menengah Daerah", "Regional Medium-Term Development Plan"],
  ["RPJMN", "Rencana Pembangunan Jangka Menengah Nasional", "National Medium-Term Development Plan"],
  ["SIPD", "Sistem Informasi Pemerintahan Daerah", "Regional Government Information System"],
  ["SPM", "Standar Pelayanan Minimal", "Minimum Service Standards"],
  ["TKD", "Transfer ke Daerah", "Transfers to Regions"],
];

export const tenders: { slug: string; live: boolean; title: L; location: L; closing: string }[] = [
  { slug: "website-development", live: true, title: { en: "New SKALA Website Development and Maintenance (RFT 032)", id: "Pengembangan dan Pemeliharaan Situs Web SKALA Baru (RFT 032)" }, location: { en: "Jakarta", id: "Jakarta" }, closing: "2026-11-22" },
  { slug: "cleaning-services", live: true, title: { en: "Cleaning Services for SKALA Provincial Offices", id: "Jasa Kebersihan Kantor Provinsi SKALA" }, location: { en: "Provinces", id: "Provinsi" }, closing: "2026-11-28" },
  { slug: "vehicle-rental", live: true, title: { en: "Vehicle Rental Panel", id: "Panel Sewa Kendaraan" }, location: { en: "Jakarta and provinces", id: "Jakarta dan provinsi" }, closing: "2026-12-04" },
  { slug: "travel-management", live: false, title: { en: "Travel Management Services (RFT 028)", id: "Jasa Manajemen Perjalanan (RFT 028)" }, location: { en: "Jakarta", id: "Jakarta" }, closing: "2026-08-15" },
  { slug: "sign-language-panel", live: false, title: { en: "Sign Language Interpreter Panel", id: "Panel Juru Bahasa Isyarat" }, location: { en: "National", id: "Nasional" }, closing: "2026-06-30" },
];

export const podcasts: { slug: string; title: L; youtube: string }[] = [
  { slug: "breaking-boundaries", title: { en: "Breaking Boundaries: Identity, Disability and Changing Stereotypes", id: "Mendobrak Batas: Identitas, Disabilitas, dan Stereotip" }, youtube: "" },
  { slug: "elderly-issues", title: { en: "Kompas Podcast Series: Elderly Issues in Indonesia", id: "Seri Podcast Kompas: Isu Lansia di Indonesia" }, youtube: "" },
  { slug: "regsosek", title: { en: "Strengthening National Planning with Regsosek", id: "Memperkuat Perencanaan Nasional dengan Regsosek" }, youtube: "" },
];

export const outcomes: L[] = [
  { en: "Better national policy and regulation for subnational service delivery", id: "Kebijakan dan regulasi nasional yang lebih baik untuk layanan daerah" },
  { en: "Stronger subnational planning, budgeting and data use", id: "Perencanaan, penganggaran, dan pemanfaatan data daerah yang lebih kuat" },
  { en: "More inclusive services through citizen and civil society participation", id: "Layanan lebih inklusif melalui partisipasi warga dan masyarakat sipil" },
];

export const governanceCycle: L[] = [
  { en: "Consolidated data", id: "Data terkonsolidasi" },
  { en: "Analysis", id: "Analisis" },
  { en: "Planning", id: "Perencanaan" },
  { en: "Budgeting", id: "Penganggaran" },
  { en: "Implementation", id: "Pelaksanaan" },
  { en: "Monitoring", id: "Pemantauan" },
  { en: "Evaluation", id: "Evaluasi" },
  { en: "Updating data", id: "Pembaruan data" },
];

export const dataSystems = ["SIPD", "SIKOMPAK", "SEPAKAT", "SIPPP", "Regsosek", "DTKS", "SIGAP", "SIO Papua"];

export const testimonials: { quote: L; who: L }[] = [
  { quote: { en: "Data now drives our budget debates, not the other way round.", id: "Kini data yang mengarahkan pembahasan anggaran kami, bukan sebaliknya." }, who: { en: "Head of Bappeda (sample)", id: "Kepala Bappeda (contoh)" } },
  { quote: { en: "Our villages finally appear in the provincial plan.", id: "Desa-desa kami akhirnya masuk dalam rencana provinsi." }, who: { en: "District planner (sample)", id: "Perencana kabupaten (contoh)" } },
];

export const pubTypeIntro: Record<PubType, L> = {
  briefs: { en: "Short policy briefs that distil evidence for decision makers.", id: "Ringkasan kebijakan singkat yang merangkum bukti untuk pengambil keputusan." },
  infographics: { en: "Visual summaries of data, processes and results.", id: "Ringkasan visual tentang data, proses, dan hasil." },
  "lessons-learned": { en: "What worked, what didn't, and what we would do differently.", id: "Apa yang berhasil, apa yang tidak, dan apa yang akan kami lakukan berbeda." },
  newsletter: { en: "HALO SKALA: news and stories from across the programme.", id: "HALO SKALA: kabar dan cerita dari seluruh program." },
  "provincial-profiles": { en: "SKALA's work and results in each partner province.", id: "Kerja dan hasil SKALA di setiap provinsi mitra." },
  reports: { en: "Progress reports, reviews and research.", id: "Laporan kemajuan, tinjauan, dan riset." },
  strategies: { en: "The strategies that guide how SKALA works.", id: "Strategi yang memandu cara kerja SKALA." },
  stories: { en: "Real stories of change from districts and villages.", id: "Kisah nyata perubahan dari kabupaten dan desa." },
};

export const podcastDetail: Record<string, { guests: L; minutes: number; date: string; summary: L }> = {
  "breaking-boundaries": { guests: { en: "Disability rights advocates", id: "Pegiat hak penyandang disabilitas" }, minutes: 42, date: "2026-09-12",
    summary: { en: "Guests talk about identity, disability and how stereotypes are changing in local government services.", id: "Narasumber membahas identitas, disabilitas, dan perubahan stereotip dalam layanan pemerintah daerah." } },
  "elderly-issues": { guests: { en: "Kompas and Bappenas", id: "Kompas dan Bappenas" }, minutes: 35, date: "2026-07-04",
    summary: { en: "Indonesia is ageing fast. What does that mean for regional budgets and services?", id: "Indonesia menua dengan cepat. Apa artinya bagi anggaran dan layanan daerah?" } },
  regsosek: { guests: { en: "Director of Poverty Alleviation, Bappenas", id: "Direktur Penanggulangan Kemiskinan, Bappenas" }, minutes: 38, date: "2026-05-20",
    summary: { en: "How socio-economic registration data supports better targeting of social programmes.", id: "Bagaimana data registrasi sosial ekonomi mendukung penargetan program sosial yang lebih baik." } },
};

// Sample YouTube video ID (an Australia–Indonesia collaboration video, used as a placeholder).
// Replace with the IDs of SKALA's own videos: the ID is the part after "watch?v=" in a YouTube link.
export const SAMPLE_YT = "LzoNxRVtPcM";

export const videos: { slug: string; cat: "event" | "explainer" | "story"; title: L; minutes: number; youtube: string }[] = [
  { slug: "v-sigap", cat: "story", title: { en: "SIGAP: Village Data in Aceh", id: "SIGAP: Data Desa di Aceh" }, minutes: 4, youtube: SAMPLE_YT },
  { slug: "v-dashboard", cat: "story", title: { en: "NTB Executive Dashboard Launch", id: "Peluncuran Dasbor Eksekutif NTB" }, minutes: 3, youtube: SAMPLE_YT },
  { slug: "v-cycle", cat: "explainer", title: { en: "The Governance Strengthening Cycle", id: "Siklus Penguatan Tata Kelola" }, minutes: 6, youtube: SAMPLE_YT },
  { slug: "v-mss", cat: "explainer", title: { en: "Minimum Service Standards Explained", id: "Penjelasan Standar Pelayanan Minimal" }, minutes: 5, youtube: SAMPLE_YT },
  { slug: "v-grb", cat: "explainer", title: { en: "What Is Gender Responsive Budgeting?", id: "Apa Itu Anggaran Responsif Gender?" }, minutes: 4, youtube: SAMPLE_YT },
  { slug: "v-forum", cat: "event", title: { en: "Papua Data Forum Highlights", id: "Sorotan Forum Data Papua" }, minutes: 7, youtube: SAMPLE_YT },
  { slug: "v-maluku", cat: "event", title: { en: "Maluku MSS Workshop", id: "Lokakarya SPM Maluku" }, minutes: 3, youtube: SAMPLE_YT },
  { slug: "v-campus", cat: "story", title: { en: "Campus Data Insight", id: "Campus Data Insight" }, minutes: 5, youtube: SAMPLE_YT },
];

export const tenderDetail = {
  scope: { en: "Supply of the services described in the attached Request for Tender, Terms of Reference and tender forms.", id: "Penyediaan jasa sebagaimana diuraikan dalam Permintaan Tender, Kerangka Acuan, dan formulir tender terlampir." },
  docs: ["RFT document (PDF)", "Annex 1 – Terms of Reference (PDF)", "Annex 2–7 – Tender forms (DOCX)", "Addendum No. 1 (PDF)"],
};
