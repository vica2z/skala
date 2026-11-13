import { PageHero } from "@/components/ui";
import { isLang, t, tr, type Lang } from "@/lib/i18n";
import { outcomes } from "@/lib/data";

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const periods = ["RPJMN 2015–2019", "RPJMN 2020–2024", "RPJMN 2025–2029"];
  return (
    <>
      <PageHero title={tr("about", lang)} intro={tr("partnership", lang)} crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("about", lang) }]} />
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-12">
        <section>
          <h2 className="text-2xl font-extrabold text-brand-900">{tr("goal", lang)}</h2>
          <div className="mt-5 space-y-3">
            {outcomes.map((o, i) => (
              <details key={i} className="group rounded-xl border border-slate-200 p-5 open:bg-brand-50">
                <summary className="cursor-pointer font-semibold list-none flex justify-between">
                  <span>EOPO {i + 1}: {t(o, lang)}</span><span className="group-open:rotate-45 transition text-xl leading-none">+</span>
                </summary>
                <ul className="mt-3 list-disc pl-6 text-slate-700 space-y-1">
                  {[1, 2, 3].map((n) => <li key={n}>{lang === "id" ? `Capaian antara ${i + 1}.${n} (contoh)` : `Intermediate outcome ${i + 1}.${n} (sample)`}</li>)}
                </ul>
              </details>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-brand-900">{lang === "id" ? "Selaras dengan perencanaan nasional" : "Aligned with national planning"}</h2>
          <ol className="mt-6 relative border-l-2 border-brand-100 ml-3 space-y-6">
            {periods.map((p) => <li key={p} className="pl-6"><span className="absolute -left-2 mt-1.5 h-3.5 w-3.5 rounded-full bg-brand-600" aria-hidden /><p className="font-bold">{p}</p></li>)}
          </ol>
        </section>
      </div>
    </>
  );
}
