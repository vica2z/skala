import type { Metadata } from "next";
import Info from "@/components/Info";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover, PageHero, PubCard, ShareBar } from "@/components/ui";
import { fmtDate, isLang, langs, t, tr, type Lang } from "@/lib/i18n";
import { provinces, pubTypes, publications, themes } from "@/lib/data";

export function generateStaticParams() {
  return langs.flatMap((lang) => publications.map((p) => ({ lang, slug: p.slug })));
}

type P = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = publications.find((x) => x.slug === slug);
  if (!p || !isLang(lang)) return {};
  return { title: t(p.title, lang), description: t(p.summary, lang), alternates: { languages: { id: `/id/publications/${slug}`, en: `/en/publications/${slug}` } } };
}

export default async function PublicationDetail({ params }: P) {
  const { lang: raw, slug } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const p = publications.find((x) => x.slug === slug);
  if (!p) notFound();
  const prov = provinces.find((x) => x.slug === p.province);
  const related = publications.filter((x) => x.slug !== p.slug && (x.theme === p.theme || x.type === p.type)).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Report", name: t(p.title, lang), datePublished: p.date,
    inLanguage: lang, about: t(themes[p.theme], lang), identifier: p.skalaOneId, publisher: { "@type": "Organization", name: "SKALA" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero lang={lang} info="metadata"
        title={t(p.title, lang)}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("publications", lang), href: `/${lang}/publications` }, { label: t(pubTypes[p.type], lang), href: `/${lang}/publications?type=${p.type}` }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <p className="text-lg leading-relaxed">{t(p.summary, lang)}</p>
          <section aria-labelledby="pv">
            <h2 id="pv" className="font-bold text-lg mb-3">{tr("preview", lang)} <Info k="preview" lang={lang} /></h2>
            <iframe title={`${tr("preview", lang)}: ${t(p.title, lang)}`} src="/sample-publication.pdf#view=FitH" className="hidden md:block w-full h-[640px] rounded-xl border border-slate-200 bg-slate-50" />
            <a href="/sample-publication.pdf" target="_blank" rel="noreferrer" className="md:hidden flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="grid h-14 w-11 shrink-0 place-items-center rounded-md bg-white text-xs font-bold text-red-600 shadow">PDF</span>
              <span><span className="block font-semibold">{lang === "id" ? "Buka pratinjau" : "Open preview"}</span><span className="block text-sm text-slate-500">{p.pages} {lang === "id" ? "halaman" : "pages"}</span></span>
            </a>
          </section>
          <ShareBar lang={lang} title={t(p.title, lang)} />
        </div>
        <aside className="space-y-5">
          <div className="max-w-56"><Cover seed={p.slug} label={t(pubTypes[p.type], lang)} tall /></div>
          <div className="flex flex-col gap-2"><p className="text-sm font-semibold flex items-center gap-2">{lang === "id" ? "Unduh dokumen" : "Download"} <Info k="downloads" lang={lang} /></p>
            <a href="/sample-publication.pdf" download className="rounded-full bg-brand-600 text-white text-center px-5 py-3 font-bold hover:bg-brand-700">{tr("downloadPdf", lang)} · {p.pages} pp</a>
            <a href="/sample-publication.pdf" download className="rounded-full border border-brand-600 text-brand-700 text-center px-5 py-3 font-semibold hover:bg-brand-50">{tr("downloadWord", lang)}</a>
          </div>
          <dl className="rounded-xl bg-slate-50 p-5 text-sm grid grid-cols-3 gap-y-2">
            <dt className="text-slate-500">{tr("published", lang)}</dt><dd className="col-span-2">{fmtDate(p.date, lang)}</dd>
            <dt className="text-slate-500">{tr("type", lang)}</dt><dd className="col-span-2">{t(pubTypes[p.type], lang)}</dd>
            <dt className="text-slate-500">{tr("theme", lang)}</dt><dd className="col-span-2"><Link className="text-brand-700 hover:underline" href={`/${lang}/publications?theme=${p.theme}`}>{t(themes[p.theme], lang)}</Link></dd>
            {prov && (<><dt className="text-slate-500">{tr("province", lang)}</dt><dd className="col-span-2">{t(prov.name, lang)}</dd></>)}
            <dt className="text-slate-500">SKALA One ID</dt><dd className="col-span-2 font-mono">{p.skalaOneId}</dd>
            <dt className="text-slate-500">{tr("downloads", lang)}</dt><dd className="col-span-2">{p.downloads.toLocaleString(lang === "id" ? "id-ID" : "en-GB")}</dd>
          </dl>
        </aside>
      </div>
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-extrabold text-brand-900 mb-6">{tr("related", lang)} <Info k="related" lang={lang} /></h2>
          <div className="grid gap-6 md:grid-cols-3">{related.map((r) => <PubCard key={r.slug} p={r} lang={lang} />)}</div>
        </section>
      )}
    </>
  );
}
