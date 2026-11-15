import Link from "next/link";
import { PageHero } from "@/components/ui";
import { fmtDate, isLang, t, tr, type Lang } from "@/lib/i18n";
import { tenders } from "@/lib/data";

export default async function Opportunities({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const cards: [string, string, string, string][] = [
    ["procurement", tr("procurement", lang), `${tenders.filter((x) => x.live).length} ${lang === "id" ? "tender aktif" : "live tenders"}`, "📑"],
    ["vacancies", tr("vacancies", lang), "DT Global Careers", "💼"],
    ["internship", tr("internship", lang), lang === "id" ? "2 putaran per tahun" : "2 rounds a year", "🎓"],
  ];
  return (
    <>
      <PageHero title={tr("opportunities", lang)} intro={lang === "id" ? "Bekerja bersama SKALA: tender, lowongan, dan magang." : "Work with SKALA: tenders, jobs and internships."}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("opportunities", lang) }]} />
      <div className="mx-auto max-w-6xl px-4 py-12 space-y-14">
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(([k, l, s, i]) => (
            <Link key={k} href={`/${lang}/opportunities/${k}`} className="group rounded-2xl border border-slate-200 p-8 hover:shadow-lg hover:border-brand-500 transition">
              <span className="text-4xl" aria-hidden>{i}</span>
              <h2 className="mt-4 text-xl font-bold group-hover:text-brand-700">{l}</h2>
              <p className="text-slate-600">{s}</p>
            </Link>
          ))}
        </div>
        <section>
          <h2 className="text-2xl font-extrabold text-brand-900 mb-4">{lang === "id" ? "Tender aktif" : "Live tenders"}</h2>
          <ul className="space-y-3">
            {tenders.filter((x) => x.live).map((x) => (
              <li key={x.slug}><Link href={`/${lang}/opportunities/procurement/${x.slug}`} className="flex flex-col md:flex-row md:items-center justify-between gap-2 rounded-xl border border-slate-200 p-5 hover:bg-brand-50">
                <span className="font-semibold">{t(x.title, lang)}</span><span className="text-sm text-slate-500">{tr("closing", lang)}: {fmtDate(x.closing, lang)}</span></Link></li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
