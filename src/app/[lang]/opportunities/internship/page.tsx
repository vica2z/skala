import { PageHero } from "@/components/ui";
import { isLang, tr, type Lang } from "@/lib/i18n";

export default async function Internship({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const id = lang === "id";
  const steps = id ? ["Kirim lamaran daring", "Seleksi berkas", "Tes dan wawancara", "Penempatan dan orientasi"] : ["Apply online", "Shortlisting", "Test and interview", "Placement and induction"];
  const quals = id ? ["Lulusan S1 dalam 2 tahun terakhir", "Minat pada kebijakan publik, data, atau komunikasi", "Mampu berbahasa Indonesia dan Inggris", "Penyandang disabilitas sangat dianjurkan melamar"] : ["Bachelor's degree within the last 2 years", "Interest in public policy, data or communications", "Working Bahasa Indonesia and English", "Persons with disabilities are strongly encouraged to apply"];
  return (
    <>
      <PageHero lang={lang} info="internship" kicker={tr("opportunities", lang)} title={tr("internship", lang)} intro={id ? "Pengalaman kerja enam bulan bersama tim SKALA di Jakarta dan provinsi." : "Six months' work experience with the SKALA team in Jakarta and the provinces."}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("opportunities", lang), href: `/${lang}/opportunities` }, { label: tr("internship", lang) }]} />
      <div className="mx-auto max-w-6xl px-4 py-12 space-y-14">
        <div className="grid gap-4 md:grid-cols-3">
          {[[id ? "Putaran" : "Rounds", id ? "2 per tahun" : "2 a year"], [id ? "Durasi" : "Duration", id ? "6 bulan" : "6 months"], [id ? "Uang saku" : "Stipend", id ? "Bulanan" : "Monthly"]].map(([a, b]) => (
            <div key={a} className="rounded-2xl border border-slate-200 p-6"><p className="text-sm text-slate-500">{a}</p><p className="text-2xl font-extrabold text-brand-900">{b}</p></div>
          ))}
        </div>
        <section className="grid gap-10 md:grid-cols-2">
          <div><h2 className="text-2xl font-extrabold text-brand-900 mb-4">{id ? "Kualifikasi" : "Who can apply"}</h2><ul className="space-y-3">{quals.map((q) => <li key={q} className="flex gap-3"><span className="text-brand-600" aria-hidden>✓</span>{q}</li>)}</ul></div>
          <div><h2 className="text-2xl font-extrabold text-brand-900 mb-4">{id ? "Proses seleksi" : "Selection process"}</h2>
            <ol className="space-y-4">{steps.map((s, i) => <li key={s} className="flex gap-4 items-center"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 font-bold text-white">{i + 1}</span><span className="font-semibold">{s}</span></li>)}</ol></div>
        </section>
      </div>
    </>
  );
}
