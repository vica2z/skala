import { PageHero } from "@/components/ui";
import { isLang, tr, type Lang } from "@/lib/i18n";

export default async function Vacancies({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  return (
    <>
      <PageHero lang={lang} info="vacancies" kicker={tr("opportunities", lang)} title={tr("vacancies", lang)} crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("opportunities", lang), href: `/${lang}/opportunities` }, { label: tr("vacancies", lang) }]} />
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-5xl" aria-hidden>💼</p>
        <h2 className="mt-4 text-2xl font-bold">{lang === "id" ? "Belum ada lowongan saat ini" : "No open vacancies right now"}</h2>
        <p className="mt-2 text-slate-600">{lang === "id" ? "Semua lowongan SKALA diumumkan dan dilamar melalui portal karier DT Global." : "All SKALA vacancies are advertised and applied for through DT Global's careers portal."}</p>
        <a href="https://dt-global.com/careers" target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700">DT Global Careers ↗</a>
      </div>
    </>
  );
}
