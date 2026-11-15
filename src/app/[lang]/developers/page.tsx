import { PageHero } from "@/components/ui";
import { isLang, tr, type Lang } from "@/lib/i18n";

export default async function Developers({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const rows = [
    ["GET", "/api/v1/publications", lang === "id" ? "Daftar publikasi (filter: type, theme, province, lang)" : "List publications (filters: type, theme, province, lang)"],
    ["GET", "/api/v1/publications?lang=en&type=briefs", lang === "id" ? "Contoh: ringkasan dalam bahasa Inggris" : "Example: briefs in English"],
    ["GET", "/rss.xml", lang === "id" ? "Umpan RSS publikasi terbaru" : "RSS feed of the latest publications"],
  ];
  return (
    <>
      <PageHero lang={lang} info="api" title={tr("developers", lang)}
        intro={lang === "id" ? "API baca-saja dengan versi untuk Pusat Manajemen Pengetahuan (KMC) dan platform lain. Setiap item membawa ID SKALA One." : "A versioned, read-only API for the Knowledge Management Centre and other platforms. Every item carries its SKALA One ID."}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("developers", lang) }]} />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <ul className="space-y-3">
          {rows.map(([m, p, d]) => (
            <li key={p} className="rounded-xl border border-slate-200 p-4">
              <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold mr-2">{m}</span>
              <a className="font-mono text-brand-700 hover:underline" href={p}>{p}</a>
              <p className="text-sm text-slate-600 mt-1">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
