import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { fmtDate, isLang, langs, t, tr, type Lang } from "@/lib/i18n";
import { tenderDetail, tenders } from "@/lib/data";

export function generateStaticParams() {
  return langs.flatMap((lang) => tenders.map((x) => ({ lang, slug: x.slug })));
}

export default async function Tender({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const x = tenders.find((y) => y.slug === slug);
  if (!x) notFound();
  return (
    <>
      <PageHero lang={lang} info="procurement" kicker={x.live ? tr("live", lang) : tr("past", lang)} title={t(x.title, lang)}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("procurement", lang), href: `/${lang}/opportunities/procurement` }]} />
      <div className="mx-auto max-w-5xl px-4 py-12 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <p className="text-lg">{t(tenderDetail.scope, lang)}</p>
          <section>
            <h2 className="font-bold text-lg mb-3">{lang === "id" ? "Dokumen tender" : "Tender documents"}</h2>
            <ul className="space-y-2">{tenderDetail.docs.map((d) => <li key={d}><a href="/sample-publication.pdf" download className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 hover:bg-brand-50"><span>📄 {d}</span><span className="text-sm font-semibold text-brand-700">{lang === "id" ? "Unduh" : "Download"}</span></a></li>)}</ul>
          </section>
        </div>
        <aside className="rounded-2xl bg-brand-50 p-6 h-fit space-y-3 text-sm">
          <p><span className="block text-slate-500">{tr("closing", lang)}</span><strong className="text-lg">{fmtDate(x.closing, lang)}</strong></p>
          <p><span className="block text-slate-500">{tr("location", lang)}</span><strong>{t(x.location, lang)}</strong></p>
          <p><span className="block text-slate-500">{lang === "id" ? "Pertanyaan" : "Enquiries"}</span><strong>procurement@skala.or.id</strong></p>
        </aside>
      </div>
    </>
  );
}
