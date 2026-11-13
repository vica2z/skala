import Link from "next/link";
import { PageHero } from "@/components/ui";
import { fmtDate, isLang, t, tr, type Lang } from "@/lib/i18n";
import { tenders } from "@/lib/data";

export default async function Opportunities({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ tab?: string }> }) {
  const { lang: raw } = await params;
  const { tab } = await searchParams;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const cur = tab ?? "procurement";
  const tabs: [string, string][] = [["procurement", tr("procurement", lang)], ["vacancies", tr("vacancies", lang)], ["internship", tr("internship", lang)]];
  return (
    <>
      <PageHero title={tr("opportunities", lang)} crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("opportunities", lang) }]} />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div role="tablist" className="flex gap-2 border-b border-slate-200 mb-8">
          {tabs.map(([v, l]) => (
            <Link key={v} role="tab" aria-selected={cur === v} href={`/${lang}/opportunities?tab=${v}`}
              className={`px-4 py-2.5 -mb-px border-b-2 font-semibold ${cur === v ? "border-brand-600 text-brand-700" : "border-transparent text-slate-500"}`}>{l}</Link>
          ))}
        </div>
        {cur === "procurement" && [true, false].map((live) => (
          <section key={String(live)} className="mb-10">
            <h2 className="text-xl font-extrabold text-brand-900 mb-4">{live ? tr("live", lang) : tr("past", lang)}</h2>
            <ul className="space-y-3">
              {tenders.filter((x) => x.live === live).map((x) => (
                <li key={x.slug} className="rounded-xl border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div><p className="font-bold">{t(x.title, lang)}</p><p className="text-sm text-slate-500">{tr("location", lang)}: {t(x.location, lang)}</p></div>
                  <span className={`text-sm rounded-full px-3 py-1 ${live ? "bg-accent-400/30 text-ink" : "bg-slate-100 text-slate-500"}`}>{tr("closing", lang)}: {fmtDate(x.closing, lang)}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {cur === "vacancies" && (
          <p className="rounded-xl bg-slate-50 p-8 text-center">{lang === "id" ? "Lowongan diumumkan melalui portal karier DT Global (Taleo)." : "Vacancies are published on DT Global's careers portal (Taleo)."} <a className="text-brand-700 underline" href="https://dt-global.com/careers" target="_blank" rel="noreferrer">DT Global Careers ↗</a></p>
        )}
        {cur === "internship" && (
          <div className="prose text-lg">
            <p>{lang === "id" ? "Program magang SKALA dibuka dua putaran per tahun untuk lulusan baru, dengan uang saku bulanan." : "SKALA's internship runs two rounds a year for recent graduates, with a monthly stipend."}</p>
            <ol className="list-decimal pl-6 space-y-1">{(lang === "id" ? ["Kirim lamaran", "Seleksi berkas", "Wawancara", "Penempatan"] : ["Apply online", "Shortlisting", "Interview", "Placement"]).map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
        )}
      </div>
    </>
  );
}
