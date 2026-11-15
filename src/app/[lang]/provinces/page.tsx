import Link from "next/link";
import { Cover, PageHero } from "@/components/ui";
import { isLang, t, tr, type Lang } from "@/lib/i18n";
import { provinces, publications } from "@/lib/data";

export default async function Provinces({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  return (
    <>
      <PageHero lang={lang} info="map" kicker={tr("whereWeWork", lang)} title={lang === "id" ? "12 Provinsi Mitra" : "12 Partner Provinces"}
        intro={lang === "id" ? "SKALA bekerja bersama pemerintah provinsi dan kabupaten untuk mempercepat layanan dasar." : "SKALA works with provincial and district governments to speed up basic services."}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("whereWeWork", lang) }]} />
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {provinces.map((p) => (
          <Link key={p.slug} href={`/${lang}/provinces/${p.slug}`} className="group rounded-2xl border border-slate-200 p-3 hover:shadow-lg transition">
            <Cover seed={p.slug} label={`${p.districts} ${lang === "id" ? "kab/kota" : "districts"}`} />
            <div className="p-2">
              <h2 className="mt-2 text-lg font-bold group-hover:text-brand-700">{t(p.name, lang)}</h2>
              <p className="text-sm text-slate-600">{t(p.focus, lang)}</p>
              <p className="mt-2 text-xs text-slate-500">{publications.filter((x) => x.province === p.slug).length} {tr("publications", lang).toLowerCase()}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
