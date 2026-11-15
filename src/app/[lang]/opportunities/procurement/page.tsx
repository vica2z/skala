import Link from "next/link";
import { PageHero } from "@/components/ui";
import { fmtDate, isLang, t, tr, type Lang } from "@/lib/i18n";
import { tenders } from "@/lib/data";

export default async function Procurement({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ status?: string }> }) {
  const { lang: raw } = await params;
  const { status } = await searchParams;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const live = status !== "past";
  return (
    <>
      <PageHero lang={lang} info="procurement" kicker={tr("opportunities", lang)} title={tr("procurement", lang)} intro={lang === "id" ? "Peluang pengadaan barang dan jasa untuk program SKALA." : "Goods and services procurement opportunities for the SKALA programme."}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("opportunities", lang), href: `/${lang}/opportunities` }, { label: tr("procurement", lang) }]} />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div role="tablist" className="inline-flex rounded-full bg-slate-100 p-1 mb-8">
          {[[true, tr("live", lang), ""], [false, tr("past", lang), "?status=past"]].map(([v, l, q]) => (
            <Link key={String(v)} role="tab" aria-selected={live === v} href={`/${lang}/opportunities/procurement${q}`}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${live === v ? "bg-white shadow text-brand-700" : "text-slate-600"}`}>{l as string} ({tenders.filter((x) => x.live === v).length})</Link>
          ))}
        </div>
        <ul className="space-y-4">
          {tenders.filter((x) => x.live === live).map((x) => (
            <li key={x.slug}>
              <Link href={`/${lang}/opportunities/procurement/${x.slug}`} className="group flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-brand-500 transition">
                <div><p className="font-bold text-lg group-hover:text-brand-700">{t(x.title, lang)}</p><p className="text-sm text-slate-500">📍 {t(x.location, lang)}</p></div>
                <span className={`shrink-0 text-sm rounded-full px-3 py-1 ${x.live ? "bg-accent-400/30" : "bg-slate-100 text-slate-500"}`}>{tr("closing", lang)}: {fmtDate(x.closing, lang)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
